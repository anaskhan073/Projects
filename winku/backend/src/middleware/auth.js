import { CatchAsyncError } from "./CatchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
//     const { token } = req.cookies;
//     if (!token) {
//         return next(new ErrorHandler("User is not authenticated.", 400));
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = await User.findById(decoded.id);

//     next();
// });

export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    console.log("Cookie Token:", token); // DEBUG

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded JWT:", decoded); // DEBUG

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        next();
    } catch (error) {
        console.error("JWT Verification Failed:", error.message);
        if (error.name === 'JsonWebTokenError') {
            return next(new ErrorHandler("Json Web Token is invalid, Try again.", 400));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler("Token has expired, Please login again.", 401));
        }
        return next(new ErrorHandler("Authentication failed.", 401));
    }
});

