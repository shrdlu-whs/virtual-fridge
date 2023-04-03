package com.fridge.controller;

import com.fridge.dto.CategoryDto;
import com.fridge.dto.ProductDto;
import com.fridge.model.Category;
import com.fridge.model.Product;
import com.fridge.service.CategoryService;
import com.fridge.service.ProductService;
import com.fridge.util.ObjectMapperUtils;
//import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories() {
        List<Category> categoryEntities = categoryService.fetchCategories();
        List<CategoryDto> categoryDtos = ObjectMapperUtils.mapAll(categoryEntities, CategoryDto.class);
        return ResponseEntity.status(HttpStatus.OK).body(categoryDtos);
    }

    @PostMapping("/categories")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto, Principal principal) {
        Category category = ObjectMapperUtils.map(categoryDto, Category.class);
        Category returnedCategory = categoryService.saveCategory(category);
        CategoryDto responseCategoryDto = ObjectMapperUtils.map(returnedCategory, CategoryDto.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseCategoryDto);
    }
}
