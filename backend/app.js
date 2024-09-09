const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const User = require('./models/userModels'); // Adjust the path based on your directory structure


const cookieParser = require("cookie-parser");
const errorHandler= require("./middleware/error");
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const jobTypeRoute = require('./routes/jobsTypeRoutes')
const jobRoute = require('./routes/jobsRoutes')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const corsOptions = {
//     origin: 'https://newdemo-ruby.vercel.app', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: '*', // Allows all headers
//     credentials: true 
// };
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
            // Update user with tokens
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
            return done(null, user);
        }

        // Create a new user if not found
        const newUser = await User.create({
            googleId: profile.id,
            accessToken,
            refreshToken,
            name: profile.displayName,
            email: profile.emails[0].value
        });
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));


// app.use(cors(corsOptions));

const cors = require('cors');

// app.use(cors({
//   origin: ' https://newdemo-ruby.vercel.app', // Replace with your frontend URL
//   credentials: true ,// Allow cookies to be sent and received
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));


// database connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() => {
    app.listen(process.env.PORT,'0.0.0.0',()=>{
console.log("connection sucessful")
    })
})
.catch((e) => console.log(e));



// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended:true
}));
app.use(cookieParser());


// app.get('/',(req,res)=>{
//     res.send("helo");

// })
app.use('/',authRoutes);
app.use('/',userRoutes);
app.use('/',jobTypeRoute);
app.use('/',jobRoute);


app.use(errorHandler);






