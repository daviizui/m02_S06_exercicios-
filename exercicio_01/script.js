const btn = document.getElementById("btn");
const input = document.getElementsByTagName("input")[0];
const ul = document.getElementById("ul");
const btnExcluir = document.getElementsByClassName("btnExcluir");
const localStorageKey = "minhaListaDeTarefas";

let tarefas = JSON.parse(localStorage.getItem(localStorageKey)) || [];

btn.addEventListener("click", () => {
  criaTarefa(input.value);
  input.value = "";
  salvaTarefas();
});

function criaTarefa(descricao) {
  const li = document.createElement("li");
  li.classList = "li";

  const p = document.createElement("p");
  p.textContent = descricao;
  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";

  li.appendChild(p);
  li.appendChild(btnExcluir);
  ul.appendChild(li);

  const tarefaExiste = tarefas.some((tarefa) => tarefa.descricao === descricao);
  if (!tarefaExiste) {
    tarefas.push({ descricao });
  }
}

function salvaTarefas() {
  localStorage.setItem(localStorageKey, JSON.stringify(tarefas));
}

tarefas.forEach((tarefa) => {
  criaTarefa(tarefa.descricao);
});
