import React, { useContext, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoginContext from '../../context';
import ClickContext from '../../GeminiContext';

const DragAndUpload = ({ onUploadSuccess }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [response, setResponse] = useState(null);
  const [user,setUser]=useContext(LoginContext);
  const [click,setClick]=useContext(ClickContext)
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const parseFoodString = (data) => {
    const responseText = data.trim();
    const match = responseText.match(/\(([^,]+),\s*(\d+)\s*grams?\)\s*/i);
    if (match) {
      return {
        foodName: match[1].trim(),
        quantity: match[2].trim()
      };
    }
    return null;
  };


  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
        alert('Please select a file.');
        return;
      }
  
      setUploading(true);
      setUploadSuccess(false);
      setUploadError('');
      setResponse(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data.response);
      setUploading(false);
      setUploadSuccess(true);
      setResponse(parseFoodString(response.data.response));
      
      console.log(parseFoodString(response.data.response));
      await handleAddFood();
      if (response.data && onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (error) {
        console.error('Error uploading file:', error);
        setUploading(false);
        setUploadError('Error uploading file. Please try again later.');
    }
  };
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
  const handleAddFood = async () => {
    
    if (!response || !response.foodName || !response.quantity) {
        alert('Invalid response. Please try again.');
        return;
      }
  
    if (!response.foodName || !response.quantity) {
      alert('Please enter both food name and quantity.');
      return;
    }

    try {
      // Log the search term for debugging
      console.log('Fetching data for:', response.foodName);

      // Make API request to fetch food data
      const response1 = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          response.foodName
        )}&api_key=fKhjhU1x5ZBhxviof8szW55PJHXuWFXebmOyIMe2`
      );

      console.log('API response:', response1.data);

      // Check if any foods were returned
      if (response1.data.foods.length === 0) {
        alert('No food items found for this name.');
        return;
      }

      // Select the first food item from the response
      const apiFoodItem = response1.data.foods[0];

      // Extract serving size and unit
      const servingSize = apiFoodItem.servingSize || 100; // Default to 100g if no serving size provided
      const servingSizeUnit = apiFoodItem.servingSizeUnit || 'g';

      console.log(`Serving Size: ${servingSize} ${servingSizeUnit}`);

      // Convert user input to the same unit as the serving size if needed
      let quantityInGrams = parseFloat(response.quantity);
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
      const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      const newEntry = {
        foodName: response.foodName,
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

      // Update nutrition data for the chart
   
    } catch (error) {
      console.error('Error fetching food data:', error);
      alert('Error fetching food data. Please try again later.');
    }
    setClick(!click);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          border: '2px dashed #cccccc',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: dragging ? '#e0f7fa' : '#ffffff',
          transition: 'background-color 0.3s ease',
          position: 'relative',
          boxShadow: dragging ? '0 0 15px rgba(0, 0, 0, 0.2)' : '0 0 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()} // Prevent default on drag over
        onDrop={handleDrop}
        // onClick={() => document.getElementById('file-upload').click()}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {file ? file.name : dragging ? 'Release to Upload!' : 'Drag & Drop Your File Here'}
        </Typography>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => document.getElementById('file-upload').click()}
        >
          Choose File
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          sx={{ marginTop: 2, marginLeft: 2 }}
          disabled={uploading || !file}
        >
          {uploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
         {uploadSuccess && (
          <Snackbar
            open={uploadSuccess}
            autoHideDuration={6000}
            onClose={() => setUploadSuccess(false)}
            message="Upload successful!"
            action={
              <Button color="inherit" onClick={() => setUploadSuccess(false)}>
                Close
              </Button>
            }
          />
        )}
        {uploadError && (
          <Snackbar
            open={!!uploadError}
            autoHideDuration={6000}
            onClose={() => setUploadError('')}
            message={uploadError}
            action={
              <Button color="inherit" onClick={() => setUploadError('')}>
                Close
              </Button>
            }
          />
        )}
        {response && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">
              <strong>Food Name:</strong> {response.foodName}
            </Typography>
            <Typography>
              <strong>Quantity:</strong> {response.quantity} grams
            </Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  );
};

export default DragAndUpload;
