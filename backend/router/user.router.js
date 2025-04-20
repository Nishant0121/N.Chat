import express from "express";
import {
  followedUsers,
  followUser,
  getUserForsideBar,
} from "../controller/user.controller.js";
import ProtectRoute from "../middleware/protectroute.js";

const router = express.Router();

router.get("/", ProtectRoute, getUserForsideBar);

router.post("/follow", followUser);

router.post("/followeduser", followedUsers);

export default router;
