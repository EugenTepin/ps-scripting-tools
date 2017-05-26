/**
 * Places file in active document as smart object.
 * @param {file}    file                            - ExtendScript file reference.
 * @param {layer}   [layer]                         - Adobe Photoshop layer reference.
 * @param {object}  [options]                       - options for the file placement.
 * @param {string}  [options.method = fill]         - "fill", "fit", "as is" or "conform".
 * @param {string}  [options.horizontal = center]   - "left", "center" or "right".
 * @param {string}  [options.vertical = center]     - "top", "center" or "bottom".
 * @param {boolean} [options.linked = false]        - true means linked file, false means embedded file.
 * @param {boolean} [options.copyLayerStyle = true] - valid only if layer param is supported, if true will copy layer style from layer to pasted file.
 *
 * @return {layer}
 */
module.exports = function(file, layer, options) {

    var setDocumentResolution = require('./setDocumentResolution.js');
    var resizeDocument = require('./resizeDocument.js');
    var alignLayer = require('./alignLayer.js');
    var setSelectionByLayer = require('./setSelectionByLayer.js');
    var linkLayerWithMask = require('./linkLayerWithMask.js');
    var layerHasMask = require('./layerHasMask.js');
    var transferLayerStyle = require('./transferLayerStyle.js');
    var setLayerMaskFromSelection = require('./setLayerMaskFromSelection.js');
    var getAppResizeOnPlace = require('./getAppResizeOnPlace.js');
    var setAppResizeOnPlace = require('./setAppResizeOnPlace.js');


    function scaleFactor(a, b, method) {
        var f = {
            'fill': Math.max(a.width / b.width, a.height / b.height),
            'fit': Math.min(a.width / b.width, a.height / b.height),
            'as is': 1,
            'conform': -1
        };
        return f[method];
    }

    // place linked and place embeded
    function place(f, linked) {
        if (linked) {
            var idPlc = charIDToTypeID("Plc ");
            var desc25 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            desc25.putPath(idnull, f);
            var idLnkd = charIDToTypeID("Lnkd");
            desc25.putBoolean(idLnkd, true);
            var idFTcs = charIDToTypeID("FTcs");
            var idQCSt = charIDToTypeID("QCSt");
            var idQcsa = charIDToTypeID("Qcsa");
            desc25.putEnumerated(idFTcs, idQCSt, idQcsa);
            var idOfst = charIDToTypeID("Ofst");
            var desc26 = new ActionDescriptor();
            var idHrzn = charIDToTypeID("Hrzn");
            var idPxl = charIDToTypeID("#Pxl");
            desc26.putUnitDouble(idHrzn, idPxl, 0.000000);
            var idVrtc = charIDToTypeID("Vrtc");
            var idPxl = charIDToTypeID("#Pxl");
            desc26.putUnitDouble(idVrtc, idPxl, 0.000000);
            var idOfst = charIDToTypeID("Ofst");
            desc25.putObject(idOfst, idOfst, desc26);
            executeAction(idPlc, desc25, DialogModes.NO);
        } else {
            var idPlc = charIDToTypeID("Plc ");
            var desc141 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            desc141.putPath(idnull, f);
            var idFTcs = charIDToTypeID("FTcs");
            var idQCSt = charIDToTypeID("QCSt");
            var idQcsa = charIDToTypeID("Qcsa");
            desc141.putEnumerated(idFTcs, idQCSt, idQcsa);
            var idOfst = charIDToTypeID("Ofst");
            var desc142 = new ActionDescriptor();
            var idHrzn = charIDToTypeID("Hrzn");
            var idPxl = charIDToTypeID("#Pxl");
            desc142.putUnitDouble(idHrzn, idPxl, 0.000000);
            var idVrtc = charIDToTypeID("Vrtc");
            var idPxl = charIDToTypeID("#Pxl");
            desc142.putUnitDouble(idVrtc, idPxl, 0.000000);
            var idOfst = charIDToTypeID("Ofst");
            desc141.putObject(idOfst, idOfst, desc142);
            executeAction(idPlc, desc141, DialogModes.NO);
        }
    }

    if (!file.exists) {
        throw ("File [" + File.decode(file.absoluteURI) + "] does not exist!");
    }

    var curentActiveDocument = app.activeDocument;
    var curentActiveLayer = app.activeDocument.activeLayer;
    var resizeDuringPlace = getAppResizeOnPlace();

    if (options !== void 0) {
        var method = options.method || "fill";
        var horizontal = options.horizontal || "center";
        var vertical = options.vertical || "center";
        var linked = (typeof options.linked === 'boolean') ? options.linked : false;
        var copyLayerStyle = (typeof options.copyLayerStyle === 'boolean') ? options.copyLayerStyle : true;
    } else {
        var method = "fill";
        var horizontal = "center";
        var vertical = "center";
        var linked = false;
        var copyLayerStyle = true;
    }


    if (layer !== void 0) {
        app.activeDocument.activeLayer = layer;
        //trying to set selection in a form of layer mask if not, will make it in a form of layer
        var selection = (layerHasMask(layer)) ? setSelectionByLayer(layer, 'mask') : setSelectionByLayer(layer, 'layer');
        // if selected layer is empty, select all 
        if (selection.reflect.find('bounds').dataType !== 'array') {
            selection.selectAll();
        }
    } else {
        // if no layer supported, select all 
        app.activeDocument.selection.selectAll();
        var selection = app.activeDocument.selection;
    }
    // Selection bounds must be in specific format if you whant Selection.select method work:
    // Array of x and y coordinates that describe the corners of the selection, in the format [[x1, y1], [x2,y2],[x3, y3], [x4,y4]]
    var selectionBounds = [];
    selectionBounds.push([selection.bounds[0].as('px'), selection.bounds[1].as('px')]);
    selectionBounds.push([selection.bounds[0].as('px'), selection.bounds[3].as('px')]);
    selectionBounds.push([selection.bounds[2].as('px'), selection.bounds[3].as('px')]);
    selectionBounds.push([selection.bounds[2].as('px'), selection.bounds[1].as('px')]);

    // calculating width and height to wich we need to resize placed file using method (fit, fill ...)
    var layerBounds = {
        width: (selection.bounds[2] - selection.bounds[0]),
        height: (selection.bounds[3] - selection.bounds[1])
    };

    // add empty layer where file will be placed
    app.activeDocument.activeLayer = app.activeDocument.artLayers.add();
    // switch off photoshop ability to automatic resize placed file, restore it later
    setAppResizeOnPlace(false);
    app.activeDocument.selection.deselect();

    place(file, linked);

    // calculating width and height of placed file and then resize this layer
    var pic = app.activeDocument.activeLayer;
    var picBounds = {
        width: (pic.bounds[2] - pic.bounds[0]),
        height: (pic.bounds[3] - pic.bounds[1])
    };

    var scale = scaleFactor(layerBounds, picBounds, method);
    if (scale > 0) {
        pic.resize(scale * 100, scale * 100);
    } else {
        pic.resize(100 * layerBounds.width / picBounds.width, 100 * layerBounds.height / picBounds.height);
    }

    // restore selection and align placed file according to this selection
    app.activeDocument.selection.select(selectionBounds);


    alignLayer(pic, {
        horizontal: horizontal,
        vertical: vertical
    });

    //mask placed file with layer mask and unlik it from mask
    setLayerMaskFromSelection(pic);
    linkLayerWithMask(pic, false);
    app.activeDocument.selection.deselect();

    // transfer layer effects if needed
    if (layer !== void 0 && copyLayerStyle) {
        transferLayerStyle(layer, pic);
    }

    // restore app state
    app.activeDocument = curentActiveDocument;
    app.activeDocument.activeLayer = curentActiveLayer;
    setAppResizeOnPlace(resizeDuringPlace);
    return pic;
}
