package com.example.health_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.Goal;
import com.example.health_backend.model.User;
import java.time.LocalDate;


@Repository
public interface GoalRepo extends JpaRepository<Goal,Long>{
    List<Goal> findByUser(User user);
    
    Goal findByUserAndDate(User user, LocalDate date);

     Goal findByDate(LocalDate localDate);
    

}
