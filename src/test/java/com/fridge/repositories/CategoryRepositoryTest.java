package com.fridge.repositories;

import com.fridge.model.Category;
import com.fridge.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = {"classpath:application-test.properties"})
@ActiveProfiles("test")
public class CategoryRepositoryTest {

    private Category category1;
    private Category category2;

    @Autowired
    CategoryRepository categoryRepository;

    @BeforeEach
    public void init(){
        category1 = new Category();
        category2 = new Category();
        category1.setName("Fleisch");
        category2.setName("Gemüse");
    }

    @Test
    public void saveCategory(){

        Category savedCategory = categoryRepository.save(category1);

        assertThat(savedCategory.getName()).isEqualTo("Fleisch");
        assertThat(savedCategory.getId()).isNotNull();

    }

    @Test
    public void fetchCategories(){

        categoryRepository.save(category1);
        categoryRepository.save(category2);

        List<Category> found = categoryRepository.findAll();

        assertThat(found.isEmpty()).isFalse();

        Optional<Category> foundById = categoryRepository.findById(category2.getId());

        assertThat(foundById).isNotNull();

    }

    @Test
    public void deleteCategory(){

        categoryRepository.save(category1);

        categoryRepository.delete(category1);

        Optional<Category> found = categoryRepository.findById(category1.getId());

        assertThat(found).isEmpty();

    }

}
