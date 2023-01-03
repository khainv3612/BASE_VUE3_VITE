<template>
  <BaseLabel v-if="showLabel" :msg="label" :req='isRequiredField'/>
  <el-form-item :prop='nameRef' :error='errorResponse' :rules="rules">
    <el-input
      ref='refEl'
      v-model='value'
      :class="['h-size-input', classExtra ]"
      :name='nameRef'
      type='text'
      autocomplete='off'
      :tabindex='tabindex'
      :placeholder="placeholder"
      :maxlength='maxlength'
      :minlength='minlength'
      clearable
      @blur="checkFieldValidate(nameRef, ruleFormRef, status)"
      @focus="resetValidateField(nameRef, ruleFormRef)"
    />
  </el-form-item>
</template>

<script setup>
import { resetValidateField, checkFieldValidate } from '@/utils/validate'
import { ref } from 'vue'
import { COMMON_PROPS_INPUT } from '@/constants/input'

const emits = defineEmits(['update:model'])

const props = defineProps({
  ...COMMON_PROPS_INPUT
})

const { ruleFormRef, model, rules, nameRef } = toRefs(props)
const value = ref(model.value)
const refEl = ref()
const status = reactive({
  valid: true
})

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
