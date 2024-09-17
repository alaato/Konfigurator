import fs from 'fs';

const FilterOptions = {
  Innenstation: true,
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
function removeEmpty(arr) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
async function getInnenstation(id) {
  const data = JSON.stringify({
    query:  `query getProductListing($filter: String!) {
      getProductListing(filter: $filter defaultLanguage: "de") {
        totalCount
        edges {
          node {
            id
            MNR
            Geraeteart4077
            Kommunikationstechnologie4164
            Audio1
            Video2
            IP1
            TEXT
            PERIODE1
            FrontalAnsichtFrei{
              id
            }
            parent{
                ... on object_Product{
                MNR
                }
            }
            Audio{
              ... on csGroup{
                features{
                  ... on csFeatureInput{
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
defaultLanguage: "de"
    }
  });

  const response = await fetch(
    'https://devpim.tcs-apps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793',
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
  clean.data.getProductListing.edges.map(edge => {
    edge.node.Audio[0].features = edge.node.Audio[0].features.filter(feature => feature)
  })
  const products = clean.data.getProductListing.edges.map(edge => edge.node)
  const jsonProducts = JSON.stringify(products)
 fs.writeFileSync('./data/innenestationen.json', jsonProducts);
}



getInnenstation(1);

