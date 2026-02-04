const express = require('express');
const app = express();

app.use(express.json());

app.post('/check-access', (req, res) => {
    const { name, age } = req.body;

    if (typeof age !== 'number') {
        return res.status(400).json({ message: 'Invalid age' });
    }

    if (age >= 18) {
        return res.json({ message: `Welcome, ${name}!` });
    } else {
        return res.json({ message: 'Access Denied' });
    }
})

app.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});