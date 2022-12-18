const randomizeBtn = document.getElementById("randomize");
const sortBtn = document.getElementById("sort");

const barsContainer = document.querySelector(".bars-container");

let minRange = 10;
let maxRange = 60;

let numOfBars = 40;

let sortClicked = false;

let unsortedArray = new Array(numOfBars);

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomArray() {
	for (let i = 0; i < numOfBars; i++) {
		unsortedArray[i] = randomNum(minRange, maxRange);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	createRandomArray();
	renderBars(unsortedArray);
});

function renderBars(unsortedArray) {
	for (let i = 0; i < unsortedArray.length; i++) {
		const bar = document.createElement("div");
		bar.classList.add("bar");
		bar.style.height = `${unsortedArray[i] * 10}px`;
		barsContainer.appendChild(bar);
	}
}

randomizeBtn.addEventListener("click", () => {
	createRandomArray();
	barsContainer.innerHTML = "";
	renderBars(unsortedArray);
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
	randomizeBtn.style.pointerEvents = "none";
	sortBtn.style.pointerEvents = "none";
	let bars = document.getElementsByClassName("bar");

	let len = array.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i - 1; j++) {
			for (let k = 0; k < bars.length; k++) {
				if (k != j && k != j + 1) {
					bars[k].style.backgroundColor = "red";
				}
			}

			if (array[j] > array[j + 1]) {
				let tmp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = tmp;

				bars[j].style.height = `${array[j] * 10}px`;
				bars[j].style.backgroundColor = "yellow";
				bars[j].innerText = array[j];

				bars[j + 1].style.height = `${array[j + 1] * 10}px`;
				bars[j + 1].style.backgroundColor = "yellow";
				bars[j + 1].innerText = array[j + 1];
				await sleep(60);
			}
		}
		await sleep(60);
	}

	randomizeBtn.style.pointerEvents = "auto";
	sortBtn.style.pointerEvents = "auto";
	return array;
}

sortBtn.addEventListener("click", async () => {
	let sortedArray = await bubbleSort(unsortedArray);
});
