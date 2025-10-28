import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Page } from "../models/Page";

export const getPageBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const page = await Page.findOne({ slug });
  if (!page) {
    return res.status(404).json({ success: false, message: "Page not found" });
  }

  res.status(200).json({ success: true, data: page });
});

export const upsertPage = asyncHandler(async (req: Request, res: Response) => {
  const { title, slug, content } = req.body;

  let page = await Page.findOne({ slug });
  if (page) {
    page.title = title;
    page.content = content;
    await page.save();
    return res.status(200).json({ success: true, message: "Page updated", data: page });
  }

  page = new Page({ title, slug, content });
  await page.save();

  res.status(201).json({ success: true, message: "Page created", data: page });
});
