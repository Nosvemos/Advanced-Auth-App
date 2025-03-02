export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
        <div style="padding: 30px; text-align: center; color: black;">
            <h1 style="margin: 0; font-weight: 400; font-size: 24px;">Verify Your Email Address</h1>
        </div>
        <div style="padding: 40px 30px; line-height: 1.6; text-align: center;">
            <p style="font-size: 20px;">Hello <strong>{fullName}</strong>,</p>
        
            <p style="font-size: 16px;">Please use the verification code below to complete your email verification:</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #f8f8f8; border-radius: 8px; letter-spacing: 8px; font-size: 32px; font-weight: bold; color: #2E3192; font-family: monospace;">
                {verificationToken}
            </div>
            
            <p style="font-size: 14px; color: #666;">This code will expire in 1 day.</p>
            
            <p style="margin-top: 30px; font-size: 16px;">If you didn't request this verification, please ignore this email.</p>
        </div>
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
            <p>This email was sent to you automatically. Please do not reply.</p>
            <p>Please keep this verification code confidential and do not share it with anyone.</p>
        </div>
    </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome!</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
        <div style="padding: 30px; text-align: center; color: black;">
            <h1 style="margin: 0; font-weight: 600; font-size: 24px;">Welcome to Advanced Auth App!</h1>
        </div>
        <div style="padding: 40px 30px; line-height: 1.6;">
            <p style="font-size: 20px;">Hello <strong>{fullName}</strong>,</p>
            
            <p>Your account has been successfully verified and is ready to use.</p>
        </div>
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
            <p>This email was sent to you automatically. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
        <div style="padding: 30px; text-align: center; color: black;">
            <h1 style="margin: 0; font-weight: 400; font-size: 24px;">Reset Your Password</h1>
        </div>
        <div style="padding: 40px 30px; line-height: 1.6; text-align: center;">
            <p style="font-size: 20px;">Hello <strong>{fullName}</strong>,</p>
            
            <p style="font-size: 16px;">Please use the link below to complete your password reset:</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #f8f8f8; border-radius: 8px; font-size: 16px; font-weight: bold; color: #2E3192; font-family: monospace;">
                <a href="{resetURL}">Reset Password</a>
            </div>
            
            <p style="font-size: 14px; color: #666;">This link will expire in 1 hour.</p>
            
            <p style="margin-top: 30px; font-size: 16px;">If you didn't request this, please ignore this email.</p>
        </div>
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
            <p>This email was sent to you automatically. Please do not reply.</p>
            <p>Please keep this link confidential and do not share it with anyone.</p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Password Has Been Reset!</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);">
        <div style="padding: 30px; text-align: center; color: black;">
            <h1 style="margin: 0; font-weight: 600; font-size: 24px;">Password Reset Successful</h1>
        </div>
        <div style="padding: 40px 30px; line-height: 1.6;">
            <p style="font-size: 20px;">Hello <strong>{fullName}</strong>,</p>
            
            <p>Your password has been successfully reset.</p>
        </div>
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999999;">
            <p>This email was sent to you automatically. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
`;