const YELLOW = "yellow";
const VIOLET = "violet";
const NUMBER = "number";
const CLEAR_ = "clear";
const EQ_BTN = "equalsBtn"

const SYM_CLEAR_ALL = "C";
const SYM_CLEAR 	= "⌫";
const SYM_EQ	 	= "=";
const SYM_SQRT	 	= "√";
const SYM_MP	 	= "×";
const SYM_DIVIDE	= '÷';
const SYM_MINUS	 	= '−';
const SYM_PERCENT 	= "%";

const buttonsData = [
	{ class: CLEAR_, sym: SYM_CLEAR_ALL },{ class: YELLOW, sym: '(' },{ class: YELLOW, sym: ')' },{ class: VIOLET, sym: SYM_MP },
	{ class: YELLOW, sym: SYM_SQRT },{ class: YELLOW, sym: SYM_PERCENT },{ class: YELLOW, sym: '^' },{ class: VIOLET, sym: SYM_DIVIDE },
	{ class: NUMBER, sym: '7' },{ class: NUMBER, sym: '8' },{ class: NUMBER, sym: '9' },{ class: VIOLET, sym: SYM_MINUS },
	{ class: NUMBER, sym: '4' },{ class: NUMBER, sym: '5' },{ class: NUMBER, sym: '6' },{ class: VIOLET, sym: '+' },
	{ class: NUMBER, sym: '1' },{ class: NUMBER, sym: '2' },{ class: NUMBER, sym: '3' },{ class: EQ_BTN, sym: SYM_EQ },
	{ class: NUMBER, sym: '.' },{ class: NUMBER, sym: '0' },{ class: NUMBER, sym: SYM_CLEAR }
]



function parsePanel() {
	let container = document.getElementById('calcButtonsParent');

	var out = createTextField() + createAnswerField();

	buttonsData.forEach(it => {
		out += `<button class='calcBtn ${it.class}' onclick='addSymbol(this.innerText)'>` + it.sym + "</button>";
	});

	container.innerHTML = out;
}

function createTextField() {
	var regex = "[^*/"
	buttonsData.forEach(it => {
		regex += it.sym;
	});
	regex += "]+"
	regex = regex.replace(
		new RegExp(`[${SYM_CLEAR}${SYM_CLEAR_ALL}${SYM_EQ}]`, "g"), ""
	);

	return `<input autofocus type="text" id='calcInput' class='input'` +
	 `onkeypress="if(this.value.match(/${regex}/)) this.value=this.value.replace(/${regex}/g,'')"` +
	  `onkeyup="if(this.value.match(/${regex}/)) this.value=this.value.replace(/${regex}/g,'')">`;
}

function createAnswerField() {
	return `<p id='answerField'></p>`
}


function addSymbol(sym) {
	let input = document.getElementById("calcInput");
	let answerField = document.getElementById("answerField");

	answerField.innerText = "";

	switch (sym) {
		case SYM_CLEAR:
			input.value = input.value.slice(0, -1);
			break;
		case SYM_CLEAR_ALL:
			input.value = '';
			break;
		case SYM_EQ:
			if (input.value != undefined && input.value != '') {
				answerField.innerText = `${input.value} =`
				input.value = calculateAnswer(input.value);
			}
			break;
		default:
			input.value += sym;
			break;
	}

	input.focus();
}


function calculateAnswer(data) {
	data = data.replace(new RegExp(SYM_SQRT + "\\((.+)\\)", "g"), "sqrt($1)");
	data = data.replace(new RegExp(SYM_SQRT + "(\\d+)", "g"), "sqrt($1)");
	data = data.replace(new RegExp("(\\d+)" + SYM_PERCENT, "g"), "($1/100)");
	data = data.replace(new RegExp("\\((.+)\\)" + SYM_PERCENT, "g"), "(($1)/100)");

	data = data.replace(SYM_MP, "*");
	data = data.replace(SYM_DIVIDE, "/");
	data = data.replace(SYM_MINUS, "-");

	var out = "Error";

	try {
		out = math.evaluate(data);
	} catch(e) {
		console.log(e);
	}
	return out;
}

parsePanel();