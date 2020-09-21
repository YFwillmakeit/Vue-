/*
  snabbdom的核心库并不能处理元素的属性/样式/事件等，如果需要那就得使用模块
     常用模块：
        attributes：设置DOM元素的属性，使用setAttribute()
                    处理布尔类型的属性
        props：和attributes模块相似，设置DOM元素的属性 element[attr] = value
                不处理布尔类型的属性
        class: 切换类样式
               注意：给元素设置类样式是通过sel选择器
        dataset: 设置data-*的自定义属性
        eventlistener: 注册和移除事件
        style: 设置行内样式，支持动画
               delayed/remove/destroy
*/
import {init} from "snabbdom/src/package/init";
import {h} from "snabbdom/src/package/h";

// 1、引入模块
import {styleModule} from "snabbdom/src/package/modules/style";
import {eventListenersModule} from "snabbdom/src/package/modules/eventlisteners";

// 2、注册模块
let patch = init([
  styleModule,
  eventListenersModule
])

// 3、使用h()函数的第二个参数传入模块需要的数据（对象）
let vnode = h('div',{
  style: {
    backgroundColor: 'gray',
    color: 'pink'
  },
  on: {
    click: clickEvent
  }
},[
  h('h1','hello world'),
  h('p','我是p标签')
]);

function clickEvent() {
  alert('哈哈哈')
}

let app = document.querySelector('#app');
patch(app,vnode);