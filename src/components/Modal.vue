<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modal.title }}</h5>
            <button type="button" class="close"  @click="onClose()" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ modal.body }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="onDelete()">삭제</button>
            <button type="button" class="btn btn-secondary" @click="onClose()">닫기</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  props:['modal'],
  setup(props, { emit }){
    const onClose = function() {
      emit('close');
      // this.$emit('close');
    }

    const onDelete = () => {
      emit('delete');
    }

    return {
      onClose,
      onDelete,
    }
  }
}
</script>

<style scoped>
.modal-wrapper{
  position:fixed;
  z-index:100;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgb(0,0,0,0.5);
}
</style>