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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../db/user");
function authUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Ви не авторізовані" });
            }
            const secret = process.env.SECRET_KEY;
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (!decoded)
                return res.status(401).json({ message: "Ви не авторізовані" });
            const user = yield (0, user_1.getUserById)(decoded.id);
            if (!user)
                return res.status(401).json({ message: "Ви не авторізовані" });
            req.user = user;
            next();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.default = authUser;
