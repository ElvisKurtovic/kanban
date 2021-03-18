<template>
  <div class="container">
    <div class="row">
      <div class="col" v-if="state.user.isAuthenticated">
        <form class="form-inline" @submit.prevent="createBoard">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.newBoard.title"
            />
          </div>
          <button class="btn btn-info" type="submit">
            Create New Board
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Board v-for="boardData in state.boards"
               :key="boardData.id"
               :board="boardData"
        >
        </board>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { boardsService } from '../services/BoardsService'
// import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards),
      user: computed(() => AppState.user),
      newBoard: {}
    })
    onMounted(() => {
      boardsService.getBoards()
    })
    return {
      state,
      async createBoard() {
        await boardsService.createBoard(state.newBoard)
        state.newBoard = {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
