package com.example.health_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;

@Repository
public interface WaterIntakeRepo  extends JpaRepository<WaterIntake,Long>{
    List<WaterIntake> findByUser(User user);
    List<WaterIntake> findByUserAndDate(User user,LocalDate date);
}
