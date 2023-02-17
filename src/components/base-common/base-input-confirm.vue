<template>
	<BaseInputPassword
		ref="password"
		v-model:model="tempPassword"
		:model="tempPassword"
		:rule-form-ref="ruleFormRef"
		:rules="formRules.password"
		:name-ref="'password'"
		:placeholder="$t('register.password')"
		:error-response="errorResponse.password"
		:label="$t('register.password')"
	/>
	<BaseInputPassword
		ref="passwordConfirmation"
		v-model:model="tempPasswordConfirmation"
		:model="tempPasswordConfirmation"
		:rule-form-ref="ruleFormRef"
		:rules="formRules.password_confirmation"
		:name-ref="'password_confirmation'"
		:placeholder="$t('register.password_confirmation')"
		:error-response="errorResponse.password_confirmation"
		:label="$t('register.password_confirmation')"
	/>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { trans } from '@/utils/language'
	import { validPassword } from '@/utils/validate'
	import { RULE_REQUIRED } from '@/constants/rule-form'

	const emits = defineEmits([
		'update:password',
		'update:passwordConfirmation',
	])

	const props = defineProps({
		ruleFormRef: {
			type: Object,
			default: () => {},
		},
		password: {
			type: String,
			default: '',
		},
		passwordConfirmation: {
			type: String,
			default: '',
		},
		errorResponse: {
			type: Object,
			default: () => {},
		},
	})

	const password = ref()
	const passwordConfirmation = ref()
	const { ruleFormRef } = toRefs(props)
	const tempPassword = ref('')
	const tempPasswordConfirmation = ref('')
	const validatePass = computed(() => {
		return (rule, value, callback) => {
			if (value === '') {
				callback(
					new Error(
						trans('validation.required', {
							_field_: trans('register.password'),
						}).toString()
					)
				)
			} else {
				if (!validPassword(value)) {
					callback(new Error(trans('validation.format-password')))
				}
				if (tempPasswordConfirmation.value !== '') {
					ruleFormRef.value.validateField('password_confirmation')
				}
				callback()
			}
		}
	})
	const validateConfirmPass = computed(() => {
		return (rule, value, callback) => {
			if (value === '') {
				callback(
					new Error(
						trans('validation.required', {
							_field_: trans('register.password'),
						}).toString()
					)
				)
			} else if (value !== tempPassword.value) {
				callback(new Error(trans('validation.passNotMatch').toString()))
			} else {
				callback()
			}
		}
	})

	const formRules = computed(() => {
		return {
			password: [
				// RULE_PASSWORD.value[0],
				{ validator: validatePass.value, trigger: 'blur' },
			],
			password_confirmation: [
				RULE_REQUIRED('register.password_confirmation'),
				{
					validator: validateConfirmPass.value,
					message: trans('validation.passNotMatch'),
					trigger: 'blur',
				},
			],
		}
	})

	watch(tempPassword, () => {
		emits('update:password', tempPassword.value)
	})
	watch(tempPasswordConfirmation, () => {
		emits('update:passwordConfirmation', tempPasswordConfirmation.value)
	})
</script>
