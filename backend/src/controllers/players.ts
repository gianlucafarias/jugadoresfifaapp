import { Request, Response } from "express";
import Player from "../models/players";
import { Op } from "sequelize";
import { parseCsvFileWithXlsx } from "../utils/parseCsv";



export const getPlayers = async(req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const totalPlayers = await Player.count();

        const where: any = {};

  if (req.query.nombre) {
    where.long_name = { [Op.like]: `%${req.query.nombre}%` };
  }

  if (req.query.nacionalidad) {
    where.nationality_name = { [Op.like]: `%${req.query.nacionalidad}%` };
  }

  if (req.query.club) {
    where.club_name = { [Op.like]: `%${req.query.club}%` };
  }

  if (req.query.posicion) {
    where.player_positions = { [Op.like]: `%${req.query.posicion}%` };
  }
  if (req.query.fifa_version) {
    where.fifa_version = { [Op.like]: `%${req.query.fifa_version}%` };
  }

    const { count, rows: players } = await Player.findAndCountAll({
      where,
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      players,
      totalPages,
      currentPage: page,
      totalPlayers
    });
  
}


export const getPlayer = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const fifa_version = req.query.fifa_version as string;

    try {
        const whereConditions: any = { id };
        if (fifa_version) {
            whereConditions.fifa_version = fifa_version;
        }

        const player = await Player.findOne({ where: whereConditions });

        if (player) {
            res.json(player);
        } else {
            res.status(404).json({
                msg: `No existe un jugador con el id ${id} y versión de FIFA ${fifa_version}`
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el jugador',
            error
        });
    }
};

export const deletePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({
                msg: `No existe un jugador con el id ${id}`
            });
        }
        await player.destroy();
        return res.json({
            msg: "Jugador eliminado"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar el jugador"
        });
    }
};

export const newPlayer = async (req: Request, res: Response) => {
    try {
        const playerData = req.body;
        const player = await Player.create(playerData);
        res.status(200).json({
            msg: "Nuevo Jugador creado",
            player
        })
    } catch (error) {
        console.error("Error en el backend:", error);
        res.status(500).json({
            msg: "Error al crear el jugador",
            error
        })
    }
}


export const updatePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({
                msg: `No existe un jugador con el id ${id}`
            });
        }
        await player.update(body);
        return res.json({
            msg: "Jugador actualizado"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al actualizar el jugador"
        });
    }
}


export const csvImport = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
     }
     const filePath = req.file.path;
     try {
        const playerData = await parseCsvFileWithXlsx(filePath);
        await Player.bulkCreate(playerData, { ignoreDuplicates: true });
        res.status(200).json({
            msg: "Datos importados correctamente"
        });
     } catch (error) {
        res.status(500).json({
            msg: "Error al importar los datos",
            error
        })
     }
    
}

