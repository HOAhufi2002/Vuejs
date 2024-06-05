<template>
  <div class="alert">
    <h2>{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.alert {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
</style>
