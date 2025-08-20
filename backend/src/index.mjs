import express, { response } from "express";

import mongoose, { connect } from "mongoose";
import users from "./user.mjs";



const app =  express();

mongoose
    .connect("mongodb://localhost:27017/project")
    .then(()=> console.log("connected to database"))
    .catch((err)=> console.log(`Error : ${err}`));




app.get("/", (request, response)=>{
    response.send("server is ready")
})


app.get("/api/users", (request, response)=>{
    response.json(users);
})

app.post("/api/signup",(request, response)=>{
    
})
const port  =  process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

