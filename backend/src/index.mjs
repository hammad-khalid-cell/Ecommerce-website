import express from "express";

const app =  express();

app.get("/", (request, response)=>{
    response.send("server is ready")
})

const port  =  process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

