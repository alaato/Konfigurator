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
		<ProductGrid v-else :currentStage="'Aussenstation'" :products="data?.getProductListing.edges" />
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
				KTXT
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
const variables = {		
	filter: JSON.stringify({
		Aussenstation: true,
		Kommunikationstechnologie4164: filter.value.technologie,
		Video2: filter.value.Video,
	}),
	first :30,
};

// functions
const { data, pending } = await useLazyAsyncQuery(query, variables)
watchEffect(() => {
	const products = data.value?.getProductListing?.edges?.map(edge => edge.node);
	if (products) {
	const filteredProducts = products.filter(product => {
		return product.Audio.some(audio => {
			return audio.features.some(feature =>
				feature.name === 'AnzahlKlingeltasten3938' && feature.text == '1'
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
