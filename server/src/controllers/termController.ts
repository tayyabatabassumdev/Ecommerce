import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Term } from "../models/Term";

export const getAllTerms = asyncHandler(async (req: Request, res: Response) => {
  const terms = await Term.find().sort({ updatedAt: -1 });
  res.status(200).json({ success: true, data: terms });
});

export const getTermByType = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const term = await Term.findOne({ type });
  if (!term)
    return res.status(404).json({ success: false, message: "Policy not found" });

  res.status(200).json({ success: true, data: term });
});

export const createTerm = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, type } = req.body;

  if (!title || !content)
    return res.status(400).json({ success: false, message: "Title and content are required" });

  const newTerm = new Term({ title, content, type });
  await newTerm.save();

  res.status(201).json({ success: true, message: "Policy created", data: newTerm });
});
export const updateTerm = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, type } = req.body;

  const updated = await Term.findByIdAndUpdate(
    id,
    { title, content, type, lastUpdated: Date.now() },
    { new: true, runValidators: true }
  );

  if (!updated)
    return res.status(404).json({ success: false, message: "Policy not found" });

  res.status(200).json({ success: true, message: "Policy updated", data: updated });
});

export const deleteTerm = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Term.findByIdAndDelete(id);

  if (!deleted)
    return res.status(404).json({ success: false, message: "Policy not found" });

  res.status(200).json({ success: true, message: "Policy deleted successfully" });
});
