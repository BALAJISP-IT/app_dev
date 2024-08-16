package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;
import com.example.health_backend.repository.SleepRepo;

@Service
public class SleepService {
    @Autowired
    SleepRepo sleepRepo;
    public Sleep addSleep(Sleep sleep)
    {
        return sleepRepo.save(sleep);
    }
    public List<Sleep> getSleepByUser(User user)
    {
        return sleepRepo.findByUser(user);
    }
    public List<Sleep> getSleepByUserAndDate(User user,LocalDate date)
    {
        return sleepRepo.findByUserAndDate(user, date);
    }
}
