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

var rollingdice = document.getElementsByClassName('rollingdice')[0];

var safeboxes = [1,32,18,17];// safe boxes array 


// since the staring point and ending point for the B token is not consective 
// we need some helper to know whether tokens are about to reach end point 
var helper1B = false;
var helper2B = false; 


function checkoverlap(player,token)
{
	let pos ;
	let count =0;
	if(player=='B')
	{
		for(let i = 0; i<2;i++)
		{
			if(tokenBpos[token]==tokenApos[i])
			{
				pos = i;
				count++;
			}
		}
	}else if (player=='A')
	{
		for(let i = 0 ;i < 2 ;i++)
		{
			if(tokenApos[token]==tokenBpos[i])
			{
				pos=i;
				count++;
			}
		}
	}

	if(count==1)
		return pos;
	else
		return -1;
}

// to avoid cutting at the safe zones 
// chech if the opponents token overlapping at safezones or not 
function safezones(player,overlaptoken)
{
	if(player=='A')
	{
		for(let i of safeboxes)
		{
			if(tokenApos[overlaptoken]==i)
				return false
		}

	}else {

		for(let i of safeboxes)
		{
			if(tokenBpos[overlaptoken]==i)
				return false;
		}
	}

	return true;
}

// checking if any of the player has win or not 
function win(player,array,endpoint)
{
	let count =0;
	for(let i of array)
	{
		if(i == endpoint)
			count++;

	}
	if(count==array.length)
		return true;
	else
		return false;
}

function gameover(player)
{
	let width = 0 ;
	document.getElementsByClassName('game')[0].style.display='block';
	let interval = setInterval(function(){
		width++;
		document.getElementsByClassName('game')[0].style.width=width+'%';

		if(width==100)
			clearInterval(interval);
	},10);
	let newnode = document.createElement('p');
	let text = document.createTextNode('Player ' + player + " Wins the Game!!");
	newnode.appendChild(text);
	var playbtn = document.getElementById('play_again_btn');
	document.getElementsByClassName('game')[0].insertBefore(newnode,playbtn); 

}
function move2B(){
	// when we are having two takens of same player on a single block 

	var curr_text = document.getElementById('item'+tokenBpos[1]).innerText;
	document.getElementById('item'+tokenBpos[1]).innerText=curr_text.replace('2B','');
	

	tokenBpos[1]=tokenBpos[1]-dicenumber;

	// when the token passses the position of token A (main position) 
	 if(tokenBpos[1]<=0)
		{
			tokenBpos[1]+=32;
			helper2B = true; // token has crossed the staring point of opponent
		}

	let overlaptoken = checkoverlap('B',1);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1 && safezones('A',overlaptoken))
	{
		freetokenA--;
		let overlaptext = document.getElementById('item'+tokenApos[overlaptoken]).innerText;
		document.getElementById('item'+tokenApos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'A','');

		// Updating the tokens in the Locker
		if(document.getElementById('screenA').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenA').innerText=(overlaptoken+1)+'A';
		else 
			document.getElementById('screenA').innerText+=','+(overlaptoken+1)+'A';
		tokenApos[overlaptoken]=undefined;
		currentturn = 'B';
	}

	document.getElementById('item'+tokenBpos[1]).innerText+= ' 2B';
	freetoken2pos.removeEventListener('click',move2B);

	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1B);
	dice.addEventListener('click',rollthedice);

	// checking if both the tokens have reached the end 
	// checking only when one of the token has reached to end 
	// rather than checking after every move 
	if(tokenBpos[1]==18 && win('B',tokenBpos,18))
	{
		gameover('B');
	}
	
}
function move1B(){
	var curr_text = document.getElementById('item'+tokenBpos[0]).innerText;
	document.getElementById('item'+tokenBpos[0]).innerText=curr_text.replace('1B','');

	tokenBpos[0]=tokenBpos[0]-dicenumber;

	
	if(tokenBpos[0]<=0)// as we have only 32 boxes 
	{
		tokenBpos[0]+=32;
		helper1B = true;
	}

	let overlaptoken = checkoverlap('B',0);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1&& safezones('A',overlaptoken))
	{
		freetokenA--;
		let overlaptext = document.getElementById('item'+tokenApos[overlaptoken]).innerText;
		document.getElementById('item'+tokenApos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'A','');
		if(document.getElementById('screenA').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenA').innerText=(overlaptoken+1)+'A';
		else 
			document.getElementById('screenA').innerText+=','+(overlaptoken+1)+'A';
		tokenApos[overlaptoken]=undefined;
		currentturn = 'B'; // as the player who cut the opponent token gets the extra roll
	}

	document.getElementById('item'+tokenBpos[0]).innerText+= ' 1B';

	if(freetoken2pos!=undefined)
		freetoken2pos.removeEventListener('click',move2B);

	if(playerBbox!=undefined)
		playerBbox.removeEventListener('click',newtokenB);

	freetoken1pos.removeEventListener('click',move1B);
	dice.addEventListener('click',rollthedice);

	if(tokenBpos[0]==18 && win('B',tokenBpos,18))
	{
		gameover('B');
	}
}


