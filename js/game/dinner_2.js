// PLOT POINTS:
// 1) Studying at Jack's
// 2) Suspecting Jack is gay
// 3) Trying to get you a private tutor (threatening your relationship)

function Start_Dinner_2(){

	m("Olá Querido.");
	Show("mom","mom_sit");

	switch($.waiting_action){
		case "comer":
			m("Ah, você começou a comer sem mim. Você é muito impaciente.");
			n("...ah, tá.");
			break;
		case "esperar":
			m("Você podia ter começado a comer sem mim. Não precisa deixar sua comida esfriar.");
			n("...claro.");
			break;
		case "brincar":
			m("Brincar com a comida é coisa de criança, sabia?");
			n("uhumm, sei.");
			break;
	}

	m("Seu pai está atrasado. Ele deve chegar daqui uma hora.");

	Choose({
		"Legal. Vamos comer.": function(message){
			n(message);
			m(". . .");
			m("Quais seus planos para amanhã?");
			Start_Dinner_2_1();
		},
		"Eu tenho uma coisa pra contar para vocês dois.": function(message){
			n(message);
			m("Certo. Conte pra nós dois quando ele voltar.");
			n("Ah. Okay.");
			m(". . .");
			m("E então, quais são seus planos para amanhã?");
			Start_Dinner_2_1();
		},
		"Mãe, eu preciso te contar uma coisa primeiro.": function(message){
			n(message);
			m("Calma, Nick, eu nem perguntei sobre o seu dia ainda!");
			n("Hoje foi tranquilo.");
			m("Ok. E quais são seus planos para amanhã?");
			Start_Dinner_2_1();
		}
	});

}

function Start_Dinner_2_1(){

	n("É... estudar.")
	n("Isso. Amanhã eu vou estudar.");
	m("Qual matéria?");
	n("Er...");

	Choose({
		"Química.": function(message){
			$.studying_subject = "Química";
			Start_Dinner_2_2(message);
		},
		"Matemática.": function(message){
			$.studying_subject = "Matemática";
			Start_Dinner_2_2(message);
		},
		"Ciência da Computação.": function(message){
			$.studying_subject = "Ciência da Computação";
			Start_Dinner_2_2(message);
		}
	});

}

function Start_Dinner_2_2(message){

	n(message);
	m("Ótimo.");
	m("Você realmente podia melhorar suas notas em "+$.studying_subject+" .");
	n(". . .");
	m("Então, eu vou estudar na biblioteca amanhã.");
	m("Eu vou te encontrar estudando lá?");
	n("Pra falar a verdade, eu vou estudar na casa do Jack");
	m("Outra vez?");
	m("Você passa bastante tempo com ele.");

	Choose({
		"A gente só estuda junto, só isso.": function(message){
			$.relationship = "estuda";
			Buddy_1(message);
		},
		"Mãe, o Jack é… mais que um amigo.": function(message){
			
			$.relationship = "melhor amigo";
			n(message);
			
			$.lying_about_hanging_out = true;
			m("Ah, tipo “melhor amigo”?");
			n("Hmm. Na verdade");
			m("Então você estão só saindo, e não estão estudando?.");
			n("Nós ESTAMOS estudando!");
			m(". . .");
			m("Tudo bem, só não minta pra mim.");
			n("Eu não estou mentindo.");
			Buddy_1_point_5();
		},
		"Hmm, sim, isso é o que colegas fazem.": function(message){
			$.relationship = "colegas";
			Buddy_1(message);
		}
	});

}


///////////////////////////////////////
////// 2) SUSPECTING Jack IS GAY ///////
///////////////////////////////////////


function Buddy_1(message){
	n(message);

	if($.relationship!="estuda"){
		$.lying_about_hanging_out = true;
		m("Então vocês estão só saindo, e não estão estudando?");
		n("Nós estamos estudando!");
		m(". . .");
		m("Tudo bem, só não minta pra mim.");
		n("Eu não estou mentindo.");
	}else{
		m("Ok. Só estou me certificando.");
		n("De que?");
	}

	Buddy_1_point_5();
}

function Buddy_Caught_Lying_1(message,callback){
	n(message);
	m("Espera...");
	m("Pensei que havia dito que vocês só estudam juntos");
	m("Você não me contou que são amigos.");
	$.lying_about_relationship = true;
	Choose({
		"Ops, eu quis dizer que ele é um colega de classe.": callback,
		"Bom, ele também pode ser meu amigo...": callback,
		"Eu sempre disse que somos amigos.": callback
	});
}

function Buddy_1_point_5(){

	m("Só… não saia muito com ele.");
	m("As pessoas podem ter alguma ideia errada.");

	Choose({
		"Ah. Nada a ver... nós somos só amigos.": function(message){
			if($.relationship=="estuda" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,Buddy_2);
			}else{
				Buddy_2(message);
			}
		},
		"A ideia errada pode ser a ideia certa.": Buddy_4,
		"O que voce quer dizer com… ideia errada?": Buddy_3
	});

}

function Buddy_2(message){
	n(message);
	m("Ok.");
	if($.lying_about_relationship){
		m("Só não minta pra mim.");
		n("Eu não vou.");
		m(". . .");
		m("Mas… sobre você andando com o Jack.");
	}
	m("É só que algumas pessoas podem pensar coisas, considerando que...");
	m("Você sabe... ele é meio...");
	m("Gay!");
	Buddy_Choice();
}

