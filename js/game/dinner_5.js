// Dad's home!
// Calm conversation about going to the movies.
// Mother brings up tutoring and/or school. (if you try to bring anyting up, it'll skip to this.)
// Argue or agree?
// Everything in the past hour comes crashing back.
// You can attempt to blame them, too. (but they justify it all)
// Agree (calm dinner) --- Stressed Dinner, storms off --- Punches you in the damn face.

function Start_Dinner_5(){

	PlaySound("sfx","dinner_door");
	
	f("Oi Qiying! Oi Nick!");
	f("Cheguei!");
	
	Show("dad","dad_serious");

	m("Oi querido.");
	n("E aí, pai, como foi seu dia?");

	f("Fiz hora extra. Espero que o chefe note isso antes da minha Avaliação de Trabalho.");
	f("Mas na verdade eu fiquei só jogando joguinhos na Internet o dia todo. Haha!");
	n("Ha ha.");

	f("Nick, por que  <i>seus</i> jogos não são divertidos?");

	Choose({
		"Eu achei que meus jogos fossem divertidos...": function(message){
			n(message);
			f("Caramba! Você tem uma noção de “divertido” que é bem estranha, hein? Haha!");
			n(". . .");
			Casual();
		},
		"Nem todos os jogos são divertidos.": function(message){
			n(message);
			f("Ah, claro. Você tem razão.");
			f("Jogos RUINS não são divertidos. Haha!");
			n(". . .");
			Casual();
		},
		"ARTE!": function(message){
			n(message);
			f("Pfft. Pra que serve a arte?");
			f("Quando notar, a próxima coisa que vai estar fazendo é escrevendo poesia ruim ou algo assim.");
			n(". . .");
			Casual();
		}
	});

}

function Casual(){
	
	f("Qiying, que molho é esse no seu prato?");
	f("Hein?...");

	Show("clock_time","clock_1950");

	Choose({
		"É vômito.": function(message){
			
			n(message);

			$.grounded = 2;
			f("Nick! Uma semana de castigo!");
			f("Não insulte a comida da sua mãe assim.");
			f("A comida dela já é um insulto por si só. Haha!");

			Casual_2();

		},
		"Não coma isso! Não é… lá muito bom...": function(message){
			
			n(message);

			$.grounded = 1;
			f("Nick! Um dia de castigo!");
			f("Mostre respeito. Tenha mais fé na comida de sua mãe!");
			f("Porque do jeito que ela cozinha, um milagre cairia bem. Haha!");

			Casual_2();

		},
		"Pai, por que você não experimenta?": function(message){
			
			n(message);

			$.grounded = 0;
			m("Nick...");
			f("Não faz mal se eu provar!");
			f("[come uma colher cheia]");
			f(". . .");
			n(". . .");
			m(". . .");
			f("Bom querida, você já cozinhou pior antes. Haha!");

			Casual_2();

		}
	});

}

function Casual_2(){
	
	m("Querido...");
	f("E então, filho! Como está na escola?");

	Choose({
		"Tudo bem na escola.": function(message){

			n(message);

			f("Bem, de verdade?");
			if($.studying_subject!=$.studying_subject_2){
				f("E suas notas ruins em "+$.studying_subject+" e "+$.studying_subject_2+"?");
			}else{
				f("E o que me diz sobre suas notas ruins em "+$.studying_subject+"?");
			}

			m("Nick e eu estavamos falando disso.");
			Getting_A_Tutor();

		},
		"Amanhã vou estudar na casa de um amigo.": function(message){
			n(message);

			$.tried_talking_about_it = true;

			if($.grounded>0){

				if($.grounded==1){
					f("Você não lembra? Te coloquei de castigo por um dia.");
				}
				if($.grounded==2){
					f("Você não se lembra? Te coloquei de castigo por uma semana.");
				}
				f("Sua estupidez deve vir da parte de sua mãe. Haha!");
				
				n("Humm. Eu...");

				$.grounded++;
				if($.grounded==2){
					f("Mudei de ideia. Agora você tá de castigo por uma semana.");
				}
				if($.grounded==3){
					f("Mudei de ideia. Você agora está de castigo por DUAS semanas.");
				}

			}

			m("Falando em estudar...");
			Getting_A_Tutor();

		},
		"PAI, SOU BISSEXUAL E TÔ TREPANDO COM O JACK.": function(message){
			$.tried_talking_about_it = true;

			Show("nicky","dinner_nicky_outrage");
			n("PAI, Eu sou Bi...");
			Show("nicky","dinner_nicky_sit");

			m("BICICLETA! Ele vai começar ir pra escola de bicicleta.");
			f("Que bom!");
			f("Você pode perder um pesinho mesmo, ou como vai arranjar uma namorada?");
			f("Você deve ter herdado a gordura de sua mãe. Haha! Haha!");
			n("Ha ha.");
			m("Falando em escola...");
			Getting_A_Tutor();
		}

	});

}

