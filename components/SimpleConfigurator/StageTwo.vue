<template>
	<div class="text-center">
		<h2 class="text-2xl">Select a Product</h2>
		<p>selected : {{ selectedProducts?.outdoorProducts?.SelectedQuantity }} / {{
			selectedProducts?.outdoorProducts?.neededQuantity }}</p>
		<button v-if="remainingOutdoorProducts == 0" @click="reset"
			class="inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</button>
		<div v-if="pending">
			...loading
		</div>
		<ProductGrid v-else :currentStage="'Aussenstation'" :products="products" />
	</div>
</template>


<script setup>
import ProductGrid from './ProductGrid.vue'
import gql from 'graphql-tag';
import { RotateCcw } from 'lucide-vue-next';

const goToStage = inject('goToStage')
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)
console.log(filter.value)
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
				Audio1
				Video2
				IP1
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

const FilterOptions = {
	Aussenstation: true,
}
if(filter.value.funktion == "Video")
	FilterOptions.Kommunikationstechnologie4164 =  filter.value.technologie
if(filter.value.Video)
	FilterOptions.Video2 = true

const variables = {		
	filter: JSON.stringify(FilterOptions),
	first: 100
};
console.log(variables)
// functions
const { data, pending, error } = await useLazyAsyncQuery(query, variables)
console.log(error.value, data.value)
let filteredProducts = [];
let products = null
watchEffect(() => {
	products = data.value?.getProductListing?.edges?.map(edge => edge.node);
	if (products) {
	filteredProducts = products.filter(product => {
		return product.Audio.some(audio => {
			return audio.features.some(feature =>
				feature.name === 'AnzahlKlingeltasten3938' && feature.text == '8'
			);
		});
	});
	console.log(filteredProducts);
}
console.log(products);
})

function reset() {
	selectedProductsStore.resetOutdoorProducts();
}
</script>
