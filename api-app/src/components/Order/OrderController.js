import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './OrderDAL';

export const createOrder = async (req, res) => {
    const order = await dbAccess.createOrder(req.body, req.userId);
    res.send(buildSuccessResponse(order));
}

export const getShopInfo = async (req, res) => {
    const shop = await dbAccess.getShopInfo(req.params.id);
    res.send(buildSuccessResponse(shop));
}

export const getOrders = async (req, res) => {
    console.log(req.query);
    const order = await dbAccess.getOrders(req.userId, req.query?.status);
    res.send(buildSuccessResponse(order));
}