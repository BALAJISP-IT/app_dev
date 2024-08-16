package com.example.health_backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.User;
import com.example.health_backend.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
    public ResponseEntity<User> addUser(User user)
    {
        if(userRepo.findByUsername(user.getUsername())!=null)
        {
            return new ResponseEntity<User>(user,HttpStatus.CONFLICT);
        }
        user.setPassword(bcrypt.encode(user.getPassword()));
        return new ResponseEntity<User>(userRepo.save(user),HttpStatus.OK);
    }
    public Optional<User> getUser(Long id) {
        // TODO Auto-generated method stub
        return userRepo.findById(id);
    }
    public ResponseEntity<User> verifyUser(User user)
    {
        if(userRepo.findByUsername(user.getUsername())!=null)
        {
        String password=user.getPassword();
        String encrypted=userRepo.findByUsername(user.getUsername()).getPassword();
        if(bcrypt.matches(password, encrypted))
        {
            return new ResponseEntity<User>(userRepo.findByUsername(user.getUsername()),HttpStatus.OK);
        }
    }
        
        return new ResponseEntity<User>(user,HttpStatus.CONFLICT);
    }
}
