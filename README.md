# json2vue
**以json方式生成vue,可用于后端控制前端Vue组件生成**

本项目从 [form-create](https://github.com/xaboy/form-create) 中抽出,成为独立的功能

> 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！如有任何建议或问题[请在这里提出](https://github.com/xaboy/json2vue/issues/new)



## 安装

Npm
```sh
npm install json2vue
```

CDN
```html
<script src="https://cdn.jsdelivr.net/npm/json2vue/dist/json2vue.min.js"></script>
```

## 示例1
```js
function mock(){
  return {
    rule:[
      {
        type:'ElButton',
        ref:'btn',
        props:{
          disabled:true
        },
        children:['test']
      }
    ],
    mounted(){
      console.log(this)
    }
  };
}
var jv = new jsonVue(mock())
var vm = jv.mount('#app');
```
等同于
```html
<ElButton :disabled="true" ref="btn">test</ElButton>
```
```js
var vm = new Vue({
  el:'#app',
  mounted(){
    console.log(this)
  }
})
```

## 示例2
```js
function mock(){
  return {
    data:function(){
      return {
        disabled:false
      }
    },
    rule:function(){
      return [
        {
          type:'ElButton',
          ref:'btn',
          props:{
            disabled:this.disabled
          },
          on:{
            click:()=>{
              this.disabled = true;
            }
          },
          children:['test']
        }
      ]
    },
    mounted(){
      console.log(this)
    }
  };
}
var jv = new jsonVue(mock())
var vm = jv.mount('#app');
```
等同于
```html
<ElButton :disabled="disabled" @click="disabled = true" ref="btn">test</ElButton>
```
```js
var vm = new Vue({
  el:'#app',
  data:function(){
    return {
      disabled: false
    }
  },
  mounted(){
    console.log(this)
  }
})
```