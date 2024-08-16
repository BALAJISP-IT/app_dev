package com.example.health_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.User;
import com.example.health_backend.service.NutritionService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/goal")
public class NutritionController {
    @Autowired
    NutritionService nutritionService;
    @PostMapping("/getNutrition")
    public List<Nutrition> postMethodName(@RequestBody User user,@RequestParam LocalDate date) {
        //TODO: process POST request
        
        return nutritionService.getNutritionByUser(user,date);
    }
    
}
