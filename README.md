# Multi-API Repository

Bem-vindo ao repositório APIs! Este repositório é uma coleção de APIs destinadas a diversas causas. Cada API dentro deste repositório oferece funcionalidades específicas. Até o momento, algumas das APIs incluídas são:

# MangaHub API (Em Construção)

A MangaHub API é uma poderosa API desenvolvida em Express.js e TypeScript que oferece acesso a informações detalhadas sobre animes e mangás provenientes de diversos sites. Com essa API, os desenvolvedores podem integrar facilmente dados relevantes de diferentes fontes em suas aplicações, simplificando o processo de obtenção de informações sobre seus animes e mangás favoritos.

### Recursos Principais

-  Múltiplos Sites Suportados: A MangaHub API integra-se a uma variedade de sites populares de anime e mangá, proporcionando uma ampla gama de dados para atender às necessidades dos usuários.

### Detalhes Abrangentes:

-  Obtenha informações detalhadas, como descrição, gêneros, data de lançamento, capa, classificação e número total de capítulos para cada anime ou mangá.

### Formato do Headers

```json
{
   "url": "Url do Site"
}
```

## Endpoints

### 1. Detalhes do Mangá (LerManga)

-  **Endpoint:** `GET /mangas/:query`
-  **Descrição:** Retorna informações detalhadas sobre um mangá com base na consulta fornecida.
-  **Url:** https://lermanga.org
-  **Exemplo de Resposta:**
   ```json
   {
      "name": "Nome do Mangá",
      "genres": ["Gênero 1", "Gênero 2"],
      "description": "Descrição do Mangá",
      "releaseDate": "Data de Lançamento",
      "coverImageURL": "URL da Imagem de Capa",
      "rating": "Classificação",
      "totalChapters": "Número Total de Capítulos"
   }
   ```

### 1. Detalhes do Anime (Animes Vision)

-  **Endpoint:** `GET /animes/:query`
-  **Descrição:** Retorna informações detalhadas sobre um anime com base na consulta fornecida.
-  **Exemplo de Resposta:**

   ```json
   {
      "name": "Nome do Anime/Mangá",
      "description": "Descrição do Anime",
      "genres": ["Gênero 1", "Genêro 2"],
      "totalEps": "Total de Episódios (Number)",
      "age": "Faxa Etária do Anime (Number)",
      "season": "Temporada que o Anime Foi Lançado",
      "status": "Status Atual do Anime",
      "epDuration": "Duração Média de cada Episódio",
      "producers": ["Produtor 1", "Produtor 2"],
      "studies": ["Estdúio 1", "Estdúio 2"]
   }
   ```
