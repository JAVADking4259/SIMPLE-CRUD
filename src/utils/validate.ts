import { Request,Response,NextFunction, query } from "express";
import { AnyZodObject } from "zod";

const validate = (schema:AnyZodObject)=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await schema.parseAsync({
            body:req.body,
            params:req.params,
            query:req.query
        })        
        return next();
    } catch (err:any) {
        const erro_message = JSON.parse(err.message);
        return res.status(400).json({
            status:"bad request",
            message:erro_message[0].message
        })
        
    }

}
export default validate;