//package com.fridge.service;
//
//import com.fridge.model.Recipe;
//import com.fridge.repository.RecipeRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//@TestPropertySource(locations = {"classpath:application-test.properties"})
//@ActiveProfiles("test")
//public class RecipeServiceImplTest {
//
//    @Autowired
//    private RecipeService recipeService;
//
//    @Autowired
//    private RecipeRepository recipeRepository;
//
//    Recipe recipe1;
//    Recipe recipe2;
//
//    @Before
//    public void init(){
//
//        recipe1 = new Recipe();
//        recipe2 = new Recipe();
//
//        recipe1.setName("Wurstsalat");
//        recipe1.setShortDescription("Hier wird ein Wurstsalatrezept gezeigt.");
//        recipe1.setInstructions("1. Wurst kochen - 2. Wurst schneiden .....");
//        recipe1.setHyperlink("testlink");
//        recipe1.setFavorite(true);
//        recipe1.setExpectedTime((long) 10);
//
//        recipe2.setName("Wursteintopf");
//        recipe2.setShortDescription("Hier wird ein Wursteintopf gezeigt.");
//        recipe2.setInstructions("1. Wurst kochen - 2. Wurst schneiden usw.....");
//        recipe2.setHyperlink("testlink2");
//        recipe2.setFavorite(false);
//        recipe2.setExpectedTime((long) 30);
//
//        recipe1.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//        recipe2.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
//
//    }
//
//    @Test
//    public void recipeShouldBeSaved(){
//
//        Recipe savedRecipe = recipeService.saveRecipe(recipe1);
//        assertThat(savedRecipe.getName()).isEqualTo(recipe1.getName());
//        assertThat(savedRecipe.getExpectedTime()).isEqualTo(recipe1.getExpectedTime());
//        assertThat(savedRecipe.getHyperlink()).isEqualTo(recipe1.getHyperlink());
//        assertThat(savedRecipe.getFavorite()).isEqualTo(recipe1.getFavorite());
//        assertThat(savedRecipe.getShortDescription()).isEqualTo(recipe1.getShortDescription());
//        assertThat(savedRecipe.getInstructions()).isEqualTo(recipe1.getInstructions());
//        assertThat(savedRecipe.getId()).isNotNull();
//
//    }
//
//    @Test
//    public void recipeShouldbeFetched(){
//
//        recipeService.saveRecipe(recipe1);
//        List<Recipe> recipeList = recipeService.fetchRecipes(recipe1.getUserId());
//        assertThat(recipeList).isNotEmpty();
//
//    }
//
//    @Test
//    public void recipeShouldBeUpdated(){
//
//        Recipe updatable = recipeService.saveRecipe(recipe1);
//
//        updatable.setName("testRecipe");
//
//        Recipe updatedItem = recipeService.updateRecipe(updatable, recipe1.getUserId());
//
//        Optional<Recipe> found = recipeRepository.findById((updatedItem.getId()));
//
//        assertThat(updatable.getId()).isEqualTo(found.get().getId());
//        assertThat(updatedItem.getName()).isEqualTo("testRecipe");
//        assertThat(found.get().getShortDescription()).isEqualTo(updatable.getShortDescription());
//        assertThat(found.get().getInstructions()).isEqualTo(updatable.getInstructions());
//        assertThat(found.get().getFavorite()).isEqualTo(updatable.getFavorite());
//        assertThat(found.get().getHyperlink()).isEqualTo(updatable.getHyperlink());
//        assertThat(found.get().getExpectedTime()).isEqualTo(updatable.getExpectedTime());
//
//    }
//
//    @Test
//    public void recipeShouldBeDeleted(){
//
//        Recipe deletable = recipeService.saveRecipe(recipe1);
//        recipeService.deleteRecipe(deletable.getId(), recipe1.getUserId());
//        Optional<Recipe> found = recipeRepository.findById(recipe1.getId());
//        assertThat(found).isEmpty();
//
//    }
//
//    @Test
//    public void oneRecipeShouldBeFetched(){
//
//        Recipe fetchable = recipeService.saveRecipe(recipe1);
//        recipeService.getRecipe(fetchable.getId(), recipe1.getUserId());
//        Optional<Recipe> found = recipeRepository.findById(fetchable.getId());
//        assertThat(found).isNotEmpty();
//        assertThat(found.get().getId()).isNotNull();
//        assertThat(found.get().getHyperlink()).isNotNull();
//        assertThat(found.get().getName()).isNotNull();
//        assertThat(found.get().getInstructions()).isNotNull();
//        assertThat(found.get().getShortDescription()).isNotNull();
//        assertThat(found.get().getExpectedTime()).isNotNull();
//        assertThat(found.get().getFavorite()).isNotNull();
//
//    }
//
//}
