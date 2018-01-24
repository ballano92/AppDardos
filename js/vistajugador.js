var Vistajugador = (function () { 
	var ronda = 0;
	var cont = 0;
	var click = 0;
	var cont2=2;
	function numerojugadores(){
		jugador=Jugador();
		$("#numerojugadores").append('<br><br><div id="botones"><div id="boton_jugador"><a href="#" id="menos" name="menos" class="glyphicon glyphicon-minus"></a></div><div id="boton_jugador"><a href="#" id="plus" name="mas" class="glyphicon glyphicon-plus"></a></div></div>');
		$("#numerojugadores").append('<div id="jugadores0" class="col-xs-12 col-md-5 col-lg-5"><div id="conte_jugador"><p>Jugador 1 </p><input class="form-control inscrib" type="text" name="jugador" id="jugador0" /></div></div>');
		$("#numerojugadores").append('<div id="jugadores1" class="col-xs-12 col-md-5 col-lg-5"><div id="conte_jugador"><p>Jugador 2 </p><input class="form-control inscrib" type="text" name="jugador" id="jugador1" /></div></div>');
		$("#enviar").append('<a name="submit" id="button" class="btn btn-success">Enviar</a>');

		$('#plus').click(function(){
			$("#numerojugadores").append('<div id="jugadores'+cont2+'" class="col-xs-12 col-md-5 col-lg-5"><div id="conte_jugador"><p>Jugador '+(cont2+1)+' </p><input class="form-control inscrib" type="text" name="jugador" id="jugador'+cont2+'" /></div></div>');			
			cont2++;
		});
		$('#menos').click(function(){
			//num=$("#jugador"+(cont2-1)).val();
			if(cont2>1){
				$("#jugadores"+(cont2-1)).remove();
				cont2--;
			}
		});
		$('#button').click(function(){
			var array_jugadores=[];
			for (var i = 0; i < cont2; i++) {
		       	if('#input'+i){
		       		var jugador=Jugador();
		       		jugador.id=i;
		       		jugador.nombre=$("#jugador"+i).val();
		       		jugador.puntos=0;
		       		array_jugadores[i]=jugador;		  
				}
			}
			$("#button").remove();
			events.publish("juego", array_jugadores);
			// events.publish("ganador", array_jugadores);
		});
	}
	function cricket(array_jugadores){
		cont3=cont2*3;
		ronda=0;
		cont=0;
		click2=0;
		var numeros=[20,19,18,17,16,15,25];

		if($("#tabla"))$("#tabla table").remove();
		if($("#boton"))$("#boton").remove();
		if($("#rondas"))$("#rondas").remove();
		if($("#rondasmenos"))$("#rondasmenos").remove();
		$("#tabla").append('<a name="submit" id="boton" class="btn btn-info">Volver</a><a name="submit" id="boton_rondas" class="btn btn-info" style="float:none">NEXT PLAYER</a><a href="#" id="rondas" class="btn btn-success" name="rondas">'+ronda+'/20</a>');
		$("#juego").hide('fast');
		
		var tabla=$("<table id='table2'>");		
		$("#tabla").append(tabla);
		$('#boton_rondas').click(function(){
			for (var t = 0; t < array_jugadores.length; t++) {
				varia=$("#turno"+t).is(":visible");
				if(varia==true){
					for (var b = 0; b < 7; b++) {
						var numerosdiana=numeros[b];
						var clases=$("#cer"+numerosdiana).hasClass("glyphicon glyphicon-remove-circle tachado");	
						if(t!=array_jugadores.length-1){				
							if($("#"+(t+1)+"_"+numerosdiana+"check1_2").prop('checked')&&$("#"+(t+1)+"_"+numerosdiana+"check1_1").prop('checked')&&$("#"+(t+1)+"_"+numerosdiana+"check1_3").prop('checked')&&clases==false){
								$("#num"+numerosdiana).addClass("btn-danger");
							}else{
								$("#num"+numerosdiana).removeClass("btn-danger");
							}
						}else{
							if($("#0_"+numerosdiana+"check1_2").prop('checked')&&$("#0_"+numerosdiana+"check1_1").prop('checked')&&$("#0_"+numerosdiana+"check1_3").prop('checked')&&clases==false){
								$("#num"+numerosdiana).addClass("btn-danger");
							}else{
								$("#num"+numerosdiana).removeClass("btn-danger");
							}
						}						
					}
					if(t!=array_jugadores.length-1){
						$("#turno"+t).addClass("desaparecer");
						$("#turno"+(t+1)).removeClass("desaparecer");
						break;
					}else{
						$("#turno"+t).addClass("desaparecer");
						$("#turno0").removeClass("desaparecer");
						break;
					}
					
				}
			}
			click2++;
			if(click2==array_jugadores.length){
				click2=0;
				ronda++;
				$("#rondas").html(ronda+"/20");
			}
			if(ronda==21){
				events.publish("ganador", array_jugadores);
			}
		});

		var encabezado=$('#tabla table').append("<tr><td>Jugadores</td><td>Puntos</td><td>Turno</td><td id='num20'>20<span id='cer20'></span></td><td id='num19'>19<span id='cer19'></span></td><td id='num18'>18<span id='cer18'></span></td><td id='num17'>17<span id='cer17'></span></td><td id='num16'>16<span id='cer16'></span></td><td id='num15'>15<span id='cer15'></span></td><td id='num25'>25<span id='cer25'></span></td></tr>");		
		array_jugadores.forEach(function(elementos){
			elementos.puntos=0;
			check="<tr id='fila-"+elementos.id+"'><td class='nombre'>"+elementos.nombre+"</td>";
			check=check+"<td id='puntos"+cont+"'>"+elementos.puntos+"</td>";
			if(elementos.id==0){
				check=check+"<td><div id='turno"+cont+"'>*</div></td>";
			}else{
				check=check+"<td><div id='turno"+cont+"' class='desaparecer'>*</div></td>";
			}
			for (var b = 0; b <= 6; b++){
				check=check+"<td id='fila_jugador"+elementos.id+"'>";
				for (var i = 1; i <= 3; i++) {
					check=check+"<input type='checkbox' id='"+elementos.id+"_"+numeros[b]+"check1_"+i+"' style='margin: 0.5vw;'/>";
				}				
			}
			fila=$(check);
			$('#tabla table').append(fila);
			cont++;
		});
		for (var b = 0; b < 7; b++) {
			var sum=numeros[b];
			$('#num'+sum).click(function(){
				for (var i = 0; i < array_jugadores.length	; i++) {
					varia=$("#turno"+i).is(":visible");
					numero=$(this).attr("id");
					suma=parseInt(numero.substr(3,5));
					sw=0;
					for (var l = 0; l < array_jugadores.length	; l++) {
						if($("#"+l+"_"+suma+"check1_2").prop('checked')&&$("#"+l+"_"+suma+"check1_1").prop('checked')&&$("#"+l+"_"+suma+"check1_3").prop('checked')){
							sw++;
						}
					}
					if(varia==true&&sw!=array_jugadores.length){
						if($("#"+i+"_"+suma+"check1_2").prop('checked')&&$("#"+i+"_"+suma+"check1_1").prop('checked')&&$("#"+i+"_"+suma+"check1_3").prop('checked')){
							puntos=parseInt($("#puntos"+i).html());
							puntos=puntos+suma;
							$("#puntos"+i).html(puntos);
							array_jugadores[i].puntos=puntos;
							// $("#puntos"+i).html(elementos.puntos);
						}
					}
				}
			});
		}
		for (var b = 0; b < 7; b++) {
			var sum=numeros[b];
				var botonSumar=(function(){;
				for (var i = 0; i < array_jugadores.length	; i++) {
					varia=$("#turno"+i).is(":visible");
					numero=$(this).attr("id");
					suma=parseInt(numero.substr(2,4));
					sw=0;
					for (var l = 0; l < array_jugadores.length	; l++) {
						if($("#"+l+"_"+suma+"check1_2").prop('checked')&&$("#"+l+"_"+suma+"check1_1").prop('checked')&&$("#"+l+"_"+suma+"check1_3").prop('checked')){
							sw++;
						}
					}
					if(varia==true&&sw!=array_jugadores.length){
						if($("#"+i+"_"+suma+"check1_2").prop('checked')&&$("#"+i+"_"+suma+"check1_1").prop('checked')&&$("#"+i+"_"+suma+"check1_3").prop('checked')){
							$("#num"+suma).addClass("btn-danger");
							$("#cer"+suma).removeClass("glyphicon glyphicon-remove-circle tachado");
						}else{
							$("#num"+suma).removeClass("btn-danger");
						}
					}
					if(sw==array_jugadores.length){
						$("#num"+suma).removeClass("btn-danger");
						$("#cer"+suma).addClass("glyphicon glyphicon-remove-circle tachado");
					}
				}
			});
			for (var l = 0; l < array_jugadores.length	; l++) {
				$("#"+l+"_"+sum+"check1_3").click(botonSumar);
			}
		}
		
		$('#boton').click(function(){
			$("#tabla").hide('fast');
			$("#juego").show('slow');
		});
		$("#tabla").show('slow');
		
	}
	function sergio(array_jugadores){
		var cont = 0;
		var numeros=[20,19,18,17,16,15,25];
		$(".panel-title").append('<div id="cabecera">Marcador juego Sergio</div>');
		check="<input type='checkbox' id='check'/>";
		if($("#tabla"))$("#tabla table").remove();
		if($("#boton"))$("#boton").remove();
		$("#tabla").append('<a name="submit" id="boton" style="margin-top:10px" class="btn btn-info">Volver</a>');
		$("#juego").hide('fast');
		if($("#rondas"))$("#rondas").remove();	
		var tabla=$("<table >");
		$("#tabla").append(tabla);
		var encabezado=$('#tabla table').append("<tr><th>Jugadores</th><th>/2</th><th>20</th><th>19</th><th>18</th><th>17</th><th>16</th><th>15</th><th>25</th><th>Puntos</th></tr>");		
		array_jugadores.forEach(function(elementos){
			elementos.puntos=0;
			fila=$("<tr id='fila-"+elementos.id+"'><td>"+elementos.nombre+"</td><td><a href='#' id='dividir_"+cont+"' name='dividir' class='btn btn-primary'>/2</a></td><td><a href='#' id='20mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='20menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='19mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='19menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='18mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='18menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='17mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='17menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='16mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='16menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='15mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='15menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td><a href='#' id='25mas_"+cont+"' name='mas' class='btn btn-primary'>+</a><a href='#' id='25menos_"+cont+"' name='menos' class='btn btn-primary'>-</a></td><td id='puntos"+cont+"'>"+elementos.puntos+"</td>");
			$('#tabla table').append(fila);		 
			$('#dividir_'+cont).click(function(){
				if(elementos.puntos>1){
					elementos.puntos=elementos.puntos/2;
					numero=$(this).attr("id");
					array=numero.split("_");
					$("#puntos"+array[1]+"").html(elementos.puntos.toFixed());
				}
			});
			for (var e = 0; e <=6; e++) {
				$('#'+numeros[e]+'mas_'+cont).click(function(){
					numero=$(this).attr("id");
					suma=parseInt(numero.substr(0,2));
					array=numero.split("_");
					elementos.puntos=elementos.puntos+suma;
					$("#puntos"+array[1]).html(elementos.puntos.toFixed());
				});
				$('#'+numeros[e]+'menos_'+cont).click(function(){
					numero=$(this).attr("id");
					resta=parseInt(numero.substr(0,2));
					array=numero.split("_");
					if(elementos.puntos>resta-1){	
						elementos.puntos=elementos.puntos-resta;
						$("#puntos"+array[1]).html(elementos.puntos.toFixed());
					}
				});
			}
			cont++;
		});
		
		$('#boton').click(function(){
			$("#tabla").hide('fast');
			$("#juego").show('slow');
		});
		$("#tabla").show('slow');

	}
	
	function juego(array_jugadores){
		$("#numerojugadores").hide('fast');		
		$("#juego").append('<div class="col-xs-12 col-md-5 col-md-offset-1" style="margin: 20px;"><a href="#" id="cricket" class="btn btn-success btn-lg btn-block juego">Cricket</a></div>');
		$("#juego").append('<div class="col-xs-12 col-md-5 " style="margin: 20px;"><a href="#" id="sergio" class="btn btn-success btn-lg btn-block juego">Sergio</a></div>');
		$("#juego").show('slow');
		$('#cricket').click(function(){
			events.publish("cricket", array_jugadores);
		});
		$('#sergio').click(function(){
			events.publish("sergio", array_jugadores);
		});
	}
	function ganador(array_jugadores){
		$("#tabla").hide('fast');
		$("body").addClass("ganador");
		$(".container").addClass("ancho");
		$("#ganador").show('slow');
		array_jugadores.sort(function (a, b){
    		return (b.puntos - a.puntos);
		});
		numeros=1;
		$('#ganador').append('<div style="overflow: hidden"><img src="img/copa2.png" id="img_ganador" style="float: left"><img src="img/copa2.png" id="img_ganador"><p id="nom_ganador">'+numeros+'. '+array_jugadores[0].nombre+' <br> '+array_jugadores[0].puntos+'</p></div>');
		lista='<div id="lista"><ul id="lista_final">';
		array_jugadores.forEach(function(elementos){
			if(numeros>1)lista=lista+'<li>'+numeros+'. '+elementos.nombre+' - '+elementos.puntos+'</li>';
			numeros++;
		});
		lista=lista+'</ul></div><div></div>';
		$('#ganador').append(lista);

	}
	return { 
		init: function () {			
			events.subscribe('cricket', cricket);
			events.subscribe('ganador', ganador);
			events.subscribe('numerojugadores', numerojugadores ); 
			events.subscribe('sergio', sergio ); 
			events.subscribe('juego', juego );
		} 
	} 
}());
Vistajugador.init();
