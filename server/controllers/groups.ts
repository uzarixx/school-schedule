import {Request, Response} from "express";
import {createGroup, getAllGroups} from "../db/groups";


const GroupsController = {
    groupCreate: async (req: Request, res: Response): Promise<any> => {
        try {
            const {name, group} = req.body
            const groupCreate = await createGroup({name, group});
            res.json(groupCreate)
        } catch (e) {
            console.log(e)
        }
    },
    groupGet: async (req: Request, res: Response): Promise<any> => {
        try {
            const groups = await getAllGroups({})
            res.json(groups)
        } catch (e) {
            console.log(e)
        }
    }
}

export default GroupsController;