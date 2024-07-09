import express, { Request, Response, Router } from "express";
import { Person, Teacher } from "../initSequelize";

const teacherRouter = Router();

teacherRouter.get("/teachers", async (req, res) => {
   const teachers = await Teacher.findAll({ include: Person });
   res.json(teachers);
});

teacherRouter.get("/teachers/:id", async (req, res) => {
   const teacher = await Teacher.findByPk(req.params.id, { include: Person });
   if (teacher) {
      res.json(teacher);
   } else {
      res.status(404).send("Teacher not found");
   }
});

teacherRouter.post("/teachers", async (req, res) => {
   const { id, person } = req.body;
   const newTeacher = await Teacher.create({ id });
   res.status(201).json(newTeacher);
});

teacherRouter.put("/teachers/:id", async (req, res) => {
   const teacher = await Teacher.findByPk(req.params.id);

   if (teacher) {
      await teacher.update(req.body);
      res.json(teacher);
   } else {
      res.status(404).send("Teacher not found");
   }
});

teacherRouter.delete("/teachers/:id", async (req, res) => {
   const teacher = await Teacher.findByPk(req.params.id);
   if (teacher) {
      await teacher.destroy();
      res.status(204).send();
   } else {
      res.status(404).send("Teacher not found");
   }
});

export { teacherRouter };
