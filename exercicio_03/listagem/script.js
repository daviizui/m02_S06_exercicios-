const tabela = document.getElementById("tabela");
const btnExcluirDados = document.getElementById("excluirDado");

let celularesDados = JSON.parse(localStorage.getItem("dados")) || [];

function criarCelular(dado, index) {
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
  const btnExcluir = document.createElement("button");
  btnExcluir.innerHTML = `<button id="excluirDado">Excluir</button>`;

  btnExcluir.addEventListener("click", () => {
    tr.remove();
    celularesDados.splice(index, 1);
    localStorage.setItem("dados", JSON.stringify(celularesDados));
  });

  localStorage.removeItem(
    "celularesCadastrados",
    JSON.stringify(celularesDados)
  );

  tr.appendChild(tdMarca);
  tr.appendChild(tdModelo);
  tr.appendChild(tdCor);
  tr.appendChild(tdPreco);
  tr.appendChild(tdEstado);
  tr.appendChild(tdInfos);
  tr.appendChild(btnExcluir);
  return tr;
}

celularesDados.forEach((dado, index) => {
  const linhaDado = criarCelular(dado, index);

  tabela.appendChild(linhaDado);
});
