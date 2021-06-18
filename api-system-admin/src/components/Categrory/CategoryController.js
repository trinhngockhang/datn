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
