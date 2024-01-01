import { Request, Response } from 'express';
const express = require('express');
const multer = require('multer');

const CommonController = {
    uploadImages: async (req: any, res: Response) => {
        console.log('upload', req?.file);
        return res.status(200).json({ data: req?.file, message: 'hihi' });
    },
};

export default CommonController;
