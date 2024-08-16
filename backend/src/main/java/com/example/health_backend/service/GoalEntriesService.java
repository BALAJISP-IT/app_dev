package com.example.health_backend.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.health_backend.model.Activity;
import com.example.health_backend.model.GoalEntries;
import com.example.health_backend.model.Nutrition;
import com.example.health_backend.model.Sleep;
import com.example.health_backend.model.User;
import com.example.health_backend.model.WaterIntake;
import com.example.health_backend.repository.GoalEntriesRepo;

@Service
public class GoalEntriesService {
    @Autowired
    GoalEntriesRepo goalEntriesRepo;
    @Autowired
    ActivityService activityService;
    @Autowired
    NutritionService nutritionService;
    @Autowired
    WaterIntakeService waterIntakeService;
    @Autowired
    SleepService sleepService;
     
    public GoalEntries addGoalEntries(Activity activity) {
        activityService.addActivity(activity);
        return updateOrCreateGoalEntry(
            activity.getUser(),
            activity.getDate(),
            activity.getCaloriesBurned(),
            0L,
            0L,
            0L
        );
    }

    public GoalEntries addGoalEntries(Nutrition nutrition) {
        nutritionService.addNutrition(nutrition);
        return updateOrCreateGoalEntry(
            nutrition.getUser(),
            nutrition.getDate(),
            0L,
            nutrition.getProteins(),
            0L,
            0L
        );
    }

    public GoalEntries addGoalEntries(WaterIntake waterIntake) {
        waterIntakeService.addWaterIntake(waterIntake);
        return updateOrCreateGoalEntry(
            waterIntake.getUser(),
            waterIntake.getDate(),
            0L,
            0L,
            0L,
            waterIntake.getAmount()
        );
    }

    public GoalEntries addGoalEntries(Sleep sleep) {
        sleepService.addSleep(sleep);
        return updateOrCreateGoalEntry(
            sleep.getUser(),
            sleep.getDate(),
            0L,
            0L,
            sleep.getHoursOfSleep(),
            0L
        );
    }

    private GoalEntries updateOrCreateGoalEntry(
        User user, 
        LocalDate date, 
        long calories, 
        long proteins, 
        long sleep, 
        long water
    ) {
        Optional<GoalEntries> existingGoalEntriesOpt = Optional.ofNullable(goalEntriesRepo.findByUserAndDate(user, date));

        GoalEntries goalEntries;
        
        if (existingGoalEntriesOpt.isPresent()) {
            goalEntries = existingGoalEntriesOpt.get();
            
            // Update the existing goal entries
            goalEntries.setCalories(goalEntries.getCalories() + calories);
            goalEntries.setProtein(goalEntries.getProtein() + proteins);
            goalEntries.setSleep(goalEntries.getSleep() + sleep);
            goalEntries.setWater(goalEntries.getWater() + water);
        } else {
            // Create a new goal entry if none exist
            goalEntries = new GoalEntries();
            goalEntries.setUser(user);
            goalEntries.setCalories(calories);
            goalEntries.setProtein(proteins);
            goalEntries.setSleep(sleep);
            goalEntries.setWater(water);
            goalEntries.setDate(date);
        }

        // Save and return the goal entries
        return goalEntriesRepo.saveAndFlush(goalEntries);
    }
    public GoalEntries getGoalEntriesByUserAndDate(User user,LocalDate Date)
    {
        return goalEntriesRepo.findByUserAndDate(user, Date);
    }
}
