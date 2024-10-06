import fs from 'fs';
const FilterOptions = {
  Funktionserweiterung: true,
}
function cleanEmptyObjects(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      } else {
        cleanEmptyObjects(obj[key]);
      }
    }
  }
  return obj;
}
async function getOutdoor() {
  const data = JSON.stringify({
    query:  `query getProductListing($filter: String!) {
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
    }`,
    variables: {
      filter: JSON.stringify(FilterOptions),
defaultLanguage: "de"
    }
  });

  const response = await fetch(
    "https://pim.tcsapps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793",
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const json = await response.json();
  const clean = cleanEmptyObjects(json)
  const products = clean.data.getProductListing.edges.map((edge) => edge.node);
  const jsonData = JSON.stringify(products)
 fs.writeFileSync('./data/Funktionserweiterung.json', jsonData);
}

getOutdoor()