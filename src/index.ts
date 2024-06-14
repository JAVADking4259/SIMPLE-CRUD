import express ,{Application,Request,Response} from "express";
import Database from "./config/database";
import NoteRoute from "./router/NoteRoute";

class App{
    public app:Application;
    constructor(){
        this.app = express();
        this.database()
        this.plugins()
        this.routes()
    }
    protected plugins():void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
    }
    protected database():void{
        const db = new Database();
        db.sequelize?.sync()
    }
    protected routes():void{
        this.app.route("/").get((req:Request,res:Response)=>{
            res.send("hello world");
        });
        this.app.use("/api",NoteRoute)
    }
}

const port :number=3000;
const app =new App().app;

app.listen(port,()=>{
    console.log("server runinng successfuly");
    
});