function move1A(){
	var curr_text = document.getElementById('item'+tokenApos[0]).innerText;
	document.getElementById('item'+tokenApos[0]).innerText=curr_text.replace('1A','');

	//when the token of pass the last box ;
		tokenApos[0]+=dicenumber;
	

	let overlaptoken = checkoverlap('A',0);// checking if token is overlapping with the 
	// token of opposite player

	if(overlaptoken!=-1&& safezones('B',overlaptoken))
	{
		freetokenB--;
		let overlaptext = document.getElementById('item'+tokenBpos[overlaptoken]).innerText;
		document.getElementById('item'+tokenBpos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'B','');

		// token got cut by opponenet then we need to make again helpers false
		if(overlaptoken==0)
			helper1B=false;
		else 
			helper2B=false;
		if(document.getElementById('screenB').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenB').innerText=(overlaptoken+1)+'B';
		else 
			document.getElementById('screenB').innerText+=','+(overlaptoken+1)+'B';
		tokenBpos[overlaptoken]=undefined;
		currentturn = 'A';
	}
	
	document.getElementById('item'+tokenApos[0]).innerText+= ' 1A';


	if(freetoken2pos!=undefined)
		freetoken2pos.removeEventListener('click',move2A);

	if(playerAbox!=undefined)
		playerAbox.removeEventListener('click',newtokenA);

	freetoken1pos.removeEventListener('click',move1A);
	dice.addEventListener('click',rollthedice);

	if(tokenApos[0]==32 && win('A',tokenApos,32))
	{
		gameover('A');
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

	if(overlaptoken!=-1&& safezones('B',overlaptoken))
	{
		freetokenB--;
		let overlaptext = document.getElementById('item'+tokenBpos[overlaptoken]).innerText;
		document.getElementById('item'+tokenBpos[overlaptoken]).innerText=overlaptext.replace((overlaptoken+1) + 'B','');

		// token got cut by opponenet then we need to make again helpers false
		if(overlaptoken==0)
			helper1B=false;
		else 
			helper2B=false;

		if(document.getElementById('screenB').innerText=='HOORAY!! All tokens Free')
			document.getElementById('screenB').innerText=(overlaptoken+1)+'B';
		else 
			document.getElementById('screenB').innerText+=','+(overlaptoken+1)+'B';
		tokenBpos[overlaptoken]=undefined;
		currentturn = 'A';
	}

	document.getElementById('item'+tokenApos[1]).innerText+= ' 2A';

	if(freetoken1pos!=undefined)
		freetoken1pos.removeEventListener('click',move1A);
	console.log('move2a');
	freetoken2pos.removeEventListener('click',move2A);
	dice.addEventListener('click',rollthedice);

	if(tokenApos[1]==32 && win('A',tokenApos,32))
	{
		gameover('A');
	}

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
		screenB.innerText='HOORAY!! All tokens Free';
		tokenBpos[newtokentobeopened]=17;
	}else {

		document.getElementById('item17').innerText+= (newtokentobeopened+1)+'B';
		freetokenB++;
		screenB.innerText='HOORAY!! All tokens Free';
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

		document.getElementById('item1').innerText+= (newtokentobeopened+1)+'A';
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
				
			}
		}else 
		{
			if(freetokenA==2)
			{
				 freetoken1pos = document.getElementById('item'+tokenApos[0]);
				freetoken2pos = document.getElementById('item'+tokenApos[1]);
				if(tokenApos[0]+dicenumber<=32)// token should not past the end point
					freetoken1pos.addEventListener('click',move1A);
				if(tokenApos[0]!=tokenApos[1] && tokenApos[1]+dicenumber<=32)//the token should not past the end point
					freetoken2pos.addEventListener('click',move2A);
				else if(tokenApos[0]+dicenumber>32 && tokenApos[2]+dicenumber>32)
				{
					currentturn='B';
					dice.addEventListener('click',rollthedice)
				}

				if(dicenumber!=6)
				{
					currentturn='B';
				}

			}else if (freetokenA==1 && dicenumber==6)
			{
				playerAbox = document.getElementById('playerA');
				playerAbox.addEventListener('click',newtokenA);
				// if the player click on the already open one ;
				if(tokenApos[0]!=undefined && tokenApos[0]+dicenumber<=32)
				{freetoken1pos = document.getElementById('item'+tokenApos[0]);
						freetoken1pos.addEventListener('click',move1A);}
				else if(tokenApos[1]!=undefined && tokenApos[1]+dicenumber<=32)// token should be open and should not past the end point
				{
					freetoken2pos=document.getElementById('item'+tokenApos[1]);
					freetoken2pos.addEventListener('click',move2A);
				}

			}else {
				if(tokenApos[0]!=undefined && tokenApos[0]+dicenumber<=32)
				{freetoken1pos = document.getElementById('item'+tokenApos[0]);
						// freetoken1pos.addEventListener('click',move1A);
						move1A();
				}else if(tokenApos[1]!=undefined && tokenApos[1]+dicenumber<=32){
					freetoken2pos = document.getElementById('item'+tokenApos[1]);
					// freetoken2pos.addEventListener('click',move2A);
					move2A();	
				}else{
					currentturn = 'B';
					dice.addEventListener('click',rollthedice)
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

			}
		}else {
			if(freetokenB==2)
			{
				freetoken1pos = document.getElementById('item'+tokenBpos[0]);
				freetoken2pos = document.getElementById('item'+tokenBpos[1]);
				if(!(tokenBpos[0]-dicenumber<18 && helper1B==true))
					freetoken1pos.addEventListener('click',move1B);
				// if both the tokens are at same step 
				// then we allow movement of only one of them 
				if(tokenBpos[0]!=tokenBpos[1] && !(tokenBpos[1]-dicenumber<18 && helper2B==true))
					freetoken2pos.addEventListener('click',move2B);
				else if((tokenBpos[0]-dicenumber<18 && helper1B==true) && (tokenBpos[1]-dicenumber<18 && helper2B==true))
				{
					currentturn='A';
					dice.addEventListener('click',rollthedice);
				}
					
				if(dicenumber!=6)
				{
					currentturn='A';
				}

			}else if (freetokenB==1 && dicenumber==6)
			{
				playerBbox = document.getElementById('playerB');
				playerBbox.addEventListener('click',newtokenB);

				if(tokenBpos[0]!=undefined && !(tokenBpos[0]-dicenumber<18 && helper1B==true))
				{freetoken1pos = document.getElementById('item'+tokenBpos[0]);
								freetoken1pos.addEventListener('click',move1B);}
				else if(tokenBpos[1]!=undefined && !(tokenBpos[1]-dicenumber<18 && helper2B==true))
				{
					freetoken2pos=document.getElementById('item'+tokenBpos[1]);
					freetoken2pos.addEventListener('click',move2B);
				}else{
					currentturn = 'A';
					dice.addEventListener('click',rollthedice);
				}


				
			}else {
				if(tokenBpos[0]!=undefined &&!(tokenBpos[0]-dicenumber<18 && helper1B==true) )
				{freetoken1pos = document.getElementById('item'+tokenBpos[0]);
						// freetoken1pos.addEventListener('click',move1B);
						move1B();
				}else if(tokenBpos[1]!=undefined && !(tokenBpos[1]-dicenumber<18 && helper2B==true))
				{
					freetoken2pos = document.getElementById('item'+tokenBpos[1]);
					// freetoken2pos.addEventListener('click',move2B);
					move2B();
				}else{
					currentturn= 'A';
					dice.addEventListener('click',rollthedice);
				}

				if(dicenumber!=6)
				{
					currentturn='A';
				}
			}
		}
	}
	document.getElementById('currentturn').innerText=currentturn;	
	
}

