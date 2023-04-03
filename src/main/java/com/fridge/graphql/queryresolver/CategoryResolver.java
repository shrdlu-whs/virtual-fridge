package com.fridge.graphql.queryresolver;
import com.fridge.model.Category;
import com.fridge.model.Product;
import com.fridge.service.CategoryService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryResolver implements GraphQLQueryResolver {

    private final CategoryService categoryService;

    @Autowired
    public CategoryResolver(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public List<Category> getCategory() {
        List<Category> categories = categoryService.fetchCategories();
        return categories;
    }
}
