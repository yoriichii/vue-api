<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Frequently Asked Questions</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label class="col-form-label">Name</label>
            <input type="text" class="form-control" placeholder="Name">
          </div>
          <div class="mb-3">
            <label class="col-form-label">Question</label>
            <input type="text" class="form-control" placeholder="Question">
          </div>
          <div class="mb-3">
            <label class="col-form-label">Answer</label>
            <input type="text" class="form-control" placeholder="Answer">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">{{  }}</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup lang="ts">

const openModal = () =>{
  
}
</script>

<style scoped>

</style>