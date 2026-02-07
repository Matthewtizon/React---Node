const express = require('express');
const app = express();

const accessRoutes = require('./routes/accessRoutes');

app.use(express.json());

// mount routes
app.use('/api', accessRoutes);


app.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});