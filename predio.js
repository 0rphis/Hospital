document.addEventListener('DOMContentLoaded', () => {
    // --- util LocalStorage ---
    function salvarNoLocalStorage() {
        localStorage.setItem('quartos', JSON.stringify(quartos));
        console.log('[localStorage] Salvo', quartos.length, 'quartos');
    }
    function carregarDoLocalStorage() {
        const raw = localStorage.getItem('quartos');
        if (!raw) return null;
        try { return JSON.parse(raw); } catch (err) { console.error('JSON inválido no localStorage', err); return null; }
    }

    // --- dados iniciais (serão usados se não houver nada salvo) ---
    let quartos = carregarDoLocalStorage() || [
        { id: "101A", setor: "Pulmão", tipo: "Isolamento", genero: "Masculino", status: "Ocupado" },
        { id: "101B", setor: "Pulmão", tipo: "Comum", genero: "Masculino", status: "Disponível" },
        { id: "102A", setor: "Pulmão", tipo: "Isolamento", genero: "Feminino", status: "Ocupado" }
    ];

    // --- referências DOM ---
    const container = document.getElementById('quartos-container');
    const form = document.getElementById('addRoomForm');

    // --- render --- 
    function renderQuartos(list) {
        container.innerHTML = '';
        if (!Array.isArray(list) || list.length === 0) {
            container.innerHTML = '<div style="padding:18px;background:#fff;border-radius:8px;border:1px solid #e6e9ed">Nenhum quarto cadastrado.</div>';
            return;
        }

        list.forEach(quarto => {
            const card = document.createElement('div');
            card.className = 'quarto-card';
            card.dataset.id = quarto.id; // para localizar depois

            const statusClass = quarto.status === 'Disponível' ? 'status-disponivel' : 'status-ocupado';

            card.innerHTML = `
        <div class="quarto-header">
        <h3>Quarto ${escapeHtml(quarto.id)}</h3>
        <span class="quarto-status ${statusClass}">${escapeHtml(quarto.status)}</span>
        </div>
        <div class="quarto-body">
        <p><strong>${escapeHtml(quarto.setor)}</strong></p>
        <p>Tipo: ${escapeHtml(quarto.tipo)}</p>
        <p>Gênero: ${escapeHtml(quarto.genero)}</p>
        </div>
    `;

            // clicar no card alterna status (útil para testar)
            card.addEventListener('click', () => {
                toggleStatus(quarto.id);
            });

            container.appendChild(card);
        });
    }

    // --- proteção básica contra XSS (não crítica, mas boa prática) ---
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // --- toggle status por id ---
    function toggleStatus(id) {
        const idx = quartos.findIndex(q => q.id.toLowerCase() === id.toLowerCase());
        if (idx === -1) return;
        quartos[idx].status = quartos[idx].status === 'Disponível' ? 'Ocupado' : 'Disponível';
        salvarNoLocalStorage();
        renderQuartos(quartos);
        highlightCardById(quartos[idx].id);
    }

    // --- highlight visual do card recém-adicionado/atualizado ---
    function highlightCardById(id) {
        const el = container.querySelector(`[data-id="${CSS.escape(id)}"]`);
        if (!el) return;
        el.classList.add('updated');
        setTimeout(() => el.classList.remove('updated'), 1400);
        // opcional: rolar para o card
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // --- adicionar quarto via form ---
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const id = document.getElementById('quartoId').value.trim();
        const setor = document.getElementById('setor').value.trim();
        const tipo = document.getElementById('tipo').value;
        const genero = document.getElementById('genero').value;

        if (!id || !setor || !tipo || !genero) {
            alert('Preencha todos os campos.');
            return;
        }

        // checar duplicado (case-insensitive)
        if (quartos.some(q => q.id.toLowerCase() === id.toLowerCase())) {
            alert('Já existe um quarto com esse ID.');
            return;
        }

        const novo = { id, setor, tipo, genero, status: 'Disponível' };
        quartos.push(novo);
        salvarNoLocalStorage();
        renderQuartos(quartos);
        form.reset();
        highlightCardById(id);
        console.log('Novo quarto adicionado:', novo);
    });

    // --- função auxiliar: atualiza status aleatório apenas para demo (pode remover) ---
    function updateRandomStatusDemo() {
        if (!quartos.length) return;
        const i = Math.floor(Math.random() * quartos.length);
        quartos[i].status = quartos[i].status === 'Disponível' ? 'Ocupado' : 'Disponível';
        salvarNoLocalStorage();
        renderQuartos(quartos);
        highlightCardById(quartos[i].id);
    }

    // Inicializa
    renderQuartos(quartos);
    console.log('Iniciado com', quartos.length, 'quartos');

    // demo: alternar status a cada 8s (comente se não quiser)
    // setInterval(updateRandomStatusDemo, 8000);
});



const btnFiltroDisponiveis = document.getElementById("filtroDisponiveis");
const btnMostrarTodos = document.getElementById("mostrarTodos");

// Seleciona todos os cards de quartos
const quartos = document.querySelectorAll(".quarto-card");

// Função para mostrar apenas os disponíveis
btnFiltroDisponiveis.addEventListener("click", () => {
    quartos.forEach(quarto => {
        if (quarto.classList.contains("disponivel")) {
            quarto.style.display = "block";  // mantém visível
        } else {
            quarto.style.display = "none";   // esconde
        }
    });
});

// Função para mostrar todos os quartos
btnMostrarTodos.addEventListener("click", () => {
    quartos.forEach(quarto => {
        quarto.style.display = "block"; // mostra todos novamente
    });
});
