// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){
	
	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("E quando ele diz,");
	j("Eu comprei a empresa de aviação toda.");
	j("Foi muito engraçado!");
	n("Foi isso que ele disse?");
	n("Eu perdi o motivo de todo mundo no cinema estar rindo.");
	j("Ou você precisa de legenda ou limpar as orelhas mais vezes.");
	j("E como você interpretou o final?");

	Choose({
		"Pra mim era tudo um sonho.": Inception_Sonho,
		"Ele voltou para o mundo real!": Inception_MundoReal,
		"Não importa. Cobb deixou as coisas rolarem.": Inception_NãoImporta
	});

}

function Inception_Sonho(message){

	$.inception_answer = "Sonho";

	n(message);
	j("Então toda a história de redenção dele foi uma mentira?");
	n("Uma grande mentira.");
	j("Você é meio deprimido, não é não?");

	Choose({
		"Sim, eu sou um pacotão de tristeza.": Sadsack,
		"Às vezes… mas não quando estou com você.": function(message){
			$.im_a_poet = true;

			n(message);
			j("Ah Nicky, seu poeta amador.");
			n("Compre velas e vinho,");
			n("Porque essa é a coisa mais cafona que eu já falei.");
			j("Vou fingir que não escutei");
			n("Enfim...");
			Thanks();
		},
		"Eu sou só realista.": function(message){
			$.hippies = true;

			n(message);
			j("Você precisa de mais pensamento positivo na vida.");
			n("E VOCÊ precisa parar de ser um hippie “da nova geração”.");
			n("Enfim...");
			Thanks();
		}
	});

}
function Inception_MundoReal(message){

	$.inception_answer = "mundo real";
	$.im_a_poet = true;

	n(message);
	n("De outra forma, todo o filme teria sido uma mentira.");
	n("Qual a vantagem de viver uma mentira?");
	j("Ah Nicky, seu poeta amador.");
	j("Imagino então que você curtiu o filme?");

	Choose({
		"Ah, sim. Gostei!": function(message){
			n(message);
			Thanks();
		},
		"Mais ou menos, era confuso demais de vez em quando.": function(message){
			n(message);
			j("Acho que a ideia era essa.");
			n("Missão cumprida então.");
			n("Enfim...");
			Thanks();
		},
		"BOOOOOOOM!": function(message){
			n(message);
			j("Vou interpretar isso como um sim, acho.");
			Thanks();
		}
	});

}
function Inception_NãoImporta(message){

	$.inception_answer = "Não importa";

	n(message);
	j("Hã?");
	n("Ele nem se incomodou em ver se o piãozinho caiu!");
	n("Verdades, mentiras, meias-verdades… Cobb não se importa mais.");
	n("Ele finalmente está feliz, e isso é tudo que importa.");
	j("Você está muito poético... ou muito deprimido.");

	Choose({
		"Eu sou um poeta, e nem sabia disso.": function(message){

			$.im_a_poet = true;

			n("Eu sou um poeta,");
			n("e nem estava ciente disso.");
			j("Você é um milagre lírico, a evidência é clara.");
			n("Isso é um exagero.");
			n("Enfim...");
			Thanks();

		},
		"Não, eu sou só um triste pacotão de tristeza.": Sadsack,
		"Ou ambos.":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("POESIA É DOR. ARTE É SOFRIMENTO.");
			j("Você fala como minha mãe.");
			n("Seus pais são <i>tão</i> hippies...");
			n("do tipo nova geração de hippies.");
			n("Enfim...");
			Thanks();

		}
	});

}

function Sadsack(message){
	
	$.sadsack = true;

	n(message);
	j("Own, sinto por ouvir isso.");
	j("Espero que nosso cineminha tenha te animado!");
	n("Com certeza animou!");
	Thanks();

}

function Thanks(){
	
	n("Agradeço muito. Obrigado por me levar pra ver A Origem!");
	j("O prazer é meu, Nicky.");
	j("Você devia parodiar o filme naquele seu jogo estranho de Internet!");
	n("Mmm.. talvez, talvez.");
	n("Vamos nos encontrar amanhã a noite de novo!");

	j("Com certeza, só que...");
	n("...Espero convencer meus pais a me deixarem passar a noite fora.");

	j("Eu queria que você não contasse para sua mãe que estamos estudando quando de fato fomos para o cinema.");
	n("Vou fingir que estaremos estudando para as próximas provas a noite toda... alô?");

	j("Você não pode continuar escondendo isso.");
	n("Jack...");

	Choose({
		"Eles não podem saber nunca, nunca.": function(message){
			$.coming_out_readiness="não";
			n(message);
			j("Nunca? Você ta falando sério?");
			Hiding();
		},
		"Eu também queria poder contar para eles.": function(message){
			$.coming_out_readiness="sim";
			n(message);
			Hiding();
		},
		"Eu não estou pronto pra contar para eles ainda.": function(message){
			$.coming_out_readiness="talvez";
			n(message);
			j("Eu posso te ajudar a ficar pronto.");
			Hiding();
		}
	});

}

