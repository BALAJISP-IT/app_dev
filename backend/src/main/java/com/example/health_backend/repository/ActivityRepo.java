package com.example.health_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.Activity;
import com.example.health_backend.model.User;

@Repository
public interface ActivityRepo extends JpaRepository<Activity,Long>{
List<Activity> findByUser(User user);
List<Activity> findByUserAndDate(User user,LocalDate date);
    
} 
