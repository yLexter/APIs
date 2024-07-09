import express, { Request, Response, Router } from "express";
import { Admin, Student, Teacher } from "../initSequelize";

const adminRouter = Router();

adminRouter.get("/admins", async (req, res) => {
   const admins = await Admin.findAll({});
   res.json(admins);
});

adminRouter.get("/admins/:id", async (req, res) => {
   const admin = await Admin.findByPk(req.params.id);
   if (admin) {
      res.json(admin);
   } else {
      res.status(404).send("Admin not found");
   }
});

adminRouter.post("/admins", async (req, res) => {
   const { id, person } = req.body;
   const newAdmin = await Admin.create({ id });
   res.status(201).json(newAdmin);
});

adminRouter.put("/admins/:id", async (req, res) => {
   const admin = await Admin.findByPk(req.params.id);
   if (admin) {
      await admin.update(req.body);
      res.json(admin);
   } else {
      res.status(404).send("Admin not found");
   }
});

adminRouter.delete("/admins/:id", async (req, res) => {
   const admin = await Admin.findByPk(req.params.id);
   if (admin) {
      await admin.destroy();
      res.status(204).send();
   } else {
      res.status(404).send("Admin not found");
   }
});

export { adminRouter };
