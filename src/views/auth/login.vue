<template>
  <div class='auth-page-container'>
    <div v-if="page === 'login'">
      <el-form
        ref='ruleFormRef'
        :model='loginForm'
        :rules='loginRules'
        class='login-form border-solid border-gray-100'
        autocomplete='on'
        :validate-on-rule-change="false"
        label-position='left'
      >
        <div class='login'>
          <div class='login-logo'>
            <img src='@/assets/images/login/logo.svg'/>
          </div>
          <div
            class='login-title p-2
             text-5xl fw100 animate-bounce-alt animate-count-infinite animate-duration-1s'>
            {{ $t('login.logIn') }}
          </div>

          <BaseInputText
            ref="email"
            v-model:model="loginForm.email"
            :model="loginForm.email"
            :rule-form-ref="ruleFormRef"
            :rules="loginRules.email"
            :name-ref="'email'"
            :placeholder="$t('login.placeholder-email')"
            :error-response="errorResponse.email"
            :label="$t('login.email')"
          />

          <BaseInputPassword
            ref="password"
            v-model:model="loginForm.password"
            :model="loginForm.password"
            :rule-form-ref="ruleFormRef"
            :rules="loginRules.password"
            :name-ref="'password'"
            :placeholder="$t('login.placeholder-password')"
            :error-response="errorResponse.password"
            :label="$t('login.password')"
          />

          <el-form-item
            prop='captcha' :error='errorResponse.captcha'
          >
            <vue-recaptcha
              ref='captcha'
              :sitekey='sitekey'
              @error='onError'
              @verify='onSuccess'
              @expired='onExpired'>
            </vue-recaptcha>
          </el-form-item>

          <div class='flex items-center justify-end color-green mb-3 font-medium'>
            <span class='cursor-pointer' @click='pageForgot'>{{
                $t('login.forgot-password')
              }}</span>
          </div>
          <el-button
            :loading='loading'
            type='primary'
            style='
                            width: 100%;
                            margin-bottom: 30px;
                            margin-top: 10px;
                        '
            :disabled='disabledButton'
            @click='handleLogin(ruleFormRef)'
          >
            {{ $t('login.logIn') }}
          </el-button>
          <div
            class='flex items-center mb-3 font-medium'
          >
            <span>{{ $t('common.no_acc') }}</span>&nbsp;
            <span class='cursor-pointer color-green' @click="router.push('/register')">{{
                $t('common.register')
              }}</span>
          </div>
        </div>
      </el-form>
    </div>
    <div v-if="page === 'forgot-password'">
      <el-form
        ref='ruleForgotFormRef'
        :model='forgotForm'
        :rules='forgotFormRules'
        class='login-form'
        autocomplete='on'
        label-position='left'
      >
        <div class='login'>
          <div class='login-logo'>
            <img src='@/assets/images/login/logo.svg'/>
          </div>
          <div v-if='isForgotPassword'>
            <div class='login-title'>
              {{ $t('login.forgot-password') }}
            </div>
            <BaseInputText
              ref="email"
              v-model:model="forgotForm.email"
              :model="forgotForm.email"
              :rule-form-ref="ruleForgotFormRef"
              :rules="forgotFormRules.email"
              name-ref="email"
              :show-label="true"
              :label="$t('login.email')"
              :placeholder=" $t('login.forgot-description-title')"
              :error-response="errorResponse.email"
              :maxlength='40'
            />
            <el-button
              :loading='loading'
              type='primary'
              style='width: 100%; margin-bottom: 20px'
              @click='handleForgot(ruleForgotFormRef)'
            >
              {{ $t('login.reset-title') }}
            </el-button>
          </div>
          <div v-else class='mt-8 text-center'>
            <h4 class='font-bold text-2xl mb-6'>
              {{ $t('login.forgot-password-title') }}
            </h4>
            <p class='text-base leading-6'>
              {{ $t('login.forgot-password-content-1') }}
            </p>
            <p class='text-base leading-6 mb-7'>
              {{ $t('login.forgot-password-content-2') }}
            </p>
          </div>
          <el-row>
            <el-row>
              <el-col
                :span='24'
                style='text-align: center; margin-bottom: 30px'
              >
                <span
                  class='login-forgot-password color-green cursor-pointer font-medium'
                  @click="page === 'login'"
                >{{ $t('login.back-login') }}</span
                >
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import * as authService from '@/services/authService'
import * as loadingService from '@/services/loadingService'
import * as notiService from '@/services/notiService'
import router from '@/router'
import { resetErrorResponse } from '@/utils/validateServerError'
import { VueRecaptcha } from 'vue-recaptcha'
import { trans } from '@/utils/language'
import { RULE_EMAIL, RULE_PASSWORD } from '@/constants/rule-form'
import { KEY_CAPTCHA } from '@/constants'
import { resetValidateField } from '@/utils/validate'

