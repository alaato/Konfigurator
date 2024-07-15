<template>
  <div>
    <p>There are {{ data?.getProductListing.totalCount || 0 }} products</p>
    <p>{{ data?.getProductListing.edges[0].node.id}}</p>

  </div>
</template>

<script setup>
import gql from 'graphql-tag';
const query = gql`
query {
  getProductListing(
    filter: "{'Aussenstation':true, 'Kommunikationstechnologie4164' : 'TCS:BUS', 'Video2': true, IP1: false}"
  ) {
    totalCount
    edges {
      node {
        MNR
        id
        }
        }
    }
}
`
const { loading, error, data  } = await useAsyncQuery(query)
console.log(error.value, data.value)
</script>

<style></style>