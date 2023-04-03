package com.fridge.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {

    private Long id;
    private String userId;
    private String name;
    private String iconPath;
    private Set<Category> category;
    private Integer totalQuantity;
    private Integer minQuantity = -1;
    private Integer unitDefaultQuantity;
    private String unit;
    private Set<Item> items;
    private NutritionalValue nutritionalValue;

    public Product() {
        category = new HashSet<>();
        items = new HashSet<>();
        nutritionalValue = new NutritionalValue();
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
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Column
    @NotNull
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column
    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "PRODUCT_CATEGORY")
    public Set<Category> getCategory() {
        return category;
    }

    public void setCategory(Set<Category> category) {
        this.category = category;
    }

    @Column
    @NotNull
    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    @Column
    @NotNull
    public Integer getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(Integer minQuantity) {
        this.minQuantity = minQuantity;
    }

    @Column
    @NotNull
    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "PRODUCT")
    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    @Column
    public Integer getUnitDefaultQuantity() {
        return unitDefaultQuantity;
    }

    public void setUnitDefaultQuantity(Integer unitDefaultQuantity) {
        this.unitDefaultQuantity = unitDefaultQuantity;
    }

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "NUTRITIONALVALUE")
    public NutritionalValue getNutritionalValue() {
        return nutritionalValue;
    }

    public void setNutritionalValue(NutritionalValue nutritionalValue) {
        this.nutritionalValue = nutritionalValue;
    }
}
