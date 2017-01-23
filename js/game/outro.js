// Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function Start_Outro(){

	// Just clear dialogue & stuff.
	queue(ClearScene,0);
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse_2");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	///////////////////////////////

	if($.breaking_up_soon){
		N("E aí, nós terminamos três dias depois.");
	}else{
		N("E aí, nós terminamos três semanas depois.");
	}

	// Weave - intro
	if($.main_menu_convo_1==1){
		p(". . .");
		N("Te falei que isso não terminava com unicórnios gays.");
	}else if($.main_menu_convo_1==3){
		p(". . .");
		N("Te contei. Sem sangue, mas com lágrimas.");
	}else if($.main_menu_convo_2==1){
		p(". . .");
		N("Você tinha razão. Eu sou meio deprê.");
	}

	Choose({
		"MEUS SENTIMENTOS.":function(message){
			p(message);
			N("Deixa o sentimento rolar, meu amigo.");
			Closure();
		},
		"Ah, fala sério, isso é muita sacanagem, cara.":function(message){
			p(message);
			N("Isso eu não nego.");
			Closure();
		},
		"Não dá pra dizer que eu não previa...":function(message){
			p(message);
			N("É… Jack e eu também já prevíamos.");
			Closure();
		}
	});

}

function Closure(){

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Aff.");
	p("Me sinto incomodado só em usar a mesma cor de balãozinho que o personagem do Pai usava.");

	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("O que me lembra: muitos dos personagens foram trocados.");
	N("Todos os nomes foram alterados, exceto o meu.");
	N("Deixei meu irmãozinho totalmente de fora, porque ele é inocente.");
	N("E coloquei meu pai de volta, mesmo que ele tenha deixado a família lá atrás, em 2010.");

	if($.main_menu_convo_2==3){
		N("Como você disse, esse jogo 'verdadeiro' é cheio de mentiras.");
	}
	
	p("Você podia pelo menos ter me dado uma cor diferente.");
	N("Já faz seis anos desde aquela noite...");
	N("O que você acha que aconteceu depois?");

	if($.main_menu_convo_2==2){
		N("Não se preocupe. Como dissemos no menu, não há respostas certas.");
	}

	$.coming_out_stories_left = 3;
	$.order_of_stories = [];

	Choose({
		"Cara, eu não sei, me conta logo, pô.": function(message){
			p(message);
			N("Beleza, vou te contar o que aconteceu.");
			N("...e o que aconteceu, e o que aconteceu.");
			p("Oi?");
			Closure_Story();
		},
		"Deixa eu adivinhar… Deu tudo certo?": function(message){
			p(message);
			N("Na real, sim. Nas três versões do que aconteceu.");
			p("O que?");
			Closure_Story();
		},
		"Flores e arco íris e unicórnios gays?": function(message){
			p(message);
			N("Isso mesmo! Pelo menos em uma das três versões do que aconteceu.");
			p("Claro.");
			Closure_Story();
		}
	});

}

function Closure_Story(){

	if($.coming_out_stories_left==3){
		N("Qual história pós saída do armário você quer ouvir primeiro?");
		N("Não se preocupe, você vai ouvir as três.");
	}else if($.coming_out_stories_left==2){
		N("Agora, qual versão você quer ouvir primeiro?");
	}else if($.coming_out_stories_left==1){
		N("Finalmente, vamos saber sobre a última história...");
	}else{
		Finale_1();
		return;
	}

	$.coming_out_stories_left -= 1;

	var options = [];
	if(!$.told_story_lie) options["A Verdade."]=Tell_Me_A_Lie;
	if(!$.told_story_truth) options["A Mentira."]=Tell_Me_A_Truth;
	if(!$.told_story_half_truth) options["A Meio Verdade."]=Tell_Me_A_Half_Truth; 
	Choose(options);

}

function Is_Last_Story(){
	if($.coming_out_stories_left==0){
		if($.asked_about && $.asked_credits){
			p("Novamente fazendo a única opção que tem, como opção clicável...");
		}else{
			p("Por que você fez dela uma opção clicável quando ela era a única?");
			N("Não faço ideia. Vamos seguindo.");
		}
	}
}



