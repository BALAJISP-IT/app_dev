package com.example.health_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;
import com.example.health_backend.service.WaterIntakeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/water")
public class WaterIntakeController {
    @Autowired 
    WaterIntakeService waterIntakeService;
    @PostMapping("/get")
    public List<WaterIntake> getMethodName(@RequestBody User user) {
        return waterIntakeService.getWaterIntakeByUser(user);
    }
    
}
