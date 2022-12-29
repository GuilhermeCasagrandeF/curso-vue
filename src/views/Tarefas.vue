<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { CADASTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box
  },
  methods: {
    salvarTarefa (tarefa:ITarefa) : void {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
    }
  },
  computed: {
    semTarefas () :boolean {
      return this.tarefas.length == 0
    }
  },
  setup () {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>
