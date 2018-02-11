var error_vektor = true;
var error_file = true;
var error_model = true;
var error_jumlah = true;
var error_vektor_terpakai = false;
var error_model_terpakai = false;

$(document).ready(function() {

	$("#judulImg").hide()
	$("#hideResultHirarki").hide()
	$("#hasilCluster").hide()

	$.ajax({
		type:'POST',
		url:'getvektor',
		processData: false,
		contentType: false,
		cache: false,
		success : function (data) {
		    if(data.vektor.length >=1) {
			    for (i=0; i < data.vektor.length; i++) {
			      	$('#vektor').append('<option value="'+data.vektor[i][1]+'">'+data.vektor[i][1]+'</option>')
			   	}
			} else {
			    $('#vektor').append('<option value="">Tidak ada data</option>')
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
		}  
	})

	$("#nama_vektor").focusout(function(){
		$("#error_vektor").empty()
		$.ajax({
			type:'POST',
			url:'cekvektor',
			data: {
				nama_vektor : $("#nama_vektor").val()
			},
			success : function (data) {
				console.log("test")
				console.log(data.pesan)
			    if(data.pesan == 'sukses') {
				    console.log("sukses")
				     $("#error_vektor").empty()
				    error_vektor_terpakai = false
				} else {
				    $("#error_vektor").append(data.pesan);
				    error_vektor_terpakai = true
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert(textStatus);
			}  
		})

	});

	$("#nama_model").focusout(function(){
		console.log($("#nama_model").val())
		$("#error_model").empty()
		$.ajax({
			type:'POST',
			url:'cekmodel',
			data: {
				nama_model : $("#nama_model").val()
			},
			success : function (data) {
				console.log("test")
				console.log(data.pesan)
			    if(data.pesan == 'sukses') {
				    console.log("sukses")
				    $("#error_model").empty()
				    error_model_terpakai = false
				} else {
				    $("#error_model").append(data.pesan);
				    error_model_terpakai = true
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert(textStatus);
			}  
		})

	});

	$('form').on('submit',function(event) {

		event.preventDefault();
		var myId = this.id;
		
		if (myId == 'hirarkiForm') {

			check_vektor()
			check_file()

			if (error_vektor || error_file || error_vektor_terpakai) {
				console.log(error_vektor);
				alert("Mohon semua form diisi dengan benar");
				return false;
			}

			$('#step0').attr('class', 'col-xs-2 bs-wizard-step complete');
			$('#lb0').attr('class', 'label label-success');
			

			$('#loading').append('\
				<br><br><span>mohon tunggu...</span>\
				<br><br>\
				<span>\
				<div class="windows8">\
					<div class="wBall" id="wBall_1">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_2">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_3">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_4">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_5">\
						<div class="wInnerBall"></div>\
					</div>\
				</div>\
				</span>');

			$('#submitHirarki').click(function() {
		        $(this).prop('disabled',true);
		    });

			var form_data = new FormData($('#hirarkiForm')[0]);
			$('#step1').attr('class', 'col-xs-2 bs-wizard-step active');

			$.ajax({
				type:'POST',
		      	url:'',
		      	processData: false,
		      	contentType: false,
		      	cache: false,
		      	data : form_data,
		      	success : function (data) {
		   			$('#step1').attr('class', 'col-xs-2 bs-wizard-step complete');
		   			$('#lb1').attr('class', 'label label-success');

		   			setTimeout(function () {
		   				preproses()
				    }, 2000);
		      	},
		      	error: function(jqXHR, textStatus, errorThrown){
			        alert(textStatus);
			    }  
			})
		} 

		if (myId == 'suggestForm') {


			var form_data = new FormData($('#suggestForm')[0]);
			$.ajax({
				type:'POST',
		      	url:'klustering',
		      	processData: false,
		      	contentType: false,
		      	cache: false,
		      	data : form_data,
		      	success : function (data) {
		      		console.log(data.link)
					$("#suggestLink").attr("href", "/static/img/analisis/hirarki/"+data.link+".png");
					$("#suggestImage").attr("src", "/static/img/analisis/hirarki/"+data.link+".png");

		      	},
		      	error: function(jqXHR, textStatus, errorThrown){
			        alert(textStatus);
			    }  
			})
		}

		if (myId == 'clusterForm') {

			check_model()
			check_jumlah()

			if (error_model || error_jumlah || error_model_terpakai) {
				console.log(error_jumlah);
				alert("Mohon semua form di isi dengan benar");
				return false;
			}

			$('#loadingtwo').append('\
				<br><br><span>mohon tunggu...</span>\
				<br><br>\
				<span>\
				<div class="windows8">\
					<div class="wBall" id="wBall_1">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_2">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_3">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_4">\
						<div class="wInnerBall"></div>\
					</div>\
					<div class="wBall" id="wBall_5">\
						<div class="wInnerBall"></div>\
					</div>\
				</div>\
				</span>');


			$('#submitCluster').click(function() {
		        $(this).prop('disabled',true);
		    });

			var form_data = new FormData($('#clusterForm')[0]);
			$.ajax({
				type:'POST',
		      	url:'secondcluster',
		      	processData: false,
		      	contentType: false,
		      	cache: false,
		      	data : form_data,
		      	success : function (data) {
		      		console.log(data.linkimg)
		      		$('#loadingtwo').remove()
		      		$("#clusLink").attr("href", "/static/img/analisis/cluster/"+data.linkimg+".png");
					$("#clusImage").attr("src", "/static/img/analisis/cluster/"+data.linkimg+".png");
		      		$("#clusterForm").hide()
		      		$("#hasilCluster").show()
		      	},
		      	error: function(jqXHR, textStatus, errorThrown){
			        alert(textStatus);
			    }  
			})
		}
	});
});

function preproses() {
	$('#step2').attr('class', 'col-xs-2 bs-wizard-step active');
	$.ajax({
		type:'POST',
		url:'preproses',
		processData: false,
		contentType: false,
		cache: false,
		dataType: "json",
		success : function (data) {

			$('#step2').attr('class', 'col-xs-2 bs-wizard-step complete');
			$('#lb2').attr('class', 'label label-success');
			setTimeout(function () {
		   		vektorisasi()
			}, 2000);	

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
		}  
	})
}

function vektorisasi() {
	$('#step3').attr('class', 'col-xs-2 bs-wizard-step active'); 
	$.ajax({
		type:'POST',
		url:'vektorisasi',
		processData: false,
		contentType: false,
		cache: false,
		dataType: "json",
		success : function (data) {

			$('#step3').attr('class', 'col-xs-2 bs-wizard-step complete');
			$('#lb3').attr('class', 'label label-success');
			setTimeout(function () {
		   		klustering()
			}, 2000);

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
		}  
	})
}

function klustering() {
	$('#step4').attr('class', 'col-xs-2 bs-wizard-step active'); 
	$.ajax({
		type:'POST',
		url:'klustering',
		processData: false,
		contentType: false,
		cache: false,
		dataType: "json",
		success : function (data) {
			$.ajax({
				type:'POST',
		      	url:'getvektor',
		      	processData: false,
		      	contentType: false,
		      	cache: false,
		      	success : function (data) {
		      		if(data.vektor.length >=1) {
		      			$('#vektor').empty()
			      		for (i=0; i < data.vektor.length; i++) {
			      			$('#vektor').append('<option value="'+data.vektor[i][1]+'">'+data.vektor[i][1]+'</option>')
			      		}
			      	} else {
			      		$('#vektor').append('<option value="">Tidak ada data</option>')
			      	}
		      	},
		      	error: function(jqXHR, textStatus, errorThrown){
			        alert(textStatus);
			    }  

			})
			$('#step4').attr('class', 'col-xs-2 bs-wizard-step complete');
			$('#lb4').attr('class', 'label label-success');
			$('#step5').attr('class', 'col-xs-2 bs-wizard-step active');
			$('#lb5').attr('class', 'label label-success');
			console.log(data.vektor)
			$("#vektorLink").attr("href", "/static/img/analisis/vektor/"+data.vektor+".png");
			$("#vektorImage").attr("src", "/static/img/analisis/vektor/"+data.vektor+".png");
			$("#suggestLink").attr("href", "/static/img/analisis/hirarki/"+data.vektor+".png");
			$("#suggestImage").attr("src", "/static/img/analisis/hirarki/"+data.vektor+".png");
			setTimeout(function () {
				$("#menuHirarki").hide()
		   		$("#judulImg").show()
				$("#hideResultHirarki").show()
			}, 2000);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
		}  
	})
}

function check_vektor() {
	var pattern = new RegExp(/^[a-z0-9]+$/i);

	if (pattern.test($("#nama_vektor").val())) {
        error_vektor = false;
	} else {
        error_vektor = true;
	}
}

function check_file() {
	
	if ($("#in_file").val().length !== 0 && $("#in_file").val().substr($("#in_file").val().length - 3) == 'csv') {
        error_file = false;
	} else {
        error_file = true;
	}
	
}

function check_model() {
	var pattern = new RegExp(/^[a-z0-9]+$/i);

	if (pattern.test($("#nama_model").val())) {
        error_model = false;
	} else {
        error_model = true;
	}
}

function check_jumlah() {
	if (parseInt($("#jumlah").val()) > 1 && parseInt($("#jumlah").val()) <= 20) {
        error_jumlah = false;
	} else {
        error_jumlah = true;
	}
}

