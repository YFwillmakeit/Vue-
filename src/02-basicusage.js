import {init} from "snabbdom/src/package/init";
import {h} from "snabbdom/src/package/h";

// 任务2：div中放置子元素 h1，p

let patch = init([]);
let vnode = h('div',[
  h('h1','新创建h1中的内容'),
  h('p','新创建p中的内容')
]);
let app = document.querySelector('#app');

setTimeout(()=>{
  patch(app,vnode); // 三秒后更新界面
},3000);