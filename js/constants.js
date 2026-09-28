export const COURSES = ['Medicina', 'Enfermagem', 'Fisioterapia', 'Odontologia', 'Psicologia', 'Farmácia'];
export const DIFFICULTY = { 1: 'Fácil', 2: 'Média', 3: 'Difícil' };
export const PERIODS = Array.from({ length: 12 }, (_, i) => i + 1);
export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/** Questões fictícias para demonstração. `answer` é o índice da alternativa correta. */
export const SEED_QUESTIONS = [
  { course: 'Medicina', area: 'Anatomia', period: 1, difficulty: 1, statement: 'Qual estrutura óssea protege o encéfalo?', alternatives: ['Crânio', 'Esterno', 'Coluna lombar', 'Pelve', 'Fêmur'], answer: 0 },
  { course: 'Medicina', area: 'Fisiologia', period: 2, difficulty: 2, statement: 'Qual hormônio é o principal regulador da glicemia após as refeições?', alternatives: ['Glucagon', 'Insulina', 'Cortisol', 'Adrenalina', 'Tiroxina'], answer: 1 },
  { course: 'Medicina', area: 'Farmacologia', period: 3, difficulty: 3, statement: 'Qual mecanismo é típico dos inibidores da ECA?', alternatives: ['Bloqueio de canais de cálcio', 'Bloqueio beta-adrenérgico', 'Redução da conversão de angiotensina I em II', 'Aumento da diurese osmótica', 'Ativação de receptores alfa-2'], answer: 2 },
  { course: 'Enfermagem', area: 'Fundamentos', period: 1, difficulty: 1, statement: 'Qual é a principal medida para prevenir infecção relacionada à assistência?', alternatives: ['Higiene das mãos', 'Uso de luvas o tempo todo', 'Isolamento universal', 'Antibióticos profiláticos', 'Reduzir visitas'], answer: 0 },
  { course: 'Enfermagem', area: 'Saúde Coletiva', period: 2, difficulty: 2, statement: 'O SUS tem como princípio doutrinário a:', alternatives: ['Seletividade', 'Universalidade', 'Privatização', 'Contribuição prévia', 'Centralização exclusiva'], answer: 1 },
  { course: 'Fisioterapia', area: 'Cinesiologia', period: 2, difficulty: 2, statement: 'O movimento de afastar o membro do plano sagital é chamado de:', alternatives: ['Adução', 'Flexão', 'Abdução', 'Rotação', 'Extensão'], answer: 2 },
  { course: 'Odontologia', area: 'Anatomia dental', period: 1, difficulty: 1, statement: 'Quantos dentes permanentes tem um adulto sem ausências?', alternatives: ['20', '28', '30', '32', '36'], answer: 3 },
  { course: 'Psicologia', area: 'Psicologia do desenvolvimento', period: 2, difficulty: 2, statement: 'Quem propôs a teoria dos estágios do desenvolvimento cognitivo?', alternatives: ['Skinner', 'Piaget', 'Freud', 'Rogers', 'Pavlov'], answer: 1 },
].map((q, i) => ({ ...q, id: i + 1 }));
