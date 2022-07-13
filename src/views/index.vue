<template>
  <div class="w-20 h-20 border border-red-500">
    首页
    <div>{{ counter.count }}</div>
  </div>
</template>

<script lang="ts"  setup>
import { getIndex } from "@/api/index";
import { useCounterStore } from "@/store/user";

const counter = useCounterStore();
// with autocompletion ✨
counter.$patch({ count: counter.count + 1 });
// or using an action instead
counter.increment();

getIndex().then((res: Object) => {
  console.log(res);
});
</script>