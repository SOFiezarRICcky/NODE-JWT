const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const passport = require("passport")


const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// DB Config
const db = require("./config/keys").mongoURI;
// Connect To DB 
mongoose.connect(db, { useNewUrlParser: true })
    .then(db => console.log("DB CONNECTED"))
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.render("login")
})

// Passport Config
app.use(passport.initialize());
require("./config/passport")(passport);

require('./router/router')(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On PORT:${PORT}`));
