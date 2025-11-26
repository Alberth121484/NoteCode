// src/routes/snippet.routes.ts
import { Router } from 'express';
import * as snippetController from '../controllers/snippet.controller';

const router = Router();

// Create a new snippet
router.post('/', snippetController.createSnippet);

// Get a snippet by ID
router.get('/:id', snippetController.getSnippet);

export const snippetRoutes = router;