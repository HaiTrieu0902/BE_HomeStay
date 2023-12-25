import { AuthController } from '../controllers';
import AuthMiddleware from '../middleware/auth';
import validations from '../middleware/validation/validation';
const express = require('express');
const routeAuth = express.Router();

routeAuth.post('/register', validations?.RegisterValidation, AuthController.Register);
routeAuth.post('/login', AuthController.Login);
routeAuth.post('/logout', AuthMiddleware.Authentication, AuthController.Logout);
routeAuth.post('/change-password', AuthMiddleware.Authentication, AuthController.ChangePassword);
routeAuth.post('/forgot-pasword', AuthController.ForgotPasswod);
routeAuth.get('/verify-email/:token', AuthController.Verify);
export default routeAuth;
