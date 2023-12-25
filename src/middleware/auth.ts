import { NextFunction, Request, Response } from 'express';
import Helper from '../helper/Helper';

const AuthMiddleware = {
    Authentication: (req: Request, res: Response, next: NextFunction) => {
        try {
            const authToken = req.headers.authorization;
            const token = authToken?.split(' ')[1];
            if (!token) {
                return res.status(401).send(Helper.ResponseError(401, 'Unauthorized', ''));
            }

            const result = Helper.EtractToken(token!);
            if (!result) {
                return res.status(403).json({ message: 'Token is invalid' });
            }
            res.locals.role = result?.role;
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    SuperAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.role;
            if (roleId !== 'Super_admin') {
                return res.status(403).send(Helper.ResponseError(403, 'Forbidden', ''));
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    RoleAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.role;
            if (roleId === 'User' || roleId === 'Manager') {
                return res.status(403).send(Helper.ResponseError(403, 'Forbidden', ''));
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
    RoleManager: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId = res.locals.role;
            if (roleId === 'User') {
                return res.status(403).send(Helper.ResponseError(403, 'Forbidden', ''));
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
};

export default AuthMiddleware;
