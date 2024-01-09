import { Express } from "express";

import cookieParser from "cookie-parser";

import cors from "cors"

const app = Express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true   //Access-Control-Allow-Credentials header to true ,
                         // then the real request will include credentials: otherwise, the browser reports a network error.
}))

  //  This line sets up middleware to parse incoming requests with JSON payloads, limiting the size of the payload to 20 kilobytes. 
  app.use(Express.json({limit:"20kb"}))

  //This middleware parses incoming requests with URL-encoded payloads, allowing extended syntax (such as arrays or rich objects), and also limits the payload size to 20 kilobytes.
app.use(Express.urlencoded({extends:true,limit:"20kb"}))

// This line serves static files from the public directory. For example, if you have an image named image.jpg in the public directory, it can be accessed via the URL: 
app.use(Express.static("public"))

//This middleware parses cookies attached to the client's request and populates req.cookies with an object keyed by the cookie names.
app.use(cookieParser())
export{ app }