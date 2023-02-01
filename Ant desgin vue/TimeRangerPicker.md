# TimerRangerPicker组件的用法
----
- 解决antd组件内不带时间段选择器，所以封装时间端选择器

```html
  <time-ranger-picker v-model="form.rangeDate"/>
```
- 第一步：表单页面引入组建

```javascript
  import TimeRangerPicker from "@/components/plugins/TimerRangerPicker.vue"
```
- 第二步： 组建注册

```javascript
<template>
  <a-form-model :model="form">
    <a-form-model-item label="时间段">
      <time-ranger-picker v-model="form.rangeDate"/>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" :loading="loading" @click="handleOk">提交</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import TimeRangerPicker from "@/components/plugins/TimerRangerPicker.vue"
export default {
  components: {
    TimeRangerPicker
  },
  data() {
    return {
      loading: false,
      form: {}
    }
  },
  methods: {
    /* 编辑的方法 */
    handleEdit(record) {
      const { startTime, endTime } = record;
      this.form = Object.assign({}, record);
      // NOTICE 如果后端给你是一个Array数组就不需要以下步骤，例如：时间段是开始时间字段是: StartTime, 结束时间是：endTime
      this.form['rangeDate'] = [startTime, endTime]; // 这里也是示例
    },
    /* 提交 */
    handleOk() {
      // NOTICE：timeRangerPicker 返回的是一个Array数组, 提交表单字段时候需要问清楚是不是两个字段。
      
      // 后端需要两个字段需要对Array数组进行拆分，例如：时间段是开始时间字段是: StartTime, 结束时间是：endTime
      let formData = Object({}, this.form); // 最终需要给后端的数据
      if (this.form.rangeDate && this.form.rangeDate.length) { // NOTICE：这里只是示例
        // 处理数据
        const [startTime, endTime] = this.form.rangeDate;
        formData['startTime'] = startTime;
        formData['endTime'] = endTime;
      }
    }
  },
}
</script>
```
- 组建使用的注意点

```javascript
<script>
export default {
  methods: {
    /* 编辑的方法 */
    handleEdit(record) {
      const { startTime, endTime } = record;
      this.form = Object.assign({}, record);
      // NOTICE 如果后端给你是一个Array数组就不需要以下步骤，例如：时间段是开始时间字段是: StartTime, 结束时间是：endTime
      this.form['rangeDate'] = [startTime, endTime]; // 这里也是示例
    },
    /* 提交 */
    handleOk() {
      // NOTICE：timeRangerPicker 返回的是一个Array数组, 提交表单字段时候需要问清楚是不是两个字段。

      // 后端需要两个字段需要对Array数组进行拆分，例如：时间段是开始时间字段是: StartTime, 结束时间是：endTime
      let formData = Object({}, this.form); // 最终需要给后端的数据
      if (this.form.rangeDate && this.form.rangeDate.length) { // NOTICE：这里只是示例
        // 处理数据
        const [startTime, endTime] = this.form.rangeDate;
        formData['startTime'] = startTime;
        formData['endTime'] = endTime;
      }
    }
  },
}
</script>
```