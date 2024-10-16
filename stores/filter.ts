import { ref } from "vue";
import { defineStore } from "pinia";
import { setFilter } from "~/utils/ConfiguratorUtils/RequirementsUtils";

export const useFilterStore = defineStore(
  "myFilterStore",
  () => {
    const filter = ref({
      funktion: "",
      technologie: "",
      Video: false,
      Audio: false,
      color: "",
      material: "",
      anzahlTasten: 1,
    });
    function resetMyFilter() {
      filter.value = {
        funktion: "",
        technologie: "",
        Video: false,
        Audio: false,
        color: "",
        material: "",
        anzahlTasten: 1,
      };
    }

    function setFilter(filtervalues) {
      filter.value = { ...filter.value, ...filtervalues };
    }
    function setFunktion(funktion: string) {
      filter.value.funktion = funktion;
    }
    function setTechnologie(technologie: string) {
      filter.value.technologie = technologie;
    }
    function setVideo(video: boolean) {
      filter.value.Video = video;
    }
    function setAudio(audio: boolean) {
      filter.value.Audio = audio;
    }
    function setColor(color: string) {
      filter.value.color = color;
    }
    function setMaterial(material: string) {
      filter.value.material = material;
    }
    function setAnzahl(anzahlTasten: number) {
      filter.value.anzahlTasten = anzahlTasten;
    }

    return {
      filter,
      resetMyFilter,
      setFilter,
      setFunktion,
      setTechnologie,
      setVideo,
      setAudio,
      setColor,
      setMaterial,
      setAnzahl,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
    },
  }
);