function Tell_Me_A_Lie(message){

	$.told_story_lie = true;
	$.order_of_stories.push("A mentira");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Muito bem.");
	Is_Last_Story();

	N("Eu fugi de casa, com nada além de uma bagagem de mão com algumas cuecas que dava pra usar.");
	if($.im_a_poet){
		N("Eu rumei para Great White North. Me sustentando em escrever poesia amadora para estranhos.");
	}else{
		N("Eu parti para Great White North, arranjando sustento em fazer jogos não divertidos para a internet.");
	}
	N("Eu comi flores. Segui o arco-íris. E virei amigo de um unicórnio gay.");
	p(". . .");
	N("Inesperadamente, cheguei até o Alasca, onde conheci um casal de adultos bissexuais chamado Bonnie e Clyde.");
	N("Bonnie era uma panterona de 30 anos, e Clyde um garanhão na casa dos 40.");

	// FAMILY WITH BENEFITS
	// Weave in -- top or bottom

	Choose({
		"Necessidades básicas são tanto comida quanto roupas.": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("E graças à minha flexibilidade, a bagagem de mão dobrou sua capacidade de armazenamento!");
			Tell_Me_A_Lie_2();
		},
		"Essa história é o fragmento do fragmentado.": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("MINHA HISTÓRIA, MINHAS REGRAS.");
			Tell_Me_A_Lie_2();
		},
		"...\"garanhão\".": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("Também conhecido como bicha maricona.");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("Eles me acolheram como seu filho postiço, eu era o garoto-objeto favorito deles.");

	if($.outro_convo_lie==1){
		p("...Graças novamente à sua, é… flexibilidade.");
	}

	switch($.top_or_bottom){
		case "ativo": N("Como sabemos, eu gosto que meus parceiros sejam “a mulher” na relação."); break;
		case "passivo": N("Como sabemos, eu sou geralmente “a mulher” na relação."); break;
		case "versátil": N("Como sabemos, eu gosto de revezar em ser “a mulher” numa relação."); break;
	}

	N("Eles me criaram, mostraram amor, e eu cresci pra ser um membro produtivo da sociedade.");

	switch($.outro_convo_lie){
		case 2: p("E quando você dá um zoom nesse fragmento, ele está ainda mais fragmentado."); break;
		case 3: p("...\"GARANHÃO\"."); break;
	}

	N("Eles foram minha nova família.");
	N("Família… com benefícios.");

	p(". . .");

	Closure_Story();

}





function Tell_Me_A_Truth(message){

	$.told_story_truth = true;
	$.order_of_stories.push("A Verdade");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Lá vai.");
	Is_Last_Story();

	N("Eu adotei o conselho do Jack e parodiei A Origem em meu “jogo estranho online”: “Reimagine: The Game”.");
	switch($.inception_answer){
		case "mundo real": N("Não falei que Cobbs estava acordado o tempo todo no final, apesar disso."); break;
		case "sonho": N("Não falei que o filme era todo um sonho no fim, apesar disso."); break;
		case "não importa": N("Ainda acho que não importa se Cobbs estava sonhando."); break;
	}
	N("Reimagine: The Game: se tornou famoso na Internet! Uma ótima peça de portfolio.");
	N("Alguns meses depois, eu consegui estágio na Electronic Arts de Bay Area. Longe da minha família no Canadá.");

	Choose({
		"Eww, Electronic Arts...": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("É, eu sei, eu sei.");
			N("Agora eu estou me redimindo dos pecados ao fazer jogos meio arte, meio indie, como esse aqui.");
			p("Se redima mais ainda, hein.");
			Tell_Me_A_Truth_2();
		},
		"E Bay Area é muito simpática aos LGBT.": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("Por isso eles chamam lá de Gay Area!");
			Tell_Me_A_Truth_2();
		},
		"Nossa, eu amo a EA! Eles fizeram The Sims, né?": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("Isso! Mas eu não trabalhei com essa galera na real. Meu time estava fazendo uma versão em game de...");
			N("LITERALLY CANNOT DISCLOSE");
			p("Entendi.");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("Depois da EA, eu parti pro indie.");
	N("Mas permaneci em contato com meus amigos na EA, e também os que moram em Bay Area.");

	N("Minhas habilidades técnicas cresceram.");
	N("Minhas habilidades sociais cresceram.");
	N("E aqui… estou finalmente descobrindo minha identidade.");

	switch($.outro_convo_truth){
		case 1: p("Bom, eu tô ansioso para o lançamento de “Literally Cannot Disclose: The Game."); break;
		case 2: p("Mas sério mesmo, nunca escutei falar no Gay Area."); break;
		case 3: p("Mas sério, Electronic Arts… eca!"); break;
	}

	Closure_Story();

}





function Tell_Me_A_Half_Truth(message){
	$.told_story_half_truth = true;
	$.order_of_stories.push("A Meio Verdade");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Como preferir.");
	Is_Last_Story();

	N("Claire, numa virada irônica do destino, também era bissexual.");
	N("Contamos um pro outro durante a aula de "+$.studying_subject+".");

	p("Que virada");

	N("Claire estava insegura sobre sua orientação sexual, como eu.");
	N("Nós eramos de alguma maneira inexperientes. Claire só havia ficado com mulheres, e eu com Jack.");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"Uma versão espelhada sua, mas ao contrário...": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N("Bom, todas as imagens no espelho são ao contrário.");
			p("Você me entendeu.");
			N("Sim, eu e Claire compartilhamos nossas experiências.");
			Tell_Me_A_Half_Truth_2();
		},
		"Vocês mostraram um para o outro sobre o OUTRO lado?": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"Vocês acabaram se pegando?": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("Não, ela é tipo uma irmã pra mim. Com uma irmã eu não transaria.");
			p("Você… não precisava esclarecer isso.");
			N("Mas sim, Claire e eu compartilhamos nossas experiências um com o outro.");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("E trocamos dicas!");
	N("Tipo… faça um movimento mais forte com o dedo, ou esfregue a cabecinha no céu da boca.");
	p("Informação demais, cara...");

	if($.changing_schools || !$.father_oblivious){
		N("No final, eu acabei indo pra escola dela.");
	}

	N("Nós nos tornamos melhores amigos, e ainda somos!")
	N("Nos mudamos para os Estados Unidos agora, longe de nossas destetáveis famílias.");
	N("Juntos, nos ajudamos a superar nossas inseguranças e descobrir quem somos...");
	N("Duas biscates bissexuais orgulhosérrimas.");

	p("Que história emocionante. Eu acho.");
	
	N("E claro, nós ajudamos a arranjar paqueras um para o outro.");

	p(". . .");

	Closure_Story();

}





