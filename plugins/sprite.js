const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')

const templateFunction = data => {
  const shared = `.ico {
  display: inline-block;
  background: url(${data.sprites[0].image}) center no-repeat;
  background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
}`

  const perSprite = data.sprites.map(function (sprite) {
    return `.ico-N {
  width: Wpx;
  height: Hpx;
  background-position: Xpx Ypx;
}`
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
  }).join('\n')

  return shared + '\n' + perSprite
}

// 一定要有sprites否则会报错
const spriteFn = (prefix = '~@/assets/image/') => {
  return new SpritesmithPlugin({
    src: {
      // 图标根路径
      cwd: path.resolve(__dirname, '../src/assets/sprites'),
      glob: '**/*.png'
    },
    target: {
      // 生成雪碧图目标路径与名称
      image: path.resolve(__dirname, '../src/assets/image/sprite.[hash:6].png'),
      css: [
        [path.resolve(__dirname, '../src/styles/sprite/sprite.less'), {
          format: 'function_based_template'
        }]
      ]
    },
    // 自定义模板
    customTemplates: {
      function_based_template: templateFunction
    },
    // 样式文件中引用雪碧图的相对位置路径配置
    apiOptions: {
      cssImageRef: prefix + 'sprite.[hash:6].png'
    },
    spritesmithOptions: {
      algorithm: 'binary-tree',
      padding: 3
    }
  })
}

module.exports = { spriteFn }
