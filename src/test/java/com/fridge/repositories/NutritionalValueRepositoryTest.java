package com.fridge.repositories;

import com.fridge.model.NutritionalValue;
import com.fridge.repository.NutritionalValueRepository;
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
public class NutritionalValueRepositoryTest {

    private NutritionalValue nutritionalValue1;
    private NutritionalValue nutritionalValue2;

    @Autowired
    NutritionalValueRepository nutritionalValueRepository;

    @BeforeEach
    public void init(){

        nutritionalValue1 = new NutritionalValue("A", 100, 0, 0, 10, 0, 0, 75, 15);
        nutritionalValue2 = new NutritionalValue("C", 100, 0, 0, 10, 0, 0, 75, 15);

    }

    @Test
    public void saveNutrition(){

        NutritionalValue savedNutrition = nutritionalValueRepository.save(nutritionalValue1);

        assertThat(savedNutrition.getCalories()).isNotNull();
        assertThat(savedNutrition.getCarbohydrates()).isNotNull();
        assertThat(savedNutrition.getFat()).isNotNull();
        assertThat(savedNutrition.getFiber()).isNotNull();
        assertThat(savedNutrition.getId()).isNotNull();
        assertThat(savedNutrition.getNutritionScore()).isEqualTo("A");
        assertThat(savedNutrition.getSugar()).isNotNull();
        assertThat(savedNutrition.getSaturatedFat()).isNotNull();
        assertThat(savedNutrition.getSalt()).isNotNull();
        assertThat(savedNutrition.getProtein()).isNotNull();

    }

    @Test
    public void fetchNutrition(){

        nutritionalValueRepository.save(nutritionalValue1);
        nutritionalValueRepository.save(nutritionalValue2);

        List<NutritionalValue> found = nutritionalValueRepository.findAll();

        assertThat(found.isEmpty()).isFalse();

        Optional<NutritionalValue> foundById = nutritionalValueRepository.findById(nutritionalValue2.getId());

        assertThat(foundById).isNotNull();

    }

    @Test
    public void deleteNutrition(){

        nutritionalValueRepository.save(nutritionalValue1);

        nutritionalValueRepository.delete(nutritionalValue1);

        Optional<NutritionalValue> found = nutritionalValueRepository.findById(nutritionalValue1.getId());

        assertThat(found).isEmpty();

    }

}
