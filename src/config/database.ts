import {Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Note } from "../model/Note";

dotenv.config();

class database{
    public sequelize:Sequelize|undefined;

    private POSTGRES_DB=process.env.POSTGRES_DB as string; 
    private POSTGRES_HOST=process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT=process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER=process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD=process.env.POSTGRES_PASSWORD as string;

    constructor(){
        this.connectToPostgres();
    }

    private async connectToPostgres(){
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect:"postgres",
            models:[Note]
        })
        this.sequelize
        .authenticate().then(()=>{
            console.log("postgress connected successfuly");
        }).catch((error)=>{
            console.log("unable to connect to the postgres",error);
            
        })
    }
};


export default database;