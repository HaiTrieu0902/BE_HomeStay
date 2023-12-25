import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../db/models/user.model';
import Helper from '../helper/Helper';
import { mailerOptions, tranporter } from '../config/mail.config';
import { IUser } from './../types/common';
import Role from '../db/models/role.model';

export const AuthService = {
    registerUser: async (userData: IUser, req: Request) => {
        try {
            const { userName, email, phoneNumber, password } = userData;
            const hashedPassword = await Helper.PasswordHasing(password);
            const newUser = await User.create(
                {
                    userName,
                    email,
                    phoneNumber,
                    password: hashedPassword,
                    isVerify: false,
                    roleId: '410d947d-8dd0-45d3-bd22-313054f50183',
                },
                { raw: true },
            );
            const tokenEmail = Helper.GenerateToken({ email });
            tranporter.sendMail(
                mailerOptions(tokenEmail, newUser?.email, newUser?.userName, req?.headers.host),
                function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Verify email sent successfully');
                    }
                },
            );
            const { password: omitPassword, ...userWithoutPassword } = newUser.toJSON();
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async (email: string, password: string) => {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
                include: [{ model: Role, as: 'role', attributes: ['role'] }],
                attributes: { exclude: ['roleId'] },
            });
            if (!user) {
                throw new Error('Email not found');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new Error('Incorrect password, try again');
            }
            const token = Helper.GenerateToken({
                id: user.id,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            });

            const userDataWithoutPassword = { ...user?.dataValues };
            delete userDataWithoutPassword.password;

            return { ...userDataWithoutPassword, token: token };
        } catch (error: any) {
            throw new Error('Error logging in: ' + error?.message);
        }
    },

    forgotPassWordUser: async (params: { email: string; password: string; confirmPassword: string }) => {
        try {
            /* check verify email in here may be later update  */
            const user = await User.findOne({
                where: {
                    email: params?.email,
                },
            });
            if (!user) {
                throw new Error('Email not found');
            }
            if (params?.password === params?.confirmPassword) {
                const hashed = await Helper?.PasswordHasing(params?.password);
                user.password = hashed;
                user.save();
                const userDataWithoutPassword = { ...user?.dataValues };
                delete userDataWithoutPassword.password;
                return userDataWithoutPassword;
            } else {
                throw new Error('New Password and Confirm Password not match');
            }
        } catch (error) {
            throw error;
        }
    },

    changePasswordUser: async (params: {
        email: string;
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        try {
            const user = await User.findOne({
                where: {
                    email: params?.email,
                },
            });
            if (!user) {
                throw new Error('Email not exits');
            }

            const match = await bcrypt.compare(params?.currentPassword, user.password);
            if (!match) {
                throw new Error('Your current password is incorrect');
            }
            if (params?.newPassword === params?.confirmPassword) {
                const hashed = await Helper?.PasswordHasing(params?.newPassword);
                user.password = hashed;
                user.save();
                const userDataWithoutPassword = { ...user?.dataValues };
                delete userDataWithoutPassword.password;

                return userDataWithoutPassword;
            } else {
                throw new Error('New Password and Confirm Password not match');
            }
        } catch (error) {
            throw error;
        }
    },

    // async verifyEmail(email) {
    //     try {
    //         const user = await User.findOne({ where: { email } });
    //         if (!user) {
    //             throw new Error('Email not found');
    //         }
    //         if (user.isVerify) {
    //             throw new Error('Email Already Verified');
    //         }
    //         user.isVerify = true;
    //         await user.save();
    //         return 'Email Verified Successfully';
    //     } catch (error) {
    //         throw new Error('Error verifying email: ' + error.message);
    //     }
    // },
};

export default AuthService;
