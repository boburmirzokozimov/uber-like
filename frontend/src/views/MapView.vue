<script setup>
import {useLocationStore} from "@/stores/location";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import http from "@/helpers/http";

const router = useRouter()
const location = useLocationStore()

const gMap = ref()

onMounted(async () => {
  if (location.destination.name === '') {
    router.push({
      name: 'location',
    })
  }

  await location.updateCurrentLocation()

  gMap.value.$mapPromise.then((mapObject) => {
    let currentPoint = new google.maps.LatLng(location.current.geometry),
        destinationPoint = new google.maps.LatLng(location.destination.geometry),
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({map: mapObject})

    directionsService.route({
      origin: currentPoint,
      destination: destinationPoint,
      avoidTolls: false,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, (res, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res)
      } else {
        console.error(status)
      }
    })
  })
})

const handleConfirmTrip = () => {
  http().post('/api/trip', {
    origin: location.current.geometry,
    destination: location.destination.geometry,
    destination_name: location.destination.name
  })
      .then((res) => {
        router.push({
          name: 'trip'
        })
      })
      .catch((err) => {
        console.error(err)
      })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="text-3xl font-semibold mb-4">
      Here is your trip
    </h1>
    <form action="#" @submit.prevent="handleSubmitLocation">
      <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
        <div class="bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <GMapMap
                ref="gMap"
                :center="location.destination.geometry"
                :zoom="11"
                style="width: 100%;height: 256px;">
              <GMapMarker :position="location.destination.geometry"/>
            </GMapMap>
          </div>
          <div class="mt-2">
            <p class="text-xl">Going to <strong v-text="location.destination.name"></strong></p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 ">
          <button
              class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-2 text-white"
              type="button"
              @click="handleConfirmTrip"
          >
            Let's Go!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>