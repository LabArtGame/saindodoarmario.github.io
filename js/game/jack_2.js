// Denounement
// j("That mode of communication?"); j("It's imprecise, impersonal, impossible to truly connect.");

// Recap what happened.
// Who's to blame.
// All coming towards --> Break up now, or try to stay together?

// Love you, X. Love you, Y.
// IMMEDIATELY CUT TO NOW - WE BROKE UP.

function Start_Jack_2(){

	/////// SET UP SCENE ////////

	Show("background","bedroom_2");
	Show("us","bedroom_us_2");
	Show("light","bedroom_light_2",{x:0,y:159});

	PlaySound("bg","bedroom_2",{loop:-1,volume:0.5});

	if($.punched){
		Show("punch","bedroom_punch",{x:256,y:404});
	}

	/////////////////////////////

	n("Oi Jack.");
	if($.sadsack){
		j("Olá, Nick querido. Ainda sente-se um poço de tristeza?");
	}else{
		j("Olá, Nick querido.");
	}
	j("Como foi se assumir para os seus país?");

	Choose({
		"Jack... a gente ferrou com tudo grandão, Jack.": function(message){
			n(message);
			j("Não... não, não.");
			j("Você tá zoando, né? O que aconteceu?");
			What_Happened();
		},
		"As coisas podiam ter sido piores.": function(message){
			n(message);
			j("Não. Não não.");
			j("Eu não esperava que eles iriam… o que… o que aconteceu?");
			What_Happened();
		},
		"Cala a boca, Jack.": function(message){
			n(message);
			j("Ah, sim, eu sabia que estava certo");
			n("Não, Jack. A gente não poderá se ver de novo. Nunca mais.");
			j("Espera.");
			j("Não, não, não. Você tá brincando, não é? O que aconteceu?");
			What_Happened();
		}
	});

}

function What_Happened(){

	if($.punched){
		Choose({
			"Meu pai me deu um soco na cara.": What_Happened_Abuse,
			"Eles vão me fazer mudar de escola.": What_Happened_School,
			"Eles leram nossas mensagens.": What_Happened_Texts
		});
	}else if($.father_oblivious==false){
		Choose({
			"Meu pai xingou muito minha mãe": What_Happened_Abuse,
			"Eles vão me fazer mudar de escola.": What_Happened_School,
			"Eles leram nossas mensagens.": What_Happened_Texts
		});
	}else{
		n("Bom, meu pai se esqueceu. Por enquanto. Mas minha mãe...");
		if($.changing_schools){
			Choose({
				"Ela está me fazendo mudar de escola.": What_Happened_School,
				"Ela está me empurrando uma professora que nunca conheci.": What_Happened_Girl,
				"Ela leu nossas mensagens.": What_Happened_Texts,
			});
		}else{
			Choose({
				"Ela contratou uma professora para acabar com todas as minhas horas vagas depois da escola.": What_Happened_School,
				"Ela está me empurrando uma professora que nunca conheci.": What_Happened_Girl,
				"Ela leu nossas mensagens.": What_Happened_Texts,
			});
		}
	}

}

function What_Happened_Abuse(message){
	$.told_jack = "abuso";

	n(message);
	j("Meu Deus!");
	j("Nicky, você precisa ligar para o Conselho Tutelar.");
	n("O que? Não. Isso é demais.");
	j("Tudo bem... ok, mas me prometa que amanhã vai dar uma passada no conselheiro da escola?");
	n("Beleza.");
	j(". . .");
	What_Happened_2();
}
function What_Happened_School(message){
	$.told_jack = "escola";

	n(message);
	j("Não!");
	j("Por que? Por que eles estão fazendo isso?");
	n("Porque o “Jack e a escola são uma má influência” ou algo assim. Na real eles querem nos separar.");
	j("Isso é horrivel...");
	What_Happened_2();
}
function What_Happened_Girl(message){
	$.told_jack = "Claire";

	n(message);
	j("Credo, sério?");
	n("O nome dela é Claire. Ela também vai ser minha professora particular.");
	j("Creeedo, eles tambem estão te arranjando pra sua própria professora particular?");
	n("Sim."); 
	What_Happened_2();
}
function What_Happened_Texts(message){
	$.told_jack = "mensagens";

	n(message);
	j("Isso é muito escroto!");
	j("Espera: o que você vai fazer com essas mensagens agora, então?");
	n("Eu posso escondê-las melhor. Meus pais não são exatamente experts em tecnologia.");
	j("...muito escroto.");
	What_Happened_2();
}

