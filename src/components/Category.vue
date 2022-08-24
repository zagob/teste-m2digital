<template>
  <div class="bg-gray-100 rounded-md p-2 flex flex-col gap-2">
    <div>
      <h2 class="text-lg text-purple-700">{{ title }}</h2>
      <span class="text-md text-gray-500">{{ description }}</span>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CategoryComponent",
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
});
</script>
