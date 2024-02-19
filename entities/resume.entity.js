// import  {  Entity ,  Column ,  PrimaryGeneratedColumn, OneToMany  }  from  "typeorm"
// @ Entity ( )
// export  class  Resume {
//     @ PrimaryGeneratedColumn ( )
//     resumeId : number

//     @ Column ( )
//     title : string

//     @ Column ( )
//     content: string

//     @ Column ()
//     status : string

//     @ Column ()
//     createdAt:date

//     @ Column ()
//     updatedAt:date

//     @ OneToMany (() => ResumeMetadata,(metadata)=> metadata.resume, {
//     cascade: true,
//     })
//     metadata:ResumeMetadata
// }
import { EntitySchema } from "typeorm";
import { User } from "../entities/user.entity.js";
module.exports = new EntitySchema({
  name: "Resume",
  target: Resume,
  columns: {
    resumeid: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "text",
    },
    createdAt: {
      type: "date",
    },
    updatedAt: {
      type: "date",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-many",
      joinTable: true,
      cascade: true,
    },
  },
});