function Getting_A_Tutor(){

	m("Nós estavamos conversando sobre chamar uma professora particular.");
	f("Ah! Aquela menina, a Claire?");

	// Oh dang!
	Show("nicky","dinner_nicky_defiant");

	switch($.promise_silence){
		case "sim":
			n("Mãe, nós dois prometemos que não falariamos sobre isso...");
			if($.tried_talking_about_it){
				m("Você tentou falar sobre isso agora mesmo.");
			}
			break;
		case "não":
			n("Mãe, você disse que não falariamos disso...");
			m("Foi você quem prometeu isso!");
			break;
		case "Olho por olho...":
			n("Mãe, você disse que não falaria disso se eu não fizesse o mesmo...");
			if($.tried_talking_about_it){
				m("Você tentou falar sobre isso agora mesmo.");
			}
			break;
	}

	f("Falar em quê?...");
	f("Eu sou o “cabeça” dessa casa. Melhor não esconderem segredos de mim.");
	m("Nick gosta muito, muito da Claire.");

	Choose({
		"Quê? Não gosto não!": function(message){
			n(message);
			f("Não fique com vergonha disso.");
			Getting_A_Tutor_2();
		},
		"Certo. Você me pegou. Eu sou doido pela Claire.": function(message){
			n(message);
			Getting_A_Tutor_2();
		},
		"Eu tenho um namorado.": function(message){
			n(message);
			f("Sim, filho, você vai se tornar um namorado!");
			n("<i>Tenho</i>. Eu <i>tenho</i> um...");
			Getting_A_Tutor_2();
		}
	});

}

function Getting_A_Tutor_2(){
	
	f("Você está se tornando um homem, filho!");
	f("Se eu tivesse sua idade, chutaria sua mãe e ia atrás da Claire também! Haha!");

	n("Isso é bizarro, cara.");
	f("Respondendo pra mim? Cuidado, te dou um tabefe nos ouvidos, moleque!");

	if($.changing_schools){
		m("Nós também estamos pensando em mudar o Nick de escola.");
		m("Talvez para o colégio da Claire.");
	}
	if($.studying_subject!=$.studying_subject_2){
		m("Já que ela, todo dia, vai dar aula para o Nick de "+$.studying_subject+" e "+$.studying_subject_2+".");
	}else{
		m("Já que ela vai ajudar o Nick todo dia depois da escola em "+$.studying_subject+".");
	}

	f("Nick, o que você acha disso tudo? Sim ou não?");
	m("Ele adorou a idei...");
	f("Cala a boca. Perguntei para o meu filho.");
	m(". . .");

	Show("dad","dad_threat");

	f("Senhor Niklaus Lion.");
	if($.changing_schools){
		f("Você quer mudar de escola pra ficar perto da gostosa da sua professora particular?");
	}else{
		f("Você quer passar o tempo depois da aula com a gostosa da sua professora particular?");
	}

	n("É complicado, eu...");
	f("Sem respostinhas “em cima do muro”.");
	f("Sim ou Não.");

	n(". . .");

	Choose({
		"Sim.": Agree_With_Dad,
		"Não.": Argue_With_Dad
	});

}

