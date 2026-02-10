const express = require('express');
const cors = require('cors');
const app = express();

const accessRoutes = require('./routes/accessRoutes');

const PORT = 8080;


app.use(express.json());
app.use(cors());

//test route
app.get("/api/test",(req, res) => {
    res.json({message: "Nah! I Win"})
})

// mount routes
app.use('/api', accessRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// express, cors, nodemon
// nodemon: install it in dev. Visit this link https://www.npmjs.com/package/nodemon