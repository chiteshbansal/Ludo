var dice = document.getElementById('roll');
dice.addEventListener('click',rollthedice);
var rolling;
var  dicerolltimes = 0;
var turn  = 'A';
var freetokenA=0;
var freetokenB  = 0 ;
var currentturn = 'A';

function dicerolling()
{
	dice.removeEventListener('click',rollthedice);
	
	if(dicerolltimes==10)
	{
		clearInterval(rolling);
		dice.addEventListener('click',rollthedice);
		dicerolltimes = 0;
		return;		
	}else{

	var dicenumber = Math.floor((Math.random())*6+1);
	console.log(dicenumber);
	var diceonboard = document.getElementById('dice');
	diceonboard.innerText = dicenumber;
	dicerolltimes++;
	}
}


function rollthedice(){
	rolling = setInterval(dicerolling,100);
	
}