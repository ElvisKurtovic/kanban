<template>
  <div class="row">
    <List v-for="listData in state.lists"
          :key="listData.id"
          :list="listData"
    >
    </list>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRouter, useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'

export default {
  name: 'BoardsPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      board: computed(() => AppState.activeBoard),
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists),
      newList: {}
    })
    onMounted(async() => {
      await boardsService.getBoard(route.params.id)
      await boardsService.getLists(route.params.id)
    })

    return {
      state,
      route,
      async deleteBoard() {
        await boardsService.deleteBoard(state.board.id)
        router.push({ name: 'Home' })
      },
      async createList() {
        await listsService.createList({ board: state.board.id, body: state.newList.body })
        state.newList = {}
      }
    }
  },
  components: {}
}
</script>

    <style lang="scss" scoped>
    </style>
