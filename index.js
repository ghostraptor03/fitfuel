const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// OpenAI API Key from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Endpoint to log a meal
app.post('/log-meal', (req, res) => {
    const { userId, meal } = req.body;
    console.log(`User ${userId} logged a meal: ${meal}`);
    res.status(200).send({ message: 'Meal logged successfully' });
});

// Endpoint to get diet advice
app.post('/get-advice', async (req, res) => {
    const { userId, query, userProfile } = req.body;

    // Construct the prompt for GPT-3.5 Turbo
    const prompt = `
    User's Profile:
    Weight: ${userProfile.weight}
    Height: ${userProfile.height}
    Age: ${userProfile.age}
    Gender: ${userProfile.gender}
    Activity Level: ${userProfile.activityLevel}
    Goal: ${userProfile.goalType} ${userProfile.goalAmount} in ${userProfile.timeline} weeks
    Dietary Preferences: ${userProfile.diet}
    Recent Meals: ${userProfile.recentMeals}
    
    Question: ${query}
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const advice = response.data.choices[0].message.content.trim();
        
        // Extract nutritional info if present
        const dailyCaloricIntake = extractNutritionalInfo(advice, 'Caloric Intake');
        const proteinPerDay = extractNutritionalInfo(advice, 'Protein');
        const carbsPerDay = extractNutritionalInfo(advice, 'Carbs');
        const fatPerDay = extractNutritionalInfo(advice, 'Fat');
        const fiberPerDay = extractNutritionalInfo(advice, 'Fiber');

        res.status(200).send({
            advice: advice,
            dailyCaloricIntake: dailyCaloricIntake,
            proteinPerDay: proteinPerDay,
            carbsPerDay: carbsPerDay,
            fatPerDay: fatPerDay,
            fiberPerDay: fiberPerDay
        });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send({ error: 'Failed to fetch advice' });
    }
});

// Helper function to extract nutritional info from the response
const extractNutritionalInfo = (advice, type) => {
    const match = advice.match(new RegExp(`${type}:\\s*([\\d\\.]+)`, 'i'));
    return match ? match[1] : 'Not provided';
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
