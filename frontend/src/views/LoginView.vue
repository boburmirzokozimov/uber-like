<script setup>
import {vMaska} from "maska"
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()

const credentials = reactive({
  phone: null,
  login_code: null,
})

const filteredCredentials = computed(() => {
  return {
    phone: credentials.phone.replaceAll(' ', '')
        .replaceAll('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace('+', ''),
    login_code: credentials.login_code
  }
})

const waitingVerification = ref(false)

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push({
      name: 'landing'
    })
  }
})


const handleLogin = () => {
  console.log(filteredCredentials.value)
  axios.post('http://127.0.0.1:8000/api/login', filteredCredentials.value)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          waitingVerification.value = true
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error.response)
      })
}

const handleLoginVerify = () => {
  axios.post('http://127.0.0.1:8000/api/login/verify', filteredCredentials.value)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data)
          router.push({
            name: 'landing'
          })
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.message)
      })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Enter your phone number
    </h1>
    <form v-if="!waitingVerification" action="#" @submit.prevent="handleLogin">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <input
                id="phone"
                v-model="credentials.phone"
                v-maska
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                data-maska="+998(##) ###-##-##"
                name="phone" placeholder="+998(90) 123-45-67"
                type="text">
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 ">
          <button
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white"
              type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <form v-else action="#" @submit.prevent="handleLoginVerify">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <input
                id="login_code"
                v-model="credentials.login_code"
                v-maska
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                data-maska="####"
                name="login_code" placeholder="1234"
                type="text">
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 ">
          <button
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white"
              type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>