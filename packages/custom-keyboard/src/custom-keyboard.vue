<template>
    <div class='key-container'>
        <transition name="fade">
            <div class='keyboard' @mousedown.prevent='handleKeyPress' v-if="keyboardShow">
                <div class="key-row" v-for="(item,index) in customKeyboard" :key="index">
                    <div class='key-cell' :data-key='i.key' v-for="i in item" oncontextmenu="return false"
                         :class="controlButton.indexOf(i.key)!==-1?'control-button':''">{{i.label}}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'customKeyboard',
        props: {
            // 自定义键盘
            customKeyboard: {
                type: Array,
                default: () => {
                    return [
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
                }
            },
            // 键盘是否显示
            keyboardShow: {
                type: Boolean,
                default: false
            },
            //输入绑定的值
            value: {
                type: String,
                default: ''
            },
            //确认按钮绑定事件
            confirm: {
                type: Function,
                default: () => {
                    alert('确认')
                }
            },
        },
        data() {
            return {
                tempValue: '',
                cursor: 0,
                controlButton: ['DELETE', 'CLEAR', 'CONFIRM', 'CANCEL']
            }
        },
        mounted() {
            // 监听鼠标事件，点击非键盘和input框内容时隐藏键盘
            document.onmousedown = event => {
                document.activeElement.setAttribute('readonly', 'readonly')
                setTimeout(() => {
                    document.activeElement.removeAttribute('readonly')
                });
                if (event.target.nodeName !== 'INPUT' && event.target.className.indexOf('key-cell') === -1) {
                    this.$emit('update:keyboardShow', false)
                }
            };
            // 监听鼠标事件，获取光标位置并存储
            document.onmouseup = event => {
                if (event.target.className.indexOf('key-cell') !== -1) {
                    let obj = document.activeElement
                    obj.setSelectionRange(this.cursor, this.cursor)
                } else {
                    if (document.activeElement.tagName === 'INPUT') {
                        let obj = document.activeElement
                        this.cursor = obj.selectionStart
                        obj.setSelectionRange(this.cursor, this.cursor)
                    }
                }
            };

        },
        methods: {
            //处理按键
            handleKeyPress(e) {
                let key = e.target.dataset.key;
                switch (String(key)) {
                    //删除键
                    case 'DELETE':
                        this.handleDeleteKey();
                        break;
                    //清空键
                    case 'CLEAR':
                        this.handleClearKey();
                        break;
                    //确认键
                    case 'CONFIRM':
                        this.confirm();
                        break;
                    //取消键
                    case 'CANCEL':
                        this.handleCancelKey();
                        break;
                    default:
                        this.handleNumberKey(key);
                        break;
                }
            },
            //删除
            handleDeleteKey() {
                if (this.cursor) {
                    this.cursor--
                }
                this.tempValue = this.tempValue.substring(0, this.cursor) + this.tempValue.substring(this.cursor + 1, this.tempValue.length);
                this.$emit('update:value', this.tempValue)
            },
            //清空
            handleClearKey() {
                this.tempValue = ''
                this.$emit('update:value', '')
                this.cursor = 0
            },
            // 取消
            handleCancelKey() {
                this.$emit('update:keyboardShow', false)

            },
            // 赋值
            handleNumberKey(key) {
                this.tempValue = this.value
                // this.$emit('update:keyboardShow', true)
                this.tempValue = this.tempValue.slice(0, this.cursor) + key.toString() + this.tempValue.slice(this.cursor)
                this.cursor++
                this.$emit('update:value', this.tempValue)
                this.$emit('update:keyboardShow', true)

            }
        },
    }
</script>

<style scoped>
    .key-container {
        margin-top: 50px;
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .keyboard {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .keyboard .key-row {
        display: flex;
        display: -webkit-flex;
        position: relative;
        height: 60px;
        line-height: 60px;
    }

    .keyboard .key-row::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #ebedf0;
        color: #ebedf0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

    .keyboard .key-cell {
        flex: 1;
        -webkit-box-flex: 1;
        text-align: center;
        position: relative;
        font-size: 16px;
        -webkit-user-select: none !important;
        user-select: none !important;

    }

    .keyboard .key-cell:active {
        background-color: #ebedf0;
    }

    .keyboard .key-cell::after {
        content: '';
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        height: 200%;
        border-right: 1px solid #ebedf0;
        color: #ebedf0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

    .keyboard .key-cell:nth-last-child(1)::after {
        border-right: 0;
    }

    .control-button {
        background-color: #eee;
    }

    .fade-enter-active, .fade-leave-active {
        transition: height 5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        height: 0;
    }


</style>
