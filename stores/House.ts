import { defineStore } from 'pinia'
import { type House } from '~/utils/interfaces'
export const useHousesStore = defineStore({
  id: 'HousesStore',
  state: () => ({
    houses: [] as House[],
  }),
  actions: {
    addHouse() {
      this.houses.push({
        floors: [
          {
            apartments: [
              {
                indoorStation: {},
              }
            ]
          }
        ],
        outdoorStations: [{}],
      })
    },
    addFloor(houseIndex: number) {
      this.houses[houseIndex].floors.push({
        apartments: [{
          indoorStation: {},
        }],
      })
    },
    addApartment(houseIndex: number, floorIndex: number) {
      this.houses[houseIndex].floors[floorIndex].apartments.push({
        indoorStation: {},
      })
    },
    addIndoorStation(houseIndex: number, floorIndex: number, apartmentIndex: number, product: any) {
      this.houses[houseIndex].floors[floorIndex].apartments[apartmentIndex].indoorStation = product;
    },
    addOutdoorStation(houseIndex: number, product: any) {
      this.houses[houseIndex].outdoorStations.push(product)
    },
    deleteHouse(houseIndex: number) {
      this.houses.splice(houseIndex, 1)
    },
    deleteFloor(houseIndex: number, floorIndex: number) {
      this.houses[houseIndex].floors.splice(floorIndex, 1)
    },
    deleteApartment(houseIndex: number, floorIndex: number, apartmentIndex: number) {
      this.houses[houseIndex].floors[floorIndex].apartments.splice(apartmentIndex, 1)
    },
    deleteIndoorStation(houseIndex: number, floorIndex: number, apartmentIndex: number, stationIndex: number) {
      this.houses[houseIndex].floors[floorIndex].apartments[apartmentIndex].indoorStation.splice(stationIndex, 1)
    },
    deleteOutdoorStation(houseIndex: number, stationIndex: number) {
      this.houses[houseIndex].outdoorStations.splice(stationIndex, 1)
    },
    resetOutdoors(houseIndex: number) {
      this.houses[houseIndex].outdoorStations = []
    },
    resetFloors(houseIndex: number) {
      this.houses[houseIndex].floors = []
    },
    resetHouse(houseIndex: number) {
      this.resetOutdoors(houseIndex)
      this.resetFloors(houseIndex)
    },
    resetAllHouses() {
      this.houses = []
    },

  }
})
