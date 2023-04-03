package com.fridge.repositories;

import com.fridge.model.Recipe;
import com.fridge.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
public class RecipeRepositoryTest {

    private Recipe recipe1;
    private Recipe recipe2;

    @Autowired
    RecipeRepository recipeRepository;

    @BeforeEach
    public void init(){

        recipe1 = new Recipe();
        recipe2 = new Recipe();

        recipe1.setName("Wurstsalat");
        recipe1.setShortDescription("Hier wird ein Wurstsalatrezept gezeigt.");
        recipe1.setInstructions("1. Wurst kochen - 2. Wurst schneiden .....");
        recipe1.setHyperlink("testlink");
        recipe1.setFavorite(true);
        recipe1.setExpectedTime((long) 10);

        recipe2.setName("Wursteintopf");
        recipe2.setShortDescription("Hier wird ein Wursteintopf gezeigt.");
        recipe2.setInstructions("1. Wurst kochen - 2. Wurst schneiden usw.....");
        recipe2.setHyperlink("testlink2");
        recipe2.setFavorite(false);
        recipe2.setExpectedTime((long) 30);

        recipe1.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
        recipe2.setUserId("a82abb38-4ddb-4a9e-9fb4-0fdf9130964c");
    }

    @Test
    public void saveRecipe(){

        Recipe savedRecipe = recipeRepository.save(recipe1);
        System.out.println(savedRecipe.getName());
        assertThat(savedRecipe.getId()).isNotNull();
        assertThat(savedRecipe.getName()).isEqualTo("Wurstsalat");
        assertThat(savedRecipe.getShortDescription()).isNotNull();
        assertThat(savedRecipe.getCreated()).isNotNull();
        assertThat(savedRecipe.getIconPath()).isNull();
        assertThat(savedRecipe.getHyperlink()).isEqualTo("testlink");
        assertThat(savedRecipe.getRecipeItems()).isNull();
        assertThat(savedRecipe.getFavorite()).isSameAs(true);
        assertThat(savedRecipe.getExpectedTime()).isNotNull();

    }

    @Test
    public void fetchRecipe(){

        recipeRepository.save(recipe1);
        recipeRepository.save(recipe2);

        List<Recipe> found = recipeRepository.findAll();

        assertThat(found.isEmpty()).isFalse();

        Optional<Recipe> foundById = recipeRepository.findById(recipe2.getId());

        assertThat(foundById).isNotNull();

    }

    @Test
    public void deleteRecipe(){

        recipeRepository.save(recipe1);

        recipeRepository.delete(recipe1);

        Optional<Recipe> found = recipeRepository.findById(recipe1.getId());

        assertThat(found).isEmpty();

    }

}
