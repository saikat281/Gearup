import { prisma } from "../../lib/prisma"
import { ICategory } from "./admin.interface"

const createCategoryIntoDb = async(payload : ICategory)=>{
    const category  = await prisma.category.create({
        data : {
            ...payload
        }
    })

    return category;
}


export const adminService = {
    createCategoryIntoDb
}