package com.example.health_backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.health_backend.model.User;
import com.example.health_backend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> postMethodName1(@RequestBody User entity) {
        //TODO: process POST request
        
        return userService.addUser(entity);
    }
    @PostMapping("/login")
    public ResponseEntity<User> postMethodName2(@RequestBody User entity) {
        //TODO: process POST request
        
        return userService.verifyUser(entity);
    }
    @GetMapping("/{id}")
    public Optional<User> getMethodName(@PathVariable Long id) {
        return userService.getUser(id);
    }
    
    
    
    
}
