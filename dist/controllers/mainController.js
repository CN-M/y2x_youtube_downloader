"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.PUT = exports.POST = exports.GET = void 0;
const GET = (req, res) => {
    const { name } = req.query;
    if (name) {
        res.status(200).json({ message: `Hello, ${name}!` });
    }
    else {
        res.status(200).json({ message: "Hello world" });
    }
};
exports.GET = GET;
const POST = (req, res) => {
    const { name, occupation, age } = req.body;
    res.status(200).json({
        message: `Hey there, ${name}. What's it like being a ${occupation} at the age of ${age}?`,
    });
};
exports.POST = POST;
const PUT = (req, res) => {
    res.status(200).json({ message: "Item Updated Successfully" });
};
exports.PUT = PUT;
const DELETE = (req, res) => {
    res.status(200).json({ message: "Item Deleted Succesfully" });
};
exports.DELETE = DELETE;
