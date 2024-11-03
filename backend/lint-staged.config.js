export default {
  '*.{js,cjs,mjs,md,json}': ['prettier --write'],
  '*.{js,cjs,mjs}': ['eslint --max-warnings 0 --fix'],
};
