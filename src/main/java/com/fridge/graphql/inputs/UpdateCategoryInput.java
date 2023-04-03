package com.fridge.graphql.inputs;
public class UpdateCategoryInput {

    String userId;
    Long id;
    String name;

    public UpdateCategoryInput(String userId, Long id, String name) {
        this.userId = userId;
        this.id = id;
        this.name = name;
    }

    public UpdateCategoryInput() {
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
}
