/**
 * Links or unlinks layer and its mask.
 * @param {layer}   layer - Photoshop layer reference.
 * @param {boolean} link  - true means layer and mask are linked, false means unlinked
 *
 * @return {undefined}
 */
module.exports = function(layer, link) {
    // контроль типа входных параметров
    var currentLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;

    var idsetd = charIDToTypeID("setd");
    var desc294 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref171 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref171.putEnumerated(idLyr, idOrdn, idTrgt);
    desc294.putReference(idnull, ref171);
    var idT = charIDToTypeID("T   ");
    var desc295 = new ActionDescriptor();
    var idUsrs = charIDToTypeID("Usrs");
    desc295.putBoolean(idUsrs, link);
    var idLyr = charIDToTypeID("Lyr ");
    desc294.putObject(idT, idLyr, desc295);
    executeAction(idsetd, desc294, DialogModes.NO);

    app.activeDocument.activeLayer = currentLayer;
}