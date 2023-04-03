package com.fridge.graphql.mutationresolver;
import com.fridge.graphql.inputs.CreateCategoryInput;
import com.fridge.graphql.inputs.UpdateCategoryInput;
import com.fridge.model.Category;
import com.fridge.service.CategoryService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoryMutationResolver implements GraphQLMutationResolver {

    private final CategoryService categoryService;

    @Autowired
    public CategoryMutationResolver(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public Category createCategory(CreateCategoryInput input) {
        Category tempCategory = new Category(input.getName());
        return categoryService.saveCategory(tempCategory);
    }

    public Category updateCategory(UpdateCategoryInput input) {
        Category tempCategory = categoryService.getCategory(input.getId());
        tempCategory.setName(input.getName());
        return categoryService.updateCategory(tempCategory, input.getId());
    }

    public long deleteCategory(long id) {
        categoryService.deleteCategory(id);
        return id;
    }
}
