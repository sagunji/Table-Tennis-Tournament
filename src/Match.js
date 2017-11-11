class Match {
    constructor(matchNo) {
        this.matchNumber = matchNo;
        this.matchType = null;
        this.player1 = null;
        this.player2 = null;
        this.matchTime = null;
    }
    setPlayer1 (p1){
        this.player1 = p1;
    }
    setPlayer2 (p2) {
        this.player2 = p2;
    }
    setWinner (winner) {
        this.winner = winner;
    }
}
export default Match;