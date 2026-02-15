const app = document.getElementById("app");

function navigate(page) {
  window.location.hash = page;
}
function router() {
  const page = window.location.hash.replace("#", "") || "dashboard";
  console.log("Navegando para a página:", page);

  const menu = document.querySelectorAll("aside button");

  menu.forEach((btn) => {
    const isActive = btn.dataset.page === page;
    btn.classList.toggle("active", isActive);
  });

  const routes = {
    dashboard: dashboardPage,
    registrar: registrarPage,
    contas: contasPage,
    relatorios: relatoriosPage,
    configuracoes: configuracoesPage
  };

  app.innerHTML = routes[page]
    ? routes[page]()
    : "<h2>Página não encontrada</h2>";

  if (page === 'dashboard') {
    initDashboardPage();
  }
  if (page === "registrar") {
    initRegistrarPage();
  }
}
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function dashboardPage() {
  return `
    <div class="main-top-container">
        <div class="card">
            <p>Saldo Total</p>
            <span id="SaldoTotal">N/Da</span>
        </div>
        <div class="card">
            <p>Entrada</p>
            <span id="ReceitaMes">N/Da</span>
        </div>
        <div class="card">
            <p>Despesas Fixas</p>
            <span id="DespesasMes">N/Da</span>
        </div>
        <div class="card">
            <p>Resultado</p> <!--Lucro ou prejuizo -->
            <span id="Resultado">N/Da</span>
        </div>
      </div>

      <div class="main-container">
        <canvas id="graficoDashboard" height="117px"></canvas>
      </div>
  `;
}

function registrarPage() {
  return `
    <h1>Registrar Transação</h1>
        <div class="container">    
            <div class="registrar-container">
                <div class="topoRegistrar">
                    <p id="TituloPage">Gastos Fixos</p>
                    <span id="totalGastos">R$ 0,00</span>
                </div>
        
                <ul id="gastosFixosList">
        
                </ul>
        
                <button id="abrirModalGastos" onclick="Modal()">
                    <i class="fas fa-plus-circle"></i>
                    <p>Adicionar</p>
                </button>
            </div>
        
            <div class="modal">
                <div class="modal-content">
                    <div class="topo">
                        <h3>Adicionar Gasto Fixo</h3>
                        <span class="close-button" onclick="Modal()">&times;</span>
                    </div>
                    <form id="gastoFixoForm">
                        <label for="nomeGasto">Nome do Gasto:</label>
                        <input type="text" id="nomeGasto" name="nomeGasto" required>
        
                        <label for="valorGasto">Valor:</label>
                        <input type="number" id="valorGasto" name="valorGasto" step="0.01" min="0.01" required>
        
                        <label for="dataGasto">Data de Vencimento:</label>
                        <input type="date" id="dataGasto" name="dataGasto" required>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
        
            <div class="registrar-container">
                <div class="topoRegistrar">
                    <p id="TituloPage">Entradas</p>
                    <span id="totalEntradas">R$ 0,00</span>
                </div>
        
                <ul id="entradasList">
                    
                </ul>
        
                <button id="abrirModalEntrada" onclick="abrirModalEntrada()">
                    <i class="fas fa-plus-circle"></i>
                    <p>Adicionar Entrada</p>
                </button>
            </div>
        
            <div class="modal" id="modalEntrada">
                <div class="modal-content">
                    <div class="topo">
                        <span class="close-button" onclick="abrirModalEntrada()">&times;</span>
                        <h3>Adicionar Entrada</h3>
                    </div>
        
                    <form id="entradaForm">
                        <label>Descrição:</label>
                        <input type="text" id="nomeEntrada" required>
        
                        <label>Valor:</label>
                        <input type="number" id="valorEntrada" step="0.01" required>
        
                        <label>Data:</label>
                        <input type="date" id="dataEntrada" required>
        
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
  `;
}

function contasPage() {
  return `
    <h1>Contas</h1>

    <ul>
      <li>💰 Carteira - R$ 300</li>
      <li>🏦 Banco - R$ 1.800</li>
      <li>💳 Crédito - R$ 250</li>
    </ul>

    <button>Adicionar Conta</button>
  `;
}

function relatoriosPage() {
  return `
    <h1>Relatórios</h1>

    <p>Resumo financeiro mensal</p>

    <div class="relatorio">
      <p>Janeiro: R$ +1.200</p>
      <p>Fevereiro: R$ +850</p>
    </div>
  `;
}

function configuracoesPage() {
  return `
    <h1>Configurações</h1>

    <label>
      <input type="checkbox">
      Modo escuro
    </label>

    <br><br>

    <button>Salvar preferências</button>
  `;
}
