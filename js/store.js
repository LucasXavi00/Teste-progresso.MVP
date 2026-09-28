import { SEED_QUESTIONS } from './constants.js';

const STORAGE_KEY = 'tp-mvp';

/** Estado da aplicação (fonte única de verdade). */
export const state = { questions: SEED_QUESTIONS, exams: [], nextId: 100 };

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) Object.assign(state, saved);
  } catch { /* armazenamento indisponível: segue com os dados de exemplo */ }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignora falha de gravação */ }
}

export const findQuestion = (id) => state.questions.find((q) => q.id === id);
export const findExam = (id) => state.exams.find((e) => e.id === id);
export const questionsByCourse = (course) => state.questions.filter((q) => q.course === course);

export function saveQuestion(data, id = null) {
  if (id) Object.assign(findQuestion(id), data);
  else state.questions.push({ ...data, id: ++state.nextId });
  persist();
}

export function deleteQuestion(id) {
  state.questions = state.questions.filter((q) => q.id !== id);
  persist();
}

export function createExam({ title, course, questionIds }) {
  const exam = {
    id: ++state.nextId, title, course, questionIds,
    date: new Date().toLocaleDateString('pt-BR'),
  };
  state.exams.unshift(exam);
  persist();
  return exam;
}

export function deleteExam(id) {
  state.exams = state.exams.filter((e) => e.id !== id);
  persist();
}
