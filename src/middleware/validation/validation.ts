import { NextFunction, Request, Response } from 'express';
import Validator from 'validatorjs';
import Helper from '../../helper/Helper';
import User from '../../db/models/user.model';
const validations = {
    RegisterValidation: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userName, email, phoneNumber, password } = req.body;
            const data = {
                userName,
                email,
                phoneNumber,
                password,
            };

            const rules: Validator.Rules = {
                userName: 'required|string|max:50',
                email: 'required|email',
                password: 'required|min:8',
                phoneNumber: 'required',
                // role: 'required|same:password',
            };
            const validate = new Validator(data, rules);
            if (validate.fails()) {
                return res.status(400).send(Helper.ResponseError(400, 'Bad Request', validate.errors));
            }
            /* check exist email */
            const user = await User.findOne({
                where: {
                    email: data.email,
                },
            });
            if (user) {
                return res.status(500).send(Helper.ResponseError(500, 'Email has exits', ''));
            }
            next();
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
};

export default validations;
