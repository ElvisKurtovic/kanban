<template>
  <div class="col-4 card Board mt-1 bg-darkgrey">
    <router-link :to="{name: 'BoardsPage', params: { id: board.id } }">
      <div class="card-body">
        <h4 class="card-title text-color">
          {{ board.title }}
        </h4>
      </div>
    </router-link>
    <div class="z-2">
      <i class="fas fa-trash float-right text-danger" aria-hidden="true" @click="deleteBoard"></i>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteBoard() {
        boardsService.deleteBoard(props.board.id)
        boardsService.getBoards(props.board.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.z-2 {
  z-index: 2;
}

.bg-darkgrey{
  background-color: darkgray;
}

.text-color{
  color:ghostwhite !important
}
</style>
