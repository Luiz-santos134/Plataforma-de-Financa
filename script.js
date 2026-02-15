// ================= DASHBOARD =================

let graficoDashboard = null;

function initDashboardPage() {
  const entradasEl = document.getElementById("EntradasMes");
  const despesasEl = document.getElementById("DespesasMes");
  const resultadoEl = document.getElementById("ResultadoMes");

  const totalEntradas = calcularTotalEntradas();
  const totalGastos = calcularTotalGastos();
  const resultado = totalEntradas - totalGastos;

  if (entradasEl)
    entradasEl.textContent = `R$ ${totalEntradas.toFixed(2)}`;

  if (despesasEl)
    despesasEl.textContent = `R$ ${totalGastos.toFixed(2)}`;

  if (resultadoEl)
    resultadoEl.textContent = `R$ ${resultado.toFixed(2)}`;

  initGraficoDashboard();
}

function initGraficoDashboard() {
  const ctx = document.getElementById("graficoDashboard");
  if (!ctx) return;

  if (graficoDashboard) {
    graficoDashboard.destroy();
  }

  graficoDashboard = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
      datasets: [
        {
          label: "Entradas",
          data: calcularEntradasPorMes(),
          borderColor: "lightgreen",
          tension: 0.4
        },
        {
          label: "Saídas",
          data: calcularGastosPorMes(),
          borderColor: "rgb(238,103,103)",
          tension: 0.4
        }
      ]
    }
  });
}

function calcularEntradasPorMes() {
  const meses = Array(12).fill(0);
  getEntradas().forEach(e => {
    meses[new Date(e.data).getMonth()] += e.valor;
  });
  return meses;
}

function calcularGastosPorMes() {
  const meses = Array(12).fill(0);
  getGastos().forEach(g => {
    meses[new Date(g.data).getMonth()] += g.valor;
  });
  return meses;
}

// ================= REGISTRAR =================

function initRegistrarPage() {
  const modalGasto = document.querySelector(".modal");
  const modalEntrada = document.getElementById("modalEntrada");
  const formGasto = document.getElementById("gastoFixoForm");

  function Modal() {
    if (modalGasto)
      modalGasto.style.display =
        modalGasto.style.display === "flex" ? "none" : "flex";
  }

  function abrirModalEntrada() {
    if (modalEntrada)
      modalEntrada.style.display =
        modalEntrada.style.display === "flex" ? "none" : "flex";
  }

  window.Modal = Modal;
  window.abrirModalEntrada = abrirModalEntrada;

  if (formGasto) {
    formGasto.addEventListener("submit", e => {
      e.preventDefault();
      adicionarGasto();
    });
  }

  renderizarGastos();
  renderizarEntradas();
}

// ================= GASTOS =================

function adicionarGasto() {
  const nome = document.getElementById("nomeGasto")?.value;
  const valor = parseFloat(document.getElementById("valorGasto")?.value);
  const data = document.getElementById("dataGasto")?.value;

  if (!nome || !data || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const gastos = getGastos();
  gastos.push({ id: Date.now(), nome, valor, data });

  salvarGastos(gastos);
  renderizarGastos();

  document.querySelector(".modal").style.display = "none";
  document.getElementById("gastoFixoForm").reset();
}

function deletarGasto(id) {
  salvarGastos(getGastos().filter(g => g.id !== id));
  renderizarGastos();
}

function renderizarGastos() {
  const ul = document.getElementById("gastosFixosList");
  if (!ul) return;

  ul.innerHTML = "";

  getGastos().forEach(g => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="infosGasto">
        <span>${g.nome}</span>
        <input type="number" value="${g.valor.toFixed(2)}" readonly />
        <button onclick="deletarGasto(${g.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <small class="dataGasto">${formatarData(g.data)}</small>
    `;

    ul.appendChild(li);
  });

  const totalEl = document.getElementById("totalGastos");
  if (totalEl)
    totalEl.textContent = `R$ ${calcularTotalGastos().toFixed(2)}`;
}

function getGastos() {
  return JSON.parse(localStorage.getItem("gastosFixos")) || [];
}

function salvarGastos(gastos) {
  localStorage.setItem("gastosFixos", JSON.stringify(gastos));
}

// ================= ENTRADAS =================

function adicionarEntrada() {
  const nome = document.getElementById("nomeEntrada")?.value;
  const valor = parseFloat(document.getElementById("valorEntrada")?.value);
  const data = document.getElementById("dataEntrada")?.value;

  if (!nome || !data || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const entradas = getEntradas();
  entradas.push({ id: Date.now(), nome, valor, data });

  salvarEntradas(entradas);
  renderizarEntradas();

  document.getElementById("modalEntrada").style.display = "none";
  document.getElementById("entradaForm").reset();
}

function deletarEntrada(id) {
  salvarEntradas(getEntradas().filter(e => e.id !== id));
  renderizarEntradas();
}

function renderizarEntradas() {
  const ul = document.getElementById("entradasList");
  if (!ul) return;

  ul.innerHTML = "";

  getEntradas().forEach(e => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="infosGasto">
        <span>${e.nome}</span>
        <input type="number" value="${e.valor.toFixed(2)}" readonly />
        <button onclick="deletarEntrada(${e.id})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <small class="dataGasto">${formatarData(e.data)}</small>
    `;

    ul.appendChild(li);
  });

  atualizarTotalEntradas();
}

function getEntradas() {
  return JSON.parse(localStorage.getItem("entradas")) || [];
}

function salvarEntradas(entradas) {
  localStorage.setItem("entradas", JSON.stringify(entradas));
}

// ================= UTIL =================

function calcularTotalGastos() {
  return getGastos().reduce((t, g) => t + g.valor, 0);
}

function calcularTotalEntradas() {
  return getEntradas().reduce((t, e) => t + e.valor, 0);
}

function atualizarTotalEntradas() {
  const el = document.getElementById("totalEntradas");
  if (el)
    el.textContent = `R$ ${calcularTotalEntradas().toFixed(2)}`;
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR");
}

// let ulGastos = document.getElementById("gastosFixosList")

// if(ul.textContent = ""){
//   document.getElementById("textoSemConteudo").style.display="none";
// }else{
//   alert("Tem conteudo")
// }