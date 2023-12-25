import { Request, Response } from 'express';
import Role from '../db/models/role.model';
import User from '../db/models/user.model';
import Helper from '../helper/Helper';
import { getListWithPaginationAssociations } from '../utils';

const UserController = {
    GetListUser: async (req: Request, res: Response): Promise<Response> => {
        const Parameters = {
            model: User,
            subModel: Role,
            attributes: ['role'],
            as: 'role',
            exclude: ['roleId'],
        };
        return getListWithPaginationAssociations(req, res, Parameters);
    },

    /* Only Super admin use func */
    CreateUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userName, email, phoneNumber, password, roleId } = req.body;
            const hashed = await Helper?.PasswordHasing(password);
            const newRUser = await User.create(
                {
                    userName,
                    email,
                    phoneNumber,
                    password: hashed,
                    roleId,
                },
                { raw: true },
            );
            return res.status(201).send(Helper.ResponseData(201, 'User created successfully', newRUser));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    /* Only Super Admin use Func */
    DeleteUser: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            user?.destroy();
            if (!user) {
                return res.status(404).send({
                    status: 404,
                    message: 'Not found user',
                });
            }
            return res.status(201).send(Helper.ResponseData(201, 'Delete User successfully', ''));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
};

export default UserController;
