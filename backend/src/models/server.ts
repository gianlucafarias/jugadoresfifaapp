import express, { Application, Request, Response} from "express";
import playersRoutes from "../routes/players";
import db from "../db/connection";
import cors from 'cors';
import userRoutes from "../routes/users";
import User from "./user";
import path from "path";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use('/uploads', express.static('uploads'));
        this.port = process.env.PORT || "3001";
        this.listen();
        this.middleware();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

    routes() {
        this.app.get("/", (req: Request, res: Response) => {
            res.json({
                msg: "API Funcionando"
            })
        })
        this.app.use('/api/players', playersRoutes);
        this.app.use('/api/users', userRoutes);
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log("Base de datos conectada");
            await User.sync();
        } catch (error) {
            console.log("Error al conectar a la base de datos", error);
        }
    }

}

export default Server;