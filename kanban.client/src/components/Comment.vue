<template>
  <p>
    {{ comment.title }}
    User - {{ comment.creatorEmail }}
    <i class="fas fa-trash" aria-hidden="true" @click="deleteComment"></i>
  </p>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'Comment',
  props: {
    task: { type: Object, required: true },
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteComment() {
        commentsService.deleteComment(props.comment.id)
        commentsService.getComments(props.task.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
