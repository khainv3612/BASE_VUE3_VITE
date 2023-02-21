<template>
  <el-dialog
    v-model='isVisible' class='dialog_common' :close-on-click-modal='false'
    :destroy-on-close='true' :show-close='false'>
    <template #header='{ close, titleId, titleClass }'>
      <div :class="[classHeader, 'my-header', 'flex', 'justify-between']">
        <span :id='titleId' :class="[classHeader?'':'text-color-dark text-title-l']">{{ title }}</span>
        <el-button type='primary' @click='closeModal(close)'>
          <el-icon class=''>
            <CloseBold/>
          </el-icon>
        </el-button>
      </div>
    </template>
    <slot></slot>
  </el-dialog>
</template>
<script setup>
import { CloseBold } from '@element-plus/icons-vue'

const emits = defineEmits(['close'])
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  classHeader: {
    type: String,
    default: '',
  },
})
const { isVisible, title } = toRefs(props)
const closeModal = (cb, param) => {
  emits('close', param)
}
</script>
<script>
export default {
  name: 'DialogCommon',
}
</script>
