const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const btnPublicar = document.getElementById("btnPublicar");
const btnVoltar = document.getElementById("btnVoltar");
const msg = document.getElementById("msg");

btnVoltar.addEventListener("click", () => {
    window.location.href = "feed.html";
});

btnPublicar.addEventListener("click", async () => {
    const item_nome = document.getElementById("item_nome").value;
    const tipo = document.getElementById("tipo").value;
    const nota = document.getElementById("nota").value;
    const comentario = document.getElementById("comentario").value;

    if (!item_nome || !tipo || nota === "") {
        msg.innerText = "Preencha os campos obrigatórios";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/avaliacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                item_nome,
                tipo,
                nota: Number(nota),
                comentario
            })
        });

        const data = await response.json();

        if (!response.ok) {
            msg.innerText = data.erro || "Erro ao publicar";
            return;
        }

        window.location.href = "feed.html";

    } catch (err) {
        console.error(err);
        msg.innerText = "Erro de conexão";
    }
});
