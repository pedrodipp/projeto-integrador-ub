document.addEventListener("DOMContentLoaded", () => {

  const consultarBtn = document.getElementById("consultarBtn");
  const cepInput = document.getElementById("cepInput");
  const mainIndex = document.getElementById("mainIndex");

  consultarBtn.addEventListener("click", async () => {
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("[ERRO] Digite um CEP válido de 8 dígitos!");
      return;
    }

    mainIndex.innerHTML = `<h2 id="noticiasTitulo">Carregando dados...</h2>`;

    try {
      // 1. Consulta o ViaCEP
      const respostaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dadosCep = await respostaCep.json();

      if (dadosCep.erro) {
        mainIndex.innerHTML = `<h2 id="noticiasTitulo" style="color: red;">CEP não encontrado.</h2>`;
        return;
      }

      const cidade = dadosCep.localidade;
      const estado = dadosCep.uf;

      // Definição das Chaves de API
      const apiKeyWeather = "92fc748c05dc44d9b2024148260810";
      const apiKeyNews = "cb1c4b37714a653fc08ea11ce77963ca";

      // 2. Consulta no WeatherAPI
      const respostaWeather = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${cidade},${estado},Brazil&lang=pt`,
      );
      const dadosWeather = await respostaWeather.json();

      // 3. Consulta no GNews API
      const respostaNews = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(cidade)}&lang=pt&token=${apiKeyNews}&max=3`,
      );
      const dadosNews = await respostaNews.json();

      // Construção do HTML
      let htmlConteudo = `
        <h2 id="noticiasTitulo">Resultados para ${cidade} - ${estado}</h2>
        
        <!-- Bloco do Clima -->
        <section class="secaoNoticia">
            <div class="noticia">
                <h3 class="tituloNoticia">⛅ Condições Climáticas Atuais</h3>
                ${
                  respostaWeather.ok
                    ? `
                    <p class="descricaoNoticia"><strong>Temperatura:</strong> ${dadosWeather.current.temp_c}°C</p>
                    <p class="descricaoNoticia"><strong>Condição:</strong> ${dadosWeather.current.condition.text}</p>
                    <p class="descricaoNoticia"><strong>Humidade:</strong> ${dadosWeather.current.humidity}%</p>
                `
                    : `<p class="descricaoNoticia">Não foi possível carregar os dados climáticos.</p>`
                }
            </div>
        </section>
        
        <h2 id="noticiasTitulo">Notícias de ${cidade}</h2>
      `;

      if (
        respostaNews.ok &&
        dadosNews.articles &&
        dadosNews.articles.length > 0
      ) {
        dadosNews.articles.forEach((noticia) => {
          htmlConteudo += `<section class="secaoNoticia">
                        <div class="noticia">
                            <h3 class="tituloNoticia">${noticia.title}</h3>
                            ${noticia.image ? `<img src="${noticia.image}" alt="Imagem da Notícia"><br>` : ""}
                            <p class="descricaoNoticia">${noticia.description || "Sem descrição disponível."}</p>
                            <span class="leiaMais">
                                <a target="_blank" href="${noticia.url}">Leia mais...</a>
                            </span>
                        </div>
                    </section>`;
        });
      } else {
        htmlConteudo += `
                <section class="secaoNoticia">
                    <div class="noticia">
                        <p class="descricaoNoticia">Nenhuma notícia recente encontrada para esta localidade.</p>
                    </div>
                </section>
            `;
      }
      mainIndex.innerHTML = htmlConteudo;
    } catch (erro) {
      console.error(erro);
      mainIndex.innerHTML = `<h2 id="noticiasTitulo" style="color: red;">Ocorreu um erro ao obter as informações.</h2>`;
    }
  });
});