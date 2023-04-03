package com.fridge.dto;

import com.fridge.constants.Difficulty;

import java.time.LocalDateTime;
import java.util.List;

public class RecipeDto {
    private Long id;
    private String userId;
    private String name;
    private String shortDescription;
    private String instructions;
    private String iconPath;
    private List<RecipeItemDto> recipeItems;
    private String hyperlink;
    private Boolean favorite;
    private Long exceptedTime;
    private Difficulty difficulty;
    private LocalDateTime created;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public List<RecipeItemDto> getRecipeItems() {
        return recipeItems;
    }

    public void setRecipeItems(List<RecipeItemDto> recipeItems) {
        this.recipeItems = recipeItems;
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

    public Long getExceptedTime() {
        return exceptedTime;
    }

    public void setExceptedTime(Long exceptedTime) {
        this.exceptedTime = exceptedTime;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}
