/**
 * Align layer with current selection in vertical and/or horizontal direction. 
 * If there is no selection in active document, will throw error!
 * @param {layer}  layer                  - Photoshop layer reference.
 * @param {object} direction              - object that holds aligment properties
 * @param {string} [direction.horizontal] - defines horizontal aligment, valid values left|center|right
 * @param {string} [direction.vertical]   - defines vertical aligment, valid values top|center|bottom
 *
 * @return {undefined}
 */
module.exports = function(layer, direction) {

    try {
        app.activeDocument.selection.bounds
    } catch (e) {
        throw "There is no selection in current document, can not align layer.";
    }


    var currentLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;

    var alignMapVertical = {
        top: "AdTp",
        center: "AdCV",
        bottom: "AdBt"
    };

    var alignMapHorizontal = {
        left: "AdLf",
        center: "AdCH",
        right: "AdRg"
    };

    function alignLyr(dir) {
        var idAlgn = charIDToTypeID("Algn");
        var desc = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref.putEnumerated(idLyr, idOrdn, idTrgt);
        desc.putReference(idnull, ref);
        var idUsng = charIDToTypeID("Usng");
        var idADSt = charIDToTypeID("ADSt");
        var idAdTp = charIDToTypeID(dir);
        desc.putEnumerated(idUsng, idADSt, idAdTp);
        executeAction(idAlgn, desc, DialogModes.NO);
    }

    if ('horizontal' in direction) {
        var alignH = alignMapHorizontal[direction.horizontal];
        if (alignH !== void 0) {
            alignLyr(alignH);
        } else {
            app.activeDocument.activeLayer = currentLayer;
            throw "Unknown horizontal aligment parameter: " + direction.horizontal;
        }
    }

    if ('vertical' in direction) {
        var alignV = alignMapVertical[direction.vertical];
        if (alignV !== void 0) {
            alignLyr(alignV);
        } else {
            app.activeDocument.activeLayer = currentLayer;
            throw "Unknown vertical aligment parameter: " + direction.vertical;
        }
    }

    app.activeDocument.activeLayer = currentLayer;

    return layer;
}