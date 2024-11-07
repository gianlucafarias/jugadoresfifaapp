import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 

export const signup = async (req: Request, res: Response): Promise<Response| void> => {
    const { username, password } = req.body;
    const user: any = await User.findOne({ where: { username } });
    if (user) {
        return res.status(400).json({
            msg: "El usuario ya existe"
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            msg: "La contraseña debe tener al menos 6 caracteres"
        });
    }
    if (!username || !password) {
        return res.status(400).json({
            msg: "Faltan datos"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({ username, password: hashedPassword });
        res.status(200).json({
            msg: "Usuario creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al crear el usuario"
        });
    }
}

export const login = async (req: Request, res: Response): Promise<Response| void> => {
    const { username, password } = req.body;
        const user: any = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });

        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                msg: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY || "" as string );
        res.status(200).json({
            msg: "Usuario logueado correctamente",
            token
        });

        };
         
 
