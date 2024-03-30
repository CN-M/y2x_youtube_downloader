"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const mainRoute_1 = __importDefault(require("./routes/mainRoute"));
const { PORT } = process.env;
const port = PORT || 8000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/", mainRoute_1.default);
// Catch 404 errors and forward to error handler
app.use(errorMiddleware_1.catch404);
// Error Handler
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
});
