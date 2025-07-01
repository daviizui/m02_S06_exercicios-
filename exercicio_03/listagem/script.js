const tabela = document.getElementById("tabela");

// Vamos usar "celularesCadastrados" como a chave principal no localStorage
// para consistência com o arquivo de cadastro
let celularesDados =
  JSON.parse(localStorage.getItem("celularesCadastrados")) || [];

// Função para renderizar a tabela
function renderizarTabela() {
  tabela.innerHTML = ""; // Limpa a tabela antes de renderizar
  celularesDados.forEach((dado, index) => {
    const linhaDado = criarLinhaCelular(dado, index);
    tabela.appendChild(linhaDado);
  });
}

function criarLinhaCelular(dado, index) {
  const tr = document.createElement("tr");
  tr.classList.add("linhaTabela");
  tr.dataset.index = index; // Armazena o índice na linha para fácil acesso

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

  const tdAcoes = document.createElement("td"); // Nova célula para os botões de ação

  // Botão Excluir
  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.classList.add("btnExcluir"); // Adicione uma classe para estilizar se quiser
  btnExcluir.addEventListener("click", () => {
    excluirCelular(index);
  });

  // Botão Alterar
  const btnAlterar = document.createElement("button");
  btnAlterar.textContent = "Alterar";
  btnAlterar.classList.add("btnAlterar"); // Adicione uma classe para estilizar se quiser
  btnAlterar.addEventListener("click", () => {
    // Redireciona para a página de cadastro com o índice na URL
    window.location.href = `/exercicio_03/cadastro/index.html?editIndex=${index}`;
  });

  tdAcoes.appendChild(btnAlterar); // Adiciona o botão Alterar
  tdAcoes.appendChild(btnExcluir); // Adiciona o botão Excluir

  tr.appendChild(tdMarca);
  tr.appendChild(tdModelo);
  tr.appendChild(tdCor);
  tr.appendChild(tdPreco);
  tr.appendChild(tdEstado);
  tr.appendChild(tdInfos);
  tr.appendChild(tdAcoes); // Adiciona a célula com os botões de ação
  return tr;
}

function excluirCelular(index) {
  celularesDados.splice(index, 1); // Remove 1 item do array a partir do índice
  localStorage.setItem("celularesCadastrados", JSON.stringify(celularesDados));
  renderizarTabela(); // Renderiza a tabela novamente após a exclusão
}

// Renderiza a tabela quando a página carrega
document.addEventListener("DOMContentLoaded", renderizarTabela);
