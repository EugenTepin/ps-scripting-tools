/**
 * This function adds UI elements to window object. 
 * @example 
 * var dlg = new Window('dialog', 'Alert Box Builder', [0, 0, 500, 500]);
 *
 * var button = {
 * 	params:['button', undefined, "Say hello!"],
 * 	listners: {
 * 		click: function(){
 * 			alert('HI!');
 * 		}
 * 	}
 * };
 *
 * var group = {
 *   myGroup: {
 *      params: ['group'],
 *      props: {
 *          orientation: 'column',
 *          margins: [50, 50, 50, 50]
 *      },
 *      children: {
 *          myInput: {
 *              params: ["edittext", undefined, "0"]
 *              }
 *          },
 *          myBtn: button,
 *      }
 *   }
 * };
 *
 * addControl(dlg, group);
 *
 * //dlg.controls['myGroup'] - reference to group container
 * //dlg.controls['myInput'] - reference to edittext control
 * //dlg.controls['myBtn'] - reference to button control
 * 
 * dlg.center();
 * dlg.show();
 * 
 * @param {object} container - window or ui container object
 * @param {object} uiResObj  - special object wich hold information about child controls see example
 *
 * @return {undefined}
 */
function addControl(container, uiResObj) {
    var win = container.window;
    win.controls = win.controls || {};
    var controlsList = win.controls;
    for (var uiResObjID in uiResObj) {
        var uiResData = uiResObj[uiResObjID];
        var control = container.add.apply(container, uiResData.params);
        if ('props' in uiResData) {
            for (var prop in uiResData.props) {
                control[prop] = uiResData.props[prop];
            }
        }

        if ('listners' in uiResData) {
            for (var eventName in uiResData.listners) {
                var listners = uiResData.listners[eventName]
                if (listners.__class__ === 'Array') {
                    listners.forEach(function(listner) {
                        control.addEventListener(eventName, listner);
                    });
                    /*for (var i = 0; i < listners.length; i++) {
                    	control.addEventListener(eventName, listners[i]);
                    };*/
                }
                if (listners.__class__ === 'Function') {
                    control.addEventListener(eventName, listners);
                }
            }
        }

        if (uiResObjID in controlsList) {
            throw 'IDs name conflict, this window already has control with such id: ' + uiResObjID;
        } else {
            controlsList[uiResObjID] = control;
        }
        if ('children' in uiResData) {
            addControl(control, uiResData.children);
        }
    }

}

module.exports = addControl;
