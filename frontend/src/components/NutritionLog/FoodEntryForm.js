import React, { createContext, useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid,Tab,Tabs } from '@mui/material';
import { motion } from 'framer-motion';
import NutritionChart from './NutritionChart';
import VideoBackground from '../UserGoals/ImageCarousel';
import axios from 'axios';
import LoginContext from '../../context';
import DragAndUpload from '../gemini_1.5_flash/DragAndUpload';
import ClickContext from '../../GeminiContext';
function FoodEntryForm() {
  const [foodEntries, setFoodEntries] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [nutritionData, setNutritionData] = useState([]);
  const [user, setUser] = useContext(LoginContext);
  const [click, setClick] = useState(false);
  const [tabValue, setTabValue] = useState(0); // State for tab selection

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch existing food entries for the current user and date
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        try {
          const res = await axios.post(`http://127.0.0.1:7777/goal/getNutrition?date=${getCurrentDate()}`, user);
          setFoodEntries(res.data);

          // Calculate the total nutrition data from the fetched entries
          const updatedNutritionData = calculateTotalNutrition(res.data);
          setNutritionData(updatedNutritionData);
        } catch (error) {
          console.error('Error fetching food entries:', error);
          alert('Error fetching food entries. Please try again later.');
        }
      };
      fetch();
    }
  }, [user, click]);

  // Handle adding a new food entry
  const handleAddFood = async () => {

    if (!foodName || !quantity) {
      alert('Please enter both food name and quantity.');
      return;
    }

    try {
      // Log the search term for debugging
      console.log('Fetching data for:', foodName);

      // Make API request to fetch food data
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          foodName
        )}&api_key=fKhjhU1x5ZBhxviof8szW55PJHXuWFXebmOyIMe2`
      );

      console.log('API response:', response.data);

      // Check if any foods were returned
      if (response.data.foods.length === 0) {
        alert('No food items found for this name.');
        return;
      }

      // Select the first food item from the response
      const apiFoodItem = response.data.foods[0];

      // Extract serving size and unit
      const servingSize = apiFoodItem.servingSize || 100; // Default to 100g if no serving size provided
      const servingSizeUnit = apiFoodItem.servingSizeUnit || 'g';

      console.log(`Serving Size: ${servingSize} ${servingSizeUnit}`);

      // Convert user input to the same unit as the serving size if needed
      let quantityInGrams = parseFloat(quantity);
      if (servingSizeUnit !== 'g') {
        // If serving size is not in grams, convert quantity to match
        if (servingSizeUnit === 'oz') {
          quantityInGrams *= 28.3495; // Convert ounces to grams
        }
      }

      console.log(`User Quantity: ${quantityInGrams} g`);

      // Extract nutrient information
      const nutrients = apiFoodItem.foodNutrients.reduce(
        (acc, nutrient) => {
          switch (nutrient.nutrientName.toLowerCase()) {
            case 'energy':
            case 'energy, total kcal':
            case 'energy, kilocalories':
              acc.calories = nutrient.value;
              break;
            case 'protein':
              acc.proteins = nutrient.value;
              break;
            case 'carbohydrate, by difference':
              acc.carbohydrates = nutrient.value;
              break;
            case 'total lipid (fat)':
              acc.fats = nutrient.value;
              break;
            default:
              break;
          }
          return acc;
        },
        { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
      );

      console.log('Nutrients from API:', nutrients);

      // Calculate the nutritional values based on user quantity and serving size
      const newEntry = {
        foodName: foodName,
        servingSize: quantityInGrams,
        calories: (nutrients.calories * quantityInGrams) / servingSize,
        proteins: (nutrients.proteins * quantityInGrams) / servingSize,
        carbohydrates: (nutrients.carbohydrates * quantityInGrams) / servingSize,
        fats: (nutrients.fats * quantityInGrams) / servingSize,
        date: getCurrentDate(),
        user: user
      };

      // Add the new entry to the backend
      const addData = async () => {
        try {
          if (newEntry) {
            await axios.post("http://127.0.0.1:7777/goal/addProtein", newEntry);
          }
        } catch (error) {
          console.error('Error adding food entry:', error);
          alert('Error adding food entry. Please try again later.');
        }
      }
      await addData();

      console.log('New Entry:', newEntry);

      // Update local state
      setFoodEntries([...foodEntries, newEntry]);

      // Update nutrition data for the chart
      const updatedNutritionData = calculateTotalNutrition([
        ...foodEntries,
        newEntry,
      ]);
      setNutritionData(updatedNutritionData);

      setFoodName('');
      setQuantity('');
    } catch (error) {
      console.error('Error fetching food data:', error);
      alert('Error fetching food data. Please try again later.');
    }
    setClick(!click);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // Calculate total nutrition for the current entries
  const calculateTotalNutrition = (entries) => {
    const totals = entries.reduce(
      (acc, entry) => {
        acc.calories += entry.calories;
        acc.proteins += entry.proteins;
        acc.carbohydrates += entry.carbohydrates;
        acc.fats += entry.fats;
        return acc;
      },
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
    );

    return [{ ...totals, date: new Date().toISOString().split('T')[0] }];
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Main Content */}
      <VideoBackground src="4821100-uhd_3840_2160_25fps" />
      <Box
        sx={{
          width: '80%',
          maxWidth: '500px',
          margin: '100px auto',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(0px)',
          borderRadius: '8px',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#333',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: 4,
          }}
        >
          Log Your Food Intake
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Manual Entry" />
          <Tab label="Upload Image" />
        </Tabs>

        {tabValue==0&&<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
              <Grid item xs={6}>
                <TextField
                  label="Food Name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Quantity (grams)"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    textAlign: 'center',
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
              </Grid>
            </Grid>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFood}
              sx={{ fontFamily: 'Roboto, sans-serif', marginTop: 3 }}
            >
              Add Food Entry
            </Button>
          </motion.div>
        </Box>}
        {tabValue === 1 && (
          <Box sx={{ marginTop: 4 }}>
         <ClickContext.Provider value={[click,setClick]}>


            <DragAndUpload /> 
         </ClickContext.Provider>
        
       
          </Box>
        )}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          sx={{ marginTop: 4 }} // Add some space above the chart
        >
          <NutritionChart data={nutritionData} />
        </motion.div>
      </Box>
    </Box>
  );
}

export default FoodEntryForm;