import BaseRoutes from "./base/BaseRouter";
import NoteController from "../controller/NoteController";
import validate from "../utils/validate";
import { CreateNoteSchema, UpdateNoteSchema } from "../schema/schema";

class NoteRoute extends BaseRoutes{
   public routes(): void {
      this.router.post("/note",validate(CreateNoteSchema),NoteController.create)
      this.router.put("/note/:id",validate(UpdateNoteSchema),NoteController.update)
      this.router.delete("/note/:id",NoteController.delete)
      this.router.get("/note/:id",NoteController.findById)
      this.router.get("/note",NoteController.findAll)
    }
}

export default new NoteRoute().router