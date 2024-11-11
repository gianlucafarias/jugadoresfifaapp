import { Router } from "express";
import { deletePlayer, getPlayer, getPlayers, newPlayer, updatePlayer } from "../controllers/players";

const router = Router();

router.get("/", getPlayers);

router.get("/:id", getPlayer);

router.delete("/:id", deletePlayer);

router.post("/", newPlayer);

router.put("/:id", updatePlayer);

export default router;
