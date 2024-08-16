package com.example.health_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;
import com.example.health_backend.service.SleepService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/sleep")
public class SleepController {

    @Autowired
    SleepService sleepService;
    @PostMapping("/get")
    public List<Sleep> postMethodName(@RequestBody User entity) {
        //TODO: process POST request
        
        return sleepService.getSleepByUser(entity);
    }
    
    
}
