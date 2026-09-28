import { COURSES, DIFFICULTY, PERIODS, LETTERS } from '../constants.js';
import { findQuestion, saveQuestion } from '../store.js';
import { escapeHtml, optionsHtml, showToast } from '../utils.js';

const EMPTY_QUESTION = {
  course: COURSES[0], area: '', period: 1, difficulty: 2,
  statement: '', alternatives: ['', '', '', '', ''], answer: 0,
};

/** Lê e valida o formulário. Retorna { data } ou { error }. */
function readForm(el) {
  const data = {
    course: el.querySelector('#course').value,
    area: el.querySelector('#area').value.trim(),
    period: Number(el.querySelector('#period').value),
    difficulty: Number(el.querySelector('#difficulty').value),
    statement: el.querySelector('#statement').value.trim(),
    alternatives: [...el.querySelectorAll('.alt-text')].map((i) => i.value.trim()),
    answer: Number(el.querySelector('[name="answer"]:checked').value),
  };
  const incomplete = !data.area || !data.statement || data.alternatives.some((a) => !a);
  return incomplete ? { error: 'Preencha a área, o enunciado e as cinco alternativas.' } : { data };
}

export function renderEditor(el, { navigate, id }) {
  const editing = id ? findQuestion(id) : null;
  const q = editing ?? EMPTY_QUESTION;
  const difficultyOptions = Object.entries(DIFFICULTY)
    .map(([value, label]) => `<option value="${value}" ${q.difficulty === Number(value) ? 'selected' : ''}>${label}</option>`).join('');
  const periodOptions = PERIODS
    .map((n) => `<option value="${n}" ${q.period === n ? 'selected' : ''}>${n}º período</option>`).join('');
  const alternatives = q.alternatives.map((text, i) => `
    <div class="alternative">
      <input type="radio" name="answer" value="${i}" ${q.answer === i ? 'checked' : ''} aria-label="Alternativa ${LETTERS[i]} é a correta">
      <b>${LETTERS[i]}</b>
      <input type="text" class="alt-text" value="${escapeHtml(text)}" aria-label="Texto da alternativa ${LETTERS[i]}">
    </div>`).join('');

  el.innerHTML = `
    <h2>${editing ? 'Editar questão' : 'Nova questão'}</h2>
    <p class="subtitle">Cadastre a questão manualmente: enunciado, cinco alternativas e gabarito.</p>
    <div class="card">
      <div class="form-grid">
        <div><label for="course">Curso</label><select id="course">${optionsHtml(COURSES, q.course)}</select></div>
        <div><label for="area">Área / disciplina</label><input id="area" value="${escapeHtml(q.area)}" placeholder="Ex.: Fisiologia"></div>
        <div><label for="period">Período</label><select id="period">${periodOptions}</select></div>
        <div><label for="difficulty">Dificuldade</label><select id="difficulty">${difficultyOptions}</select></div>
      </div>
      <label for="statement">Enunciado</label>
      <textarea id="statement">${escapeHtml(q.statement)}</textarea>
      <p style="margin:14px 0 6px;font-size:13px;font-weight:600">Alternativas <span style="font-weight:400;color:var(--muted)">(marque a correta)</span></p>
      ${alternatives}
      <p class="form-error" id="form-error" role="alert"></p>
      <div class="row">
        <button class="btn" id="save">Salvar questão</button>
        <button class="btn btn--secondary" data-nav="bank">Cancelar</button>
      </div>
    </div>`;

  el.onclick = (e) => {
    if (e.target.id !== 'save') return;
    const { data, error } = readForm(el);
    if (error) {
      el.querySelector('#form-error').textContent = error;
      return;
    }
    saveQuestion(data, editing?.id);
    showToast('Questão salva');
    navigate('bank');
  };
}
