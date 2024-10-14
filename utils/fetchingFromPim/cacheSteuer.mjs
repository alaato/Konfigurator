import fs from "fs";
import getProducts from "./query.mjs";

const FilterOptions = {
    Steuergeraet: true,
  Anlagenkonfigurator: "Ja",
};

const query =  `query getProductListing($filter: String!) {
    getProductListing(filter: $filter defaultLanguage: "de") {
      totalCount
      edges
      {
      node{
              MNR
              Geraeteart4077
              Netzgeraet
              Steuergeraet
              PERIODE1
              TEXT
              KTXT
              PREISKNZ
              FrontalAnsichtFrei {
                    id
                    ... on asset {
                      assetThumb: fullpath(thumbnail: "Konfigurator")
                    }
                  }
          }
      }
    }
  }`;

const pakets = await getProducts(FilterOptions, query);

const jsonProducts = JSON.stringify(pakets);
fs.writeFileSync("./data/steuer.json", jsonProducts);
