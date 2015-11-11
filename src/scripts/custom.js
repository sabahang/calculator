$( document ).ready(function(){
	var expression = '';
	$(".keys button").click(function(){ 
		
		switch($(this).attr('class').split(' ')[0]){
			case 'operandbtn':
				if(expression.length < 20){
					expression = expression.concat($(this).text());
					$("#display").html(expression);
				}
				break;
			case 'operatorbtn':
				if (expression === ""){
					if($(this).attr('data-sign') === "-"){
						expression = expression.concat($(this).attr('data-sign'));
					} else {
						break;
					}
				} else {
					if(isNaN(expression.slice(-1))){
						if (expression.length <= 1) break;
						expression = expression.slice(0,-1);
						expression = expression.concat($(this).attr('data-sign'));
					} else {
						expression = expression.concat($(this).attr('data-sign'));
					}
				}
				$("#display").html(expression);
				break;
			case 'equalbtn':
				var evaluate = eval, result;
				try{
					result = evaluate(expression).toString();
					if (result.length >= 20 ){
						result = Number(result).toExponential(10);
					}
					expression = result;
					$("#display").html(result);
				} catch(e){
					console.log("This is not a valid statement!");
				}

				break;
			case 'clearbtn':
				expression = '';
				$("#display").html('0');
				break;
		}

	});
});