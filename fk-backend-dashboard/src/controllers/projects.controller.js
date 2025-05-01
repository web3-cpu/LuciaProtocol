import { Project } from "../models/Project.js";
import { Workpackage } from "../models/Workpackage.js";
import crypto from "crypto";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "title", "description"],
    });
    res.json(projects);
  } catch (error) {}
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: {
        id,
      },
    });
    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newProject = await Project.create({
      title,
      description,
    });

    res.json(newProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const project = await Project.findByPk(id);
    project.title = title;
    project.description = description;
    await project.save();

    res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await Project.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectWorkpackages = async (req, res) => {
  const { id } = req.params;
  try {
    const workpackages = await Workpackage.findAll({
      attributes: [
        "id",
        "projectId",
        "title",
        "description",
        "completed",
        "checked",
      ],
      where: { projectId: id },
    });
    res.json(workpackages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


/**
 * This can be improved by EC verify (see Ethereum specification)
 * @param { String } name - user's input for the key name
 * @param { String } user_id - who is the user or found that will receive the key 
 * @returns generated key for the user id
 */
export const keygen = async (req,res) => {
  const { user_id, name } = req.body;
  try {
    const apikeyLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    for (let i = 0; i < apikeyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      apiKey += characters.charAt(randomIndex);
    } 
    res.json(apiKey);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}