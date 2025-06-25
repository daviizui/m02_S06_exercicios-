const btn = document.getElementById("btn");
const input = document.getElementsByTagName("input")[0];
const div = document.getElementById("div");
const localStorageKey = "minhaListaDeTarefas";
// Função para salvar a lista completa de tarefas no localStorage

function salvarTarefas(tarefas) {
  localStorage.setItem(localStorageKey, JSON.stringify(tarefas));
}

// Função para carregar a lista de tarefas do localStorage
function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem(localStorageKey);
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

// Função para criar um item da lista (li com botão de excluir)
function criarItemTarefa(tarefaTexto) {
  const li = document.createElement("li");
  li.textContent = tarefaTexto;

  li.appendChild(btnExcluir);
  ul.appendChild(li);
}

const btnExcluir = document.createElement("button");
btnExcluir.textContent = "Excluir";
btnExcluir.addEventListener("click", () => {
  // Remove da tela
  ul.removeChild(li);

  // Remove do localStorage
  let tarefasAtuais = carregarTarefas();
  tarefasAtuais = tarefasAtuais.filter((item) => item !== tarefaTexto); // Filtra removendo a tarefa clicada
  salvarTarefas(tarefasAtuais);
});
// --- Lógica Principal ---

// 1. Ao carregar a tela, verifica e exibe tarefas existentes no localStorage
document.addEventListener("DOMContentLoaded", () => {
  const tarefasIniciais = carregarTarefas();
  tarefasIniciais.forEach((tarefa) => criarItemTarefa(tarefa));
});

// 2. Evento de click para adicionar nova tarefa
btn.addEventListener("click", () => {
  const novaTarefa = input.value.trim(); // Pega o valor e remove espaços em branco

  if (novaTarefa) {
    // Verifica se o input não está vazio
    // Adiciona à tela
    criarItemTarefa(novaTarefa);

    // Adiciona ao localStorage
    const tarefasAtuais = carregarTarefas();
    tarefasAtuais.push(novaTarefa);
    salvarTarefas(tarefasAtuais);

    input.value = ""; // Limpa o input
  } else {
    alert("Por favor, digite uma tarefa!");
  }
});
