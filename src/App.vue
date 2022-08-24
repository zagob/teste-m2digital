<template>
  <div class="flex flex-col gap-6 max-w-[980px] mx-auto">
    <Category
      title="Internet"
      description="Selecione um plano de internet para continuar"
    >
      <div class="flex gap-4">
        <Product
          v-for="(product, index) in products.internet"
          :key="index"
          :product="product"
          @clickProduct="getProduct"
          @removeProduct="removeProductInternet"
          :selectedItem="productInternetSelected"
        />
      </div>
    </Category>
    <Category title="TV" description="Selecione uma TV">
      <div class="flex gap-4">
        <Product
          v-for="(product, index) in products.tv"
          :key="index"
          :product="product"
          @clickProduct="getProductTv"
          @removeProduct="removeProductTv"
          :selectedItem="productTvSelected"
          :disabledItems="!productInternetSelected?.id"
        />
      </div>
    </Category>

    <Category
      title="Fixo"
      description="Agora escolha seu pacote de telefone fixo"
    >
      <div class="flex gap-4">
        <Product
          v-for="(product, index) in products.fixo"
          :key="index"
          :product="product"
          @clickProduct="getProductFixo"
          @removeProduct="removeProductFixo"
          :selectedItem="productFixoSelected"
          :disabledItems="!productInternetSelected?.id"
        />
      </div>
    </Category>

    <div>
      <div>
        <div class="flex justify-between">
          <h5 class="text-gray-600">Taxa de instalação</h5>
          <span class="text-gray-500">Grátis</span>
        </div>
        <div class="font-bold text-purple-600 flex justify-between">
          <span>Total</span>
          <span
            >{{
              formatPriceCurrency(
                priceChange(
                  productInternetSelected?.price,
                  productTvSelected.price,
                  productFixoSelected.price
                )
              )
            }}/mês</span
          >
        </div>
      </div>

      <button
        type="button"
        class="w-[150px] text-gray-100 bg-gray-400 rounded-md py-2 mt-4 transition-all hover:bg-gray-500"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Category from "./components/Category.vue";
import Product from "./components/Product.vue";

import { formatPriceCurrency, priceChange } from "./utils/formatPriceAmount";
import { api } from "./services/axios";
import { Product as ProductInterface } from "./interfaces/Products";

export default defineComponent({
  name: "App",
  components: { Product, Category },
  data() {
    return {
      products: {
        internet: [],
        tv: [],
        fixo: [],
      },
      productInternetSelected: ({} as ProductInterface) || {},
      productTvSelected: ({} as ProductInterface) || {},
      productFixoSelected: ({} as ProductInterface) || {},
    };
  },
  mounted() {
    api
      .get("/internet")
      .then((response) => (this.products.internet = response.data));
    api.get("/tv").then((response) => (this.products.tv = response.data));
    api.get("/fixo").then((response) => (this.products.fixo = response.data));
  },
  methods: {
    setInput(id: number) {
      console.log(id);
    },
    getProduct(product: ProductInterface) {
      this.productInternetSelected = product;
    },
    getProductTv(product: ProductInterface) {
      this.productTvSelected = product;
    },

    getProductFixo(product: ProductInterface) {
      this.productFixoSelected = product;
    },
    removeProductTv() {
      this.productTvSelected = {} as ProductInterface;
    },
    removeProductFixo() {
      this.productFixoSelected = {} as ProductInterface;
    },
    removeProductInternet() {
      this.productInternetSelected = {} as ProductInterface;
      this.productTvSelected = {} as ProductInterface;
      this.productFixoSelected = {} as ProductInterface;
    },
  },
  setup() {
    return {
      formatPriceCurrency,
      priceChange,
    };
  },
});
</script>
