<template>
	<BaseLabel v-if="showLabel" :msg="label" :req="isRequiredField" />
	<el-form-item :prop="nameRef" :error="errorResponse" :rules="rules">
		<el-input
			ref="refEl"
			v-model="value"
			:name="nameRef"
			:class="[classExtra]"
			type="textarea"
			autocomplete="off"
			:autosize="{ minRows: minRow, maxRows: maxRow }"
			:tabindex="tabindex"
			:placeholder="placeholder"
			:maxlength="maxlength"
			:minlength="minlength"
			:show-word-limit="showLimit"
			resize="none"
			clearable
			@blur="checkFieldValidate(nameRef, ruleFormRef, status)"
			@focus="resetValidateField(nameRef, ruleFormRef)"
		/>
	</el-form-item>
</template>

<script setup>
	import { resetValidateField, checkFieldValidate } from '@/utils/validate'
	import { ref } from 'vue'
	import { COMMON_PROPS_TEXTAREA } from '@/constants/textarea'

	const emits = defineEmits(['update:model'])

	const props = defineProps({
		...COMMON_PROPS_TEXTAREA,
	})

	const { ruleFormRef, model, rules, nameRef } = toRefs(props)
	const value = ref(model.value)
	const refEl = ref()
	const status = reactive({
		valid: true,
	})

	watch(value, () => {
		emits('update:model', value.value)
	})
	watch(model, () => {
		if (!model.value || model.value.toString().trim().length === 0) {
			value.value = ''
		} else {
			value.value = model.value.trimStart()
		}
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
