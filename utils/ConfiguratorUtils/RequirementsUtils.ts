import steuer from '@/data/steuer.json'

export function setFilter(filter, funktion:string, technologie:string, numberIndoorStation:number) {

	filter.funktion = funktion
	funktion == "Video"? filter.Video = true : filter.Video = null;
	funktion == "Audio"? filter.Audio = true : filter.Audio = null;
	if(funktion == "Beide")
		filter.Audio = filter.Video = true
	if (technologie == "Video-6-Draht" && (funktion == "Video" || funktion == "Beide") || numberIndoorStation > 24) {
		filter.technologie = "TCS:BUS"
	}
	else
		filter.technologie = "Video-2-Draht"
}

export function setControlUnit(filter, addControlUnit:Function) {
	let mnr: string;
	if (filter.funktion == "Audio") mnr = "BVS20-SG"
	else if (filter.technologie == "Video-2-Draht") mnr = "NVV1000-0400"
	else if (filter.technologie == "TCS:BUS") mnr = "NBV2600-0400"

	const unit = steuer.find(product => product.MNR == mnr)
	addControlUnit(unit)
}
