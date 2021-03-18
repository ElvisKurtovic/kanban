<template>
  <div class="col">
    <div class="card">
      <h4 class="card-title">
        {{ list.title }}
      </h4>
      <form class="form-inline" @submit.prevent="createTask">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Title"
            aria-describedby="helpId"
            v-model="state.newTask.title"
          />
        </div>
        <button class="btn btn-info" type="submit">
          Create New Task
        </button>
      </form>
      <Task v-for="task in state.tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'List',
  props: {
    list: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      tasks: computed(() => AppState.tasks[props.list.id]),
      newTask: {}
    })
    onMounted(() => {
      tasksService.getTasks(props.list.id)
    })
    return {
      state,
      createTask() {
        state.newTask.listId = props.list.id
        tasksService.createTask(state.newTask)
      },
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
