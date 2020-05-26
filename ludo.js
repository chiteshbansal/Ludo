var dice = document.getElementById('roll');
dice.addEventListener('click',rollthedice);

var tokenpos = document.querySelectorAll('div[id*="item"]');

var rolling;
var  dicerolltimes = 0;
var turn  = 'A';
var freetokenA=0;
var freetokenB  = 0 ;
var currentturn = 'A';
var dicenumber;

var tokenApos  = new Array(2);
var tokenBpos = new Array(2);

var freetoken1pos ;
var freetoken2pos;
var playerAbox;
var playerBbox;

var screenA = document.getElementById('screenA');
var screenB = document.getElementById('screenB');


function checkoverlap(player,token)
{
	if(player=='B')
	{
		for(let i = 0; i<2;i++)
		{
			if(tokenBpos[token]==tokenApos[i])
				return i;
		}
	}else if (player=='A')
	{
		for(let i = 0 ;i < 2 ;i++)
		{
			if(tokenApos[token]==tokenBpos[i])
				return i;
		}
	}

	return -1;
}
function move2B(){
	// when we are having two takens of same player on a single block 

	var curr_text = document.getElementById('item'+tokenBpos[1]).innerText;
	document.getElementById('item'+tokenBpos[1]).innerText=curr_text.replace('2B','');
	

	tokenBpos[1]=tokenBpos[1]-dicenumber;

	// when the token passses the position of token A (main position) 
	 if(tokenBpos[1]<=0)
		tokenBpos[1]+=32;

	let overlaptoken = checkoverlap('B',1);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1)
	{
		freetokenA--;
		let overlaptext = document.getElementById('item'+tokenApos[overlaptoken]).innerText;
		document.getElementById('item'+tokenApos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'A','');

		// Updating the tokens in the Locker
		if(document.getElementById('screenA').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenA').innerText=(overlaptoken+1)+'A';
		else 
			document.getElementById('screenA').innerText+=(overlaptoken+1)+'A';
		tokenApos[overlaptoken]=undefined;
	}

	document.getElementById('item'+tokenBpos[1]).innerText+= ' 2B';
	freetoken2pos.removeEventListener('click',move2B);

	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1B);
	dice.addEventListener('click',rollthedice);
	
}
function move1B(){
	var curr_text = document.getElementById('item'+tokenBpos[0]).innerText;
	document.getElementById('item'+tokenBpos[0]).innerText=curr_text.replace('1B','');

	tokenBpos[0]=tokenBpos[0]-dicenumber;

	
	if(tokenBpos[0]<=0)// as we have only 32 boxes 
		tokenBpos[0]+=32;

	let overlaptoken = checkoverlap('B',0);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1)
	{
		freetokenA--;
		let overlaptext = document.getElementById('item'+tokenApos[overlaptoken]).innerText;
		document.getElementById('item'+tokenApos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'A','');
		if(document.getElementById('screenA').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenA').innerText=(overlaptoken+1)+'A';
		else 
			document.getElementById('screenA').innerText+=(overlaptoken+1)+'A';
		tokenApos[overlaptoken]=undefined;
	}

	document.getElementById('item'+tokenBpos[0]).innerText+= ' 1B';

	if(freetoken2pos!=undefined)
		freetoken2pos.removeEventListener('click',move2B);

	if(playerBbox!=undefined)
		playerBbox.removeEventListener('click',newtokenB);

	freetoken1pos.removeEventListener('click',move1B);
	dice.addEventListener('click',rollthedice);
}


function move1A(){
	var curr_text = document.getElementById('item'+tokenApos[0]).innerText;
	document.getElementById('item'+tokenApos[0]).innerText=curr_text.replace('1A','');

	//when the token of pass the last box ;
	if(tokenApos[0]+dicenumber>32)
		tokenApos[0]=(tokenApos[0]+dicenumber)%32;
	else 
		tokenApos[0]+=dicenumber;

	let overlaptoken = checkoverlap('A',0);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1)
	{
		freetokenB--;
		let overlaptext = document.getElementById('item'+tokenBpos[overlaptoken]).innerText;
		document.getElementById('item'+tokenBpos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'B','');

		if(document.getElementById('screenB').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenB').innerText=(overlaptoken+1)+'B';
		else 
			document.getElementById('screenB').innerText+=(overlaptoken+1)+'B';
		tokenBpos[overlaptoken]=undefined;
	}
	
	document.getElementById('item'+tokenApos[0]).innerText+= ' 1A';


	if(freetoken2pos!=undefined)
		freetoken2pos.removeEventListener('click',move2A);

	if(playerAbox!=undefined)
		playerAbox.removeEventListener('click',newtokenA);

	freetoken1pos.removeEventListener('click',move1A);
	dice.addEventListener('click',rollthedice);
}


