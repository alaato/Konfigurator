export interface House {
  floors?:Floor[];
  outdoorStations: {}[];
}
 export interface Floor{
  apartments : Apartment[]
 }

 export interface Apartment{
  indoorStations : any[]
 }
 export interface SelectedProducts {
    indoorProducts: {
      neededQuantity: number,
      SelectedQuantity: number,
      products: Array<any>
    },
    outdoorProducts: {
      neededQuantity: number,
      SelectedQuantity: number,
      products: Array<any>
    },
    accessories: {
      quantity: number,
      products: Array<any>
    },
    controlUnit: {
      quantity: number,
      product: any
    }
  }