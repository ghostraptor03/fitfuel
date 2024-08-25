import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, TextField, Button, Container, Paper } from '@mui/material';
import { AccountCircle, FitnessCenter, Fastfood, Flag } from '@mui/icons-material';

function App() {
    const [activeTab, setActiveTab] = useState(0);
    const [userId, setUserId] = useState('');
    const [meal, setMeal] = useState('');
    const [query, setQuery] = useState('');
    const [diet, setDiet] = useState('');
    const [goal, setGoal] = useState('');
    const [recentMeals, setRecentMeals] = useState('');
    const [advice, setAdvice] = useState('');

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const logMeal = async () => {
        // Add meal logging logic here
    };

    const getAdvice = async () => {
        // Add diet advice logic here
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
                            label="Dietary Preference"
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Fitness Goal"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#fff' } }}
                        />
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
