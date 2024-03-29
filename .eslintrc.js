module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['standard'],
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    globals: {
        'router': true,
        'moment': true,
        'NProgress': true,
        'Vue': true,
        'ydgBridge': true
    },
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    'rules': {
        // 禁止生产环境带有调试语句
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 连续声明
        'one-var': [0, { var: 'always', let: 'always', const: 'never' }],
        // switch 必须带有default
        'default-case': 2,
        // 变量的解构赋值前后必须有空格
        'object-curly-spacing': [2, 'always'],
        // 模板字符串中使用${ 和 } 包含的表达式前后是否需要留空格
        'template-curly-spacing': ['error', 'always'],
        // 四个空格缩进,switch缩进风格
        'indent': [2, 4, { 'SwitchCase': 1 }],
        // 在进行比较时，必须使用全等=== 和完全不等!==
        'eqeqeq': [2, 'allow-null'],
        //大括号的样式,允许单行样式
        'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
        // 要求使用模板字面量而非字符串连接
        'prefer-template': 2,
        //函数()前不能有括号
        'space-before-function-paren': [2, 'never'],
        'no-unused-expressions': 0,
        'prefer-promise-reject-errors': 0,
        'no-useless-return': 0,
        'no-multiple-empty-lines': 0,
        'no-duplicate-imports': 0,
        'no-undef': 0,
        'no-useless-escape': 0
    }
}
