import mongoose from "mongoose"


const tweetSchema = new mongoose.Schema({
  id: {
    type:String,
    required:true,
    unique:true,
  },
  content: String,
  upvotes: Number,
  url:String,
  category:String,
  timestamp: {
    type: String, // or Date, ideally
    required: true,
  },
  author: String, // optional
}, { timestamps: true })

const Tweet=mongoose.model("Tweet",tweetSchema)
export default Tweet
