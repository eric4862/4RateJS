const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("http://localhost:3000/usuarios/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      mensagem.style.color = "lightgreen";
      mensagem.innerText = "Cadastro realizado com sucesso!";
      form.reset();
    } else {
      mensagem.style.color = "salmon";
      mensagem.innerText = dados.erro;
    }

  } catch (error) {
    mensagem.style.color = "salmon";
    mensagem.innerText = "Erro ao conectar com o servidor";
  }
});
