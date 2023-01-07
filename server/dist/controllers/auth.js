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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../db/user");
const generateJwt_1 = require("../service/generateJwt");
const AuthController = {
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const existingUser = yield (0, user_1.getUserByEmail)(email);
            if (existingUser) {
                return res.status(400).json({ message: `Користувач з почтою ${email} вже є` });
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 7);
            const user = yield (0, user_1.createUser)({ username, email, password: hashPassword });
            const token = (0, generateJwt_1.generateJWt)(user._id, user.username, user.email, user.role, user.group);
            res.json({ token });
        }
        catch (e) {
            console.log(e);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const existingUser = yield (0, user_1.getUserForAuth)(email);
            if (!existingUser) {
                return res.status(400).json({ message: `Користувач з почтою ${email} не найдено` });
            }
            const comparePassword = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!comparePassword) {
                return res.status(400).json({ message: "Пароль не вірний" });
            }
            const token = (0, generateJwt_1.generateJWt)(existingUser._id, existingUser.username, existingUser.email, existingUser.role, existingUser.group);
            res.json({ token });
        }
        catch (e) {
            console.log(e);
        }
    }),
    authUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.json(req.user);
        }
        catch (e) {
            console.log(e);
        }
    })
};
exports.default = AuthController;
