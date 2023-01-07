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
exports.getUserByForgotToken = exports.createForgotToken = void 0;
const models_1 = require("../models");
const createForgotToken = ({ userId, token, expiresAt }) => __awaiter(void 0, void 0, void 0, function* () {
    const forgotToken = yield models_1.ForgotTokens.create({ userId, token, expiresAt });
    return forgotToken;
});
exports.createForgotToken = createForgotToken;
const getUserByForgotToken = ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.ForgotTokens.findOne({ token });
    return user;
});
exports.getUserByForgotToken = getUserByForgotToken;
