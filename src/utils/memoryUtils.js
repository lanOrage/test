import storageUtils from "./storageUtils"

const user = storageUtils.getUser()// 初始时取一次并保存为user
export default {
  user, // 用来存储登陆用户的信息, 初始值为local中读取的user
  product: {}, // 需要查看的商品对象，用来跳转查看商品详情时用上，因为两个组件间通信，前提要都存在，但是这个情况在于查看详情的那个组件还没创建所以根本无法获取产品信息，所以这里先暂存起来
}