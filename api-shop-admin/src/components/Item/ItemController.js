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

export const getMyName = async (req, res) => {
    const name = await itemDAL.getMyName(req.userId);
    res.send(buildSuccessResponse(name));
};



export const updateProfile = async (req, res) => {
    await itemDAL.updateProfile(req.body, req.userId);
    res.ok();
};

export const updateAvatar = async (req, res) => {
    await itemDAL.updateAvatar(req.body, req.userId);
    res.ok();
};

export const updateAdvertise = async (req, res) => {
    await itemDAL.updateAdvertise(req.body, req.userId);
    res.ok();
};

export const updateItem = async (req, res) => {
    console.log(req.body);
    await itemDAL.updateItem(req.body);
    res.ok();
}