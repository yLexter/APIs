# Multi-API Repository

Bem-vindo ao repositório APIs! Este repositório é uma coleção de APIs destinadas a diversas causas. Cada API dentro deste repositório oferece funcionalidades específicas. Até o momento, algumas das APIs incluídas são:

# MangaHub API (Em Construção)

Esta API possuem um foco especial de obter informações sobre animes e mangás.

## Endpoints

### 1. Detalhes do Mangá

-  **Endpoint:** `GET /mangas/:query`
-  **Descrição:** Retorna informações detalhadas sobre um mangá com base na consulta fornecida.
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
