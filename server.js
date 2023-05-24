const express = require('express');
var cors = require('cors')
const app = express();
const riceVarietyRoutes = require('./routes/riceVarietyRoutes');
const riceDiseaseRoutes = require('./routes/riceDiseaseRoutes');
const nutrientDeficiencyRoutes = require('./routes/nutrientDeficiencyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

app.use(cors())
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', riceVarietyRoutes);
app.use('/api', riceDiseaseRoutes);
app.use('/api', nutrientDeficiencyRoutes);
app.use('/api', userRoutes);
app.use('/api', predictionRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});