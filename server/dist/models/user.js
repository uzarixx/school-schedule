"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: 'Student'
    },
    group: {
        type: String,
        default: ''
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('User', UserSchema);
