import { adminRouter } from "./controllers/AdminController";
import { studentRouter } from "./controllers/StudentController";
import { teacherRouter } from "./controllers/TeacherController";
import {
   Admin,
   ClassTeacher,
   Person,
   RegisterClass,
   Room,
   ScheduleClassTeacher,
   StudentCallLog,
   StudentClass,
   Student,
   Subject,
   Teacher,
   sequelize,
} from "./initSequelize";
import express from "express";

(async () => {
   await sequelize.sync({});

   /*
   const models = [
      Admin,
      ClassTeacher,
      Person,
      RegisterClass,
      Room,
      ScheduleClassTeacher,
      StudentCallLog,
      StudentClass,
      Student,
      Subject,
      Teacher,
   ];

   for (let model of models) {
      const schema = await model.describe();

      console.log(schema);
   }
   */

   await Person.create({
      name: "John",
      lastName: "Doe",
      cpf: "12345678900",
      dateOfBirth: new Date(1990, 0, 1),
      password: "password123",
   });

   await Student.create({
      id: "1",
      PersonCpf: "12345678900",
   });

   await Teacher.create({
      id: "1",
      PersonCpf: "12345678900",
   });

   await Admin.create({
      id: "1",
      PersonCpf: "12345678900",
   });

   await Room.create({
      name: "Room 101",
      capacity: 30,
      id: "101",
   });

   await Subject.create({
      code: "001",
      name: "Math",
      hours: 60,
   });

   // depende FK

   await ClassTeacher.create({
      id: "1",
      TeacherId: "1",
      SubjectId: "001",
   });

   await StudentClass.create({
      note1: 7.5,
      note2: 8.0,
      finalExameScore: 7.0,
      status: "Studying",
      absences: 2,
      period: "2024/1",
      classTeacherId: "1",
      id: "1",
   });

   await ScheduleClassTeacher.create({
      schedule: "8:00 - 10:00",
      ClassTeacherId: "1",
      RoomId: "101",
   });

   await RegisterClass.create({
      id: "1",
      description: "Class registration",
      date: new Date(2024, 3, 1),
   });

   await StudentCallLog.create({
      missed: false,
      justified: true,
      RegisterClassId: "1",
      StudentClassId: "1",
   });

   const app = express();
   const PORT = 3000;

   app.use(express.json());

   app.use("/student", studentRouter);
   app.use("/admin", adminRouter);
   app.use("/teacher", teacherRouter);

   app.listen(PORT, () => {
      console.log(`Server Running in: ${PORT}`);
   });
})();
