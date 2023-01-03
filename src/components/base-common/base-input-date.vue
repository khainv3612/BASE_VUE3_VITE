<template>
    <BaseLabel v-if='showLabel' :msg='label' :req='isRequiredField' />
  <el-form-item :prop="nameRef" :error="errorResponse" :rules="rules">
    <el-date-picker
      ref='refDatePicker'
      v-model="value"
      :name='nameRef'
      style="width: 100%"
      type="date"
      :popper-class="popperClass"
      autocomplete='off'
      :tabindex='tabindex'
      :class="['h-size-input', classExtra ]"
      :format="formatDate"
      :value-format="valueFormat"
      clearable
      :picker-options="pickerOptions"
      :placeholder="placeholder"
      @visible-change="handleValidateDate($event, nameRef,ruleFormRef)"
      @focus="resetValidateField(nameRef, ruleFormRef)"
      @change="resetValidateField(nameRef, ruleFormRef)"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script setup>
import { resetValidateField } from '@/utils/validate'
import { ref } from 'vue'
import { COMMON_PROPS_DATE } from '@/constants/date-picker'

const emits = defineEmits(['update:model'])

const props = defineProps({
  ...COMMON_PROPS_DATE
})
const disabledDateMethod = (time) => {
  return time.getTime() > Date.now()
}

const { ruleFormRef, model, rules, nameRef } = toRefs(props)
const value = ref(model.value)
const refEl = ref()
const pickerOptions = reactive({
  disabledDate: disabledDateMethod
})
const status = reactive({
  valid: true
})
const handleValidateDate = (event, key, ruleForm) => {
  if (!event) {
    ruleForm.validateField(key)
  }
}
watch(value, () => {
  emits('update:model', value.value)
})

watch(rules, () => {
  console.log(111)
  if (status.valid) {
    setTimeout(() => {
      resetValidateField(nameRef.value, ruleFormRef.value)
    }, 0)
  } else {
    refEl.value.focus()
  }
})

</script>
