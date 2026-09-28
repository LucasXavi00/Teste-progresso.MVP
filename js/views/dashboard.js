import { COURSES } from '../constants.js';
import { state, questionsByCourse } from '../store.js';

const BAR_STEP = 12; // % de largura por questão (escala visual)

export function renderDashboard(el) {
  const coursesWithQuestions = new Set(state.questions.map((q) => q.course)).size;
  const bars = COURSES.map((course) => {
    const total = questionsByCourse(course).length;
    return `
      <div class="row">
        <span style="width:120px">${course}</span>
        <div style="flex:1;height:10px;border-radius:99px;background:var(--primary-soft)">
          <div style="width:${Math.min(100, total * BAR_STEP)}%;height:10px;border-radius:99px;background:var(--primary)"></div>
        </div>
        <strong>${total}</strong>
      </div>`;
  }).join('');

  el.innerHTML = `
    <h2>Painel</h2>
    <p class="subtitle">Visão geral do banco de questões e das provas.</p>
    <div class="stats">
      <div class="card stat"><strong>${state.questions.length}</strong><span>Questões cadastradas</span></div>
      <div class="card stat"><strong>${state.exams.length}</strong><span>Provas geradas</span></div>
      <div class="card stat"><strong>${coursesWithQuestions}</strong><span>Cursos com questões</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Questões por curso</h3>
      ${bars}
      <div class="row">
        <button class="btn" data-nav="editor">Nova questão</button>
        <button class="btn btn--secondary" data-nav="generator">Gerar prova</button>
      </div>
    </div>`;
}
