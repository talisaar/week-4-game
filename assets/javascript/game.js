 $(document).ready(function(){

reset();

 function reset () {

$('#restart_button').css("display", "none");


var select_mychar = false; // lets us know whether my character has been selected
var select_defender = false; // lets us know wheter a defender has been selected
var char_array = [$('#char1'), $('#char2'), $('#char3'), $('#char4')]; // array of charts to chose my char and ebemies or defenders

 for (i=0; i<char_array.length; i++) {

					 	 

					 		var reset_element = char_array[i].detach();
					    	$('#your-char').append(reset_element);
					    	char_array[i].css("border-color", "green");
					    	char_array[i].css("display", "block");


					    								}



var $mychar; // sets my charater once chosen 
var $defender; // sets defender once chosen 
var $current_defender; // a flexible var that we append and prepend defenders to as they die
var experience = 8; // a variable that upgrades my character's attack power with each attack
var kills = 0; // counter of kills. Once reaches char_array.length-1 you win the game

console.log(char_array.length);
console.log(char_array.length-1);


var character1 = $('#char1');
var character2 = $('#char2');
var character3 = $('#char3');
var character4 = $('#char4');


character1.attr("healthpoints", 260);
character1.attr("attackpower", 30);
character1.attr("counterattackpower", 22);
character1.attr("isalive", 1);


character2.attr("healthpoints", 300);
character2.attr("attackpower", 15);
character2.attr("counterattackpower", 20);
character2.attr("isalive", 1);


character3.attr("healthpoints", 220);
character3.attr("attackpower", 25);
character3.attr("counterattackpower", 20);
character3.attr("isalive", 1);


character4.attr("healthpoints", 260);
character4.attr("attackpower", 26);
character4.attr("counterattackpower", 40);
character4.attr("isalive", 1);



$('#char1life')[0].innerText = (character1[0].attributes.healthpoints.nodeValue);
$('#char2life')[0].innerText = (character2[0].attributes.healthpoints.nodeValue);
$('#char3life')[0].innerText = (character3[0].attributes.healthpoints.nodeValue);
$('#char4life')[0].innerText = (character4[0].attributes.healthpoints.nodeValue);






$(".char").on('click', function() {   

// step 1: if haven't selected my charater yet, nor selected a defender, on click set mychar
// to my selection and move all others to possible available enemies



if (select_mychar === false && select_defender === false) {


					 	var mycharselection = this; 

					 	console.log(mycharselection.id);
					 	console.log(char_array[1][0].id);


					 		for (i=0; i<char_array.length; i++) {

					 	    if (char_array[i][0].id !== mycharselection.id) {

					 		var element = char_array[i].detach();
					    	$('#enemies-avail').append(element);
					    	char_array[i].css("border-color", "red");


					    								}

					    	else 
					    	mychar = char_array[i];

					 						}

					 		select_mychar = true;

					 	}



if (select_mychar === true && select_defender === false && this.id !== mychar[0].id) {

		var mydefenderselection = this;
		current_defender = $(this).detach();
    	$('#defender').append(current_defender);
    	select_defender = true;
    	defender = current_defender;
    	$('#report1')[0].innerText = "";
    	$(this).css("border-color", "blue");





}

				


// end of functions for selecting character and defender

 });


//Attack button functions


$("#attack_button").on('click', function() {


if (select_defender === true) {  //makes sure there's a defender in place




							// My character is mychar
							// defender is defender


							//OPTION 1: If both fighters are alive

							if (mychar[0].attributes.isalive.nodeValue === "1" && defender[0].attributes.isalive.nodeValue === "1") {


							// Set mychar healthpoints lower by defender counterattack power
							mychar[0].attributes.healthpoints.nodeValue = mychar[0].attributes.healthpoints.nodeValue - defender[0].attributes.counterattackpower.nodeValue;
							// Set defender healthpoints lower by my attack power
							defender[0].attributes.healthpoints.nodeValue = defender[0].attributes.healthpoints.nodeValue - mychar[0].attributes.attackpower.nodeValue;

							// for each character check if its alive and if so update the innertext to give the current health.
							//must first check if alive because when we remove a defender they are no longer defined which
							// makes the whole thing get stuck!

							if (character1[0].attributes.healthpoints.nodeValue > 0) {
	
							$('#char1life')[0].innerText = (character1[0].attributes.healthpoints.nodeValue);

					     	};

					     	if (character2[0].attributes.healthpoints.nodeValue > 0) {
	
							$('#char2life')[0].innerText = (character2[0].attributes.healthpoints.nodeValue);

					     	};

					     	if (character3[0].attributes.healthpoints.nodeValue > 0) {
	
							$('#char3life')[0].innerText = (character3[0].attributes.healthpoints.nodeValue);

					     	};

					     	if (character4[0].attributes.healthpoints.nodeValue > 0) {
	
							$('#char4life')[0].innerText = (character4[0].attributes.healthpoints.nodeValue);

					     	};

							//print report of who attacked who and for what damage

							$('#report1')[0].innerText = "You attacked " + defender[0].id + " for " + mychar[0].attributes.attackpower.nodeValue + " healthpoints.";
							$('#report2')[0].innerText = defender[0].id + " attacked you " + " for " + defender[0].attributes.attackpower.nodeValue + " healthpoints.";

							//upgrade my attak power by experince (variable defined early on)

							mychar[0].attributes.attackpower.nodeValue = parseInt(mychar[0].attributes.attackpower.nodeValue) + parseInt(experience);


							}

							// OPTION 2: DEFENDER HEALTHPOINT 0 OR LESS BUT MY CHAR POSITIVE

							if (mychar[0].attributes.healthpoints.nodeValue > 0 && defender[0].attributes.healthpoints.nodeValue <= 0) 

							{

								// report I killed defender

							$('#report1')[0].innerText = "You killed " + defender[0].id + ". You son of a gun you.";
							$('#report2')[0].innerText = "";
							kills++;
							console.log(kills);

								

							 //set defender's attribute "is alive" to 0 (i.e dead)

							 current_defender[0].attributes.isalive.nodeValue = 0;
							 console.log(current_defender);


							 //remove defender


							 current_defender.css("display", "none");


							 // set defender to not selected

							 select_defender = false;




							}


							//OPTION 3: MY CHAR IS 0 OR LESS AND DEFENDER IS POSITIVE

							if (mychar[0].attributes.healthpoints.nodeValue <= 0 && defender[0].attributes.healthpoints.nodeValue > 0) 
							 {

							 $('#report1')[0].innerText = "You died.... ";
							 $('#report2')[0].innerText = "";
							 $('#restart_button').css("display", "block");




							 }

							// OPTION 4: both are 0 or less

							if (mychar[0].attributes.healthpoints.nodeValue <= 0 && defender[0].attributes.healthpoints.nodeValue <= 0) 

							{

							 $('#report1')[0].innerText = "You're both dead.... ";
							 $('#report2')[0].innerText = "";
							 $('#restart_button').css("display", "block");



							}



							};

 if (select_defender === false) {

$('#report1')[0].innerText = "No defender selected, please choose one!";

 };


 if (kills >= char_array.length-1) {

$('#report1')[0].innerText = "You win!";
$('#restart_button').css("display", "block");

 };



});  

$('#restart_button').on('click', function() {

	reset();

});


};

});