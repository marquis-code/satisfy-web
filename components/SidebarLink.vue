<template>
  <div>
    <NuxtLink :to="to">{{label}}</NuxtLink>
  </divOh >
</template>

<script setup lang="ts">

const props = defineProps({
    to: {
        type: String
    },
    icon: {
        type: String
    },
    label: {
        type: String
    }
})
</script>