package com.fridge.repository;
import com.fridge.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("select r from Recipe r where r.id = ?1 and r.userId = ?2")
    Optional<Recipe> getByIdAndUserId(Long id, String userId);

    @Query("select r from Recipe r where r.userId = ?1")
    List<Recipe> getAllByUserId(String userId);

    @Query("delete from Recipe r where r.id = ?1 and r.userId = ?2")
    void deleteByIdAndUserId(Long id, String userId);
}
