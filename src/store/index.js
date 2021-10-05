import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    sourceCompany: {
      name: "BINANCE",
      apiURL: "https://api.binance.com/api/v3/ticker/price",
      priceList: [],
    },
    targetCompanies: [
      {
        name: "BTCTURK",
        apiURL: "https://api.btcturk.com/api/v2/ticker",
        priceList: [],
      },
      {
        name: "BITTURK",
        apiURL: "https://api.bitturk.com/v1/ticker",
        priceList: [],
      },
    ],
  },
  getters: {},
  actions: {
    getPriceListOf({ commit }, company) {
      axios
        .get(company.apiURL)
        .then((res) => {
          let pairs = res.data.data ?? res.data;
          pairs = pairs.map((pair) => ({
            symbol: pair.symbol ?? pair.pair,
            price: pair.price ?? pair.last,
          }));
          commit("fillPriceList", { company, pairs });
        })
        .catch((err) => {
          console.warn(
            `${company.apiURL} adresine yapılan API isteği başarısız oldu`,
            err
          );
        });
    },
    getPriceLists({ state, dispatch }) {
      for (const company of state.targetCompanies) {
        dispatch("getPriceListOf", company);
      }
    },
  },
  mutations: {
    fillPriceList(state, { company, pairs }) {
      company.priceList = pairs;
    },
  },
});
