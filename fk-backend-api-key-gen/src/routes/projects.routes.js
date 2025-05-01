import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProject,
  getProjectWorkpackages,
  keygen
} from "../controllers/projects.controller.js";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);
router.post("/keygen/", keygen);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.get("/:id", getProject);
router.get("/:id/workpackages", getProjectWorkpackages);



export default router;
