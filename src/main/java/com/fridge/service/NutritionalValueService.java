package com.fridge.service;

import com.fridge.model.NutritionalValue;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NutritionalValueService {
    Long saveNutritionalValue(NutritionalValue nutritionalValue);

    List<NutritionalValue> fetchNutritionalValues();

    ResponseEntity<Object> updateNutritionalValue(NutritionalValue nutritionalValue, long id);

    long deleteNutritionalValue(long id);
}
