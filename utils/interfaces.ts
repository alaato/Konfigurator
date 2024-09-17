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
  export type Product = {
    MNR: string,
    Geraeteart4077: string,
    Kommunikationstechnologie4164: string,
    Audio1: string,
    Video2: string,
    IP1: string,
    TEXT: string,
    V2D: string,
    TCSBUS: string,
    PERIODE1: string,
    parent: {
      MNR: string,
      
    },
    Audio: object,
    AnzhalTatsen: number
  }