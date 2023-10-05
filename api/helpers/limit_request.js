import { rateLimit } from "express-rate-limit";

export const limitLogin = () =>{
  return rateLimit({
      windowMs: 1* 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
      message: (req,res) =>{
          res.status(429).send({
              status: 429,
              message: "You have reached the maximum number of LOGIN attempts"
          })
      }
  })
}

export const limitPeticiones = ()=>{
  return rateLimit({
      windowMs: 30 * 1000,
      max: 200,
      standardHeaders: true, 
      legacyHeaders: false, 
      message: (req,res)=>{
          res.status(429).send({
              message: "You have reached the Maximum number of requests."
          });
      }
  })    
}