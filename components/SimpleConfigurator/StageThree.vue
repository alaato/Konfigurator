<template>
  <div class="text-center">
    <h2 >Select Compatible Product</h2>
    <p>selected : {{ selectedProducts.indoorProducts.SelectedQuantity }} / {{ selectedProducts.indoorProducts.neededQuantity }}</p>
    <button v-if="remainingIndoorProducts==0" @click="reset"
          class="inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-6 h-6" />
        </button>
    <div v-if="loading">
      ...loading
    </div>
    <ProductGrid v-else :products="data?.getProductListing.edges" />
  </div>
</template>

<script setup>
//imports
import ProductGrid from './ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';

//variables
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts} = storeToRefs(selectedProductsStore)
const remainingIndoorProducts = computed(() => {
  return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
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
        parent{
          ... on object_Product{
            MNR
          }
        }
      }
    }
  }
}
`;
const variables = {
  filter: JSON.stringify({
    Innenstation: true,
    Kommunikationstechnologie4164: "TCS:BUS"
  }),
  first: 30
};

// functions
const { result: data, loading } =  useQuery(query, variables)
console.log(data.value)
function reset(){
	selectedProductsStore.resetIndoorProducts();
}
</script>
