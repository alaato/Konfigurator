<template>
  <div>
    <p v-if="!pending">{{ data }}</p>
    <p>hello</p>
  </div>
</template>

<script lang="ts" setup>
import { gql } from 'graphql-tag';
const query = gql`
		query getProductListing($filter: String! defaultLanguage: "de", $first: Int) {
		  getProductListing(first: $first, filter: $filter) {
        totalCount
    edges {
      node {
        id
        MNR
        Kommunikationstechnologie4164
        Audio1
        Aussenstation
        Video2
        KTXT
        Zubehoer{
          ... on object_Product{
            MNR
          }
        }
        PERIODE1
        ME
        Video2
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

const variables = {
  filter: JSON.stringify(FilterOptions),
  first: 30,
};

// functions
const { data, pending, error } = await useLazyAsyncQuery(query, variables)
watchEffect(() => {
  console.log(data.value)
  console.log(error.value)
})
</script>

<style></style>