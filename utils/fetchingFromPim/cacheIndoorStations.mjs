import fs from "fs";
import { cleanEmptyObjects, removeArrayFromTKtext } from "./cacheUtils.mjs";
const FilterOptions = {
  Innenstation: true,
  Anlagenkonfigurator: "Ja",
};

async function getInnenstation() {
  const data = JSON.stringify({
    query: `query getProductListing($filter: String!) {
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
            parent{
                      ... on object_Product{
                    MNR
                    }
                }
            TexteTK {
                name
                description
                features {
                    __typename
                    ... on csFeatureTextarea {
                    name
                    text
                    id
                    }
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
  const products = clean.data.getProductListing.edges.map((edge) => {
    edge.node.TexteTK = removeArrayFromTKtext(edge.node.TexteTK);
    return edge.node
  });
  const jsonProducts = JSON.stringify(products);
  fs.writeFileSync("./data/innenestationen.json", jsonProducts);
}

getInnenstation();
