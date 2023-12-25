import { Request, Response } from 'express';
import Categories from '../db/models/category.model';
import Room from '../db/models/room.model';
import { getListWithPaginationAssociations } from '../utils';
import Helper from '../helper/Helper';

const RoomController = {
    GetListRoom: async (req: Request, res: Response): Promise<Response> => {
        const Parameters = {
            model: Room,
            subModel: Categories,
            attributes: ['category'],
            as: 'category',
            exclude: ['categoryKey'],
        };
        return getListWithPaginationAssociations(req, res, Parameters);
    },

    /* Only Super admin use func */
    CreateRoom: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { title, detail, price, area, capacity, description, status, categoryKey } = req.body;
            const newRoom = await Room.create(
                {
                    title,
                    detail,
                    price,
                    area,
                    capacity,
                    description,
                    status,
                    categoryKey,
                },
                { raw: true },
            );
            return res.status(201).send(Helper.ResponseData(201, 'Room created successfully', newRoom));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
};

export default RoomController;
