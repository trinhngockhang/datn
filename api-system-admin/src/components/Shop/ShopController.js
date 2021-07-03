import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './ShopDAL';

export const getShop = async (req, res) => {
    console.log('XOOO')
    const shop = await dbAccess.getShop();
    res.send(buildSuccessResponse(shop));
}

export const updateAds = async (req, res) => {
    await dbAccess.updateAds(req.params.id);
    res.ok();
}