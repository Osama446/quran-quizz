const field = document.getElementById("inpField");
const ansBtn = document.getElementById("answer-btn");
const overlay = document.getElementById("overlay");
const img = document.getElementById("img");
const resp = document.getElementById("resp");
const respText = document.getElementById("respText");
const ansBox = document.getElementById("ans-box");
const verseBox = document.getElementById("verse");
const heart = document.getElementById("hearts");
const check = document.getElementById("correctAnsCount");
const fire = document.getElementById("fire");
const multipleChoice = document.getElementById("choiceBoxes");
const overlayDiv = document.getElementById("overlayDiv");

let hearts = 3;
let rightAnsCount = 0;
let consequtiveCount = 0;
let gameActive = true;

let correctAns = randomInteger(1, 76);

function next(surahNumber) {
  console.log(surahNumber);
  let verse = "";
  let randAya = randomInteger(2, 9);
  let response = fetch(
    `https://api.quran.com/api/v4/verses/by_key/${surahNumber}:${randAya}?language=en&words=true`
  )
    .then((result) => result.json())
    .then((output) => {
      for (let i = 0; i < output.verse.words.length - 1; i++) {
        verse += output.verse.words[i].translation.text + " ";
      }
      //console.log(output.verse)

      verseBox.innerText = verse;
    })
    .catch((err) => console.error(err));
}

next(correctAns);

function refresh() {
  location.reload();
}

function on() {
  overlay.style.display = "block";
}

function off() {
  overlay.style.display = "none";
}

function reset() {
  field.value = "";
  multipleChoice.innerHTML = "";
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function callNext() {
  correctAns = randomInteger(1, 76);
  next(correctAns);
}

function responseHandler(choiceTexts) {
  if (choiceTexts.textContent == surahList[correctAns] && gameActive) {
    img.src = "images/check.png";
    resp.textContent = "Correct Answer";

    callNext();
    rightAnsCount++;
    consequtiveCount++;
    check.innerText = rightAnsCount;
    fire.innerText = consequtiveCount;
  } else {
    img.src = "images/bheart.png";
    resp.textContent = "Wrong Answer";

    callNext();
    if (hearts == 1 && gameActive) {
      rightAnsCount = 0;
      hearts = 1;
      consequtiveCount = 0;
      respText.innerText = `Game Over!
          This is Surato ${surahList[correctAns]} which is listed as number ${correctAns} in the holy Quran`;
      ansBtn.textContent = "Restart";
      let contBtn = document.createElement('Button');
      contBtn.id = "answer-btn";
      contBtn.textContent = "Continue";
      contBtn.addEventListener('click', off);
      overlayDiv.appendChild(contBtn)
      gameActive = false;
      ansBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        refresh();
      });
      // fire.innerText = consequtiveCount;
      heart.innerHTML = 0;
      // check.innerHTML = rightAnsCount;
    } else if(gameActive){
      consequtiveCount = 0;
      fire.innerText = consequtiveCount;
      heart.innerHTML = --hearts;
    }
  }

  reset();
  choices();
  on();
}

