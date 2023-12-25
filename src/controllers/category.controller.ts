import { Request, Response } from 'express';
import Categories from '../db/models/category.model';
import { getListWithPagination } from '../utils';
import Helper from '../helper/Helper';

const CategoryController = {
    GetList: async (req: Request, res: Response): Promise<Response> => {
        return getListWithPagination(Categories, req, res);
    },

    CreateCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { category } = req.body;
            const newRole = await Categories.create(
                {
                    category,
                },
                { raw: true },
            );
            return res.status(201).send(Helper.ResponseData(201, 'Category created successfully', newRole));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    DeleteCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const category = await Categories.findByPk(id);
            category?.destroy();
            if (!category) {
                return res.status(404).send({
                    status: 404,
                    message: 'Not found category',
                });
            }
            return res.status(200).send(Helper.ResponseData(200, 'Delete category Successfully', null));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    DeleteMultipleCategories: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { listId } = req.body;
            if (!listId || !Array.isArray(listId)) {
                return res.status(400).send(Helper.ResponseError(400, 'Invalid listId format', null));
            }
            const deletedCount = await Categories.destroy({
                where: {
                    id: listId,
                },
            });

            return res.status(200).send(Helper.ResponseData(200, 'Delete List category Successfully', deletedCount));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },

    UpdateCategory: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id, category: newCategoryValue } = req.body;
            const categoryRes = await Categories.findByPk(id);
            if (!categoryRes) {
                return res.status(404).send(Helper.ResponseError(404, 'Category not found', null));
            }
            const existingCategory = await Categories.findOne({ where: { category: newCategoryValue } });
            if (existingCategory && existingCategory.id !== id) {
                return res.status(400).send(Helper.ResponseError(400, 'Category already exists', null));
            }
            categoryRes.category = newCategoryValue;
            await categoryRes.save();
            return res.status(200).send(Helper.ResponseData(200, 'Update Category Successfully', categoryRes));
        } catch (error) {
            return res.status(500).send(Helper.ResponseError(500, '', error));
        }
    },
};

export default CategoryController;
