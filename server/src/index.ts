import express,{ Express, Request, Response, Application } from "express";

import { PrismaClient } from "@prisma/client";
import gqlServer from "./api/graphql";

const prisma = new PrismaClient();


const app:Application = express();
const PORT = process.env.PORT || 8020;


app.get("/",(req:Request, res:Response):void => {
    res.send("Hello")
});






async function startApolloServer() {

  
    await gqlServer.start();
  
    gqlServer.applyMiddleware({ app });
  
    // const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}${gqlServer.graphqlPath}`);
    });
  }
  
  startApolloServer().catch(err => {
    console.error('Error starting Apollo Server:', err);
  });



// async function main() {
//     const user = await prisma.user.create({
//         data:{
//             name:'Nirmal Savinda',
//             username:'nsavinda'
//         }
//     })
//     const post = await prisma.post.create({
//         data:{
//             title:'ABC',
//             user: {
//                 connect:{
//                     id:"64eeedcb8e691a3a006896d6"
//                 }
//             }

//         }
//     })
//     console.log(user)
//     console.log(post)
    
// }

// main()