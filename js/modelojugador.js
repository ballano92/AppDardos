var modelojugador=(function(){
	var array_jugadores=[];
	return{
		rellenarray: function(jugador){
			jug= Jugador();
			jug.update(jugador);
			array_jugadores.push(jug);
			// events.publish("juego", array_jugadores);
		},


		sumapuntos: function(){
			$.ajax({
				url: 'consultatel.php',
				type: 'post',
				dataType: 'json',
				success: function(datos){
					datos.forEach(function(elementos){
						var tl=Telefono();
						tl.set(elementos);
						todos_telefonos.push(tl);
					});					
				}
			});
		},
		Consultatelefonos: function(id_cli){
			$.ajax({
				url: 'consultatel.php',
				type: 'post',
				dataType: 'json',
				data: {id:id_cli},
				success: function(datos){
					array_telefonos=[];
					datos.forEach(function(elementos){
						var tl=Telefono();
						tl.set(elementos);
						array_telefonos.push(tl);
					});
					events.publish("consultatel", array_telefonos);
				}
			});
		},
		ActualizarDatos: function(clien){	
			$.ajax({
				url: 'actualizar.php',
				type: "post",
				dataType: 'json',
				data: {
					id: clien.id,
					nombres: clien.nombres,
	       			ciudad: clien.ciudad,
			       	sexo: clien.sexo,
			       	fechaNacimiento: clien.fechaNacimiento
				},
				success: function(datos){
					for (var i = 0; i < array_clientes.length; i++) {
						if(array_clientes[i].id==datos.id){
			 				cli= Cliente();
			 				cli.update(datos);
			 				array_clientes[i]=cli;			 				
			 			}			 
					};
					events.publish('tabla', datos);
					array=[];
					array[0]=array_clientes;
					array[1]=todos_telefonos;
			 		events.publish('consulta',array);
					events.publish('actualiza', datos);
				}
			});
		},
		ActualizarDatostel: function(telefono){	
			$.ajax({
				url: 'actualizartel.php',
				type: "post",
				dataType: 'json',
				data: {
					id_telefono: telefono.id_telefono,
					id_cliente: telefono.id_cliente,
	       			tipo: telefono.tipo,
			       	telefono: telefono.telefono
				},
				success: function(datos){
					for (var i = 0; i < array_telefonos.length; i++) {
						if(array_telefonos[i].id_telefono==datos.idTelefono){
			 				tel= Telefono();
			 				tel.update(datos);

			 				array_telefonos[i]=tel;			 				
			 			}			 
					};
				}
			});
		},
		mostrarform: function(cliente_id){
			$.ajax({
				url: 'consulta.php',
				type: "post",
				dataType: 'json',
				data: {id:cliente_id},
				success: function(client){
					events.publish("mostrarformu", client);
				}
			});
		},
		mostrarformtel: function(cliente_id){
			$.ajax({
				url: 'consultatel.php',
				type: "post",
				dataType: 'json',
				data: {id:cliente_id},
				success: function(datos){
					array_telefonos=[];
					datos.forEach(function(elementos){
						var tl=Telefono();
						tl.set(elementos);
						array_telefonos.push(tl);
					});
					events.publish("anadirinputtel", array_telefonos);
				}
			});
		},
		Nuevo: function (clien){
			$.ajax({
				url: 'nuevo.php',
				type: "post",
				dataType: 'json',
				data: {
					id: "",
					nombres: clien.nombres,
	       			ciudad: clien.ciudad,
			       	sexo: clien.sexo,
			       	fechaNacimiento: clien.fechaNacimiento
				},
				success: function(datos){
					cli= Cliente();
			 		cli.update(datos);

			 		array_clientes.push(cli);
			 		events.publish('tabla');
			 		array=[];
					array[0]=array_clientes;
					array[1]=todos_telefonos;
			 		events.publish('consulta',array);
      				events.publish('graba', array);
				}
			});
		},
		Nuevotel: function (telefono){
			$.ajax({
				url: 'nuevotel.php',
				type: "post",
				dataType: 'json',
				data: {
					id_telefono: "",
					id_cliente: telefono.id_cliente,
	       			tipo: telefono.tipo,
			       	telefono: telefono.telefono
				},
				success: function(datos){
					tel= Telefono();
			 		tel.update(datos);

			 		array_telefonos.push(tel);
				}
			});
		},
		Cancelar: function(){
			events.publish("cancelar");
		},	
		EliminarDato: function(cliente_id){
			$.ajax({
				url: 'eliminar.php',
				type: "post",
				dataType: 'json',
				data: {id:cliente_id},
				success: function(datos){
					for (var i = 0; i < array_clientes.length; i++) {
						if(array_clientes[i].id==datos){
          					array_clientes.splice(i, 1);
			 			}
			 		}
					events.publish("elimina", datos);
					events.publish('tabla', datos);
					array=[];
					array[0]=array_clientes;
					array[1]=todos_telefonos;
			 		events.publish('consulta',array);
				}
			});
		},
		EliminarDatotel: function(tel_id){
			$.ajax({
				url: 'eliminartel.php',
				type: "post",
				dataType: 'json',
				data: {id:tel_id},
				success: function(datos){
					for (var i = 0; i < array_telefonos.length; i++) {
						if(array_telefonos[i].id_telefono==datos){
          					array_telefonos.splice(i, 1);
			 			}
			 		}			 		
				}
			});
		},
		Eliminartel: function(cli_id){
			$.ajax({
				url: 'eliminartelefonos.php',
				type: "post",
				dataType: 'json',
				data: {id:cli_id},
				success: function(datos){
					for (var i = 0; i < array_telefonos.length; i++) {
						if(array_telefonos[i].id_telefono==datos){
          					array_telefonos.splice(i, 1);
			 			}
			 		}
			 		
				}
			});
		}
	}
}());