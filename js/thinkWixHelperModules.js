//1.Load Setting from json file
//2.Script run up

var pointer_setByUser_switch=true;
var pointer_followUser_switch=true;
var tmpBackup_swipe_onmousemove=null;

function element_swipe(ele_id){
    var box = document.getElementsById(ele_id);
    ele.onmousedown = function(){
        var e = event || window.event;
        //此处是为了兼容IE，因为IE中事件对象是作为全局对象( window.event )存在的；
        var pageX = e.pageX || e.clientX + document.documentElement.scrollLeft;
        var pageY = e.pageY || e.clientY + document.documentElement.scrollTop;
        //获取鼠标相对盒子的位置；
        var boxX = pageX - box.offsetLeft;
        var boxY = pageY - box.offsetTop;
        tmpBackup_swipe_onmousemove = document.onmousemove;
        document.onmousemove = function(){
            var e = event || window.event;
            var pageX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            var pageY = e.pageY || e.clientY + document.documentElement.scrollTop;
            //将鼠标当前的坐标值减去鼠标相对盒子的位置，得到盒子当时的位置并将其赋值给盒子，实现移动效果
            box.style.left = pageX - boxX + "px";
            box.style.top  = pageY - boxY + "px";
        };
        document.onmouseup = function(){
            //清除盒子的移动事件;
            document.onmousemove = tmpBackup_swipe_onmousemove;
        };
    };
};

/**自动追随鼠标的图钉功能的核心函数 */
var pointer_followUser_mainFunction = function(){
    var pointerEle = document.getElementById("pointer_followUser");
    var jsDebug = document.getElementById("jsDebug");
    var reportPos = document.createElement("div");
    reportPos.setAttribute("id","pointer_followUser_report");
    jsDebug.appendChild(reportPos);

    var e = event || window.event;
    if(e.pageX || e.pageY)
    {
        var reportPosString="<br>left:"+e.pageX+"px;top:"+e.pageY+"px;<br>";
        document.getElementById("pointer_followUser_report").innerHTML=reportPosString;
        document.getElementById("pointer_followUser_posReport").innerHTML=reportPosString;
        pointerEle.style.left=e.pageX+"px";
        pointerEle.style.top=e.pageY+"px";
    }
    //debugLogPush("MMwork!");
}

/**启动助手模块**/
function lanuchHelperModules(){
    /**检查设置情况，判断是否开启 */
    /**检查用户手动图钉功能开关是否开启 */
    if(pointer_setByUser_switch)
    {
        /**UI开启 */
        var pointerEle=document.getElementById("pointer_setByUser");
        pointerEle.className="pointer_setByUser";
        //element_swipe("pointer_setByUser");
    }
    else
    {
        /**UI关闭 */
        var pointerEle=document.getElementById("pointer_setByUser");
        pointerEle.className="pointer_setByUser_off";
    }
    
    /**检查自动追随鼠标的图钉功能开关是否开启 */
    if(pointer_followUser_switch)
    {
        /**UI开启 */
        var pointerEle = document.getElementById("pointer_followUser");
        pointerEle.className="pointer_followUser";
        /**启用鼠标移动事件监听，功能开启 */
        document.onmousemove=pointer_followUser_mainFunction;
    }
    else
    {
        /**UI关闭 */
        var pointerEle=document.getElementById("pointer_followUser");
        pointerEle.className="pointer_followUser_off";
        /**移除鼠标移动事件监听，功能关闭 */
        if(document.onmousemove == pointer_followUser_mainFunction)
        {
            document.onmousemove = null;    
        }
    }
    console.log("lanuchHelperModules_Done!");
}

