<template>
  <div id="app">
    <form>
      <input type="text" @click="input" v-model="inputValue" placeholder="请输入验证码"/>
      <button type="submit">提交</button>
    </form>
    <custom-keyboard  :customKeyboard="customKeyboard" :value.sync="inputValue"></custom-keyboard>
  </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                inputValue: '',
                show: false,
                customKeyboard:
                    [
                        [{key: '1', label: '1'}, {key: '2', label: '2'}, {key: '3', label: '3'}],
                        [{key: '4', label: '4'}, {key: '5', label: '5'}, {key: '6', label: '6'}],
                        [{key: '7', label: '7'}, {key: '8', label: '8'}, {key: '9', label: '9'}],
                        [{key: 'CLEAR', label: '清空'}, {key: '0', label: '0'}, {key: 'DELETE', label: '删除'}],
                    ]

            }
        },
        methods: {
            input() {
                this.show = true
                document.activeElement.setAttribute('readonly', 'readonly')
                setTimeout(() => {
                    document.activeElement.removeAttribute('readonly')
                });
            },
            confirm() {
                alert(this.inputValue)
            }
        }
    }
</script>

<style>
  form {
    display: flex;
  }

  input {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 0;
    padding: 13px 14px;
    font-size: 20px;
  }

  input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }

  button {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 0;
    padding: 13px 14px;
    font-size: 20px;
  }


</style>
