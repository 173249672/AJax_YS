// ~ 2018.01.30
//~ ~ ylb

function ajax() {
    var obj = arguments[0];
    if(!obj){
        obj = {};
    }
    var ajaxData = {
        type: obj.type || "get",
        url : obj.url || "",
        async : obj.async || "true",
        data:obj.data||"",
        dataType : obj.dataType || "text",
        contentType:obj.contentType||"application/x-www-form-urlencoded",
        beforeSend:obj.beforeSend || function(){},
        success:obj.success || function(){},
        error:obj.error || function(){}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType=ajaxData.dataType;
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                ajaxData.success(xhr.response)
            }else{
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {  // IE6
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
function convertData(data){
    if( typeof data === 'object' ){
        var convertResult = "" ;
        for(var c in data){
            convertResult+= c + "=" + data[c] + "&";
        }
        convertResult=convertResult.substring(0,convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}



/*
ajax({
    type:"post",
    url:"",
    dataType:"json",
    data:{"UserID":"000","UserToken":"000"},    // 如需以json方式提交数据 、 data转换为字符串即可
    beforeSend:function(){
        //some js code
    },
    success:function(msg){
        console.log(msg)
    },
    error:function(){
        console.log("error")
    }
});*/
