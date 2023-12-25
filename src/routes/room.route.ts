import RoomController from '../controllers/room.controller';
import AuthMiddleware from '../middleware/auth';
const express = require('express');
const routeRoom = express.Router();

routeRoom.get('/get-lists', AuthMiddleware.Authentication, AuthMiddleware.RoleManager, RoomController.GetListRoom);
routeRoom.post('/create-room', AuthMiddleware.Authentication, AuthMiddleware.RoleManager, RoomController.CreateRoom);
// routeRoom.delete('/delete-user/:id', AuthMiddleware.Authentication, UserController.DeleteUser);

export default routeRoom;
