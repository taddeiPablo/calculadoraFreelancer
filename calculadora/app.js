/*
*	
*
*
*/

var app = angular.module('main_app',[]);

app.controller('mainCtrl',['$scope', function($scope){
	$scope.itemList=[];
	$scope.tarea;
	$scope.cantHoras = 0;
	$scope.ValorHoras = 0;
	$scope.costos = 0;
	$scope.totalHoras = 0;
	$scope.totales = 0;

	$scope.add_calculadora = function() {
		$scope.totalHoras += parseInt($scope.cantHoras);
		$scope.costos = $scope.cantHoras * $scope.ValorHoras;
		$scope.totales += parseInt($scope.costos);
		var row = {"tarea": $scope.tarea,"cantH":$scope.cantHoras, "Vhoras": $scope.ValorHoras, "costo": $scope.costos};
		$scope.itemList.push(row);
		$scope.tarea = "";
		$scope.cantHoras = 0;
	};

}]);