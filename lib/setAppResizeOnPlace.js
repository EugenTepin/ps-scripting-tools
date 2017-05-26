/**
 * Sets photoshop general preference "Resize Image During Place"
 * @param {boolean} checked - true means checked, false - unckecked
 *
 * @return {undefined}
 */
module.exports = function(checked) {
    var idsetd = charIDToTypeID("setd");
    var desc65 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref28 = new ActionReference();
    var idPrpr = charIDToTypeID("Prpr");
    var idGnrP = charIDToTypeID("GnrP");
    ref28.putProperty(idPrpr, idGnrP);
    var idcapp = charIDToTypeID("capp");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref28.putEnumerated(idcapp, idOrdn, idTrgt);
    desc65.putReference(idnull, ref28);
    var idT = charIDToTypeID("T   ");
    var desc66 = new ActionDescriptor();
    var idresizePastePlace = stringIDToTypeID("resizePastePlace");
    desc66.putBoolean(idresizePastePlace, checked);
    var idlegacyPathDrag = stringIDToTypeID("legacyPathDrag");
    desc66.putBoolean(idlegacyPathDrag, true);
    var idvectorSelectionModifiesLayerSelection = stringIDToTypeID("vectorSelectionModifiesLayerSelection");
    desc66.putBoolean(idvectorSelectionModifiesLayerSelection, true);
    var idGnrP = charIDToTypeID("GnrP");
    desc65.putObject(idT, idGnrP, desc66);
    executeAction(idsetd, desc65, DialogModes.NO);
}
