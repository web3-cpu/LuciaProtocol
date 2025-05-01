import { Safe } from "../models/Safe.js";

export const getSafes = async (req, res) => {
  try {
    const Safes = await Safe.findAll({
      attributes: ["id", "name", "valuation_cap", "valuation_cap_denom", "discount", "security_id"],
      order: [["id", "DESC"]],
    });
    res.json(Safes);
  } catch (error) {}
};

export const createSafe = async (req, res) => {
  const { name, valuation_cap, valuation_cap_denom, discount, security_id } = req.body;

  try {
    const newSafe = await Safe.create({
      name,
      valuation_cap,
      valuation_cap_denom,
      discount,
      security_id
    });

    res.json(newSafe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};