const btn = document.getElementById("btn");
const input = document.getElementsByTagName("input")[0];
const ul = document.getElementById("ul");
const ulDone = document.getElementById("ul-done");

let listaTarefasPendentes = [];
let listaTarefasConcluidas = [];

document.addEventListener("DOMContentLoaded", () => {
  const tarefasPendentesSalvas = localStorage.getItem("tarefasPendentes");
  if (tarefasPendentesSalvas) {
    listaTarefasPendentes = JSON.parse(tarefasPendentesSalvas);
  }

  const tarefasConcluidasSalvas = localStorage.getItem("tarefasConcluidas");
  if (tarefasConcluidasSalvas) {
    listaTarefasConcluidas = JSON.parse(tarefasConcluidasSalvas);
  }

  criaTarefasNoDOM();
  input.onblur = validarPreenchimento;
});

btn.addEventListener("click", () => {
  const novaTarefa = {
    input: input.value,
    concluida: false,
  };
  listaTarefasPendentes.push(novaTarefa);
  salvarTarefas();
  criaTarefasNoDOM(); // Renderiza ambas as listas

  input.value = "";
  validarPreenchimento(); // Desabilita o botão após adicionar a tarefa
});

function criaTarefasNoDOM() {
  ul.innerHTML = "";
  ulDone.innerHTML = "";

  listaTarefasPendentes.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.classList.add("li");

    const p = document.createElement("p");
    p.textContent = tarefa.input;

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btnExcluir");
    btnExcluir.addEventListener("click", () => {
      excluirTarefa(index, "pendente");
    });

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = tarefa.concluida;
    inputCheckbox.classList.add("checkbox-tarefa");
    inputCheckbox.addEventListener("change", () => {
      moverTarefa(index, "pendente");
    });

    li.appendChild(p);
    li.appendChild(btnExcluir);
    li.appendChild(inputCheckbox);
    ul.appendChild(li);
  });

  listaTarefasConcluidas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.classList.add("li", "tarefa-concluida");

    const p = document.createElement("p");
    p.textContent = tarefa.input;

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btnExcluir");
    btnExcluir.addEventListener("click", () => {
      excluirTarefa(index, "concluida");
    });

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = tarefa.concluida;
    inputCheckbox.classList.add("checkbox-tarefa");
    inputCheckbox.addEventListener("change", () => {
      moverTarefa(index, "concluida");
    });

    li.appendChild(p);
    li.appendChild(btnExcluir);
    li.appendChild(inputCheckbox);
    ulDone.appendChild(li);
  });
}

function validarPreenchimento() {
  if (input.value.trim() !== "") {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function excluirTarefa(index, tipoLista) {
  if (tipoLista === "pendente") {
    listaTarefasPendentes.splice(index, 1);
  } else if (tipoLista === "concluida") {
    listaTarefasConcluidas.splice(index, 1);
  }
  salvarTarefas();
  criaTarefasNoDOM();
}

function moverTarefa(index, tipoListaOrigem) {
  let tarefaMovida;
  if (tipoListaOrigem === "pendente") {
    tarefaMovida = listaTarefasPendentes.splice(index, 1)[0];
    tarefaMovida.concluida = true;
    listaTarefasConcluidas.push(tarefaMovida);
  } else if (tipoListaOrigem === "concluida") {
    tarefaMovida = listaTarefasConcluidas.splice(index, 1)[0];
    tarefaMovida.concluida = false;
    listaTarefasPendentes.push(tarefaMovida);
  }
  salvarTarefas();
  criaTarefasNoDOM();
}

function salvarTarefas() {
  localStorage.setItem(
    "tarefasPendentes",
    JSON.stringify(listaTarefasPendentes)
  );
  localStorage.setItem(
    "tarefasConcluidas",
    JSON.stringify(listaTarefasConcluidas)
  );
}
