package com.fridge.graphql;

import com.fridge.graphql.error.NoSuchElementException;
import com.fridge.graphql.queryresolver.RecipeResolver;
import com.fridge.graphql.queryresolver.ShoppingListResolver;
import com.fridge.model.Recipe;
import com.fridge.model.RecipeItem;
import com.fridge.model.ShoppingList;
import com.fridge.model.ShoppingListItem;
import com.fridge.service.RecipeService;
import com.fridge.service.ShoppingListService;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTest;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.doThrow;
import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
public class RecipeQueryTest {

    @Autowired
    private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    RecipeService recipeServiceMock;
    @MockBean
    RecipeResolver shoppingListResolverMock;

    static Recipe recipe = new Recipe();
    static List<Recipe> recipes = new ArrayList<Recipe>();

    @Before
    public void setupMock() {
        MockitoAnnotations.openMocks(this);
    }

    @BeforeEach
    static void setUp() {
        recipe.setUserId("test");
        recipe.setRecipeItems((new HashSet<RecipeItem>()));
        recipe.setName("test");
        recipes.add(recipe);
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "admin")
    public void getRecipes_Authorized_ReturnsRecipes() throws Exception {

        Recipe recipe = new Recipe();
        List<Recipe> recipes = new ArrayList<Recipe>();
        recipe.setUserId("test");
        recipe.setId((long) 10);
        recipe.setRecipeItems(new HashSet<RecipeItem>());
        recipe.setName("recipe 1");
        recipes.add(recipe);

        doReturn(recipes).when(recipeServiceMock).fetchRecipes(any());
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getRecipes.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.recipes[0].name")).isEqualTo("recipe 1");
        assertThat(response.get("$.data.recipes[0].id")).isEqualTo("10");
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "admin")
    public void getRecipes_Unauthorized_ReturnsEmptyList() throws Exception {

        Recipe recipe = new Recipe();
        List<Recipe> recipes = new ArrayList<Recipe>();
        recipe.setUserId("test");
        recipe.setId((long) 10);
        recipe.setRecipeItems(new HashSet<RecipeItem>());
        recipe.setName("recipe 1");
        recipes.add(recipe);

        Recipe recipe2 = new Recipe();
        List<Recipe> recipes2 = new ArrayList<Recipe>();
        recipe2.setUserId("nottest");
        recipe2.setId((long) 10);
        recipe2.setRecipeItems(new HashSet<RecipeItem>());
        recipe2.setName("recipe 2");
        recipes2.add(recipe2);

        doReturn(recipes).when(recipeServiceMock).fetchRecipes("nottest");
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getRecipes.graphql");
        assertThat(response.isOk()).isTrue();
        String expected = "{\"data\":{\"recipes\":[]}}";
        response.assertThatJsonContent().isEqualToJson(expected);

    }

    @Test
    public void getRecipe_Authorized_ReturnsRecipe() throws Exception {
        String userId = "test";
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(getContext().getAuthentication().getName()).thenReturn(userId);

        Recipe recipe = new Recipe();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        recipe.setUserId(userId);
        recipe.setId((long) 10);
        recipe.setRecipeItems(new HashSet<RecipeItem>());
        recipe.setName("recipe 1");
        doReturn(recipe).when(shoppingListResolverMock).getRecipe(recipe.getId());
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getRecipe.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.recipe.name")).isEqualTo("recipe 1");
        assertThat(response.get("$.data.recipe.id")).isEqualTo("10");
    }

    @Test
    @WithMockUser(username = "test", password = "test", roles = "admin")
    public void getShoppingList_Failure_ReturnsException() throws Exception {

        doThrow(NoSuchElementException.class).when(recipeServiceMock).getRecipe(any(), any());
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getRecipe.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.assertThatErrorsField().isNotNull());
        assertThat(response.assertThatListOfErrors().descriptionText().compareTo("Could not find any recipe"));
    }
}
