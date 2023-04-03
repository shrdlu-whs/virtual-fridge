package com.fridge.service;

import com.fridge.graphql.inputs.RecipeInput;
import com.fridge.model.Recipe;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RecipeService {
    Recipe getRecipe(Long id, String userId);
    List<Recipe> fetchRecipes(String userId);
    Recipe saveRecipe(RecipeInput recipeInput);
    Recipe updateRecipe(RecipeInput recipeInput, String userId);
    void deleteRecipe(Long id, String userId);
}
