import { defineStore } from 'pinia';

const useFloorsStore = defineStore('floors', {
  state: () => ({
    floors: [],
  }),
  actions: {
    addFloor() {
      this.floors.push({
        apartments: [{
          id: 1,
          stationImage: '',
        }]
      });
    },
    addFloors(count) {
      for (let i = 0; i < count; i++) {
        this.addFloor();
      }
      console.log(count)
    },
    addApartment(floorNumber) {
      this.floors[floorNumber - 1].apartments.push({
        id: this.floors[floorNumber - 1].apartments.length + 1,
        stationImage: '',
      });
    },
    addApartments(count, floorNumber) {
      for (let i = 0; i < count; i++) {
        this.addApartment(floorNumber);
      }
    },
    initilizeFloorsAndApartments(numberFloors, numberApartments) {
      this.floors.length = 0;
      this.addFloors(numberFloors);
      if (numberApartments > 0) {
        for (let i = 1; i <= numberFloors; i++) {
          this.addApartments(numberApartments - 1, i);
        }
      }
    },
    selectStation(floorNumber, apartmentId, station) {
      const apartment = this.floors[floorNumber - 1].apartments.find(
        (a) => a.id === apartmentId
      );
      apartment.stationImage = station.image;
    },
  },
});

export default useFloorsStore;