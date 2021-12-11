<template>
  <div class="country-selector panel" ref="panel">
    <span>Odaberite zemlju: </span>
    <select v-model="selectedCountry" v-on:change="$emit('change-country', selectedCountry)" ref="countrySelect">
      <option v-for="option in collection" 
          v-bind:key="option.Slug" 
          v-bind:value="option.Slug" >
        {{ option.Country }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
    .country-selector {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .country-selector > select {
      border: none;
      margin: 0 8px;
      border: 2px solid #eee;
      padding: 12px 8px;
      outline-color: #88ffdd;
    }
</style>

<script>
import axios from 'axios'

var countryCollection = [];

export default {
  data() {
    return {
      endpoint: "https://api.covid19api.com/countries",
      collection: () => countryCollection,
      selectedCountry: null
    }
  },
  
  methods: {
    getCountryList: function () {
      if (countryCollection.length > 0) {
        return this.fillSelectboxList();
      }

      axios(this.endpoint)
        .then(response => {
          countryCollection = response.data;
          this.fillSelectboxList();
        })
        .catch(error => {
          console.error("Error while fetching country list", error);
        })
    },

    getSelectedCountry: () => this.selectedCountry,

    fillSelectboxList: function () {
      this.collection = countryCollection;
      this.$refs.panel.classList.remove("loading");
    }
  },

  mounted() {
    this.getCountryList();
  },
}
</script>
