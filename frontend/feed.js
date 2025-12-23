const lista = document.getElementById("lista-avaliacoes");
const btnLogout = document.getElementById("btnLogout");
const btnPost = document.getElementById("btnPost");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// logout
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

// ir para página de post
btnPost.addEventListener("click", () => {
    window.location.href = "post.html";
});

async function carregarFeed() {
    try {
        const response = await fetch("http://localhost:3000/avaliacoes", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            lista.innerHTML = "<p>Erro ao carregar feed</p>";
            return;
        }

        lista.innerHTML = "";

        if (data.length === 0) {
            lista.innerHTML = "<p>Nenhuma avaliação ainda</p>";
            return;
        }

        data.forEach(av => {
            const div = document.createElement("div");
            div.classList.add("avaliacao");

            div.innerHTML = `
                <strong>${av.usuario}</strong> avaliou 
                <em>${av.item_nome}</em> (${av.tipo})<br>
                Nota: <strong>${av.nota}</strong>
                ${av.comentario ? `<p>${av.comentario}</p>` : ""}
            `;

            lista.appendChild(div);
        });

    } catch (err) {
        console.error(err);
        lista.innerHTML = "<p>Erro de conexão com o servidor</p>";
    }
}

carregarFeed();
