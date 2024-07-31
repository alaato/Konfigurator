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

export function addAnzahlTastenToObject(object) {
    object.data.getProductListing.edges = object.data.getProductListing.edges.map(edge => {
        edge.node.AnzhalTatsen = edge.node?.Audio[0]?.features? edge.node?.Audio[0]?.features[0]?.text : '';
        return edge;
    });
}
addAnzahlTastenToJson("./data/aussenstationenV2D.json")
addAnzahlTastenToJson("./data/aussenstationenTcsBus.json")
