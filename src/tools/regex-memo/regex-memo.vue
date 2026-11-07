<script setup lang="ts">
import { computed } from 'vue';
import { useThemeVars } from 'naive-ui';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import memoRaw from './regex-memo.content.md?raw';

const themeVars = useThemeVars();
const md = new MarkdownIt();
const rendered = computed(() => DOMPurify.sanitize(md.render(memoRaw)));
</script>

<template>
  <div v-html="rendered" />
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  overflow: auto;
}
::v-deep(table) {
  border-collapse: collapse;
}
::v-deep(table), ::v-deep(td), ::v-deep(th) {
  border: 1px solid v-bind('themeVars.textColor1');
  padding: 5px;
}
::v-deep(a) {
  color: v-bind('themeVars.textColor1');
}
</style>
