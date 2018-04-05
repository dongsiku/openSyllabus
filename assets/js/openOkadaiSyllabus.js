function openOkadaiSyllabus(num1){

    if(num1 == 1){
        var lang = "ja_JP";
    }else if(num1 == 2){
        var lang = "en_US";
    }else{
        window.open("index.html");
        console.log("debug mode");
        return false;
    }


    var hoge = document.getElementById("inputClassNo").value;
    
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
    // url += "&sylocale=ja_JP";
    url += "&sylocale=";
    url += lang;

    console.log(url);
    
    // window.open(url);
    return false;
}