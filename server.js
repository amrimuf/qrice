const express = require('express');
const app = express();
const riceVarietyRoutes = require('./routes/riceVarietyRoutes');
const riceDiseaseRoutes = require('./routes/riceDiseaseRoutes');
const nutrientDeficiencyRoutes = require('./routes/nutrientDeficiencyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api', riceVarietyRoutes);
app.use('/api', riceDiseaseRoutes);
app.use('/api', nutrientDeficiencyRoutes);
app.use('/api', userRoutes);

// Protected route
app.get('/api/protected', authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});