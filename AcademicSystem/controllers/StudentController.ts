import express, { Request, Response, Router } from "express";
import { Student } from "../initSequelize";

const studentRouter = Router();

studentRouter.get("/", async (req: Request, res: Response) => {
   try {
      const students = await Student.findAll({ include: { all: true } });

      return res.status(200).json({
         students: students,
      });
   } catch (error) {
      const message = (error as Error).message;
      res.status(400).json({ error: `An Error Ocorrued: ${message}` });
   }
});

studentRouter.get("/:id", async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const student = await Student.findOne({
         where: {
            id: id,
         },
         include: {
            all: true,
         },
      });

      if (student == null) {
         throw new Error("Student not found");
      }

      return res.json({
         student: student,
      });
   } catch (error) {
      const message = (error as Error).message;
      res.status(400).json({ error: `An Error Ocorrued: ${message}` });
   }
});

studentRouter.post("/", async (req: Request, res: Response) => {
   try {
      const student = await Student.create();

      return res.json({
         student: student,
      });
   } catch (error) {
      const message = (error as Error).message;
      res.status(400).json({ error: `An Error Ocorrued: ${message}` });
   }
});

studentRouter.delete("/:id", async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const student = await Student.findOne({
         where: {
            id: id,
         },
      });

      if (student == null) {
         throw new Error("Student not found");
      }

      res.status(200).json({ sucess: "Sucess an delete student" });
   } catch (error) {
      const message = (error as Error).message;
      res.status(400).json({ error: `An Error Ocorrued: ${message}` });
   }
});

export { studentRouter };
