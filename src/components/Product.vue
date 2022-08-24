<template>
  <div class="relative">
    <input type="radio" class="hidden" :id="product.name" />
    <span
      class="z-10 absolute text-white bg-red-500 hover:bg-red-400 hover:cursor-pointer rounded-full right-[-5px] top-[-5px] h-5 w-5 flex items-center justify-center"
      v-if="selectedItem?.id === product.id"
      @click="removeProduct"
    >
      <ph-x class="text-[16px] font-bold" />
    </span>
    <button
      :disabled="disabledItems"
      @click="productSelected"
      :for="product.name"
      :class="selectedItem?.id === product.id && 'bg-green-200 cursor-default'"
      class="border z-1 border-gray-300 px-2 w-[140px] rounded-lg flex flex-col items-start p-2 gap-2 transition-all hover:border-gray-400 hover:bg-green-200 hover:border-transparent relative disabled:opacity-30 disabled:bg-transparent disabled:cursor-not-allowed"
    >
      <div class="flex flex-col text-left w-full">
        <strong class="sm:text-base text-sm uppercase">{{
          product.name
        }}</strong>
        <strong class="sm:text-sm text-xs font-medium text-gray-800">{{
          formatPriceCurrency(product.price)
        }}</strong>
      </div>
      <span
        class="uppercase w-full text-xs text-right transition-all hover:text-gray-600 hover:cursor-pointer"
        >- detalhes</span
      >
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { formatPriceCurrency } from "@/utils/formatPriceAmount";
import { Product } from "@/interfaces/Products";

export default defineComponent({
  name: "ProductComponent",
  emits: ["clickProduct", "removeProduct"],
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    selectedItem: Object as PropType<Product>,
    disabledItems: Boolean,
  },
  methods: {
    productSelected(): void {
      this.$emit("clickProduct", this.product);
    },
    removeProduct() {
      this.$emit("removeProduct");
    },
  },
  setup() {
    return {
      formatPriceCurrency,
    };
  },
});
</script>
