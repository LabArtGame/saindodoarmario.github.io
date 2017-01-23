// Plot points:
// Trying to stay overnight.
// Reveal - hippie parents, reading poetry, ...(?)
// Threats -- date your tutor, changing school(?)
// He's distracting you. Movie & Hippies.
// Oh my god, you've been reading my texts!...

function Start_Dinner_3(){

	n("Mãe.");

	Choose({
		"É por isso que eu tô estudando mais com o Jack.": Tutor,
		"Olha, eu tô tentando. De verdade, tô mesmo.": Tutor,
		"Minhas notas estão boas.": Tutor
	});

}

function Tutor(message){

	n(message);
	m("Eu estou preocupada com você. Jack não é uma boa influência.");

	if($.hippies){
		m("Eu acho que os pais dele podem ser até viciados em drogas...");
		n("O que te faz dizer isso...?");
	}else if($.im_a_poet){
		m("Tudo que ele faz é escrever poesia.");
		n("O que te faz dizer isso...?");
	}
	
	m("Vou contratar uma professora particular para você.");
	n("...o que?");

	if($.studying_subject!=$.studying_subject_2){
		m("Ela vai te dar aulas de "+$.studying_subject+" e "+$.studying_subject_2+".");
	}else{
		m("Ela vai te dar aulas de "+$.studying_subject+".");
	}

	m("O nome dela é Claire. Ela é esperta, bonita e branca. Alguém da sua idade, também.");

	Choose({
		"Você tá tentando me impedir de ver o Jack?": Tutor_Seeing,
		"Você tá tentando arranjar ela pra mim?": Tutor_Matchmake,
		"Podemos falar sobre professoras uma outra hora?": Tutor_Forget
	});

}

function Tutor_Seeing(message){
	n(message);
	m("Como é que é, <i>ver o</i> Jack?");
	m("Cuidado com o modo que você diz isso. Faz parecer que...");
	
	Choose({
		"Que estamos namorando? Pois é. Estamos mesmo.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("...Olá?");
			m(". . .");
			n("Tem alguém aí?");
			m(". . .");
			Threat_School();
		},
		"Eu só quis dizer encontrar o Jack.": function(message){
			n(message);
			m("Ok. Só seja claro sobre algumas coisas.");
			n("Certo.");
			m(". . .");
			m("Claire é muito bonita.");
			n("Com certeza.");
			m("Ela tem seios empinados.");
			Threat_Tutor();
		},
		"Nós. Não. Somos. Namorados.": function(message){
			n(message);
			m(". . .");
			m("Ok.");
			m("Eu nunca disse que vocês eram… mas ok");
			n("Somos amigos.");

			if($.relationship=="colegas"){
				m("\"Colegas\"...");
			}
			if($.relationship=="melhor amigo"){
				m("\"Melhores Amigos\"...");
			}

			Threat_Tutor();

		}
	});
}

function Tutor_Matchmake(message){
	n(message);
	m("Bom, se é isso que você quer, eu poderia...!");
	n("nãooo.");
	m("Não seja tímido. Você está crescendo, se tornando homem.");
	m("E vai me dar uma porção de netos.");

	Choose({
		"Pare, eu nem conheci a Claire ainda!": function(message){
			n(message);
			m("Ainda!");
			m("Ela vai vir aqui amanhã!");
			n("O que? Mas eu prometi pro Jack...");
			m("Eu passei suas melhores roupas. Você vai gerar uma boa primeira impressão.");
			Threat_Tutor();
		},
		"As chances disso são 50-50, porque eu sou bi.": function(message){

			$.admit_bisexuality = true;

			n(message);
			m("Humm. Bi?...");

			Show("nicky","dinner_nicky_defiant");

			n("Sim. Tipo... BISSEXUAL.");
			n("Ou seja, EU ME SINTO ATRAÍDO SEXUALMENTE TANTO POR HOMENS QUANTO POR MULHERES.");
			m(". . .");
			n(". . .");
			Threat_School();
		},
		"Não. Eu não quero ter filhos nunca.": function(message){
			n(message);
			m("Você vai mudar de ideia quando for mais velho.");
			m("Cuidar de um filho é fantástico. Suas crianças vão se inspirar em você!");
			n("...com certeza, sua convencida.");
			m("Como é que é???");
			n("Nada.");
			m(". . .");
			Threat_Tutor();
		}
	});
}

function Tutor_Forget(message){
	n(message);
	m("Não, porque eu já combinei com a Claire de vir amanhã.");
	n("Quê?!");
	n("Não. Eu prometi estudar com o Jack amanhã.");
	m(". . .");
	m("Quanto tempo você pretende passar na casa dele?");

	Choose({
		"A noite toda.": function(message){
			n(message);
			m(". . .");
			n(". . .");
			n("...Mãe?");
			n("Isso não tem nada de errado. Amigos dormem na casa dos outros o tempo todo.");
			m(". . .");
			Threat_School();
		},
		"Até o jantar.": function(message){
			n(message);
			if($.lying_about_hanging_out){
				m("Eu sabia. Percebi a mentira cedo.");
				n("Hã?");
			}else{
				m("...Eu sabia.");
			}
			m("Você vai pra lá se divertir ao invés de ESTUDAR.");
			Threat_Tutor();
		},
		"Talvez uma hora, por aí.": function(message){
			n(message);
			m("Isso não é tempo o suficiente pra estudar alguma coisa.");
			if($.lying_about_hanging_out){
				m("Eu sabia. Percebi a mentira cedo.");
				n("Hã?");
			}
			m("Você vai pra lá se divertir ao invés de estudar.");
			Threat_Tutor();
		}
	});
}

