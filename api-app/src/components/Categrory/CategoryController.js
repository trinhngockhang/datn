import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './CategoryDAL';

export const getCategory = async (req, res) => {
    const category = await dbAccess.getCategory();
    res.send(buildSuccessResponse(category));
}

export const getPopularCategory = async (req, res) => {
    const category = await dbAccess.getPopularCategory();
    res.send(buildSuccessResponse(category));
}

export const getShopCategory = async (req, res) => {
    const category = await dbAccess.getShopCategory(req.params.id);
    res.send(buildSuccessResponse(category));
}