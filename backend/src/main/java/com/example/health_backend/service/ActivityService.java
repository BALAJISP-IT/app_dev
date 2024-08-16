package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.Activity;
import com.example.health_backend.model.User;
import com.example.health_backend.repository.ActivityRepo;

@Service
public class ActivityService {
    @Autowired
    ActivityRepo activityRepo;

    public List<Activity> getActivityByUserAndDate(User user,LocalDate date)
    {
         return activityRepo.findByUserAndDate(user, date);
    }

    public Activity addActivity(Activity activity)
    {
        return activityRepo.save(activity);
    }

    public List<Activity> getActivityByUser(User user) {
       return activityRepo.findByUser(user);
    }
}
