package com.fridge.service.impl;

import com.fridge.graphql.error.BadCredentialsException;
import com.fridge.graphql.error.IllegalArgumentException;
import com.fridge.graphql.inputs.RecipeInput;
import com.fridge.graphql.inputs.RecipeItemInput;
import com.fridge.model.Recipe;
import com.fridge.model.RecipeItem;
import com.fridge.repository.ProductRepository;
import com.fridge.repository.RecipeItemRepository;
import com.fridge.repository.RecipeRepository;
import com.fridge.service.RecipeService;
import com.fridge.util.ObjectMapperUtils;
import com.fridge.util.UpdateReflection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final RecipeItemRepository recipeItemRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository, ProductRepository productRepository, RecipeItemRepository recipeItemRepository) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
        this.recipeItemRepository = recipeItemRepository;
    }

    @Override
    public Recipe getRecipe(Long id, String userId) {
        Optional<Recipe> recipe = recipeRepository.getByIdAndUserId(id, userId);
        if (recipe.isEmpty()) {
            throw new NoSuchElementException("Could not find Recipe with ID " + id);
        }
        return recipe.get();
    }

    @Override
    public List<Recipe> fetchRecipes(String userId) {
        return recipeRepository.getAllByUserId(userId);
    }

    @Override
    public Recipe saveRecipe(RecipeInput recipeInput) {
        Set<RecipeItemInput> recipeItemInputSet = recipeInput.getRecipeItemInputs();
        Recipe recipe = ObjectMapperUtils.map(recipeInput, Recipe.class);
        if (recipeItemInputSet != null && recipeItemInputSet.size() > 0)
            for (var item : recipeItemInputSet) {
                RecipeItem recipeItem = ObjectMapperUtils.map(item, RecipeItem.class);
                recipeItem.setProduct(productRepository.findById(item.getProductId()).get());
                recipe.getRecipeItems().add(recipeItem);
            }

        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe updateRecipe(RecipeInput recipeInput, String userId) {
        Optional<Recipe> existingRecipe = recipeRepository.findById(recipeInput.getId());

        // Authentication and sanity check
        if (existingRecipe.isEmpty())
            throw new com.fridge.graphql.error.NoSuchElementException("Could not update ShoppingList with ID " + recipeInput.getId());
        else if (!existingRecipe.get().getUserId().equals(userId))
            throw new BadCredentialsException("Wrong userId");

        // Update initial members for existing recipe
        UpdateReflection.Update(recipeInput, existingRecipe.get());

        // Get persisted shopping list items
        Set<RecipeItemInput> recipeItemInputSet = recipeInput.getRecipeItemInputs();

        if (recipeItemInputSet != null && recipeItemInputSet.size() > 0) {
            Set<RecipeItem> existingSet = existingRecipe.get().getRecipeItems();
            existingSet.clear();
            for (var recipeItemInput : recipeInput.getRecipeItemInputs()) {
                if (recipeItemInput.getId() != null) {
                    Optional<RecipeItem> existingRecipeItem = recipeItemRepository.findById(recipeItemInput.getId());
                    // Item exists in persisted storage
                    if (existingRecipeItem.isPresent()) {
                        UpdateReflection.Update(recipeItemInput, existingRecipeItem.get());
                        existingSet.add(existingRecipeItem.get());
                    } else
                        throw new IllegalArgumentException("Wrong id for shopping list item: " + recipeItemInput.getId());
                } else {
                    // new item: save in persisted storage before adding it to shopping list
                    RecipeItem newRecipeItem = ObjectMapperUtils.map(recipeItemInput, RecipeItem.class);
                    if (recipeItemInput.getProductId() != null) {
                        newRecipeItem.setProduct(productRepository.findById(recipeItemInput.getProductId()).get());
                        existingSet.add(newRecipeItem);
                    } else
                        throw new IllegalArgumentException("Product not found with ID: " + recipeItemInput.getProductId());
                }
            }
        } else
            existingRecipe.get().getRecipeItems().clear();

        return recipeRepository.save(existingRecipe.get());
    }

    @Override
    public void deleteRecipe(Long id, String userId) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        if (recipe.isPresent() && recipe.get().getUserId().equals(userId)) {
            recipeRepository.deleteById(id);
        } else {
            // TODO implement authentication error
        }
    }
}
