<template>
  <div class="col-4 card Board">
    <router-link :to="{name: 'BoardsPage', params: { id: board.id } }">
      <div class="card-body">
        <h4 class="card-title">
          {{ board.title }}
          <i class="fas fa-trash" aria-hidden="true" @click="deleteBoard"></i>
        </h4>
      </div>
    </router-link>
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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
