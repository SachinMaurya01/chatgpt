import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',async (req,res)=>{
    res.status(200).send({
        message:'Hello form Chatgpt',
    })
})

app.post('/',async(req,res)=>{
    try{
        const prompt=req.body.prompt;

        const response= await OpenAIApi.createCompletion({
            model:"text-davinci-003",
            prompt: `${prompt}`,
            temperature:0,
            max_takens:3000,
            top_p:1,
            frequenecy_penalty:0.5,
            presence_penalty:0,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    }catch(error){
        console.log(error);
        res.status(500).send({error})
    }
})

app.listen(5000, ()=> console.log('server is http://localhost:5000'));