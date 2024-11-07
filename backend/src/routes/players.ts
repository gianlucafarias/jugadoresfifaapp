import { Router } from "express";
import { csvImport, deletePlayer, getPlayer, getPlayers, newPlayer, updatePlayer } from "../controllers/players";
import validateToken from "./validate-token";
import multer from "multer";
import { upload } from "../config/multer";
const router = Router();

router.get("/", validateToken, getPlayers);

router.get('/:id', getPlayer);

router.delete("/:id", deletePlayer as any);

router.post("/new-player", newPlayer as any);

router.put("/:id", updatePlayer as any);

router.post("/csv-import", upload.single('csv'), csvImport as any);


export default router;
