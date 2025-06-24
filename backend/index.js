const express = require('express');
const app = express();
require('dotenv').config();


app.use(express.json());

const applicationRouter = require('./routes/application');
app.use('/application', applicationRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
