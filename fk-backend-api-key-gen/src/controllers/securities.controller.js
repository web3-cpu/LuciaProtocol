import { Security } from "../models/Security.js";

export const getSecurities = async (req, res) => {
  try {
    const Securities = await Security.findAll({
      attributes: ["id", "name"],
    });
    res.json(Securities);
  } catch (error) {}
};

export const createSecurity = async (req, res) => {
  const { name, content, contract_id } = req.body;

  try {
    const newSecurity = await Security.create({
      name,
      content,
      contract_id
    });

    res.json(newSecurity);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};