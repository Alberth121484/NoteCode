// src/controllers/snippet.controller.ts
import { Request, Response } from 'express';
import { Snippet } from '../models/snippet.model';

export const createSnippet = async (req: Request, res: Response) => {
  try {
    const { content, language = 'html', theme = 'vs-dark' } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const snippet = await Snippet.create({
      content,
      language,
      theme
    });

    res.status(201).json({
      id: snippet.id,
      shareId: snippet.shareId,
      content: snippet.content,
      language: snippet.language,
      theme: snippet.theme,
      createdAt: snippet.createdAt
    });
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(500).json({ error: 'Failed to create snippet' });
  }
};

export const getSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const snippet = await Snippet.findByShareId(id);
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    res.json({
      id: snippet.id,
      content: snippet.content,
      language: snippet.language,
      theme: snippet.theme,
      shareId: snippet.shareId,
      createdAt: snippet.createdAt,
    });
  } catch (error) {
    console.error('Error fetching snippet:', error);
    res.status(500).json({ error: 'Failed to fetch snippet' });
  }
};