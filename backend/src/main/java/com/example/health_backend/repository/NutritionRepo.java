package com.example.health_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.User;

@Repository
public interface NutritionRepo extends JpaRepository<Nutrition,Long>{
    List<Nutrition> findByUser(User user);
    List<Nutrition> findByUserAndDate(User user,LocalDate date);
}
