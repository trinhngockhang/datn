import { buildSuccessResponse } from 'app/util/responseUtil';
import * as itemDAL from './ItemDAL';

export const createItem = async (req, res) => {
    console.log('vo', req.body);
    const itemCreated = await itemDAL.createItem(req.body, req.userId);
    res.ok();
}

export const getItem = async (req, res) => {
    console.log('dasdasds')
    const {data, total} = await itemDAL.getItem(req.pagination, req.userId);
    res.send(buildSuccessResponse(data, total));
};
