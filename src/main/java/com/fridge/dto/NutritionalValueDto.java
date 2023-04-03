package com.fridge.dto;

public class NutritionalValueDto {

    private Long id;
    private String nutritionScore;
    private Integer calories;
    private Integer protein;
    private Integer carbohydrates;
    private Integer sugar;
    private Integer fat;
    private Integer saturatedFat;
    private Integer fiber;
    private Integer salt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNutritionScore() {
        return nutritionScore;
    }

    public void setNutritionScore(String nutritionScore) {
        this.nutritionScore = nutritionScore;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Integer carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public Integer getSugar() {
        return sugar;
    }

    public void setSugar(Integer sugar) {
        this.sugar = sugar;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Integer getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(Integer saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public Integer getFiber() {
        return fiber;
    }

    public void setFiber(Integer fiber) {
        this.fiber = fiber;
    }

    public Integer getSalt() {
        return salt;
    }

    public void setSalt(Integer salt) {
        this.salt = salt;
    }
}
