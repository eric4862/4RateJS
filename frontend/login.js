const form = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem("token", dados.token);
      mensagem.style.color = "lightgreen";
      mensagem.innerText = "Login realizado com sucesso!";

      setTimeout(() => {
        window.location.href = "feed.html";
      }, 1000);

    } else {
      mensagem.style.color = "salmon";
      mensagem.innerText = dados.erro;
    }

  } catch (error) {
    mensagem.style.color = "salmon";
    mensagem.innerText = "Erro ao conectar com o servidor";
  }
});
