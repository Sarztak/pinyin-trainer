const deck = [
    { hanzi: "我", pinyin: "wo3", english: "I; me" },
    { hanzi: "你", pinyin: "ni3", english: "you" },
    { hanzi: "好", pinyin: "hao3", english: "good" },
    { hanzi: "是", pinyin: "shi4", english: "to be" },
    { hanzi: "吗", pinyin: "ma5", english: "question particle" },
    { hanzi: "很", pinyin: "hen3", english: "very" },
    { hanzi: "谢谢", pinyin: "xie4 xie5", english: "thank you" },
    { hanzi: "中国", pinyin: "zhong1 guo2", english: "China" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(deck);

const pinyinPrompt = document.getElementById("pinyinPrompt");
const englishPrompt = document.getElementById("englishPrompt");
const hanziDisplay = document.getElementById("hanziDisplay");
const audioButton = document.getElementById("audioButton");
const inputEl = document.getElementById("input");
const feedbackEl = document.getElementById("feedback");
const formEl = document.getElementById("form");

let index = 0;

function normalize(str) {
    return str.trim().toLowerCase().replace(/\s+/g, " ");
}

function buildAudioURL(hanzi) {
    return `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(hanzi)}`;
}

function playAudio() {
    const hanzi = deck[index].hanzi;
    const audio = new Audio(buildAudioURL(hanzi));
    audio.play();
}

function showCard() {
    const card = deck[index];
    pinyinPrompt.textContent = card.pinyin;
    englishPrompt.textContent = card.english;
    hanziDisplay.textContent = card.hanzi;
    hanziDisplay.classList.remove("visible");
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    inputEl.value = "";
    inputEl.focus();
}

audioButton.addEventListener("click", () => {
    playAudio();
});

// Keyboard controls
document.addEventListener("keydown", function (e) {
    // ESC to play audio
    if (e.key === "Escape") {
        e.preventDefault();
        playAudio();
        inputEl.focus();
    }

    // ArrowRight to skip to next card
    if (e.key === "ArrowRight") {
        e.preventDefault();
        index = (index + 1) % deck.length;
        showCard();
    }
});

formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    const user = normalize(inputEl.value);
    const answer = normalize(deck[index].pinyin);

    if (!user) return;

    if (user === answer) {
    feedbackEl.textContent = "Correct.";
    feedbackEl.className = "feedback correct";
    } else {
    feedbackEl.textContent = `Incorrect. Correct: ${deck[index].pinyin}`;
    feedbackEl.className = "feedback incorrect";
    }

    hanziDisplay.classList.add("visible");

    setTimeout(() => {
    index = (index + 1) % deck.length;
    showCard();
    }, 900);
});

showCard();