<template>
  <div id="app">
    <main>
      <app-header/>
      <div class="main-content">
        <router-view>

        </router-view>
      </div>
      <footer>
        Aplikaciju izradio: Krunoslav Prekrat.
      </footer>
    </main>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'

export default {
  components: {
    AppHeader
  },

  data () {
    return {
      posts: [],
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">

html {
  height: 100%;
  position: relative;
}

body {
  padding: 24px 24px 0 24px;
  margin: 0;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  color: #555;
  
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  footer {
    padding: 16px 0;
    border-top: 1px solid #ddd;
  }


  .panel {
    margin: 12px;
    border-radius: 8px;
    background: white;
    padding: 16px;
    box-shadow: 3px 8px 28px rgba(0, 0, 0, 0.2);
  }

  .loading > * {
    display: none !important;
  }

  .loading:after {
    content: '';
    display: block;
    height: 100%;
    min-height: 50px;
    border-radius: 8px;
    animation: infinite 2s loading-gradient;
    width: 100%;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
  }

  .data-table.empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .data-table.empty > * {
    display: none;
  }

  .data-table.empty:before {
    content: 'Nema podataka...';
    color: #aaa;
  }

  .data-table {

    th {
      padding: 8px 0;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }

    thead {
      border-bottom: 2px solid #ccc;
    }

    td {
      padding: 6px 0;
    }

    tbody tr:hover {
      background: #eee;
    }

    .w-fixed {
      width: 140px;
    }

    .text-left {
      text-align: left;
    }

    .bar-chart {
      display: block;
      height: 6px;
      background: #bbb;
      border-radius: 3px;
      margin: 3px 0;
    }

    .bar-chart.alt {
      background: #faa;
    }

  }

  .legend {
    display: block;
    margin-top: 24px;
    padding: 12px;
    background: #ededed;
    border-radius: 8px;

    &:before {
      content: 'LEGENDA';
      font-weight: bold;
    }

    .legend-item {
      display: flex;
      margin: 4px 0;
      align-items: center;

      .legend-text {
        width: 200px;
      }

      .legend-bar {
        height: 6px;
        border-radius: 3px;
        flex: 1;
      }
    }

  }

@keyframes loading-gradient {
  0% {
    background: #fff;
  }
  50% {
    background: #eee;
  }
  100% {
    background: #fff;
  }
}

</style>
