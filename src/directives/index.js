import permission from './permission'
import copy from './copy'
import clickoutside from './clickoutside'
export default function (app) {
	app.directive('permission', permission)
	app.directive('copy', copy)
	app.directive('clickoutside', clickoutside)
}
