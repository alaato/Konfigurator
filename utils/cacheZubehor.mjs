import fs from 'fs';
const FilterOptions = {
    Zubehoer1: true
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
      getProductListing(filter: $filter) {
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
            PERIODE1
            TEXT
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
      filter: JSON.stringify(FilterOptions)
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
  const jsonData = JSON.stringify(clean)
 fs.writeFileSync('./data/Zubehoer.json', jsonData);
}

getOutdoor()