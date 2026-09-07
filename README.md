# LojaADS | Workshop Raio-X L³

Página de vendas do Workshop Raio-X L³, da LojaADS, apresentado por Renata. O projeto foi criado para donos e gestores de lojas de móveis, colchões, decoração, cortinas, persianas e eletromóveis.

## Tecnologias

- React
- TypeScript
- Vite
- CSS responsivo

## Rotas

- `/a1`
- `/a2`
- `/a3`
- `/obrigado`

As três páginas de vendas compartilham a mesma estrutura, oferta, seções e identidade visual. Somente a comunicação da hero muda entre as rotas.

## Execução local

```bash
npm install
npm run dev
```

## Verificação e build

```bash
npm run check
npm run build
npm run preview
```

## Checkout

O botão final aceita o endereço público definido pela variável `VITE_CHECKOUT_URL`. Enquanto essa informação não for fornecida, o controle permanece identificado como indisponível.

Crie um arquivo `.env.local` apenas no ambiente de desenvolvimento ou configure a variável diretamente na plataforma de hospedagem.

```text
VITE_CHECKOUT_URL=https://endereco-do-checkout
```

Não envie arquivos de ambiente com dados privados para o repositório.
