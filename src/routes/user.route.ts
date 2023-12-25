import { UserController } from '../controllers';
import AuthMiddleware from '../middleware/auth';
const express = require('express');
const routeUser = express.Router();

routeUser.get('/get-users', AuthMiddleware.Authentication, UserController.GetListUser);
routeUser.post('/create-user', AuthMiddleware.Authentication, UserController.CreateUser);
routeUser.delete('/delete-user/:id', AuthMiddleware.Authentication, UserController.DeleteUser);

export default routeUser;
