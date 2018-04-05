function openOkadaiSyllabus(){
    var hoge = Sample1_form.textbox.value;  //テキストエリアの値を取得
    
    var dt = new Date();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    
    if(month<1) year -= 1;
    
    var url = "https://gs.okayama-u.ac.jp/campusweb/campussquare.do?_flowId=SYW4101101-flow&nendo=";
    url += year;
    url += "&shozoku=";
    url += hoge.substr(0,2);
    url += "&jikanwari=";
    url += hoge.substr(2,4);
    url += "&sylocale=ja_JP";
    
    window.open(url);
}