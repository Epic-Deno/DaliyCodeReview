<<!--
 * @Description: 封装时间选择器区间选择
 * @Author: Pony
 * @Date: 2023/2/1
-->
<template>
  <div class="time-range-picker">
    <a-time-picker valueFormat="HH:mm:ss" placeholder="开始时间" v-model="startTime" @openChange="handleChangePlane($event, 'startTime')" :allowClear="false" :getPopupContainer="getPopupContainer">
<!--      <div style="text-align: right" slot="addon">-->
<!--        <a-button  type="primary" size="small">确定</a-button>-->
<!--      </div>-->
    </a-time-picker>
    <div class="time-range-picker-separator">
      <span class="picker-separator">
        <a-icon type="swap-right" />
      </span>
    </div>
    <a-time-picker valueFormat="HH:mm:ss" :suffixIcon="null" placeholder="结束时间" v-model="endTime" @openChange="handleChangePlane($event, 'endTime')" :allow-clear="false" :getPopupContainer="getPopupContainer">
<!--      <div style="text-align: right" slot="addon">-->
<!--        <a-button  type="primary" size="small">确定</a-button>-->
<!--      </div>-->
    </a-time-picker>
    <div class="time-range-picker-suffix">
      <a-icon type="clock-circle" />
      <a-icon type="close-circle" theme="filled" style="color: rgba(0,0,0,.25)" @click="handleClear"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeRangerPicker",
  props: {
    value: [Array, String]
  },
  data() {
    return {
      startTime: null,
      endTime: null,
      getPopupContainer: () => document.querySelector('#app')
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        if (newValue && newValue.length) {
          this.startTime = newValue[0]
          this.endTime = newValue[1]
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChangePlane(e, key) {
      if (!e) {
        if (this.endTime && this.startTime) {
          if (this.endTime < this.startTime) {
            key === 'startTime' && (this.endTime = this.startTime)
            key === 'endTime' && (this.startTime = this.endTime)
            return
          }
        }
        this.$emit('change', [this.startTime || null, this.endTime || null])
      }
    },
    handleClear() {
      this.startTime = null
      this.endTime = null
      this.$emit('change', [])
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
}
</script>

<style lang="less" scoped>
.time-range-picker {
  box-sizing: border-box;
  position: relative;
  margin: 0;
  padding: 0 11px;
  color: rgba(0,0,0,.88);
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  &-separator {
    padding: 0 8px;
    line-height: 1;
    .picker-separator {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 16px;
      color: rgba(0,0,0,.25);
      font-size: 16px;
      vertical-align: top;
      cursor: default;
    }
  }
  &-suffix {
    display: flex;
    flex: none;
    align-self: center;
    margin-inline-start: 4px;
    color: rgba(0,0,0,.25);
    line-height: 1;
    //pointer-events: none;
    .anticon-clock-circle {
      display: inline-block;
      cursor: pointer;
    }
    .anticon-close-circle {
      display: none;
      cursor: pointer;
    }
    &:hover {
      .anticon-clock-circle {
        display: none;
      }
      .anticon-close-circle {
        display: inline-block;
      }
    }
  }
  .ant-time-picker {
    width: auto;
    flex: 1 0 0;
  }
  ::v-deep .ant-time-picker-input {
    border: none;
    padding: 0;
  }
  ::v-deep .ant-time-picker-icon {
    display: none;
  }
}
</style>