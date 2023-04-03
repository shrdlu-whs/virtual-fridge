package com.fridge.service;

import com.fridge.model.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoryService {
    Category getCategory(long id);
    Category saveCategory(Category category);
    List<Category> fetchCategories();
    Category updateCategory(Category category, long id);
    long deleteCategory(long id);
}
