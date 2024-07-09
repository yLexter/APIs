import express, { Request, Response, Router } from "express";
import { Student, Teacher } from "../initSequelize";

const adminRouter = Router();

// Teachers Endpoints
adminRouter.get("/teachers", async (req: Request, res: Response) => {
   try {
      const teachers = await Teacher.findAll();

      return res.json({
         teachers: teachers,
      });
   } catch (error) {
      const message = (error as Error).message;
      res.json({ error: `An Error Ocorrued: ${message}` });
   }
});

adminRouter.post("/teachers", (req: Request, res: Response) => {
   // Logic to add a new professor
   res.send("Add Professor");
});

adminRouter.delete("/teachers/:id", (req: Request, res: Response) => {
   // Logic to remove a professor by ID
   res.send("Remove Professor");
});

// Class
adminRouter.get("/classes", (req: Request, res: Response) => {
   // Logic to view registered classes
   res.send("View Classes");
});

adminRouter.post("/classes", (req: Request, res: Response) => {
   // Logic to add a new class
   res.send("Add Class");
});

adminRouter.delete("/classes/:id", (req: Request, res: Response) => {
   // Logic to delete a class by ID
   res.send("Delete Class");
});

// Class Teachers endpoints
adminRouter.get("/classrooms", (req: Request, res: Response) => {
   // Logic to view registered classrooms
   res.send("View Classrooms");
});

adminRouter.post("/classrooms", (req: Request, res: Response) => {
   // Logic to add a new classroom
   res.send("Add Classroom");
});

adminRouter.get("/class-schedules", (req: Request, res: Response) => {
   // Logic to view class schedules
   res.send("View Class Schedules");
});

export { adminRouter };
