import fs from 'fs';
export function addAnzahlTastenToJson(jsonPath) {
    const json = fs.readFileSync(jsonPath, 'utf8');
    const object = JSON.parse(json);
    object.data.getProductListing.edges = object.data.getProductListing.edges.map(edge => {
        edge.node.AnzhalTatsen = edge.node?.Audio[0]?.features? edge.node?.Audio[0]?.features[0]?.text : '';
        return edge;
    });
    const data = JSON.stringify(object);
    fs.writeFileSync(jsonPath, data);
}
export function removeArrayFromTKtext(arr){
  if(!arr)
    return 
  return arr[0]
}
export function addAnzahlTastenToObject(object) {
    object.data.getProductListing.edges = object.data.getProductListing.edges.map(edge => {
        const AnzhalTatsen  = edge.node?.Audio[0]?.features[0]?.text || edge.node?.Audio[0]?.features[4]?.text || null ;
        edge.node.AnzhalTatsen = AnzhalTatsen
        return edge;
    });
}
export function cleanEmptyObjects(obj) {
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

export function cleanNullValues(obj) {
  obj.data.getProductListing.edges.map((edge) => {
    edge.node.Audio[0].features = edge.node.Audio[0].features.filter(
      (feature) => feature
    );
  });
}
export function extractAudioFeatures(pimcoreObjects){
    const objects = pimcoreObjects.data.getProductListing.edges.map((edge) => {
        edge.node.Audio[0].features = edge.node.Audio[0].features?.filter(
          (feature) => feature
        );
      });
      return objects
}
export function extractGehaeuseFeatures(pimcoreObjects){
  const objects = pimcoreObjects.data.getProductListing.edges.map((edge) => {
      edge.node.Gehaeuse[0].features = edge.node.Gehaeuse[0].features?.filter(
        (feature) => feature
      );
    });
    return objects
}
export function extractFrontplatteFeatures(pimcoreObjects){
  const objects = pimcoreObjects.data.getProductListing.edges.map((edge) => {
      edge.node.Frontplatte[0].features = edge.node.Frontplatte[0].features?.filter(
        (feature) => feature
      );
    });
    return objects
}
export function extractDisplayEigenschaftenFeatures(pimcoreObjects){
  const objects = pimcoreObjects.data.getProductListing.edges.map((edge) => {
      edge.node.DisplayEigenschaften[0].features = edge.node.DisplayEigenschaften[0].features?.filter(
        (feature) => feature
      );
    });
    return objects
}
