<template>
  <div class='otp_component'>
    <div class='otp otp-mobile'>
      <div class='header_login'>
        <h5 class='title'>{{ $t('account.security_verification') }}</h5>
      </div>
      <!--    <h5 class="sub-title sub-title-mobile">{{ $t('account.secure_your_account') }}</h5>-->
      <el-form
        ref='ruleFormRef'
        style='padding-top: 10px'
        :model='otpForm'
        :rules='otpRules'
        autocomplete='off'
        label-position='top'
        @keyup.enter='submit'
      >
        <el-form-item class='lst_input_code_div' :label="$t('otp.code')" prop=''>
          <el-input
            v-for='index in lengthCode' :ref='lstCode[Number(index-1)]' :key='index'
            v-model='otpForm.verifyCode[Number(index-1)]'
            name='code' type='text' oninput="this.value=this.value.replace(/[^0-9]/g,'');" pattern='[0-9]*'
            inputmode='numeric'
            :class="{'mg-3':(index!==1 && index!==lengthCode), 'mg-r-3':index===1,'mg-l-3':index===lengthCode}"
            class='input-code input-code-mobile' maxlength='1' @paste='handlePaste($event,index)'
            @keyup='handleCode(index-1, $event)'/>
        </el-form-item>
        <div class='resend_div'>
          <div style='text-align: left' class='code-sent-email'>
            <span class='notify-sent'>{{ $t('otp.notifySent', { email: hideEmail }) }}</span>
          </div>
          <span class='resend'>
          <span>{{ $t('otp.notReceived') }}</span>
          <span v-if='!isExpire'>{{ $t('otp.reqCode1') }}</span><span v-if='!isExpire' class='color-field'>{{
              $t('otp.reqCode2', { time: countTime })
            }}</span>
          <span
            v-else-if='!isResendOtp' :class="{'noselect':isResendOtp}" class='color-field cursor-pointer'
            @click='resendOtp'>{{
              $t('otp.resendCode')
            }}</span>
        </span>
        </div>

        <el-form-item class='pt-3'>
          <div :class="{'disabled' : disabledButton, 'login-button': 'login-button', 'submit_otp':true}">
            <el-button
              :disabled='disabledButton'
              :loading='loading'
              type='danger'
              @click.prevent='submit(ruleFormRef)'
            >
              {{ $t('otp.submit') }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { LENGTH_CODE_OTP, OTP_EXPIRE } from '@/constants'
import { computed, reactive, ref } from 'vue'
import { startLoading, stopLoading } from '@/services/loadingService'
import * as authService from '@/services/authService'
import * as notiService from '@/services/notiService'
import { trans } from '@/utils/language'
import router from '@/router'

const props = defineProps({
  token: {
    type: String,
    default: '',
  },
  user: {
    type: Object,
    default: () => {
    }
  }
})
const { token, user } = toRefs(props)

const ruleFormRef = ref()
const verifyCode = ref([])
const otpForm = reactive({
  verifyCode,
})
const lengthCode = LENGTH_CODE_OTP
const countTime = ref(OTP_EXPIRE)
const otpRules = reactive({
  verifyCode: [
    {
      required: true,
      message: trans('validation.required', { _field_: trans('otp.error') }),
      trigger: 'blur',
    },
  ],
})
const isExpire = ref(false)
const isResendOtp = ref(false)
const tokenLocal = ref('')
const code0 = ref()
const code1 = ref()
const code2 = ref()
const code3 = ref()
const code4 = ref()
const code5 = ref()
const lstCode = [code0, code1, code2, code3, code4, code5]
const loading = ref(false)
const disabledButton = computed(() => {
  if (verifyCode.value.length < LENGTH_CODE_OTP) {
    return true
  }
  for (let i = 0; i < verifyCode.value.length; i++) {
    if (verifyCode.value[i] == null || !verifyCode.value[i].toString().trim()) {
      return true
    }
  }
  return false
})

// created
onMounted(() => {
  tokenLocal.value = token.value
  checkExpire()
})

//  computed
const hideEmail = computed(() => {
  let emailTemp = user.value.email
  if (user.value.email == null) {
    emailTemp = 'abcd@gmail.com'
  }
  let count = 0
  return emailTemp.replace(/(.{2})(.*)(?=@)/,
    function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        if (count < 10) {
          count++
          gp2 += '*'
        } else {
          return gp2
        }
      }
      return gp2
    })
})

//  methods
const checkExpire = () => {
  countTime.value = Number(OTP_EXPIRE)
  const interval = setInterval(() => {
    countTime.value--
    if (countTime.value <= 0) {
      isExpire.value = true
      clearInterval(interval)
    }
  }, 1000)
}

const handleCode = (index, e) => {
  if (e.keyCode === 8 || e.keyCode === 46) {
    if (index > 0 && e.target.value === '') {
      lstCode[(Number(index) - 1)].value[0].focus()
    }
  } else {
    if (!e.target.value.trim()) {
      lstCode[Number(index)].value[0].input.value = ''
      return
    }
    const codeBox = lstCode[Number(index)].value[0].input
    if (codeBox.value != null && codeBox.value && !isNaN(e.key)) {
      otpForm.verifyCode[index] = Number(e.key)
      codeBox.value = Number(e.key)
    }
    const [first] = e.target.value

    lstCode[Number(index)].value[0].input.value = e.target.value
    e.target.value = first ?? ''
    const lastInputBox = index === LENGTH_CODE_OTP - 1
    const insertedContent = first !== undefined
    if (insertedContent && !lastInputBox) {
      const nextCode = lstCode[Number(index) + 1].value[0]
      nextCode.focus()
    }
  }
}
const handlePaste = (e, index) => {
  const data = e.clipboardData.getData('text')
  let count = 0
  for (let i = index, j = 0; i <= lengthCode && j < data.length; i++, j++) {
    if (isNaN(data.charAt(j))) {
      --i
      continue
    }
    lstCode[Number(i - 1)].value[0].input.value = data.charAt(j)
    otpForm.verifyCode[i - 1] = data.charAt(j)
    count = i - 1
    if (count < lengthCode) {
      const nextCode = lstCode[Number(count)].value[0]
      nextCode.focus()
    }
  }
}

const resendOtp = async () => {
  isResendOtp.value = true
  try {
    startLoading()
    const data = await authService.handleResendOtp({
      token: tokenLocal.value,
    })
    switch (data.status_code) {
      case 200:
        tokenLocal.value = data.data.token
        notiService.setNotifySuccess(data.message)
        setTimeout(() => {
          isResendOtp.value = false
          isExpire.value = false
          checkExpire()
        }, 1000)
        break
      default:
        notiService.setNotifyError({ show: true, text: data.message })
        break
    }
  } catch (err) {
    notiService.setNotifyError(trans('message.message_error'))
  }
  stopLoading()
}
const getOtp = () => {
  return otpForm.verifyCode.join('').toString()
}

const submit = (ruleFormRef) => {
  if (disabledButton.value) {
    return
  }
  ruleFormRef.validate(async valid => {
    if (valid) {
      try {
        await startLoading()
        const data = await authService.handleSubmitRegister({
          ...user.value,
          code: getOtp(),
          token: tokenLocal.value,
        })
        if (data.status_code === 200) {
          notiService.setNotifySuccess(data.message)
          await router.push('/login')
        } else {
          notiService.setNotifyError(data.message)
        }
      } catch (err) {
        notiService.setNotifyError(trans('message.message_error'))
      }
      await stopLoading()
    }
  })
}
</script>

<style lang='scss' scoped>
.el-form-item__label {
  width: auto !important;
}
</style>

