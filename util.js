var Util = {
  idToValue: function(id){
    var strings = id.split("-");
    var ret = [parseInt(strings[1]), parseInt(strings[0])];
    return ret;
  },
  arrayToNum: function(arr){
    var num = 0;
    for(var i=0; i < arr.length; i++){
      num = num | (arr[i] << arr.length-i-1);
    }
    return num;
  },
  numToArray: function(num, size){
    var arr = [];
    if(num < 0){
      num = 0;
    }
    for(var i=0; i < size; i++){
      arr[arr.length] = num & 1;
      num = num >>> 1;
    }
    return arr.reverse();
  },
  arrayToString: function(arr){
    var str = arr.length+":";
    for(var i=0; i < arr.length; i++){
      str += ":" + Util.arrayToNum(arr[i]);
    }
    return str;
  },
  stringToArray: function(str){
    var tokens = str.split('::');
    var size = parseInt(tokens[0]);
    if(size > 9 || size < 1){
      size = 1;
      tokens[1] = '1';
    }
    tokens = tokens[1].split(':');
    if(tokens.length != size){
      size = 1;
      tokens[0] = '1';
    }
    var arr = [];
    for(var i = 0; i < size; i++){
      arr[i] = Util.numToArray(parseInt(tokens[i]), size);
    }
    return arr;
  }
}
