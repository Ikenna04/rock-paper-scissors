const imgPlate = document.querySelectorAll('.img-plate '),
	ruleToggle = document.querySelectorAll('.rule'),
	mainAreas = document.querySelectorAll('.main :is(.reset-area, .play-area)'),
	imgArea = document.querySelectorAll('.img-area'),
	resultDisplay = document.querySelector('.play-area h1'),
	score = document.querySelector('.score h1'),
	anchor = document.querySelector('a');

let array = ['rock', 'paper', 'scissors', 'lizard', 'spock'],
	playerChoice,
	computerChoice,
	computerChoiceIndex,
	result,
	playerScore,
	playScore;

const setScore = () => {
		let playScore = localStorage.getItem('Player Score');

		score.textContent = playScore;
	},
	storeResult = () => {
		localStorage.setItem('Player Score', playerScore);
	},
	addSpiral = () => {
		if (result === `You win`) {
			imgArea[0].parentElement.classList.add('won');
		} else if (result === `You lose`) {
			imgArea[1].parentElement.classList.add('won');
		}
	},
	showResult = () => {
		playerScore = Number(score.textContent);
		resultDisplay.parentElement.classList.add('show');
		resultDisplay.textContent = result;
		result == `You win`
			? playerScore++
			: result == `You lose`
			? playerScore--
			: '';

		score.textContent = playerScore;
		storeResult();
		addSpiral();
	},
	computeResult = () => {
		setTimeout(() => {
			result =
				playerChoice === computerChoice
					? 'Tie Game'
					: (playerChoice === 'rock' && computerChoice === 'scissors') ||
					  (playerChoice === 'rock' && computerChoice === 'lizard') ||
					  (playerChoice === 'paper' && computerChoice === 'rock') ||
					  (playerChoice === 'paper' && computerChoice === 'spock') ||
					  (playerChoice === 'scissors' && computerChoice === 'paper') ||
					  (playerChoice === 'scissors' && computerChoice === 'lizard') ||
					  (playerChoice === 'lizard' && computerChoice === 'spock') ||
					  (playerChoice === 'lizard' && computerChoice === 'paper') ||
					  (playerChoice === 'spock' && computerChoice === 'scissors') ||
					  (playerChoice === 'spock' && computerChoice === 'rock')
					? `You win`
					: `You lose`;
			showResult();
		}, 500);
	},
	computerChoose = () => {
		setTimeout(() => {
			imgPlate.length < 5
				? (computerChoiceIndex = Math.floor(Math.random() * 3))
				: (computerChoiceIndex = Math.floor(Math.random() * 5));

			computerChoice = array[computerChoiceIndex];
			imgArea[1].innerHTML = imgPlate[Number(computerChoiceIndex)].outerHTML;
		}, 100);
		computeResult();
	},
	preventDefaultFnx = () => {
		anchor.addEventListener('click', e => {
			mainAreas[1].classList.contains('show') ? e.preventDefault() : '';
		});
	},
	toggleMainArea = () => {
		mainAreas[0].classList.contains('show')
			? (mainAreas[1].classList.add('show'),
			  mainAreas[0].classList.remove('show'))
			: '';
		preventDefaultFnx();
	},
	playerChoose = () => {
		for (let i = 0; i < imgPlate.length; i++) {
			imgPlate[i].addEventListener('click', () => {
				playerChoice = array[i];
				toggleMainArea();
				imgArea[0].innerHTML = imgPlate[i].outerHTML;
				computerChoose();
			});
		}
	};

ruleToggle.forEach(e => {
	e.addEventListener('click', () => {
		document.querySelector('.rules').classList.toggle('show');
	});
});

document
	.querySelector('.play-area li:nth-child(2) p')
	.addEventListener('click', () => {
		location.reload();
	});

playerChoose();
setScore();
