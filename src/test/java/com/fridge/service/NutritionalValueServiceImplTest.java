package com.fridge.service;

import com.fridge.model.NutritionalValue;
import com.fridge.repository.NutritionalValueRepository;
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
public class NutritionalValueServiceImplTest {

    @Autowired
    private NutritionalValueService nutritionalValueService;

    @Autowired
    private NutritionalValueRepository nutritionalValueRepository;

    NutritionalValue nutritionalValue1;
    NutritionalValue nutritionalValue2;

    @Before
    public void init(){

        nutritionalValue1 = new NutritionalValue("A", 100, 0, 0, 10, 0, 0, 75, 15);
        nutritionalValue2 = new NutritionalValue("C", 100, 0, 0, 10, 0, 0, 75, 15);


    }

    @Test
    public void nutritionalValueShouldBeSaved(){

        Long nutritionalValueId = nutritionalValueService.saveNutritionalValue(nutritionalValue1);
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getNutritionScore()).isEqualTo(nutritionalValue1.getNutritionScore());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getProtein()).isEqualTo(nutritionalValue1.getProtein());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getSaturatedFat()).isEqualTo(nutritionalValue1.getSaturatedFat());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getSalt()).isEqualTo(nutritionalValue1.getSalt());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getFiber()).isEqualTo(nutritionalValue1.getFiber());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getCalories()).isEqualTo(nutritionalValue1.getCalories());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getSugar()).isEqualTo(nutritionalValue1.getSugar());
        assertThat(nutritionalValueRepository.findById(nutritionalValueId).get().getCarbohydrates()).isEqualTo(nutritionalValue1.getCarbohydrates());

        assertThat(nutritionalValueId).isNotNull();

    }

    @Test
    public void nutritionalValueShouldbeFetched(){

        nutritionalValueService.saveNutritionalValue(nutritionalValue1);
        List<NutritionalValue> nutritionalValueList = nutritionalValueService.fetchNutritionalValues();
        assertThat(nutritionalValueList).isNotEmpty();

    }

    @Test
    public void nutritionalValueShouldBeUpdated(){

        Long updatableId = nutritionalValueService.saveNutritionalValue(nutritionalValue2);
        ResponseEntity<Object> updateNutritionalValue = nutritionalValueService.updateNutritionalValue(nutritionalValue1, updatableId);
        Optional<NutritionalValue> found = nutritionalValueRepository.findById((updatableId));

        assertThat(nutritionalValue1.getId()).isEqualTo(updatableId);
        assertThat(updateNutritionalValue.getBody()).isNull();
        assertThat(found.get().getId()).isEqualTo(nutritionalValue1.getId());

    }

    @Test
    public void nutritionalValueShouldBeDeleted(){

        nutritionalValueService.saveNutritionalValue(nutritionalValue1);
//        nutritionalValueService.deleteNutritionalValue(nutritionalValue1);
        Optional<NutritionalValue> found = nutritionalValueRepository.findById(nutritionalValue1.getId());
        assertThat(found).isEmpty();

    }

}
