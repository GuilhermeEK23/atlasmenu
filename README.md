# AtlasMenu — Painel do Restaurante

Sistema web de gerenciamento de restaurante e cardápio digital, construído com
React + TypeScript + Vite + Tailwind CSS + React Router.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` e navegue pelo menu lateral.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

> **Nota:** este projeto foi gerado em um ambiente sem acesso à internet, então
> não foi possível rodar `npm install` / `npm run build` para validar 100% a
> compilação. O código foi revisado manualmente com cuidado, mas rode
> `npm run build` assim que baixar o projeto e me avise se aparecer algum erro
> de tipo — posso corrigir rapidamente.

## Estrutura do projeto

```
src/
  components/   componentes reutilizáveis (Sidebar, Header, Button, Table, Modal...)
  layouts/      layout principal do dashboard (sidebar + header)
  pages/        uma pasta por tela (Dashboard, Orders, Tables, Menu, Products,
                Categories, Customers, Reports, Settings)
  routes/       definição das rotas (React Router)
  services/     camada de acesso a dados — hoje retorna arrays vazios,
                pronta para conectar a Supabase / PostgreSQL / Firebase / API REST
  hooks/        hooks reutilizáveis (useAsyncData: loading / error / success)
  types/        tipos TypeScript centrais (Order, Table, Product, Category...)
  utils/        formatação de moeda e datas
```

## Sobre os dados

Não há nenhum dado fictício no projeto. Todas as telas começam vazias
("Nenhum pedido encontrado", "Nenhuma mesa cadastrada", etc.) e os `services/`
retornam listas vazias. Quando você conectar um backend, basta substituir o
corpo das funções em `src/services/*.ts` por chamadas reais — as assinaturas
já estão prontas e as páginas não dependem de nenhum dado mockado.

A tela de Mesas e a de Produtos/Categorias já possuem os modais de cadastro
funcionando localmente (estado do React), prontos para futuramente chamar
`tablesService`, `productsService` e `categoriesService`.

## Rotas

| Rota             | Tela         |
|------------------|--------------|
| `/`              | redireciona para `/painel` |
| `/painel`        | Painel (dashboard) |
| `/pedidos`       | Pedidos |
| `/mesas`         | Mesas |
| `/cardapio`      | Cardápio |
| `/produtos`      | Produtos |
| `/categorias`    | Categorias |
| `/clientes`      | Clientes |
| `/relatorios`    | Relatórios |
| `/configuracoes` | Configurações |

## Paleta de cores

- Fundo: `#020712` / `#050B16` / `#08111F`
- Cards: `#0B1422` / `#0E1827`
- Bordas: `#1D2939`
- Laranja principal: `#FF5A00` / `#FF6500`
- Texto: `#FFFFFF` (primário) / `#8B95A7` (secundário)
- Verde `#22C55E` · Azul `#3B82F6` · Roxo `#8B5CF6` · Vermelho `#EF4444`
