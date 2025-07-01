const form = document.getElementById("form");
const marcaCelular = document.getElementById("marcaCelular");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const radioNovo = document.getElementById("novo");
const radioUsado = document.getElementById("usado");
const demaisInformacoes = document.getElementById("demaisInformacoes");
const btnSalvar = document.getElementById("btnSalvar");

// Array de campos que precisam ser verificados para habilitar o botão
const camposObrigatorios = [marcaCelular, modelo, cor, valor];

// Variável para armazenar o índice do celular que está sendo editado
let indiceEdicao = -1; // -1 significa que não estamos em modo de edição

// --- Funções de Ajuda ---

// Função para verificar se todos os campos obrigatórios estão preenchidos
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

// Função para coletar e salvar/atualizar os dados no localStorage
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
    // Modo de Edição: Atualiza o registro existente
    celularesSalvos[indiceEdicao] = dadosCelular;
    alert("Celular atualizado com sucesso!");
  } else {
    // Modo de Cadastro: Adiciona um novo registro
    celularesSalvos.push(dadosCelular);
    alert("Celular cadastrado com sucesso!");
  }

  localStorage.setItem("celularesCadastrados", JSON.stringify(celularesSalvos));
  console.log("Dados salvos/atualizados:", dadosCelular);
}

// Função para limpar os campos do formulário
function limparCampos() {
  marcaCelular.value = "Sansung"; // Define um valor padrão para o select
  modelo.value = "";
  cor.value = "";
  valor.value = "";
  radioNovo.checked = false;
  radioUsado.checked = false;
  demaisInformacoes.value = "";
  indiceEdicao = -1; // Reseta o índice de edição
  verificarCampos();
}

// Função para preencher o formulário com dados de um celular existente
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

    // Armazena o índice do item que está sendo editado
    indiceEdicao = index;
    verificarCampos(); // Habilita o botão Salvar com os dados preenchidos
  }
}

// --- Event Listeners ---

// Adiciona listeners para os eventos que disparam a verificação
modelo.addEventListener("input", verificarCampos);
cor.addEventListener("input", verificarCampos);
valor.addEventListener("input", verificarCampos);
marcaCelular.addEventListener("change", verificarCampos);
radioNovo.addEventListener("change", verificarCampos);
radioUsado.addEventListener("change", verificarCampos);

// Listener para o botão Salvar (agora também para atualizar)
btnSalvar.addEventListener("click", (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário
  salvarOuAtualizarDados();
  limparCampos();
});

// Ao carregar a página:
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um parâmetro 'editIndex' na URL
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get("editIndex");

  if (editIndex !== null) {
    // Se 'editIndex' existe, estamos em modo de edição
    preencherFormularioParaEdicao(parseInt(editIndex));
  } else {
    // Caso contrário, estamos em modo de cadastro normal
    verificarCampos(); // Desabilita o botão inicialmente se os campos estiverem vazios
  }
});
