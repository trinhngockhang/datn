import * as dbUtil from '../../util/databaseUtil';
import uuidv4 from 'uuid/v4';
import { ERRORS, REDIS, TOKEN } from '../../constant';
import redisUtil from '../../util/redisUtil';
import * as googleUtil from '../../util/googleUtil';
import * as common from './common';
import * as jwtUtil from '../../util/jwtUtil';

export const getUserByUsername = async (username) => {
  const sql = 'SELECT id,username,password FROM users WHERE username = ? LIMIT 1';
  return dbUtil.queryOne(sql, [username]);
};
export const signUp = async ({ username, passwordHash, name }) => {
 
};

export const checkUserExistByEmail = async (email) => {
  const sql = 'SELECT id, email FROM user WHERE email = ?';
  const result = await dbUtil.query(sql, [email]);
  if (result.length > 0) {
    return result[0];
  }
  return false;
};

export const getUserById = async (userId) => {
  const sql = 'SELECT username, name, createdAt FROM users WHERE id = ?';
  const user = await dbUtil.queryOne(sql, [userId]);
  return user;
};

export const getRefreshToken = async (token) => {
  const refreshToken = uuidv4();
  redisUtil.setAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${refreshToken}`, token, 'ex', TOKEN.REFRESH_TOKEN_EXPIRED).catch(() => { });
  return refreshToken;
};

export const refreshToken = async (oldRefreshToken) => {
  const oldToken = await redisUtil.getAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${oldRefreshToken}`);
  const { id } = await common.getUserInfoFromToken(oldToken);
  const newToken = await common.generateToken(id);
  const newRefreshToken = uuidv4();
  await Promise.all([
    redisUtil.delAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${oldRefreshToken}`),
    redisUtil.setAsync(`${REDIS.REFRESH_TOKEN_PREFIX}:${newRefreshToken}`, newToken, 'ex', TOKEN.REFRESH_TOKEN_EXPIRED),
  ]);
  return { token: newToken, refreshToken: newRefreshToken };
};


export const loginByGoogle = async (googleToken) => {
  const info = await googleUtil.getInfo(googleToken);
  console.log(info);
  if(info){
    const checkExist = await checkUserExistByEmail(info.email);
    if(checkExist){
      console.log(checkExist);
      const newToken = await jwtUtil.generateToken({id: checkExist.id});
      return {
        token: newToken,
        email: info.email
      }
    } else {
      // create new user
      const sql = 'INSERT INTO user (id, name, email, avatar) VALUES(?,?,?, ?)';
      const id = uuidv4();
      await dbUtil.execute(sql, [id, info.name, info.email, info.picture]);
      const newToken = await jwtUtil.generateToken({id});
      return {
        token: newToken,
        email: info.email
      }
    }
  } else{
    Promise.reject(ERRORS.USER_NOTFOUND_ERROR);
  }
  
}