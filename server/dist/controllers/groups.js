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
const groups_1 = require("../db/groups");
const GroupsController = {
    groupCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, group } = req.body;
            const groupCreate = yield (0, groups_1.createGroup)({ name, group });
            res.json(groupCreate);
        }
        catch (e) {
            console.log(e);
        }
    }),
    groupGet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const groups = yield (0, groups_1.getAllGroups)({});
            res.json(groups);
        }
        catch (e) {
            console.log(e);
        }
    })
};
exports.default = GroupsController;
