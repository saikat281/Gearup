import { prisma } from "../../lib/prisma"
import { GearItem, IUpdateGearItem } from "./provider.interface"




const addGearIntoDb = async (payload: GearItem, userId: string) => {

    const category = await prisma.category.findUniqueOrThrow({
        where: {
            id: payload.categoryId
        }
    });

    const user = await prisma.gearItem.create({
        data: {
            ...payload,
            providerId: userId
        }
    })

    return user;

}

const updateGear = async (gearId: string, providerId: string, payload: IUpdateGearItem) => {

    const gearItem = await prisma.gearItem.findUniqueOrThrow({
        where : { id : gearId}
    })

    if(gearItem.providerId !== providerId){
        throw new Error("You are not Owner of this gearItem")
    }

    const updateGearItem = await prisma.gearItem.update({
        where : {
            id : gearId
        },
        data : payload,
        include : {
            provider :{
                omit : {
                    passwordHash : true
                }
            }
        }
    })

    return updateGearItem;

}


export const providerService = {
    addGearIntoDb, updateGear
}