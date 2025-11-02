// export const sendToken = (user, statusCode, message, res)=>{
//      const token = user.generateToken();
//      res.status(statusCode).cookie("token", token, {
//           expires: new Date(Date.now() + 7 * 24 * 60 * 1000 ), httpOnly: true,
//      }).json({success:true, message, token, user})
// }

import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
     // Generate JWT
     const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET_KEY,
          {
               expiresIn: process.env.JWT_EXPIRES_IN || "7d",
          }
     );

     // Cookie options
     const options = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
     };

     // Set cookie + send JSON
     res.status(statusCode)
          .cookie("token", token, options)  // token must be string
          .json({
               success: true,
               message,
               user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
               },
          });
};

