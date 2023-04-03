package com.fridge.graphql;

import com.fridge.graphql.error.NoSuchElementException;
import com.fridge.model.ShoppingList;
import com.fridge.model.ShoppingListItem;
import com.fridge.service.ShoppingListService;
import com.graphql.spring.boot.test.GraphQLResponse;
import com.graphql.spring.boot.test.GraphQLTestTemplate;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
//@GraphQLTest
public class ShoppingListQueryTest {

    @Autowired private GraphQLTestTemplate graphQLTestTemplate;

    @MockBean
    ShoppingListService shoppingListServiceMock;

    @Test
    @WithMockUser(username = "anonymousUser", password = "test", roles = "admin")
    public void getShoppingLists_Authorized_ReturnsShoppingLists() throws Exception {
        String userId = "anonymousUser";
        ShoppingList shoppingList = new ShoppingList();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        shoppingList.setUserId(userId);
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(new HashSet<ShoppingListItem>());
        shoppingList.setName("Einkaufsliste");
        shoppingLists.add(shoppingList);

        doReturn(shoppingLists).when(shoppingListServiceMock).fetchShoppingLists(userId);
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getShoppingLists.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.shoppingLists[0].name")).isEqualTo("Einkaufsliste");
        assertThat(response.get("$.data.shoppingLists[0].id")).isEqualTo("10");
    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void getShoppingLists_Unauthorized_ReturnsEmptyList() throws Exception {

        ShoppingList shoppingList = new ShoppingList();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        shoppingList.setUserId("anonymousUser");
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(new HashSet<ShoppingListItem>());
        shoppingList.setName("Einkaufsliste");
        shoppingLists.add(shoppingList);

        ShoppingList shoppingList2 = new ShoppingList();
        List<ShoppingList> shoppingLists2 = new ArrayList<ShoppingList>();
        shoppingList2.setUserId("nottest");
        shoppingList2.setId((long) 10);
        shoppingList2.setShoppingListItems(new HashSet<ShoppingListItem>());
        shoppingList2.setName("Einkaufsliste");
        shoppingLists2.add(shoppingList);

        doReturn(shoppingLists).when(shoppingListServiceMock).fetchShoppingLists("nottest");
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getShoppingLists.graphql");
        assertThat(response.isOk()).isTrue();
        String expected = "{\"data\":{\"shoppingLists\":[]}}";
        response.assertThatJsonContent().isEqualToJson(expected);

    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void getShoppingList_Authorized_ReturnsShoppingList() throws Exception {
        String userId = "anonymousUser";

        ShoppingList shoppingList = new ShoppingList();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        shoppingList.setUserId(userId);
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(new HashSet<ShoppingListItem>());
        shoppingList.setName("Einkaufsliste");
        doReturn(shoppingList).when(shoppingListServiceMock).getShoppingList(shoppingList.getId(), userId);
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getShoppingList.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.get("$.data.shoppingList.name")).isEqualTo("Einkaufsliste");
        assertThat(response.get("$.data.shoppingList.id")).isEqualTo("10");
    }

    @Test
    @WithMockUser(username = "anonymousUser", password = "test")
    public void getShoppingList_Failure_ReturnsException() throws Exception {


        String userId = "anonymousUser";

        ShoppingList shoppingList = new ShoppingList();
        List<ShoppingList> shoppingLists = new ArrayList<ShoppingList>();
        shoppingList.setUserId(userId);
        shoppingList.setId((long) 10);
        shoppingList.setShoppingListItems(new HashSet<ShoppingListItem>());
        shoppingList.setName("Einkaufsliste");

        doThrow(NoSuchElementException.class).when(shoppingListServiceMock).getShoppingList(shoppingList.getId(), "anonymousUser");
        GraphQLResponse response = graphQLTestTemplate.postForResource("test/getShoppingList.graphql");
        assertThat(response.isOk()).isTrue();
        assertThat(response.assertThatErrorsField().isNotNull());
    }

}
