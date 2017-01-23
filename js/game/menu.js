function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>SAINDO DO ARMÁRIO</b>");
	N("Um jogo quase verdadeiro sobre meias verdades.");
	N("Olá, pessoa. Seja bem vindo a este jogo.");
	N("O que gostaria de saber?");

	Choose({
		"Eu quero Jogar!": Play,
		"Quem é você?": function(){
			Credits("Quem é você?");
		},
		"Humm, fale mais sobre o jogo.": function(){
			About("Humm, fale mais sobre o jogo");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Ótimo! Direto ao ponto!");
		N("Sem perder tempo querendo conhecer melhor o jogo ou Eu que vos fala...");
		p("Shiuuuuu.");
		N("Tá bom, entendi.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Por que você criou essa opção clicável quando ela era a única que restava?.");
		N("Sei lá.");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Sim, vamos!");
	}

	N("Tudo começou em 2010, há 6 anos atrás...");
	p("Foi há SEIS anos atrás?!");
	N("...naquela noite em que minha vida mudou para sempre.");

	N("Me diga, amigo(a), como acha que essa história termina?");

	Choose({
		"Com flores, arco-íris e unicórnios gays?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Sim. É exatamente como o jogo termina.");
			p("Jura?");
			N("Não.");
			Play_2();
		},
		"Com você tentando escrever no Starbucks.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Ah, eu estou criando códigos a partir desse notebook.");
			N("Transformando minha história sobre amadurecer...");
			N("nesse jogo que você está jogando agora");
			p("Não, você provavelmente está matando tempo.");
			N("Rá! Olha quem fala.");
			p("Touché, touché.");
			N("Enfim...");
			Play_2();
		},
		"TERMINA TUDO EM SANGUE": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Acho que minha história não é tão trágica assim.");
			N("Embora ela tenha diversas interpretações....");
			p("Eu quero SANGUEEEE!");
			N("Enfim...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Caso você tenha optado por ir direto ao assunto e jogar logo...");
		N("Você deve saber que o jogo é uma história muito pessoal.");
		p("Shiuuuuuu.");
	}

	N("Esse jogo inclui conversas que eu, meus pais e meu ex-namorado de fato tivemos.");
	N("Asssim como coisas que podiam, deveriam, ou nunca deveriam ter sido ditas.");
	N("Não importa o que é o quê.");
	N("Não mais.");

	Choose({
		"Como vencer um jogo q ñ tem respostas certas?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Exatamente.");
			p(". . .");
			Play_3();
		},
		"Você é meio deprimido, não é, não?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("A VIDA é meio deprimente.");
			p("Ah, isso é um sim.");
			Play_3();
		},
		"Esse jogo “verdadeiro” é cheio de mentiras?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Mesmo que os diálogos fossem 100% verdadeiros, ainda assim seriam 100% mentirosos.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("Você jogará sendo eu em 2010.");
	if(!$.asked_credits){
		N("Bom, como você pulou os créditos, meu nome é Nicky Case. Só pra você saber.");
		p("Shiuuuuuuu.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Esse jogo não vai terminar com unicórnios gays no final. "; break;
		case 2: whatISay = "Esse jogo é uma história sobre se assumir, crescer e cair na real."; break;
		case 3: whatISay = "Esse jogo termina, não em sangue, mas em lágrimas. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Desculpe por ser um pouco deprimente"; break;
		case 2: whatISay += "Não há respostas certas."; break;
		case 3: whatISay += "Há muitas mentiras."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Ei, eu acabei de dizer isso!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Quando jogar...");
	N("Escolha suas palavras com sabedoria.");
	N("Todos os personagens vão lembrar de tudo o que você falar. Ou não falar.");
	p("É. Você até colocou minhas escolhas nesse MENU PRINCIPAL.");
	N("Exatamente.");

	N(". . .");
	N("Algumas coisas são difíceis de esquecer");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Quem é você?");
	}
	
	N("Ah, que rude da minha parte! Deixe eu me apresentar.");
	N("Oi, eu sou Nicky Case.");
	N("Aliás, Nick Case é meu nome artístico.");
	N("O meu nome verdadeiro nem é tão legal assim.")

	p("Isso é super estranho, cara.");
	if($.asked_about){
		p("Como você me disse, essa é sua história? de verdade?");
	}else{
		p("E você fez esse jogo?");
	}

	N("Sim, eu sou o único escritor, programador e artista por trás de Saindo do Armário.");

	if($.asked_about){
		p("Tudo sozinho?");
		p("Eu disse isso antes e direi de novo...");
		p("Com certeza, seu convencido.");
		N("Quer dizer, não foi sóóó eu...");
		N("O som e o áudio vieram de várias fontes de dominio público.");
	}else{
		N("O som e o áudio vieram de várias fontes de dominio público.");
		N("E a tradução do jogo foi feita pela equipe do Lab.ArtGame.")
	}

	N("E embora seja basicamente eu por trás do jogo...");
	N("...há muita gente por trás dessa história.");

	if($.asked_about){
		Choose({
			"Falando nisso, vamos jogar! Agora!!": Play
		});
	}else{
		Choose({
			"Falando nisso, podemos jogá-lo agora?": Play,
			"Aliás, me fale mais sobre o jogo": function(){
				About("Humm, fale mais sobre o jogo.");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Eu queria contar minha história.");
	}else{
		N("Esse jogo...");
		N("...que mais parece um simulador de conversa...");
		N("...na real é bastante pessoal.");
	}
	
	p("Claro. Seu convencido.");
	N("Ha, claro.");

	if($.asked_credits){
		p("Aliás não, um cara convencido iria usar seu nome verdadeiro.");
		N("Mas eu te disse, meu nome verdadeiro nem é tão legal assim...");
		p("Ok, Ok, seu estranho...");
	}

	N("Eu fiz esse jogo para o #Nar8 Game Jam. Me deu um motivo. E um prazo!");
	p("Você procrastinou até o último dia, não foi?.");
	N("Sim.");
	N("E outra coisa: esse jogo não tem copyright. Ele é totalmente de domínio público.");
	N("Tanto é que o código do jogo é aberto, assim como minha sexualidade. Rsrsrs");

	p("Aff, que piadinha horrorosa.");

	if($.asked_credits){
		Choose({
			"Vamos só jogar o game então.": Play
		});
	}else{
		Choose({
			"Piadas ruins à parte, vamos jogá-lo?": Play,
			"Então, quem é VOCÊ?": function(){
				Credits("Quem é você?");
			}
		});
	}

}