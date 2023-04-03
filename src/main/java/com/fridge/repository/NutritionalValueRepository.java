package com.fridge.repository;

import com.fridge.model.NutritionalValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionalValueRepository extends JpaRepository<NutritionalValue, Long> {
}
