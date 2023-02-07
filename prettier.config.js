module.exports = {
  printWidth: 80, // 单行输出（不折行）的（最大）长度
  tabWidth: 2, // 每个缩进级别的空格数
  useTabs: false, // 是否使用缩进符
  semi: false, // 是否在语句末尾打印分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 是否在对象属性添加空格
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  endOfLine: 'lf', // 换行符使用 lf,
  insertPragma: false, // 在文件的顶部插入一个 @format的特殊注释
  requirePragma: false // Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码
}
