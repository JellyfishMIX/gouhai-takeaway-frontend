## 够嗨美食城点餐系统-说明文档(前端部分)
版本号 v1.0.0
> 下单⻚⾯链接: http://39.97.254.25:8080/gouhai-takeaway/#/    
> 后台管理⻚⾯链接: http://39.97.254.25:8080/gouhai-takeaway/#/management     
> github仓库页链接: https://github.com/JellyfishMIX/gouhai-takeaway-frontend      

> 本项目前后端分离开发，前端采用react相关技术栈

> 使用Facebook官方提供的create-react-app脚手架搭建

+ ###  团队成员：
  + 前端
    + 前台购物、下单界面，后台图片上传控件 -- CregskiN [CregskiN · GitHub](https://github.com/CregskiN)
    + 后台管理界面 -- JellyfishMIX [JellyfishMIX · GitHub](https://github.com/JellyfishMIX)
  + 后端
    + JellyfishMIX [JellyfishMIX · GitHub](https://github.com/JellyfishMIX)
  </br>
  
---
+ ### 技术点
  + 使用axios与后端交互
  + 组件化 
  + 使用redux-saga
  + 大量使用es6语法，代码简洁
  + webpack(内涵babel-load)解决语法兼容问题
  + 使用iconfont
  + Git团队开发
  </br>
  
+ ### 前端依赖包一览
  + view层
    + react基础组件：react,react-dom,react-scripts # 负责编译.jsx及挂载DOM
    + react-router-dom：^5.1.2 # 页面路由(SPA)
    + react-transition-group：^4.3.0  # 页面动画
    + antd：^3.25.2  # 第三方组件库
    </br>
    
  + module层
    + redux：^4.0.4 + redux-immutable：^4.0.0 # 管理+保护数据
    + react-redux：^7.1.1  # 连接module-view层
    + redux-saga：^1.1.1  # 异步action支持
    + axios：^0.19.0  # 与后端传输数据
    + dayjs：^1.8.17  # 处理unix时间戳
    </br>
    
  + 中间件
    + redux-thunk：^2.3.0  # 为Redux Devtools (chrome插件)提供支持 
    </br>
  + 包管理工具
    + npm # 运行源码需要配置node环境并执行 npm i -g yarn 与 yarn install
  </br>
  
+ ### 页面与功能实现
  + 点单页 /
    + 添加商品 + axios获取菜单
    </br>
  + 结算页 /Checkout
    + 结算 + axios发送订单信息 
    </br>
  + 管理界面 /Management
    + 商品管理 + axios获取并管理菜品
    + 添加商品 + axios添加商品并上传图片(FormData)
    + 查看订单/查看详情/确认送达 + axios与后端交互
    </br>
  
---
+ ### 目录结构
  + common # 公用组件
    + Header
    + Switch
  + images # 公用img
    + logo
  + pages # 各页面
    + AddCommodity
    + Checkout
    + Login
    + Management
    + ManagementCommodity
    + Order
    + SeeOrder
    + SeeOrderDetail
  + App.js # 根组件
  + Index.js # 入口文件
  + build # webpack打包后的bandle文件
  </br>
---
### 开发过程中遇到的问题及解决方案
1. immutable 不可变对象无法直接修改
 解决方案：
  使用toJS()转化为js对象，完成修改后使用fromJS()转为immutable对象，作为副本替换原immutable对象
   </br>
   
2. 过度渲染造成性能浪费
解决方案：
  使用react提供的PureComponent，对props数据**浅比较**。发现更改，重渲染，未更改，保持原样。
   </br>

3. 新增商品 图片需与商品信息一同上传
解决方案：
  需配合后端商定解决方案，本项目采用原生formData表单，axios直接发送的方案。
  </br>

---
### 未来迭代 v2.0.0 # TODO
Facebook官方更新react16，开始推行hooks写法，够嗨美食城(前端)v2.0.0将全面更新
+ 重构项
  + redux数据管理 -> reto数据管理
  + class组件 -> redux-hooks + function组件
  + 部分router跳转> 使用hidden-css代替
  </br>
  
+ 改进项
  + 副作用 移交 useEffect( ,[ ])实现
  </br>
  
  
  
  

