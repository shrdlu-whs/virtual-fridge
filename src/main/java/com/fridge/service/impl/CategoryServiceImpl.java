package com.fridge.service.impl;

import com.fridge.model.Category;
import com.fridge.repository.CategoryRepository;
import com.fridge.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category getCategory(long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent())
            return optionalCategory.get();
        else
            return null; //TODO real exception handling
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> fetchCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Category category, long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent())
            return null;
        category.setId(id);
        return categoryRepository.save(category);
//        return ResponseEntity.noContent().build();
    }

    @Override
    public long deleteCategory(long id) {
        categoryRepository.deleteById(id);
        return id;
    }
}