function Buddy_3(message){
	n(message);
	m("Aqui entre nós, mãe e filho… eu acho que ele pode ser… você sabe...");
	n("Não, o que?");
	m("Gay!");
	m("Ele tem jeito de gay.");
	Buddy_Choice();
}

function Buddy_4(message){
	n(message);
	m("Isso é tipo uma coisa meio Zen, sabe?");
	n("Oi?");
	m("Zen é algo sobre a natureza e o Jack, seu colega, ele...");
	m("...você sabe, ele é diferente");
	Choose({
		"Você acha que ele gay?": function(message){
			n(message);
			m("Sim!");
			m("E você também suspeita disso!");
			Buddy_Choice();
		},
		"Não fale assim do meu amigo!": function(message){

			if($.relationship=="estuda" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){

					n(message);
					m("Ok.");
					m("Só não minta pra mim.");
					n("Eu não vou.");
					m(". . .");

					m("Mas até você concorda comigo que não é bom ser visto como 'Diferente'.");
					n("Eu nunca disse isso");
					m("E eu só estou tomando conta de você. Porque você sabe, ele age como um....");
					m("Um gay!");
					Buddy_Choice();

				});
			}else{

				n(message);
				m("Só estou sendo honesta.");
				m("Mas até você concorda comigo que não é bom ser visto como 'diferente'.");
				n("Eu nunca disse isso");
				m("E eu só estou tomando conta de você. Porque você sabe, ele age como um....");
				m("Um gay!");
				Buddy_Choice();

			}

		},
		"O que você quer dizer com 'ele é diferente'?": Buddy_3
	});
}

function Buddy_Choice(){
	if($.relationship=="colegas"){
		m("Já que você diz que ele é um “colega”...");
		m("As pessoas podem pensar que você é gay também.");
	}
	if($.relationship=="melhor amigo"){
		m("Já que você diz que ele é seu melhor amigo...");
		m("As pessoas podem pensar que você é gay também.");
	}
	Choose({
		"Ha, ele age como um gay. Mas por sorte, ele não é.": function(message){
			n(message);
			m("Tá vendo? Você também acha que há algo diferente nisso.");
			n("...claro.");
			Buddy_Aftermath();
		},
		"O que há de errado em ser Gay?!": function(message){
			n(message);
			m("Nada! Nada!");
			Buddy_Aftermath();
		},
		"Talvez... meu amigo possa ser gay.": function(message){

			if($.relationship=="estuda" && !$.lying_about_relationship){
				Buddy_Caught_Lying_1(message,function(message){
					n(message);
					m("Ok.");
					m("Só não minta pra mim.");
					n("Eu não vou.");
					m(". . .");
					Buddy_Aftermath();
				});
			}else{
				n(message);
				Buddy_Aftermath();
			}
			
		}
	});
}


function Buddy_Aftermath(){

	m("Não me entenda mal.");
	m("Eu não estou dizendo que esse tipo de gente é ruim!");
	m("Só acho que… você deve tomar cuidado perto delas.");
	m("Jack pode, de repente, tentar te convocar.");

	Show("clock_time","clock_1910");
	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Oi?": Buddy_Aftermath_2,
		"O que?": Buddy_Aftermath_2,
		"O que?????????": Buddy_Aftermath_2
	});
}

function Buddy_Aftermath_2(message){
	
	n(message);

	n("Como que você pensa...");
	n("Aff, deixa pra lá.");
	m("Nick, desculpe se você me acha chata.");
	n("Não, mãe, para com isso");
	m("Vamos voltar a falar de suas notas.");
	m("Me diz, o que você disse que vai estudar amanhã mesmo?");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	n("Errrmmmmm...");

	Choose({
		"Química?": function(message){
			$.studying_subject_2 = "Química";
			Grades_Start(message);
		},
		"Matemática?": function(message){
			$.studying_subject_2 = "Matemática";
			Grades_Start(message);
		},
		"Ciência da Computação": function(message){
			$.studying_subject_2 = "Ciência da Computação";
			Grades_Start(message);
		}
	});

}


//////////////////////////////////////////
////// 3) A POSSIBLE PRIVATE TUTOR ///////
//////////////////////////////////////////

function Grades_Start(message){
	n(message);
	m(". . .");
	if($.studying_subject!=$.studying_subject_2){
		Grades_Start_1();
	}else{
		Grades_Start_2();
	}
}

function Grades_Start_1(){
	m("Primeiro você me disse que era "+$.studying_subject+".");
	m("E agora me fala que é "+$.studying_subject_2+"?");
	$.lying_about_studying = true;
	n("Mãe, eu só estava confus...");
	if($.lying_about_hanging_out || $.lying_about_relationship){
		m("É a SEGUNDA vez que você mente pra mim durante esse jantar.");
		n("Eu não menti sobre...");
	}
	m("De qualquer forma, suas notas nas duas matérias estão horríveis.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Start_2(){
	m("Você hesitou por um momento.");
	n("Eu estava comendo.");
	m("Ok.");
	if($.lying_about_hanging_out){
		m("Eu me pergunto se você está de fato estudando com o Jack ou só saindo pra se divertir.");
		n("A gente estuda.");
	}
	m(". . .");
	m("Ainda assim, sua nota em "+$.studying_subject_2+" está horrível.");
	n(". . .");
	Grades_Explaining();
}

function Grades_Explaining(){
	Start_Dinner_3();
}
