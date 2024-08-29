import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    sfcBlocks: {
      blocks: {
        styles: false,
      },
    },
    vueVersion: 2,
  },
  ignores: [
    'package.json',
    '.gitignore',
    'tsconfig.*.json',
    'tsconfig.json',
    'node_modules',
  ],
})
