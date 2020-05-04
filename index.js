const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

app.use(express.json());

app.set('view engine','pug');

app.use('/',home);
app.use('/api/genres',genres);
 
const PORT = process.env.PORT || 3001;
app.listen(PORT,() => {
    console.log(`App is running on ${PORT}....`);
})
