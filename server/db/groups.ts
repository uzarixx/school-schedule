import {Groups} from "../models";


export const createGroup = async ({name, group}: { name: string, group: string }): Promise<any> => {
    const groups = await Groups.create({name, group})
    return groups;
};

export const getAllGroups = async({}): Promise<any> => {
    const groups = await Groups.find({})
    return groups
};