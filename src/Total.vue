<template>
  <div class="main-panel">
    <div class="data-panel panel" v-bind:class="{ loading: loading }">
      <table class="data-table" v-bind:class="{ empty: data.length < 1 }">
        <thead>
          <tr>
            <th rowspan="2">Država</th>
            <th rowspan="2">Grafički prikaz</th>
            <th colspan="2">Potvrđeni</th>
            <th colspan="2">Izliječeni</th>
            <th colspan="2">Preminuli</th>
          </tr>
          <tr>
            <th>Novi</th>
            <th>Ukupno</th>
            <th>Novi</th>
            <th>Ukupno</th>
            <th>Novi</th>
            <th>Ukupno</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.Slug">
            <td class="text-left">{{ item.Country }}</td>
            <td>
                <div class="bar-chart confirmed" :style="{ width: (item.TotalConfirmed / max.confirmed * 100) + '%' }"></div>
                <!-- Disclaimer: Recovered data seems to be problematic (always 0), so this chart is hidden for now. -->
                <!-- <div class="bar-chart recovered" :style="{ width: (item.TotalRecovered / max.recovered * 100) + '%' }"></div> -->
                <div class="bar-chart deaths" :style="{ width: (item.TotalDeaths / max.deaths * 100) + '%' }"></div>
            </td>
            <td>
                {{ (item.NewConfirmed > 0 ? '+' : '') + item.NewConfirmed }}
            </td>
            <td>{{ item.TotalConfirmed }}</td>
            <td>{{ item.NewRecovered }}</td>  
            <td>{{ item.TotalRecovered }}</td>       
            <td :style="{ color: item.NewDeaths > 0 ? '#f66' : null }">
                {{ (item.NewDeaths > 0 ? '+' : '') + item.NewDeaths }}
            </td>
            <td>{{ item.TotalDeaths }}</td>
          </tr>
        </tbody>
      </table>
      <div class='legend'>
        <div class='legend-item'>
          <div class="legend-text">Potvrđeni</div>
          <div class="legend-bar confirmed"></div>
        </div>
        <div class='legend-item'>
          <div class="legend-text">Izliječeni</div>
          <div class="legend-bar recovered"></div>
        </div>
        <div class='legend-item'>
          <div class="legend-text">Preminuli</div>
          <div class="legend-bar deaths"></div>
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

  .bar-chart,
  .legend-bar {

    &.confirmed {
        background: skyblue;
    }

    &.recovered {
        background: khaki;
    }

    &.deaths {
        background: orange;
    }

  }
</style>

<script>
import axios from 'axios';

export default {
  name: 'total',
  data () {
    return {
      endpoint: "https://api.covid19api.com/summary",
      globalData: null,
      data: [],
      max: {
          confirmed: 0,
          recovered: 0,
          deaths: 0
      },
      loading: false
    }
  },

  methods: {

    fetchSummary: function() {
      this.loading = true;
      this.data = [];

      axios(this.endpoint)
        .then(response => {
            this.max = {
                confirmed: Math.max(...response.data.Countries.map(x => x.TotalConfirmed)),
                recovered: Math.max(...response.data.Countries.map(x => x.TotalRecovered)),
                deaths: Math.max(...response.data.Countries.map(x => x.TotalDeaths)),
            };
            this.data = response.data.Countries;
        })
        .catch(error => {
          console.error("Error while fetching summary data", error);
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

  mounted() {
      this.fetchSummary();
  }
}
</script>