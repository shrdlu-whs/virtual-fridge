package com.fridge.model;

import com.fridge.constants.Difficulty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Recipe {

    private Long id;
    private String userId;
    private String name;
    private String shortDescription;
    private String instructions;
    private String iconPath;
    private Set<RecipeItem> recipeItems;
    private String hyperlink;
    private Boolean favorite = false;
    private Long expectedTime;
    private Difficulty difficulty = Difficulty.intermediate;
    private LocalDateTime created;

    public Recipe() {
        recipeItems = new HashSet<>();
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

    @Column()
    @Lob
    @NotNull
    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    @Column()
    @Lob
    @NotNull
    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    @Column
    public String getIconPath() {
        return iconPath;
    }

    public void setIconPath(String iconPath) {
        this.iconPath = iconPath;
    }

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "RECIPE")
    public Set<RecipeItem> getRecipeItems() {
        return recipeItems;
    }

    public void setRecipeItems(Set<RecipeItem> recipeItems) {
        this.recipeItems = recipeItems;
    }

    @Column
    public String getHyperlink() {
        return hyperlink;
    }

    public void setHyperlink(String hyperlink) {
        this.hyperlink = hyperlink;
    }

    @Column
    @NotNull
    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    @Column
    @NotNull
    public Long getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
    }

    @Column
    @NotNull
    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    @Column
    @NotNull
    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @PrePersist
    public void setCreatedPrePersist() {
        created = LocalDateTime.now();
    }
}
