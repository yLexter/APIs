import express, { Request, Response, Router } from "express";

const studentRouter = Router();

studentRouter.get("/rdm", (req: Request, res: Response) => {
   // Logic to view the Registration of Student Enrollment (RDM)
   res.send("View RDM");
});

studentRouter.get("/curriculum", (req: Request, res: Response) => {
   // Logic to view the course curriculum
   res.send("View Curriculum");
});

studentRouter.get("/history", (req: Request, res: Response) => {
   // Logic to view the academic history
   res.send("View History");
});

studentRouter.get("/admissions", (req: Request, res: Response) => {
   // Logic to view information about admissions
   res.send("View Admissions");
});

export { studentRouter };
