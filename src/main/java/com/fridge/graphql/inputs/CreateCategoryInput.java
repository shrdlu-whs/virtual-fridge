package com.fridge.graphql.inputs;

public class CreateCategoryInput {
    private String userId;
    private String name;

    public CreateCategoryInput() {
    }

    public CreateCategoryInput(String userId, String name) {
        this.userId = userId;
        this.name = name;
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
}
