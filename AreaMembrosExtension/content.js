// content.js

// Não adiciona duas vezes o botão
if (!document.getElementById('acessar-area-membros-btn')) {
  const btn = document.createElement('button');
  btn.id = 'acessar-area-membros-btn';
  btn.innerText = 'Ir para Área de Membros';
  btn.style.position = 'fixed';
  btn.style.top = '30px';
  btn.style.right = '30px';
  btn.style.zIndex = 9999;
  btn.style.padding = '14px 28px';
  btn.style.background = '#23263A';
  btn.style.color = '#fff';
  btn.style.fontSize = '18px';
  btn.style.border = 'none';
  btn.style.borderRadius = '10px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 4px 12px #0004';
  btn.onclick = () => {
    window.open(chrome.runtime.getURL('area.html'), '_blank');
  };
  document.body.appendChild(btn);
}
