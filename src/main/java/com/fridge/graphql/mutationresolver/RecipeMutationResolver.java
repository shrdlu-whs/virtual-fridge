package com.fridge.graphql.mutationresolver;
import com.fridge.graphql.inputs.RecipeInput;
import com.fridge.model.Recipe;
import com.fridge.service.RecipeService;
import com.fridge.util.ObjectMapperUtils;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class RecipeMutationResolver implements GraphQLMutationResolver {

    private final RecipeService recipeService;

    @Autowired
    public RecipeMutationResolver(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    public Recipe createRecipe(RecipeInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);

        return recipeService.saveRecipe(input);
    }

    public Recipe updateRecipe(RecipeInput input) {
        String userId = getContext().getAuthentication().getName();
        input.setUserId(userId);

        return recipeService.updateRecipe(input, input.getUserId());
    }

    public long deleteRecipe(long id) {
        String userId = getContext().getAuthentication().getName();
        recipeService.deleteRecipe(id, userId);
        return id;
    }

    // graphiql functions - delete after test -------------------------------------
    public Recipe createRecipeI(RecipeInput input, String userId) {
        input.setUserId(userId);

        return recipeService.saveRecipe(input);
    }

    public Recipe updateRecipeI(RecipeInput input, String userId) {
        input.setUserId(userId);

        return recipeService.updateRecipe(input, input.getUserId());
    }

    public long deleteRecipeI(long id, String userId) {
        recipeService.deleteRecipe(id, userId);
        return id;
    }
}
