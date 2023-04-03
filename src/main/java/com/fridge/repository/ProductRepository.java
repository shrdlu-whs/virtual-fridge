package com.fridge.repository;

import com.fridge.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p from Product p where p.id = ?1 and p.userId = ?2")
    Optional<Product> getByIdAndUserId(Long id, String userId);

    @Query("select p from Product p where p.userId = ?1")
    Set<Product> getAllByUserId(String userId);

    @Query("delete from Product p where p.id = ?1 and p.userId = ?2")
    void deleteByIdAndUserId(Long id, String userId);
}
