<template>
  <div class="banner pa-3">
    <banner-add @ctrl="getList"/>
    <v-card flat class="mt-2">
    <v-data-table
      :headers="headers"
      :items="list"
      hide-actions
      class="elevation-1"
      :search="search"
      :loading="loading"
      :no-data-text="nodatatext"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.weight }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">
          <v-img @click="showImg(props.item.image)" :src='props.item.image' aspect-ratio="1.7" v-if="props.item.image"></v-img>
        </td>
        <td class="text-xs-center">
          <a target="blank" :href="props.item.url" v-if="props.item.url">{{props.item.url}}</a>
        </td>
        <td class="justify-center layout align-center">
          <v-switch v-model="props.item.up_lower" color="primary" :messages="props.item.up_lower ? '已上架' : '已下架'" @change="swit(props.item.up_lower, props.item.id)" class="justify-center"></v-switch>
          <banner-add :item="props.item" @ctrl="getList"/>
        </td>
      </template>
    </v-data-table>
    <div class="pagination-container">
      <span class="pagination-total">共 {{totalItems}} 条</span>
      <v-select
        :items="selectItems"
        height="20"
        label="10页/条"
        solo
        v-model="pageCount"
        @change="pagiChange"
      ></v-select>
      <v-pagination
        v-model="page"
        :length="pageNumber"
        :total-visible="7"
      ></v-pagination>
    </div>
    </v-card>
    <v-dialog
      v-model="imgShow" attach=".banner"
    >
      <v-card class="pa-0" d-flex>
        <img :src="src" alt="" style="max-width: 100%;">
      </v-card>
    </v-dialog>
    <shelf-ctrl type="ad" :visi="visi" :status="stat" :id="id" @close="close" @statusCtrl="statusCtrl" @ctrl="ctrl"/>
  </div>
</template>
<script>
import { ShelfCtrl, BannerAdd } from './common/index'
import Http from '@/http'
export default {
  data () {
    return {
      src: '',
      imgShow: false,
      headers: [
        { text: 'ID', align: 'center', sortable: false },
        { text: '权重', align: 'center', sortable: false },
        { text: '广告名称', align: 'center', sortable: false },
        { text: '图片', align: 'center', sortable: false },
        { text: '跳转链接', align: 'center', sortable: false },
        { text: '操作', align: 'center', sortable: false }
      ],
      search: '',
      list: [],
      showCtrl: false,
      page: 1,
      pageCount: 10,
      totalItems: '',
      selectItems: [{
        value: 10,
        text: '10条/页'
      }, {
        value: 20,
        text: '20条/页'
      }, {
        value: 50,
        text: '50条/页'
      }],
      nodatatext: '正在加载',
      loading: true,
      visi: false,
      stat: '',
      id: ''
    }
  },
  computed: {
    'pageNumber': function () {
      return Math.ceil(this.totalItems / this.pageCount)
    }
  },
  watch: {
    'page': function (val) {
      this.getList()
    }
  },
  methods: {
    close () {
      this.visi = false
    },
    statusCtrl () {
      this.list.map(item => {
        if (item.id === this.id) {
          item.up_lower = 1 ^ this.stat
        }
      })
    },
    ctrl () {
      this.list.map(item => {
        if (item.id === this.id) {
          item.up_lower = 0 ^ this.stat
        }
      })
    },
    swit (stat, id) {
      this.visi = true
      this.stat = stat
      this.id = id
    },
    pagiChange () {
      this.getList()
    },
    editItem (item) {
      this.item = item
      if (this.item.id) {
        this.edit = true
      }
    },
    showImg (src) {
      this.src = src
      this.imgShow = true
    },
    async getList () {
      let res = await Http.get(`/travel/banner/info?page=${this.page - 1}&pageSize=${this.pageCount}`)
      this.loading = false
      if (res && res.data) {
        if (res.data.respcd === '0000') {
          let list = [...res.data.data.list]
          this.list = [...list]
          if (this.list.length === 0) {
            this.nodatatext = '暂无数据'
          }
          // 设置分页
          this.totalItems = res.data.data.total
        } else {
          // 问题提示
          this.$store.dispatch('setAlert', {
            alert: true,
            alertContent: res.data.respmsg,
            alertType: 'error'
          })
        }
      }
    }
  },
  components: {
    ShelfCtrl,
    BannerAdd
  },
  created () {
    this.getList()
  }
}
</script>
<style scoped>
.flex-grow-4{flex-grow: 4!important;}
td{text-align: center;}
</style>
