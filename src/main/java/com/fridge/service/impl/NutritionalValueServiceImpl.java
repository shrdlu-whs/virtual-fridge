package com.fridge.service.impl;

import com.fridge.model.NutritionalValue;
import com.fridge.repository.NutritionalValueRepository;
import com.fridge.service.NutritionalValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionalValueServiceImpl implements NutritionalValueService {

    private final NutritionalValueRepository nutritionalValueRepository;

    @Autowired
    public NutritionalValueServiceImpl(NutritionalValueRepository nutritionalValueRepository) {
        this.nutritionalValueRepository = nutritionalValueRepository;
    }

    @Override
    public Long saveNutritionalValue(NutritionalValue nutritionalValue) {
        return nutritionalValueRepository.save(nutritionalValue).getId();
    }

    @Override
    public List<NutritionalValue> fetchNutritionalValues() {
        return nutritionalValueRepository.findAll();
    }

    @Override
    public ResponseEntity<Object> updateNutritionalValue(NutritionalValue nutritionalValue, long id) {
        Optional<NutritionalValue> nutritionalValueOptional = nutritionalValueRepository.findById(id);
        if (!nutritionalValueOptional.isPresent())
            return ResponseEntity.notFound().build();
        nutritionalValue.setId(id);
        nutritionalValueRepository.save(nutritionalValue);
        return ResponseEntity.noContent().build();
    }

    @Override
    public long deleteNutritionalValue(long id) {
        nutritionalValueRepository.deleteById(id);
        if (nutritionalValueRepository.getOne(id) == null)
            return id;
        else
            return -1;
    }
}
