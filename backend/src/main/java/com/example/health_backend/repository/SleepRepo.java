package com.example.health_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;

@Repository
public interface SleepRepo extends JpaRepository<Sleep,Long>{
    List<Sleep> findByUser(User user);
    List<Sleep> findByUserAndDate(User user,LocalDate date);
}
