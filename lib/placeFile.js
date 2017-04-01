/**
 * Places file in active document as smart object.
 * @param {file} file - ExtendScript file reference.
 *
 * @return {undefined}
 */
module.exports = function(file) {
    var idPlc = charIDToTypeID("Plc ");
    var desc141 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc141.putPath(idnull, file);
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