package com.fridge.dto;

import java.util.List;

public class ProductDto {
    private Long id;
    private String userId;
    private String name;
    private String iconPath;
    private List<CategoryDto> category;
    private Integer totalQuantity;
    private Integer minQuantity;
    private String unit;
    private List<ItemDto> items;
    private NutritionalValueDto nutritionalValue;

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

    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    public List<CategoryDto> getCategory() {
        return category;
    }

    public void setCategory(List<CategoryDto> category) {
        this.category = category;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Integer getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public List<ItemDto> getItems() {
        return items;
    }

    public void setItems(List<ItemDto> items) {
        this.items = items;
    }

    public NutritionalValueDto getNutritionalValue() {
        return nutritionalValue;
    }

    public void setNutritionalValue(NutritionalValueDto nutritionalValue) {
        this.nutritionalValue = nutritionalValue;
    }
}
