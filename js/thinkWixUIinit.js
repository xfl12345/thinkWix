var debugOutputDiv;
function debugLogPush(pushString){
	if(debugOutputDiv != null)
	{
		debugOutputDiv.innerHTML=debugOutputDiv.innerHTML + "<br>" + pushString;
	}
}
function mainStart(){
	debugOutputDiv=document.getElementById("jsDebug");
	menuBarInit();
}
function menuBarInit(){
	menuSecondBarYPosInit();
	//debugLogPush("doing");
	console.log("menuBarInit_Done!");
}
function menuSecondBarYPosInit(){
	var menuBarY = document.getElementsByClassName("menuBarY");
	for(var i=0; i<menuBarY.length ; i++)
	{
		var barEle = menuBarY[i].getElementsByClassName("menu2ndBar");
		for(var i2=0,eleParentNode,pnTop,pnLeft,pnId,pnStyle ;  i2<barEle.length ;i2++)
		{
			eleParentNode = barEle[i2].parentNode;
			if(eleParentNode.getAttribute("class")=="menuBarYEle")
			{
				pnId=barEle[i2].getAttribute("id");
				if(pnId == null)
				{
					barEle[i2].setAttribute("id","menu2ndBarTmpId_"+(i2+1));
					pnId = barEle[i2].getAttribute("id");
				}
				pnTop=eleParentNode.offsetHeight;
				pnLeft=eleParentNode.offsetLeft;
				pnStyle=getComputedStyle(eleParentNode,null);
				barEle[i2].style.left = pnStyle.width ;
				alert(document.documentElement.clientHeight);
				barEle[i2].style.top = pnStyle.top ;
				debugLogPush("menu2ndBarY_No."+(i2+1)+",EleId:"+pnId+",top:"+pnTop+",left:"+pnLeft+",width:"+pnStyle.width+",height:"+pnStyle.height+";");
				
			}
		}
	}
		
    //debugLogPush("done!");    
}
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
