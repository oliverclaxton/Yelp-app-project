require("dotenv").config();
const express = require('express')
const cors = require('cors')
const db = require('./db')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.json())




// get all resturants
app.get('/restaurants', async (req, res) => {

    try{
        const results = await db.query("select * from restaurants")
        // console.log(results)
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
    // console.log(results)
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
app.put("/restaurants/:id", async (req,res)=>{

    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id] )

        // console.log(results)
        res.status(200).json({
            status:"success",
            data:{
                resturant: results.rows[0],
            },
        })
    } catch(err){
        console.log(err)
    }
    
    
})

 //delete route 
 app.delete("/restaurants/:id",async (req,res)=>{
     try{
        const results = await db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        res.status(204).json({
            status:"success"
        })
     }catch(err){
         console.log(err)
     }
     
 })



app.listen(port, () => {
console.log(`Example app listening at 
  http://localhost:${port}`)
})
