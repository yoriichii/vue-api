<template>
  <div>
    <button @click="goToList" class="btn btn-primary" style=" margin: 1.5rem; padding: 0.5rem 1.2rem;">List</button>
  </div>
  <div class="accordion accordion-flush" style="width: 500px; margin: auto;" id="accordionFlushExample">
    <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
      <h2 class="accordion-header" :id="'flush-heading' + index">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapse' + index" :aria-expanded="false" :aria-controls="'flush-collapse' + index">
          {{ faq.questionEn }}
        </button>
      </h2>
      <div :id="'flush-collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'flush-heading' + index" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">{{ faq.answerEn }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FaqsTypes } from '../models/faq';
import { useRouter } from 'vue-router';


    const faqs = ref<FaqsTypes[]>([])
    const error = ref(null);
    const router = useRouter()

    const fetchFaqs = async () => {
  try {
    const response = await axios.get('https://api-dev-mall.chipmongretail.com/api/v1/Faq', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkwMDE5MjE3IiwianRpIjoiMGExMmZiYzctZDY3OS00YTFlLTg2YWMtODc2YjliYjdhMzNmIiwiYXVkIjpbImh0dHBzOi8vYXBpLWRldi1jb21tb24uY2hpcG1vbmdyZXRhaWwuY29tOjgwODEiLCJodHRwczovL2FwaS1kZXYtbWFsbC5jaGlwbW9uZ3JldGFpbC5jb20iLCJodHRwczovL2FwaS1kZXYtc3VwZXJtYXJrZXQuY2hpcG1vbmdyZXRhaWwuY29tIl0sIm5iZiI6MTczMjA5NzA5MCwiZXhwIjoxNzMyNzAxODkwLCJpYXQiOjE3MzIwOTcwOTAsImlzcyI6Imh0dHBzOi8vYXBpLWRldi1jb21tb24uY2hpcG1vbmdyZXRhaWwuY29tOjgwODEifQ.u_Uo3jhEMXNS9JXu5Bb8LtEGOvcGU8biwVrz9cf70SE`  // Replace 'YOUR_API_TOKEN' with the actual token
      }
    });
    faqs.value = response.data.data;
  } catch (err) {
    console.log(error);
  }
};

  const goToList = () =>{
    router.push('/list')
  }

  onMounted(() => {
      fetchFaqs();
  });

</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.faq-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-top: 2rem;
}

.faq-question {
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.faq-answer {
  font-size: 16px;
  padding: 10px;
  background-color: #f9f9f9;
  margin-top: 10px;
}

.loading {
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}
</style>
