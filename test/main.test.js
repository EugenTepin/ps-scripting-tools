/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var obj = {};
	obj.addControl = __webpack_require__(10);
	obj.alignLayer = __webpack_require__(3);
	obj.beholder = __webpack_require__(37);
	obj.getExtension = __webpack_require__(38);
	obj.getFilesByExtension = __webpack_require__(39);
	obj.getFolders = __webpack_require__(40);
	obj.linkLayerWithMask = __webpack_require__(7);
	obj.placeFile = __webpack_require__(5);
	obj.resizeDocument = __webpack_require__(9);
	obj.setDocumentResolution = __webpack_require__(41);
	obj.setLayerMaskFromSelection = __webpack_require__(6);
	obj.setSelectionByLayer = __webpack_require__(4);
	obj.transferLayerStyle = __webpack_require__(8);
	module.exports = obj;


/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Set active selection according to layer or layer mask.
	 * @param {string} layerName - layer name.
	 * @param {string} area      - definese from wich boundaries (layer or layer mask) selection will be formed
	 *
	 * @return {undefined}
	 */
	module.exports = function(layerName, area) {
	    var selectionMap = {
	        mask: "Msk ",
	        layer: "Trsp"
	    };

	    if (selectionMap[area] !== void 0) {
	        var idsetd = charIDToTypeID("setd");
	        var desc19 = new ActionDescriptor();
	        var idnull = charIDToTypeID("null");
	        var ref9 = new ActionReference();
	        var idChnl = charIDToTypeID("Chnl");
	        var idfsel = charIDToTypeID("fsel");
	        ref9.putProperty(idChnl, idfsel);
	        desc19.putReference(idnull, ref9);
	        var idT = charIDToTypeID("T   ");
	        var ref10 = new ActionReference();
	        var idChnl = charIDToTypeID("Chnl");
	        var idChnl = charIDToTypeID("Chnl");
	        var id = charIDToTypeID(selectionMap[area]);
	        ref10.putEnumerated(idChnl, idChnl, id);
	        var idLyr = charIDToTypeID("Lyr ");
	        ref10.putName(idLyr, layerName);
	        desc19.putReference(idT, ref10);
	        executeAction(idsetd, desc19, DialogModes.NO);
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Set layer mask from active selection.
	 * @param {layer} layer - Adobe Photoshop layer reference.
	 *
	 * @return {undefined}
	 */
	module.exports = function(layer) {
	    var currentLayer = app.activeDocument.activeLayer;
	    app.activeDocument.activeLayer = layer;

	    var idMk = charIDToTypeID("Mk  ");
	    var desc29 = new ActionDescriptor();
	    var idNw = charIDToTypeID("Nw  ");
	    var idChnl = charIDToTypeID("Chnl");
	    desc29.putClass(idNw, idChnl);
	    var idAt = charIDToTypeID("At  ");
	    var ref14 = new ActionReference();
	    var idChnl = charIDToTypeID("Chnl");
	    var idChnl = charIDToTypeID("Chnl");
	    var idMsk = charIDToTypeID("Msk ");
	    ref14.putEnumerated(idChnl, idChnl, idMsk);
	    desc29.putReference(idAt, ref14);
	    var idUsng = charIDToTypeID("Usng");
	    var idUsrM = charIDToTypeID("UsrM");
	    var idRvlS = charIDToTypeID("RvlS");
	    desc29.putEnumerated(idUsng, idUsrM, idRvlS);
	    executeAction(idMk, desc29, DialogModes.NO);

	    app.activeDocument.activeLayer = currentLayer;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Transfers layer style from one layer to another.
	 * @param {layer} from - layer donor of layer style.
	 * @param {layer} to   - layer recipient of layer style.
	 *
	 * @return {boolean} returns true if layer style transfer was succesfull, false otherwise.
	 */
	module.exports = function(from, to) {
		var currentLayer = app.activeDocument.activeLayer;
		try {
			app.activeDocument.activeLayer = from;
			var idCpFX = charIDToTypeID("CpFX");
			executeAction(idCpFX, undefined, DialogModes.NO);

			app.activeDocument.activeLayer = to;
			var idPaFX = charIDToTypeID("PaFX");
			var desc22 = new ActionDescriptor();
			var idallowPasteFXOnLayerSet = stringIDToTypeID("allowPasteFXOnLayerSet");
			desc22.putBoolean(idallowPasteFXOnLayerSet, true);
			executeAction(idPaFX, desc22, DialogModes.NO);
		} catch (e) {
			app.activeDocument.activeLayer = currentLayer;
			return false;
		}
		app.activeDocument.activeLayer = currentLayer;
		return true;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * This function adds UI elements to window object. 
	 * @example 
	 * var dlg = new Window('dialog', 'Alert Box Builder', [0, 0, 500, 500]);
	 *
	 * var button = {
	 * 	params:['button', undefined, "Say hello!"],
	 * 	listners: {
	 * 		click: function(){
	 * 			alert('HI!');
	 * 		}
	 * 	}
	 * };
	 *
	 * var group = {
	 *   myGroup: {
	 *      params: ['group'],
	 *      props: {
	 *          orientation: 'column',
	 *          margins: [50, 50, 50, 50]
	 *      },
	 *      children: {
	 *          myInput: {
	 *              params: ["edittext", undefined, "0"]
	 *              }
	 *          },
	 *          myBtn: button,
	 *      }
	 *   }
	 * };
	 *
	 * addControl(dlg, group);
	 *
	 * //dlg.controls['myGroup'] - reference to group container
	 * //dlg.controls['myInput'] - reference to edittext control
	 * //dlg.controls['myBtn'] - reference to button control
	 * 
	 * dlg.center();
	 * dlg.show();
	 * 
	 * @param {object} container - window or ui container object
	 * @param {object} uiResObj  - special object wich hold information about child controls see example
	 *
	 * @return {undefined}
	 */
	function addControl(container, uiResObj) {
	    var win = container.window;
	    win.controls = win.controls || {};
	    var controlsList = win.controls;
	    for (var uiResObjID in uiResObj) {
	        var uiResData = uiResObj[uiResObjID];
	        var control = container.add.apply(container, uiResData.params);
	        if ('props' in uiResData) {
	            for (var prop in uiResData.props) {
	                control[prop] = uiResData.props[prop];
	            }
	        }

	        if ('listners' in uiResData) {
	            for (var eventName in uiResData.listners) {
	                var listners = uiResData.listners[eventName]
	                if (listners.__class__ === 'Array') {
	                    listners.forEach(function(listner) {
	                        control.addEventListener(eventName, listner);
	                    });
	                    /*for (var i = 0; i < listners.length; i++) {
	                    	control.addEventListener(eventName, listners[i]);
	                    };*/
	                }
	                if (listners.__class__ === 'Function') {
	                    control.addEventListener(eventName, listners);
	                }
	            }
	        }

	        if (uiResObjID in controlsList) {
	            throw 'IDs name conflict, this window already has control with such id: ' + uiResObjID;
	        } else {
	            controlsList[uiResObjID] = control;
	        }
	        if ('children' in uiResData) {
	            addControl(control, uiResData.children);
	        }
	    }

	}

	module.exports = addControl;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	TODO
	1) Make a list with functionality that need to patch [done]
	2) Get "blueprints" of these methods [done]
	3) Rewrite methods with Photoshop javascript environment and "blueprints" licences in mind

	Function
	• Function.bind [done]

	Object
	• Object.defineProperty [done]
	• Object.getOwnPropertyDescriptor [done]
	• Object.defineProperties 	 [done]
	• Object.create			  	 [done]
	• Object.getOwnPropertyNames [done]
	• Object.getPrototypeOf		 [done]
	• Object.preventExtensions   [done]
	• Object.isExtensible		 [done]
	• Object.seal 				 [done]
	• Object.isSealed(obj)		 [done]
	• Object.freeze 			 [done]
	• Object.isFrozen(obj)		 [done]
	• Object.keys 				 [done]

	Array
	• Array.isArray					[done]
	• Array.prototype.indexOf 		[done]
	• Array.prototype.lastIndexOf	[done]
	• Array.prototype.every 		[done]
	• Array.prototype.some			[done]
	• Array.prototype.forEach		[done]
	• Array.prototype.map			[done]
	• Array.prototype.filter		[done]
	• Array.prototype.reduce 		[done]
	• Array.prototype.reduceRight	[done]


	String
	• String.prototype.trim	

	Other
	• console.log
	• window



	*/
	__webpack_require__(12)

	__webpack_require__(13)
	__webpack_require__(14)
	__webpack_require__(15)
	__webpack_require__(16)
	__webpack_require__(17)
	__webpack_require__(18)
	__webpack_require__(19)
	__webpack_require__(20)
	__webpack_require__(21)
	__webpack_require__(22)

	__webpack_require__(23)

	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);

