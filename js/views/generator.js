import { COURSES } from '../constants.js';
import { questionsByCourse, createExam } from '../store.js';
import { escapeHtml, optionsHtml, shuffle, showToast } from '../utils.js';
import { questionTags } from '../components.js';

const form = { course: COURSES[0], count: 5, selected: new Set() };

export function renderGenerator(el, { navigate }) {
  const pool = questionsByCourse(form.course);
  form.selected = new Set([...form.selected].filter((id) => pool.some((q) => q.id === id)));

  const items = pool.length
    ? pool.map((q) => `
        <label class="question-item inline-check" style="font-weight:400;cursor:pointer">
          <input type="checkbox" data-question="${q.id}" ${form.selected.has(q.id) ? 'checked' : ''}>
          <span>${questionTags(q)}<p>${escapeHtml(q.statement)}</p></span>
        </label>`).join('')
    : '<div class="empty">Este curso ainda não tem questões. Cadastre algumas para gerar a prova.</div>';

  el.innerHTML = `
    <h2>Gerar prova</h2>
    <p class="subtitle">Sorteie as questões automaticamente ou escolha uma a uma.</p>
    <div class="card">
      <div class="form-grid">
        <div><label for="course">Curso</label><select id="course">${optionsHtml(COURSES, form.course)}</select></div>
        <div><label for="count">Nº de questões (sorteio)</label><input id="count" type="number" min="1" max="${pool.length || 1}" value="${form.count}"></div>
        <div style="align-self:end"><button class="btn btn--secondary" id="draw">Sortear questões</button></div>
      </div>
      <div class="selection-summary" id="summary"></div>
      ${items}
      <div class="row">
        <input id="title" style="flex:1;min-width:200px" aria-label="Título da prova" value="Teste de Progresso ${new Date().getFullYear()} · ${form.course}">
        <button class="btn" id="create">Gerar prova</button>
      </div>
    </div>`;

  const updateSummary = () => {
    el.querySelector('#summary').innerHTML = `<b>${form.selected.size}</b> de ${pool.length} questões selecionadas`;
  };
  updateSummary();

  el.onchange = (e) => {
    if (e.target.id === 'course') {
      form.course = e.target.value;
      form.selected.clear();
      renderGenerator(el, { navigate });
    } else if (e.target.id === 'count') {
      form.count = Number(e.target.value);
    } else if (e.target.dataset.question) {
      const id = Number(e.target.dataset.question);
      form.selected[e.target.checked ? 'add' : 'delete'](id);
      updateSummary();
    }
  };

  el.onclick = (e) => {
    if (e.target.id === 'draw') {
      const total = Math.min(Number(el.querySelector('#count').value) || 1, pool.length);
      form.selected = new Set(shuffle(pool).slice(0, total).map((q) => q.id));
      renderGenerator(el, { navigate });
    } else if (e.target.id === 'create') {
      if (!form.selected.size) return showToast('Selecione ao menos uma questão');
      const exam = createExam({
        title: el.querySelector('#title').value.trim() || 'Prova sem título',
        course: form.course,
        questionIds: shuffle([...form.selected]),
      });
      showToast('Prova gerada');
      navigate('exam', { id: exam.id });
    }
  };
}
