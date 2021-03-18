<template>
  <div class="col">
    <div class="card">
      <h4 class="card-title">
        {{ task.title }}
        <i class="fas fa-trash" aria-hidden="true" @click="deleteTask"></i>
      </h4>
      <Comment v-for="comment in state.comments" :key="comment.id" :task="task" :comment="comment" />
      <form class="form-inline" @submit.prevent="createComment">
        <div class="form-group">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Enter Comment Here.."
            aria-describedby="helpId"
            v-model="state.newComment.title"
          />
        </div>
        <button class="btn btn-info" type="submit">
          Create New Comment
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed, onMounted } from 'vue'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'Task',
  props: {
    task: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      comments: computed(() => AppState.comments[props.task.id]),
      newComment: {}
    })
    onMounted(() => {
      commentsService.getComments(props.task.id)
    })
    return {
      state,
      createComment() {
        state.newComment.creatorEmail = ''
        state.newComment.taskId =
        props.task.id
        commentsService.createComment(state.newComment)
        state.newComment = {}
      },
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
