
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 100,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk"
}


// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
    // faixa 1: acima de 1.000 - Desconto de 15%
    // faixa 2: acima de 500 - Desconto de 10%
    // faixa 3: acima de 100 - Desconto de 5%



// Resolução do desafio:

$(function(){

	function atualizar_orcamento(parametros){
		
		$('.refresh-loader').show();

		var quantidade = parametros.quantidade;
		var preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit;
		var foto = "img/" + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto;
		
		var valor_total = quantidade * preco_unit;
		
		if(parametros.qualidade == "q190"){
			valor_total *= 1.12;
		}

		if(parametros.embalagem == "unitaria"){
			valor_total +=(quantidade * 0.15);
		}

		if(quantidade >= 1000){
			valor_total *= 0.85;
		}else if(quantidade >= 500){
			valor_total *= 0.90;
		}else if(quantidade >= 100){
			valor_total *= 0.95;
		}

		setTimeout(function(){

			var id_gola = "#" + parametros.gola;
			$('#result_gola').html($(id_gola).html());

			var id_estampa = "option[value='" + parametros.estampa + "']";
			$('#result_estampa').html($(id_estampa).html());

			var id_qualidade = "#" + parametros.qualidade;
			$('#result_qualidade').html($(id_qualidade).html());

			var id_cor = "#" + parametros.cor;
			$('#result_cor').html($(id_cor).html());

			var id_embalagem = "option[value='" + parametros.embalagem + "']";
			$('#result_embalagem').html($(id_embalagem).html());

			$('#result_quantidade').html(parametros.quantidade);

			$('#valor-total').html(valor_total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits:2}));
	
			$('#foto-produto').attr("src", foto);	
		
			$('.refresh-loader').hide();
		
		},1000)		

		

	}

	function atualizar_campos(parametros){

		$("#cor").children().removeClass("selected");
		var id_cor = "#" + parametros.cor;
		$(id_cor).addClass("selected");

		$("#gola").children().removeClass("selected");
		var id_gola = "#" + parametros.gola;
		$(id_gola).addClass("selected");

		$("#qualidade").children().removeClass("selected");
		var id_qualidade = "#" + parametros.qualidade;
		$(id_qualidade).addClass("selected");

		$("#estampa").val(parametros.estampa);
		$("#embalagem").val(parametros.embalagem);
		$("#quantidade").val(parametros.quantidade);

	}

	function atualizar_localStorage(parametros){
		localStorage.setItem("quantidade", parametros.quantidade);
		localStorage.setItem("cor", parametros.cor);
		localStorage.setItem("gola", parametros.gola);
		localStorage.setItem("qualidade", parametros.qualidade);
		localStorage.setItem("estampa", parametros.estampa);
		localStorage.setItem("embalagem", parametros.embalagem);
	}

	$(".option-filter div").click(function(){

		$(this).parent().children("div").removeClass("selected");
		$(this).addClass("selected");

		var categoria = $(this).parent().attr('id');
		atualizar_localStorage(parametros_pesquisa);
		parametros_pesquisa[categoria] = $(this).attr('id');
		atualizar_orcamento(parametros_pesquisa);

	});

	$("select").change(function(){

		var parametro_select = $(this).attr('id');
		parametros_pesquisa[parametro_select] = $(this).val();
		atualizar_localStorage(parametros_pesquisa);
		atualizar_orcamento(parametros_pesquisa);

	});

	$('#quantidade').change(function(){
	
		var parametro_input = $(this).attr('id');
		parametros_pesquisa[parametro_input] = $(this).val();
		atualizar_localStorage(parametros_pesquisa);
		atualizar_orcamento(parametros_pesquisa);	

	});



	//Ao carregar a p�gina

	

	if(localStorage["quantidade"]){
		parametros_pesquisa.quantidade = parseInt(localStorage["quantidade"]);
	}

	if(localStorage["cor"]){
		parametros_pesquisa.cor =	localStorage["cor"];
	}

	if(localStorage["gola"]){
		parametros_pesquisa.gola = localStorage["gola"];
	}

	if(localStorage["qualidade"]){
		parametros_pesquisa.qualidade = localStorage["qualidade"];
	}

	if(localStorage["estampa"]){
		parametros_pesquisa.estampa = localStorage["estampa"];
	}

	if(localStorage["embalagem"]){
		parametros_pesquisa.embalagem = localStorage["embalagem"];
	}	

	atualizar_campos(parametros_pesquisa);
	atualizar_orcamento(parametros_pesquisa);
    
});