function Finale_1(){
	
	N("E essa é a última das minhas histórias sobre sair do armário!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("Querido jogador, eu não pude deixar de notar...");
	if($.order_of_stories[0]=="truth"){
		N("Que você foi direto para A Verdade.");
	}else if($.order_of_stories[2]=="truth"){
		N("Você deixou A Verdade por último.");
	}else if($.order_of_stories[0]=="lie"){
		N("Você quis ouvir A Mentira primeiro.");
	}else{
		N("Você deixou A Mentira por último.");
	}
	N("O que isso diz sobre você?...");
	p(". . .");

	p("Sabe como é… quando um jogo te dá múltiplos finais, eles não fazem isso TUDO DE UMA VEZ.");
	N("Hah! Você pensou que esses eram FINAIS?");

	Choose({
		"Deixa eu adivinhar… esse é só O Começo?": function(message){
			p(message);
			N("Esse é só O Come... ah. É, isso aí.");
			Finale_2();
		},
		"Bom. O jogo acabou, né?": function(message){
			p(message);
			N("Sim, mas a história, a minha história, minha vida, continua.");
			Finale_2();
		},
		"Jesus do céu esse jogo vai durar PRA SEMPRE?": function(message){
			p(message);
			N("Não se preocupe. Juro que sua próxima escolha é a última.");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N(". . .");
	N("Sabe, se eu pudesse voltar atrás e reavaliar todas as minhas escolhas...");
	N("... o que de certa forma eu fiz, quando montei esse jogo...");
	N("... Eu não mudaria nada.");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("? ? ?");

	if($.punched){
		N("Minhas mensagens sendo lidas. Ser forçado a mudar de escola. Ser socado na cara.");
	}else if($.father_oblivious==false){
		N("Minhas mensagens sendo lidas. Ser forçado a mudar de escola. Todo o xingamento.");
	}else if($.changing_schools){
		N("Minhas mensagens sendo lidas. Ser forçado a mudar de escola. A tentativa de fazer uma “reabilitação gay” usando a Claire.");	
	}else{
		N("Minhas mensagens sendo lidas. As horas livres pós escola que eu não tive mais. A tentativa de “reabilitação gay” usando a Claire.");
	}

	N("De um jeito meio Síndrome de Estocolmo… eu me sinto grato por tudo.");

	Choose({
		"que?.": Finale_3,
		"que???.": Finale_3,
		"O queeeeeee??????": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("Sim, sério");
	N("Eu não estaria tão motivado a dar um gás na minha vida… se minha vida até então não tivesse sido essa merda enorme.");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("Mais tarde, em 2010, Dan Savage lançou a campanha It Gets Better&trade.");
	N("Minhas três histórias… Mentira, Verdade e Meia Verdade… elas são todas verdadeiras sobre pelo menos uma coisa.");
	N("A vida melhora.");

	p(". . .");

	N("E...");
	N("No fim...");
	N("Desse jogo longo, estúpido, dolorido...");
	N("Que eu joguei contra pessoas que deviam estar ao meu lado...");

	p(". . .");

	N("Eu venci.");
	N(". . .");
	N("Eu venci.");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	// CUTSCENE -- MY NEW BOYFRIEND
	Wait(1000);
	
	PlaySound("sfx2","laptop_pack");
	Show("nicky","coffee_nicky_date_1");
	Wait(1000);
	
	PlaySound("sfx","step_2");
	Show("nicky","coffee_nicky_date_2");
	Wait(1000);
	
	PlaySound("sfx","step_1");
	Show("nicky","coffee_nicky_date_3");
	Wait(1000);
	
	PlaySound("sfx","step_2",{volume:0.75});
	Show("nicky","coffee_nicky_date_4");
	Wait(1000);

	PlaySound("sfx","step_1",{volume:0.5});
	Show("nicky",null);
	Wait(1000);

	PlaySound("sfx","step_2",{volume:0.25});
	Choose({
		"REPLAY?": Finale_4
	});

}
function Finale_4(message){
	
	p(message);
	N("A vida real não tem replay.");

	Wait(800);
	queue(function(){
		document.getElementById("game").setAttribute("screen","blank");
	},1000);
	//queue(ClearScene,0); // coz the sound's cool!
	queue(function(){
		document.getElementById("game").setAttribute("screen","credits");
	},0);


}


