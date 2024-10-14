import fs from "fs";
import getProducts from "./query.mjs";

const FilterOptions = {
  Paket1: true,
  Anlagenkonfigurator: "Ja",
};

const query = `query getProductListing($defaultLanguage: String! $filter: String!) {
              	getProductListing(defaultLanguage: $defaultLanguage filter: $filter) {
                	totalCount
                	edges {
                 	 node {
                      AnzahlISPaket
       				  MNR
					  KTXT
					  PERIODE1
					  PREISKNZ
					  Paket {
          		  	... on object_Product {
					  MNR
				  	}
				  } 
                }
              }
            }
        }`;

const pakets = await getProducts(FilterOptions, query);

const jsonProducts = JSON.stringify(pakets);
fs.writeFileSync("./data/pakets.json", jsonProducts);
