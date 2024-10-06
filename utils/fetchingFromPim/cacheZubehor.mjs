import fs from "fs";
import out from "../../data/aussenstationen.json" with { type: "json" }
import indoor from "../../data/innenestationen.json" with { type: "json" }

const products = out.concat(indoor)
const FilterOptions = {
  id: true,
};

function cleanEmptyObjects(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      } else {
        cleanEmptyObjects(obj[key]);
      }
    }
  }
  return obj;
}

async function getZubehör(id) {
  const data = JSON.stringify({
    query:  `query getProduct($id: Int!) {
      getProduct(id: $id defaultLanguage: "de") {
          MNR
          fullpath
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
              parent {
                ... on object_Product {
                  MNR
                }
              }
              Gehaeuse {
                ... on csGroup {
                  features {
                    ... on csFeatureInput {
                      name
                      text
                    }
                    ... on csFeatureSelect {
                      name
                      selection
                    }
                  }
                }
              }
              Frontplatte {
                ... on csGroup {
                  features {
                    ... on csFeatureInput {
                      name
                      text
                    }
                    ... on csFeatureSelect {
                      name
                      selection
                    }
                  }
                }
              }
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
              TexteTK {
                features {
                    ... on csFeatureTextarea {
                    name
                    text
                    }
                }
              }
              FrontalAnsichtFrei {
                id
                ... on asset {
                  assetThumb: fullpath(thumbnail: "Konfigurator")
                }
              }
              Audio {
                  features {
                    ... on csFeatureInput {
                      name
                      text
                  }
                }
            }
  }
}`,
    variables: {
      id
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

  const product = await response.json();
  return product
}

function makeArray(){
const productsWithAcc = products.filter((product)=> product.HatZubehoer?.length > 0)
const IDS = productsWithAcc.map((product)=> product.HatZubehoer).flat()
return IDS
}

function RemoveSameValues(array){
const NoDuplicateArray = []
array.forEach((elem)=>{
  if(!NoDuplicateArray.includes(elem.id))
    NoDuplicateArray.push(elem.id)
})
return NoDuplicateArray
}
const idArray =  makeArray()
const neededIds = RemoveSameValues(idArray)

async function getAllZube(neededIds) {
  const zubehors = []
  for (let i = 0; i < neededIds.length; i++) {

    const zubehor = await getZubehör(neededIds[i] * 1)
    zubehors.push(zubehor.data.getProduct)    
  }
  return zubehors
}


const zubehors = await getAllZube(neededIds)
const jsonData = JSON.stringify(zubehors);

fs.writeFileSync("./data/Zubehoer.json", jsonData);