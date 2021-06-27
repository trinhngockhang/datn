import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './ShopDAL';

export const getShopInfo = async (req, res) => {
    const shop = await dbAccess.getShopInfo(req.params.id, req.userId);
    res.send(buildSuccessResponse(shop));
}

export const followShop = async (req, res) => {
    const shopId = req.body.id;
    await dbAccess.followShop(req.userId, shopId);
    res.ok();
}

export const unfollowShop = async (req, res) => {
    const shopId = req.body.id;
    await dbAccess.unfollowShop(req.userId, shopId);
    res.ok();
}

export const reviewShop = async (req, res) => {
    await dbAccess.reviewShop(req.body, req.userId);
    res.send("ok");
  };
  