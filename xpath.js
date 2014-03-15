$.fn.xpathCatcher = function(){
	var output = this;
	$("input,select,textarea").change(function(){
		var node = this;
		var xpath = '';
		do{
			var index = $(node.parentNode).children(node.tagName).index(node)+1;
			xpath = '/'+node.tagName.toLowerCase()+(index>1?'['+index+']':'')+xpath;
			node = node.parentNode;
		}while(node && node.nodeType ==1);

		var type = (this.tagName.toLowerCase()=="input"?$(this).attr("type"):this.tagName.toLowerCase());
		var value;
		if(type=="checkbox"){
			value=$(this).attr("checked");
			if (value==undefined)
				value="unchecked";
		}else if(type=="radio"){
			value=$('input:radio[name='+$(this).attr("name")+']:checked').val();
		}else{
			value=$(this).val();
		}
		output.append(xpath+"<br/>type "+type+"<br/>value "+value+"<br/>");
		return false;
	});
}