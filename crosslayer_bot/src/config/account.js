const ethers = require("ethers");
const {
  TurnkeyClient,
  createActivityPoller,
  TurnkeyActivityError,
} = require("@turnkey/http");
const { ApiKeyStamper } = require("@turnkey/api-key-stamper");
require("dotenv").config();

const turnkeyClient = new TurnkeyClient(
  { baseUrl: process.env.BASE_URL },
  new ApiKeyStamper({
    apiPublicKey: process.env.API_PUBLIC_KEY,
    apiPrivateKey: process.env.API_PRIVATE_KEY,
  })
);

async function createWeb3Wallet(userId, organizationId) {
  const privateKeyName = `${userId}-${Date.now()}`;
  const activityPoller = createActivityPoller({
    client: turnkeyClient,
    requestFn: turnkeyClient.createPrivateKeys,
  });
  const completedActivity = await activityPoller({
    type: "ACTIVITY_TYPE_CREATE_PRIVATE_KEYS_V2",
    timestampMs: String(Date.now()),
    organizationId: organizationId,
    parameters: {
      privateKeys: [
        {
          privateKeyName: privateKeyName,
          curve: "CURVE_SECP256K1",
          addressFormats: ["ADDRESS_FORMAT_ETHEREUM"],
          privateKeyTags: [],
        },
      ],
    },
  });
  const privateKey = refineNonNull(
    completedActivity.result.createPrivateKeysResultV2?.privateKeys?.[0]
  );
  const privateKeyId = refineNonNull(privateKey.privateKeyId);
  const address = refineNonNull(privateKey.addresses?.[0]?.address);
  return {
    privateKeyId: privateKeyId,
    address: address,
    privateKeyName: privateKeyName,
  };
}

const createSubOrganization = async (userId) => {
  const activityPoller = createActivityPoller({
    client: turnkeyClient,
    requestFn: turnkeyClient.createSubOrganization,
  });
  const completedActivity = await activityPoller({
    type: "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V3",
    timestampMs: String(Date.now()),
    organizationId: process.env.ORGANIZATION_ID,
    parameters: {
      subOrganizationName: userId,
      rootQuorumThreshold: 1,
      rootUsers: [
        {
          userName: userId,
          apiKeys: [
            {
              apiKeyName: process.env.API_KEY_NAME,
              publicKey: process.env.API_PUBLIC_KEY,
            },
          ],
          authenticators: [],
        },
      ],
      privateKeys: [],
    },
  });
  return completedActivity.result.createSubOrganizationResultV3
    .subOrganizationId;
};

async function createFromSeed(phrase) {
  const wallet = ethers.Wallet.fromPhrase(phrase);
  return wallet;
}
function refineNonNull(input, errorMessage) {
  if (input == null) {
    throw new Error(errorMessage ?? `Unexpected ${JSON.stringify(input)}`);
  }

  return input;
}

module.exports = {
  createWeb3Wallet,
  createFromSeed,
  createSubOrganization,
};
