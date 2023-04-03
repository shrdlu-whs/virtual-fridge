package com.fridge.service;

import com.fridge.model.Category;
import com.fridge.repository.CategoryRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
public class CategoryServiceImplTest {


    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    Category category1;
    Category category2;

    @Before
    public void init(){

        category1 = new Category();
        category1.setId((long) 10);
        category1.setName("Fleisch");

        category2 = new Category();
        category2.setId((long) 5);
        category2.setName("Gemüse");

    }

    @Test
    public void categoryShouldBeSaved(){

        Category category = categoryService.saveCategory(category1);
        assertThat(categoryRepository.findById(category.getId()).get().getName()).isEqualTo(category1.getName());
        assertThat(category.getId()).isNotNull();

    }

    @Test
    public void categoryShouldbeFetched(){

        categoryService.saveCategory(category1);
        List<Category> categoryList = categoryService.fetchCategories();
        assertThat(categoryList).isNotEmpty();

    }

    @Test
    public void categoryShouldBeUpdated(){

        Category updatableCategory = categoryService.saveCategory(category2);
        Category updatedCategory = categoryService.updateCategory(category1, updatableCategory.getId());
        Optional<Category> found = categoryRepository.findById(updatableCategory.getId());

        assertThat(category1.getId()).isEqualTo(updatableCategory.getId());
        assertThat(updatedCategory).isNull();
        assertThat(found.get().getId()).isEqualTo(category1.getId());

    }

    @Test
    public void categoryShouldBeDeleted(){

        categoryService.saveCategory(category1);
//        categoryService.deleteCategory(category1);
        Optional<Category> found = categoryRepository.findById(category1.getId());
        assertThat(found).isEmpty();

    }

}
