// src/models/snippet.model.ts
import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export interface ISnippet {
  id?: number;
  content: string;
  language: string;
  theme: string;
  shareId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Snippet = {
  async create(snippetData: Omit<ISnippet, 'id' | 'shareId' | 'createdAt' | 'updatedAt'>): Promise<ISnippet> {
    const shareId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO snippets (content, language, theme, shareId)
      VALUES (?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      snippetData.content,
      snippetData.language,
      snippetData.theme,
      shareId
    );

    return {
      id: info.lastInsertRowid as number,
      shareId,
      ...snippetData
    };
  },

  async findById(id: number): Promise<ISnippet | null> {
    const stmt = db.prepare('SELECT * FROM snippets WHERE id = ?');
    return stmt.get(id) as ISnippet || null;
  },

  async findByShareId(shareId: string): Promise<ISnippet | null> {
    const stmt = db.prepare('SELECT * FROM snippets WHERE shareId = ?');
    return stmt.get(shareId) as ISnippet || null;
  }
};