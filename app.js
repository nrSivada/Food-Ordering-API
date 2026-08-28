const express = require('express');

const app = express();

const authRoutes = require('./routes/authRoutes');

const restaurantRoutes = require('./routes/restaurantRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Food ordering API is running."
    });
});

app.use('/api/auth', authRoutes);

app.use('/api/restaurants', restaurantRoutes);

module.exports = app;