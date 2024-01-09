import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the schema for the User model using Mongoose
const userSchema = new Schema(
    {
        // User properties defined within the schema
        userName: {
            type: String,
            required: true,
            unique: true,       // Ensure uniqueness
            lowercase: true,    // Convert to lowercase
            trim: true,         // Trim whitespace
            index: true,        // Create an index for faster queries
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary  url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary  url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video", // Reference to the "Video" model by its ObjectId
            },
        ],
        password: {
            type: String,
            required: [true, "Password be required"], // Error message if password is not provided
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Automatically add "createdAt" and "updatedAt" timestamps
);

// Middleware - Execute before saving a user to hash the password (if modified)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
});

// Method to check if the provided password matches the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key used to sign the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiry time for the token
        }
    );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key used to sign the token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiry time for the token
        }
    );
};

// Create the "User" model using the schema
export const User = mongoose.model("User", userSchema);
