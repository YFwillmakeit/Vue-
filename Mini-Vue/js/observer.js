class Observer {
  constructor (data) {
    this.walk(data)
  }

  // 遍历data的属性
  walk (data) {
    // 1、判断data是否是对象
    if(!data || typeof data !== 'object'){
      return
    }
    // 2、遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 将data中的属性转化为getter和setter
  defineReactive (obj, key, val) {
    let that = this;
    // 负责收集依赖，并发送通知
    let dep = new Dep();
    // 如果val是对象，把val内部的属性转换成响应式数据
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target);

        // 不能返回obj[key]
        return val
      },
      set(newValue) {
        if(newValue === val){
          return
        }
        val = newValue;
        // 新赋值的对象转换成响应式的，并且这里this指向的不是Observer实例，用that保存下
        that.walk(newValue);
        // 发送通知
        dep.notify()
      }
    })

  }
}