function Agree_With_Dad(){
	
	n("...Sim.");

	f("Hm.");
	f("Parece que vocês dois tomaram essa decisão com muita pressa!");
	m(". . .");
	n(". . .");

	f("Nick, você fez algo ruim, não fez?");
	f("O que você aprontou?");

	Choose({
		"Eu reprovei nas provas desse bimestre.": function(message){
			
			n(message);

			f("...Ah.");
			f("Você precisa recuperar suas notas.");

			Show("dad","dad_serious");

			f("Ou você vai trabalhar como professor assim como sua mãe! Haha!");
			n(". . .");
			Agreeable_Ending();

		},
		"Eu transei com o Jack.": function(message){
			
			n(message);
			
			Show("mom","mom_cry");
			m("[soluços]");
			f(". . .");
			Argument_Ending();

		},
		"Eu transei com a Claire.": function(message){
			
			n(message);
			
			m("...Nick!");
			f(". . .");
			f("...Legaaaaaaaaaaal!!!!");
			m("...Querido!");
			f("Espera, você não a engravidou, né?");
			n("Não. Eu não sou idiota.");
			
			Show("dad","dad_serious");

			f("Ótimo. Senão você ficaria preso cuidando de uma criança...")
			f("pelas próximas duas décadas, como eu. Haha! Haha!");
			n("Ha ha.");
			Agreeable_Ending();

		}
	});

}

function Agreeable_Ending(){

	$.father_oblivious = true;

	f("Por um momento, Nick, achei que você estava fumando maconha com aquele seu amigo hippie, Jack, sei lá!");

	Show("nicky","dinner_nicky_sit");
	n(". . .");
	f("Então...");
	f("Quem quer assistir um filme esse fim de semana? Ouvi dizer que A Origem é muito bom.");

	Choose({	
		"Vamos sim! Eu ainda não assisti.": function(message){
			n(message);
			f("Então tá combinado!");
			f("Ei Nick, você sabe quem tá nesse filme?");
			n("Hummm. Leonardo DiCaprio?");
			f("Não, Ellen Page.");
			f("A Claire não parece um pouco com ela?");
			n("Eu acho.");
			Dinner_Ending();
		},
		"Ah… vamos ver um filme diferente...": function(message){
			n(message);
			f("Por que, A Origem é dificil demais pra você?");
			n("Ei...");
			if($.studying_subject!=$.studying_subject_2){
				f("Olha, eu entendo se você manda mal em "+$.studying_subject+" e "+$.studying_subject_2+"...");
			}else{
				f("Olha, eu entendo se você manda mal em "+$.studying_subject+"...");
			}
			f("Mas fala sério, isso é um  <i>filme</i>!");
			f("Você não pode ter herdado tanta burrice do lado da sua mãe! Haha!");
			n("Ha ha.");
			Dinner_Ending();
		},
		"Ah, é que eu já assisti A Origem.": function(message){
			n(message);
			f("Ah tá, entendi tudo...");
			f("Você teve um encontrinho no cinema com sua amiga especial, a Claire, né?");
			n("Claro.");
			n("Um encontro com minha amiga especial.");
			Dinner_Ending();
		}
	});

}

function Argue_With_Dad(){

	n("...Não.");

	f("Como é que é?");
	n("Isso mesmo que você ouviu");
	n("Mamãe está fazendo isso pra que eu não possa mais ver o Jack.");
	f("Jack.");
	n("Meu amigo.");

	Choose({
		"Meu namorado.": function(message){
			
			n(message);

			Show("mom","mom_cry");
			m("[soluços]");

			m("Jack fez isso com nosso filho!");
			f("Esse moleque pode escolher seu estilo de vida, mas não vou deixar que seja o seu também, Nick.");
			Argument_Ending();
		},
		"A mãe odeia ele porque ele É gay.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[soluços]");

			f("Você fez sua mãe chorar.");
			if($.hippies){
				m("E os pais dele são viciados em drogas!");
			}
			f("Jack escolheu esse estilo de vida, mas eu não vou deixar que seja o seu, Nick.");
			Argument_Ending();
		},
		"Mamãe odeia ele porque ACHA que ele é gay.": function(message){

			n(message);

			Show("mom","mom_cry");
			m("[soluços]");

			m("Jack É gay!");
			if($.hippies){
				m("E os pais dele são viciados em drogas!");
			}
			f("Jack escolheu esse estilo de vida, mas eu não vou deixar que seja o seu, Nick.");
			Argument_Ending();
		}
	});

}

