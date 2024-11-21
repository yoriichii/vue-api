<template>
  <!---------- Table-List ------->
  <button data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" class="btn btn-success" style="float:right; margin: 1rem 1.5rem 0 0;" @click="openModal">Add</button>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Questions</th>
          <th scope="col">Answer</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-for="(faq, index) in faqs" :key="index">
        <tr>
          <th>{{ index + 1 }}</th>
          <td>{{ faq.questionEn }}</td>
          <td>{{ faq.answerEn }}</td>
          <td style="display: flex; gap: 0.5rem;">
            <img data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" style="cursor: pointer;" src="../assets/edit.png" alt="edit-icon" @click="editFaq(faq)">
            <img @click="deleteFaqs(faq.id)" style="cursor: pointer;" src="../assets/delete.png" alt="delete-icon">
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!----------- Form-Modal -------->
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Frequently Asked Questions</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="col-form-label">Question</label>
                <input type="text" class="form-control" v-model="form.questionEn" placeholder="Input Question">
              </div>
              <div class="mb-3">
                <label class="col-form-label">Answer</label>
                <input type="text" class="form-control" v-model="form.answerEn" placeholder="Input Answer">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ isEdit ? 'Submit' : 'Add' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { FaqsTypes } from '../models/faq';
import Swal from 'sweetalert2';

const faqs = ref<FaqsTypes[]>([]);
const BASE_API = 'https://api-dev-mall.chipmongretail.com/api/v1/Faq';
const authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkwMDE5MjE3IiwianRpIjoiMGExMmZiYzctZDY3OS00YTFlLTg2YWMtODc2YjliYjdhMzNmIiwiYXVkIjpbImh0dHBzOi8vYXBpLWRldi1jb21tb24uY2hpcG1vbmdyZXRhaWwuY29tOjgwODEiLCJodHRwczovL2FwaS1kZXYtbWFsbC5jaGlwbW9uZ3JldGFpbC5jb20iLCJodHRwczovL2FwaS1kZXYtc3VwZXJtYXJrZXQuY2hpcG1vbmdyZXRhaWwuY29tIl0sIm5iZiI6MTczMjA5NzA5MCwiZXhwIjoxNzMyNzAxODkwLCJpYXQiOjE3MzIwOTcwOTAsImlzcyI6Imh0dHBzOi8vYXBpLWRldi1jb21tb24uY2hpcG1vbmdyZXRhaWwuY29tOjgwODEifQ.u_Uo3jhEMXNS9JXu5Bb8LtEGOvcGU8biwVrz9cf70SE';

const isEdit = ref(false);
const form = ref<FaqsTypes>({
  id: null,
  faqType: {
    id: null,
    name: '',
    description: null
  },
  questionEn: '',
  answerEn: '',
  questionKh: '',
  answerKh: ''
});

const fetchFaqs = async () => {
  try {
    const response = await axios.get(BASE_API, {
      headers: {
        Authorization: `${authorizationToken}`
      }
    });
     console.log(response.data.data);
    faqs.value = response.data.data;
  } catch (err) {
    console.log(err);
  }
};
// open without patchvalue 
const openModal = () => {
  isEdit.value = false;
  form.value = {
    id: null,
    faqType: {
      id: null,
      name: '',
      description: null
    },
    questionEn: '',
    answerEn: '',
    questionKh: '',
    answerKh: ''
  };
};

// open with patchvalue
const editFaq = (faq: FaqsTypes) => {
  isEdit.value = true;
  form.value = { ...faq }; //... clone all filed from form
};

const submitForm = async () => {
    if (!form.value.questionEn || !form.value.answerEn) {
     alert('can not empty')
    return; 
  }
  try {
    if (isEdit.value) {
      await axios.put(`${BASE_API}/${form.value.id}`, form.value, {
        headers: {
          Authorization: `${authorizationToken}`
        }
      });
    } else {
      await axios.post(BASE_API, form.value, {
        headers: {
          Authorization: `${authorizationToken}`
        }
      });
    }
    fetchFaqs();
    Swal.fire({
      title: 'Success!',
      text: 'FAQ submitted successfully.',
      showConfirmButton: false,
      icon: 'success',
      timer: 2500
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteFaqs = async (id: number | null) => {
  // Show confirmation dialog first
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // proceed with deletion if the user confirms
        await axios.delete(`${BASE_API}/${id}`, {
          headers: {
            Authorization: `${authorizationToken}`
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your FAQ has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,

        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

onMounted(() => {
  fetchFaqs();
});
</script>

<style scoped>
</style>
