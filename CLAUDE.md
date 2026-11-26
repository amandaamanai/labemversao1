# LABEM UFCG — site estático

Site sem build: HTML + CSS + JS puro, publicado no GitHub Pages direto da raiz do repositório.

- Conteúdo: tudo em `data/site.json` (textos, vagas, parceiros, contatos, status do processo seletivo em `recrutamento.status`).
- Renderização: `assets/main.js` monta as seções a partir do JSON. Para nova seção, adicione o dado no JSON e o trecho em `main.js`.
- Visual: variáveis de cor e fonte no topo de `assets/style.css` (`:root`). Identidade: preto, vermelho #d4141c, Anton + Poppins.
- Imagens em `assets/img` (WebP) e `assets/logos`. Use caminhos relativos, sem barra inicial (compatível com subdiretório do GitHub Pages).
- Regras: não inventar dados, datas, parceiros ou resultados; não expor dados pessoais sem autorização; sem emojis; sem backend.
- Testar localmente: `python3 -m http.server` e abrir http://localhost:8000.
