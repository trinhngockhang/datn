import { buildSuccessResponse } from "app/util/responseUtil";
import * as dbAccess from "./ItemDAL";

export const getItem = async (req, res) => {
  console.log('ad')
  const item = await dbAccess.getItem(req.pagination, req.userId);
  res.send(buildSuccessResponse(item));
};

export const getItemDetail = async (req, res) => {
  const item = await dbAccess.getItemDetail(req.params.id);
  res.send(buildSuccessResponse(item));
};

export const getItemReview = async (req, res) => {
  const item = await dbAccess.getItemReview(req.params.id);
  res.send(buildSuccessResponse(item));
};

export const getItemModelByVarian = async (req, res) => {
  console.log(req.body);
  const item = await dbAccess.getItemModelByVarian(req.body);

  res.send(buildSuccessResponse(item));
};

export const reviewItem = async (req, res) => {
  console.log(req.body);
  await dbAccess.reviewItem(req.body, req.userId);
  res.send("ok");
};


export const searchItem = async (req, res) => {
  console.log('XXX');
  const items = await dbAccess.searchItem(req.query.key);
  res.send(buildSuccessResponse(items));
};