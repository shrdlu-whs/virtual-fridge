package com.fridge.graphql.inputs;

public class CategoryInput {

    Long id;
    String name;

    public CategoryInput(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CategoryInput() {
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
