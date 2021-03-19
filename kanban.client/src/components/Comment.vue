<template>
  <p class="border rounded border-info bg-dark text-light px-1">
    {{ comment.title }} <span class="float-right"><i class="fas fa-trash btncolor4" aria-hidden="true" @click="deleteComment"></i></span>
    <span><p> -{{ comment.creatorEmail }} </p>

    </span>
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
.btncolor4{
  color: darken($color: #45e0e3, $amount: 0);
}
</style>
