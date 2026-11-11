const candidatosBanco = {
  13: {
    nome: "Luiz Inácio Lula da Silva",
    partido: "PT",
    cargo: "Presidente",
    foto: "https://www.estadao.com.br/resizer/v2/Q7UAVINNGBCJJLLFK4B72OX2GQ.jpg?quality=80&auth=d86d94ca2a3d56cf98a2eb8fecad0bd74112d2fb662f08966bf1479aaec31882&width=380",
  },
  22: {
    nome: "Flávio Bolsonaro",
    partido: "PL",
    cargo: "Presidente",
    foto: "https://uploads.folhavitoria.com.br/imagens/2026/08/Flavio-Bolsonaro.-Foto-TSE.jpg",
  },
  15123: {
    nome: "João Pedro",
    partido: "MDB",
    cargo: "Vereador",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  45456: {
    nome: "Mariana Dias",
    partido: "PSDB",
    cargo: "Vereador",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
  },
};

const formulario = document.getElementById("colinhaForm");

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();
});

document.getElementById("gerarBtn").addEventListener("click", () => {
  const valPresidente = document.getElementById("inputPresidente").value.trim();
  const valVereador = document.getElementById("inputVereador").value.trim();

  if (!valPresidente && !valVereador) {
    alert("Digite pelo menos o número de um candidato!");
    return;
  }

  if(valVereador && valVereador.length < 5) {
    alert("O número do vereador deve ter 5 dígitos!");
    return;
  }

  if(valPresidente && valPresidente !== 2) {
    alert("O número do presidente deve ter 2 dígitos!");
  }

  const blocoPresidente = document.getElementById("blocoPresidente");
  const blocoVereador = document.getElementById("blocoVereador");

  if (valPresidente) {
    const cand = candidatosBanco[valPresidente];
    if (cand) {
      document.getElementById("nomePresidente").textContent = cand.nome;
      document.getElementById("numPresidente").textContent = valPresidente;
      document.getElementById("partidoPresidente").textContent = cand.partido;
      document.getElementById("fotoPresidente").src = cand.foto;
    } else {
      document.getElementById("nomePresidente").textContent =
        "Candidato Fictício / Genérico";
      document.getElementById("numPresidente").textContent = valPresidente;
      document.getElementById("partidoPresidente").textContent = "PARTIDO";
      document.getElementById("fotoPresidente").src =
        "https://via.placeholder.com/150";
    }
    blocoPresidente.style.display = "flex";
  } else {
    blocoPresidente.style.display = "none";
  }

  if (valVereador) {
    const cand = candidatosBanco[valVereador];
    if (cand) {
      document.getElementById("nomeVereador").textContent = cand.nome;
      document.getElementById("numVereador").textContent = valVereador;
      document.getElementById("partidoVereador").textContent = cand.partido;
      document.getElementById("fotoVereador").src = cand.foto;
    } else {
      document.getElementById("nomeVereador").textContent =
        "Candidato Fictício / Genérico";
      document.getElementById("numVereador").textContent = valVereador;
      document.getElementById("partidoVereador").textContent = "PARTIDO";
      document.getElementById("fotoVereador").src =
        "https://via.placeholder.com/150";
    }
    blocoVereador.style.display = "flex";
  } else {
    blocoVereador.style.display = "none";
  }

  document.getElementById("resultadoColinha").style.display = "block";
});