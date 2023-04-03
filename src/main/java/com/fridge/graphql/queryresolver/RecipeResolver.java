package com.fridge.graphql.queryresolver;

import com.fridge.model.Recipe;
import com.fridge.service.RecipeService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class RecipeResolver implements GraphQLQueryResolver {

    private final RecipeService recipeService;

    @Autowired
    public RecipeResolver(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    public List<Recipe> getRecipes() {
        String userId = getContext().getAuthentication().getName();
        List<Recipe> recipes = recipeService.fetchRecipes(userId);
        return recipes;
    }

    public Recipe getRecipe(Long id) {
        String userId = getContext().getAuthentication().getName();
        return recipeService.getRecipe(id, userId);
    }

    // graphiql queries -----------------------------------------------------------
    public List<Recipe> getRecipesI(String userId) {
        List<Recipe> recipes = recipeService.fetchRecipes(userId);
        return recipes;
    }

    public Recipe getRecipeI(String userId, Long id) {
        return recipeService.getRecipe(id, userId);
    }
}
