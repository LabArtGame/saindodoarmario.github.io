// is short
// What ARE you. Fake crying, and don't tell your dad
// Weave it

function Start_Dinner_4(){

	n(". . .");
	m("É por que seu pai quase nunca está em casa, não é?");
	m("Sem um modelo masculino forte, você fica confuso...");

	Choose({
		"Claro, o papai é mesmo um ÓTIMO modelo...": function(message){
			n(message);
			m("Nick, não importa o que aconteça, ele é seu pai. Você deve amá-lo.");
			My_Fault();
		},
		"Nada a ver. Eu seria bi de qualquer forma.": function(message){
			n(message);
			m("Como você sabe?! Você é um expert em psicologia?!");
			My_Fault();
		},
		"Quer saber? Talvez você tenha razão.": function(message){
			n(message);
			m("Eu sei...");
			My_Fault();
		}
	});

}

function My_Fault(){
	
	Show("clock_time","clock_1930");

	n(". . .");
	m("É tudo minha culpa...");
	m("Eu disse pra você tomar cuidado perto dessas pessoas, mas falei tarde demais...");

	Show("mom","mom_cry");

	m("[soluços]");
	m("Ai, Nick! Coitado do meu bebê!");

	Show("nicky","dinner_nicky_sit");

	Choose({
		"Mãe… por favor, não chora...": Cry_1,
		"Mãe... para de fingir que tá chorando.": Cry_2,
		"[O choro é livre!]": Cry_3
	});
}

function Cry_1(message){

	$.crying = "simpatia";

	n(message);
	m("[chorando]...");
	n("Me desculpe. Pelo Jack, pelas mentiras, por tudo.");
	m("[chorando alto]...");
	n("Eu retiro tudo o que disse.");
	m("[chorando]...");
	n("...por favor...");
	What_Are_You();
}

function Cry_2(message){

	$.crying = "raiva";
	Show("nicky","dinner_nicky_defiant");

	n(message);
	m("[chorando]...");
	n("Sério, tá falso demaaaais.");
	m("[chorando alto]...");
	n("Você não vai parar???");
	m("[chorando]...");
	n("MÃE PARA DE CHORAR!!!");
	What_Are_You();

}

function Cry_3(message){

	$.crying = "zoando";
	Show("nicky","dinner_nicky_outrage");

	n("BAWWWWW");
	m("huu... huu... huu...");
	n("WAH WAH WAH WAH WAHHH");
	m("owww... owww...");
	n("BRRrrRR-BRR-BRbR BWAH BWAHRR rrrRRR-WaahHH WO WO WO RaaahhH");
	m("[chorando]...");

	Show("nicky","dinner_nicky_defiant");
	n("Acabou?");
	What_Are_You();

}

function What_Are_You(){

	m(". . .");
	m("Nick... o que você é?");
	n("Perdão, não entendi?");

	Show("nicky","dinner_nicky_sit");

	Show("mom","mom_sit");
	m("O que você é?");

	Choose({
		"Eu sou bissexual.": function(message){

			$.what_are_you = "bissexual";

			n(message);
			if($.admit_bisexuality){
				m("...e você disse que isso significa...");
			}
			n("Atraído sexualmente tanto por homens quanto por mulheres.");
			m("Não dá pra gostar das duas coisas.")
			m("Precisa escolher uma.");
			n("Não é assim que funciona, mãe. MESMO!");
			Have_You_Had_Sex();

		},
		"Estou só confuso.": function(message){

			$.what_are_you = "confuso";

			n(message);
			m("...Eu sei.");
			m("Sinto muito que Jack tenha te deixado confuso.");
			m("Você só está passando por uma fase. Está tudo bem.");
			n(". . .");
			m("Vai ficar tudo bem, meu filho...");
			Have_You_Had_Sex();

		},
		"Eu sou seu filho, caramba.": function(message){

			$.what_are_you = "filho";

			n(message);
			n(". . .");
			n("Isso não é o bastante?");
			Have_You_Had_Sex();

		}
	});
}

