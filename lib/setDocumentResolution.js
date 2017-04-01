/**
 * Sets dpi in specified document.
 * @param {document} doc        - Adobe Photoshop document reference.
 * @param {double}   resolution - dot per inch.
 *
 * @return {undefined}
 */
module.exports = function(doc, resolution) {
	var currentDoc = app.activeDocument;
	app.activeDocument = doc;

	var idImgS = charIDToTypeID("ImgS");
	var desc10 = new ActionDescriptor();
	var idRslt = charIDToTypeID("Rslt");
	var idRsl = charIDToTypeID("#Rsl");
	desc10.putUnitDouble(idRslt, idRsl, resolution);
	executeAction(idImgS, desc10, DialogModes.NO);

	app.activeDocument = currentDoc;
}