const express = require('express');
var cors = require('cors');
const app = express();
const riceVarietyRoutes = require('./routes/riceVarietyRoutes');
const riceDiseaseRoutes = require('./routes/riceDiseaseRoutes');
const nutrientDeficiencyRoutes = require('./routes/nutrientDeficiencyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

app.use(cors())
app.use(express.json());

const spec = yaml.load(fs.readFileSync('./swagger.yaml', 'utf-8'));
const router = express.Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(spec));
app.use('/', router);


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