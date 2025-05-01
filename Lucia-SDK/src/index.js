import Lucia from "./lucia-sdk.js";

const LuciaSDK = {};

LuciaSDK.init = function (config) {
  if (typeof window === 'undefined') return;

  const userConfig = config || {};

  const instance = new Lucia(userConfig);
  LuciaSDK.authenticate = instance.authenticate;
  LuciaSDK.userInfo = instance.userInfo;
  LuciaSDK.pageView = instance.pageView;
  LuciaSDK.trackConversion = instance.trackConversion;
  LuciaSDK.buttonClick = instance.buttonClick;
  LuciaSDK.sendWalletInfo = instance.sendWalletInfo;
  LuciaSDK.checkMetaMaskConnection = instance.checkMetaMaskConnection;
};

export default LuciaSDK;
