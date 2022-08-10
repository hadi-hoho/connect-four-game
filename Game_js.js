
trs = $('tr');
maxRow = trs.length
maxCol = trs[0].children.length

// Find the desired td
function findTd(row, col) {
    for (let i = maxRow-1; i >= 0; i--) {
        var imaged = trs[i].children[col-1].children;
        if ($(imaged).attr('src') === 'Gray.png') {
            $(imaged).attr('src', pcolor + '.png');
            var chwin = checkWin(i+1, col, pcolor)
            if (!chwin){
                sw_turn();
            }
            return i+1;
        }
    }
}

// Check for win and alert
function checkWin(row, col) {
    
    pstr = pcolor + '.png';
    var win = false;

    //checking horizontally
    var hor_strike = 1;
    for (let i = 1; col - i > 0; i++) {
        if ($(trs[row-1].children[col-i-1].children).attr('src') === pstr) {
            hor_strike ++;
        }else{
            break
        }
    }
    for (let i = 1; col + i < maxCol; i++) {
        if ($(trs[row-1].children[col+i-1].children).attr('src') === pstr) {
            hor_strike ++;
        }else{
            break
        }
    }

    //checking vertically
    var ver_strike = 1;
    for (let i = 1; row - i > 0; i++) {
        if ($(trs[row-i-1].children[col-1].children).attr('src') === pstr) {
            ver_strike ++;
        }else{
            break
        }
    }
    for (let i = 1; row + i <= maxRow; i++) {
        if ($(trs[row+i-1].children[col-1].children).attr('src') === pstr) {
            ver_strike ++;
        }else{
            break
        }
    }

    //checking diagonally /
    var diag_strike1 = 1;
    for (let i = 1; row + i <= maxRow && col - i > 0  ; i++) {
        if ($(trs[row+i-1].children[col-i-1].children).attr('src') === pstr) {
            diag_strike1 ++;
        }else{
            break
        }
    }
    for (let i = 1; row - i > 0 && col + i <= maxCol  ; i++) {
        if ($(trs[row-i-1].children[col+i-1].children).attr('src') === pstr) {
            diag_strike1 ++;
        }else{
            break
        }
    }

    //checking diagonally \
    var diag_strike2 = 1;
    for (let i = 1; row + i <= maxRow && col + i <= maxCol  ; i++) {
        if ($(trs[row+i-1].children[col+i-1].children).attr('src') === pstr) {
            diag_strike2 ++;
        }else{
            break
        }
    }
    for (let i = 1; row - i > 0 && col - i > 0  ; i++) {
        if ($(trs[row-i-1].children[col-i-1].children).attr('src') === pstr) {
            diag_strike2 ++;
        }else{
            break
        }
    }

    if (diag_strike1 >= 4 || diag_strike2 >= 4 || hor_strike >= 4 || ver_strike >= 4) {
        win = true;
    }
    if (win) {
        console.log(pcolor + ' WON!!!!');
        alertmes = $('#alertmes')
        $(alertmes).removeClass('alert alert-primary')
        $(alertmes).removeClass('alert alert-danger')
        $(alertmes).addClass('alert alert-success')
        $(alertmes).text(pcolor+'Won!!!')
        $('#resetBtn').prop('disabled', true);
        $('#replayBtn').prop('disabled', false);
        $('td').unbind();
        return true;
    }
    return false;
}


// Reset Button
resetBtn = $('#resetBtn')
$(resetBtn).on('click', function(event){
    for (let i = 0; i < tds.length-1; i++){
        $(tds[i].children).attr('src','Gray.png')
        pcolor = 'Red'
        alertmes = $('#alertmes')
        $(alertmes).removeClass('alert alert-primary')
        $(alertmes).addClass('alert alert-danger')
        $(alertmes).text('It\'s your turn '+pcolor+'!')
    }
})
var pcolor = 'Red';
// Get the players name
// var p1name = prompt('Player1 please enter your name, you will be red:');
// var p2name = prompt('Player2 please enter your name, you will be blue:');
$(alertmes).text('It\'s your turn '+pcolor+'!')

// Get the game going

tds = $('td')
for (let i = 0; i < tds.length-1; i++) {
    $(tds[i]).on('click', function(event){
        var col = i%maxCol+1;
        var row = Math.floor(i/maxRow)+1
        findTd(row,col)
    });
}

win = false;
function sw_turn(){
    alertmes = $('#alertmes')
    
    if (pcolor === 'Blue') {
        pcolor = 'Red';
        $(alertmes).removeClass('alert alert-primary')
        $(alertmes).addClass('alert alert-danger')
    }else{
        pcolor = 'Blue';
        $(alertmes).removeClass('alert alert-danger')
        $(alertmes).addClass('alert alert-primary')
    }
    $(alertmes).text('It\'s your turn '+pcolor+'!')
}
