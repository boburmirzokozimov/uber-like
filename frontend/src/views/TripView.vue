<script setup>

</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Waiting on a driver...
    </h1>
    <form action="#" @submit.prevent="handleSubmitLocation">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <GMapMap
                :zoom="14"
                style="width: 100%;height: 256px;">
            </GMapMap>
          </div>
          <div class="mt-2">
            <span>When a driver accepts the trip,their info will appear here.</span>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<style scoped>

</style>