import fs from "fs";
import getProducts from "./query.mjs";

const FilterOptions = {
  Funktionserweiterung: true,
};

const query =   `query getProductListing($filter: String!) {
  getProductListing(filter: $filter defaultLanguage: "de") {
    totalCount
    edges {
      node {
       id
                MNR
                TEXT
                KTXT
                Geraeteart4077
                Kommunikationstechnologie4164
                Audio1
                Video2
                V2D
                TCSBUS
                Aufputz
                Unterputz
                VON1
                VON2
                VON3
                VON4
                BIS1
                BIS2
                BIS3
                BIS4
                PERIODE1
                PERIODE2
                PERIODE3
                PERIODE4
                PIWebsiteLink
                DBWebsiteLink
                PREISKNZ
                TexteTK {
                  features {
                      ... on csFeatureTextarea {
                      name
                      text
                      }
                  }
                }
                parent{
                          ... on object_Product{
                        MNR
                        }
                }
                Gehaeuse{
                    ... on csGroup{
                        features{
                          ... on csFeatureInput{
                            name
                            text
                          }
                          ... on csFeatureSelect{
                            name
                            selection
                          }
                    }
                  }
                }
                Frontplatte{... on csGroup{
                        features{
                          ... on csFeatureInput{
                            name
                            text
                          }
                          ... on csFeatureSelect{
                            name
                            selection
                          }
                    }
                }}
                NotwendigesZubehoerAudio {
                  ... on object_Product {
                    id
                  }
                }
                NotwendigesZubehoerVideo {
                  ... on object_Product {
                    id
                  }
                }
                Erweiterung {
                  ... on object_Product {
                    id
                  }
                }
                DisplayEigenschaften {
                  name
                  description
                }
                HatZubehoer {
                  ... on object_Product {
                    id
                  }
                }
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

const products = await getProducts(FilterOptions, query);
const jsonProducts = JSON.stringify(products);
fs.writeFileSync("./data/Funktionserweiterung.json", jsonProducts);