function Argument_Ending(){

	$.father_oblivious = false;

	n(". . .");

	if($.top_or_bottom=="top"){
		m("Jack age como a mulher, não o Nick...");
	}
	switch($.what_are_you){
		case "bissexual":
			m("Nick não é totalmente gay, ele disse pra mim que ainda se sente atraído por garotas!");
			n(". . .");
			break;
		case "confuso":
			m("Nick me disse mais cedo que está apenas confuso!");
			f("Ah, dá pra ver que está.");
			n(". . .");
			break;
		case "filho":
			n("Olhe, como eu disse pra minha mãe agora pouco, eu sou teu FILHO, isso não é o bastant--");
			break;
	}
	
	f("Nick, você vai mudar de escola.");
	n(". . .");
	m("[chorando]...");

	f("Sua mãe e eu vamos checar suas mensagens de texto e emails.");
	n(". . .");
	m("[chorando baixo]...");

	f("Juro que se eu precisar pagar um extra para a Claire te fazer perceber que é hétero, eu vou.");
	n(". . .");

	Show("mom","mom_sit");
	if($.crying=="raiva"){
		m("Quando eu chorei agora pouco, ele me acusou de estar fingindo!");
		f("Cala a boca Qiying. Não estamos falando de você.");
	}
	if($.crying=="zuando"){
		m("Quando eu chorei agora pouco, ele me acusou de estar fingindo!");
		f("Cala a boca Qiying. Não estamos falando de você.");
	}

	f("Então Nick.");
	f("Você gostaria de dizer algo, qualquer coisinha, sobre isso?");

	Choose({
		"Sim. Foda-se isso tudo e você também.": function(message){

			n("Sim.");
			n("Foda-se isso.");
			n("E foda-se você.");
			
			Show("nicky","dinner_nicky_outrage");
			n("Fodam-se vocês dois, seus dois pedaços de merda egoíst...");
			
			Dinner_Ending_Punch();

		},
		"Não. Eu aceito minha punição.": function(message){

			n(message);
			f("Ótimo. Pelo menos você tá encarando isso como um homem.");
			n(". . .");

			Show("dad","dad_serious");

			m("...[chorando]...");
			f("Estou saindo pra conseguir algo minimamente “comível”");

			Show("dad",null);

			f("Minha querida, amorzinho? Sua comida é uma bosta.");
			PlaySound("sfx","dinner_door");

			m(". . .");
			
			Show("mom","mom_cry");

			m("[chorando alto] BAWWWWW");
			
			Dinner_Ending();

		},
		"Você não pode me magoar.": function(message){

			n(message);
			f(". . .");
			m("Querido, não...");
			f("Sábias e fortes palavras, filho.");
			m("Querido, por favor não!");
			f("Pelo menos você está me encarando de pé. Como um homem.");
			m("Por favor! É minha culpa! Não...");
			f("Gelo evita o inchaço.");
			m("QUERIDO!");
			
			Dinner_Ending_Punch();

		}
	});

}

function Dinner_Ending_Punch(){

	Wait(500);

	queue(ClearDialogue,0);

	StopSound("clock");
	PlaySound("sfx","dinner_punch");

	Show("dad",null);
	Show("mom","mom_cry");
	Show("nicky","dinner_nicky_punched");
	Show("dinner_punch_arm","dinner_punch_arm",{x:0,y:300});
	
	$.punched = true;
	Dinner_Ending();	
	
}

function Dinner_Ending(){

	Wait(500);

	queue(ClearDialogue,0);

	Wait(500);

	PlaySound("clock","dinner_meowing",{loop:-1});
	Show("clock","clock_meowing");
	Show("clock_time","clock_2000");

	Wait(1000);

	Clear();
	Start_Jack_2();

}

