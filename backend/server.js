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


app.post("/tweets/:id/upvote", async (req, res) => {
  try {
    const { action } = req.body;
    const { id } = req.params;

    console.log("Received upvote request:", id, action);

    // const tweet = await Tweet.findById(id);
    const tweet = await Tweet.findOne({ id });
    if (!tweet) {
      console.error("Tweet not found:", id);
      res.status(404).json({ error: "Tweet not found" });
    }

    if (action === "add") {
      tweet.upvotes += 1;
    } else if (action === "remove") {
      tweet.upvotes = Math.max(tweet.upvotes - 1, 0);
    } else {
      console.error("Invalid action:", action);
      res.status(400).json({ error: "Invalid action" });
    }

    await tweet.save();

    console.log("Tweet updated successfully:", tweet.upvotes);
    res.json({ success: true, upvotes: tweet.upvotes });
  } catch (error) {
    console.error("Error updating tweet:", error);
    res.status(500).json({ error: "Server error" });
  }
});



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