function Have_You_Had_Sex(){
	m(". . .");
	m("Você transou com o Jack?");
	Choose({
		"Sim.": function(message){
			n(message);
			m("[com náusea]");
			Have_You_Had_Sex_2();
		},
		"Não.": function(message){
			n(message);
			m("Por favor, pare de mentir… eu vi suas mensagens...");
			n("A gente só estava trocando mensagens safadas, nós não...");
			m("...e suas fotos...");
			Have_You_Had_Sex_2();
		},
		"Eu não vou falar sobre essas coisas.": function(message){
			n(message);
			m("Ai meu Deus… você fez.");
			Have_You_Had_Sex_2();
		}
	});
}

function Have_You_Had_Sex_2(){

	n(". . .");
	m("Qual… qual de vocês é a mulher?");

	Show("nicky","dinner_nicky_outrage");

	n("AH, FALA SÉRIO!");
	n("É tipo perguntar qual hashi é a colher...");
	m("Você é quem?...");

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Eu sou geralmente passivo.":function(message){
			$.top_or_bottom = "passivo";

			n(message);
			Throw_Up();
		},
		"Geralmente, o Jack é passivo.":function(message){
			$.top_or_bottom = "ativo";

			n(message);
			m("Is-isso… quer dizer que você ainda pode ser hétero… ce-certo?...");
			m("Se...você sabe… você é aquele que coloca o...");
			m("seu...");
			Throw_Up();
		},
		"Nós trocamos.":function(message){
			$.top_or_bottom = "versátil";

			n(message);
			Throw_Up();
		}
	});
}

function Throw_Up(){

	PlaySound("sfx","dinner_vomit");

	Show("clock_time","clock_1940");
	Show("mom","mom_vomit");
	Show("table","dinner_table_2");
	Wait(1000);

	Choose({
		"Mãe! que nojo!": Father_Soon,
		"MÃE! FALA SÉRIO! QUE NOJO!": Father_Soon,
		"MÃE! VOCÊ VOMITOU NO PRATO!": Father_Soon
	});

}

function Father_Soon(message){

	n(message);

	Show("mom","mom_sit");

	m(". . .");
	m("Seu pai voltará logo.");
	n("A comida está fria. Quer dizer, tirando essa parte que você… devolveu.");
	m("Seu pai está atrasado. Deve ter sido um dia estressante no trabalho.");
	m("Então… por favor… quando ele voltar...");
	m("Prometa que vai manter tudo isso em segredo?");
	n(". . .");

	m("Não conte a ele sobre Jack.");

	switch($.what_are_you){
		case "bissexual":
			m("Não conte a ele que você acha que é bissexual.");
			break;
		case "confuso":
			m("Não conte a ele que você está confuso sobre sua sexualidade.");
			break;
		case "filho":
			m("Não conte pra ele que você mentiu pra gente só pra poder… fazer coisas com o Jack.");
			break;
	}

	switch($.top_or_bottom){
		case "ativo":
			m("Não conte pra ele que você faz de Jack uma mulher.");
			break;
		case "passivo":
			m("Não conte pra ele que você age como uma mulher com o Jack.");
			break;
		case "versátil":
			m("Não conte pra ele que você e o Jack agem como mulheres.");
			break;
	}

	m("Ok?...");

	Choose({
		"Ok.": function(message){
			$.promise_silence = "sim";
			
			n(message);
			m("Ok.");
			m(". . .");
			m("Seu pai chegou.");
			Father_Soon_2();
		},
		"Não. Não está “ok”.": function(message){
			$.promise_silence = "não";
			
			n(message);
			m("Nick, não, não, por favor...");
			m("Ah, não. Seu pai chegou.");
			Father_Soon_2();
		},
		"Contanto que você não conte pra ele também.": function(message){
			$.promise_silence = "olho por olho";
			
			n(message);
			m("Eu não vou.");
			n("Me prometa que não vai.");
			m("Eu prom...");
			m("Shiuuuu. Seu pai chegou.");
			Father_Soon_2();
		}
	});

}

function Father_Soon_2(){
	Show("nicky","dinner_nicky_sit");
	Start_Dinner_5();
}
