import { buildSuccessResponse } from 'app/util/responseUtil';
import * as orderDAL from './OrderDAL';

export const getOrder = async (req, res) => {
    const {data, total} = await orderDAL.getOrder(req.pagination, req.userId);
    res.send(buildSuccessResponse(data, total));
};

export const updateOrder = async (req, res) => {
    const a = await orderDAL.updateOrder(req.body);
    res.ok();
};

export const getStatistic = async (req, res) => {
    const result = await orderDAL.getStatistic(req.userId);
    res.send(buildSuccessResponse(result));
};
