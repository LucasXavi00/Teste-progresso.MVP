import { DIFFICULTY } from './constants.js';
import { escapeHtml } from './utils.js';

/** Etiquetas de classificação de uma questão. */
export const questionTags = (q) => `
  <span class="tag">${escapeHtml(q.course)}</span>
  <span class="tag">${escapeHtml(q.area)}</span>
  <span class="tag">${q.period}º período</span>
  <span class="tag tag--${q.difficulty}">${DIFFICULTY[q.difficulty]}</span>`;
