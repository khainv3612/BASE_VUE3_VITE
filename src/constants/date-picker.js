// props date
export const COMMON_PROPS_DATE = {
  classExtra: {
    type: String,
    default: '',
  },
  popperClass: {
    type: String,
    default: '',
  },
  ruleFormRef: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rules: {
    type: Object,
    default: () => []
  },
  model: {
    type: String,
    default: ''
  },
  nameRef: {
    type: String,
    required: true,
    default: ''
  },
  errorResponse: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  formatDate: {
    type: String,
    default: 'DD/MM/YYYY'
  },
  valueFormat: {
    type: String,
    default: 'DD/MM/YYYY'
  },
  tabindex: {
    type: Number,
    default: 1
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: 'LABEL'
  },
  isRequiredField: {
    type: Boolean,
    default: true
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