const page = ref('login')
const ruleFormRef = ref()
const ruleForgotFormRef = ref()
const isForgotPassword = ref(true)
const errorResponse = ref({})
const sitekey = KEY_CAPTCHA
const isCaptchaExpireOrError = ref(false)
const captchaStr = ref('')
const loginForm = ref({
  email: '',
  password: '',
  remember: 0,
})
const validateCaptcha = (rule, value, callback) => {
  if (captchaStr.value == null || !captchaStr.value) {
    callback(new Error(trans('validation.captcha_req')))
  } else {
    callback()
  }
}

const loginRules = computed(() => {
  return {
    email: RULE_EMAIL,
    password: RULE_PASSWORD,
    captcha: [
      {
        validator: validateCaptcha, trigger: 'blur',
      },
    ]
  }
})
const forgotForm = ref({
  email: '',
})
const forgotFormRules = computed(() => {
  return {
    email: [
      {
        required: true,
        message: trans('validation.required', {
          _field_: trans('login.email'),
        }),
        trigger: 'blur',
      },
      {
        type: 'email',
        max: 64,
        message: trans('validation.email'),
        trigger: 'blur',
      },
    ]
  }
})
const loading = ref(false)
const disabledButton = computed(() => {
  return loginForm.value.email === '' ||
    loginForm.value.password === '' ||
    captchaStr.value === ''
})
watch([page], () => {
  if (page.value) {
    switch (page.value) {
      case 'login':
        loginForm.value = {
          email: '',
          password: '',
        }
        nextTick(() => {
          ruleFormRef.value.clearValidate()
        })
        break
      case 'forgot-password':
        forgotForm.value = {
          email: '',
        }
        nextTick(() => {
          ruleForgotFormRef.value.clearValidate()
        })
        break
    }
  }
})
const pageForgot = () => {
  isForgotPassword.value = true
  page.value = 'forgot-password'
}
const handleLogin = (ruleFormRef) => {
  errorResponse.value = resetErrorResponse(errorResponse)
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      loadingService.startLoading()
      try {
        const response = await authService.handleLogin(loginForm.value)
        if (response.status_code === 200) {
          loadingService.stopLoading()
          await router.push({
            path: '/',
          })
          await notiService.setNotifySuccess(trans('noti.login_success'))
        } else if (response.status_code === 422) {
          errorResponse.value = response.error_response
        } else if (response.status_code === 401) {
          notiService.setNotifyError(response.message)
        }
      } catch (response) {
      }
      loadingService.stopLoading()
    } else {
      return false
    }
  })
}
const handleForgot = (ruleForgotFormRef) => {
  errorResponse.value = resetErrorResponse(errorResponse)
  ruleForgotFormRef.validate(async (valid) => {
    if (valid) {
      loadingService.startLoading()
      try {
        const response = await authService.handleForgotPass(forgotForm.value)
        if (response.status_code === 200) {
          isForgotPassword.value = false
          notiService.setNotifySuccess(response.message)
        } else {
          errorResponse.value = response.error_response
          notiService.setNotifyError(response.message)
        }
        loadingService.stopLoading()
      } catch (response) {
        if (response.status_code === 422) {
          errorResponse.value = response.error_response
        }
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
  resetValidateField('captcha', ruleFormRef.value)
}
const onExpired = async () => {
  isCaptchaExpireOrError.value = true
  captchaStr.value = ''
}

</script>
<style lang='scss' scoped></style>
