var debugOutputDiv;
var windowsH = document.documentElement.clientHeight;
var windowsW = document.documentElement.clientWidth;
function debugLogPush(pushString){
	if(debugOutputDiv != null)
	{
		debugOutputDiv.innerHTML=debugOutputDiv.innerHTML + "<br>" + pushString;
	}
}
function mainStart(){
	debugOutputDiv=document.getElementById("jsDebug");
	debugLogPush("windowsH:"+windowsH);
	debugLogPush("windowsW:"+windowsW);
	menuBarInit();
	lanuchHelperModules();
}
function menuBarInit(){
	menuSecondBarYPosInit();
	console.log("menuBarInit_Done!");
}
function menuSecondBarYPosInit(){
	var menuBarY = document.getElementsByClassName("menuBarY");
	for(var i=0; i<menuBarY.length ; i++)
	{
		menuBarY[i].classList.add("posInitStyle");
		var barEle = menuBarY[i].getElementsByClassName("menu2ndBar");
		//var menuBarYH = menuBarY[i].offsetHeight;
		//debugLogPush(menuBarYH);
		for(var i2=0;  i2<barEle.length ;i2++)
		{
			var pnNode = barEle[i2].parentNode;
			if(barEle[i2].getAttribute("id") == null)
			{
				barEle[i2].setAttribute("id","menu2ndBarTmpId_"+(i2+1));
			}
			/**获取一级菜单的宽度以使二级菜单的左边对齐一级菜单的右边缘
			 * 获取二级菜单的高度和浏览器可视范围（宽和高）以使二级菜单尽量少被遮挡
			 * 获取一级菜单的元素在其菜单栏里的高度以使二级菜单定位美化
			 */
			//pnStyle=getComputedStyle(eleParentNode,null);
			var pnWidth = pnNode.offsetWidth;
			//var pnHeight = pnNode.offsetHeight;
			var barEleChild = barEle[i2].lastElementChild;
			barEle[i2].classList.add("posInitStyle");

			//debugLogPush(barEleChild.tagName);
			//debugLogPush(barEleChild.innerHTML);
			barEle[i2].style.left = pnWidth + "px";
			barEleH = barEle[i2].offsetHeight;
			barEleChildH = barEleChild.offsetHeight;
			
			var relativeTopFreeH = menuBarY[i].getBoundingClientRect().top + pnNode.offsetTop;
			var relativeBottomFreeH = windowsH - relativeTopFreeH;

			/*
			debugLogPush("menuBarY距顶高度="+menuBarY[i].getBoundingClientRect().top + "px");
			debugLogPush("barEle["+i2+"].offsetHeight="+barEleH);
			debugLogPush("barEleChildH.offsetHeight="+barEleChildH);
			debugLogPush("barEle父元素距顶高度剩余空间="+relativeTopFreeH+"px");
			debugLogPush("barEle父元素距底高度剩余空间="+relativeBottomFreeH+"px");
			*/

			if(barEleH <= relativeTopFreeH)
			{
				barEle[i2].style.bottom = 0 +"px";
				//barEle[i2].style.top = -barEleH + "px";
			}
			else if(barEleH <= windowsH)
			{
				barEle[i2].style.bottom = (-relativeBottomFreeH + barEleChildH) + "px";
			}
			else
			{
				barEle[i2].style.top = (-relativeTopFreeH) + "px";
				barEle[i2].style.height = windowsH +"px";
			}
			barEle[i2].classList.remove("posInitStyle");
		}
		menuBarY[i].classList.remove("posInitStyle");
	}
		
    //debugLogPush("done!");
}
/*
function getEleStyleTop(ele){
	if(ele == null)
	{
		return null;
	}
	var top=document.defaultView.getComputedStyle(ele,null).top;
	if(top)
	{
		return top;
	}
	else
	{
		return ele.currentStyle.top;
	}
}
*/