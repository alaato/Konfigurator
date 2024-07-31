import { defineStore } from 'pinia'

export const useSelectedProductsStore = defineStore({
  id: 'SelectedProductsStore',
  state: () => ({
    filter: {
      funktion: "",
      technologie: "",
      Video: false
    },
    selectedProducts: {
      indoorProducts: {
        neededQuantity: 0,
        SelectedQuantity: 0,
        products: []
      },
      outdoorProducts: {
        neededQuantity: 1,
        SelectedQuantity: 0,
        products: []
      },
      accessories: {
        quantity: 0,
        products: []
      },
      controlUnit:
      {
        quantity: 1,
        product: null
      }
    },
  }),
  getters: {
    allSelectedProducts: (state) => {
      const products = []
      for (let category in state.selectedProducts) {
        console.log(state.selectedProducts[category].products, category)
        products.concat(state.selectedProducts[category].products)
      }
      return products;
    },
  },
    actions: {
      incrementOutdoorNeededQuantity(quantity: number) {
        this.selectedProducts.outdoorProducts.neededQuantity += quantity;
      },
      decrementOutdoorNeededQuantity(quantity: number) {
        this.selectedProducts.outdoorProducts.neededQuantity -= quantity;
      },
      resetOutdoorNeededQuantity() {
        this.selectedProducts.outdoorProducts.neededQuantity = 1;
      },
      incrementIndoorNeededQuantity(quantity: number) {
        this.selectedProducts.indoorProducts.neededQuantity += quantity;
      },
      decrementIndoorNeededQuantity(quantity: number) {
        this.selectedProducts.indoorProducts.neededQuantity -= quantity;
      },
      resetIndoorNeededQuantity() {
        this.selectedProducts.indoorProducts.neededQuantity = 0;
      },
      setNeededProductsQuantity(indoorQuanitity: number, outdoorQuanitity: number) {
        this.selectedProducts.indoorProducts.neededQuantity = indoorQuanitity;
        this.selectedProducts.outdoorProducts.neededQuantity = outdoorQuanitity;
      },
      addIndoorProducts(product, quantity: number) {
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.indoorProducts.products.push(product);
        }
        this.selectedProducts.indoorProducts.SelectedQuantity += quantity;
      },
      addOutdoorProducts(product, quantity) {
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.outdoorProducts.products.push(product);
        }
        this.selectedProducts.outdoorProducts.SelectedQuantity += quantity;
      },
      addOneOutdoorProduct(product) {
        this.selectedProducts.outdoorProducts.products.push(product);
        this.selectedProducts.outdoorProducts.SelectedQuantity += product.quantity;
      },
      addAccessories(product, quantity) {
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.accessories.products.push(product);
        }
        this.selectedProducts.accessories.quantity += quantity;
      },
      addControlUnit(product) {
        this.selectedProducts.controlUnit = product
      },
      removeIndoorProducts(product, quantity) {
        for (let i = 0; i < quantity; i++) {
          const index = this.selectedProducts.indoorProducts.products.indexOf(product);
          if (index >= 0) {
            this.selectedProducts.indoorProducts.products.splice(index, 1);
          }
        }
        this.selectedProducts.indoorProducts.SelectedQuantity -= quantity;
      },
      removeOutdoorProducts(product, quantity) {
        for (let i = 0; i < quantity; i++) {
          const index = this.selectedProducts.outdoorProducts.products.indexOf(product);
          if (index >= 0) {
            this.selectedProducts.outdoorProducts.products.splice(index, 1);
          }
        }
        this.selectedProducts.outdoorProducts.SelectedQuantity -= quantity;
      },
      removeAccessories(product, quantity) {
        for (let i = 0; i < quantity; i++) {
          const index = this.selectedProducts.accessories.products.indexOf(product);
          if (index >= 0) {
            this.selectedProducts.accessories.products.splice(index, 1);
          }
        }
        this.selectedProducts.accessories.quantity -= quantity;
      },
      resetControlUnit() {
        this.selectedProducts.controlUnit.product = null;
      },
      resetIndoorProducts() {
        this.selectedProducts.indoorProducts.products = [];
        this.selectedProducts.indoorProducts.SelectedQuantity = 0;
      },
      resetOutdoorProducts() {
        this.selectedProducts.outdoorProducts.products = [];
        this.selectedProducts.outdoorProducts.SelectedQuantity = 0;
      },
      resetAllProducts() {
        this.selectedProducts.indoorProducts.products = [];
        this.selectedProducts.indoorProducts.SelectedQuantity = 0;
        this.selectedProducts.outdoorProducts.products = [];
        this.selectedProducts.outdoorProducts.SelectedQuantity = 0;
        this.selectedProducts.accessories.products = [];
        this.selectedProducts.accessories.quantity = 0;
        this.selectedProducts.controlUnit.product = null;
      },
    }
  })
