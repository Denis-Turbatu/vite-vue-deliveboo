import { reactive } from "vue";

export const store = reactive({
  searchQuery: "",
  restaurantsArray: [],
  typologiesArray: []
});
