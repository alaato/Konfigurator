import fs from 'fs';

const FilterOptions = {
    Steuergeraet: true 
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
        query: `query getProductListing($filter: String!) {
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
            filter: JSON.stringify(FilterOptions)
        }
    });

    const response = await fetch(
        'https://pim.tcsapps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793',
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();
    const jsonData = JSON.stringify(json)
    fs.writeFileSync('./data/steuer.json', jsonData);
}

getOutdoor()