const surahList = {
  1: "Al-Fatihah (the Opening)",
  2: "Al-Baqarah (the Cow)",
  3: "Aali Imran (the Family of Imran)",
  4: "An-Nisa??? (the Women)",
  5: "Al-Ma???idah (the Table)",
  6: "Al-An???am (the Cattle)",
  7: "Al-A???raf (the Heights)",
  8: "Al-Anfal (the Spoils of War)",
  9: "At-Taubah (the Repentance)",
  10: " Yunus (Yunus)",
  11: " Hud (Hud)",
  12: " Yusuf (Yusuf)",
  13: " Ar-Ra???d (the Thunder)",
  14: " Ibrahim (Ibrahim)",
  15: " Al-Hijr (the Rocky Tract)",
  16: " An-Nahl (the Bees)",
  17: " Al-Isra??? (the Night Journey)",
  18: " Al-Kahf (the Cave)",
  19: " Maryam (Maryam)",
  20: " Ta-Ha (Ta-Ha)",
  21: " Al-Anbiya??? (the Prophets)",
  22: " Al-Haj (the Pilgrimage)",
  23: " Al-Mu???minun (the Believers)",
  24: " An-Nur (the Light)",
  25: " Al-Furqan (the Criterion)",
  26: " Ash-Shu???ara??? (the Poets)",
  27: " An-Naml (the Ants)",
  28: " Al-Qasas (the Stories)",
  29: " Al-Ankabut (the Spider)",
  30: " Ar-Rum (the Romans)",
  31: " Luqman (Luqman)",
  32: " As-Sajdah (the Prostration)",
  33: " Al-Ahzab (the Combined Forces)",
  34: " Saba??? (the Sabeans)",
  35: " Al-Fatir (the Originator)",
  36: " Ya-Sin (Ya-Sin)",
  37: " As-Saffah (Those Ranges in Ranks)",
  38: " Sad (Sad)",
  39: " Az-Zumar (the Groups)",
  40: " Ghafar (the Forgiver)",
  41: " Fusilat (Distinguished)",
  42: " Ash-Shura (the Consultation)",
  43: " Az-Zukhruf (the Gold)",
  44: " Ad-Dukhan (the Smoke)",
  45: " Al-Jathiyah (the Kneeling)",
  46: " Al-Ahqaf (the Valley)",
  47: " Muhammad (Muhammad)",
  48: " Al-Fat???h (the Victory)",
  49: " Al-Hujurat (the Dwellings)",
  50: " Qaf (Qaf)",
  51: " Adz-Dzariyah (the Scatterers)",
  52: " At-Tur (the Mount)",
  53: " An-Najm (the Star)",
  54: " Al-Qamar (the Moon)",
  55: " Ar-Rahman (the Most Gracious)",
  56: " Al-Waqi???ah (the Event)",
  57: " Al-Hadid (the Iron)",
  58: " Al-Mujadilah (the Reasoning)",
  59: " Al-Hashr (the Gathering)",
  60: " Al-Mumtahanah (the Tested)",
  61: " As-Saf (the Row)",
  62: " Al-Jum???ah (Friday)",
  63: " Al-Munafiqun (the Hypocrites)",
  64: " At-Taghabun (the Loss & Gain)",
  65: " At-Talaq (the Divorce)",
  66: " At-Tahrim (the Prohibition)",
  67: " Al-Mulk ??? (the Kingdom)",
  68: " Al-Qalam (the Pen)",
  69: " Al-Haqqah (the Inevitable)",
  70: " Al-Ma???arij (the Elevated Passages)",
  71: " Nuh (Nuh)",
  72: " Al-Jinn (the Jinn)",
  73: " Al-Muzammil (the Wrapped)",
  74: " Al-Mudaththir (the Cloaked)",
  75: " Al-Qiyamah (the Resurrection)",
  76: " Al-Insan (the Human)",
  77: " Al-Mursalat (Those Sent Forth)",
  78: " An-Naba??? (the Great News)",
  79: " An-Nazi???at (Those Who Pull Out)",
  80: " ???Abasa (He Frowned)",
  81: " At-Takwir (the Overthrowing)",
  82: " Al-Infitar (the Cleaving)",
  83: " Al-Mutaffifin (Those Who Deal in Fraud)",
  84: " Al-Inshiqaq (the Splitting Asunder)",
  85: " Al-Buruj (the Stars)",
  86: " At-Tariq (the Nightcomer)",
  87: " Al-A???la (the Most High)",
  88: " Al-Ghashiyah (the Overwhelming)",
  89: " Al-Fajr (the Dawn)",
  90: " Al-Balad (the City)",
  91: " Ash-Shams (the Sun)",
  92: " Al-Layl (the Night)",
  93: " Adh-Dhuha (the Forenoon)",
  94: " Al-Inshirah (the Opening Forth)",
  95: " At-Tin (the Fig)",
  96: " Al-???Alaq (the Clot)",
  97: " Al-Qadar (the Night of Decree)",
  98: " Al-Bayinah (the Proof)",
  99: " Az-Zalzalah (the Earthquake)",
  100: "Al-???Adiyah (the Runners)",
  101: "Al-Qari???ah (the Striking Hour)",
  102: "At-Takathur (the Piling Up)",
  103: "Al-???Asr (the Time)",
  104: "Al-Humazah (the Slanderer)",
  105: "Al-Fil (the Elephant)",
  106: "Quraish (Quraish)",
  107: "Al-Ma???un (the Assistance)",
  108: "Al-Kauthar (the River of Abundance)",
  109: "Al-Kafirun (the Disbelievers)",
  110: "An-Nasr (the Help)",
  111: "Al-Masad (the Palm Fiber)",
  112: "Al-Ikhlas (the Sincerity)",
  113: "Al-Falaq (the Daybreak)",
  114: "An-Nas (Mankind)",
};

function choices() {
  let added = false;
  const randomAns = randomInteger(0, 3);
  for (let i = 0; i < 4; i++) {
    let choice = document.createElement("input");
    let choiceText = document.createElement("label");

    choiceText.setAttribute("id", "choice");
    choiceText.htmlFor = `choice ${i}`;
    choice.id = `choice ${i}`;
    choice.type = "radio";
    choice.name = `option`;
    choiceText.addEventListener("click", () => {
      respText.innerText = `This is Surat ${surahList[correctAns]} which is listed as number ${correctAns} in the holy Quran`;
      responseHandler(choiceText);
    });

    if (randomAns == i && added == false) {
      console.log(
        "correct answer added! " + surahList[correctAns] + " rand " + randomAns
      );
      choiceText.textContent = surahList[correctAns];
      added = true;
    } else {
      choiceText.textContent = surahList[randomInteger(1, 114)];
    }

    multipleChoice.appendChild(choice);
    multipleChoice.appendChild(choiceText);
  }

  added = false;
}

choices();
