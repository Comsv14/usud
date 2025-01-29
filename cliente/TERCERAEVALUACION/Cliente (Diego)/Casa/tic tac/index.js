function tictactoe() {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.getElementById(i + '-' + j);
            cell.addEventListener('click', function () {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    cell.innerHTML = 'X';    
                }
            });
        }
    }  
}