package com.fridge.repository;

import com.fridge.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    @Query("select s from ShoppingList s where s.id = ?1 and s.userId = ?2")
    Optional<ShoppingList> getByIdAndUserId(Long id, String userId);

    @Query("select s from ShoppingList s where s.userId = ?1")
    List<ShoppingList> getAllByUserId(String userId);

    @Query("delete from ShoppingList s where s.id = ?1 and s.userId = ?2")
    void deleteByIdAndUserId(Long id, String userId);
}
