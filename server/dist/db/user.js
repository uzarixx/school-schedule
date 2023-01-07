"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.getUserForAuth = exports.deleteStudent = exports.changeGroupStudent = exports.userUpdatePassword = exports.getUsersByRole = exports.getUserByEmail = void 0;
const models_1 = require("../models");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email })
        .select('-password')
        .select('-email');
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getUsersByRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.find({ role })
        .select('-password')
        .select('-email');
    return user;
});
exports.getUsersByRole = getUsersByRole;
const userUpdatePassword = ({ _id, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOneAndUpdate({ _id }, { password });
    return user;
});
exports.userUpdatePassword = userUpdatePassword;
const changeGroupStudent = (_id, group) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOneAndUpdate({ _id }, { group });
    return user;
});
exports.changeGroupStudent = changeGroupStudent;
const deleteStudent = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.deleteOne({ _id });
    return user;
});
exports.deleteStudent = deleteStudent;
const getUserForAuth = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email });
    return user;
});
exports.getUserForAuth = getUserForAuth;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ _id: id })
        .select('-password')
        .select('-email');
    return user;
});
exports.getUserById = getUserById;
const createUser = ({ username, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create({
        username, email, password
    });
    return user;
});
exports.createUser = createUser;
