function openOkadaiSyllabus(num1){
    document.getElementById("errmsg").innerHTML = '';

    if(num1 == 1 || num1 == 2){
        ;
    }else{
        show_err_msg("debug mode");
        return false;
    }

    var classno = document.getElementById("inputClassNo").value;
    if(classno.length < 6 || isNaN(classno)){
        show_err_msg("ValueError: Class number");
        return false;
    }else if(!detect_shozoku(classno)){
        show_err_msg("ValueError: Shozoku");
        return false;
    }

    var url = make_url(classno, num1);
    console.log(url);
    window.open(url);
    document.classno-form.reset()
    return false;
}

function detect_shozoku(class_no){
    var shozoku = class_no.substr(0,2);
    var shozoku_list = [91, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 22, 32, 71, 33, 72, 41, 43, 51, 52, 48, 77, 47, 75, 49, 78, 46, 73, 70, 69, 99];

    for(var i = 0; i < shozoku_list.length; i++) {
        if(shozoku == shozoku_list[i]){
            return true;
        }
    }

    return false;
}

function show_err_msg(err_msg){
    console.log(err_msg);
    document.getElementById("errmsg").innerHTML = err_msg;
}

function make_url(classno, lang_mode){

    if(lang_mode == 1){
        var lang = "ja_JP";
    }else if(lang_mode == 2){
        var lang = "en_US";
    }

    var dt = new Date();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    
    if(month < 1){
        year -= 1;
    }
    
    var url = "https://gs.okayama-u.ac.jp/campusweb/campussquare.do?_flowId=SYW4101101-flow&nendo=";
    url += year;
    url += "&shozoku=";
    url += classno.substr(0,2);
    url += "&jikanwari=";
    url += classno.substr(2,4);
    url += "&sylocale=";
    url += lang;

    return url;
}
