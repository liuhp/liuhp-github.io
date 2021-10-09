---
title: 【react-note】useState()使用
date: 2021-10-09 17:21:02
tags: react-note
categories: react
copyright: true
comments: true
---

### useState是什么？
useState()是改变状态的开关，将状态添加到函数组件需要4个步骤:启用状态、初始化、读取和更新。

### 使用方法

场景： 有4个tab键需要切换，当切换不同tab时，要在指定区域内渲染指定的自定义组件。

```javascript

import React, { useState } from 'react'; // 启用状态
import styles from './index.module.less';
import ComponentZero from './ComponentZero';
import ComponentOne from './ComponentOne';
import ComponentTwo from './ComponentTwo';
import ComponentThree from './ComponentThree';

fuction ControlTabActive() {
  // 初始化状态为 1
  const [selectStatus, setSelectStatus] = useState(1);
  const tabsList = [
    { label: 'Tab1'},
    { label: 'Tab2'},
    { label: 'Tab3'},
    { label: 'Tab4'},
  ];
  return (
    <div className="app">
      <div className="tab">
        {
          tabsList.map((item, index) =>
            <div key={index}
              className={`${styles.navitem} ${selectStatus === index ? styles.active : ''}`}
              // 更新状态
              onClick={() => setSelectStatus(index)}>
              {item.label}
            </div>)
        }
      </div>
      {/*读取状态*/}
      <div className="main">
        {selectStatus === 0 ? <ComponentZero /> : ''}
        {selectStatus === 1 ? <ComponentOne /> : ''}
        {selectStatus === 2 ? <ComponentTwo /> : ''}
        {selectStatus === 3 ? <ComponentThree /> : ''}
      </div>
    </div>
  )
}
```

多种状态、状态的延迟初始化、seState() 中的坑等点击查看: <https://www.jianshu.com/p/700777ea9db0>






