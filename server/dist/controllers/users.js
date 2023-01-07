"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../db/user");
const uuid = __importStar(require("uuid"));
const forgotTokens_1 = require("../db/forgotTokens");
const email_1 = require("../service/email");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJwt_1 = require("../service/generateJwt");
const UsersController = {
    getAllStudents: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const students = yield (0, user_1.getUsersByRole)('Student');
            res.json(students);
        }
        catch (e) {
            console.log(e);
        }
    }),
    changeGroupStudent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, group } = req.body;
            const student = yield (0, user_1.changeGroupStudent)(_id, group);
            res.json({ student });
        }
        catch (e) {
            console.log(e);
        }
    }),
    deleteStudent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = req.body;
            const student = yield (0, user_1.deleteStudent)(_id);
            res.json('Студент видален');
        }
        catch (e) {
            console.log(e);
        }
    }),
    createForgotToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const candidate = yield (0, user_1.getUserByEmail)(email);
            if (!candidate) {
                res.status(404).json({ message: 'Користувач не знайден.' });
            }
            const forgotLink = uuid.v4();
            const forgotToken = yield (0, forgotTokens_1.createForgotToken)({
                userId: candidate._id,
                token: forgotLink,
                expiresAt: String(Date.now() + 1000 * 60 * 5)
            });
            yield (0, email_1.sendEmail)({ to: email, link: `http://localhost:3000/forgot?key=${forgotLink}` });
            res.json('Повідомлення надіслано на вашу пошту');
        }
        catch (e) {
            console.log(e);
        }
    }),
    changeForgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token, password } = req.body;
            const user = yield (0, forgotTokens_1.getUserByForgotToken)({ token });
            if (!user) {
                return res.status(400).json({ message: "Помилка даних" });
            }
            let jwtToken;
            if (user.expiresAt > Date.now()) {
                const hashPassword = yield bcrypt_1.default.hash(password, 7);
                const userUpdate = yield (0, user_1.userUpdatePassword)({ _id: user.userId, password: hashPassword });
                jwtToken = (0, generateJwt_1.generateJWt)(userUpdate._id, userUpdate.username, userUpdate.email, userUpdate.role, userUpdate.group);
                res.json(jwtToken);
            }
            else {
                return res.status(400).json({ message: "Помилка даних" });
            }
            res.json('Виконанно');
        }
        catch (e) {
            console.log(e);
        }
    }),
};
exports.default = UsersController;
