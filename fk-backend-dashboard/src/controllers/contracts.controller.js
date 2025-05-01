import { Contract } from "../models/Contract.js";

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      attributes: ["id", "name", "content"],
    });
    res.json(contracts);
  } catch (error) {}
};

export const createContract = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newContract = await Contract.create({
      name,
      content,
    });

    res.json(newContract);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};