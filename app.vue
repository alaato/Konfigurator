<script setup lang="ts">
const { refreshSessionContext, sessionContext } = useSessionContext();

onMounted(() => {
  refreshSessionContext();
});

</script>

<template>
  <div id="app">
    <!-- <div>
      Items in the cart: {{ count }}<br />
      Total price: {{ totalPrice }}<br />
      <ol>
        <li v-for="cartItem in cartItems">
          {{ cartItem.label }} - ${{ cartItem.price.totalPrice }} - quantity {{ cartItem.quantity }}
        </li>
      </ol>
    </div> -->
    <!-- <Navabar></Navabar> -->
    <MainPage></MainPage>
     <!-- <TestProducts></TestProducts> -->
  </div>
</template>
<style>
@import "./style.css";
</style>
