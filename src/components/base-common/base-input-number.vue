<template>
  <BaseLabel v-if='showLabel' :msg='label' :req='isRequiredField' />
  <el-form-item :prop='nameRef' :error='errorResponse' :rules='rules'>
    <el-input
      ref='refEl'
      v-model='value'
      :name='nameRef'
      :class="[ classExtra ]"
      type='text'
      autocomplete='off'
      :tabindex='tabindex'
      :placeholder='placeholder'
      :maxlength='maxlength'
      :minlength='minlength'
      clearable
      :disabled:='disabled'
      :readonly='readonly'
      oninput="this.value=this.value.replace(/[^0-9\.]/g,'');"
      @blur='checkFieldValidate(nameRef, ruleFormRef, status)'
      @focus='resetValidateField(nameRef, ruleFormRef)'
    />
  </el-form-item>
</template>

<script setup>
import { checkFieldValidate, resetValidateField } from '@/utils/validate'
import { ref } from 'vue'
import { COMMON_PROPS_INPUT } from '@/constants/input'

const emits = defineEmits(['update:model'])

const props = defineProps({
  ...COMMON_PROPS_INPUT,
})

const { ruleFormRef, model, rules, nameRef } = toRefs(props)
const value = ref(model.value)
const refEl = ref()
const status = reactive({
  valid: true,
})

watch(value, () => {
  const temp = value.value.toString().replace(/[^0-9\\.]/g, '').split('.')
  if (temp.length > 2) {
    value.value = Number(temp[0] + '.' + temp[1])
  }
  emits('update:model', value.value)
})

watch(rules, () => {
  if (status.valid) {
    setTimeout(() => {
      resetValidateField(nameRef.value, ruleFormRef.value)
    }, 0)
  } else {
    refEl.value.focus()
  }
})

</script>

<script>
export default {
  name: 'FormInputNumber',
}
</script>

<style scoped>

</style>
