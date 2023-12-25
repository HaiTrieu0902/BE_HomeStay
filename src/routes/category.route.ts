import { CategoryController } from '../controllers';
import AuthMiddleware from '../middleware/auth';
const express = require('express');

const routeCategory = express.Router();

routeCategory.get('/get-list', AuthMiddleware.Authentication, AuthMiddleware.SuperAdmin, CategoryController.GetList);
routeCategory.post(
    '/create-category',
    AuthMiddleware.Authentication,
    AuthMiddleware.SuperAdmin,
    CategoryController.CreateCategory,
);
routeCategory.put(
    '/update-category',
    AuthMiddleware.Authentication,
    AuthMiddleware.SuperAdmin,
    CategoryController.UpdateCategory,
);
routeCategory.delete(
    '/delete-category/:id',
    AuthMiddleware.Authentication,
    AuthMiddleware.SuperAdmin,
    CategoryController.DeleteCategory,
);
routeCategory.delete(
    '/delete-categories',
    AuthMiddleware.Authentication,
    AuthMiddleware.SuperAdmin,
    CategoryController.DeleteMultipleCategories,
);
export default routeCategory;
