const express = require('express');
const app = express();
const riceVarietyRoutes = require('./routes/riceVarietyRoutes');
const riceDiseaseRoutes = require('./routes/riceDiseaseRoutes');
const nutrientDeficiencyRoutes = require('./routes/nutrientDeficiencyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', riceVarietyRoutes);
app.use('/api', riceDiseaseRoutes);
app.use('/api', nutrientDeficiencyRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});