<script setup>
import {useLocationStore} from "@/stores/location";
import {useRouter} from "vue-router";

const router = useRouter()
const location = useLocationStore()
const handleLocationChanged = (e) => {
  location.$patch({
    destination: {
      name: e.name,
      address: e.formatted_address,
      geometry: {
        lat: e.geometry.location.lat(),
        lng: e.geometry.location.lng(),
      }
    }
  })
}

const handleSubmitLocation = () => {
  console.log(';ss')
  if (location.destination.name.length) {
    router.push({
      name: 'map'
    })
  }
}
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Where are we going?
    </h1>
    <form action="#" @submit.prevent="handleSubmitLocation">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <GMapAutocomplete
                class="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                placeholder="My destination"
                @place_changed="handleLocationChanged"
            ></GMapAutocomplete>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 ">
          <button
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white"
              type="submit"
          >
            Find A Ride
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>