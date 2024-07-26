<template>
  <Card class="Outdoor-container w-1/2 h-[500px] 2xl:h-[600px]">
    <CardContent>
      <div class="floors-action flex justify-start">
        <button id="increment-btn" @click="add"
          class="flex justify-center my-5 mx-1 items-center  w-12 h-12 rounded-full text-white focus:outline-none  hover:bg-arapawa-900 text-xl">
          +
        </button>
        <button id="increment-btn" @click="reset"
          class="flex justify-center items-center my-5 mx-1 w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-5 h-5" />
        </button>
      </div>
      <div class="flex content-start overflow-y-auto w-full h-[400px] 2xl:h-[500px] flex-wrap">
        <OutdoorStation v-for="(station, index) in outdoorStations" :index="index" :key="index">
        </OutdoorStation>
      </div>
    </CardContent>
  </Card>
</template>

<script  setup>
//imports
import { RotateCcw } from 'lucide-vue-next';
import OutdoorStation from './OutdoorStation.vue';

// consts
const props = defineProps({
  outdoorStations: Array,
})

const productStore = useSelectedProductsStore()
const HousesStore = useHousesStore()
const { addOutdoorStation, resetOutdoors} = HousesStore
const {incrementOutdoorNeededQuantity, resetOutdoorNeededQuantity} = productStore
const houseIndex  = inject('houseIndex');
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)
const query = gql`
		query getProductListing($filter: String!, $first: Int) {
		  getProductListing(first: $first, filter: $filter) {
			totalCount
			edges {
			  node {
				id
				MNR
				Geraeteart4077
				Kommunikationstechnologie4164
				Audio1
				Video2
				IP1
				PERIODE1
				parent{
          			... on object_Product{
            		MNR
          		  }
        		}
				Audio{
          		... on csGroup{
            		features{
              		... on csFeatureInput{
                		name
                		text
              			}	
            		}
          		  }
        		}
			  }
			}
		  }
		}
	  `;

let AnzahlTasten = selectedProducts.value.indoorProducts.neededQuantity <10 ? `0${selectedProducts.value.indoorProducts.neededQuantity}` : `_____${selectedProducts.value.indoorProducts.neededQuantity}`

const FilterOptions = {
	Aussenstation: true,
	MNR :  {"$like" :`%${AnzahlTasten}%`}
}
if(filter.value.funktion == "Video")
	FilterOptions.Kommunikationstechnologie4164 =  filter.value.technologie
if(filter.value.Video)
	FilterOptions.Video2 = true

const variables = {
	filter: JSON.stringify(FilterOptions),
	first: 30,
};
const { data, pending, error } = await useLazyAsyncQuery(query, variables)


//funktions
function add() {
  addOutdoorStation(houseIndex, {})
  incrementOutdoorNeededQuantity(1)
}

function reset() {
  resetOutdoorNeededQuantity()
  resetOutdoors(houseIndex)
}
</script>

<style></style>