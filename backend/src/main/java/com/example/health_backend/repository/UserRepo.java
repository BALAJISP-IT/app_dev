package com.example.health_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.health_backend.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long>{
    User findByUsername(String username);
}
