/*
*	
*
*
*/

var app = angular.module('main_app',['Calc']);

app.controller('mainCtrl',['$scope','$calculos', function($scope, $calculos){
	$scope.itemList=[];
	$scope.tarea;
	$scope.return_calc = undefined;
	$scope.cantHoras = 0;
	$scope.ValorHoras = 0;
	$scope.porcentaje = 15;
	$scope.otrosCosto = 0;
	$scope.costos = 0;
	$scope.total_costos_procentaje = 0;
	$scope.totalHoras = 0;
	$scope.totales = 0;
	$scope.total_suma = 0;

	$scope.add_calculadora = function() {
		$return_calc = $calculos.costos_horas($scope.cantHoras, $scope.ValorHoras);
		$return_calc
			.then(function(data){
				$scope.costos = data.Costo;
       			$scope.totalHoras = data.Horas;
       			var row = {"tarea": $scope.tarea,"cantH":$scope.cantHoras, "Vhoras": $scope.ValorHoras, "costo": $scope.costos};
				$scope.itemList.push(row);
				$scope.tarea = "";
				$scope.cantHoras = 0;
      		}, function(err){
          		console.log(err);
      		});

      	$return_calc = $calculos.total_operaciones($scope.otrosCosto, $scope.porcentaje);
      	$return_calc
      		.then(function(data){
      			$scope.total_suma = data.Total_s;
      			$scope.total_costos_procentaje = data.Total_porcentaje;
      			$scope.totales = data.Total_final;
      		}, function(err){
      			console.log(err);
      		});
	};

	$scope.clear_calc = function() {
		$scope.itemList=[];
		$scope.tarea;
		$scope.return_calc = undefined;
		$scope.cantHoras = 0;
		$scope.ValorHoras = 0;
		$scope.porcentaje = 15;
		$scope.otrosCosto = 0;
		$scope.costos = 0;
		$scope.total_costos_procentaje = 0;
		$scope.totalHoras = 0;
		$scope.totales = 0;
		$scope.total_suma = 0;
	};

}]);