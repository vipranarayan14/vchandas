window["vChandas"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vChandas = undefined;

var _utils = __webpack_require__(1);

var _chandas = __webpack_require__(2);

var _ganas = __webpack_require__(3);

var _matras = __webpack_require__(4);

var _sliceDetails = __webpack_require__(5);

var _syllables = __webpack_require__(6);

var _schemeTree = __webpack_require__(7);

var _init = __webpack_require__(8);

var _vtokenize = __webpack_require__(10);

var _vtranslitItrnScheme = __webpack_require__(11);

var _vtranslitItrnScheme2 = _interopRequireDefault(_vtranslitItrnScheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vChandas = exports.vChandas = function vChandas() {

  var chandasList = (0, _init.prepareChandasList)();

  var _makeSchemeTree = (0, _schemeTree.makeSchemeTree)(_vtranslitItrnScheme2.default),
      schemeTree = _makeSchemeTree.schemeTree,
      maxTokenLength = _makeSchemeTree.maxTokenLength;

  return function (str) {
    var ignoreLastLaghu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


    var tokens = (0, _vtokenize.vTokenize)((0, _utils.cleanString)(str), maxTokenLength, (0, _sliceDetails.getSliceDetails)(schemeTree));

    var syllables = (0, _syllables.getSyllables)(tokens);

    var matras = (0, _matras.getMatras)(tokens, ignoreLastLaghu);

    var ganas = (0, _ganas.getGanas)(matras);

    var chandas = (0, _chandas.getChandas)(ganas, chandasList);

    return {
      chandas: chandas,
      ganas: ganas,
      matras: matras,
      syllables: syllables
    };
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cleanString = exports.cleanString = function cleanString(str) {
  return str.slice(0).trim().replace(/\s/g, '');
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getChandas = exports.getChandas = function getChandas(ganas, chandasList) {

  var chandas = chandasList[ganas];

  if (chandas) {

    return chandas;
  }

  return null;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ganasList = {

  'ga,ga,ga': 'ma',
  'ga,ga,la': 'ta',
  'ga,la,ga': 'ra',
  'ga,la,la': 'bha',
  'la,ga,ga': 'ya',
  'la,ga,la': 'ja',
  'la,la,ga': 'sa',
  'la,la,la': 'na'

};

var makeMatraGroups = function makeMatraGroups(matras) {

  var chunk = 3;

  var matraGroups = [];

  for (var i = 0, len = matras.length; i < len; i += chunk) {

    matraGroups.push(matras.slice(i, i + chunk).join(','));
  }

  return matraGroups;
};

var getRadicalMatras = function getRadicalMatras(index, matraGroup) {
  return index > 0 ? '|' + matraGroup : matraGroup;
};

var getGanas = exports.getGanas = function getGanas(matras) {

  var ganas = [];

  var radicalMatras = '';

  var matraGroups = makeMatraGroups(matras);

  matraGroups.forEach(function (matraGroup, index) {

    var gana = ganasList[matraGroup];

    if (gana) {

      ganas.push(gana);
    } else {

      radicalMatras = getRadicalMatras(index, matraGroup);
    }
  });

  return ganas.join(',') + radicalMatras;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setMatra = function setMatra(token) {

  var matra = {
    ayogavaha: 3,
    deadConsonants: 0,
    symbols: -1,
    vowels: 2
  }[token.type];

  var shortVowels = ['a', 'i', 'u', 'RRi', 'LLi'];

  if (token.type === 'vowels' && shortVowels.includes(token.akshara)) {

    matra = 1;
  }

  return Object.assign({}, token, { matra: matra });
};

var setMatras = function setMatras(tokens) {

  var tokensWithMatras = [];

  tokens.forEach(function (token) {

    if (token.type !== 'unknown') {

      tokensWithMatras.push(setMatra(token));
    }
  });

  return tokensWithMatras;
};

var getPrevToken = function getPrevToken(tokens, index) {
  return index > 0 ? tokens[index - 1] : { matra: null, type: 'strStart' };
};

var getNextToken = function getNextToken(tokens, index) {
  return index < tokens.length - 1 ? tokens[index + 1] : { matra: null, type: 'strEnd' };
};

var getMatraInsertIndex = function getMatraInsertIndex(matras) {
  return matras.length ? matras.length - 1 : 0;
};

/* eslint-disable complexity */

var isPrevMatraGuru = function isPrevMatraGuru(prevToken, token, nextToken) {
  return token.matra === 0 && prevToken.type === 'vowels' && (nextToken.matra === 0 || nextToken.type === 'strEnd') || token.matra === 3;
};

var getMatras = exports.getMatras = function getMatras(tokens) {

  var laghu = 'la';
  var guru = 'ga';

  var matras = [];

  var tokensWithMatras = setMatras(tokens);

  tokensWithMatras.forEach(function (token, index) {

    var prevToken = getPrevToken(tokensWithMatras, index);
    var nextToken = getNextToken(tokensWithMatras, index);

    var matraInsertIndex = getMatraInsertIndex(matras);

    if (isPrevMatraGuru(prevToken, token, nextToken)) {

      matras[matraInsertIndex] = guru;
    }

    if (token.matra === 1) {

      matras.push(laghu);
    } else if (token.matra === 2) {

      matras.push(guru);
    }
  });

  return matras;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getSliceDetails = exports.getSliceDetails = function getSliceDetails(schemeTree) {
  return function (slice) {

    var sliceDetails = {};

    var sliceDetailsInSchemeTree = schemeTree[slice];

    if (sliceDetailsInSchemeTree) {

      sliceDetails = sliceDetailsInSchemeTree;
    } else if (slice === ' ') {

      sliceDetails = {
        akshara: slice,
        type: 'space'
      };
    } else {

      sliceDetails = { //TODO: Handle 'unknown' slices in vTokenize
        akshara: '',
        type: 'unknown'
      };
    }

    return sliceDetails;
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable complexity */

var getSyllables = exports.getSyllables = function getSyllables(tokens) {

  var syllables = [];

  tokens.forEach(function (token, index) {

    var prevToken = index > 0 ? tokens[index - 1] : { type: 'strStart' };
    var isLastToken = index === tokens.length - 1;

    if (token.type === 'deadConsonants') {

      if (isLastToken || prevToken.type === 'deadConsonants') {

        syllables[syllables.length - 1] += token.akshara;
      } else {

        syllables.push(token.akshara);
      }
    } else if (token.type === 'ayogavaha' && prevToken.type === 'vowels') {

      syllables[syllables.length - 1] += token.akshara;
    } else if (token.type === 'vowels') {

      if (prevToken.type === 'deadConsonants') {

        syllables[syllables.length - 1] += token.akshara;
      } else {

        syllables.push(token.akshara);
      }
    }
  });

  return syllables;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var makeSchemeLeaf = function makeSchemeLeaf(akshara, aksharaIndex, schemeBranch, schemeSubset, tokenLengths) {

  if (akshara) {

    schemeBranch[akshara] = {

      akshara: akshara,
      aksharaIndex: aksharaIndex,
      type: schemeSubset

    };

    tokenLengths.push(akshara.length);
  }
};

var makeSchemeBranch = function makeSchemeBranch(scheme, schemeSubset, tokenLengths) {

  var schemeBranch = {};

  scheme.data[schemeSubset].forEach(function (akshara, aksharaIndex) {

    if (!Array.isArray(akshara)) {

      makeSchemeLeaf(akshara, aksharaIndex, schemeBranch, schemeSubset, tokenLengths);

      return;
    }

    akshara.forEach(function (alternateAkshara) {

      makeSchemeLeaf(alternateAkshara, aksharaIndex, schemeBranch, schemeSubset, tokenLengths);
    });
  });

  return schemeBranch;
};

var makeSchemeTree = exports.makeSchemeTree = function makeSchemeTree(scheme) {

  var tokenLengths = [];

  var maxTokenLength = 0;

  var schemeTree = Object.assign({}, makeSchemeBranch(scheme, 'deadConsonants', tokenLengths), makeSchemeBranch(scheme, 'vowels', tokenLengths), makeSchemeBranch(scheme, 'symbols', tokenLengths), makeSchemeBranch(scheme, 'ayogavaha', tokenLengths));

  maxTokenLength = Math.max.apply(Math, tokenLengths);

  return {
    maxTokenLength: maxTokenLength,
    schemeTree: schemeTree
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareChandasList = undefined;

var _chandasList = __webpack_require__(9);

var prepareChandasList = exports.prepareChandasList = function prepareChandasList() {

  var newChandasList = {};

  _chandasList.chandasList.forEach(function (chandas) {

    var chandasGanas = chandas.ganas;

    newChandasList[chandasGanas] = chandas;
  });

  return newChandasList;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-magic-numbers */

var chandasList = exports.chandasList = [{
  caesura: [],
  definition: 'guH',
  examples: ['shrIshaH |' + 'pAyAt ||'],
  ganas: 'ga',
  name: 'shrIH',
  type: 'uktA'
}, {
  caesura: [],
  definition: 'gau strI',
  examples: ['shrImAn viShnuH |' + 'nityaM dhyeyaH ||'],
  ganas: 'ga,ga',
  name: 'strI',
  type: 'atyuktA'
}, {
  caesura: [],
  definition: 'mO nArI',
  examples: ['nArINAM kalyANI |' + 'mAM pAyAtsA vANI ||'],
  ganas: 'ma',
  name: 'nArI',
  type: 'madhyA'
}, {
  caesura: [],
  definition: 'rO mRRigIH',
  examples: ['sA mRRigIlOchanI |' + 'rAdhikA shrIpatEH ||'],
  ganas: 'ra',
  name: 'mRRigI',
  type: 'madhyA'
}, {
  caesura: [],
  definition: 'mgau cetkanyA',
  examples: ['bhAsvatkanyA saikA dhanyA |' + 'yasyAH kUlE kRRiShNO.akhElat ||'],
  ganas: 'ma|ga',
  name: 'kanyA',
  type: 'pratiShTA'
}, {
  caesura: [],
  definition: 'bhgau giti pa~NktiH',
  examples: ['bhAsvatkanyA saikA dhanyA |' + 'yasyAH kUlE kRRiShNO.akhElat ||'],
  ganas: 'ma|ga,ga',
  name: 'pa~NktiH',
  type: 'supratiShTA'
}, {
  caesura: [],
  definition: 'tyau stastanumadhyA',
  examples: ['mUrtirmurashatrOratyadbhutarUpA |' + 'AstAM mama cittE nityaM tanumadhyA ||', 'nashyanti dadarsha vRRindAni kapIndraH |' + 'hArINyabalAnAM hArINyabalAnAm ||'],
  ganas: 'ma|ga',
  name: 'tanumadhyA',
  type: 'gAyatrI'
}, {
  caesura: [],
  definition: 'shashivadanA nyau',
  examples: ['shashivadanAnAM vrajataruNInAm |' + 'dadhighaTabhedaM madhuripuraichchhat ||'],
  ganas: 'na|ya',
  name: 'shashivadanA',
  type: 'gAyatrI'
}, {
  caesura: [],
  definition: 'vidyullEkhA mO maH',
  examples: ['varShAkAlE kAlE mEghAchchhannAkAshE |' + 'vidyullEkhA bhAntyAH sarvairAlOkhyantE ||'],
  ganas: 'ma|ma',
  name: 'vidyullEkhA',
  type: 'gAyatrI'
}, {
  caesura: [],
  definition: 'tsau chedvasumatI',
  examples: ['sAstE vasumatI yAstE vasumatI |' + 'puNyAkaravatI puNyAkarabhavA ||'],
  ganas: 'ta|sa',
  name: 'vasumatI',
  type: 'gAyatrI'
}, {
  caesura: [],
  definition: 'msau gaH syAnmadalEkhA',
  examples: ['ra~NgE bAhuvirugNAt dantIndrAnmadalEkhA |' + 'lagnAbhUtmurashatrau kastUrIrasacharchA ||'],
  ganas: 'ma,sa|ga',
  name: 'madalEkhA',
  type: 'uShNik'
}, {
  caesura: [],
  definition: 'kumAralalitA jsau g',
  examples: ['murAritanuvallI kumAralalitA sA |' + 'vrajaiNanayanAnAM tatAna mudamuchchaiH ||'],
  ganas: 'ja,sa|ga',
  name: 'kumAralalitA',
  type: 'uShNik'
}, {
  caesura: [],
  definition: 'saragai haMsamAlA',
  examples: ['dhavalA haMsamAlA sukhapUrvaM vishAlA |' + 'vimalAmbhastaDAkE bhayahInA nidadrau ||'],
  ganas: 'sa,ra|ga',
  name: 'haMsamAlA',
  type: 'uShNik'
}, {
  caesura: [],
  definition: 'bhau giti citrapadA gaH',
  examples: ['yAmunasaikatadEshE gOpavadhUjalakElau |' + 'kaMsaripOrgalIlA chitrapadA jagadavyAt ||'],
  ganas: 'bha,bha|ga,ga',
  name: 'chitrapadA',
  type: 'anuShTup'
}, {
  caesura: [4, 4],
  definition: 'mO mO gO gO vidyunmAlA',
  examples: ['vidyunmAlAlOlAn bhOgAn muktvA muktau yatnaM kuryAt |' + 'dhyAnOtpannaM niHsAmAnyaM saukhyaM bhOktum yadyAkA~NkShEt ||'],
  ganas: 'ma,ma|ga,ga',
  name: 'vidyunmAlA',
  type: 'anuShTup'
}, {
  caesura: [4, 4],
  definition: 'mANavakam bhAttalagAH',
  examples: ['mANavakakrIditakaM yaH kurutE vRRiddhavayAH |' + 'hAsyamasau yAti janE bhikShuriva strIchapalaH ||'],
  ganas: 'bha,ta|la,ga',
  name: 'mANavakam',
  type: 'anuShTup'
}, {
  caesura: [],
  definition: 'mnau gau haMsarutamEtat',
  examples: ['abhyAgAmishashilakShmIma~njIrakvaNitatulyam |' + 'tIrE rajati nadInAM ramyaM haMsarutamEtat ||'],
  ganas: 'ma,na|ga,ga',
  name: 'haMsarutam',
  type: 'anuShTup'
}, {
  caesura: [],
  definition: 'rjau samAnikA galau cha',
  examples: ['yasya kRRiShNapAdapadmamasti hRRittaDAgasadma |' + 'dhIH samAnikA parENa nocitA.atra matsarENa ||'],
  ganas: 'ra,ja|ga,la',
  name: 'samAnikA',
  type: 'anuShTup'
}, {
  caesura: [],
  definition: 'pramANikA jarau lagau',
  examples: ['punAtu bhaktirachyutA sadAchyutA~NghripadmayOH |' + 'shrutismRRitipramANikA bhavAmburAshitArikA ||'],
  ganas: 'ja,ra|la,ga',
  name: 'pramANikA',
  type: 'anuShTup'
}, {
  caesura: [3, 6],
  definition: 'rAnnasAviha halamukhI',
  examples: ['gaNDayOratishayakRRishaM yanmukham prakaTadarshanaM |' + 'AyataM kalahanirataM tAM striyaM tyaja halamukhIm ||'],
  ganas: 'ra,na,sa',
  name: 'halamukhI',
  type: 'bRRihatI'
}, {
  caesura: [7, 2],
  definition: 'bhujagashashibhRRitA nau maH',
  examples: ['hradataTanikaTakShONI bhujagashashibhRRitA yAsIt |' + 'muraripudalitE nAgE vrajajanasukhadA sAbhUt ||'],
  ganas: 'na,na,ma',
  name: 'bhujagashashibhRRitA',
  type: 'bRRihatI'
}, {
  caesura: [],
  definition: 'msau jgau shuddhavirADidaM matam',
  examples: ['vishvaM tiShTati kukShikOtarE vaktrE yasya sarasvatI sadA |' + 'asmadvaMshapitAmahO gururbrahmA shuddhavirAD punAtu naH ||'],
  ganas: 'ma,sa,ja|ga',
  name: 'shuddhavirAD',
  type: 'pa~Nkti'
}, {
  caesura: [5, 5],
  definition: 'mnau ygau cEti paNavanAmEdam',
  examples: ['mImAMsArasamamRRitaM pItvA shAstrOktiH paTuritarA bhAti |' + 'EvaM saMsadi viduShAM jalpAmO jayapaNabandhanAt ||'],
  ganas: 'ma,na,ya|ga',
  name: 'paNavaH',
  type: 'pa~Nkti'
}, {
  caesura: [],
  definition: 'rjau ragau mayUrasAriNI syAt',
  examples: ['yA vanAntarANyupaiti rantuM yA bhuja~NgabhOgamuktacittA |' + 'yA drutaM prayAti sannatAMsA tAM mayUrasAriNIM vijahyAt ||'],
  ganas: 'ra,ja,ra|ga',
  name: 'mayUrasAriNI',
  type: 'pa~Nkti'
}, {
  caesura: [5, 5],
  definition: 'bhmau sagayuktau rukmavatIyam',
  examples: ['pAdatalE padmOdaragaurE rAjati yasyA UrdhvarEkhA |' + 'sA bhavati strIlakShaNayuktA rukmavatI saubhAgyavatI ca ||'],
  ganas: 'bha,ma,sa|ga',
  name: 'rukmavatI',
  type: 'pa~Nkti'
}, {
  caesura: [4, 6],
  definition: 'j~nEyA mattA mabhasagayuktA',
  examples: ['pItvA mattA madhu madhupAlI kAlindIyE taTavanaku~njE |' + 'uddIvyantI vrajajanarAmAH prEmAviShTA madhujiti chakrE ||'],
  ganas: 'ma,bha,sa|ga',
  name: 'mattA',
  type: 'pa~Nkti'
}, {
  caesura: [],
  definition: 'narajagairbhavEnmanOramA',
  examples: ['taraNijAtaTE vihAriNI vrajavilAsinIvilAsataH |' + 'muraripOstanuH punAtu vaH sukRRitashAlinAM manOramAH ||'],
  ganas: 'na,ra,ja|ga',
  name: 'manOramA',
  type: 'pa~Nkti'
}, {
  caesura: [2, 8],
  definition: 'tjau jau guruNEyamupasthitA',
  examples: ['EShA jagadEkamanOharA kanyA kanakOjjvaladIdhitiH |' + 'lakShmIriva dAnavasUdanaM puNyairnaranAthamupasthitA ||'],
  ganas: 'ta,ja,ja|ga',
  name: 'upasthitA',
  type: 'pa~Nkti'
}, {
  caesura: [],
  definition: 'guH',
  examples: ['shrIshaH |' + 'pAyAt ||'],
  name: 'shrIH',
  type: 'uktA'
}];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTokenize"] = factory();
	else
		root["vTokenize"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var cannotSeek = function cannotSeek(seeked, maxSeek, inStr, i) {
  return seeked === maxSeek || i === inStr.length - 1;
};

var getTokenDetails = function getTokenDetails(tempSliceDetails, foundIndex) {
  return foundIndex > -1 ? {

    foundIndex: foundIndex,
    token: tempSliceDetails[foundIndex]

  } : {

    foundIndex: 0,
    token: tempSliceDetails[0]

  };
};

var isTokenFound = function isTokenFound(sliceDetails) {
  return sliceDetails.type !== 'unknown' ? true : false;
};

var vTokenize = exports.vTokenize = function vTokenize(str, maxTokenLength, getSliceDetails) {

  var inStr = str.slice(0, str.length);
  var maxSeek = maxTokenLength;

  var tokens = [];

  var seeked = 0,
      strSlice = '',
      tempSliceDetails = [],
      tokenFound = [];

  for (var i = 0, l = inStr.length; i < l; i += 1) {

    seeked += 1;

    strSlice += inStr[i];

    var sliceDetails = getSliceDetails(strSlice);

    tempSliceDetails.push(sliceDetails);

    tokenFound.push(isTokenFound(sliceDetails));

    if (cannotSeek(seeked, maxSeek, inStr, i)) {

      var foundIndex = tokenFound.lastIndexOf(true);

      var tokenDetails = getTokenDetails(tempSliceDetails, foundIndex);

      foundIndex = tokenDetails.foundIndex;

      tokens.push(tokenDetails.token);

      // resetting the 'i' to pick up the next untokenized char.
      i -= seeked - 1 - foundIndex;

      // reset variables
      seeked = 0;
      strSlice = '';
      tempSliceDetails = [];
      tokenFound = [];
    }
  }

  return tokens;
};

/***/ })
/******/ ]);
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vTranslitItrnScheme"] = factory();
	else
		root["vTranslitItrnScheme"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var vTranslitItrnScheme = exports.vTranslitItrnScheme = {
  'about': {
    'schemeCode': 'Itrn',
    'schemeName': 'ITRANS',
    'type': 'roman'
  },
  'data': {
    'ayogavaha': [['M', '.m'], ['H', '.h']],
    'consonants': ['ka', 'kha', 'ga', 'gha', ['~Na', 'N^a'], 'cha', 'Cha', 'ja', 'jha', ['~na', 'JNa'], 'Ta', 'Tha', 'Da', 'Dha', 'Na', 'ta', 'tha', 'da', 'dha', 'na', '^na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'Ra', 'la', 'La', 'zha', ['va', 'wa'], 'sha', ['Sha', 'Sa', 'shha'], 'sa', 'ha'],
    'deadConsonants': ['k', 'kh', 'g', 'gh', ['~N', 'N^'], 'ch', 'Ch', 'j', 'jh', ['~n', 'JN'], 'T', 'Th', 'D', 'Dh', 'N', 't', 'th', 'd', 'dh', 'n', '^n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'R', 'l', 'L', 'zh', ['v', 'w'], 'sh', ['Sh', 'S', 'shh'], 's', 'h'],
    'symbols': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '|', '||', ['OM', 'AUM'], '.a', '.N'],
    'vowelMarks': ['a', ['A', 'aa'], 'i', ['I', 'ii'], 'u', ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], 'e', 'E', 'ai', 'o', 'O', 'au'],
    'vowels': ['a', ['A', 'aa'], 'i', ['I', 'ii'], 'u', ['U', 'uu'], ['RRi', 'R^i'], ['RRI', 'R^I'], ['LLi', 'L^i'], ['LLI', 'L^I'], 'e', 'E', 'ai', 'o', 'O', 'au']
  }
};

/***/ })
/******/ ])["vTranslitItrnScheme"];
});

/***/ })
/******/ ])["vChandas"];