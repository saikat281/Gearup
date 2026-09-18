import { prisma } from "../../lib/prisma"
import { iProvider } from "./provider.interface"



const addGearIntoDb = async(payload : iProvider,userId : string)=>{

    const user = await prisma.category.create({
        data:{
            ...payload,
            
        }
    })

}


export const providerService = {
    addGearIntoDb
}