function sametokenoverlap(tokenpos,curr_player,curr_token)
{
	if(tokenpos[0]==tokenpos[1])
	{
		document.getElementById('item')
	}
}
function move2A(){
	var curr_text = document.getElementById('item'+tokenApos[1]).innerText;
	document.getElementById('item'+tokenApos[1]).innerText=curr_text.replace('2A','');

	// when tokens of A pass the last box 
	if(tokenApos[1]+dicenumber>32)
		tokenApos[1]=(tokenApos[1]+dicenumber)%32;
	else 
		tokenApos[1]+=dicenumber;

	let overlaptoken = checkoverlap('A',1);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1)
	{
		freetokenB--;
		let overlaptext = document.getElementById('item'+tokenBpos[overlaptoken]).innerText;
		document.getElementById('item'+tokenBpos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'B','');

		if(document.getElementById('screenB').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenB').innerText=(overlaptoken+1)+'B';
		else 
			document.getElementById('screenB').innerText+=(overlaptoken+1)+'B';
		tokenBpos[overlaptoken]=undefined;
	}

	document.getElementById('item'+tokenApos[1]).innerText+= ' 2A';

	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1A);
	console.log('move2a');
	freetoken2pos.removeEventListener('click',move2A);
	dice.addEventListener('click',rollthedice);

}

function newtokenB(){

	var newtokentobeopened;
	if(tokenBpos[0]==undefined)
		newtokentobeopened=0;
	else
		newtokentobeopened=1;

	var alreadyopenedtoken = newtokentobeopened==1?0:1;

	if(tokenBpos[alreadyopenedtoken]==17)
	{
		document.getElementById('item'+tokenBpos[alreadyopenedtoken]).innerText= '1B,2B';
		freetokenB++;
		screenB.innerText='HOORAY!!<br> All tokens Free';
		tokenBpos[newtokentobeopened]=17;
	}else {

		document.getElementById('item17').innerText= (newtokentobeopened+1)+'B';
		freetokenB++;
		screenB.innerText='HOORAY!!<br> All tokens Free';
		tokenBpos[newtokentobeopened]=17;
	}
	// make function to remove event if any of the fucntion gets executed

	playerBbox.removeEventListener('click',newtokenB);
	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1B);
	else
		freetoken2pos.removeEventListener('click',move2B);
	dice.addEventListener('click',rollthedice);

}

function newtokenA(){

	var newtokentobeopened;
	if(tokenApos[0]==undefined)
		newtokentobeopened=0;
	else
		newtokentobeopened=1;

	var alreadyopenedtoken = newtokentobeopened==1?0:1;
	if(tokenApos[alreadyopenedtoken]==1)
	{
		document.getElementById('item'+tokenApos[alreadyopenedtoken]).innerText= '1A,2A';
		freetokenA++;
		screenA.innerText='HOORAY!! All tokens Free';
		tokenApos[newtokentobeopened]=1;
	}else {

		document.getElementById('item1').innerText= (newtokentobeopened+1)+'A';
		freetokenA++;
		screenA.innerText='HOORAY!! All tokens Free';
		tokenApos[newtokentobeopened]=1;
	}

	playerAbox.removeEventListener('click',newtokenA);
	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1A);
	else
		freetoken2pos.removeEventListener('click',move2A);
	dice.addEventListener('click',rollthedice);

}


