<template>
	<div v-if="step === 1" class="auth-page-container">
		<div>
			<el-form
				ref="ruleFormRef"
				:model="registerForm"
				:rules="registerRules"
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
						{{ $t('register.title') }}
					</div>
					<BaseInputText
						v-model:model="registerForm.email"
						:label="$t('register.email')"
						:is-required-field="true"
						:rules="registerRules.email"
						:error-response="errorResponse.email"
						:model="registerForm.email"
						:name-ref="'email'"
						:rule-form-ref="ruleFormRef"
						:placeholder="$t('register.placeholder-email')"
					/>
					<BaseInputConfirm
						v-model:password="registerForm.password"
						v-model:passwordConfirmation="
							registerForm.password_confirmation
						"
						:password="registerForm.password"
						:password-confirmation="
							registerForm.password_confirmation
						"
						:rule-form-ref="ruleFormRef"
						:error-response="errorResponse"
					/>
					<BaseInputText
						v-model:model="registerForm.referral_code"
						:label="$t('register.referral_code')"
						:is-required-field="false"
						:error-response="errorResponse.referral_code"
						:model="registerForm.referral_code"
						:name-ref="'referral_code'"
						:rule-form-ref="ruleFormRef"
						:placeholder="$t('register.referral_code')"
					/>
					<el-form-item
						prop="captcha"
						:error="errorResponse['g-recaptcha-response']"
					>
						<vue-recaptcha
							ref="captcha"
							:sitekey="sitekey"
							@error="onError"
							@verify="onSuccess"
							@expired="onExpired"
						>
						</vue-recaptcha>
					</el-form-item>
					<el-button
						:loading="loading"
						type="primary"
						style="
							width: 100%;
							margin-bottom: 30px;
							margin-top: 10px;
						"
						:disabled="disabledButton"
						@click="handleRegister(ruleFormRef)"
					>
						{{ $t('register.title') }}
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
	<otp-component
		v-if="step === 2"
		:token="token"
		:user="userForm"
	></otp-component>
</template>

<script setup>
	import { computed, reactive, ref } from 'vue'
	import * as authService from '@/services/authService'
	import * as loadingService from '@/services/loadingService'
	import notificationService from '@/services/notiService'
	import router from '@/router'
	import { resetErrorResponse } from '@/utils/validateServerError'
	import { KEY_CAPTCHA } from '@/constants'
	import { VueRecaptcha } from 'vue-recaptcha'
	import { trans } from '@/utils/language'
	import OtpComponent from '@/components/auth/otp'
	import { RULE_EMAIL } from '@/constants/rule-form'

	const ruleFormRef = ref()
	const step = ref(1)
	const errorResponse = ref({})
	const sitekey = KEY_CAPTCHA
	const token = ref('')
	const userForm = ref({})
	const isCaptchaExpireOrError = ref(false)
	const captchaStr = ref('')
	const registerForm = reactive({
		email: '',
		password: '',
		password_confirmation: '',
		referral_code: '',
	})
	const validateCaptcha = (rule, value, callback) => {
		if (captchaStr.value == null || !captchaStr.value) {
			callback(new Error(trans('validation.captcha_req')))
		} else {
			callback()
		}
	}
	const registerRules = computed(() => {
		return {
			email: RULE_EMAIL,
			captcha: [
				{
					validator: validateCaptcha,
					trigger: 'blur',
				},
			],
		}
	})
	const loading = ref(false)
	const disabledButton = computed(() => {
		return (
			registerForm.email === '' ||
			registerForm.password === '' ||
			captchaStr.value === ''
		)
	})
	const resetValidateLogin = (ref, ruleFormRef) => {
		ruleFormRef.clearValidate(ref)
	}
	const handleRegister = (ruleFormRef) => {
		errorResponse.value = resetErrorResponse(errorResponse)
		ruleFormRef.validate(async (valid) => {
			if (valid) {
				loadingService.startLoading()
				try {
					const response = await authService.handleRegister({
						...registerForm,
						'g-recaptcha-response': captchaStr.value,
					})
					if (response.status_code === 200) {
						token.value = response.data.token
						userForm.value = {
							...registerForm,
							'g-recaptcha-response': captchaStr.value,
						}
						step.value = 2
						loadingService.stopLoading()
						await notificationService.setSuccessNotification(
							trans('noti.register_success')
						)
					} else if (response.status_code === 422) {
						errorResponse.value = response.error_response
					}
				} catch (response) {
					await notificationService.setErrorNotification(
						response.message
					)
				}
				loadingService.stopLoading()
			} else {
				return false
			}
		})
	}
	const onError = async () => {
		isCaptchaExpireOrError.value = true
		captchaStr.value = ''
	}
	const onSuccess = async (token) => {
		isCaptchaExpireOrError.value = false
		captchaStr.value = token
		resetValidateLogin('captcha', ruleFormRef.value)
	}
	const onExpired = async () => {
		isCaptchaExpireOrError.value = true
		captchaStr.value = ''
	}
</script>
<script>
	export default {
		name: 'RegisterComponent',
	}
</script>
