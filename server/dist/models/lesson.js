"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LessonSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    authorId: {
        type: String
    },
    date: {
        type: String,
    },
    group: {
        type: String
    },
    groupName: {
        type: String
    },
    info: {
        type: String
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Lesson', LessonSchema);