function What_Happened_2(){
	
	n("E essa é só uma das três porcarias que me aconteceram.");
	j("Nicky...");
	j("Eu sinto muito, muito mesmo.");
	j("Isso é culpa minha. Eu te pressionei para se assumir para seus pais. Fui babaca.");

	Choose({
		"É, foi sim.": function(message){
			$.blame = "jack";

			n(message);
			n("Se você não tivesse vindo com esse papo de “Ahhh, Nick, se assumir vai ser bom pra você”...")
			n("...nada disso teria acontecido...");
			j(". . .");
			n("Desculpa. Você é a unica pessoa em quem posso descontar.");
			n("Sei lá... tô fudido!");
			What_Now();
		},
		"Não, a CULPA é deles.": function(message){
			$.blame = "pais";

			n(message);
			n("Eles já tinham lido nossas mensagens. Qualquer coisa que eu dissesse depois não teria mudado nada.");
			if($.told_jack!="mensagens"){
				j("Oi? Você não me falou que eles leram suas mensagens!");
			}else{
				j("Coitado dos seus pais, Nick, eles estão presos em suas caretices moralistas.");
				n("Concordo, eu não consigo sentir outra coisa por eles que não seja pena.");
			}
			What_Now();
		},
		"Não, é tudo culpa minha.": function(message){
			$.blame = "nicky";

			n(message);
			n("Eu devia ter colocado uma senha pra travar meu celular ou escondido melhor...");
			if($.told_jack!="mensagens"){
				j("Eles leram suas mensagens também?...	");
			}
			j("Nicky, é natural confiar neles, são seus pais. Só que eles abusaram dessa confiança, não é sua culpa.");
			n("Sim...");
			What_Now();
		}
	});

}

function What_Now(){

	j(". . .");

	n("Sabe… falar com meus pais é tipo...");
	n("Falar por mensagem...");
	n("É impreciso, impessoal, impossível de rolar conexão de verdade.");

	j(". . .");
	j("E agora?");

	Choose({
		"Eu vou sabotar os planos dos meus pais.": function(message){
			n(message);

			if($.told_jack=="mensagens"){
				n("Vou arranjar um novo email e número de telefone pra falar com você");
				n("Assim eles não vão conseguir nos espionar mais.");
			}else if($.told_jack=="Claire"){
				n("Vou contar tudo para a Claire. Com alguma sorte, ela poderá nos ajudar.");
			}else{
				n("Vou descobrir uma forma, alguma maneira...");
			}

			What_Now_2();
		},
		"Vou visitar o conselheiro da escola amanhã.": function(message){
			n(message);

			if($.told_jack=="abuso"){
				n("Como eu prometi. Como você me fez prometer.");
			}else if($.told_jack=="escola"){
				n("Não sei quando eles vão me transferir.");
			}else{
				n("Pelo menos será outra pessoa pra quem eu possa desabafar.");
			}

			What_Now_2();
		},
		"Eu vou sair dessa casa.": function(message){
			n(message);

			n("Não fugir, quero dizer. Embora se eu fizesse isso eu podia ir pra sua casa.");
			n("Mas enfim. Vou tentar conseguir um internato ou uma bolsa de estudo nos EUA.");
			n("E ficar longe, bem longe dos meus pais");
			What_Now_2();
		}
	});

}

function What_Now_2(){

	j("Não, quer dizer... e agora, como vai ficar entre nós dois?");
	n("Jack...");
	j("O que vamos fazer? O que... o que vai acontecer?");
	n(". . .");

	Choose({
		"Vamos ter que terminar.": function(message){
			$.breaking_up_soon = true;

			n(message);

			j("Não, não não...");
			n("Eu não posso fazer isso com você. Não posso deixar você no meio dessa situação.");
			j("Pelo menos não diga 'nós ainda podemos ser amigos'.");
			n("Mas nós podemos ser amig...");
			n(". . .");
			j("Porque é claro que somos amigos. Claro que somos.");
			n(". . .");
			What_Now_3();
		},
		"Vamos ficar juntos enquanto pudermos.": function(message){
			n(message);

			j(". . .");
			j("Enquanto pudermos");
			n(". . .");
			What_Now_3();
		},
		"Eu não sei.": function(message){
			$.breaking_up_soon = true;

			n(message);

			j(". . .");
			What_Now_3();
		}
	});

}

function What_Now_3(){

	n("Já está tarde.");
	n("E eu preciso dormir.");
	j("Ok.");
	j(". . .");
	j("Eu te amo, Nicky.");
	n("Eu também te amo, Jack.");
	
	var insult = "";
	if($.hippies) insult+=" new-age hippie";
	if($.im_a_poet) insult+=" amateur poet";
	if(insult!=""){
		n("Seu"+insult+".");
	}else{
		n("Seu bobão.");
	}

	The_Game_Ends();

}

function The_Game_Ends(){
	Wait(500);
	Start_Outro();
}

