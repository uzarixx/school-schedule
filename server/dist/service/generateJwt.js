"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWt = (id, username, email, role, group) => {
    return jsonwebtoken_1.default.sign({ id, username, email, role, group }, process.env.SECRET_KEY, { expiresIn: '30d' });
};
exports.generateJWt = generateJWt;
