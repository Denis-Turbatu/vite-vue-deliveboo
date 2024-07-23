import { reactive } from "vue";

export const store = reactive({
  searchQuery: "",
  restaurantsArray: [],
  typologiesArray: [],
  urlBack: 'http://localhost:8000',
  imageBaseUrl: "http://127.0.0.1:8000/storage",
  storeRestaurantId: null,
  flagUpdating: false,
  cardNum: 0,
});
