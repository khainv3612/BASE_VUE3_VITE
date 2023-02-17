<template>
	<div class="auth-page-container">
		<div>
			<el-form
				ref="ruleFormRef"
				:model="resetForm"
				:rules="resetRules"
				class="login-form border-solid border-gray-100"
				autocomplete="on"
				label-position="left"
			>
				<div class="login">
					<div class="login-logo">
						<img src="@/assets/images/login/logo.svg" />
					</div>
					<div
						class="login-title p-2 text-5xl fw100 animate-bounce-alt animate-count-infinite animate-duration-1s"
					>
						{{ $t('reset_pass.title') }}
					</div>
					<BaseInputConfirm
						v-model:password="resetForm.password"
						v-model:passwordConfirmation="
							resetForm.password_confirmation
						"
						:password="resetForm.password"
						:password-confirmation="resetForm.password_confirmation"
						:rule-form-ref="ruleFormRef"
						:error-response="errorResponse"
					/>
					<el-button
						:loading="loading"
						type="primary"
						style="
							width: 100%;
							margin-bottom: 30px;
							margin-top: 10px;
						"
						:disabled="disabledButton"
						@click="handleReset(ruleFormRef)"
					>
						{{ $t('reset_pass.title') }}
					</el-button>
					<div class="flex items-center mb-3 font-medium">
						<span>{{ $t('common.have_acc') }}</span
						>&nbsp;
						<span
							class="cursor-pointer color-green"
							@click="router.push('/login')"
							>{{ $t('common.log_in') }}</span
						>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script setup>
	import { computed, reactive, ref } from 'vue'
	import * as authService from '@/services/authService'
	import * as loadingService from '@/services/loadingService'
	import { startLoading, stopLoading } from '@/services/loadingService'
	import * as notiService from '@/services/notiService'
	import router from '@/router'
	import { validPassword } from '@/utils/validate'
	import { resetErrorResponse } from '@/utils/validateServerError'
	import { trans } from '@/utils/language'

	const ruleFormRef = ref()
	const errorResponse = ref({})
	const resetForm = reactive({
		token: router.currentRoute.value.query.token || '',
		password: '',
		password_confirmation: '',
	})
	const validatePass = (rule, value, callback) => {
		if (value === '') {
			callback(
				new Error(
					trans('validation.required', {
						_field_: trans('reset_pass.password'),
					}).toString()
				)
			)
		} else {
			if (!validPassword(value)) {
				callback(new Error(trans('validation.format-password')))
			}
			if (resetForm.password_confirmation !== '') {
				ruleFormRef.value.validateField('password_confirmation')
			}
			callback()
		}
	}
	const validateConfirmPass = (rule, value, callback) => {
		if (value === '') {
			callback(
				new Error(
					trans('validation.required', {
						_field_: trans('reset_pass.password'),
					}).toString()
				)
			)
		} else if (value !== resetForm.password) {
			callback(new Error(trans('validation.passNotMatch').toString()))
		} else {
			callback()
		}
	}
	const resetRules = reactive({
		password: [
			{
				required: true,
				max: 32,
				message: trans('validation.required', {
					_field_: trans('reset_pass.password'),
				}),
				trigger: 'blur',
			},
			{ validator: validatePass, trigger: 'blur' },
		],
		password_confirmation: [
			{
				required: true,
				message: trans('validation.required', {
					_field_: trans('reset_pass.password_confirmation'),
				}),
				trigger: 'blur',
			},
			{
				validator: validateConfirmPass,
				message: trans('validation.passNotMatch'),
				trigger: 'blur',
			},
		],
	})
	const loading = ref(false)

	// mounted
	onMounted(async () => {
		await checkForgotToken()
	})
	const disabledButton = computed(() => {
		return (
			resetForm.password === '' || resetForm.password_confirmation === ''
		)
	})

	const handleReset = (ruleFormRef) => {
		errorResponse.value = resetErrorResponse(errorResponse)
		ruleFormRef.validate(async (valid) => {
			if (valid) {
				startLoading()
				try {
					const response = await authService.handleResetPass({
						...resetForm,
					})
					if (response.status_code === 200) {
						await router.push('/')
						await notiService.setNotifySuccess(
							trans('noti.reset_pass_success')
						)
					} else if (response.status_code === 422) {
						errorResponse.value = response.error_response
					}
				} catch (response) {}
				loadingService.stopLoading()
			} else {
				return false
			}
		})
	}
	const checkForgotToken = async () => {
		if (!resetForm.token) router.push('/')
		try {
			await startLoading()
			const data = await authService.checkForgotToken({
				token: resetForm.token,
			})
			switch (data.status_code) {
				case 200:
					if (!data.data) await router.push('/')
					break
				case 422:
					break
				default:
					notiService.setNotifyError(data.message)
					break
			}
		} catch (err) {
			await notiService.setNotifyError(trans('message.message_error'))
		}
		await stopLoading()
	}
</script>
<script>
	export default {
		name: 'ResetPassComponent',
	}
</script>
