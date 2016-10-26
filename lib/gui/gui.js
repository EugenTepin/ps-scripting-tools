// ui вариации

//parent.add.apply(thisValue,[args])
//version A
/*{
	"controlName1": {
		params: [],
		//	handlers: [],
		children: [{}, {}]
	},
	"controlName2": {}
}*/


function extWindow(win) {
	var obj = Object.create(win);
	obj.controls = {};
	obj.addControl = function(uiRes, uiNode) {
		var controlsList = this.controls;
		var parent = uiNode || this;

		for (var uiResName in uiRes) {
			var resData = uiRes[uiResName];
			var control = parent.add.apply(parent, resData.params);
			if (uiResName in controlsList) {
				throw "Ошибка! конфликт имен";
			} else {
				controlsList[uiResName] = control;
			}
			if (children in resData && resData.children.length > 0) {
				this.addControl(resData.children, control);
			}
		}
		return this;
	}
	return obj;
}

module.exports = extWindow;