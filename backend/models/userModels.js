const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Jobs History Schema
const jobsHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
   
}, { timestamps: true });

// User Schema
const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    firstName: {
        type: String,
        trim: true,
        validate: {
            // First name is required only if GoogleId is not present
            validator: function (value) {
                if (!this.googleId && !value) {
                    return false;  // First name is required if no Google ID
                }
                return true;
            },
            message: 'First name is required unless signing in with Google'
        },
        maxlength: 20
    },
    lastName: {
        type: String,
        trim: true,
        validate: {
            // Last name is required only if GoogleId is not present
            validator: function (value) {
                if (!this.googleId && !value) {
                    return false;  // Last name is required if no Google ID
                }
                return true;
            },
            message: 'Last name is required unless signing in with Google'
        },
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        validate: {
            // Last name is required only if GoogleId is not present
            validator: function (value) {
                if (!this.googleId && !value) {
                    return false;  // Last name is required if no Google ID
                }
                return true;
            },
            message: 'mail_id is required unless signing in with Google'
        },
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        validate: {
            // Password is required only if GoogleId is not present
            validator: function (value) {
                if (!this.googleId && !value) {
                    return false;  // Password is required if no Google ID
                }
                return true;
            },
            message: 'Password is required unless signing in with Google'
        },
        minlength: [6, 'Password must have at least 6 characters']
    },
    jobsHistory: [jobsHistorySchema],
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Hash password before saving (for traditional login)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
};

module.exports = mongoose.model("User", userSchema);
