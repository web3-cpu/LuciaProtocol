import { Founder } from "../models/Founder.js";

export const getFounders = async (req, res) => {
  try {
    const founders = await Founder.findAll({
      attributes: ["id", "email", "title","address","signature"],
    });
    res.json(founders);
  } catch (error) {}
};

export const createFounder = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newFounder = await Founder.create({
      name,
      content,
    });

    res.json(newFounder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};