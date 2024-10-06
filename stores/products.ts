import { defineStore } from "pinia";
import { type DeviceData } from "@/utils/interfaces";

export const useSelectedProductsStore = defineStore({
  id: "SelectedProductsStore",
  state: () => {
    return {
      filter: {
        funktion: "",
        technologie: "",
        Video: false,
        Audio: false,
      },
      selectedProducts: {
        indoorProducts: {
          neededQuantity: 0,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        outdoorProducts: {
          neededQuantity: 1,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        accessories: {
          quantity: 0,
          products: [] as DeviceData[],
          SelectedQuantity: 0,
        },
        extensions: {
          neededQuantity: 0,
          SelectedQuantity: 0,
          products: [] as DeviceData[],
        },
        controlUnit: null as DeviceData | null,
      },
    };
  },
  getters: {
    getAllSelectedProducts: (state) => {
      const products: DeviceData[] = [];
      Object.values(state.selectedProducts).forEach((category) => {
        if (category.products) {
          products.push(...category.products);
        }
      });
      return products;
    },
    getRemainingOutdoorNeeded: (state) =>
      state.selectedProducts.outdoorProducts.neededQuantity -
      state.selectedProducts.outdoorProducts.SelectedQuantity,
    getRemainingIndoorNeeded: (state) =>
      state.selectedProducts.indoorProducts.neededQuantity -
      state.selectedProducts.indoorProducts.SelectedQuantity,
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
    setNeededProductsQuantity(
      indoorQuanitity: number,
      outdoorQuanitity: number,
      extensionsQuantity?: number
    ) {
      this.selectedProducts.indoorProducts.neededQuantity = indoorQuanitity;
      this.selectedProducts.outdoorProducts.neededQuantity = outdoorQuanitity;
      this.selectedProducts.extensions.neededQuantity = extensionsQuantity
        ? extensionsQuantity
        : 0;
    },
    setNeededExtensions(extensionsQuantity) {
      this.selectedProducts.extensions.neededQuantity = extensionsQuantity;
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
    addExtension(product, quantity) {
      const AddedProduct = this.selectedProducts.extensions.products.find((p) => p.MNR === product.MNR)
      if (AddedProduct) AddedProduct.quantity += quantity;
      else{
        for (let i = 0; i < quantity; i++) {
          this.selectedProducts.extensions.products.push(product);
        }
      }

      this.selectedProducts.extensions.SelectedQuantity += quantity;
    },
    addOneOutdoorProduct(product) {
      const AddedProduct = this.selectedProducts.outdoorProducts.products.find((p) => p.MNR === product.MNR)
      if (AddedProduct) AddedProduct.quantity++;
      else this.selectedProducts.outdoorProducts.products.push(product);
      this.selectedProducts.outdoorProducts.SelectedQuantity++;
    },
    addAccessories(product) {
      this.selectedProducts.accessories.products.push(product);
      this.selectedProducts.accessories.quantity += product.quantity;
    },
    addControlUnit(product) {
      this.selectedProducts.controlUnit = { ...product, quantity: 1 };
    },
    removeIndoorProducts(product) {
      const index =
        this.selectedProducts.indoorProducts.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.indoorProducts.SelectedQuantity -=
        product.quantity;
        this.selectedProducts.indoorProducts.products.splice(index, 1);
      }
    },
    removeExtension(product) {
      const index = this.selectedProducts.extensions.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.extensions.products.splice(index, 1);
        this.selectedProducts.extensions.SelectedQuantity -= product.quantity;
      }
    },
    removeOutdoorProducts(product) {
      const index: number =
        this.selectedProducts.outdoorProducts.products.indexOf(product);
      console.log(index, this.selectedProducts.outdoorProducts);
      if (index !== -1) {
        this.selectedProducts.outdoorProducts.products.splice(index, 1);
        this.selectedProducts.outdoorProducts.SelectedQuantity -=
          product.quantity;
      }
    },
    removeAccessories(product) {
      const index = this.selectedProducts.accessories.products.indexOf(product);
      if (index !== -1) {
        this.selectedProducts.accessories.products.splice(index, 1);
      }
    },
    resetControlUnit() {
      this.selectedProducts.controlUnit = null;
    },
    resetIndoorProducts() {
      this.selectedProducts.indoorProducts.products = [];
      this.selectedProducts.indoorProducts.SelectedQuantity = 0;
    },
    resetAccessories() {
      this.selectedProducts.accessories.products = [];
      this.selectedProducts.accessories.quantity = 0;
    }, 
    resetOutdoorProducts() {
      this.selectedProducts.outdoorProducts.products = [];
      this.selectedProducts.outdoorProducts.SelectedQuantity = 0;
    },
    resetExtension() {
      this.selectedProducts.extensions.products = [];
      this.selectedProducts.extensions.SelectedQuantity = 0;
    },
    resetAllProducts() {
      this.resetIndoorProducts();
      this.resetOutdoorProducts();
      this.resetControlUnit();
      this.resetExtension();
      this.resetAccessories();
      this.resetControlUnit();
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
