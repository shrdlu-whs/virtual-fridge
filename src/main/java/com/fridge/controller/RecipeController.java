package com.fridge.controller;

import com.fridge.dto.ProductDto;
import com.fridge.dto.RecipeDto;
import com.fridge.model.Recipe;
import com.fridge.service.RecipeService;
import com.fridge.util.ObjectMapperUtils;
//import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes/{id}")
//    @Bulkhead(name="recipeBulkhead")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable("id") Long id, Principal principal) {
        Recipe recipe = recipeService.getRecipe(id, principal.getName());
        RecipeDto responseRecipeDto = ObjectMapperUtils.map(recipe, RecipeDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(responseRecipeDto);
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeDto>> getRecipes(Principal principal) {
        List<Recipe> recipeEntities = recipeService.fetchRecipes(principal.getName());
        List<RecipeDto> recipeDtos = ObjectMapperUtils.mapAll(recipeEntities, RecipeDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(recipeDtos);
    }


//    @PostMapping("/recipes")
//    public ResponseEntity<RecipeDto> createRecipe(@RequestBody RecipeDto recipeDto, Principal principal) {
//        Recipe recipe = ObjectMapperUtils.map(recipeDto, Recipe.class);
//        recipe.setUserId(principal.getName());
//        Recipe returnedRecipe = recipeService.saveRecipe(recipe);
//        RecipeDto responseRecipeDto = ObjectMapperUtils.map(returnedRecipe, RecipeDto.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipeDto);
//    }
//
//    @PutMapping("/recipes")
//    public ResponseEntity<RecipeDto> putRecipe(@RequestBody RecipeDto recipeDto, Principal principal) {
//        Recipe recipe = ObjectMapperUtils.map(recipeDto, Recipe.class);
//        Recipe returnedRecipe = recipeService.updateRecipe(recipe, principal.getName());
//        RecipeDto responseRecipeDto = ObjectMapperUtils.map(returnedRecipe, RecipeDto.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responseRecipeDto);
//    }

    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<Object> deleteRecipe(@PathVariable("id") Long id, Principal principal) {
        recipeService.deleteRecipe(id, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
