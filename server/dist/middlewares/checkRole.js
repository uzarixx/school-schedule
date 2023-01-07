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
exports.checkIfStudent = exports.checkIfTeacher = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkIfTeacher(req, res, next) {
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
            if (decoded.role !== 'Teacher') {
                return res.status(403).json('Ви не викладач');
            }
            req.user = decoded;
            next();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.checkIfTeacher = checkIfTeacher;
;
function checkIfStudent(req, res, next) {
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
            if (decoded.role !== 'Student') {
                return res.status(403).json('Ви не студент');
            }
            req.user = decoded;
            next();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.checkIfStudent = checkIfStudent;
