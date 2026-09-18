import { prisma } from "../../lib/prisma"

const getGearFromDB = async()=>{

    const gearItems = await prisma.gearItem.findMany(
        {
            include : {
                provider : {
                    select : {
                        name : true,
                        email : true
                    }
                }
            }
        }
    );

    return gearItems;
}

export const gearService =  {
    getGearFromDB
}