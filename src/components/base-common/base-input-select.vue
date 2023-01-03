<template>
  <BaseLabel v-if="showLabel" :msg="label" :req='isRequiredField'/>
  <el-form-item :prop="nameRef" :error="errorResponse" :rules="rules">
  <el-select
    ref='refSelect'
    v-model="value"
    :class="['w-full h-full', classExtra]"
    :placeholder="placeholder"
    :multiple="multiple"
    :filterable="filterable"
    :remote="remote"
    :disabled="disabled"
    :readonly="readonly"
    :loading-text="$t('notification.invalid')"
    :no-data-text="$t('common.no-data')"
    :reserve-keyword="reserveKeyword"
    :remote-method="$emit('handleRemoteMethod')"
    :loading="loading"
    :popper-class="popperClass"
    clearable
    :automatic-dropdown="automaticDropdown"
    @visible-change="handleValidateSelect($event, nameRef,ruleFormRef)"
    @focus="resetValidateField(nameRef, ruleFormRef)"
    @change="resetValidateField(nameRef, ruleFormRef)"
  >
    <template #empty>
      <p class="text-gray-400 text-center py-3">{{ noData }}</p>
    </template>
    <el-option
      v-for="option in options" :key="option.id"
     :value="option.id"
     :label="option.name"
    />
  </el-select>
  </el-form-item>
</template>

<script setup>
import { resetValidateField } from '@/utils/validate'
import { COMMON_PROPS_SELECT } from '@/constants/select'

  const emits = defineEmits(['update:model', 'handleRemoteMethod'])
  const props = defineProps({ ...COMMON_PROPS_SELECT })
  const { ruleFormRef, model, rules, nameRef } = toRefs(props)
  const refSelect = ref()
  const value = ref(model.value)
  const status = reactive({
    valid: true
  })

  const handleValidateSelect = (event, key, ruleForm) => {
  if (!event) {
    ruleForm.validateField(key)
  }
  }
watch(value, () => {
  emits('update:model', value.value)
})

watch(rules, () => {
  if (status.valid) {
    setTimeout(() => {
      resetValidateField(nameRef.value, ruleFormRef.value)
    }, 0)
  } else {
    refSelect.value.focus()
  }
})

</script>

<style scoped lang="scss">
</style>
