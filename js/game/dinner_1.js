function Start_Dinner_1(){

	/////// SET UP SCENE ////////

	Show("background","dinner");
	Show("clock","clock_ticking",{x:155,y:294});
	Show("clock_time","clock_1855",{x:155+5,y:294+37});
	Show("nicky","dinner_nicky_sit",{x:0,y:300});
	Show("dad",null,{x:0,y:300});
	Show("mom",null,{x:0,y:300});
	Show("table","dinner_table",{x:0,y:420});

	PlaySound("clock","dinner_ticking",{loop:-1});

	////////////////////////////

	Wait(2500);
	n("Cadê todo mundo?...");
	n(". . .");

	Choose({
		"Mãããee?": Waiting_1,
		"Paaaaii?": Waiting_1,
		"Tem alguém aí?": Waiting_1
	});

}

function Waiting_1(message){
	
	$.what_you_called_out = message;
	n(message);

	n(". . .");

	Choose({
		"[Começar a comer]": function(message){
			$.waiting_action = "comer";
			Waiting_2(message);
		},
		"[Esperar um pouco mais]": function(message){
			$.waiting_action = "esperar";
			Waiting_2(message);
		},
		"[brincar com a comida]": function(message){
			$.waiting_action = "brincar";
			Waiting_2(message);
		}
	});

}

function Waiting_2(message){
	
	n(message);
	n(". . .");

	PlaySound("clock","dinner_meowing",{loop:-1});

	Show("clock","clock_meowing");
	Show("clock_time","clock_1900");
	Wait(1000);

	Show("nicky","dinner_nicky_defiant");

	Choose({
		"Para com essa choradeira, gato cacofônico!": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			if($.im_a_poet){
				m("Nossa! Cacofônico?");
			}else{
				m("Poético.");
			}

			Show("nicky","dinner_nicky_sit");
			n("Ah, Oi mãe.");
			
			Waiting_End();
		},
		"Argh, por que nós compramos esse negócio?": function(message){
			n(message);

			Show("mom","mom_stand");
			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});

			m("Seu avô nos deu de presente.");

			Show("nicky","dinner_nicky_sit");
			n("Ah! Oi mãe.");
			
			Waiting_End();
		},
		"Miau! Miau! Miau! Miau!": function(message){
			
			n("Miau.");
			n("Miau!");

			Show("nicky","dinner_nicky_outrage");
			n("MIAU!");

			Show("mom","mom_stand");

			m("Nick, o que você está fazendo?...");

			Show("clock","clock_ticking");
			PlaySound("clock","dinner_ticking",{loop:-1});
			Show("nicky","dinner_nicky_sit");

			n("MiAAAAU... Oi mãe! Não tinha te visto.");

			Waiting_End();
		}
	});

}

function Waiting_End(){
	Start_Dinner_2();
}