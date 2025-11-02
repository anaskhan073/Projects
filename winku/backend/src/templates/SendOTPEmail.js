export const sendOTPEmail = (verificationCode, logo) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
  
      <div class="container" style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #ddd;">

        <div class="header" style="display: flex; flex-direction: column; align-items: center; background-color: #4cb4fd; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold;">
          <img src="${logo}" alt="Winku Logo" style="max-width: 100px; height: auto; margin-bottom: 15px;" />
           <p style="margin-bottom: 0px;">Verify Your Email</p>
          </div>
      
        <div class="content" style="padding: 25px; line-height: 1.8; text-align: center;">
          <p>Hello,</p>
          <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
          <div class="verification-code" style="display: inline-block; margin: 20px 0; font-size: 22px; color: #4cb4fd; background: #eef2ff; border: 1px dashed #4cb4fd; padding: 12px 20px; text-align: center; border-radius: 6px; font-weight: bold; letter-spacing: 2px;">
            ${verificationCode}
          </div>
          <p style="font-size: 13px; margin-top: 10px; color: #666;">(If you didn’t request this, you can safely ignore this email)</p>
        </div>
      
        <div class="footer" style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777; font-size: 12px; border-top: 1px solid #ddd;">
          <p>&copy; ${new Date().getFullYear()} Winku. All rights reserved.</p>
        </div>
      
      </div>
    </body>
    </html>
  `;
};
