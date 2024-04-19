import { Sequelize, DataTypes } from "sequelize";

const { STRING, FLOAT, DATE, INTEGER, ENUM, BOOLEAN } = DataTypes;

const sequelize = new Sequelize("sqlite::memory:");

const Person = sequelize.define("Person", {
   name: {
      type: STRING,
   },
   lastName: {
      type: STRING,
   },
   cpf: {
      type: STRING,
      primaryKey: true,
   },
   dateOfBirth: {
      type: DATE,
   },
   password: {
      type: STRING,
   },
});

const Student = sequelize.define("Student", {
   CPF_Person: {
      type: STRING,
      references: {
         model: "Person",
         key: "cpf",
      },
   },

   id: {
      type: STRING,
      primaryKey: true,
   },
});

const StudentClass = sequelize.define("StudentClass", {
   note1: {
      type: FLOAT,
   },
   note2: {
      type: FLOAT,
   },
   finalExameScore: {
      type: FLOAT,
   },
   status: {
      type: ENUM("Falied", "Studying", "Approved"),
   },
   studentId: {
      type: STRING,
      primaryKey: true,
      references: {
         model: "Student",
         key: "id",
      },
   },
   absences: {
      type: INTEGER,
   },
   period: {
      type: STRING,
   },
   college_class_id: {
      type: STRING,
      primaryKey: true,
   },
});

const Teacher = sequelize.define("Teacher", {
   id: {
      type: STRING,
      primaryKey: true,
   },
   CPF_person: {
      type: STRING,
      references: {
         model: "Person",
         key: "cpf",
      },
   },
});

const ClassTeacher = sequelize.define("ClassTeacher", {
   id: {
      type: STRING,
      primaryKey: true,
   },

   subject_code: {
      type: STRING,
      references: {
         model: "Subject",
         key: "code",
      },
   },

   teacher_id: {
      type: STRING,
      references: {
         model: "Teacher",
         key: "id",
      },
   },

   room_id: {
      type: STRING,
      references: {
         model: "Room",
         key: "id",
      },
   },
});

const RegisterClass = sequelize.define("RegisterClass", {
   id: {
      type: STRING,
      primaryKey: true,
   },
   description: {
      type: STRING,
   },
   date: {
      type: DATE,
   },
   class_teacher_id: {
      type: STRING,
      references: {
         model: "ClassTeacher",
         key: "id",
      },
   },
});

const StudentCallLog = sequelize.define("StudentCallLog", {
   student_class_id: {
      type: STRING,
      primaryKey: true,
      references: {
         model: "StudentClass",
         key: "id",
      },
   },

   register_class_id: {
      type: STRING,
      primaryKey: true,
      references: {
         model: "RegisterClass",
         key: "id",
      },
   },

   missed: {
      type: BOOLEAN,
   },

   justified: {
      type: BOOLEAN,
   },
});

const Subject = sequelize.define("Subject", {
   code: {
      type: STRING,
      primaryKey: true,
   },
   name: {
      type: STRING,
   },
   hours: {
      type: INTEGER,
   },
});

const Room = sequelize.define("Room", {
   name: {
      type: STRING,
   },
   capacity: {
      type: INTEGER,
   },
   id: {
      type: STRING,
      primaryKey: true,
   },
});

function initSequelize() {
   sequelize
      .sync({ force: true })
      .then(() => {
         console.log("Models synced with database.");
      })
      .catch((err: Error) => {
         console.error("Error syncing models:", err);
      });
}

export {
   Person,
   Student,
   StudentClass,
   Teacher,
   ClassTeacher,
   Subject,
   Room,
   RegisterClass,
   StudentCallLog,
   initSequelize,
   sequelize,
};
