<template>
	<BaseLabel v-if="showLabel" :msg="label" :req="isRequiredField" />
	<el-form-item
		:prop="nameRef"
		:error="errorResponse"
		:rules="rules"
		class="relative"
		:class="[iconLeft ? 'input-button-icon' : '', classSpacing]"
	>
		<el-input
			ref="refEl"
			v-model="value"
			:class="['h-size-input', classExtra]"
			:name="nameRef"
			type="text"
			autocomplete="off"
			:tabindex="tabindex"
			:placeholder="placeholder"
			:maxlength="maxlength"
			:minlength="minlength"
			clearable
			@blur="checkFieldValidate(nameRef, ruleFormRef, status)"
			@focus="resetValidateField(nameRef, ruleFormRef)"
			@keyup.enter.stop="$emit('enterSearch')"
		>
			<!--    <template v-if="iconLeft" #prepend>-->
			<!--    </template>-->
		</el-input>
		<img
			v-if="iconLeft"
			class="absolute top-2.5 left-2"
			width="20"
			height="20"
			:src="iconLeft"
			alt="iconLeft"
		/>
	</el-form-item>
</template>

<script setup>
	import { resetValidateField, checkFieldValidate } from '@/utils/validate'
	import { ref } from 'vue'
	import { COMMON_PROPS_INPUT } from '@/constants/input'

	const emits = defineEmits(['update:model', 'enterSearch', 'clear'])

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
		emits('update:model', value.value)
		// if (value.value === '') {
		//  emits('clear', value.value)
		// }
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
