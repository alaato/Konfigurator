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
    getAllSelectedProducts: (state) => {
      const products: any = []
      Object.values(state.selectedProducts).forEach((category) => {
        if(category.products){
          products.push(...category.products)
        }
      })
      return products;
    },
    getRemainingOutdoorNeeded: (state) => state.selectedProducts.outdoorProducts.neededQuantity - state.selectedProducts.outdoorProducts.SelectedQuantity,
    getRemainingIndoorNeeded: (state) => state.selectedProducts.indoorProducts.neededQuantity - state.selectedProducts.indoorProducts.SelectedQuantity
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
      removeIndoorProducts(product) {
        const index = this.selectedProducts.indoorProducts.products.indexOf(product);
        if(index => 0){
          this.selectedProducts.indoorProducts.products.splice(index, 1)
          this.selectedProducts.indoorProducts.SelectedQuantity -= product.quantity
        }
      },
      removeOutdoorProducts(product) {
        const index : number = this.selectedProducts.outdoorProducts.products.indexOf(product);
        console.log(index, this.selectedProducts.outdoorProducts)
        if(index => 0){
          this.selectedProducts.outdoorProducts.products.splice(index, 1)
          this.selectedProducts.outdoorProducts.SelectedQuantity -= product.quantity
        }
        console.log(index, this.selectedProducts.outdoorProducts)
      },
      removeAccessories(product) {
        const index = this.selectedProducts.accessories.products.indexOf(product);
        if(index => 0){
          this.selectedProducts.accessories.products.splice(index, 1)
        }
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
