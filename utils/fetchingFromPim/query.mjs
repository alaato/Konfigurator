import fs from "fs";
import {
  cleanEmptyObjects,
  cleanNullValues,
  extractNodes,
} from "./cacheUtils.mjs";
export default async function getProducts(FilterOptions, query) {
  const data = JSON.stringify({
    query: query,
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
  const products = extractNodes(clean);
  console.log(products);

  return products;
}
