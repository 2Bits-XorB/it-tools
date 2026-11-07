<script setup lang="ts">
import { computed } from 'vue';
import { useThemeVars } from 'naive-ui';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';
import memoRaw from './git-memo.content.md?raw';

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
</style>
