// Função para decodificar base64
function dec(s) {
  try {
    return decodeURIComponent(escape(atob(s)));
  } catch {
    return "";
  }
}

// Verifica se a página tem campos de login
function temCamposDeLogin() {
  return (
    document.querySelector("input[name='amember_login']") &&
    document.querySelector("input[name='amember_pass']")
  );
}

// Preenche o formulário de login e envia
function fazerLogin(user, pass) {
  const form = document.querySelector("form[name='login']");
  if (!form) return;

  const userInput = form.querySelector("input[name='amember_login']");
  const passInput = form.querySelector("input[name='amember_pass']");
  const submitBtn = form.querySelector("input[type='submit']");

  if (!userInput || !passInput || !submitBtn) return;

  userInput.value = "";
  passInput.value = "";

  userInput.value = user;
  passInput.value = pass;

  setTimeout(() => {
    submitBtn.click();
  }, 300);
}

// Substitui logo por "IA CREATORS HUB"
function substituirLogo() {
  const logoWrapper = document.querySelector(".am-header-logo-wrapper");
  if (logoWrapper) {
    logoWrapper.innerHTML = `<div style="font-size: 18px; font-weight: bold; color: #333; padding: 10px;">IA CREATORS HUB</div>`;
  }
}

// Remove o menu de navegação
function removerMenuSuperior() {
  const tabs = document.querySelector("ul.am-tabs");
  if (tabs) {
    tabs.remove();
  }
}

// Remove o rodapé
function removerRodape() {
  const footer = document.querySelector(".am-footer-content-content");
  if (footer) {
    footer.remove();
  }
}

// Bloqueia interações durante login
function bloquearPagina() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  overlay.style.zIndex = "9999";
  overlay.style.cursor = "wait";
  document.body.appendChild(overlay);
}

// Inicia o login automático
function iniciarLoginAutomatico() {
  chrome.storage.local.get(null, (data) => {
    const user = dec(data.login_user || "");
    const pass = dec(data.login_pass || "");
    const selectedApp = data.selected_app || "envato";
    const apps = data.apps || {
      envato: "https://noxtools.com/secure/page/envato"
    };

    if (!user || !pass) {
      alert("Credenciais não encontradas. Clique no ícone da extensão para configurar.");
      return;
    }

    const redirectURL = apps[selectedApp] || apps.envato;
    const currentURL = window.location.href;
    const loginURL = "https://noxtools.com/secure/login";
    const memberURL = "https://noxtools.com/secure/member";

    const isOutroApp = redirectURL === memberURL;

    if (!isOutroApp && currentURL.includes(redirectURL)) {
      if (temCamposDeLogin()) {
        window.location.href = loginURL;
      }
    } else if (currentURL.includes(memberURL)) {
      if (temCamposDeLogin()) {
        window.location.href = loginURL;
      } else if (!isOutroApp) {
        window.location.href = redirectURL;
      }
    } else if (currentURL.includes(loginURL)) {
      const checkForm = setInterval(() => {
        if (document.querySelector("form[name='login']")) {
          clearInterval(checkForm);
          bloquearPagina();
          fazerLogin(user, pass);
        }
      }, 300);
    } else if (!isOutroApp) {
      window.location.href = redirectURL;
    }
  });
}

// Escuta chamada do background
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "executarLogin") {
    iniciarLoginAutomatico();
  }
});

// Executa automaticamente na página de login
window.addEventListener("load", () => {
  iniciarLoginAutomatico();
  substituirLogo();
  removerMenuSuperior();
  removerRodape();
});
