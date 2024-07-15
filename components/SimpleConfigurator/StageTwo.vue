<template>
	<div class="text-center">
		<h2 class="text-2xl">Select a Product</h2>
		<p>selected : {{ selectedProducts?.outdoorProducts?.SelectedQuantity }} / {{ selectedProducts?.outdoorProducts?.neededQuantity }}</p>
		<button v-if="remainingOutdoorProducts==0" @click="reset"
          class="inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-6 h-6" />
        </button>
		<div v-if="loading">
			...loading
		</div>
		<ProductGrid v-else :currentStage="'Aussenstation'" :products="data?.getProductListing.edges" />
	</div>
</template>


<script setup>
import ProductGrid from './ProductGrid.vue'
import gql from 'graphql-tag';
import { RotateCcw } from 'lucide-vue-next';

const goToStage = inject('goToStage')
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts} = storeToRefs(selectedProductsStore)
const remainingOutdoorProducts = computed(() => {
return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
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
				KTXT
				Audio1
				Video2
				IP1
				parent{
          			... on object_Product{
            		MNR
          		  }
        		}
				Audio {
				  id
				  name
				  features {
					... on csFeatureInput {
					  name
					  text
					}
				  }
				}
			  }
			}
		  }
		}
	  `;
const variables = {
	filter: JSON.stringify({
		Aussenstation: true,
		Kommunikationstechnologie4164: "TCS:BUS",
		Video2: true,
		IP1: false
	}),
	first: 30
};

// functions
const { result: data, loading } = useQuery(query, variables)
function reset(){
	selectedProductsStore.resetOutdoorProducts();
}
</script>
