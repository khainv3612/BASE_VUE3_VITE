import { trans } from '@/utils/language'

export const RULE_REQUIRED = (field) => {
	return {
		required: true,
		message: trans('validation.required', {
			_field_: trans(field),
		}),
		trigger: 'blur',
	}
}

export const RULE_EMAIL = computed(() => {
	return [
		RULE_REQUIRED('login.email'),
		{
			type: 'email',
			max: 64,
			message: trans('validation.email'),
			trigger: 'blur',
		},
	]
})

export const RULE_PASSWORD = computed(() => {
	return [
		{
			required: true,
			max: 32,
			message: trans('validation.required', {
				_field_: trans('login.password'),
			}),
			trigger: 'blur',
		},
	]
})
