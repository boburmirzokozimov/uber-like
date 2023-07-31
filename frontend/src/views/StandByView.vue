<script setup>
import {onMounted} from "vue";
import Echo from 'laravel-echo';
import Pusher from "pusher-js";

Pusher
onMounted(() => {
  let echo = new Echo({
    broadcaster: 'pusher',
    key: 'mykey',
    cluster: 'mt1',
    wsHost: window.location.hostName,
    wsPort: 6001,
    forceTls: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
  })

  echo.channel('drivers')
      .listen('TripStarted', (e) => {
        console.log(e)
      })
})
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Waiting for ride request
    </h1>
    <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
      <div class="bg-gray-100 px-4 py-5 sm:p-6">
        Map Should be here
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>