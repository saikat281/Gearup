import app from "./app";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const PORT  = process.env.PORT || 5000;

async function main(){
    try {
        // await prisma.$connect();
        console.log("Connected to the database successfully")
        app.listen(PORT,()=>{
            console.log(`Server is Running on port ${PORT}`);
        }) 
    } catch (error) {
        console.log("Error Starting the Server", error);
        // await prisma.$disconnect();
        process.exit(1);
    }
}
main();