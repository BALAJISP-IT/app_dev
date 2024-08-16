package com.example.health_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.Activity;
import com.example.health_backend.model.GoalEntries;
import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;
import com.example.health_backend.service.GoalEntriesService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/goal")
public class GoalEntriesController {
    @Autowired
    GoalEntriesService goalEntriesService;
    @PostMapping("/addCalories")
    public GoalEntries postMethodName(@RequestBody Activity entity) {
        //TODO: process POST request
        
        return goalEntriesService.addGoalEntries(entity);
    }
    @PostMapping("/addProtein")
    public GoalEntries postMethodName(@RequestBody Nutrition entity) {
        //TODO: process POST request
        
        return goalEntriesService.addGoalEntries(entity);
    }
    @PostMapping("/addWater")
    public GoalEntries postMethodName(@RequestBody WaterIntake entity) {
        //TODO: process POST request
        
        return goalEntriesService.addGoalEntries(entity);
    }
    @PostMapping("/addSleep")
    public GoalEntries postMethodName(@RequestBody Sleep entity) {
        //TODO: process POST request
        
        return goalEntriesService.addGoalEntries(entity);
    }
    @PostMapping("/")
    public GoalEntries getMethodName(@RequestBody User user,@RequestParam LocalDate date) {
        return goalEntriesService.getGoalEntriesByUserAndDate(user, date);
    }
    
    
}
