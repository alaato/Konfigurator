export interface House {
  floors?:Floor[];
  outdoorStations: {}[];
}
 export interface Floor{
  apartments : Apartment[]
 }

 export interface Apartment{
  indoorStation : any
 }