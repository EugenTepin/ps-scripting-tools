//var beholder = require('./lib/dataBinding/beholder.js');
//var addControl = require('./lib/addControl.js');
var dialogs = app.displayDialogs;
app.displayDialogs = DialogModes.NO;


var addControl = require('./lib/addControl.js');
/*
var alignLayer = require('./lib/alignLayer.js');
var setSelectionByLayer = require('./lib/setSelectionByLayer.js');
var placeFile = require('./lib/placeFile.js');
var setLayerMaskFromSelection = require('./lib/setLayerMaskFromSelection.js');
var linkLayerWithMask = require('./lib/linkLayerWithMask.js');
var transferLayerStyle = require('./lib/transferLayerStyle.js');
var resizeDocument = require('./lib/resizeDocument.js');
*/

/*
todo

test addControl
test beholder
test alignLayer
test getExtension

 */

/*var testFile = new File(Folder.desktop + '/psyduck.gif');
var killFile = new File(Folder.desktop + '/kill.tif');

var tpl = new Template(killFile);
tpl.open();
var lyr1 = tpl.findLayer('Layer 1');
var lyr2 = tpl.findLayer('Layer 2');
//var lyr3 = tpl.findLayer('txt');

tpl.insertPicture(lyr2, testFile);
tpl.insertPicture(lyr1, testFile);*/

/*
var l = doc.artLayers.getByName("Layer 2");
var psy = doc.artLayers.getByName("psyduck");


resizeDocument(doc, {
    width: new UnitValue(1000, 'px')
});*/

//transferLayerStyle(l, psy);
//linkLayerWithMask(psy, true);

//setLayerMaskFromSelection(psy);

//var f = new File('/c/Users/Eugen/Desktop/psyduck.gif');
//placeFile(f);


//setSelectionByLayer(l, 'layer');

/*alignLayer(l, {
    horizontal: 'right',
    vertical: 'top'
});*/


/*var dlg = new Window('dialog', 'Alert Box Builder', [0, 0, 500, 500]);


var guiObj = {
    myGroup: {
        params: ['group'],
        props: {
            orientation: 'column',
            margins: [50, 50, 50, 50]
        },
        children: {
            myInput: {
                params: ["edittext", undefined, "0"],
                listners: {
                    click: [
                        function(e) {
                            alert('hi!');
                        },
                        function(e) {
                            alert('Second Handler!');
                        },
                    ]
                }
            },
            myBtn: {
                params: ['button', undefined, "Увеличить"]
            }
        }
    }
};


var logPanel = {
    logPanel: {
        params: ['panel', undefined, 'Info', {
            borderStyle: 'gray'
        }],
        props: {},
        children: {
            log: {
                params: ['edittext', undefined, '', {
                    readonly: true,
                    borderless: true,
                    multiline: true
                }]
            }
        }
    }
}



addControl(dlg, guiObj);
addControl(dlg, logPanel);


$.writeln(dlg.controls['myGroup'].visible);

dlg.controls['myBtn'].onClick = function() {
    alert('1,2,3');
};

dlg.layout.layout(true);
dlg.center();
dlg.show();
*/

app.displayDialogs = dialogs;
