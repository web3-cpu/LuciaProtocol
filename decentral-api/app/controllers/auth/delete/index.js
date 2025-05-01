const UserModel = require('../../../models/user');
const { sendApiErrorResponse, sendApiSuccessResponse } = require('../../../utils/response.utils');
const { decryptEncryption } = require('../../../utils/encryption.utils');
const jwt = require('jsonwebtoken');
const environment = require('../../../../config/environment');

async function DeleteUser(req, res) {
    try {
      let accessToken = req.headers.authorization;
      accessToken = accessToken.replace('Bearer ', '').trim();
      accessToken = decryptEncryption(accessToken);
      const { _id } = jwt.decode(accessToken, environment.JWT_SECRET);
      const user = await UserModel.findById(_id);
      if (!user) throw new Error('Cannot find user account.');
      await user.delete();
  
      sendApiSuccessResponse(
        res,
        'Your Founders Kit account has been deleted.',
      );
  
    } catch (error) {
      sendApiErrorResponse(res, error);
    }
}
  
module.exports = DeleteUser;