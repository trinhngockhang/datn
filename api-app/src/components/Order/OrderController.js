import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './OrderDAL';

export const createOrder = async (req, res) => {
    const order = await dbAccess.createOrder(req.body, req.userId);
    res.send(buildSuccessResponse(order));
}
