import {defineStore} from 'pinia'
import {reactive} from "vue";

const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export const useLocationStore = defineStore('location', () => {
    const destination = reactive({
        name: '',
        address: '',
        geometry: {
            lat: null,
            lng: null
        }
    })

    const current = reactive({
        geometry: {
            lat: null,
            lng: null
        }
    })

    const updateCurrentLocation = async () => {
        const userLocation = await getUserLocation();

        current.geometry = {
            lat: userLocation.coords.latitude,
            lng: userLocation.coords.longitude
        }
    }
    return {destination, current, updateCurrentLocation}
})
