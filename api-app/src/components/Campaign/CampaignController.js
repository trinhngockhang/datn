import { buildSuccessResponse } from 'app/util/responseUtil';
import * as dbAccess from './CampaignDAL';

export const getCampaign = async (req, res) => {
    const type = req.params.id;
    const campaign = await dbAccess.getCampaign(type);
    res.send(buildSuccessResponse(campaign));
}