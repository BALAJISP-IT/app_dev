package com.example.health_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.Activity;
import com.example.health_backend.model.User;
import com.example.health_backend.service.ActivityService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class ActivityController {
    @Autowired
    ActivityService activityService;
    @PostMapping("/activities")
    public List<Activity> getMethodName(@RequestBody User user) {
        return activityService.getActivityByUser(user);
    }
    
    
}
