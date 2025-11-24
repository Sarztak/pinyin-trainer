let deck = [...deckData];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(deck);


function convertPinyinToToneMarks(pinyin) {
    const toneMap = {
        'a': ['a', 'ā', 'á', 'ǎ', 'à'],
        'e': ['e', 'ē', 'é', 'ě', 'è'],
        'i': ['i', 'ī', 'í', 'ǐ', 'ì'],
        'o': ['o', 'ō', 'ó', 'ǒ', 'ò'],
        'u': ['u', 'ū', 'ú', 'ǔ', 'ù'],
        'ü': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
        'v': ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ']
    };

    return pinyin.split(' ').map(syllable => {
        // Extract tone number
        const match = syllable.match(/^([a-zü]+)([0-5])$/i);
        if (!match) return syllable;

        let [, letters, tone] = match;
        tone = parseInt(tone);
        
        // Neutral tone (5 or 0) - no mark needed
        if (tone === 5 || tone === 0) return letters;

        letters = letters.toLowerCase();

        // Priority: a/e > ou > others
        if (letters.includes('a')) {
            return letters.replace('a', toneMap['a'][tone]);
        } else if (letters.includes('e')) {
            return letters.replace('e', toneMap['e'][tone]);
        } else if (letters.includes('ou')) {
            return letters.replace('o', toneMap['o'][tone]);
        } else {
            // Apply to last vowel
            for (let i = letters.length - 1; i >= 0; i--) {
                const char = letters[i];
                if (toneMap[char]) {
                    return letters.substring(0, i) + toneMap[char][tone] + letters.substring(i + 1);
                }
            }
        }
        
        return syllable;
    }).join(' ');
}

let writers = [];
let currentIndex = 0;   // which character is animating
let currentLoopId = 0; // NEW: identifies which animation cycle is active

function showStrokeOrder(word) {
    // Cancel any previous animation loop
    currentLoopId++;
    const thisLoop = currentLoopId;

    const canvas = document.getElementById('characterCanvas');
    canvas.innerHTML = '';
    writers = [];
    currentIndex = 0;

    const chars = word.split('');
    const charWidth = Math.min(150, 300 / chars.length);

    // Canvas layout (horizontal, left-to-right)
    canvas.style.width = (charWidth * chars.length) + 'px';
    canvas.style.height = charWidth + 'px';

    canvas.style.display = 'flex';          // IMPORTANT
    canvas.style.flexDirection = 'row';     // FORCE HORIZONTAL
    canvas.style.alignItems = 'center';
    canvas.style.justifyContent = 'flex-start';
    canvas.style.gap = '10px';

    // Build writers for each character
    chars.forEach(char => {
        const div = document.createElement('div');
        div.style.width = charWidth + 'px';
        div.style.height = charWidth + 'px';
        canvas.appendChild(div);

        const writer = HanziWriter.create(div, char, {
            width: charWidth,
            height: charWidth,
            padding: 5,
            showOutline: true,
            showCharacter: true
        });

        writers.push(writer);
    });

    // Start animation loop for this word
    if (writers.length > 0) {
        animateAtIndex(0, thisLoop);
    }
}


function animateAtIndex(i, loopId) {
    if (loopId !== currentLoopId) return;  // kills inner loop if word changed

    const writer = writers[i];

    writer.animateCharacter({
        onComplete: () => {
            if (loopId !== currentLoopId) return;  // second safety check

            const nextIndex = (i + 1) % writers.length;
            animateAtIndex(nextIndex, loopId);      // ← inner loop continues
        }
    });
}


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
    const toneMarks = convertPinyinToToneMarks(card.pinyin);
    
    // Show tone marks for reading, tone numbers for typing reference
    pinyinPrompt.innerHTML = `${toneMarks} <span style="color: #888; font-size: 0.9em;">(${card.pinyin})</span>`;
    englishPrompt.textContent = card.english;
    hanziDisplay.textContent = card.hanzi;
    hanziDisplay.classList.remove("visible");
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    inputEl.value = "";
    inputEl.focus();

    // Show stroke order animation
    showStrokeOrder(card.hanzi);

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