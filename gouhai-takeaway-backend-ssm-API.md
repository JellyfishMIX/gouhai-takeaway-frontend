### gouhai-takeaway-backend-ssm API

1. **获取商品列表**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/commodity/getcommoditylist

   Method: GET

   Response:
   
   ```
   {
     id: long,	// 商品Id
     name: String,	// 商品名字
     originalPrice: int,	// 原价
     currentPrice: int,	// 现价
     enable: boolean,	// 是否可见
     describe: String,	// 商品描述
     sum: int,	// 商品选购总和
     isUnderRevision: boolean,	// 是否处于编辑模式下
     isSeeMore: boolean,	// 是否处于气泡"查看更多"状态
     imgURL: String	// 图片地址
   }
   ```



2. **新增商品**

   URL:  http://39.97.254.25:8080/gouhai-takeaway/api/commodity/addcommodity

   Method: POST

   Parameters:

   ```
   {
     name: String,	// 商品名字
     originalPrice: int,	// 原价
     currentPrice: int,	// 现价
     enable: boolean,	// 是否可见
     describe: String,	// 商品描述
     sum: int,	// 商品选购总和
     isUnderRevision: boolean,	// 是否处于编辑模式下
     isSeeMore: boolean,	// 是否处于气泡"查看更多"状态
     imgURL: String	// 图片地址
   }
   ```

   

3. **修改商品**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/commodity/updatecommodity

   Method: POST

   Parameters:

   ```
   {
     id: long,	// 商品Id
     name: String,	// 商品名字
     originalPrice: int,	// 原价
     currentPrice: int,	// 现价
     enable: boolean,	// 是否可见
     describe: String,	// 商品描述
     sum: int,	// 商品选购总和
     isUnderRevision: boolean,	// 是否处于编辑模式下
     isSeeMore: boolean,	// 是否处于气泡"查看更多"状态
     imgURL: String	// 图片地址
   }
   ```



4. **删除商品**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/commodity/deletecommodity

   Method: POST

   Parameters:

   ```
   {
     id: long	// 商品Id
   }
   ```



5. **新增订单**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/order/addorder

   Method: POST

   Parameters:

   ```
   {
     customerName: String,	// 顾客姓名
     customerPhone: String,	// 顾客手机号，请注意，该属性的值的数据类型为字符串
     customerAddr: String,	// 顾客地址
     totalPrice: int,	// 总价
     createTime: Date,	// 下单日期时间
     isArrived: boolean,	// 订单是否已送达，默认为false即可
     // 订单已购商品列表
     orderCommodityList: [{
       commodityName: String,	// 商品名字
       originalPrice: int, // 原价
       unitPrice: int,	// 单价，即现价
       quantity: int,	// 数量
       totalPrice: int	// 单项合计
     },{
       commodityName: String,	// 商品名字
       originalPrice: int, // 原价
       unitPrice: int,	// 单价，即现价
       quantity: int,	// 数量
       totalPrice: int	// 单项合计
     }]
   }
   ```



6. **获取订单列表**

   URL:  http://39.97.254.25:8080/gouhai-takeaway/api/order/getorderlist

   Method: GET

   Response:

   ```
   {
   	orderId: long,	// 订单Id
     customerName: String,	// 顾客姓名
     customerPhone: String,	// 顾客手机号，请注意，该属性的值的数据类型为字符串
     customerAddr: String,	// 顾客地址
     totalPrice: int,	// 总价
     createTime: Date,	// 下单日期时间
     isArrived: boolean,	// 订单是否已送达
     // 订单已购商品列表
     orderCommodityList: [{
       orderCommodityId: long,	// 订单商品Id
       commodityName: String,	// 商品名字
       originalPrice: int, // 原价
       unitPrice: int,	// 单价，即现价
       quantity: int,	// 数量
       totalPrice: int,	// 单项合计
       orderId: long	// 此订单商品的所属订单的Id
     },{
     	orderCommodityId: long,	// 订单商品Id
       commodityName: String,	// 商品名字
       originalPrice: int, // 原价
       unitPrice: int,	// 单价，即现价
       quantity: int,	// 数量
       totalPrice: int,	// 单项合计
       orderId: long	// 此订单商品的所属订单的Id
     }]
   }
   ```



7. **修改订单状态为已送达**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/order/modifyordertoarrived

   Method: POST

   Parameters: 

   ```
   {
   	orderId: long	// 订单Id
   }
   ```

   

8. **删除订单**

   URL: http://39.97.254.25:8080/gouhai-takeaway/api/order/deleteorder

   Method: POST

   Parameters:

   ```
   {
   	orderId: long	// 订单Id
   }
   ```

