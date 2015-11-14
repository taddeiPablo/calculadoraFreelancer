/*
*	=================================
*	MODULO PRINCIPAL DE LA APLICACION
*	=================================
*/
var app = angular.module('main_app', ['Calc']);

app.controller('mainCtrl',['$scope','$calculos', function($scope, $calculos){
	$scope.doc = undefined;
	$scope.specialElementHandlers = undefined;
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

	// Desde aqui se realizan varias operaciones
	// se llaman a las funciones que realizan los calculos
	// y se agregan las nuevas filas en la tabla
	$scope.add_calculadora = function() {
		try{
			if($scope.ValorHoras == 0 || $scope.cantHoras == 0) {
				alert("Atencion : el valor de las horas y la cantidad de horas no puede ser 0");
			}else{
				// desde esta funcion se calculan los costos y horas
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
      			// desde esta funcion se calculan los totales y porcentajes finales
      			$return_calc = $calculos.total_operaciones($scope.otrosCosto, $scope.porcentaje);
      			$return_calc
      				.then(function(data){
      					$scope.total_suma = data.Total_s;
      					$scope.total_costos_procentaje = data.Total_porcentaje;
      					$scope.totales = data.Total_final;
      				}, function(err){
      					console.log(err);
      				});
			}
		}catch(ex){
			console.log(ex);
		}
	};

	//	desde aqui se borran todas las operaciones
	//  y la tabla
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

	// desde aqui configura el doc pdf para luego ser 
	// descargado con la info de la pantalla
	$scope.load_data = function() {
		$scope.doc = new jsPDF('p', 'pt', 'letter', true);
		$scope.doc.setProperties({
    		title: 'PDF Calculadora',
    		subject: 'Presentacion',     
    		author: 'Pablo Taddei',
    		keywords: 'pdf, javascript,geenerated',
    		creator: 'KRS'
		});
		$scope.doc.text(50, 50, "Presupuesto del proyecto !");
		$scope.specialElementHandlers = {
    		'#editor': function (element, renderer) {
        		return true;
    		}
		};
	};

	// desde aqui se exporta el pdf tomando la
	// info de la pantalla.
	$scope.export_pdf = function() {
		try{
			//aqui hago un proceso de clonado del div-main
			//que contiene la tabla y el resto de tags
			//hago esto para poder pasarle al doc solo la tabla quitandole
			//los controles de ingreso de datos ya que no deberia mostrarse en el doc.
    		var div_content = $('#div-main').clone();
    		var div_content_aux = $(div_content)[0];
    		var div_table = $(div_content_aux).find("#div_table");
    		var table = $(div_table).find("#table");
    		var tr = $(table).find("#panel");
    		var div_costo = $(div_content_aux).find("#costos");
    		var div_total = $(div_content_aux).find("#total");
    		var thoras = $(div_total).find("#thoras").text();
    		var tcosto = $(div_total).find("#tsuma").text();
    		var twork = $(div_total).find("#twork").text();
    		//remuevo los tags que no quiero que se guarden en el doc
    		$(tr).remove();
    		$(div_costo).remove();
    		$(div_total).remove();

    		// inserto la tabla en el documento
			$scope.doc.fromHTML($(div_content)[0], 80, 100, {
        		'width': 170,
            	'elementHandlers': $scope.specialElementHandlers
    		});
			// inserto los totales en el documento
    		$scope.doc.text('Totales', 80, 299);
    		$scope.doc.text(thoras, 240, 299);
    		$scope.doc.text('extras y otros costos : ' + tcosto, 370, 299);
    		// inserto los totales con la comision
    		$scope.doc.text('Total incluyendo la comision de Workana :', 80, 350);
    		$scope.doc.text(twork, 370, 350);
    		// aqui llamando al save para la descarga del documento
    		$scope.doc.save('sampleFile.pdf');
		}catch(ex){
			console.log(ex);
		}
	};
}]);