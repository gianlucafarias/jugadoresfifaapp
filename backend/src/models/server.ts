import express, { Application, Request, Response} from "express";
import playersRoutes from "../routes/players";
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
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

    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log("Base de datos conectada");
        } catch (error) {
            console.log("Error al conectar a la base de datos", error);
        }
    }

}

export default Server;