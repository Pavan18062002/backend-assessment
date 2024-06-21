const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: './.env' });


connectDB();

const app = express();


app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
