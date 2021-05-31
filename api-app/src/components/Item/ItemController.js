import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './ItemDAL';

export const getItem = async (req, res) => {
    const item = await dbAccess.getItem(req.pagination);
    res.send(buildSuccessResponse(item));
}

export const getItemDetail = async (req, res) => {
    const item = await dbAccess.getItemDetail(req.params.id);
    res.send(buildSuccessResponse(item));
}