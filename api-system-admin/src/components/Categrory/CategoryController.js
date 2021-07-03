import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './CategoryDAL';

export const getCategory = async (req, res) => {
    const category = await dbAccess.getCategory();
    res.send(buildSuccessResponse(category));
}

export const getListSubCategory = async (req, res) => {
    const cateId = req.params.id;
    const subList = await dbAccess.getListSubCategory(cateId);
    res.send(buildSuccessResponse(subList));
};

export const setStatusCategory = async (req, res) => {
    await dbAccess.setStatusCategory(req.params.id);
    res.ok();
}

export const createCategory = async (req, res) => {
    await dbAccess.createCategory(req.body);
    res.ok();
}

export const updateCategory = async (req, res) => {
    await dbAccess.updateCategory(req.params.id, req.body);
    res.ok();
}