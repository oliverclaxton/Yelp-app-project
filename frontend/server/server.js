require("dotenv").config();
const express = require('express')
const db = require('./db')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())


// home page
app.get('/', (req, res) => {
  res.send('Hello World!/home page')
})

// get all resturants
app.get('/restaurants', async (req, res) => {
    const results = await db.query("select * from restaurants")
 console.log(results)
  res.status(200).json({
      status:"success",
      data:{
          resturants:["mcdonals","wendys"],
      },
  });
});

// get one resturant
app.get("/restaurants/:id",(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            restuarant:["mcdonals"]
        }
    })
    console.log(req.params)
})

// create route
app.post("/restaurants",(req,res) => {
    res.status(201).json({
        status:"success",
        data:{
            resturant: "mcdonalds",
        },
    })

})

//update resturant 
app.put("/restaurants/:id",(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
    res.status(200).json({
        status:"success",
        data:{
            resturant: "mcdonalds",
        },
    })
})

 //delete route 
 app.delete("/restaurants/:id",(req,res)=>{
     res.status(204).json({
         status:"success"
     })
 })



app.listen(port, () => {
console.log(`Example app listening at 
  http://localhost:${port}`)
})
