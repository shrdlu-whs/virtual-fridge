package com.fridge.model;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Category {

    private Long id;
    private String name;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
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
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
