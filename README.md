<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [flow-engine](#flow-engine)
- [用法](#%E7%94%A8%E6%B3%95)
  - [正常使用](#%E6%AD%A3%E5%B8%B8%E4%BD%BF%E7%94%A8)
  - [调试模式使用](#%E8%B0%83%E8%AF%95%E6%A8%A1%E5%BC%8F%E4%BD%BF%E7%94%A8)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## flow-engine

流程执行引擎，具体使用参考 test/unit/index.spec.js 测试用例

## 用法

### 正常使用

```jsx
import runnable from 'flow-engine'

/**
 * aa1 aa2 aa3 先执行先返回，返回输入作为入参，然后到bb1，返回数据然后到cc1 cc2
 * /
const flowConfig = [
  [aa1, aa2(), aa3()],
  bb1,
  [cc1, cc2]
];

const param = {
  name: 123
}

runnable.excute(flowConfig, param ,()=>{
  console.log('callback executed!');
})

```

### 调试模式使用

在初始化参数中可以传入 debug 参数:

- mod: 调试模式

  - 1 表示调试模式，会先输出执行的当前函数和入参，然后进入 debugger 断点

  - 2 表示打印模式，输出执行的当前函数和入参，不会断点

- disableNodes: 禁用节点名称，执行中会自动断掉对应节点流程

```jsx
import runnable from 'flow-engine'

/**
 * aa1 aa2 aa3 先执行先返回，返回输入作为入参，然后到bb1，返回数据然后到cc1 cc2
 * /
const flowConfig = [
  [aa1, aa2(), aa3()],
  bb1,
  [cc1, cc2]
];

const ONLY_DEBUG = 1
const ONLY_CONSOLE = 2
const param = {
  name: 123,
  debug: {
    mod: ONLY_DEBUG,
    disableNodes:['xxxx']
    }
}

runnable.excute(flowConfig, param ,()=>{
  console.log('callback executed!');
})

```

## LICENSE

MIT
