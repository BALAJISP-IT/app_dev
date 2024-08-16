package com.example.health_backend.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.health_backend.model.GoalEntries;
import com.example.health_backend.model.User;

public interface GoalEntriesRepo extends JpaRepository<GoalEntries,Long>{
    GoalEntries findByUserAndDate(User user,LocalDate date);
}
