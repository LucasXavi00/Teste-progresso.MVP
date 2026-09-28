import { COURSES, DIFFICULTY } from '../constants.js';
import { state, deleteQuestion } from '../store.js';
import { escapeHtml, optionsHtml, showToast } from '../utils.js';
import { questionTags } from '../components.js';

const filters = { text: '', course: '', area: '', difficulty: '' };
const FILTER_FIELDS = { 'f-course': 'course', 'f-area': 'area', 'f-difficulty': 'difficulty' };

const applyFilters = () => state.questions.filter((q) =>
  (!filters.course || q.course === filters.course) &&
  (!filters.area || q.area === filters.area) &&
  (!filters.difficulty || q.difficulty === Number(filters.difficulty)) &&
  q.statement.toLowerCase().includes(filters.text.toLowerCase()));

function listHtml() {
  const questions = applyFilters();
  if (!questions.length) {
    return '<div class="empty">Nenhuma questão encontrada. Ajuste os filtros ou cadastre uma nova questão.</div>';
  }
  return questions.map((q) => `
    <div class="question-item">
      <div>${questionTags(q)}<p>${escapeHtml(q.statement)}</p></div>
      <div class="row tight">
        <button class="btn btn--secondary btn--small" data-nav="editor" data-id="${q.id}">Editar</button>
        <button class="btn btn--danger btn--small" data-delete="${q.id}">Excluir</button>
      </div>
    </div>`).join('');
}

export function renderBank(el) {
  const areas = [...new Set(state.questions.filter((q) => !filters.course || q.course === filters.course).map((q) => q.area))];
  const levels = Object.entries(DIFFICULTY)
    .map(([value, label]) => `<option value="${value}" ${filters.difficulty === value ? 'selected' : ''}>${label}</option>`).join('');

  el.innerHTML = `
    <h2>Banco de questões</h2>
    <p class="subtitle">Consulte, filtre e edite as questões cadastradas.</p>
    <div class="card">
      <div class="row">
        <input id="f-text" style="flex:2;min-width:180px" placeholder="Buscar no enunciado" aria-label="Buscar" value="${escapeHtml(filters.text)}">
        <select id="f-course" style="flex:1;min-width:140px" aria-label="Curso"><option value="">Todos os cursos</option>${optionsHtml(COURSES, filters.course)}</select>
        <select id="f-area" style="flex:1;min-width:140px" aria-label="Área"><option value="">Todas as áreas</option>${optionsHtml(areas, filters.area)}</select>
        <select id="f-difficulty" style="flex:1;min-width:120px" aria-label="Dificuldade"><option value="">Qualquer nível</option>${levels}</select>
        <button class="btn" data-nav="editor">Nova questão</button>
      </div>
      <div id="question-list">${listHtml()}</div>
    </div>`;

  const refreshList = () => { el.querySelector('#question-list').innerHTML = listHtml(); };

  // Atualiza só a lista ao digitar, para não perder o foco do campo de busca.
  el.oninput = (e) => {
    if (e.target.id !== 'f-text') return;
    filters.text = e.target.value;
    refreshList();
  };
  el.onchange = (e) => {
    const field = FILTER_FIELDS[e.target.id];
    if (!field) return;
    filters[field] = e.target.value;
    if (field === 'course') filters.area = ''; // as áreas dependem do curso
    renderBank(el);
  };
  el.onclick = (e) => {
    const id = Number(e.target.dataset.delete);
    if (!id || !confirm('Excluir esta questão?')) return;
    deleteQuestion(id);
    showToast('Questão excluída');
    refreshList();
  };
}
