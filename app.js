const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usuario-routes')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());

//middleware
app.use(express.json());
app.use('/api', userRoutes);


//routes
app.get("/", (req, res) => {
  res.send("Hello API")
})

//conexão com o BD
mongoose.connect('mongodb+srv://rodrigoUserDb:rodrigoUserDb@cluster0.e92md.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("SUCCESS at connect in Atlas DB Mongo!!");
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })