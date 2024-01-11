const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

let container = document.querySelector('.container');
let fromInput = document.querySelector('.container .select-box .from-input-box input');
let toInput = document.querySelector('.container .select-box .to-input-box input');
let switchBtn = document.querySelector('.container .select-box .switch-btn');
let fromOptionsBox = document.querySelector('.container .from-options');
let toOptionsBox = document.querySelector('.container .to-options');
let toInputBox = document.querySelector('.container .select-box .to-input-box');
let FromTranslateInput = container.querySelector('.from-text-box textarea');
let ToTranslateInput = container.querySelector('.to-text-box textarea');
let FromCopyBtn = container.querySelector('.from-text-box .btns copy-btn');
let toCopyBtn = container.querySelector('.to-text-box .btns .copy-btn');

let currentFrom, currentTo, currentFromTranslation, currentToTranslation

let getCountries = () => {
    let fromLi = '';
    let toLi = '';
    for(let countryCode in countries){
        fromLi += `<li onclick="setFromCountry('${countryCode}')">${countries[countryCode]}</li>`;
        toLi += `<li onclick="setToCountry('${countryCode}')">${countries[countryCode]}</li>`;
    }
    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;
}

let setFromCountry = (countrycode) => {
    fromInput.value = countrycode;
    fromOptionsBox.classList.remove('from-options-active');
};

let setToCountry = (countrycode) => {
    toInput.value = countrycode;
    toOptionsBox.classList.remove('to-options-active')
}

fromInputBox.addEventListener('click', () => {
    fromOptionsBox.classList.toggle('from-options-active');
    toOptionsBox.classList.remove('to-options-active');
    getTranslation();
});

toInputBox.addEventListener('click', () => {
    toOptionsBox.classList.toggle('to-options-active');
    fromOptionsBox.classList.remove('from-options-active');
    getTranslation();
});

switchBtn.addEventListener('click', () => {
    currentFrom = fromInput.value;
    currentTo = toInput.value;
    fromInput.value = currentTo;
    toInput.value = currentFrom;
    currentFromTranslation = FromTranslateInput.value;
    currentToTranslation = ToTranslateInput.value;
    FromTranslateInput.value = currentToTranslation;
    ToTranslateInput.value = currentFromTranslation;
    getTranslation()
});

let getTranslation = () => {
    let text = FromTranslateInput.value;
    let from = fromInput.value;
    let to = toInput.value;
    let url =  `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
    fetch(url).then(res => res.json()).then(data => {
        ToTranslateInput.value = data.responseData.translatedText;
    });
};

FromTranslateInput.addEventListener('keyup', (e) => {
    if(e.key == "Enter"){
        if(FromTranslateInput.value != ''){
            getTranslation();
        }
    }
})

let copyToText = () => {
    if(ToTranslateInput.value != ''){
        navigator.clipboard.writeText(ToTranslateInput.value);
    }
}

let speakFromText = () => {
    if(FromTranslateInput.value != ''){
        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = FromTranslateInput.value;
        speechSynthesis.speak(speech);
    }
}

let speakToText = () => {
    if(ToTranslateInput.value != ''){
        let speech = new SpeechSynthesisUtterance();
        speech.lang = 'en-US';
        speech.text = ToTranslateInput.value;
        speechSynthesis.speak(speech);
    }
}

getCountries();