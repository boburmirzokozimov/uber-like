<script setup>
import {useRouter} from "vue-router";
import http from "@/helpers/http";

const router = useRouter()
const handleFindARide = () => {
  router.push({
    name: 'location'
  })
}
const handleStartDriving = () => {
  http().get('/api/driver')
      .then((res) => {
        if (res.data.driver) {
          router.push({
            name: 'standBy'
          })
        } else {
          router.push({
            name: 'driver'
          })
        }
      })
      .catch((err) => console.error(err))

}
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Uber
    </h1>
    <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
      <div class="bg-gray-100 px-4 py-5 sm:p-6 flex justify-between">
        <button
            class="inline-flex justify-center mx-auto rounded-md border border-transparent bg-black py-2 px-2 text-white"
            type="submit"
            @click="handleStartDriving"
        >
          Start Driving
        </button>
        <button
            class="inline-flex justify-center mx-auto rounded-md border border-transparent bg-black py-2 px-2 text-white"
            type="submit"
            @click="handleFindARide"
        >
          Find A Ride
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>