function Threat_Tutor(){
	
	Show("nicky","dinner_nicky_defiant");
	
	n(". . .");
	m("Claire vai te ensinar todos os dias depois da escola, começando amanhã.");

	Choose({
		"Todo dia!? E meus amigos?!":function(message){
			n(message);
			m("Querido, eu sou sua amiga!");
			n(". . .");
			m("Além disso Claire pode ser sua amiga. Talvez até mais que isso.");
			n(". . .");
			n("Já acabou?");
			m("Só… mais uma coisa.");
			Plot_Twist();
		},
		"Certo, mas meus fins de semana são livres, né?": function(message){
			n(message);
			m("Sim.");
			n("Ok. Que bom que tudo está certo agora.");
			m("...Sim.");
			n(". . .");
			m("Só... mais uma coisa.");
			Plot_Twist();
		},
		"E se não rolar estudos com a Claire?": function(message){
			n(message);
			m("Bom, se você também quiser sair com ela, não há problema.");
			m("Qualquer coisa pra te fazer mais homem.");
			n("ugh.");
			m("Ah.");
			m("Só... mais uma coisa.");
			Plot_Twist();
		}
	});

}

function Threat_School(){

	$.changing_schools = true;
	
	m("Você vai mudar de escola.");

	Show("nicky","dinner_nicky_outrage");

	n("O QUÊ?!");
	m("Acho que não só o Jack, mas essa escola toda é uma influência ruim pra você.");
	n("TÁ FALANDO SÉRIO?");
	m("Toda a cultura canadense está te deixando confuso sobre quem você é.");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Não, é SUA cultura asiática que é careta!": function(message){
			n(message);
			m("Olha a grosseria!");
			m("É a sua cultura também");
			n(". . .");
			Plot_Twist();
		},
		"Você não pode fazer isso com seu FILHO!": function(message){
			n(message);
			m("Olha a grosseria!");
			m("Eu sou sua MÃE, é meu direito fazer o que quiser com você!");
			n(". . .");
			Plot_Twist();
		},
		"Tanto faz, todas as escolas tem gays nelas.": function(message){
			n(message);
			m("Olha a grosseria!");
			m("E fique esperto, eu posso mudar de ideia e começar a te ensinar em casa.");
			n(". . .");
			Plot_Twist();
		}
	});

}

function Plot_Twist(){

	m("Ontem, quando você supostamente deveria estar estudando com o Jack...");
	m("Eu sei que você foi ver um filme escondido.");

	Show("nicky","dinner_nicky_sit");
	n(". . .");

	Show("clock_time","clock_1920");

	Choose({
		"Deus! você leu minhas mensagens no celular!": function(message){
			n(message);
			m("Sim. Viu como você consegue ser esperto quando não está com o Jack?");
			Plot_Twist_2();
		},
		"Não, não fizemos isso. Nós estudamos.": function(message){
			n(message);
			m("Você é um menino muito cabeça dura.");
			m("Eu li suas mensagens de texto.");
			Plot_Twist_2();
		},
		"O que te faz pensar isso?": function(message){
			n(message);
			m("Porque eu peguei seu celular e li suas mensagens.");
			Plot_Twist_2();
		}
	});

}

function Plot_Twist_2(){

	n(". . .");
	m("Antes do jantar. Eu estava no seu quarto.");

	// Dinner_1
	m("Você gritou '"+$.what_you_called_out+"' daqui debaixo, enquanto eu destravava seu celular...");
	m("E lia o que você e Jack conversavam.");
	m("Sou sua mãe. Tenho esse direito.");

	n(". . .");

	if($.im_a_poet){
		m("Poeta amador?");
	}
	if($.hippies){
		m("Fumar maconha?");
	}
	if($.im_a_poet || $.hippies){
		m("Ele te ajudando a mentir para sua própria mãe?");
		m("O que mais você anda escondendo de mim?");
	}

	Choose({
		"Isso deve ser um pesadelo.": function(message){
			n(message);
			m("Como aquele filme A Original?");
			n("É A Origem mãe.");
			m("Não responda pra mim.");
			Plot_Twist_3();
		},
		"Desculpa mãe. Eu sinto muito.": function(message){
			n(message);
			m("Eu te perdoo.");
			m("Você é meu filho. Claro que te perdoo.");
			Plot_Twist_3();
		},
		"Eu te odeio.": function(message){
			n(message);
			m("Tudo bem.");
			m("Eu ainda te amo, Nick.");
			Plot_Twist_3();
		},
	});

}

function Plot_Twist_3(){
	Start_Dinner_4();
}
