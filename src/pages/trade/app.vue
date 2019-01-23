<template>
  <v-app class="my-app">
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      width="200"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          :to="item.path"
          v-for="(item, i) in navs"
          :key="i"
        >
          <v-icon v-html="item.icon"></v-icon>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view class="px-3"/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 v1.7.3</span>
    </v-footer>

    <v-snackbar v-model="$store.state.showSnackbar" :timeout="4000" top>{{$store.state.snackbarText}}</v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: '交易管理',
      clipped: false,
      drawer: true,
      fixed: false,
      navs: [{
        icon: 'bubble_chart',
        path: '/channel',
        title: '支付通道管理'
      }],
      miniVariant: false,
      snackbarText: '',
      showSnackbar: false
    }
  },
  created() {
    this.$http.interceptors.response.use((res) => {
      let resData = res.data
      switch (resData.respcd) {
        case '0000':
          return resData.data
        default:
          this.$store.dispatch('setSnackbar', {
            showSnackbar: true,
            snackbarText: resData.respmsg
          })
          return resData
      }
    }, () => {
      this.showSnackbar = true
      this.snackbarText = '网络错误'
    })
  }
}
</script>

<style lang="scss">
.pagination-container {
  padding: 20px 0;
  text-align: right;
  .pagination-total, .v-pagination {
    vertical-align: middle;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 34px;
  }
  .v-input {
    display: inline-block;
    width: 140px;
    margin: 0 10px 0 20px;
  }
}
</style>
