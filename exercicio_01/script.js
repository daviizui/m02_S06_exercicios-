const btn = document.getElementById("btn");
const input = document.getElementsByTagName("input")[0];
const div = document.getElementById("div");
const btnExcluir = document.getElementsByClassName("btnExcluir");
const localStorageKey = "minhaListaDeTarefas";

const ul = document.createElement("ul");

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem(localStorageKey);
  return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
}

btn.addEventListener("click", () => {
  ul.innerHTML += `
  <li>${input.value}</li>
  <button class="btnExcluir">Excluir</button>
 `;
  localStorage.setItem(localStorageKey, JSON.stringify(input.value));
});

div.append(ul);
