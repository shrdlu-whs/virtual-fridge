package com.fridge.graphql.inputs;
import com.fridge.constants.Difficulty;

import java.util.HashSet;
import java.util.Set;

public class RecipeInput {
    private String userId;
    private Long id;
    private String name;
    private String shortDescription;
    private String instructions;
    private String iconPath;
    private Set<RecipeItemInput> recipeItemInputs;
    private String hyperlink;
    private Boolean favorite = false;
    private Long expectedTime;
    private Difficulty difficulty = Difficulty.intermediate;

    public RecipeInput() {
        this.recipeItemInputs = new HashSet<>();
    }

    public RecipeInput(String userId, Long id, String name, String shortDescription, String instructions, String iconPath, Set<RecipeItemInput> recipeItemInputs, String hyperlink, Boolean favorite, Long expectedTime, Difficulty difficulty) {
        this.userId = userId;
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.instructions = instructions;
        this.iconPath = iconPath;
        this.recipeItemInputs = recipeItemInputs;
        this.hyperlink = hyperlink;
        this.favorite = favorite;
        this.expectedTime = expectedTime;
        this.difficulty = difficulty;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    public Set<RecipeItemInput> getRecipeItemInputs() {
        return recipeItemInputs;
    }

    public void setRecipeItemInputs(Set<RecipeItemInput> recipeItemInputs) {
        this.recipeItemInputs = recipeItemInputs;
    }

    public String getHyperlink() {
        return hyperlink;
    }

    public void setHyperlink(String hyperlink) {
        this.hyperlink = hyperlink;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public Long getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }
}
