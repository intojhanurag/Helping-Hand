import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import Tweet from "./models/tweet.js"

dotenv.config()
const app=express()

app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongodb connected")).catch(err=>console.log(err))

app.post("/tweets",async(req,res)=>{
    try{
        const newTweet=new Tweet(req.body)
        const saved=await newTweet.save()
        res.status(201).json(saved)

    }catch(err){
        res.status(500).json({error:err.message})
    }
})

app.get("/tweets/waiting",async(req,res)=>{
    const tweets=await Tweet.find({upvotes:{$lt:10}})
    res.json(tweets)
})

app.get("/tweets/dashboard", async (req, res) => {
  const tweets = await Tweet.find({ upvotes: { $gte: 10 } })
  res.json(tweets)
})

app.put("/tweets/:id", async (req, res) => {
  const updated = await Tweet.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
  res.json(updated)
})


app.delete("/tweets/:id", async (req, res) => {
  await Tweet.findOneAndDelete({ id: req.params.id })
  res.json({ success: true })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))