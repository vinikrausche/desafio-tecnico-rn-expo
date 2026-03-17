import { Server } from "miragejs";
import { registerProductRoutes } from "./products";


// Este arquivo agrupa as rotas da versão v1 da API mock.
// A ideia é manter um ponto de entrada por versão para facilitar a evolução
// da aplicação sem quebrar contratos antigos quando novas versões surgirem.
// Se no futuro a API crescer, podemos criar v2, v3, etc., mantendo cada
// conjunto de rotas isolado e mais simples de manter.

export const V1Routes = (server:Server) => {
    registerProductRoutes(server)
    registerProductRoutes(server);
};