function Hiding(){

	j("Nicky, esconder isso está te corroendo.");

	if($.inception_answer=="mundo real"){
		j("Como você disse… qual a vantagem de viver uma mentira?");
	}
	if($.inception_answer=="sonho"){
		j("É… do jeito que você fala… uma 'grande mentira'?");
	}

	if($.sadsack){
		j("Quando você disse agora pouco que é um saco de tristeza");
		j("Eu sei que você não estava zoando, na real.");
	}

	n("Jack, fala sério.");
	j("Eu me assumi para os meus pais ano passado.");
	if($.hippies){
		n("Essa não é uma comparação justa.");
		n("COMO EU DISSE, você e seus pais são super hippies modernos.");
		n("Quando eu vou pra tua casa, nunca sei se tanta fumaça é de incenso ou maconha.");
		j("Ei! A gente fumou maconha só outro dia!");
		n("Ô.");
		j("O principal é que meus pais me apoiaram quando eu decidi me assumir.");
	}else{
		j("E foram ótimos apoiadores, aliás!");
	}

	j("Você está no Canadá agora. Muita gente aqui apoia a galera LGBT.");
	j("Como você sabe que seus pais também não vão te apoiar?");

	Choose({
		"Pais asiáticos são geralmente muito homofóbicos.": Hiding_2,
		"Não sei… acho que eu nunca tentei...": Hiding_2,
		"Eles não apoiam nada que não seja ESTUDAR.": Hiding_2
	});

}

function Hiding_2(message){
	
	n(message);

	if($.coming_out_readiness=="não"){
		n("Repito… eles não podem saber nunca, nunca.");
	}

	j("Você tem problemas de confiança.");
	j("Você até me manda mensagem ao invés de ligar...");
	j("...por achar que seus pais podem ouvir.");

	n("Eles ouviriam mesmo!");

	j("Essa forma de se comunicar.");
	j("É imprecisa, impessoal, difícil de estabelecer conexão real.");

	if($.im_a_poet){
		n("Eita… você é um poeta amador como eu, pelo que parece.");
	}else{
		n("Não é tão ruim assim...");
	}

	if($.coming_out_readiness=="sim"){
		j("Você mesmo disse que gostaria de contar pra eles.");
		j("Conta.");
	}else{
		j("Nicky.");
	}
	j("Conta sobre a gente. Hoje a noite.");

	Choose({
		"Hoje a noite? Eu não!": Hiding_3,
		"[Engasga]... Vou tentar meu melhor.": Hiding_3,
		"Eu vou jogar uma dica no ar.": Hiding_3
	});

}

function Hiding_3(message){
	
	n(message);
	j(". . .");
	n("Eu não gosto de fazer eles pirarem demais.");
	n("Ainda preciso convencer os dois a me deixarem ir pra sua casa amanhã a noite.");
	n("Vou dizer pra eles que vou estudar com você de novo.");
	j(". . .");
	n("É hora da janta. Vou descer as escadas agora.");

	j("Ei… eu concordo com você.");
	n("Oi?");
	j("Com seus pensamentos sobre o final do filme.");
	switch($.inception_answer){
		case "sonho": j("Eu acho que o Cobb ainda estava dormindo, vivendo uma mentira."); break;
		case "mundoreal": j("Eu acho que o Cobb se reconectou com sua família, no mundo real."); break;
		case "nãoimporta": j("Acho que não importa, contanto que Cobb esteja feliz."); break;
	}
	n("Own.");
	j("Ok.");
	if($.coming_out_readiness=="talvez"){
		j("Espero que tenha mudado de ideia sobre não poder contar para eles ainda..");
	}
	j("Boa sorte. Me manda uma mensagem daqui uma hora.");

	var insult = "";
	if($.hippies) insult+=" hippie moderno";
	if($.im_a_poet) insult+=" poeta amador";
	n("Até logo.");
	if(insult!=""){
		n("Seu"+insult+".");
	}else{
		n("Seu bobão. :) ");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}