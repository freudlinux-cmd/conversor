# Freud Money Convert

Pequeno conversor de moedas (BRL ↔ USD/EUR/JPY) que usa a API pública `economia.awesomeapi.com.br`.

## Uso

- Abrir `index.html` no navegador: preferível servir por HTTP para evitar problemas de CORS:

```bash
# a partir da pasta do projeto
python3 -m http.server 8000
# abra http://localhost:8000
```

- Digite um valor em Reais e clique em "Converter".

## Estrutura

- `index.html` — página principal
- `script.js` — lógica de conversão (busca cotação em tempo real)
- `style.css` — estilos
- `imagens/freud.png` — favicon / ícone
- `manifest.json` — configuração mínima para adicionar à tela inicial (Android/Chrome)

## GitHub

Repositório remoto: https://github.com/freudlinux-cmd/conversor
Branch principal: `main`

## Como contribuir

1. Editar arquivos
2. `git add . && git commit -m "Descrição"`
3. `git push`
