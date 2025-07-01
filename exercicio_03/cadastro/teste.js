const form = document.getElementById("form");
const marcaCelular = document.getElementById("marcaCelular");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const radioNovo = document.getElementById("novo");
const radioUsado = document.getElementById("usado");
const demaisInformacoes = document.getElementById("demaisInformacoes");
const btnSalvar = document.getElementById("btnSalvar");
const body = document.body; // Referência ao body para aplicar a classe

// Array de campos que precisam ser verificados para habilitar o botão
const camposObrigatorios = [marcaCelular, modelo, cor, valor];

// Variável para armazenar o índice do celular que está sendo editado
let indiceEdicao = -1; // -1 significa que não estamos em modo de edição

// --- Funções para Tema (replicadas do script.js para aplicar o tema) ---
function aplicarTema(theme) {
  if (theme === "dark") {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
  }
  // Não precisamos salvar o tema aqui, pois ele é salvo pela página de listagem
}

// --- Funções de Ajuda (mantidas do seu código anterior) ---
function verificarCampos() {
  let todosPreenchidos = true;

  camposObrigatorios.forEach((campo) => {
    if (campo.tagName === "SELECT") {
      if (campo.value === "") {
        todosPreenchidos = false;
      }
    } else {
      if (campo.value.trim() === "") {
        todosPreenchidos = false;
      }
    }
  });

  const radioSelecionado = radioNovo.checked || radioUsado.checked;
  if (!radioSelecionado) {
    todosPreenchidos = false;
  }

  btnSalvar.disabled = !todosPreenchidos;
}

function salvarOuAtualizarDados() {
  const dadosCelular = {
    marca: marcaCelular.value,
    modelo: modelo.value.trim(),
    cor: cor.value.trim(),
    valor: parseFloat(valor.value),
    condicao: radioNovo.checked
      ? radioNovo.value
      : radioUsado.checked
      ? radioUsado.value
      : "",
    demaisInformacoes: demaisInformacoes.value.trim(),
  };

  let celularesSalvos =
    JSON.parse(localStorage.getItem("celularesCadastrados")) || [];

  if (indiceEdicao !== -1) {
    celularesSalvos[indiceEdicao] = dadosCelular;
    alert("Celular atualizado com sucesso!");
  } else {
    celularesSalvos.push(dadosCelular);
    alert("Celular cadastrado com sucesso!");
  }

  localStorage.setItem("celularesCadastrados", JSON.stringify(celularesSalvos));
  console.log("Dados salvos/atualizados:", dadosCelular);
}

function limparCampos() {
  marcaCelular.value = "Sansung";
  modelo.value = "";
  cor.value = "";
  valor.value = "";
  radioNovo.checked = false;
  radioUsado.checked = false;
  demaisInformacoes.value = "";
  indiceEdicao = -1;
  verificarCampos();
}

function preencherFormularioParaEdicao(index) {
  let celularesSalvos =
    JSON.parse(localStorage.getItem("celularesCadastrados")) || [];

  if (index >= 0 && index < celularesSalvos.length) {
    const celularParaEditar = celularesSalvos[index];

    marcaCelular.value = celularParaEditar.marca;
    modelo.value = celularParaEditar.modelo;
    cor.value = celularParaEditar.cor;
    valor.value = celularParaEditar.valor;
    demaisInformacoes.value = celularParaEditar.demaisInformacoes;

    if (celularParaEditar.condicao === "novo") {
      radioNovo.checked = true;
    } else if (celularParaEditar.condicao === "usado") {
      radioUsado.checked = true;
    }

    indiceEdicao = index;
    verificarCampos();
  }
}

// --- Event Listeners e Inicialização ---

modelo.addEventListener("input", verificarCampos);
cor.addEventListener("input", verificarCampos);
valor.addEventListener("input", verificarCampos);
marcaCelular.addEventListener("change", verificarCampos);
radioNovo.addEventListener("change", verificarCampos);
radioUsado.addEventListener("change", verificarCampos);

btnSalvar.addEventListener("click", (event) => {
  event.preventDefault();
  salvarOuAtualizarDados();
  limparCampos();
  // Opcional: redirecionar de volta para a listagem após salvar/atualizar
  // window.location.href = "/exercicio_03/listagem/index.html";
});

// Ao carregar a página:
document.addEventListener("DOMContentLoaded", () => {
  // 1. Carrega o tema salvo no localStorage e aplica
  const savedTheme = localStorage.getItem("theme") || "light"; // Pega o tema salvo
  aplicarTema(savedTheme); // Aplica o tema na página de cadastro

  // 2. Verifica se há um parâmetro 'editIndex' na URL
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get("editIndex");

  if (editIndex !== null) {
    preencherFormularioParaEdicao(parseInt(editIndex));
  } else {
    verificarCampos();
  }
});
