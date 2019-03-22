<template>
    <div>
      <nav-header></nav-header>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
          <nav class="nav-breadcrumb">
            <a href="/">Home</a>
            <span>Goods</span>
          </nav>
        </div>
      </div>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a @click="sortGoods" href="javascript:void(0)" class="price">Price 
              <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag,'sort-down':sortFlag}">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
                <dd v-for="(price, index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur': priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-bind:src="'/static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">
          请先登录！
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" @click="closeModal">关闭</a>
        </div>
      </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <span>加入购物车成功</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .sort-up, .sort-down{
    transform: rotate(180deg);
    transition: all .3s ease-out
  }
  .btn:hover{
    background-color: #ffe5e6;
    transition: all .3s ease-out
  }

</style>

<script>
import '@/assets/css/base.css'
import '@/assets/css/product.css'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Modal from '@/components/Modal'
import axios from 'axios'
import { debug } from 'util';
    export default{
        data(){
            return {
              goodsList: [],
              priceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'500.00'
                },{
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },{
                  startPrice:'1000.00',
                  endPrice:'2000.00'
                }
              ],
              priceChecked: 'all',
              priceLevel:'all',
              filterBy: false,
              overLayFlag: false,
              sortFlag: true,
              page: 1,
              pageSize:8,
              busy:true,
              count: -1,
              loading: true,
              mdShow: false,
              mdShowCart: false
            }
        },
        components:{
            NavHeader,
            NavFooter,
            Modal
        },
        mounted: function (){
          this.getGoodsList();
        },
        methods:{
          getGoodsList(flag){
            var param = {
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1,
              priceLevel: this.priceChecked
            }
            this.loading = true;
            axios.get("/goods/list",{params:param}).then((result)=>{
              var res = result.data;
              this.loading = false;
              if(res.status == "0"){
                if(flag){
                  this.goodsList = this.goodsList.concat(res.result.list);
                  console.log(res.result.count);
                  if(res.result.count == "0"){
                    this.busy = true;
                    this.count = 0;
                  }else{
                    this.busy = false;
                  }
                }else{
                  this.goodsList = res.result.list;
                  console.log(this.goodsList);
                  this.busy = false;
                }
                
              }else{
                this.goodsList = [];
              }
              
            });
          },
          sortGoods(){
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },
          showFilterPop(){
            this.filterBy = true;
            this.overLayFlag = true;
          },
          setPriceFilter(index){
            this.priceChecked = index;
            this.priceLevel = index;
            this.closePop();
            this.page = 1;
            this.getGoodsList();
            this.count = -1;
          },
          closePop(){
            this.filterBy = false;
            this.overLayFlag = false;
          },
          loadMore(){  
             if(this.count != 0){
              console.log("count=" + this.count);
              this.busy = true;
              setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
                this.busy = false;
              }, 500);
             }

          },
          addCart(productId){
            axios.post("/goods/addCart",{
              productId:productId
            }).then((res)=>{
              if(res.data.status == 0){
                this.mdShowCart = true;
              }else{
                this.mdShow = true;
              }
            });
          },
          closeModal(){
            this.mdShow = false;
          }
        }
    }
</script>
