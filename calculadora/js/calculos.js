var calc = angular.module('Calc', []);

calc.factory('$calculos', function($q){
	var calc = {};
	var deferred = undefined;
	var result = {};
	//aqui se obtiene el costo
	var costo = 0;
	//aqui se suman los costos que van ingresando
	var suma_costos = 0;
	//aqui se suman las horas que se van ingresando
	var total_horas = 0;
	//aqui se suman los costos mas los costos adicionales y se multiplican por el porcentaje
	var total_costos_otrosCostos_porcentaje = 0;
	//aqui se suman los costos, otros costos y el resultado con porcentaje calculado
	var total_suma = 0;
	//aqui se multiplica la suma total con el porcentaje de workana
	var total_final = 0;
	//porcentaje perteneciente a workana
	var porcentaje_workana = 1.1765;	

	/**
	 *	aqui en esta funcion se realiza el calculo del costo apartir
	 *	de la cantidad de horas multiplicado el valor de horas.
	 *	a su vez tambien se realiza la suma de los costos, y las horas ingresadas.
	**/
	calc.costos_horas = function(canthoras, valorhoras){
		try{
			deferred = $q.defer();
			costo = canthoras * valorhoras;
			suma_costos += parseInt(costo); 
			total_horas += parseInt(canthoras);
			result = {"Costo": costo, "Suma_Costo": suma_costos, "Horas": total_horas};
			deferred.resolve(result);
			return deferred.promise;
		}catch(e){
			console.log(e);
			return false;
		}
	}

	/**
	 *	aqui en esta funcion se realiza el calculo de la suma de los costos, mas
	 *	los costos adicionales multiplicado por el porcentaje. a su vez tambien
	 *	se realiza la suma general de los calculos anteriores para poder multiplicarle la comision
	 *	de workana.
	 *
	**/
	calc.total_operaciones = function(otroscostos, valor){
		try{
			deferred = $q.defer();
			var porcentaje = parseInt(valor)/100;//(valor != 0) ?  parseInt(valor)/100 :parseInt(15)/100;
			total_costos_otrosCostos_porcentaje = (parseInt(suma_costos) + parseInt(otroscostos)) * porcentaje;
			total_suma = suma_costos + parseInt(otroscostos) + total_costos_otrosCostos_porcentaje;
			total_final = total_suma * porcentaje_workana;
			result = {"Total_porcentaje": total_costos_otrosCostos_porcentaje,"Total_s": total_suma, "Total_final": total_final};
			deferred.resolve(result);
			return deferred.promise;
		}catch(e){
			console.log(e);
			return false;
		}
	}
	
	return calc;
});