import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, TextField, Button, Container, Paper, MenuItem } from '@mui/material';
import { AccountCircle, FitnessCenter, Fastfood, Flag } from '@mui/icons-material';
import axios from 'axios';

function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [userId, setUserId] = useState('');
    const [meal, setMeal] = useState('');
    const [diet, setDiet] = useState('');
    const [goal, setGoal] = useState('');
    const [recentMeals, setRecentMeals] = useState('');
    const [advice, setAdvice] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goalType, setGoalType] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [timeline, setTimeline] = useState('');

    const [dailyCaloricIntake, setDailyCaloricIntake] = useState('');
    const [proteinPerDay, setProteinPerDay] = useState('');
    const [carbsPerDay, setCarbsPerDay] = useState('');
    const [fatPerDay, setFatPerDay] = useState('');
    const [fiberPerDay, setFiberPerDay] = useState('');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const submitGoals = async () => {
      try {
          const requestPayload = {
              userId,
              query: 'Diet advice based on the user profile',
              userProfile: {
                  weight,
                  height,
                  age,
                  gender,
                  activityLevel,
                  goalType,
                  goalAmount,
                  timeline,
                  diet,
                  recentMeals
              }
          };
  
          console.log('Request payload:', requestPayload);
  
          const response = await axios.post('/get-advice', requestPayload);
  
          console.log('Response from server:', response.data);
  
          setAdvice(response.data.advice);
      } catch (error) {
          console.error('Error submitting goals:', error);
      }
  };
  

    const logMeal = async () => {
        try {
            await axios.post('/log-meal', {
                userId,
                meal
            });
            // Optionally handle success or update UI here
        } catch (error) {
            console.error('Error logging meal:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <AppBar position="static" style={{ backgroundColor: '#212121', marginBottom: '2rem' }}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab icon={<AccountCircle />} label="Profile" />
                    <Tab icon={<Flag />} label="Goals" />
                    <Tab icon={<Fastfood />} label="Meal Tracking" />
                    <Tab icon={<FitnessCenter />} label="Workouts" />
                </Tabs>
            </AppBar>

            <Box>
                {activeTab === 0 && (
                    <Paper style={{ padding: '2rem', backgroundColor: '#333', color: '#fff' }}>
                        <Typography variant="h4" gutterBottom>Profile</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                    </Paper>
                )}
                {activeTab === 1 && (
                    <Paper style={{ padding: '2rem', backgroundColor: '#333', color: '#fff' }}>
                        <Typography variant="h4" gutterBottom>Goals</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Current Weight (lbs or kg)"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Height (feet/inches or cm)"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Activity Level"
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        >
                            <MenuItem value="sedentary">Sedentary - Little to no physical activity beyond daily movements like walking around the house or office</MenuItem>
                            <MenuItem value="lightly active">Lightly active - Engages in light exercise or physical activities 1-3 days per week</MenuItem>
                            <MenuItem value="moderately active">Moderately active - Regularly exercises or engages in physical activity 3-5 days per week</MenuItem>
                            <MenuItem value="very active">Very active - Engages in intense exercise or physical activity 6-7 days per week</MenuItem>
                            <MenuItem value="extra active">Extra active - Involves extremely intense physical activity or training multiple times a day</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Do you want to gain or lose weight?"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        >
                            <MenuItem value="lose">Lose Weight</MenuItem>
                            <MenuItem value="gain">Gain Weight</MenuItem>
                        </TextField>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="How many pounds?"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Timeline - in how many weeks do you want to hit your goal?"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1rem', backgroundColor: '#f44336', color: '#fff' }}
                            onClick={submitGoals}
                        >
                            Submit Goals
                        </Button>
                        {advice && (
                            <Paper style={{ padding: '2rem', backgroundColor: '#333', color: '#fff', marginTop: '2rem' }}>
                                <Typography variant="h6">Diet Advice</Typography>
                                <Typography>Daily Caloric Intake: {dailyCaloricIntake}</Typography>
                                <Typography>Protein per Day: {proteinPerDay}</Typography>
                                <Typography>Carbs per Day: {carbsPerDay}</Typography>
                                <Typography>Fat per Day: {fatPerDay}</Typography>
                                <Typography>Fiber per Day: {fiberPerDay}</Typography>
                            </Paper>
                        )}
                    </Paper>
                )}
                {activeTab === 2 && (
                    <Paper style={{ padding: '2rem', backgroundColor: '#333', color: '#fff' }}>
                        <Typography variant="h4" gutterBottom>Meal Tracking</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Log a Meal"
                            value={meal}
                            onChange={(e) => setMeal(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1rem', backgroundColor: '#f44336', color: '#fff' }}
                            onClick={logMeal}
                        >
                            Log Meal
                        </Button>
                    </Paper>
                )}
                {activeTab === 3 && (
                    <Paper style={{ padding: '2rem', backgroundColor: '#333', color: '#fff' }}>
                        <Typography variant="h4" gutterBottom>Workouts</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Recent Workouts"
                            value={recentMeals} // Assuming recentMeals is used for this example
                            onChange={(e) => setRecentMeals(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                    </Paper>
                )}
            </Box>
        </Container>
    );
}

export default App;
