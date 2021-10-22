const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const db = mongoose.connection;

app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

mongoose.connect('mongodb+srv://sasha:sasha@cluster0.msjsx.mongodb.net/practice?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('Connected successfully');
});


app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
