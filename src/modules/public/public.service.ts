import { prisma } from "../../lib/prisma"

const getGearFromDB = async () => {

    const gearItems = await prisma.gearItem.findMany(
        {
            include: {
                provider: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        }
    );

    return gearItems;
}

const getGearByIdFromDB = async (postId: string) => {
    const gear = await prisma.gearItem.findUniqueOrThrow({
        where: {
            id: postId
        },
        include :{
            provider : {
                select : {
                    name: true,
                    email :true
                }
            }
        }
    })

    return gear;
}


const getAllCategoriesFromDB = async()=>{

    const categories = await prisma.category.findMany();

    return categories;
}

export const publicService = {
    getGearFromDB,getGearByIdFromDB,getAllCategoriesFromDB
}