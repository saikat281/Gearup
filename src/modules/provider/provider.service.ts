import { prisma } from "../../lib/prisma"
import { GearItem } from "./provider.interface"




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


export const providerService = {
    addGearIntoDb
}