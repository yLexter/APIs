import express, { Request, Response, Router } from "express";
import { Student } from "../initSequelize";

const studentRouter = Router();

studentRouter.get("/students", async (req, res) => {
   const students = await Student.findAll({});
   res.json(students);
});

studentRouter.get("/students/:id", async (req, res) => {
   const student = await Student.findByPk(req.params.id);
   if (student) {
      res.json(student);
   } else {
      res.status(404).send("Student not found");
   }
});

studentRouter.post("/students", async (req, res) => {
   const { id } = req.body;
   const newStudent = await Student.create({ id });
   res.status(201).json(newStudent);
});

studentRouter.put("/students/:id", async (req, res) => {
   const student = await Student.findByPk(req.params.id);
   if (student) {
      await student.update(req.body);

      res.json(student);
   } else {
      res.status(404).send("Student not found");
   }
});

studentRouter.delete("/students/:id", async (req, res) => {
   const student = await Student.findByPk(req.params.id);
   if (student) {
      await student.destroy();
      res.status(204).send();
   } else {
      res.status(404).send("Student not found");
   }
});

export { studentRouter };
