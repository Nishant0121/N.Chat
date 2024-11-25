import express from "express";
import { GetMessage, SendMessage } from "../controller/message.controller.js";
import ProtectRoute from "../middleware/protectroute.js";

const router = express.Router();

router.post("/send/:id", ProtectRoute, SendMessage);
router.get("/:id", ProtectRoute, GetMessage);

export default router;
