package com.fridge.graphql.inputs;
import java.util.HashSet;
import java.util.Set;

public class ProductInput {

    private Long id;
    private String userId;
    private String name;
    private String iconPath;
    private Set<Long> categoryIds;
    private Integer totalQuantity;
    private Integer minQuantity = -1;
    private Integer unitDefaultQuantity;
    private String unit;
    private Set<ItemInput> itemInputs;
    private NutritionalValueInput nutritionalValueInput;

    public ProductInput() {
        categoryIds = new HashSet<>();
        itemInputs = new HashSet<>();
        nutritionalValueInput = new NutritionalValueInput();
    }

    public ProductInput(Long id, String userId, String name, String iconPath, Integer totalQuantity, Integer minQuantity, Integer unitDefaultQuantity, String unit, Set<Long> categoryIds, Set<ItemInput> itemInputs, NutritionalValueInput nutritionalValueInput) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.iconPath = iconPath;
        this.totalQuantity = totalQuantity;
        this.minQuantity = minQuantity;
        this.unitDefaultQuantity = unitDefaultQuantity;
        this.unit = unit;
        this.categoryIds = categoryIds;
        this.itemInputs = itemInputs;
        this.nutritionalValueInput = nutritionalValueInput;
    }

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

    public Integer getUnitDefaultQuantity() {
        return unitDefaultQuantity;
    }

    public void setUnitDefaultQuantity(Integer unitDefaultQuantity) {
        this.unitDefaultQuantity = unitDefaultQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Set<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Set<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Set<ItemInput> getItemInputs() {
        return itemInputs;
    }

    public void setItemInputs(Set<ItemInput> itemInputs) {
        this.itemInputs = itemInputs;
    }

    public NutritionalValueInput getNutritionalValueInput() {
        return nutritionalValueInput;
    }

    public void setNutritionalValueInput(NutritionalValueInput nutritionalValueInput) {
        this.nutritionalValueInput = nutritionalValueInput;
    }
}
