package com.example.health_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.Goal;
import com.example.health_backend.model.User;
import com.example.health_backend.service.GoalService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/goal")
public class GoalsController {
    @Autowired
    GoalService goalService;
    @PostMapping("/add")
    public Goal postMethodName(@RequestBody Goal entity) {
        //TODO: process POST request
        
        return goalService.addGoal(entity);
    }
    @PostMapping("/get")
    public Goal getMethodName(@RequestBody User user,@RequestParam LocalDate date) {
        return goalService.getGoalByUserAndDate(user,date);
    }
    
    
}
