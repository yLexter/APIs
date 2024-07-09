import { Sequelize, DataTypes } from "sequelize";

const { STRING, FLOAT, DATE, INTEGER, ENUM, BOOLEAN } = DataTypes;

const sequelize = new Sequelize("sqlite::memory:");

const Person = sequelize.define(
   "Person",
   {
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
   },
   { tableName: "Person" }
);

const Student = sequelize.define(
   "Student",
   {
      id: {
         type: STRING,
         primaryKey: true,
      },
   },
   { tableName: "Student" }
);

const StudentClass = sequelize.define(
   "StudentClass",
   {
      id: {
         type: STRING,
         primaryKey: true,
      },
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
      absences: {
         type: INTEGER,
      },
      period: {
         type: STRING,
      },
   },
   { tableName: "StudentClass" }
);

const Teacher = sequelize.define(
   "Teacher",
   {
      id: {
         type: STRING,
         primaryKey: true,
      },
   },
   { tableName: "Teacher" }
);

const Admin = sequelize.define(
   "Admin",
   {
      id: {
         type: STRING,
         primaryKey: true,
      },
   },
   { tableName: "Admin" }
);

const ClassTeacher = sequelize.define(
   "ClassTeacher",
   {
      id: {
         type: STRING,
         primaryKey: true,
      },
   },
   { tableName: "ClassTeacher" }
);

const ScheduleClassTeacher = sequelize.define(
   "ScheduleClassTeacher",
   {
      schedule: {
         type: STRING,
      },
   },
   { tableName: "ScheduleClassTeacher" }
);

const RegisterClass = sequelize.define(
   "RegisterClass",
   {
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
   },
   { tableName: "RegisterClass" }
);

const StudentCallLog = sequelize.define(
   "StudentCallLog",
   {
      missed: {
         type: BOOLEAN,
      },

      justified: {
         type: BOOLEAN,
      },
   },
   { tableName: "StudentCallLog" }
);

const Subject = sequelize.define(
   "Subject",
   {
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
   },
   { tableName: "Subject" }
);

const Room = sequelize.define(
   "Room",
   {
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
   },
   { tableName: "Room" }
);

// Admin Teacher and Student
Admin.belongsTo(Person);
Teacher.belongsTo(Person);
Student.belongsTo(Person);

// Register CLass
StudentCallLog.belongsTo(RegisterClass);

// StudentCallLog
StudentCallLog.belongsTo(StudentClass);

// Class Teacher
ClassTeacher.belongsTo(Teacher);

ClassTeacher.hasMany(ScheduleClassTeacher);
ScheduleClassTeacher.belongsTo(ClassTeacher);

ClassTeacher.belongsTo(Subject);

ClassTeacher.belongsToMany(Student, { through: "StudentClass" });
Student.belongsToMany(ClassTeacher, { through: "StudentClass" });

ScheduleClassTeacher.belongsTo(Room);

// Student
StudentClass.belongsTo(Student);

export {
   Person,
   Student,
   StudentClass,
   Teacher,
   Admin,
   ClassTeacher,
   ScheduleClassTeacher,
   RegisterClass,
   StudentCallLog,
   Subject,
   Room,
   sequelize,
};
