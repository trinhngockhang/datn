import * as dbUtil from '../../util/databaseUtil';

export const getCampaign = async (type) => {
  const sql = 'SELECT * FROM campaign WHERE type = ? and status = 1';
  const camps = await dbUtil.query(sql, [type]);
  return camps;
};
