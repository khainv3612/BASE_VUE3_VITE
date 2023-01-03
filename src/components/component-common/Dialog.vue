<template>

  <SlotDialog>
    <template #default='{ isVisible, open, close }'>
      <el-button @click='handleOpenModal(open)'>OPEN</el-button>
      <DialogCommon :is-visible='isVisible' :title="'Change title here'" @close='handleCloseModal(close)'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry
        <div class='close_div'>
          <el-button @click='handleCloseModal(close)'>{{ $t('common.confirm') }}</el-button>
        </div>
      </DialogCommon>
    </template>
  </SlotDialog>
</template>

<script setup>
  const handleOpenModal = (cb) => {
    // code
    cb()
  }

  const handleCloseModal = (cb) => {
    // code
    cb()
  }
</script>
