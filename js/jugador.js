var Jugador=function(){
	var id,nombre,puntos;
	function set(clien){
		this.id=clien.id;
		this.nombre=clien.nombre;
		this.puntos=clien.puntos;
	}
	return{
		set:set,
		update:set		
	}
};
