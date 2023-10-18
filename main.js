
const placeholder = document.querySelector(".placeholder");
// console.log(placeholder)

const editableInput = document.querySelector(".editable");
// console.log(editableInput)

const counter = document.getElementById("counter");
// console.log(counter)

const button = document.querySelector(".button");
// console.log(button)

const readonly = document.querySelector(".readonly");
// console.log(readonly)

const tweetsContainer = document.querySelector(".tweetsContainer");

// toplam karakter limiti
const tweetLimit = 30;
let tweets = [];
// tweet İçerikleri 
let tweetContent;
let newTweet;

// placeholder opaklık azaltma
editableInput.addEventListener("click", () => {
    placeholder.style.opacity = "0.5 ";
});

editableInput.onblur = () => {
    placeholder.style.opacity = "1";
};

// placeholder'ı kaldırma
editableInput.onkeypress = (e) => {
    placeholder.style.display = "none";

    // console.log(e.target.innerText)
    let inputContent = e.target.innerText;
    validateTweet(inputContent);
};

// klavyeye basmayı bırakınca kaldrıma
editableInput.onkeyup = (e) => {
    placeholder.style.display = "none";
    let inputContent = e.target.innerText;
    validateTweet(inputContent);
};

const validateTweet = (tweet) => {
    // console.log(tweet)
    tweetContent = tweet;
    // console.log('asd',tweetContent)

    // tweet uzunluğu hesaplama
    let tweetLenght = tweet.length;

    // aşılan limiti tespit etme
    let limit = tweetLimit - tweetLenght;
    // console.log(tweetLenght)

    // karakter limitini html'e aktarma
    counter.innerText = limit;

    // inputun dolu/boş olma durumu (tweet)
    if (tweetLenght <= 0) {
        // tweet yoksa

        // input boş ise placeholder göster
        placeholder.style.display = "block";
        
        // tweet butonunu pasife alma
        button.classList.remove("active");
        
        // sayacı gizle
        counter.style.display = "none";
    } else {
        // eğer tweet var ise

        // placeholder kaldırma
        placeholder.style.display = "none";

        // sayacı aktif etme
        counter.style.display = "block";

        // butonu aktif etme
        button.classList.add("active");
    }

    // karakter limitinin aşılıp aşılmadığı kontrolü

    if (limit < 0) {
        // limiti aşma durmunda

        // sayacın rengini kırmızı yapma
        counter.style.color = "#FF6666";

        // butonu pasife alma
        button.classList.remove("active");
        
        // limiti aşan karakterleri alma
        let overTweet = tweet.substr(tweetLimit, tweetLenght);
        // console.log(overTweet)

        // html'de fazla karakterin arka planını kırmızı yapma
        let overTweetElement = `<span class='overText'>${overTweet}</span>`;
        
        // limit aşmayan tweet ve aşan akarkterleri birleştirme
        newTweet = tweet.substr(0, tweetLimit) + overTweetElement;

        // newtweet'i html de göstermek için tanımladığımız divi görünür hale getirme
        readonly.style.zIndex = "1";
    } else {
        // limit aşılmadı ise
        // sayaç rengi normal
        counter.style.color = "#333";

        // limiti aşmıyorsa gösterme
        readonly.style.zIndex = "-5";
    }

    readonly.innerHTML = newTweet;
};

button.addEventListener("click", () => {

    tweetsContainer.innerHTML = "";
    editableInput.innerText = "";
    tweets.push(tweetContent);
    console.log(tweets);

    tweets.map((tweet) => {
        let card = document.createElement("div");

        card.innerHTML = `
        <div class="tweetCard">
        <img src="https://avatars.githubusercontent.com/u/129687853?v=4" alt="">
<div>
    <h3>EyupSaltukB</h3>
    <p >${tweet}</p>


</div>
    </div>
        
        `;

        tweetsContainer.appendChild(card);
    });
});