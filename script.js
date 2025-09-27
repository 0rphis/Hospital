function toggleSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');

  if (open) {
    // Abre a sidebar
    sidebar.classList.add('active');
    overlay.classList.add('active');

    // Troca os botões
    openBtn.style.display = 'none';
    closeBtn.style.display = 'block';
  } else {
    // Fecha a sidebar
    sidebar.classList.remove('active');
    overlay.classList.remove('active');

    // Troca os botões de volta
    closeBtn.style.display = 'none';
    openBtn.style.display = 'flex';
  }
}


