var Game = {
  editMode: false,
  size: 0,
  guessArray: [],
  answerArray: [],
  clues: {
    columns: [],
    rows: []
  },
  setGuess: function(idstr, val){
    var id = Util.idToValue(idstr);
    var set = 0;
    if(val){ set = 1; }
    Game.guessArray[id[0]][id[1]] = set;
    if(!Game.editMode){
      Game.checkPuzzle();
    }
  },
  checkPuzzle: function(){
    var valid = true;
    for(var i=0; i < Game.size; i++){
      for(var j=0; j < Game.size; j++){
        var bothTrue = (Game.answerArray[i][j] && Game.guessArray[i][j]);
        var bothFalse = (!Game.answerArray[i][j] && !Game.guessArray[i][j]);
        if(!(bothTrue || bothFalse)){
          valid = false;
        }
      }
    }
    if(valid){
      alert('you win!');
    }
  },
  initGuessArray: function(){
    for(var i = 0; i < Game.size; i++){
      Game.guessArray[i] = new Array(Game.size);
    }
  },
  initClues: function(){
    var prevRow;
    var prevCol;
    for(var i=0; i < Game.size; i++){
      var prevRow = 0;
      var prevCol = 0;
      Game.clues.rows[i] = new Array();
      Game.clues.columns[i] = new Array();
      for(var j=0; j < Game.size; j++){
        if(Game.answerArray[i][j]){
          if(prevRow){
            Game.clues.rows[i][Game.clues.rows[i].length-1]++;
          }else{
            Game.clues.rows[i][Game.clues.rows[i].length] = 1;
          }
          prevRow = 1;
        }else{
          prevRow = 0;
        }
        if(Game.answerArray[j][i]){
          if(prevCol){
            Game.clues.columns[i][Game.clues.columns[i].length-1]++;
          }else{
            Game.clues.columns[i][Game.clues.columns[i].length] = 1;
          }
          prevCol = 1;
        }else{
          prevCol = 0;
        }
      }
    }

  },
  makeClueString: function(){
    //make clueString
    var clueString = '<div class="number-row">';
    for(var i=0; i < Game.clues.columns.length; i++){
      clueString += '<div class="column-numbers"><div class="column-numbers-group">';
      for(var j=0; j < Game.clues.columns[i].length; j++){
        clueString += '<div>'+Game.clues.columns[i][j]+'</div>';
      }
      clueString += '</div></div>';
    }
    clueString += '</div><div class="number-column">';
    for(var i = 0; i < Game.answerArray.length; i++){
      clueString +='<div class="row-numbers">';
      for(var j = Game.clues.rows[i].length-1; j >= 0; j--){
        clueString += '<div>'+Game.clues.rows[i][j]+'</div>';
      }
      clueString += '</div>';
    }
    clueString += '</div></div>';
    return clueString;
  },
  makeGridString: function(){
    //make gridString
    var gridString = '<div id="grid">';
    for(var i = 0; i < Game.size; i++){
      gridString += '<div class="grid-row">';
      for(var j = 0; j < Game.size; j++){
        gridString += '<div id="'+j+'-'+i+'" class="grid-cell">X</div>'
      }
      gridString += '</div>';
    }
    gridString += '</div>';
    return gridString;
  },
  initJQuery: function(){
    $(".column-numbers-group > div, .row-numbers > div").click(function(){
      if($(this).hasClass('line-through')){
        $(this).removeClass('line-through');
      }else{
        $(this).addClass('line-through');
      }
    });
    $(".grid-cell").click(function(){
      if($(this).hasClass('yes')){
        $(this).removeClass('yes');
        $(this).addClass('no');
        Game.setGuess(this.id, false);
      }else if($(this).hasClass('no')){
        $(this).removeClass('no');
      }else{
        $(this).addClass('yes');
        Game.setGuess(this.id, true);
      }
      $('#current-string').val(Util.arrayToString(Game.guessArray));
    });
    $("#number-in").submit(function(){
      var arrout = Util.numToArray(parseInt($("#num").val()));
      var numout = Util.arrayToNum(arrout);
      $("#array-out").html( arrout );
      $("#number-out").html( numout );
      return false;
    });
    $("#edit-mode").click(function(){
      Game.editMode = true;
      $('.number-row').addClass('hidden');
      $('.number-column').addClass('hidden');
      $('#edit-mode').addClass('hidden');
    });
    $('#init-button').click(function(){
      Game.editMode = false;
      $('.number-row').removeClass('hidden');
      $('.number-column').removeClass('hidden');
      $('#edit-mode').removeClass('hidden');
      Game.init($('#current-string').val());
    });
  },
  init: function(initstr){
    if(!initstr){
      initstr = '5::17:10:4:10:17';
    }
    Game.answerArray = Util.stringToArray(initstr);
    Game.size = Game.answerArray.length;
    Game.initGuessArray();
    Game.initClues();
    var htmlString = '';
    htmlString += Game.makeClueString();
    htmlString += Game.makeGridString();


    $('#game').html(htmlString);
    Game.initJQuery();
  }
}
