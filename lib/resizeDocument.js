/**
 * Resizes active document using props.
 * @param {document}   doc                               - Adobe Photoshop document reference.
 * @param {object}     props                             - object with resize parameters.
 * @param {unit value} props.widht                       - new width of active document.
 * @param {unit value} props.height                      - new height of active document.
 * @param {boolean}    [props.constrainProportions=true] - if true will constrain proportions of a document
 * @param {boolean}    [props.scaleStyles=true]          - if true will scale layer styles.
 * @param {string}     [props.method=bicubicAutomatic]   - which method of resampling to use: nearest|bilinear|bicubic|bicubicSmoother|bicubicSharper|bicubicAutomatic
 *
 * @return {undefined}
 */
module.exports = function(doc, props) {

    var currentDoc = app.activeDocument;
    app.activeDocument = doc;
    var interpMethodsMap = {
        nearest: charIDToTypeID("Nrst"),
        bilinear: charIDToTypeID("Blnr"),
        bicubic: charIDToTypeID("Bcbc"),
        bicubicSmoother: stringIDToTypeID("bicubicSmoother"),
        bicubicSharper: stringIDToTypeID("bicubicSharper"),
        bicubicAutomatic: stringIDToTypeID("bicubicAutomatic"),
    };

    var proportion = ('constrainProportions' in props) ? props.constrainProportions : true;
    var scaleStyles = ('scaleStyles' in props) ? props.scaleStyles : true;

    var method = (interpMethodsMap[props.method]) ? interpMethodsMap[props.method] : interpMethodsMap['bicubicAutomatic'];
    var width = props.width;
    var height = props.height;

    if (!proportion) {
        var idImgS = charIDToTypeID("ImgS");
        var desc13 = new ActionDescriptor();
        var idWdth = charIDToTypeID("Wdth");
        var idPxl = charIDToTypeID("#Pxl");
        desc13.putUnitDouble(idWdth, idPxl, width.as("px"));
        var idHght = charIDToTypeID("Hght");
        var idPxl = charIDToTypeID("#Pxl");
        desc13.putUnitDouble(idHght, idPxl, height.as("px"));
        var idIntr = charIDToTypeID("Intr");
        var idIntp = charIDToTypeID("Intp");
        var idbicubicAutomatic = method;
        desc13.putEnumerated(idIntr, idIntp, idbicubicAutomatic);
        executeAction(idImgS, desc13, DialogModes.NO);
    } else {
        if (height !== undefined) {
            var idImgS = charIDToTypeID("ImgS");
            var desc12 = new ActionDescriptor();
            var idHght = charIDToTypeID("Hght");
            var idPxl = charIDToTypeID("#Pxl");
            desc12.putUnitDouble(idHght, idPxl, height.as("px"));
            var idscaleStyles = stringIDToTypeID("scaleStyles");
            desc12.putBoolean(idscaleStyles, scaleStyles);
            var idCnsP = charIDToTypeID("CnsP");
            desc12.putBoolean(idCnsP, true);
            var idIntr = charIDToTypeID("Intr");
            var idIntp = charIDToTypeID("Intp");
            var idbicubicAutomatic = method;
            desc12.putEnumerated(idIntr, idIntp, idbicubicAutomatic);
            executeAction(idImgS, desc12, DialogModes.NO);
        }

        if (width !== undefined) {
            var idImgS = charIDToTypeID("ImgS");
            var desc11 = new ActionDescriptor();
            var idWdth = charIDToTypeID("Wdth");
            var idPxl = charIDToTypeID("#Pxl");
            desc11.putUnitDouble(idWdth, idPxl, width.as("px"));
            var idscaleStyles = stringIDToTypeID("scaleStyles");
            desc11.putBoolean(idscaleStyles, scaleStyles);
            var idCnsP = charIDToTypeID("CnsP");
            desc11.putBoolean(idCnsP, true);
            var idIntr = charIDToTypeID("Intr");
            var idIntp = charIDToTypeID("Intp");
            var idbicubicAutomatic = method;
            desc11.putEnumerated(idIntr, idIntp, idbicubicAutomatic);
            executeAction(idImgS, desc11, DialogModes.NO);
        }
    }
    app.activeDocument = currentDoc;
}