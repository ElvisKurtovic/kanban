<template>
  <div class="col-4">
    <div class="card mt-1">
      <h4 class="card-title">
        {{ list.title }}
        <i class="fas fa-trash float-right" aria-hidden="true" @click="deleteList"></i>
      </h4>
      <form class="form-inline" @submit.prevent="createTask">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Task Title.."
            aria-describedby="helpId"
            v-model="state.newTask.title"
          />
        </div>
        <button class="btn btncolor2 text-light" type="submit">
          Create New Task
        </button>
      </form>
      <Task v-for="task in state.tasks" :key="task.id" :list="list" :task="task" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'List',
  props: {
    list: { type: Object, required: true },
    task: { type: Object, required: true },
    board: { type: Object, required: true }
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
        state.newTask = {}
      },
      async deleteList() {
        await listsService.deleteList(props.list.id)
        boardsService.getLists(props.list.boardId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.btncolor2{
  background-color: darken($color: #45e0e3, $amount: 0);
}

</style>
