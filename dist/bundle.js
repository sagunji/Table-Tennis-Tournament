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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Round__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Match__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Team__ = __webpack_require__(4);






let players = [];
let numberOfRounds = 0;
let matches = [];

let teams = [];

let btnShuffle = document.getElementById('btnShuffle');
let btnRandomWinner = document.getElementById('btnRandomWinner');
function setDefault() {
    players = [];
    numberOfRounds = 0;
    matches = [];
    teams = [];
}
btnShuffle.onclick = e => {
    setDefault();
    e.preventDefault();
    let getNumberOfPlayers = parseInt(document.getElementById('teams').value);
    if (!getNumberOfPlayers || getNumberOfPlayers <= 0) {
        return;
    }

    setRandomPlayerId(getNumberOfPlayers);

    let adjPN = adjustPlayerNumbers(getNumberOfPlayers);

    let adjustingMatches = getNumberOfPlayers - adjPN;

    console.log(`There will be ${adjustingMatches} at first i.e ${getNumberOfPlayers - 2 * adjustingMatches} will go on to the next round`);

    let rounds = getNumberOfRounds(getNumberOfPlayers - adjustingMatches);
    console.log(`There will be ${rounds} rounds in total after adjustment`);
    console.log('selection of players for adjustment');
    // if (adjustingMatches !== 0) {
    //     setMatchPairs(adjustingMatches);
    // }
    createTeams(players);
    setMatchPairs(teams.length / 2, teams);
    console.log(matches);
};

btnRandomWinner.onclick = e => {
    e.preventDefault();
    if (matches.length < 1) {
        return;
    }
    let i;
    for (i = 0; i < matches.length; i++) {
        debugger;
        if (!matches[i].winner) {
            let rand = Math.random();
            if (rand < 0.5) {
                matches[i].setWinner(matches[i].player1);
            } else {
                matches[i].setWinner(matches[i].player2);
            }
        }
    }
    console.log(matches);
};

function setRandomPlayerId(getNumberOfPlayers) {
    let i;
    for (i = 1; i <= getNumberOfPlayers; i++) {
        players.push(new __WEBPACK_IMPORTED_MODULE_0__Player__["a" /* default */](i));
    }
}
function adjustPlayerNumbers(getNumberOfTeams) {
    let i = 1;
    for (i = 1; i < getNumberOfTeams / 2; i++) {
        if (Math.pow(2, i) === getNumberOfTeams) {
            return getNumberOfTeams;
        } else if (Math.pow(2, i) < getNumberOfTeams && Math.pow(2, i + 1) > getNumberOfTeams) {
            return Math.pow(2, i);
        }
    }
}
function getNumberOfRounds(balancedPlayers) {
    return Math.log2(balancedPlayers);
}
function setMatchPairs(mtchs, players) {
    let i;
    let match;
    for (i = 0; i < mtchs; i++) {
        match = new __WEBPACK_IMPORTED_MODULE_2__Match__["a" /* default */](`lf_${i}`);
        let p1 = getRandomPlayer(players);
        match.setPlayer1(p1);
        players = players.remove(p1);

        let p2 = getRandomPlayer(players);
        match.setPlayer2(p2);
        players = players.remove(p2);
        matches.push(match);
    }
    console.log(matches);
    console.log('Remaining Players ', players);
}

function getRandomPlayer(players) {
    let plys = null;
    for (let i = 0; i < 3; i++) {
        plys = players[Math.floor(Math.random() * players.length)];
    }
    return plys;
}
function declareWinnerForMatches() {
    if (matches.length < 1) {
        return;
    }
    console.log(matches);
}

function createTeams(participants) {
    let tm;
    let loop;
    let loopLimit = Math.floor(participants.length / 2);
    for (loop = 0; loop < loopLimit; loop++) {
        tm = new __WEBPACK_IMPORTED_MODULE_3__Team__["a" /* default */]();
        tm.name = `team__${loop}`;
        tm.firstPlayer = getRandomPlayer(participants);
        participants = participants.remove(tm.firstPlayer);

        tm.secondPlayer = getRandomPlayer(participants);
        participants = participants.remove(tm.secondPlayer);
        teams.push(tm);
    }
    console.log(teams);
    if (participants.length > 0) {
        console.log(participants);
    }
}

Array.prototype.remove = function () {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];a;
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(playerName) {
    this.name = playerName;
    this.gamesWon = null;
    this.gamesLost = null;
    this.gamesPlayed = null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Round {
    constructor() {
        this.roundName = '';
        this.matches = [];
    }
    setP1(player1) {
        this.p1 = player1;
    }
    setP2(player2) {
        this.p2 = player2;
    }
    declareWinner(winnerName) {
        this.winner = winnerName;
    }
}
/* unused harmony default export */ var _unused_webpack_default_export = (Round);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Match {
    constructor(matchNo) {
        this.matchNumber = matchNo;
        this.player1 = null;
        this.player2 = null;
        this.winner = null;
    }
    setPlayer1(p1) {
        this.player1 = p1;
    }
    setPlayer2(p2) {
        this.player2 = p2;
    }
    setWinner(winner) {
        this.winner = winner;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Match);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Team {
    constructor() {
        this.name = '';
        this.firstPlayer = null;
        this.secondPlayer = null;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Team);

/***/ })
/******/ ]);