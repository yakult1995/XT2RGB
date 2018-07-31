$(document).ready(function(){
  update_data();
});

$("#PositiveNegative").keyup(function(){
  update_data();
});

$("#HeartRate").keyup(function(){
  update_data();
});

function update_data(){
  // フォームから値取得
  pn = $('#PositiveNegative').val() || 0;
  hr = $('#HeartRate').val() || 0;
  
  // 値の計算
  var degree = cal_degree(pn, hr);
  var distance = cal_distance(pn, hr);
  
  // 値の反映
  $('#degree').text('角度 : ' + degree + '°');
  $('#distance').text('距離 : ' + distance);
  
  // 角度の調整(+135°)
  var exp_degree = parseInt(degree) - 135;
  
  // 360°超えを修正
  if(exp_degree < 0){
    exp_degree = Math.abs(exp_degree);
  }
  
  // abs(1)超えを修正
  var exp_distance = 0;
  if(distance > Math.sqrt(2)){
    // √2を超えたら√2に
    exp_distance = Math.sqrt(2);
  }else{
    exp_distance = distance;
  }
  
  // ÷√2
  exp_distance = exp_distance / Math.sqrt(2);
  
  // HSVからRGBに変換
  RGB = hsvToRgb(exp_degree, exp_distance, 1.0);
  
  // RGBを16進数に変換
  hex_RGB = "#" + RGB.map(function(value){
    return ("0" + value.toString(16)).slice(-2);
  }).join("");
  
  // 値の反映
  $('#rgb').text(hex_RGB);
  $('#rgb').css('background-color', hex_RGB);
}

function hsvToRgb(H,S,V) {
    var C = V * S;
    var Hp = H / 60;
    var X = C * (1 - Math.abs(Hp % 2 - 1));

    var R, G, B;
    if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
    if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
    if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
    if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
    if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
    if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

    var m = V - C;
    [R, G, B] = [R+m, G+m, B+m];

    R = Math.floor(R * 255);
    G = Math.floor(G * 255);
    B = Math.floor(B * 255);

    return [R ,G, B];
}

function cal_degree(pn, hr){
  var rad = Math.atan2(hr, pn);
  var degree = rad * 180 / Math.PI;
  return degree;
}

function cal_distance(pn, hr){
  return Math.sqrt(Math.pow(pn, 2) + Math.pow(hr, 2));
}