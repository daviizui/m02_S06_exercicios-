const form = document.getElementById("form");
const marcaCelular = document.getElementById("marcaCelular");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const radioNovo = document.getElementById("novo");
const radioUsado = document.getElementById("usado");
const demaisInformacoes = document.getElementById("demaisInformacoes");
const btnSalvar = document.getElementById("btnSalvar");

// Arrays de campos que precisam ser verificados para habilitar o botão
const camposObrigatorios = [marcaCelular, modelo, cor, valor];

// Função para verificar se todos os campos obrigatórios estão preenchidos
function verificarCampos() {
  let todosPreenchidos = true;

  // 1. Verificar inputs de texto, number e select
  camposObrigatorios.forEach((campo) => {
    // Para selects, verifica se o value é vazio
    if (campo.tagName === "SELECT") {
      if (campo.value === "") {
        todosPreenchidos = false;
      }
    } else {
      // Para inputs (text, number)
      if (campo.value.trim() === "") {
        todosPreenchidos = false;
      }
    }
  });

  // 2. Verificar se um dos radios (Novo/Usado) foi selecionado
  const radioSelecionado = radioNovo.checked || radioUsado.checked;
  if (!radioSelecionado) {
    todosPreenchidos = false;
  }

  // A textarea não é obrigatória para habilitar o botão neste exemplo.
  // Se fosse, você adicionaria uma verificação similar aqui.

  btnSalvar.disabled = !todosPreenchidos;
}

// Função para coletar e salvar os dados no localStorage
function salvarDados() {
  const dadosCelular = {
    marca: marcaCelular.value,
    modelo: modelo.value.trim(),
    cor: cor.value.trim(),
    valor: parseFloat(valor.value), // Converte para número
    condicao: radioNovo.checked
      ? radioNovo.value
      : radioUsado.checked
      ? radioUsado.value
      : "", // Pega o valor do radio selecionado
    demaisInformacoes: demaisInformacoes.value.trim(),
  };

  // Pega os dados existentes no localStorage (se houver)
  let celularesSalvos =
    JSON.parse(localStorage.getItem("celularesCadastrados")) || [];

  // Adiciona o novo celular à lista
  celularesSalvos.push(dadosCelular);

  // Salva a lista atualizada de volta no localStorage
  localStorage.setItem("celularesCadastrados", JSON.stringify(celularesSalvos));

  console.log("Dados salvos:", dadosCelular);
  alert("Celular cadastrado com sucesso!");
}

// Função para limpar os campos do formulário
function limparCampos() {
  marcaCelular.value = ""; // Reseta o select
  modelo.value = "";
  cor.value = "";
  valor.value = "";
  radioNovo.checked = false; // Desmarca os radios
  radioUsado.checked = false;
  demaisInformacoes.value = "";
  verificarCampos(); // Desabilita o botão novamente
}

// Adiciona listeners para os eventos que disparam a verificação
// 'input' para inputs de texto e número
modelo.addEventListener("input", verificarCampos);
cor.addEventListener("input", verificarCampos);
valor.addEventListener("input", verificarCampos);

// 'change' para selects e radios (dispara quando o valor selecionado muda)
marcaCelular.addEventListener("change", verificarCampos);
radioNovo.addEventListener("change", verificarCampos);
radioUsado.addEventListener("change", verificarCampos);
// Não precisamos de listener para textarea se ela não for obrigatória para o botão

// Listener para o botão Salvar
btnSalvar.addEventListener("click", () => {
  salvarDados();
  limparCampos();
});

// Chama a verificação inicial ao carregar a página
verificarCampos();
