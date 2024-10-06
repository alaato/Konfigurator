export default function extractInfo(product: DeviceData) {
	const serie: string = product.parent?.MNR || "";

	const articleNumber: string = product.MNR || "";

	const height: string =
		product.Gehaeuse?.[0]?.features?.find((f) => f.name === "HoeheGehaeuse4716")
			?.text || "";
	const width: string =
		product.Gehaeuse?.[0]?.features?.find(
			(f) => f.name === "BreiteGehaeuse4717"
		)?.text || "";
		
	const depth: string =
		product.Gehaeuse?.[0]?.features?.find((f) => f.name === "TiefeGehaeuse4718")
			?.text || "";

	const dimensions: string =
		height && width && depth ? `${height}x${width}x${depth}` : "";

	const color: string =
		product.Gehaeuse?.[0]?.features?.find((f) => f.name === "FarbeGehaeuse4686")
			?.selection || "";

	const material: string =
		product.Gehaeuse?.[0]?.features?.find(
			(f) => f.name === "MaterialGehaeuse4017"
		)?.selection || "";

	const montageart: string = product.Unterputz && "Unterputz" || product.Aufputz && "Aufputz" || "";

	const price: number = product.PERIODE1;

	const grundfunktionen: string = product.Video2 && "Video" || product.Audio && "Audio"

	const technologie: string =  product.V2D && "V2D " || product.TCSBUS && " TCS:BUS" || product.V2D && product.TCSBUS && "V2D + TCS:BUS" || "";

	const anzahlTasten: string =
		product.Audio?.[0]?.features?.find(
			(f) => f.name === "AnzahlKlingeltasten3938"
		)?.text ||
		product.AnzhalTatsen ||
		"";

	return {
		Serie: serie,
		"Art.-Nr.": articleNumber,
		"H x B x T (mm)": dimensions,
		Farbe: color,
		Material: material,
		Montageart: montageart,
		Preis: price,
		Grundfunktionen: grundfunktionen,
		Technologie: technologie,
		"Anzahl Tasten": anzahlTasten,
	};
}
