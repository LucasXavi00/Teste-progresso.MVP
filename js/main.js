import { loadState } from './store.js';
import { renderDashboard } from './views/dashboard.js';
import { renderBank } from './views/bank.js';
import { renderEditor } from './views/editor.js';
import { renderGenerator } from './views/generator.js';
import { renderExams, renderExam } from './views/exams.js';

const routes = {
  dashboard: renderDashboard,
  bank: renderBank,
  editor: renderEditor,
  generator: renderGenerator,
  exams: renderExams,
  exam: renderExam,
};
const NAV_HIGHLIGHT = { exam: 'exams' }; // rotas sem item próprio no menu

const main = document.getElementById('main');

function navigate(route, params = {}) {
  // Cada tela registra seus próprios handlers; limpa os da tela anterior.
  main.onclick = main.onchange = main.oninput = null;
  routes[route](main, { navigate, ...params });

  const active = NAV_HIGHLIGHT[route] ?? route;
  document.querySelectorAll('.sidebar button').forEach((b) => b.classList.toggle('active', b.dataset.nav === active));
  main.focus();
  window.scrollTo(0, 0);
}

// Navegação global: qualquer elemento com data-nav (e opcional data-id).
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-nav]');
  if (target) navigate(target.dataset.nav, { id: Number(target.dataset.id) || null });
});

loadState();
navigate('dashboard');
