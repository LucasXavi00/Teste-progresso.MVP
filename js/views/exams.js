import { state, findExam, findQuestion, deleteExam } from '../store.js';
import { escapeHtml } from '../utils.js';

export function renderExams(el) {
  const list = state.exams.length
    ? state.exams.map((e) => `
        <div class="question-item">
          <div><b>${escapeHtml(e.title)}</b><p>${e.course} · ${e.questionIds.length} questões · ${e.date}</p></div>
          <div class="row tight">
            <button class="btn btn--secondary btn--small" data-nav="exam" data-id="${e.id}">Abrir</button>
            <button class="btn btn--danger btn--small" data-delete-exam="${e.id}">Excluir</button>
          </div>
        </div>`).join('')
    : '<div class="empty">Nenhuma prova gerada ainda.</div>';

  el.innerHTML = `
    <h2>Provas geradas</h2>
    <p class="subtitle">Abra, imprima ou exclua provas anteriores.</p>
    <div class="card">${list}</div>`;

  el.onclick = (e) => {
    const id = Number(e.target.dataset.deleteExam);
    if (!id) return;
    deleteExam(id);
    renderExams(el);
  };
}

export function renderExam(el, { navigate, id }) {
  const exam = findExam(id);
  if (!exam) return navigate('exams');

  const questions = exam.questionIds.map(findQuestion).filter(Boolean).map((q, i) => `
    <div class="exam-question">
      <b>${i + 1}.</b> ${escapeHtml(q.statement)}
      <ol>${q.alternatives.map((alt, j) => `<li data-correct="${j === q.answer}">${escapeHtml(alt)}</li>`).join('')}</ol>
    </div>`).join('');

  el.innerHTML = `
    <div class="row no-print">
      <button class="btn btn--secondary" data-nav="exams">Voltar</button>
      <button class="btn" id="print">Imprimir</button>
      <label class="inline-check" style="margin:0"><input type="checkbox" id="answers"> Mostrar gabarito</label>
    </div>
    <div class="card exam" id="exam">
      <h3>${escapeHtml(exam.title)}</h3>
      <p class="subtitle">UNIFESO · ${exam.course} · ${exam.date}</p>
      ${questions}
    </div>`;

  el.onclick = (e) => { if (e.target.id === 'print') window.print(); };
  el.onchange = (e) => {
    if (e.target.id === 'answers') el.querySelector('#exam').classList.toggle('show-answers', e.target.checked);
  };
}
