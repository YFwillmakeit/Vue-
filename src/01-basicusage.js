import {init} from "snabbdom/src/package/init";
import {h} from "snabbdom/src/package/h";
import {thunk} from "snabbdom/src/package/thunk";

// 1、任务：界面上显示helloworld

// init：
//    参数：数组，数组里面放模块
//    返回值：patch函数，作用：对比两个vnode的差异，更新到真实DOM
let patch = init([]);

// h: 返回一个vnode
//    参数：第一个：标签加选择器
//          第二个：如果是字符串，就是标签中的内容
let vnode = h('div#container','Hello world');

let app = document.querySelector('#app');

// patch: 返回一个vnode，并将新的渲染到界面上
//     参数：第一个（旧）：可以是DOM元素，内部会把DOM元素转化为vnode
//           第二个（新）：vnode
let oldVnode = patch(app,vnode);
