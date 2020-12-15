class Compiler {
  constructor (vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile (el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      }else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 判断node节点是否有子节点，如果有，递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement (node) {
    // console.log(node.attributes); // 元素的所有属性
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断该属性名是否是指令
      let attrName = attr.name; // 属性的名字
      if (this.isDirective(attrName)) {
        // v-text ===> text
        attrName = attrName.substr(2);
        let key = attr.value; // 属性的值
        this.update(node,key,attrName)
      }
    })
  }

  // 更新含有指令的节点
  update (node,key,attrName) {
    let updateFn = this[attrName + 'Updater'];
    updateFn && updateFn.call(this,node,this.vm[key],key)
  }

  // 处理v-text指令
  textUpdater (node,value,key) {
    node.textContent = value;
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  // 处理v-model指令
  modelUpdater (node,value,key) {
    node.value = value;
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input',()=>{
      this.vm[key] = node.value
    })
  }

  // 编译文本节点，处理差值表达式
  compileText (node) {
    // console.dir(node); // dir：把node变量以对象的形式打印出来
    let reg = /\{\{(.+?)\}\}/; // 括号包起来是代表一个分组的意思
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim(); // 获取第一个分组
      node.textContent = value.replace(reg,this.vm[key]) // 将花括号里面的变量，替换成vm中的值

      // 创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, (newValue)=>{
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }

}