function Movethetocken()
{
	if(currentturn=='A')
	{
		if(freetokenA==0)
		{
			if(dicenumber==6)
			{
				document.getElementById('item1').innerText=++freetokenA +'A';
				tokenApos[0] = 1;
				screenA.innerText='2A';
				dice.addEventListener('click',rollthedice);
			}
			else {
				currentturn='B';
				// if none of the condition is satified 
				// that is no token is open and cann't be opened in the current turn 
				// we need to allow the dice to be rolled 
				dice.addEventListener('click',rollthedice);
				return;
			}
		}else 
		{
			if(freetokenA==2)
			{
				 freetoken1pos = document.getElementById('item'+tokenApos[0]);
				freetoken2pos = document.getElementById('item'+tokenApos[1]);

				freetoken1pos.addEventListener('click',move1A);
				if(tokenApos[0]!=tokenApos[1])
					freetoken2pos.addEventListener('click',move2A);

				if(dicenumber!=6)
				{
					currentturn='B';
				}

			}else if (freetokenA==1 && dicenumber==6)
			{
				playerAbox = document.getElementById('playerA');
				playerAbox.addEventListener('click',newtokenA);
				// if the player click on the already open one ;
				if(tokenApos[0]!=undefined)
				{freetoken1pos = document.getElementById('item'+tokenApos[0]);
								freetoken1pos.addEventListener('click',move1A);}
				else
				{
					freetoken2pos=document.getElementById('item'+tokenApos[1]);
					freetoken2pos.addEventListener('click',move2A);
				}

			}else {
				if(tokenApos[0]!=undefined)
				{freetoken1pos = document.getElementById('item'+tokenApos[0]);
						freetoken1pos.addEventListener('click',move1A);
				}else{
					freetoken2pos = document.getElementById('item'+tokenApos[1]);
					freetoken2pos.addEventListener('click',move2A);
				}

				if(dicenumber!=6)
				{
					currentturn='B';
				}
			}
		}
	}else if(currentturn=='B')
	{
		if(freetokenB==0)
		{
			if(dicenumber==6)
			{
				document.getElementById('item17').innerText=++freetokenB+'B';
				tokenBpos[0]=17;
				screenB.innerText= '2B';
				 dice.addEventListener('click',rollthedice);
			}
			else {
				currentturn='A';
				dice.addEventListener('click',rollthedice);
				return;
			}
		}else {
			if(freetokenB==2)
			{
				freetoken1pos = document.getElementById('item'+tokenBpos[0]);
				freetoken2pos = document.getElementById('item'+tokenBpos[1]);

				freetoken1pos.addEventListener('click',move1B);
				// if both the tokens are at same step 
				// then we allow movement of only one of them 
				if(tokenBpos[0]!=tokenBpos[1])
					freetoken2pos.addEventListener('click',move2B);
					
				if(dicenumber!=6)
				{
					currentturn='A';
				}

			}else if (freetokenB==1 && dicenumber==6)
			{
				playerBbox = document.getElementById('playerB');
				playerBbox.addEventListener('click',newtokenB);

				if(tokenBpos[0]!=undefined)
				{freetoken1pos = document.getElementById('item'+tokenBpos[0]);
								freetoken1pos.addEventListener('click',move1B);}
				else
				{
					freetoken2pos=document.getElementById('item'+tokenBpos[1]);
					freetoken2pos.addEventListener('click',move2B);
				}


				
			}else {
				if(tokenBpos[0]!=undefined)
				{freetoken1pos = document.getElementById('item'+tokenBpos[0]);
						freetoken1pos.addEventListener('click',move1B);
				}else{
					freetoken2pos = document.getElementById('item'+tokenBpos[1]);
					freetoken2pos.addEventListener('click',move2B);
				}

				if(dicenumber!=6)
				{
					currentturn='A';
				}
			}
		}
	}
		
	
}

function dicerolling()
{
	dice.removeEventListener('click',rollthedice);
	
	if(dicerolltimes==50)
	{
		clearInterval(rolling);
		
		// Move the tocken after the dice is rolled 
		Movethetocken();
		dicerolltimes = 0;
		return;		
	}else{

	dicenumber = Math.floor((Math.random())*6+1);
	console.log(dicenumber);
	var diceonboard = document.getElementById('dice');
	diceonboard.innerText = dicenumber;
	dicerolltimes++;
	}
}


function rollthedice(){
	document.getElementById('currentturn').innerText=currentturn;
	rolling = setInterval(dicerolling,50);
	
}
