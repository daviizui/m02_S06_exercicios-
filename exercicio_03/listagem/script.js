const tabela = document.getElementById("tabela");
// Novo: Botão para alternar o tema
const themeToggleButton = document.getElementById("themeToggleButton");
const body = document.body; // Referência ao body para aplicar a classe

// Vamos usar "celularesCadastrados" como a chave principal no localStorage
// para consistência com o arquivo de cadastro
let celularesDados =
  JSON.parse(localStorage.getItem("celularesCadastrados")) || [];

// --- Funções para Tema ---
function aplicarTema(theme) {
  if (theme === "dark") {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    themeToggleButton.textContent = "Tema Claro";
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeToggleButton.textContent = "Tema Escuro";
  }
  localStorage.setItem("theme", theme); // Salva a preferência no localStorage
}

function alternarTema() {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    aplicarTema("light");
  } else {
    aplicarTema("dark");
  }
}

// --- Funções da Tabela (mantidas do seu código anterior) ---
function renderizarTabela() {
  tabela.innerHTML = "";
  celularesDados.forEach((dado, index) => {
    const linhaDado = criarLinhaCelular(dado, index);
    tabela.appendChild(linhaDado);
  });
}

function criarLinhaCelular(dado, index) {
  const tr = document.createElement("tr");
  tr.classList.add("linhaTabela");
  tr.dataset.index = index;

  const tdMarca = document.createElement("td");
  tdMarca.textContent = dado.marca;
  const tdModelo = document.createElement("td");
  tdModelo.textContent = dado.modelo;
  const tdCor = document.createElement("td");
  tdCor.textContent = dado.cor;
  const tdPreco = document.createElement("td");
  tdPreco.textContent = dado.valor;
  const tdEstado = document.createElement("td");
  tdEstado.textContent = dado.condicao;
  const tdInfos = document.createElement("td");
  tdInfos.textContent = dado.demaisInformacoes;

  const tdAcoes = document.createElement("td");

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.classList.add("btnExcluir");
  btnExcluir.addEventListener("click", () => {
    excluirCelular(index);
  });

  const btnAlterar = document.createElement("button");
  btnAlterar.textContent = "Alterar";
  btnAlterar.classList.add("btnAlterar");
  btnAlterar.addEventListener("click", () => {
    window.location.href = `/exercicio_03/cadastro/index.html?editIndex=${index}`;
  });

  tdAcoes.appendChild(btnAlterar);
  tdAcoes.appendChild(btnExcluir);

  tr.appendChild(tdMarca);
  tr.appendChild(tdModelo);
  tr.appendChild(tdCor);
  tr.appendChild(tdPreco);
  tr.appendChild(tdEstado);
  tr.appendChild(tdInfos);
  tr.appendChild(tdAcoes);
  return tr;
}

function excluirCelular(index) {
  celularesDados.splice(index, 1);
  localStorage.setItem("celularesCadastrados", JSON.stringify(celularesDados));
  renderizarTabela();
}

// --- Event Listeners e Inicialização ---

// Adiciona listener para o botão de tema
themeToggleButton.addEventListener("click", alternarTema);

// Ao carregar a página:
document.addEventListener("DOMContentLoaded", () => {
  // 1. Carrega o tema salvo no localStorage ou define como padrão 'light'
  const savedTheme = localStorage.getItem("theme") || "light";
  aplicarTema(savedTheme);

  // 2. Renderiza a tabela de celulares
  renderizarTabela();
});
