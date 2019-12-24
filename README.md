# custom-keyboard-vue

## 基于vue的移动端自定义键盘（可用于自定义16进制键盘或者数字安全键盘）

### 使用方法

#### 1. 安装

``` 
npm install custom-keyboard-vue
//cnpm install custom-keyboard-vue
```

#### 1. 引入

在main.js中引入

``` 
import customKeyboard from 'custom-keyboard-vue'
Vue.use(customKeyboard)
```

#### 3. 组件中使用

``` 
 <custom-keyboard :keyboardShow.sync="keyboardShow" :value.sync="value"></custom-keyboard>
```

#### 4.api

| 属性    |     描述     |     类型     |     默认值     |
|----------|:-------------:|:-------------:|:-------------:|
| keyboardShow |  控制键盘显示隐藏 | Boolean |false|
|value   |  输入框绑定的值   |String|空|
|customKeyboard|自定义键盘 | Array|见下   |
|confirm|确认按钮绑定事件 | Function|alert('确认')|

customKeyboard
默认传入一个二维数组, 分别对应行列

| 属性    |     描述    |
|----------|:-------------:|
| key |  键盘元素值, 可传数字或字母或者关键字（分别对应事件：DELETE/删除，CLEAR/清空，CONFIRM/确认，CANCEL/取消）|
|label   |  键盘元素显示值 |

``` 
//默认值（16进制键盘）：
 [
    [{key: '1', label: '1'}, {key: '2', label: '2'}, {key: '3', label: '3'}, {
      key: 'F',
      label: 'F'
      }, {key: 'DELETE', label: '删除'}],
    [{key: '4', label: '4'}, {key: '5', label: '5'}, {key: '6', label: '6'}, {
      key: 'E',
      label: 'E'
      }, {key: 'CLEAR', label: '清空'}],
    [{key: '7', label: '7'}, {key: '8', label: '8'}, {key: '9', label: '9'}, {
       key: 'D',
       label: 'D'
       }, {key: 'CONFIRM', label: '确认'}],
    [{key: '0', label: '0'}, {key: 'A', label: 'A'}, {key: 'B', label: 'B'}, {
      key: 'C',
      label: 'C'
      }, {key: 'CANCEL', label: '取消'}],
 ]

```

``` 
//数字键盘
[
    [{key: '1', label: '1'}, {key: '2', label: '2'}, {key: '3', label: '3'}],
    [{key: '4', label: '4'}, {key: '5', label: '5'}, {key: '6', label: '6'}],
    [{key: '7', label: '7'}, {key: '8', label: '8'}, {key: '9', label: '9'}],
    [{key: 'CLEAR', label: '清空'}, {key: '0', label: '0'}, {key: 'DELETE', label: '删除'}],
]
```

#### tip:

##### 阻止调起手机默认键盘的方法

``` 
document.activeElement.setAttribute('readonly', 'readonly')
           setTimeout(() => {
               document.activeElement.removeAttribute('readonly')
           });
```

