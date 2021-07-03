import * as dbUtil from "../../util/databaseUtil";

export const getCampaign = async (type) => {
  if (type == 1) {
    const sql = "SELECT * FROM campaign WHERE type = ? and status = 1";
    const camps = await dbUtil.query(sql, [type]);
    return camps;
  } else {
    const sql =
      "SELECT * FROM shop WHERE advertise = 1 and image_advertise IS NOT NULL";
    const camps = await dbUtil.query(sql, [type]);
    return camps;
  }
};
