import { adminRouter } from "./controllers/AdminController";
import { studentRouter } from "./controllers/StudentController";
import { teacherRouter } from "./controllers/TeacherController";
import { sequelize } from "./initSequelize";
import express from "express";

(async () => {
   await sequelize.sync({});
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
