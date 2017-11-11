class Round {
    constructor () {
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
export default Round;