/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	*/
	if (!String.prototype.trim) {
		// Вырезаем BOM и неразрывный пробел
		String.prototype.trim = function() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
	*/
	if (!Array.prototype.every) {
	  Array.prototype.every = function(callback, thisArg) {
	    var T, k;

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.every called on null or undefined');
	    }

	    // 1. Let O be the result of calling ToObject passing the this 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal method
	    //    of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    T = (arguments.length > 1) ? thisArg : void 0;

	    // 6. Let k be 0.
	    k = 0;

	    // 7. Repeat, while k < len
	    while (k < len) {

	      var kValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal method
	        //    of O with argument Pk.
	        kValue = O[k];

	        // ii. Let testResult be the result of calling the Call internal method
	        //     of callback with T as the this value and argument list 
	        //     containing kValue, k, and O.
	        var testResult = callback.call(T, kValue, k, O);

	        // iii. If ToBoolean(testResult) is false, return false.
	        if (!testResult) {
	          return false;
	        }
	      }
	      k++;
	    }
	    return true;
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	*/
	if (!Array.prototype.filter) {
	  Array.prototype.filter = function(callback, thisArg) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.filter called on null or undefined');
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var res = [];

	    var T = (arguments.length > 1) ? thisArg : void 0;
	    
	    for (var i = 0; i < len; i++) {
	      if (i in t) {
	        var val = t[i];

	        // NOTE: Technically this should Object.defineProperty at
	        //       the next index, as push can be affected by
	        //       properties on Object.prototype and Array.prototype.
	        //       But that method's new, and collisions should be
	        //       rare, so use the more-compatible alternative.
	        if (callback.call(T, val, i, t)) {
	          res.push(val);
	        }
	      }
	    }

	    return res;
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function(callback, thisArg) {


	        if (this === void 0 || this === null) {
	            throw new TypeError('Array.prototype.forEach called on null or undefined');
	        }

	        // 1. Let O be the result of calling toObject() passing the
	        // |this| value as the argument.
	        var O = Object(this);

	        // 2. Let lenValue be the result of calling the Get() internal
	        // method of O with the argument "length".
	        // 3. Let len be toUint32(lenValue).
	        var len = O.length >>> 0;

	        // 4. If isCallable(callback) is false, throw a TypeError exception. 
	        // See: http://es5.github.com/#x9.11
	        if (callback.__class__ !== 'Function') {
	            throw new TypeError(callback + ' is not a function');
	        }

	        // 5. If thisArg was supplied, let T be thisArg; else let
	        // T be undefined.
	        var T = (arguments.length > 1) ? thisArg : void 0;


	        // 6. Let k be 0
	        //k = 0;

	        // 7. Repeat, while k < len
	        for (var k = 0; k < len; k++) {
	            var kValue;
	            // a. Let Pk be ToString(k).
	            //    This is implicit for LHS operands of the in operator
	            // b. Let kPresent be the result of calling the HasProperty
	            //    internal method of O with argument Pk.
	            //    This step can be combined with c
	            // c. If kPresent is true, then
	            if (k in O) {
	                // i. Let kValue be the result of calling the Get internal
	                // method of O with argument Pk.
	                kValue = O[k];
	                // ii. Call the Call internal method of callback with T as
	                // the this value and argument list containing kValue, k, and O.
	                callback.call(T, kValue, k, O);
	            }
	        }
	        // 8. return undefined
	    }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {


	    // 1. Let o be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.indexOf called on null or undefined');
	    }

	    var k;
	    var o = Object(this);

	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of o with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = o.length >>> 0;

	    // 4. If len is 0, return -1.
	    if (len === 0) {
	      return -1;
	    }

	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = +fromIndex || 0;

	    if (Math.abs(n) === Infinity) {
	      n = 0;
	    }

	    // 6. If n >= len, return -1.
	    if (n >= len) {
	      return -1;
	    }

	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of o with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of o with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in o && o[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	*/
	if (!Array.isArray) {
	  Array.isArray = function(arg) {

	    if (arg === void 0 || arg === null) {
	      return false;
	    }
	  	return (arg.__class__ === 'Array');
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.15
	// Reference: http://es5.github.io/#x15.4.4.15
	if (!Array.prototype.lastIndexOf) {
	  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
	    }

	    var n, k,
	      t = Object(this),
	      len = t.length >>> 0;
	    if (len === 0) {
	      return -1;
	    }

	    n = len - 1;
	    if (arguments.length > 1) {
	      n = Number(arguments[1]);
	      if (n != n) {
	        n = 0;
	      }
	      else if (n != 0 && n != Infinity && n != -Infinity) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	      }
	    }

	    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
	      if (k in t && t[k] === searchElement) {
	        return k;
	      }
	    }
	    return -1;
	  };
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

	  Array.prototype.map = function(callback, thisArg) {

	    var T, A, k;

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.map called on null or undefined');
	    }

	    // 1. Let O be the result of calling ToObject passing the |this| 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal 
	    //    method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    T = (arguments.length > 1) ? thisArg : void 0;

	    // 6. Let A be a new array created as if by the expression new Array(len) 
	    //    where Array is the standard built-in constructor with that name and 
	    //    len is the value of len.
	    A = new Array(len);

	    for (var k = 0; k < len; k++) {

	      var kValue, mappedValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal 
	        //    method of O with argument Pk.
	        kValue = O[k];

	        // ii. Let mappedValue be the result of calling the Call internal 
	        //     method of callback with T as the this value and argument 
	        //     list containing kValue, k, and O.
	        mappedValue = callback.call(T, kValue, k, O);

	        // iii. Call the DefineOwnProperty internal method of A with arguments
	        // Pk, Property Descriptor
	        // { Value: mappedValue,
	        //   Writable: true,
	        //   Enumerable: true,
	        //   Configurable: true },
	        // and false.

	        // In browsers that support Object.defineProperty, use the following:
	        // Object.defineProperty(A, k, {
	        //   value: mappedValue,
	        //   writable: true,
	        //   enumerable: true,
	        //   configurable: true
	        // });

	        // For best browser support, use the following:
	        A[k] = mappedValue;
	      }
	    }
	    // 9. return A
	    return A;
	  };
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.21
	// Reference: http://es5.github.io/#x15.4.4.21
	if (!Array.prototype.reduce) {
	  Array.prototype.reduce = function(callback, initialValue) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.reduce called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this), len = t.length >>> 0, k = 0, value;

	    if (arguments.length > 1) 
	      {
	        value = initialValue;
	      } 
	    else 
	      {
	        while (k < len && !(k in t)) {
	          k++; 
	        }
	        if (k >= len) {
	          throw new TypeError('Reduce of empty array with no initial value');
	        }
	        value = t[k++];
	      }

	    for (; k < len; k++) {
	      if (k in t) {
	        value = callback(value, t[k], k, t);
	      }
	    }
	    return value;
	  };
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.22
	// Reference: http://es5.github.io/#x15.4.4.22
	if (!Array.prototype.reduceRight) {
	  Array.prototype.reduceRight = function(callback, initialValue) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
	    if (arguments.length > 1) 
	      {
	        value = initialValue;
	      } 
	    else 
	      {
	        while (k >= 0 && !(k in t)) {
	          k--;
	        }
	        if (k < 0) {
	          throw new TypeError('Reduce of empty array with no initial value');
	        }
	        value = t[k--];
	      }
	      
	    for (; k >= 0; k--) {
	      if (k in t) {
	        value = callback(value, t[k], k, t);
	      }
	    }
	    return value;
	  };
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.17
	// Reference: http://es5.github.io/#x15.4.4.17
	if (!Array.prototype.some) {
	  Array.prototype.some = function(callback, thisArg) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.some called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;

	    var T = arguments.length > 1 ? thisArg : void 0;
	    for (var i = 0; i < len; i++) {
	      if (i in t && callback.call(T, t[i], i, t)) {
	        return true;
	      }
	    }

	    return false;
	  };
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

	WARNING! Bound functions used as constructors NOT supported by this polyfill!
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
	*/
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function(oThis) {
	    if (this.__class__ !== 'Function') {
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs   = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP    = function() {},
	        fBound  = function() {
	          return fToBind.apply(this instanceof fNOP
	                 ? this
	                 : oThis,
	                 aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    if (this.prototype) {
	      // Function.prototype doesn't have a prototype property
	      fNOP.prototype = this.prototype; 
	    }
	    fBound.prototype = new fNOP();

	    return fBound;
	  };
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	if (!Object.create) {
	  // Production steps of ECMA-262, Edition 5, 15.2.3.5
	  // Reference: http://es5.github.io/#x15.2.3.5
	  Object.create = (function() {
	    // To save on memory, use a shared constructor
	    function Temp() {}

	    // make a safe reference to Object.prototype.hasOwnProperty
	    var hasOwn = Object.prototype.hasOwnProperty;

	    return function(O) {
	      // 1. If Type(O) is not Object or Null throw a TypeError exception.
	      if (Object(O) !== O && O !== null) {
	        throw TypeError('Object prototype may only be an Object or null');
	      }

	      // 2. Let obj be the result of creating a new object as if by the
	      //    expression new Object() where Object is the standard built-in
	      //    constructor with that name
	      // 3. Set the [[Prototype]] internal property of obj to O.
	      Temp.prototype = O;
	      var obj = new Temp();
	      Temp.prototype = null; // Let's not keep a stray reference to O...

	      // 4. If the argument Properties is present and not undefined, add
	      //    own properties to obj as if by calling the standard built-in
	      //    function Object.defineProperties with arguments obj and
	      //    Properties.
	      if (arguments.length > 1) {
	        // Object.defineProperties does ToObject on its first argument.
	        var Properties = Object(arguments[1]);
	        for (var prop in Properties) {
	          if (hasOwn.call(Properties, prop)) {
	            var descriptor = Properties[prop];
	            if (Object(descriptor) !== descriptor) {
	              throw TypeError(prop + 'must be an object');
	            }
	            if ('get' in descriptor || 'set' in descriptor) {
	              throw new TypeError('getters & setters can not be defined on this javascript engine');
	            }
	            if ('value' in descriptor) {
	              obj[prop] = Properties[prop];
	            }

	          }
	        }
	      }

	      // 5. Return obj
	      return obj;
	    };
	  })();
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
	*/
	if (!Object.defineProperties) {

	  Object.defineProperties = function(object, props) {

	    function hasProperty(obj, prop) {
	      return Object.prototype.hasOwnProperty.call(obj, prop);
	    }

	    function convertToDescriptor(desc) {

	      if (Object(desc) !== desc) {
	        throw new TypeError('Descriptor can only be an Object.');
	      }


	      var d = {};

	      if (hasProperty(desc, "enumerable")) {
	        d.enumerable = !!desc.enumerable;
	      }

	      if (hasProperty(desc, "configurable")) {
	        d.configurable = !!desc.configurable;
	      }

	      if (hasProperty(desc, "value")) {
	        d.value = desc.value;
	      }

	      if (hasProperty(desc, "writable")) {
	        d.writable = !!desc.writable;
	      }

	      if (hasProperty(desc, "get")) {
	        throw new TypeError('getters & setters can not be defined on this javascript engine');
	      }

	      if (hasProperty(desc, "set")) {
	        throw new TypeError('getters & setters can not be defined on this javascript engine');
	      }

	      return d;
	    }

	    if (Object(object) !== object) {
	      throw new TypeError('Object.defineProperties can only be called on Objects.');
	    }

	    if (Object(props) !== props) {
	      throw new TypeError('Properties can only be an Object.');
	    }

	    var properties = Object(props);
	    for (propName in properties) {
	      if (hasOwnProperty.call(properties, propName)) {
	        var descr = convertToDescriptor(properties[propName]);
	        object[propName] = descr.value;
	      }
	    }
	    return object;
	  }
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	if (!Object.defineProperty) {

	    Object.defineProperty = function defineProperty(object, property, descriptor) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.defineProperty can only be called on Objects.');
	        }

	        if (Object(descriptor) !== descriptor) {
	            throw new TypeError('Property description can only be an Object.');
	        }

	        if ('get' in descriptor || 'set' in descriptor) {
	            throw new TypeError('getters & setters can not be defined on this javascript engine');
	        }
	        // If it's a data property.
	        if ('value' in descriptor) {
	            // fail silently if 'writable', 'enumerable', or 'configurable'
	            // are requested but not supported
	            // can't implement these features; allow true but not false
	            /* if ( 
	                     ('writable' in descriptor && !descriptor.writable) ||
	                     ('enumerable' in descriptor && !descriptor.enumerable) ||
	                     ('configurable' in descriptor && !descriptor.configurable)
	                 )
	                     {
	                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
	                     }*/


	            object[property] = descriptor.value;
	        }
	        return object;
	    }
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.9
	// http://es5.github.com/#x15.2.3.9
	if (!Object.freeze) {
	    Object.freeze = function freeze(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.freeze can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	if (!Object.getOwnPropertyDescriptor) {

		Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
		if (Object(object) !== object) 
			{
				throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
			}

		var descriptor;
		if(!Object.prototype.hasOwnProperty.call(object, property))
			{
				return descriptor;
			}

	    descriptor = {
	        enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
	        configurable: true
	    };

	    descriptor.value = object[property];

	    var psPropertyType = object.reflect.find(property).type;
		descriptor.writable = (psPropertyType === "readwrite");

	    return descriptor;
		}
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	if (!Object.getOwnPropertyNames) {
	    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
	        }

	        var props = object.reflect.properties;
	        var methods = object.reflect.methods;
	        var all = methods.concat(props);
	        var names = [];
	        for (var i = 0; i < all.length; i++) {
	            names.push(all[i].name);
	        }
	        return names;
	    };
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	if (!Object.getPrototypeOf) {
		Object.getPrototypeOf = function(object) {
			if (Object(object) !== object) {
				throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
			}
			return object.__proto__;
		}
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	// ES5 15.2.3.13
	// http://es5.github.com/#x15.2.3.13
	if (!Object.isExtensible) {
	    Object.isExtensible = function isExtensible(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isExtensible can only be called on Objects.');
	        }
	        return true;
	    };
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.12
	// http://es5.github.com/#x15.2.3.12
	if (!Object.isFrozen) {
	    Object.isFrozen = function isFrozen(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isFrozen can only be called on Objects.');
	        }
	        return false;
	    };
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.11
	// http://es5.github.com/#x15.2.3.11
	if (!Object.isSealed) {
	    Object.isSealed = function isSealed(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isSealed can only be called on Objects.');
	        }
	        return false;
	    };
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	/*
	Original taken from
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Polyfill

	Ther is no EnumBug in Photoshop scripting environment, so i cut unused code.
	*/

	if (!Object.keys) {
	  Object.keys = (function() {
	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    return function(obj) {
	      if (Object(obj) !== obj) {
	        throw new TypeError('Object.keys can only be called on Objects.');
	      }

	      var result = [],
	        prop, i;

	      for (prop in obj) {
	        if (hasOwnProperty.call(obj, prop)) {
	          result.push(prop);
	        }
	      }

	      return result;
	    };
	  }());
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.10
	// http://es5.github.com/#x15.2.3.10
	if (!Object.preventExtensions) {
	    Object.preventExtensions = function preventExtensions(object) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.preventExtensions can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.8
	// http://es5.github.com/#x15.2.3.8
	if (!Object.seal) {
	    Object.seal = function seal(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.seal can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	/** * Binds watchers on object (obj) properies. Callbacks will fire when value of the property changes. * Works on nested objects (see example 'Basic usage'). Can be called on the same object as many times as needed, * but new watchers will replace old watchers on the same property of object (see example 'Multiple call'). * @example <caption>Basic usage.</caption> * var someObject = { * a: 1, * b: ['one','two'], * c: { *         ca: 1 *     } * }; * * function consoleLogger(propName, oldPropValue, newPropValue){ * // this is a points to parent object of property which is changed *     $.writeln('Property ('+ propName +') changed, was: ' + oldPropValue.toString() + ', become: ' + newPropValue.toString()); * } * * function anotherWatcher(propName, oldPropValue, newPropValue){ *  // do something else * } *  * var observable = { * a: [consoleLogger,anotherWatcher], * b: consoleLogger, * c: { *     ca: consoleLogger *     } * }; * * beholder(someObject,observable); * * someObject.a = 99; * //Property (a) changed, was: 1, become: 99 * * someObject.b.push('three'); * // nothing happens!! * // but, if * * someObject.b = ['one','two', 'three']; * // Property (b) changed, was: ['one','two'], become: ['one','two', 'three'] * * @example <caption>Multiple call</caption> * * var something = {a:1, b:'text'}; * * // asume that we have consoleLogger and anotherWatcher from example above * * beholder(something, {a: consoleLogger}); * * something.a = 32; * something.b = 'BIG text'; * * //Property (a) changed, was: 1, become: 32 *  *  * beholder(something, {a: anotherWatcher, b: consoleLogger}); * * something.a = 64; * something.b = 'small text'; * * // anotherWatcher replace the consoleLogger and fires on "a" change * //Property (b) changed, was: 'text', become: 'BIG text' *  * @param {object} obj            - on wich properties spy on. * @param {object} observableList - describes wich of properties changes should be handled and how * * @return {object} Returns obj */module.exports = function beholder(obj, observableList) {    for (var observablePropName in observableList) {        if (observablePropName in obj) {            var propertyValue = obj[observablePropName];            var propertyWatchers = observableList[observablePropName];            if (propertyValue.__class__ === 'Object' && propertyWatchers.__class__ === 'Object') {                beholder(propertyValue, propertyWatchers);            } else {                if (propertyWatchers.__class__ === 'Function') {                    propertyWatchers = [propertyWatchers];                }                if (propertyWatchers.__class__ === 'Array') {                    (function(prop, propertyWatchers) {                        obj.watch(prop, function(propName, oldProp, newProp) {                            propertyWatchers.forEach(function(watcher) {                                    if (watcher.__class__ === 'Function') {                                        watcher.apply(this, [propName, oldProp, newProp]);                                    }                                })                                /*                                for (var i = 0; i < propertyWatchers.length; i++) {                                    var watcher = propertyWatchers[i];                                    if (watcher.__class__ === 'Function') {                                        watcher.apply(this, [propName, oldProp, newProp]);                                    }                                }                                */                            return newProp;                        });                    })(observablePropName, propertyWatchers);                }            }        }    }    return obj;}

/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Get extension from uri like string.
	 * @param {string} fileName - uri like string.
	 *
	 * @return {string} file extension.
	 */
	module.exports = function(fileName) {
		//проверка на тип входного параметра
		return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Seek files with given in extensionsList extensions in folder, and return them as an array.
	 * @param {folder}          folder         - ExtendScript folder reference.
	 * @param {string|string[]} extensionsList - list of files extensions to search in folder.
	 *
	 * @return {file[]} array of ExtendScript files objects.
	 */
	module.exports = function(folder, extensionsList) {
		//проверка на тип входного параметра folder
		if (extensionsList.__class__ === 'String') {
			extensionsList = [extensionsList];
		}
		if (extensionsList.__class__ === 'Array') {
			var r = new RegExp('\.(' + extensionsList.join('|') + ')$');
			var callback = function(f) {
				return (f instanceof File) && (r).test(f.absoluteURI.toLowerCase());
			};
			return folder.getFiles(callback);
		}
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Return array of subfolders (one level down) in folder.
	 * @param {folder} folder - ExtendScript folder reference.
	 *
	 * @return {folder[]} array of ExtendScript folders objects.
	 */
	module.exports = function(folder) {
		//проверка на тип folder
		return folder.getFiles(
			function(f) {
				return (f instanceof Folder);
			}
		);
	}

/***/ },
/* 41 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);