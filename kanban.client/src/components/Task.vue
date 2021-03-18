<template>
  <div class="col">
    <div class="card">
      <h4 class="card-title">
        {{ task.title }}
      </h4>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { tasksService } from '../services/TasksService'
export default {
  name: 'Task',
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteTask() {
        tasksService.deleteTask(props.task.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
