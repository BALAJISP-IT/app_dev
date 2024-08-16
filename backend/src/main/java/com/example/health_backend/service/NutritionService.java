package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.User;
import com.example.health_backend.repository.NutritionRepo;
import com.example.health_backend.repository.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class NutritionService {
    @Autowired
    NutritionRepo nutritionRepo;
    @Autowired
    UserRepo userRepo;
    @Transactional
    public Nutrition addNutrition(Nutrition nutrition) {
        Long userId = nutrition.getUser().getId(); // Assuming userId is passed correctly
        Optional<User> userOptional = userRepo.findById(userId);

        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User with id " + userId + " not found");
        }

        User managedUser = userOptional.get();
        nutrition.setUser(managedUser); // Ensure the User is managed

        return nutritionRepo.save(nutrition);
    }
    public List<Nutrition> getNutritionByUser(User user,LocalDate date)
    {
        return nutritionRepo.findByUserAndDate(user, date);
    }
}