function dicerolling()
{
	dice.removeEventListener('click',rollthedice);
	
	if(dicerolltimes==60)
	{
		clearInterval(rolling);
		
		// Move the tocken after the dice is rolled 
		var diceonboard = document.getElementById('dice');
		console.log('dicenumber is ' ,dicenumber);
		rollingdice.style.animation='';
		rollingdice.style.display='none';
		diceonboard.childNodes[0].src='number'+dicenumber+'.png';
		Movethetocken();
		dicerolltimes = 0;
		return;		
	}else{

	dicenumber = Math.floor((Math.random())*6+1);
	console.log(dicenumber);
	// var diceonboard = document.getElementById('dice');
	// diceonboard.childNodes[0].src='number'+dicenumber+'.png';
	// diceonboard.childNodes[0].alt=dicenumber;
	dicerolltimes++;
	}
}


function rollthedice(){
	var diceonboard = document.getElementById('dice');
	diceonboard.childNodes[0].src='';
	rollingdice.style.display='inline-block';
	rollingdice.style.animation="Rotate 4s ease-in-out infinite alternate"
	rolling = setInterval(dicerolling,70);
	
}

function Manualdice()
{
	let dicevalue= document.getElementById('manualinput').value;
	dicenumber=Number(dicevalue);
	dicerolltimes=60;
	dicerolling();
}

var currentbox=1;
function discoeffect()
{
	
	
	if(currentbox!=1)
		document.getElementById('item'+Number(currentbox-1)).style.boxShadow='';
	else 
		document.getElementById('item32').style.boxShadow='';
	var box = document.getElementById('item'+ currentbox);
	box.style.boxShadow="0px 0px 5px 5px white";
	if(currentbox==32)
		currentbox=0;
	currentbox++;
	

}


setInterval(discoeffect,100);