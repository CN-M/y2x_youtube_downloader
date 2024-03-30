import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { content, email } = req.body;

  const post = await prisma.post.create({
    data: {
      content,
      author: { connect: { email } },
    },
  });

  res.status(200).json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id, content, published } = req.body;

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      published,
      content,
    },
  });

  res.status(200).json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(deletedPost);
};
