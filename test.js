var dialogs = app.displayDialogs;
app.displayDialogs = DialogModes.NO;
var startRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

var addControl = require('./lib/addControl.js');
var alignLayer = require('./lib/alignLayer.js');
var beholder = require('./lib/beholder.js');
var getExtension = require('./lib/getExtension.js');
var getFilesByExtension = require('./lib/getFilesByExtension.js');
var getFolders = require('./lib/getFolders.js');
var linkLayerWithMask = require('./lib/linkLayerWithMask.js');
var placeFile = require('./lib/placeFile.js');
var replaceContent = require('./lib/replaceContent.js');
var resizeDocument = require('./lib/resizeDocument.js');
var setDocumentResolution = require('./lib/setDocumentResolution.js');
var setLayerMaskFromSelection = require('./lib/setLayerMaskFromSelection.js');
var setSelectionByLayer = require('./lib/setSelectionByLayer.js');
var transferLayerStyle = require('./lib/transferLayerStyle.js');


var root = (new File($.fileName)).parent.parent;
//alert(root);

var template = new File(root + '/test/template.tif')
var photo = new File(root + '/test/watch.jpg')


app.open(template);
var doc = app.activeDocument;
doc.suspendHistory("testing ps-script-tools", "main();");

//app.activeDocument.activeLayer = layer;

function main() {
    replaceContent(photo, doc.layers.getByName('t1'), { method: 'conform', horizontal: 'right', vertical: 'top', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t2'), { method: 'conform', horizontal: 'center', vertical: 'top', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t3'), { method: 'conform', horizontal: 'left', vertical: 'top', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t4'), { method: 'conform', horizontal: 'right', vertical: 'center', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t5'), { method: 'conform', horizontal: 'left', vertical: 'center', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t6'), { method: 'conform', horizontal: 'right', vertical: 'bottom', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t7'), { method: 'conform', horizontal: 'center', vertical: 'bottom', revealAll: true });
 replaceContent(photo, doc.layers.getByName('t8'), { method: 'conform', horizontal: 'left', vertical: 'bottom', revealAll: true });


    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'as is', horizontal: 'right', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'as is', horizontal: 'center', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'as is', horizontal: 'left', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'as is', horizontal: 'right', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'as is', horizontal: 'left', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'as is', horizontal: 'right', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'as is', horizontal: 'center', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'as is', horizontal: 'left', vertical: 'bottom', revealAll: true });

    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'fit', horizontal: 'right', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'fit', horizontal: 'center', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'fit', horizontal: 'left', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'fit', horizontal: 'right', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'fit', horizontal: 'left', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'fit', horizontal: 'right', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'fit', horizontal: 'center', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'fit', horizontal: 'left', vertical: 'bottom', revealAll: true });

    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'fill', horizontal: 'right', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'fill', horizontal: 'center', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'fill', horizontal: 'left', vertical: 'top', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'fill', horizontal: 'right', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'fill', horizontal: 'left', vertical: 'center', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'fill', horizontal: 'right', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'fill', horizontal: 'center', vertical: 'bottom', revealAll: true });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'fill', horizontal: 'left', vertical: 'bottom', revealAll: true });

    //===================================================================================

    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'conform', horizontal: 'right', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'conform', horizontal: 'center', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'conform', horizontal: 'left', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'conform', horizontal: 'right', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'conform', horizontal: 'left', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'conform', horizontal: 'right', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'conform', horizontal: 'center', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'conform', horizontal: 'left', vertical: 'bottom', revealAll: false });


    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'as is', horizontal: 'right', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'as is', horizontal: 'center', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'as is', horizontal: 'left', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'as is', horizontal: 'right', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'as is', horizontal: 'left', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'as is', horizontal: 'right', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'as is', horizontal: 'center', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'as is', horizontal: 'left', vertical: 'bottom', revealAll: false });

    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'fit', horizontal: 'right', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'fit', horizontal: 'center', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'fit', horizontal: 'left', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'fit', horizontal: 'right', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'fit', horizontal: 'left', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'fit', horizontal: 'right', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'fit', horizontal: 'center', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'fit', horizontal: 'left', vertical: 'bottom', revealAll: false });

    // replaceContent(photo, doc.layers.getByName('t1'), { method: 'fill', horizontal: 'right', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t2'), { method: 'fill', horizontal: 'center', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t3'), { method: 'fill', horizontal: 'left', vertical: 'top', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t4'), { method: 'fill', horizontal: 'right', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t5'), { method: 'fill', horizontal: 'left', vertical: 'center', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t6'), { method: 'fill', horizontal: 'right', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t7'), { method: 'fill', horizontal: 'center', vertical: 'bottom', revealAll: false });
    // replaceContent(photo, doc.layers.getByName('t8'), { method: 'fill', horizontal: 'left', vertical: 'bottom', revealAll: false });




    // ============================== PLACE
    /*
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'left', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'center', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'conform', horizontal: 'right', vertical: 'bottom', linked: false });
    */

    /*
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'left', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'center', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'as is', horizontal: 'right', vertical: 'bottom', linked: false });
    */
    /*
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'left', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'center', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'fit', horizontal: 'right', vertical: 'bottom', linked: false });
    */
    /*
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'top', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'center', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'bottom', linked: true });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'top', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'center', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'left', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'center', vertical: 'bottom', linked: false });
    placeFile(photo, undefined, { method: 'fill', horizontal: 'right', vertical: 'bottom', linked: false });
    */




    /*placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'left', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'center', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'conform', horizontal: 'right', vertical: 'bottom', copyLayerStyle: false });
    */

    /*
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'left', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'center', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'as is', horizontal: 'right', vertical: 'bottom', copyLayerStyle: false });
    */

    /*
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'left', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'center', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test1'), { method: 'fill', horizontal: 'right', vertical: 'bottom', copyLayerStyle: false });
    */

    /*placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'top', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'center', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'bottom', copyLayerStyle: true });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'top', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'center', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'left', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'center', vertical: 'bottom', copyLayerStyle: false });
    placeFile(photo, doc.layers.getByName('test3'), { method: 'fit', horizontal: 'right', vertical: 'bottom', copyLayerStyle: false });*/

    /*
    placeFile(photo, doc.layers.getByName('test1'), { method: '', horizontal: '', vertical: '', copyLayerStyle: });


    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    placeFile(photo, doc.layers.getByName(''), { method: '', horizontal: '', vertical: '', linked: , copyLayerStyle: });
    */
}
app.displayDialogs = dialogs;
app.preferences.rulerUnits = startRulerUnits;
