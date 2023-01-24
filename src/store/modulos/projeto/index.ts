import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDoProjeto {
    projetos: IProjeto[];
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            clienteHttp.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            return clienteHttp.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
            return clienteHttp.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({commit}, id: string) {
            return clienteHttp.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id));
        },
    }
}