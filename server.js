let currentMode = '';
let score = 0;
let bestScore = 0;
let currentWordIndex = 0;

const words = [
    { en: 'epic', bg: 'епопея' },
    { en: 'lyric', bg: 'лирика' },
    { en: 'elegy', bg: 'елегия' },
    { en: 'narrative', bg: 'разказ' },
    { en: 'non-narrative', bg: 'неразказ' },
    { en: 'deed', bg: 'акт, дело' },
    { en: 'melancholy', bg: 'меланхолия' },
    { en: 'grief', bg: 'мъка, тъга' },
    { en: 'noble', bg: 'благороден' },
    { en: 'hierarchical', bg: 'йерархичен' },
    { en: 'splendour', bg: 'разкош' },
    { en: 'combat', bg: 'бия се; битка' },
    { en: 'mortally', bg: 'смъртно' },
    { en: 'wounded', bg: 'ранен' },
    { en: 'funeral rite', bg: '(погребален) обред' },
    { en: 'to emerge', bg: 'появявам се' },
    { en: 'embodiment', bg: 'въплъщение' },
    { en: 'monstrous', bg: 'чудовищен' },
    { en: 'greedily', bg: 'алчно' },
    { en: 'to devour', bg: 'поглъщам' },
    { en: 'lair', bg: 'бърлога' },
    { en: 'wail', bg: 'вой, плач' },
    { en: 'havoc', bg: 'хаос' },
    { en: 'unsteady', bg: 'нестабилен' },
    { en: 'raid', bg: 'нападение, нахлуване; нападам' },
    { en: 'talon', bg: 'нокът (на хищник)' },
    { en: 'claw', bg: 'нокът (най-често на птица)' },
    { en: 'to quail', bg: 'треперя' },
    { en: 'to recoil', bg: 'отдръпвам се' },
    { en: 'to lament', bg: 'оплаквам' },
    { en: 'to re-evoke', bg: 'предизвиквам наново' },
    { en: 'extraterrestrial', bg: 'извънземен' },
    { en: 'to unleash', bg: 'отприщвам' }
];
console.log(currentWordIndex);
function startGame(mode) {
    currentMode = mode;
    currentWordIndex = 0;
    score = 0;
    document.body.innerHTML = `
        <h1>Ниво ${score + 1}</h1>
        <p class = pres>Преведи думата: <strong>${getCurrentWord()}</strong></p>
        <input type="text" id="userInput" placeholder="Въведи превода">
        <button onclick="checkAnswer()">Провери</button>
        <p>Текущ резултат: <span id="score">${score}</span></p>
        <button onclick="goBack()">Назад</button>
    `;
}

function getCurrentWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    return currentMode === 'enToBg' ? words[currentWordIndex].en : words[currentWordIndex].bg;
}

function checkAnswer() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    const correctAnswer = currentMode === 'enToBg' ? words[currentWordIndex].bg : words[currentWordIndex].en;

    if (userInput === correctAnswer) {
        score++;
        currentWordIndex++;
        
        if (currentWordIndex < words.length) {
            document.body.innerHTML = `
                <h1>Ниво ${score + 1}</h1>
                <p>Преведи думата: <strong>${getCurrentWord()}</strong></p>
                <input type="text" id="userInput" placeholder="Въведи превода">
                <button onclick="checkAnswer()">Провери</button>
                <p>Текущ резултат: <span id="score">${score}</span></p>
                <button onclick="goBack()">Назад</button>
            `;
        } else {
            bestScore = Math.max(score, bestScore);
            document.body.innerHTML = `
                <h1>Поздравления! Завърши играта!</h1>
                <p>Текущ резултат: ${score}</p>
                <p>Най-добър резултат: ${bestScore}</p>
                <button onclick="startGame('${currentMode}')">Играй пак</button>
                <button onclick="goBack()">Назад</button>
            `;
        }
    } else {
        document.body.innerHTML = `
            <h1>Грешен отговор! Опитай пак от начало.</h1>
            <p>Текущ резултат: ${score}</p>
            <button onclick="startGame('${currentMode}')">Започни отново</button>
            <button onclick="goBack()">Назад</button>
        `;
    }
}

function goBack() {
    location.reload();
}
