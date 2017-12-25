### 项目说明

 1. src目录结构说明：
     1.api--接口文件以及错误码处理
     2.app--项目源代码
     3.assets--静态资源（包括图片，样式）
     4.components--公共组件（可跨项目）
     5.router--路由文件（一级路由component是main，二级路由component是third）
     6.store--vuex文件夹
     7.utils--工具类

 2. app目录结构说明
	 1. common--页面公共组件（页头、页尾、侧边栏、面包屑等）
	 2. 其他文件夹--按功能划分

### 项目运行
 1. 克隆项目到本地--- git clone 项目地址
 2. 进入项目文件夹--- cd 项目文件夹
 3. 安装依赖---  npm install （如果报错，请试一下cnpm install）
 4. 项目运行--- npm run dev

### 注意事项
 1.  npm run build前请确保项目代码中没有console.log(注释掉就行)
 2. 一个代码块中有且仅有一个var、let
 3. 使用全等符号===进行比较
 4. 删掉不要用的变量声明
 5. 。。。
