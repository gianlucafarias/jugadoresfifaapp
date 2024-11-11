import { Request, Response } from "express";
import Player from "../models/players";

export const getPlayers = async(req: Request, res: Response) => {
    try {
        const limit = 10;
        const listPlayers = await Player.findAll({limit: 10})
        res.json(listPlayers)
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener los jugadores"
        })
    }
}

export const getPlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id)

        if (player) {
            res.json(player)
        } else {
            res.status(404).json({
                msg: `No existe un jugador con el id ${id}`
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener el jugador"
        })
    }
}

export const deletePlayer = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id)
        if (!player) {
                return res.status(404).json({
                msg: `No existe un jugador con el id ${id}`
            })
        }
        await player.destroy()
        res.json({
            id: id,
            msg: "Jugador eliminado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al eliminar el jugador"
        })
    }
}

export const newPlayer = async (req: Request, res: Response) => {
    const { body } = req.body;
    try {
        await Player.create(body)
        res.json({
            msg: "Nuevo Jugador creado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al crear el jugador"
        })
    }
}

export const updatePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id)
        if (!player) {
            return res.status(404).json({
                msg: `No existe un jugador con el id ${id}`
            })
        }
        const { body } = req.body;
        await player.update(body)
        res.json({
        msg: "Jugador actualizado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar el jugador"
        })
    }
}
