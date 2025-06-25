const form = document.getElementById("form");
const btnSalvarsalvar = document.getElementById("btnSalvar");
const marcaCelular = document.getElementById("marcaCelular");
const modelo = document.getElementById("modelo");
const cor = document.getElementById("cor");
const valor = document.getElementById("valor");
const radioNovo = document.getElementById("novo");
const radioUsado = document.getElementById("usado");
const demaisInformacoes = document.getElementById("demaisInformacoes");

const camposObrigatorios = [marcaCelular, modelo, cor, valor];

let celularesDados = JSON.parse(localStorage.getItem("dados")) || [];

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  salvar();
  limparCampos();
  window.alert("Dados salvos com sucesso");
});

function salvar() {
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

  celularesDados.push(dadosCelular);
  console.log(celularesDados);

  localStorage.setItem("dados", JSON.stringify(celularesDados));
}

function limparCampos() {
  marcaCelular.value = "";
  modelo.value = "";
  cor.value = "";
  valor.value = "";
  radioNovo.checked = false;
  radioUsado.checked = false;
  demaisInformacoes.value = "";
}
