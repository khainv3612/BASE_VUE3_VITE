<template>
	<header-common />
	<div class="default_layout_config default_layout_component">
		<slot />
	</div>
	<footer-common />
</template>

<script setup>
	import HeaderCommon from '@/layouts/navbar/default/HeaderCommon'
	import FooterCommon from '@/layouts/navbar/default/FooterCommon'
</script>
