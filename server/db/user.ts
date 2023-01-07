import {User} from '../models'

export const getUserByEmail = async (email: string): Promise<any> => {
    const user = await User.findOne({email})
        .select('-password')
        .select('-email')
    return user;
};

export const getUsersByRole = async (role: string): Promise<any> => {
    const user = await User.find({role})
        .select('-password')
        .select('-email')
    return user;
};


export const userUpdatePassword = async ({_id, password}: {_id: string, password: string}): Promise<any> => {
    const user = await User.findOneAndUpdate({_id}, {password})
    return user
};

export const changeGroupStudent = async (_id: string, group: string): Promise<any> => {
    const user = await User.findOneAndUpdate({_id}, {group})
    return user
};

export const deleteStudent = async (_id: string): Promise<any> => {
    const user = await User.deleteOne({_id})
    return user
}

export const getUserForAuth = async (email: string): Promise<any> => {
    const user = await User.findOne({email})
    return user;
}

export const getUserById = async (id: any): Promise<any> => {
    const user = await User.findOne({_id: id})
        .select('-password')
        .select('-email')
    return user;
};

export const createUser = async ({
                                     username,
                                     email,
                                     password
                                 }: { username: string, email: string, password: string }): Promise<any> => {
    const user = await User.create({
        username, email, password
    })
    return user;
};

