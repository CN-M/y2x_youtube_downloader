"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mainController_1 = require("../controllers/mainController");
router.route("/").get(mainController_1.GET).post(mainController_1.POST).put(mainController_1.PUT).delete(mainController_1.DELETE);
exports.default = router;
