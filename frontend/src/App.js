import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Dashboard/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import ActivityLog from './components/ActivityLog/ActivityLog';
import SleepTracker from './components/WellnessMetrics/SleepTracker';
import WaterIntakeTracker from './components/WellnessMetrics/WaterIntakeTracker';
import FoodEntryForm from './components/NutritionLog/FoodEntryForm';
import SummaryCard from './components/Dashboard/SummaryCard';
import UserGoals from './components/UserGoals/UserGoals';
import { motion } from 'framer-motion';
import Footer from './Footer';
import LoginPage from './components/Log_In/LoginPage';
import RegisterPage from './components/Sign_Up/Register';
import LoginContext from './context';
import ProtectedRoute from './ProtectedRoute';
import GeminiActivity from './components/gemini_1.5_flash/gemini_1.5_flash';

// Define animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Component to animate routes
const AnimatedRoute = ({ component }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      transition={{ duration: 0.5 }}
    >
      {component}
    </motion.div>
  );
};

const App = () => {
  const [activities, setActivities] = useState([
    { name: 'Running', caloriesBurned: 300, date: '2024-07-24' },
    { name: 'Cycling', caloriesBurned: 200, date: '2024-07-23' },
  ]);

  const [nutrition, setNutrition] = useState([
    { name: 'Chicken', proteins: 30, date: '2024-07-24' },
    { name: 'Fish', proteins: 25, date: '2024-07-23' },
  ]);

  const [sleep, setSleep] = useState([
    { date: '2024-07-24', hours: 7 },
    { date: '2024-07-23', hours: 8 },
  ]);

  const [waterIntake, setWaterIntake] = useState([
    { date: '2024-07-24', amount: 2500 },
    { date: '2024-07-23', amount: 2800 },
  ]);

  const user=useState(null);
   //
  return (
    <LoginContext.Provider value={user}>

    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>

            <AnimatedRoute
              component={
                <UserGoals
                  activities={activities}
                  nutrition={nutrition}
                  sleep={sleep}
                  waterIntake={waterIntake}
                />
              }
            />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity-log"
          element={
            <ProtectedRoute>

            <AnimatedRoute
              component={<SummaryCard title="Activities" component={<ActivityLog />} />}
            />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nutrition-log"
          element={
            <ProtectedRoute>

            <AnimatedRoute
              component={<SummaryCard title="Nutrition" component={<FoodEntryForm />} />}
            />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sleep-tracker"
          element={
            <ProtectedRoute>
            <AnimatedRoute
              component={<SummaryCard title="Sleep Tracker" component={<SleepTracker />} />}
            />
            </ProtectedRoute>
          }
        />
        <Route
          path="/water-intake-tracker"
          element={
            <ProtectedRoute>

            <AnimatedRoute
              component={<SummaryCard title="Water Intake" component={<WaterIntakeTracker />} />}
            />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gemini_activity"
          element={
            <ProtectedRoute>
            <AnimatedRoute
              component={<SummaryCard title="Log Activity" component={<GeminiActivity />} />}
            />
             </ProtectedRoute>
          }
        />
        <Route path='/register'
        element={<RegisterPage />} />
        <Route path='/login'
        element={<LoginPage />} />
          <Route path="/exercise-validation" element={
              <ProtectedRoute>
          <div>
            <h1>Exercise Validation</h1>
            <iframe
              src="http://localhost:4001"
              allow="camera"
              style={{ width: '100%', height: '100vh', border: 'none' }}
              title="Exercise Validation"
            />
          </div>
          </ProtectedRoute>
          } />
      
      </Routes>
    </Router>
    </LoginContext.Provider>
  );
};

export default App;
