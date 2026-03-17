# Retail Hub Mobile

Scaffold inicial do desafio técnico em React Native com Expo. A base foi criada com a stack pedida, mas sem implementar as funcionalidades de lojas e produtos.

## Stack e versões

- Node: `20.16.0` no ambiente atual, mas o template gerado com Expo SDK 55 / React Native 0.83 recomenda `Node >= 20.19.4`
- Expo: `~55.0.6`
- React: `19.2.0`
- React Native: `0.83.2`
- TypeScript: `~5.9.2`
- Expo Router: `~55.0.5`
- Gluestack UI: `@gluestack-ui/themed ^1.1.73`
- Zustand: `^5.0.12`
- MirageJS: `^0.1.48`

## O que já está pronto

- Projeto Expo configurado com TypeScript
- Navegação com Expo Router
- Provider global com Gluestack UI
- Estado inicial com Zustand e persistência base via AsyncStorage
- Mock API local com MirageJS e endpoints simulados para `/stores` e `/products`
- Estrutura de pastas preparada para evoluir os módulos de lojas e produtos

## O que ainda não foi feito

- Listagem de lojas
- Cadastro, edição e exclusão de lojas
- Listagem de produtos por loja
- Cadastro, edição e exclusão de produtos
- Busca, filtros, testes e refinamentos de UX

## Instalação

```bash
npm install
```

## Execução

```bash
npm run start
```

Para abrir diretamente nas plataformas:

```bash
npm run android
npm run ios
npm run web
```

## Mock de back-end

Nenhum processo separado é necessário neste scaffold.

- Em ambiente de desenvolvimento, o app inicializa automaticamente o MirageJS ao subir.
- A organização do mock fica em `src/server/mirage`.

Endpoints preparados:

- `GET /stores`
- `POST /stores`
- `PUT /stores/:storeId`
- `DELETE /stores/:storeId`
- `GET /stores/:storeId/products`
- `GET /products`
- `POST /products`
- `PUT /products/:productId`
- `DELETE /products/:productId`

## Estrutura principal

```text
app/
  _layout.tsx
  index.tsx
  stores/
    index.tsx
    new.tsx
    [storeId]/
      edit.tsx
      products/
        index.tsx
        new.tsx
        [productId]/
          edit.tsx
src/
  components/
    layout/
    ui/
  features/
    stores/
      components/
      hooks/
      services/
      types/
      validators/
    products/
      components/
      hooks/
      services/
      types/
      validators/
  providers/
  lib/api/
  lib/utils/
  server/
    mirage/
      routes/
      models/
      factories/
      seeds/
      serializers/
  store/
```

## Validação

```bash
npm run typecheck
```
