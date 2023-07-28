<script setup>
import {vMaska} from "maska";
import {reactive} from "vue";
import http from "@/helpers/http";
import router from "@/router";

const credentials = reactive({
  name: null,
  model: null,
  year: null,
  make: null,
  color: null,
  license_plate: null,
})

const handleLogin = () => {
  http().post('/api/driver', credentials)
      .then((res) => {
        if (res.status === 200) {
          router.push({
            name: 'standBy'
          })
        }
      })
      .catch((err) => console.error(err))
}
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Enter your car details
    </h1>
    <form action="#" @submit.prevent="handleLogin">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div class="mb-2 text-gray-400">
            <label for="name">Name</label>
            <input
                id="name"
                v-model="credentials.name"
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                name="name"
                placeholder="Your name..."
                type="text">
          </div>
          <div class="mb-2 text-gray-400">
            <label for="model">Model</label>
            <input
                id="model"
                v-model="credentials.model"
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                name="model"
                placeholder="Model of the car..."
                type="text">
          </div>
          <div class="mb-2 text-gray-400">
            <label for="make">Make</label>
            <input
                id="make"
                v-model="credentials.make"
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                name="make"
                type="text">
          </div>
          <div class="mb-2 text-gray-400">
            <label for="year ">Year</label>
            <input
                id="year"
                v-model="credentials.year"
                v-maska
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                data-maska="####"
                name="year"
                placeholder="2023"
                type="text">
          </div>

          <div class="mb-2 text-gray-400">
            <label for="color">Color</label>
            <input
                id="color"
                v-model="credentials.color"
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                name="color"
                type="text">
          </div>
          <div class="mb-2 text-gray-400">
            <label for="licence_plate">Licence Plate</label>
            <input
                id="licence_plate"
                v-model="credentials.license_plate"
                class="mt-1 block w-full text-black px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                name="licence_plate"
                placeholder="A 123 BC"
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