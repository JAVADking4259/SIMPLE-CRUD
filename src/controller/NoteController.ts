import { Request,Response } from "express";
import { Note } from "../model/Note";
import { NoteRepo } from "../repository/NoteRepo";
class NoteController{

    async create(req:Request,res:Response){
        try {
            const new_note = new Note();
            new_note.name=req.body.name;
            new_note.description=req.body.description;

            await new NoteRepo().save(new_note);
            res.status(200).json({
                status:"created",
                message:"successfuly created"
            })
        } catch (error) {
            res.status(500).json({
                status:"internal server Error",
                message:"internal server Error"
            })
        }


    }
    async delete(req:Request,res:Response){
        try {
           const id = parseInt(req.params["id"])
            await new NoteRepo().delete(id);

            res.status(200).json({
                status:"deleted",
                message:"successfuly deleted"
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"internal server Error"
            })
        }
    }
    async findAll(req:Request,res:Response){
        try {
            const new_note = await new NoteRepo().retrieveAll();
            res.status(200).json({
                status:200,
                message:"successfuly",
                data:new_note
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"internal server Error"
            })
        }
    }
    async findById(req:Request,res:Response){
        try {
            const id = parseInt(req.params["id"])
            const new_note = await new NoteRepo().retrieveById(id);
            res.status(200).json({
                status:200,
                message:"successfuly",
                data:new_note
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"internal server Error"
            })
        }
    }
    async update(req:Request,res:Response){
        try {
            const id = parseInt(req.params["id"]);
            let new_note =new Note();

            new_note.id=id;
            new_note.name=req.body.name;
            new_note.description=req.body.description;

            await new NoteRepo().update(new_note);

            res.status(200).json({
                status:200,
                message:"successfuly update"
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message:"internal server Error"
            })
        }
    }
}

export default new NoteController()