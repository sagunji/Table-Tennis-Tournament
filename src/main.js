
import Player from './Player';
import Round from './Round';
import Match from './Match';
import Team from './Team';
import TEAMNAMES from './constants';

let players = [];
let numberOfRounds = 0;
let matches = [];

let teams = [];

let btnStart = document.getElementById('btnStart');
console.log(btnStart);
btnStart.onclick = (e) => {
    readFormCSVFile();
    removeStartButton();
    e.preventDefault();
}


let intervalId;
function removeStartButton() {
    intervalId =setInterval(function() {
        btnStart.style.opacity = window.getComputedStyle(btnStart).opacity - 0.01;
        if (btnStart.style.opacity < 0.1) {
            stopInterval(intervalId);
        }
    }, 1000/ 60);
}

function stopInterval(intervalId) {
    clearInterval(intervalId);
}

function readFormCSVFile () {
  let player;
    let file = $("#csvfile")[0].files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // By lines
      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++) {
          player = new Player();
          player.name = lines[line];
          players.push(player);
      }
      console.log('-------------Double Matches-------------');
      console.log(players);
      createMixedDoubleTeam(players.slice());

      console.log('-------------Single Matches-------------');   
      createSingleGame(players.slice());
    };
    reader.readAsText(file);
}

function createMixedDoubleTeam (players) {
  let teams = createTeams(players);
  let playoffMatches = createPlayoffs(teams);

  if (playoffMatches > 0) {
    setMatchPairs(playoffMatches, teams.slice(), 'doubles');
  } else {
    setMatchPairs(teams.length /2, teams.slice(), 'doubles')
  }
}

function createSingleGame(players) {
  let playoffMatches = createPlayoffs(players);
  console.log(playoffMatches);
  if (playoffMatches > 0) {
    setMatchPairs(playoffMatches, players.slice(), 'single');
  } else {
    setMatchPairs(teams.length /2, players.slice(), 'single')
  }
}

function createPlayoffs (participants) {
  let playoffs = adjustPlayerNumbers(participants.length);
  return participants.length - playoffs;
}

let btnShuffle = document.getElementById('btnShuffle');
let btnRandomWinner = document.getElementById('btnRandomWinner');

let btnCreateTeams = document.getElementById('btnCreateTeams');

let btnReadPlayers = document.getElementById('readPlayers');

// btnReadPlayers.onclick = (e) => {
//     let player;
//     var file = $("#csvfile")[0].files[0];
//         var reader = new FileReader();
//         reader.onload = function(progressEvent){
//         // By lines
//         var lines = this.result.split('\n');
//         for(var line = 0; line < lines.length; line++) {
//             player = new Player();
//             player.name = lines[line];
//             players.push(player);
//         }
//         };
//         reader.readAsText(file);
//         console.log(players);
// }

function setDefault () {
  players = [];
  numberOfRounds = 0;
  matches = [];
  teams = [];
}
// btnShuffle.onclick = (e) => {
//     setDefault();
//     e.preventDefault();
//     let getNumberOfPlayers = parseInt(document.getElementById('teams').value);
//     if (!getNumberOfPlayers || getNumberOfPlayers <= 0) { return; }

//     setRandomPlayerId(getNumberOfPlayers);

//     let adjPN = adjustPlayerNumbers(getNumberOfPlayers);

//     let adjustingMatches = getNumberOfPlayers - adjPN;

//     console.log(`There will be ${adjustingMatches} at first i.e ${getNumberOfPlayers - 2 * adjustingMatches} will go on to the next round`);

//     let rounds = getNumberOfRounds(getNumberOfPlayers - adjustingMatches);
//     console.log(`There will be ${rounds} rounds in total after adjustment`);
//     console.log('selection of players for adjustment');
//     if (adjustingMatches !== 0) {
//         setMatchPairs(adjustingMatches, players);
//     }
//     // createTeams(players);
//     // setMatchPairs(teams.length/2, teams);
//     // console.log(matches);
// }

// btnRandomWinner.onclick = (e) => {
//   e.preventDefault();
//   if (matches.length < 1) {
//     return;
//   }
//   let i;
//   for (i = 0; i < matches.length; i++) {
//     debugger;
//     if(!matches[i].winner) {
//       let rand = Math.random();
//       if (rand < 0.5) {
//         matches[i].setWinner(matches[i].player1);
//       } else {
//         matches[i].setWinner(matches[i].player2);        
//       }
//     }
//   }
//   console.log(matches);
// }

function setRandomPlayerId(getNumberOfPlayers) {
    let i;
    for (i =1; i<= getNumberOfPlayers; i++) {
        players.push(new Player(i));
    }
}
function adjustPlayerNumbers (getNumberOfTeams) {
    let i = 1;
    for (i = 1; i < getNumberOfTeams /2; i++) {
        if (Math.pow(2, i) === getNumberOfTeams) {
            return getNumberOfTeams;
        } else if (Math.pow(2, i) < getNumberOfTeams && Math.pow(2, i+1) > getNumberOfTeams) {
            return Math.pow(2, i);
        }
    }
}
function getNumberOfRounds (balancedPlayers) {
    return Math.log2(balancedPlayers);
}
function setMatchPairs(mtchs, players, matchType) {
    let i;
    let match;
    for (i = 0; i < mtchs; i++) {
        match = new Match(`lf_${matches.filter(function(match){ return match.matchType == matchType}).length }`);
        match.matchType = matchType;
        let p1 = getRandomPlayer(players);
        match.setPlayer1 (p1);
        players = players.remove(p1);

        let p2 = getRandomPlayer(players);
        match.setPlayer2 (p2);
        players = players.remove(p2);   
        matches.push(match);
    }
    console.log(matches);
    console.log('Remaining Players ', players);
}

function getRandomPlayer (players){
  let plys = null;
    for (let i = 0; i < 3; i++) {
      plys = players[Math.floor(Math.random() * players.length)];
    }
    return plys;
}
function declareWinnerForMatches () {
  if (matches.length < 1) { return; }
  console.log(matches);
}

function createTeams (participants) {
    let tm;
    let loop;
    let loopLimit = Math.floor(participants.length / 2);
    for(loop = 1; loop <= loopLimit; loop++) {
      tm = new Team();
      tm.name = TEAMNAMES[loop];
      tm.firstPlayer = getRandomPlayer(participants);
      participants = participants.remove(tm.firstPlayer);

      tm.secondPlayer = getRandomPlayer(participants);
      participants = participants.remove(tm.secondPlayer);
      teams.push(tm);
    } 
    console.log('The Randomly selected Teams are: ',teams);
    if (participants.length > 0) {
      console.log('The one who cannot participate in the mixed double tournament: ',participants);
    }
    return teams;
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];a
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
