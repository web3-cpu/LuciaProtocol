import { Fingerprint } from "../models/Fingerprint.js";

export const getFingerprints = async (req, res) => {
  const { customer_address } = req.params;
  try {
    const fingerprints = await Fingerprint.findOne({
      where: {
        "customer_address": customer_address
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createFingerprint = async (req, res) => {
  const { fingerprint } = req.body;
  const { 
    customer_address, 
    user_agent_string,
    system_info 
  } = fingerprint.jsonData;

  try {
    const newFingerprint = await Fingerprint.create({
      jsonData: {
        customer_address, 
        user_agent_string,
        system_info 
      }
    });

    res.json(newFingerprint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

