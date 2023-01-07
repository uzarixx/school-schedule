"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = exports.LessonController = exports.AuthController = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var lesson_1 = require("./lesson");
Object.defineProperty(exports, "LessonController", { enumerable: true, get: function () { return __importDefault(lesson_1).default; } });
var users_1 = require("./users");
Object.defineProperty(exports, "UsersController", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
