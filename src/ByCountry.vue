<template>
  <div class="main-panel">
    <country-selector v-on:change-country="onChangeCountry"></country-selector>
    <!-- <img src="./assets/logo.png"> -->
    <div class="data-panel panel" v-bind:class="{ loading: loading }">
      <table class="data-table" v-bind:class="{ empty: data.length < 1 }">
        <thead>
          <tr>
            <th class="w-fixed">Datum</th>
            <th class="w-fixed">{{ getColumnTitleByStatus($route.params.type) }} (Novi)</th>
            <th>Grafički prikaz</th>
            <th class="w-fixed">{{ getColumnTitleByStatus($route.params.type) }} (Ukupno)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.Date">
            <td>{{ new Date(item.Date).toLocaleDateString() }}</td>
            <td>{{ index > 0 && item.Cases >= data[index - 1].Cases ? (item.Cases - data[index - 1].Cases) : item.Cases }}</td>
            <td>
              <div class="bar-chart" :style="{ 
                  width: ((index > 0 && item.Cases >= data[index - 1].Cases ? (item.Cases - data[index - 1].Cases)/maxValuePerDay : item.Cases/maxValue)*100) + '%' 
                }"></div>
              <div class="bar-chart alt" :style="{ width: ((item.Cases/maxValue)*100) + '%' }"></div>
            </td>
            <td>{{ item.Cases }}</td>
          </tr>
        </tbody>
      </table>
      <div class='legend'>
        <div class='legend-item'>
          <div class="legend-text">Po danu</div>
          <div class="legend-bar" style="background: #bbb;"></div>
        </div>
        <div class='legend-item'>
          <div class="legend-text">Sumarno</div>
          <div class="legend-bar" style="background: #faa;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
  .main-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .data-panel {
    flex: 1;
  }
</style>

<script>
import CountrySelector from './CountrySelector.vue';
import axios from 'axios';

export default {
  components: { CountrySelector },
  name: 'byCountry',
  data () {
    return {
      endpoint: "https://api.covid19api.com/total/country/{{country}}/status/{{status}}",
      selectedCountry: null,
      data: [],
      maxValue: 0,
      maxValuePerDay: 0,
      loading: false
    }
  },

  methods: {
    onChangeCountry: function (code) {
      this.selectedCountry = code;
      this.fetchCountryData();
    },

    fetchCountryData: function() {
      if (this.selectedCountry == null) return;
      this.data = [];
      this.loading = true;

      axios(this.endpoint
      .replace("{{country}}", this.selectedCountry)
      .replace("{{status}}", this.$route.params.type))
        .then(response => {
          this.maxValue = Math.max(...response.data.map((x) => x.Cases));
          this.maxValuePerDay = Math.max(...response.data.map(
            (x, i) => i > 0 ? x.Cases - response.data[i - 1].Cases : x.Cases)
            );
          this.data = response.data;
        })
        .catch(error => {
          console.error("Error while fetching country data", error);
        })
        .then(() => {
          this.loading = false;
        });
    },

    getColumnTitleByStatus: function(type) {
      switch (type) {
        case "confirmed": return "Potvrđeni";
        case "recovered": return "Izliječeni"; 
        case "deaths": return "Preminuli";
      }
      return "";
    }
  },

  watch: {
    $route() {
      this.fetchCountryData();
    }
  },
}
</script>
