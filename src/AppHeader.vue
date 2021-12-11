<template>
  <header class="panel">
    <nav>
      <img src="./assets/logo.png" />
      <ul>
        <li><router-link class="nav-item" to="/total">Sve države</router-link></li>
        <li><router-link class="nav-item" to="/byCountry/confirmed">Potvrđeni</router-link></li>
        <li><router-link class="nav-item" to="/byCountry/recovered">Izliječeni</router-link></li>
        <li><router-link class="nav-item" to="/byCountry/deaths">Preminuli</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
    header {
        display: inline-flex;
        margin: 0 auto !important;
        flex-direction: row;
        justify-content: center;

        nav {

            img {
              height: 42px;
              width: 42px;
              display: inline-block;
              vertical-align: middle;
            }

            ul {
                display: inline-block;
                margin: 0;
                list-style-type: none;
                padding: 0;

                li {
                    display: inline-block;
                    margin: 0 10px;
                }

                .nav-item {
                    padding: 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    text-decoration: none;
                    color: #555;
                    display: block;
                }

                .nav-item:hover {
                    background: rgba(0, 0, 0, 0.15);
                }

                .nav-item.router-link-exact-active {
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.24);
                    background: rgba(0, 0, 0, 0.05);
                }
            }

        }

       
    }
</style>