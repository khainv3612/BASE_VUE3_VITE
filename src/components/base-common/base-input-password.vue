<template>
	<BaseLabel v-if="showLabel" :msg="label" :req="isRequiredField" />
	<el-tooltip
		v-model="capsTooltip"
		:content="$t('common.caps-lock-on')"
		placement="right"
		manual
		:disabled="!capsTooltip"
	>
		<el-form-item :prop="nameRef" :error="errorResponse" :rules="rules">
			<el-input
				ref="refEl"
				v-model="value"
				class="h-size-input input-password"
				:name="nameRef"
				:type="typePassword"
				autocomplete="off"
				:tabindex="tabindex"
				:placeholder="placeholder"
				:maxlength="maxlength"
				:minlength="minlength"
				@keyup="checkCapslock($event)"
				@blur="checkFieldValidate(nameRef, ruleFormRef, status)"
				@focus="resetValidateField(nameRef, ruleFormRef)"
			/>
			<span class="show-pwd">
				<img
					v-if="typePassword === 'password'"
					src="@/assets/images/icons/eye.svg"
					alt=""
					@click="showPwd('text')"
				/>
				<img
					v-else
					src="@/assets/images/icons/eye-hidden.svg"
					alt=""
					@click="showPwd('password')"
				/>
			</span>
		</el-form-item>
	</el-tooltip>
</template>

<script setup>
	import { resetValidateField, checkFieldValidate } from '@/utils/validate'
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

	const typePassword = ref('password')

	const capsTooltip = ref(false)

	const showPwd = (type) => {
		typePassword.value = type
	}
	const checkCapslock = (e) => {
		const { key } = e
		capsTooltip.value = key && e.getModifierState('CapsLock')
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
			refEl.value.focus()
		}
	})
</script>

<script>
	export default {
		name: 'FormInputPassword',
	}
</script>

<style scoped></style>
