# Multi-API Repository

Bem-vindo ao repositório APIs! Este repositório é uma coleção de APIs destinadas a diversas causas. Cada API dentro deste repositório oferece funcionalidades específicas. Até o momento, algumas das APIs incluídas são:

# MangaHub API (Em Construção)

Esta API possuem um foco especial de obter informações sobre animes e mangás.

## Endpoints

### 1. Detalhes do Mangá (LerManga)

-  **Endpoint:** `GET /mangas/:query`
-  **Descrição:** Retorna informações detalhadas sobre um mangá com base na consulta fornecida.
-  **Exemplo de Resposta:**

   ```json
   {
      "name": "Nome do Mangá",
      "genres": ["Gênero 1", "Gênero 2", ...],
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
   "genres": ["Gênero 1", "Genêro 2" ...],
   "totalEps": "Total de Episódios (Number)",
   "age": "Faxa Etária do Anime (Number)",
   "season": "Temporada que o Anime Foi Lançado",
   "status": "Status Atual do Anime",
   "epDuration": "Duração Média de cada Episódio",
   "producers": [
    "Produtor 1",
    "Produtor 2",
     ...
   ],
   "studies": ["Estdúio 1", "Estdúio 2", ...]
   }
   ```
