import fs from "fs";
import out from "../../data/aussenstationen.json" with { type: "json" }
import { addAnzahlTastenToObject, cleanEmptyObjects, extractAudioFeatures } from "./cacheUtils.mjs";
const FilterOptions = {
	MNR: {'$like' :'%AVA%'},
	TCSBUS: true
};
async function getOutdoor() {
  const data = JSON.stringify({
    query: `query getProductListing($defaultLanguage: String! $filter: String!) {
              getProductListing(defaultLanguage: $defaultLanguage filter: $filter) {
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
                      Audio {
                      ... on csGroup {
                        features {
                          ... on csFeatureInput {
                            name
                            text
                          }
                       }
                    }
                }
              }
            }
          }
        }`,
    variables: {
      filter: JSON.stringify(FilterOptions),
      defaultLanguage: "de",
    },
  });

  const response = await fetch(
    "https://pim.tcsapps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793",
    {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();
  const clean = cleanEmptyObjects(json);
  extractAudioFeatures(clean);
  addAnzahlTastenToObject(clean);
  const products = clean.data.getProductListing.edges.map((edge) => edge.node);
  const jsonProducts = JSON.stringify(products);
  fs.writeFileSync("./data/PesPro.json", jsonProducts);
}

function cleanDuplicateEntries(arr) {
    const uniqueObjects = {};
    arr.forEach(obj => {
        if (obj.MNR in uniqueObjects) {
            // If duplicate found, remove the object
            delete arr[arr.indexOf(obj)];
        } else {
            uniqueObjects[obj.MNR] = obj;
        }
    });
    return arr.filter(obj => obj); // Remove any empty slots left after deleting duplicates
}
const clean = cleanDuplicateEntries(out)
const jsonProducts = JSON.stringify(clean);
fs.writeFileSync("./data/aussenstationen.json", jsonProducts);
