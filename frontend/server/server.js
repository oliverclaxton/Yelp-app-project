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

    try{
        const results = await db.query("select * from restaurants")
        console.log(results)
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                resturants: results.rows,
            },
        });
    } catch(err){
        console.log(err)
    }
    
 
});

// get one resturant
app.get("/restaurants/:id", async (req,res) => {
   
try{
const results = await db.query("select * from restaurants where id = $1", [req.params.id])
res.status(200).json({
    status:"success",
    data:{
        restuarant: results.rows[0]
    }
})
}catch(err){
    console.log(err)

}


    
})




// now doing post route !!
// create route
app.post("/restaurants", async (req,res) => {
try{
    const results = await db.query("INSERT INTO restaurants(name, location, price_range) values ($1,$2,$3) returning *", [req.body.name, req.body.location, req.body.price_range])
    console.log(results)
    res.status(201).json({
        status:"success",
        data:{ 
            restaurant: results.rows[0],
        },
    })
} catch(err){
 console.log(err)
}

    

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
