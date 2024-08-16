package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.Goal;
import com.example.health_backend.model.Activity;
import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;
import com.example.health_backend.repository.GoalRepo;
import com.example.health_backend.repository.UserRepo;

@Service
public class GoalService {
    @Autowired
    GoalRepo goalRepo;
    @Autowired
    UserRepo userRepo;

    
    List<Goal> getGoalByUser(User user)    //read
    {
           return goalRepo.findByUser(user);
    }
    public Goal getGoalByUserAndDate(User user,LocalDate date) //read
    {
        return goalRepo.findByUserAndDate(user, date);
    }
    public Goal addGoal(Goal goal)
    {
        User user = goal.getUser();
        System.out.println(user.getUsername());
         if(goalRepo.findByUserAndDate(user,goal.getDate())!=null)
         {
            System.out.println(goal.getCaloriesGoal());
            System.out.println(goal.getProteinsGoal());
            Goal goal2=goalRepo.findByUserAndDate(user,goal.getDate());
            goal2.setCaloriesGoal(goal.getCaloriesGoal());
            goal2.setProteinsGoal(goal.getProteinsGoal());
            goal2.setSleepGoal(goal.getSleepGoal());
            goal2.setWaterGoal(goal.getWaterGoal());
            return goalRepo.save(goal2);
         }
        if (user.getId() == null) {
            // Check if the user already exists in the database
            Optional<User> existingUser = Optional.ofNullable(userRepo.findByUsername(user.getUsername()));

            if (existingUser.isPresent()) {
                // Use the existing user from the database
                goal.setUser(existingUser.get());
            } else {
                // Persist the new user if it doesn't exist
                user = userRepo.save(user);
                goal.setUser(user);
            }
        }

        // Save the goal with a persisted user
        return goalRepo.save(goal);
    }

}
