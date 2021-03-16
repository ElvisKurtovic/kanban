<template>
  <div class="col card h-25">
    <h4 class="card-title">
      {{ list.title }}
    </h4>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { listsService } from '../services/ListsService'
export default {
  name: 'List',
  props: {
    list: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteList() {
        listsService.deleteList(props.list.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
