package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;
import com.example.health_backend.repository.WaterIntakeRepo;

@Service
public class WaterIntakeService {
    @Autowired
    WaterIntakeRepo waterIntakeRepo;
    public WaterIntake addWaterIntake(WaterIntake waterIntake)
    {
        return waterIntakeRepo.save(waterIntake);
    }
    public List<WaterIntake> getWaterIntakeByUserAndDate(User user,LocalDate date)
    {
        return waterIntakeRepo.findByUserAndDate(user, date);
    }
    public List<WaterIntake> getWaterIntakeByUser(User user)
    {
        return waterIntakeRepo.findByUser(user);
    }
}
