<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button id="increment-btn"
        class="flex justify-center my-5 mx-1 items-center  w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900 text-xl">
        +
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">

      <DialogHeader>
        <DialogTitle>wie viele Tasten</DialogTitle>
      </DialogHeader>

      <input class="text-center" defaultValue="1" type="number" :v-model="numberButtons">

      <DialogFooter>
        <DialogClose as-child>
          <Button @click="add">
            add
          </Button>
        </DialogClose>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
//import
import fetchOutdoorStations from '@/qraphql/outdoorQuery';

//consts
const numberButtons = useState("numberButtons", () => 1);
const productStore = useSelectedProductsStore()
const HousesStore = useHousesStore()
const { addOutdoorStation } = HousesStore
const { incrementOutdoorNeededQuantity } = productStore
const houseIndex: number = inject('houseIndex');
const selectedProductsStore = useSelectedProductsStore();
const { filter } = storeToRefs(selectedProductsStore)

let AnzahlTasten = numberButtons.value < 10 ? `0${numberButtons.value}` : `_____${numberButtons.value}`
interface FilterOptions {
  [key: string]: any
}
const filterOptions: FilterOptions = {
  Aussenstation: true,
  MNR: { "$like": `%${AnzahlTasten}%` }
}
if (filter.value.funktion == "Video")
  filterOptions.Kommunikationstechnologie4164 = filter.value.technologie
if (filter.value.Video)
  filterOptions.Video2 = true

const variables = {
  filter: JSON.stringify(filterOptions),
  first: 30,
};
const {result: products, loading} = fetchOutdoorStations(variables)

function add() {
  addOutdoorStation(houseIndex, {})
  incrementOutdoorNeededQuantity(1)
}
</script>

<style></style>