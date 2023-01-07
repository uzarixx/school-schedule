import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authServices from "../../services/authServices";
import lessonsServices from "../../services/lessonsServices";
import groupsServices from "../../services/groupsServices";
import studentService from "../../services/studentServices";

export const fetchAuthUser = createAsyncThunk(
    'counter/authUser',
    async function () {
        try {
            const {data} = await authServices.getUserData()
            return data;
        } catch (e) {
            localStorage.removeItem('authToken')
        }
    }
);
export const fetchLessons = createAsyncThunk(
    'counter/lessons',
    async function (group: string) {
        try {
            const {data} = await lessonsServices.getLessons(group)
            return data
        } catch (e) {
            console.log(e)
        }
    }
)
export const fetchTeacher = createAsyncThunk(
    'counter/lessons',
    async function () {
        try {
            const {data} = await lessonsServices.getLessonsTeacher()
            return data;
        } catch (e) {
            console.log(e)
        }
    }
)

export const fetchGroups = createAsyncThunk(
    'counter/groups',
    async function () {
        try {
            const {data} = await groupsServices.getGroups()
            return data;
        } catch (e) {
            console.log(e)
        }
    }
)

export const fetchStudents = createAsyncThunk(
    'counter/students',
    async function () {
        try {
            const {data} = await studentService.getAllStudents()
            return data;
        } catch (e) {
            console.log(e)
        }
    }
)


export interface CounterState {
    openAuth: boolean;
    openLogin: boolean;
    openDeleteLesson: boolean;
    openCreateLesson: boolean;
    openDeleteUser: boolean;
    openForgot: boolean;
    openLogout: boolean;
    status: boolean;
    lessonsStatus: boolean;
    studentsStatus: boolean;
    lessonId: null | string;
    userId: null | string;
    authUser: [];
    lessons: [];
    groups: [];
    students: [];
}

const initialState: CounterState = {
    openAuth: false,
    openLogin: false,
    openLogout: false,
    openDeleteLesson: false,
    openForgot: false,
    openCreateLesson: false,
    lessonId: null,
    openDeleteUser: false,
    userId: null,
    status: false,
    lessonsStatus: false,
    studentsStatus: false,
    authUser: [],
    lessons: [],
    groups: [],
    students: [],
}


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setOpenAuth: (state, action) => {
            state.openAuth = action.payload
        },
        setOpenLogin: (state, action) => {
            state.openLogin = action.payload
        },
        setOpenDeleteLesson: (state, action) => {
            state.openDeleteLesson = action.payload
        },
        setOpenCreateLesson: (state, action) => {
            state.openCreateLesson = action.payload
        },
        setLessonId: (state, action) => {
            state.lessonId = action.payload
        },
        setOpenDeleteUser: (state, action) => {
            state.openDeleteUser = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setOpenLogout: (state, action) => {
            state.openLogout = action.payload
        },
        setClearLessons: (state, action) => {
            state.lessons = []
        },
        setClearAuthUser: (state, action) => {
            state.authUser = []
        },
        setOpenForgot: (state, action) => {
            state.openForgot = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthUser.pending, (state: any) => {
            state.status = true;
        });
        builder.addCase(fetchAuthUser.fulfilled, (state: any, action: any) => {
            state.status = false;
            state.authUser = action.payload;
        });
        builder.addCase(fetchLessons.pending, (state: any) => {
            state.lessonsStatus = true
        });
        builder.addCase(fetchLessons.fulfilled, (state: any, action: any) => {
            state.lessonsStatus = false
            state.lessons = action.payload
        });
        builder.addCase(fetchGroups.fulfilled, (state: any, action: any) => {
            state.groups = action.payload
        });
        builder.addCase(fetchStudents.pending, (state: any) => {
            state.studentsStatus = true
        });
        builder.addCase(fetchStudents.fulfilled, (state: any, action: any) => {
            state.studentsStatus = false
            state.students = action.payload
        });
    }
})

export const {
    setOpenAuth,
    setOpenLogin,
    setOpenLogout,
    setOpenDeleteLesson,
    setOpenCreateLesson,
    setLessonId,
    setOpenDeleteUser,
    setUserId,
    setClearLessons,
    setClearAuthUser,
    setOpenForgot
} = counterSlice.actions
export const selectAuth = (state: any) => state.counter.openAuth
export const selectLogin = (state: any) => state.counter.openLogin
export const selectDeleteLesson = (state: any) => state.counter.openDeleteLesson
export const selectCreateLesson = (state: any) => state.counter.openCreateLesson
export const selectLessonId = (state: any) => state.counter.lessonId
export const selectLogout = (state: any) => state.counter.openLogout
export const selectAuthUserData = (state: any) => state.counter.authUser
export const selectAuthUserStatus = (state: any) => state.counter.status
export const selectLessonsStatus = (state: any) => state.counter.lessonsStatus
export const selectStudentsStatus = (state: any) => state.counter.studentsStatus
export const selectLessons = (state: any) => state.counter.lessons;
export const selectGroups = (state: any) => state.counter.groups;
export const selectStudents = (state: any) => state.counter.students;
export const selectDeleteUser = (state: any) => state.counter.openDeleteUser;
export const selectUserId = (state: any) => state.counter.userId;
export const selectOpenForgot = (state: any) => state.counter.openForgot;
export default counterSlice.reducer