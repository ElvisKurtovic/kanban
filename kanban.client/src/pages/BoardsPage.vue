<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <form class="form-inline" @submit.prevent="createList">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.newList.title"
            />
          </div>
          <button class="btn btn-info" type="submit">
            Create New List
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <List v-for="listData in state.lists"
            :key="listData.id"
            :list="listData"
      >
      </list>
    </div>
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
        await listsService.createList(route.params.id, state.newList)
        state.newList = {}
      }
    }
  },
  components: {}
}
</script>

    <style lang="scss" scoped>
    </style>
