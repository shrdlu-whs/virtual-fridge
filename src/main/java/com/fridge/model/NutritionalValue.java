package com.fridge.model;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class NutritionalValue {

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

    public NutritionalValue() {
    }

    public NutritionalValue(String nutritionScore, Integer calories, Integer protein, Integer carbohydrates, Integer sugar, Integer fat, Integer saturatedFat, Integer fiber, Integer salt) {
        this.nutritionScore = nutritionScore;
        this.calories = calories;
        this.protein = protein;
        this.carbohydrates = carbohydrates;
        this.sugar = sugar;
        this.fat = fat;
        this.saturatedFat = saturatedFat;
        this.fiber = fiber;
        this.salt = salt;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column
    @NotNull
    public String getNutritionScore() {
        return nutritionScore;
    }

    public void setNutritionScore(String nutritionScore) {
        this.nutritionScore = nutritionScore;
    }

    @Column
    @NotNull
    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    @Column
    @NotNull
    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    @Column
    @NotNull
    public Integer getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Integer carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    @Column
    @NotNull
    public Integer getSugar() {
        return sugar;
    }

    public void setSugar(Integer sugar) {
        this.sugar = sugar;
    }

    @Column
    @NotNull
    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    @Column
    @NotNull
    public Integer getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(Integer saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    @Column
    @NotNull
    public Integer getFiber() {
        return fiber;
    }

    public void setFiber(Integer fiber) {
        this.fiber = fiber;
    }

    @Column
    @NotNull
    public Integer getSalt() {
        return salt;
    }

    public void setSalt(Integer salt) {
        this.salt = salt;
    }
}
