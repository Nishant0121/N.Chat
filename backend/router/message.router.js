import express from "express";
import { GetMessage, SendMessage } from "../controller/message.controller.js";
import ProtectRoute from "../middleware/protectroute.js";

const router = express.Router();

router.post("/send/:id", SendMessage);
router.get("/:id", GetMessage);

export default router;
