// props select
export const COMMON_PROPS_SELECT = {
  classExtra: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => []
  },
  nameRef: {
    type: String,
    required: true,
    default: ''
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
  errorResponse: {
    type: String,
    default: ''
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
  loading: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  popperClass: {
    type: String,
    default: '',
  },
  noData: {
    type: String,
    default: '',
  },
  reserveKeyword: {
    type: Boolean,
    default: false,
  },
  automaticDropdown: {
    type: Boolean,
    default: false,
  },
}
