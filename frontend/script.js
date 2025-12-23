// OBSOLETO: arquivo legado. As páginas usam agora scripts separados (login.js, cadastro.js, feed.js, post.js).
const API_URL = '';

// LOGIN
function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'feed.html';
        } else {
            document.getElementById('mensagem').innerText = data.mensagem;
        }
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// PUBLICAR AVALIAÇÃO
function avaliar() {
    const nota = document.getElementById('nota').value;
    const comentario = document.getElementById('comentario').value;
    const id_conteudo = document.getElementById('id_conteudo').value;

    fetch(`${API_URL}/avaliacoes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ nota, comentario, id_conteudo })
    })
    .then(res => res.json())
    .then(() => carregarFeed());
}

// CARREGAR FEED
function carregarFeed() {
    fetch(`${API_URL}/avaliacoes`)
        .then(res => res.json())
        .then(data => {
            const feed = document.getElementById('feed');
            feed.innerHTML = '';

            data.forEach(av => {
                feed.innerHTML += `
                    <div class="card">
                        <strong>${av.usuario}</strong> avaliou <em>${av.conteudo}</em>
                        <p>Nota: ${av.nota}</p>
                        <p>${av.comentario}</p>
                    </div>
                `;
            });
        });
}

if (window.location.pathname.includes('feed.html')) {
    carregarFeed();
}
