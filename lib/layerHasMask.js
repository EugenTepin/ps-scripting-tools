/**
 * Check if layer has layers mask.
 * @param {layer} layer - layer to check.
 *
 * @return {Boolean} 
 */
module.exports = function(layer) {
    var curentActiveLayer = app.activeDocument.activeLayer;
    app.activeDocument.activeLayer = layer;
    var ref = new ActionReference();
    var descr = new ActionDescriptor();
    ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('UsrM'));
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    descr.putReference(charIDToTypeID('null'), ref);
    var resultDesc = executeAction(charIDToTypeID('getd'), descr, DialogModes.NO);

    app.activeDocument.activeLayer = curentActiveLayer;
    return resultDesc.hasKey(charIDToTypeID('UsrM'));
}
