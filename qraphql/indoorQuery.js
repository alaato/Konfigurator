import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const fetchIndoorStations = (filter) => {

    const query = gql`
query getProductListing($filter: String! defaultLanguage: "de", $first: Int) {
  getProductListing(first: $first, filter: $filter) {
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
}
`;

    const FilterOptions = {
        Innenstation: true,

    }
    if (filter.value.funktion == "Video")
        FilterOptions.Kommunikationstechnologie4164 = filter.value.technologie
    if (filter.value.Video)
        FilterOptions.Video2 = true

    const variables = {
        filter: JSON.stringify(FilterOptions),
        after: 10
    };

    const { result: indoorstations, loading } = useQuery(query, variables)
    return { result: indoorstations, loading }
}

export default fetchIndoorStations