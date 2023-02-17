// props textarea
export const COMMON_PROPS_TEXTAREA = {
	classExtra: {
		type: String,
		default: '',
	},
	ruleFormRef: {
		type: Object,
		default: () => {
			return {}
		},
	},
	showLimit: {
		type: Boolean,
		default: false,
	},
	minRow: {
		type: Number,
		default: 3,
	},
	maxRow: {
		type: Number,
		default: 5,
	},
	rules: {
		type: Object,
		default: () => [],
	},
	model: {
		type: String,
		default: '',
	},
	nameRef: {
		type: String,
		required: true,
		default: '',
	},
	errorResponse: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	maxlength: {
		type: Number,
		default: 1000,
	},
	minlength: {
		type: Number,
		default: 0,
	},
	tabindex: {
		type: Number,
		default: 1,
	},
	showLabel: {
		type: Boolean,
		default: true,
	},
	label: {
		type: String,
		default: 'LABEL',
	},
	isRequiredField: {
		type: Boolean,
		default: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	readonly: {
		type: Boolean,
		default: false,
	},
}
