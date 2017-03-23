import reqwest from 'reqwest'
import Mustache from 'mustache'
import mainHTML from './text/main.html!text'
import cardsHTML from './text/cardsTemplate.html!text'
import embedHTML from './text/embdTemplate.html!text'
import share from './lib/share'

const regex = /[\r\n]+/g;
const subst = `</p><p>`;
const urlStr = 'https://interactive.guim.co.uk/docsdata-test/1-N2GXh1uMaQudoZb6we9O7dgifM7XWco3EoGK-YytR0.json';

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    //let selectedItem = setCandidateVar(el.getAttribute("data-alt"), el)

    let selectedItem = "MarineLePen";

    //let addEmbed = checkEmbed(el.getAttribute("data-alt"));

    reqwest({
        url: urlStr,
        type: 'json',
        crossOrigin: true,
        success: (resp) => buildEditView(resp, el, selectedItem) //el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.cards}`
    });

    [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click', () => shareFn(network));
    });


    addBackTopFn();


}

function addBackTopFn(){
    let a = document.querySelector('.back-to-top-button');

    a.addEventListener('click', () => console.log("top"));
}


function setCandidateVar(s, el) {
  
    return whitespaceFixRemoveSpaceAndAccents(s);
}

function checkEmbed(s){
    let a = s.split("*---*");
    var addEmbed = false;
    if (a.length > 1) {
        addEmbed = true;
    }
    return addEmbed;
}


function addEmbedFunctionality(el) {
    let a = el.querySelectorAll('.gv-read-more-btn');
    console.log(a, el);
    a.classList.remove(' inactive');

}



function buildEditView(d, el, selectedItem) {

    var editHtml;

    d = formatData(d, selectedItem);

        editHtml = Mustache.render(cardsHTML, d);



   

    

    el.innerHTML = `${editHtml}`;




    
}



function formatData(data, selectedItem) {

    var newObj = {};

    newObj.shortURL = data.shortUrl;

    newObj.cards = [];

    data.cards.map((card) => {
        card.ShortLeaderRef = whitespaceFixRemoveSpaceAndAccents(card.Leader);

        if (card.ShortLeaderRef == selectedItem) { card.valid = true; };

        return card;

    });

    data.cards.map((card) => {
        if (selectedItem == card.ShortLeaderRef) { newObj.cards.push(card); }

    });

    newObj.selectedCandidate = data.selectedCandidate = selectedItem;

    return newObj;
}


function whitespaceFixOne(s) {
    let text = s.replace(regex, subst);
    return `<p>${text}</p>`
}


function whitespaceFixRemoveSpaceAndAccents(s) {

    s = convert_accented_characters(s);
    return s.replace(/\s/g, '');
}


function convert_accented_characters(str) {
    var conversions = new Object();
    conversions['ae'] = 'ä|æ|ǽ';
    conversions['oe'] = 'ö|œ';
    conversions['ue'] = 'ü';
    conversions['Ae'] = 'Ä';
    conversions['Ue'] = 'Ü';
    conversions['Oe'] = 'Ö';
    conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
    conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
    conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
    conversions['c'] = 'ç|ć|ĉ|ċ|č';
    conversions['D'] = 'Ð|Ď|Đ';
    conversions['d'] = 'ð|ď|đ';
    conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
    conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
    conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
    conversions['g'] = 'ĝ|ğ|ġ|ģ';
    conversions['H'] = 'Ĥ|Ħ';
    conversions['h'] = 'ĥ|ħ';
    conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
    conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
    conversions['J'] = 'Ĵ';
    conversions['j'] = 'ĵ';
    conversions['K'] = 'Ķ';
    conversions['k'] = 'ķ';
    conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
    conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
    conversions['N'] = 'Ñ|Ń|Ņ|Ň';
    conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
    conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
    conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
    conversions['R'] = 'Ŕ|Ŗ|Ř';
    conversions['r'] = 'ŕ|ŗ|ř';
    conversions['S'] = 'Ś|Ŝ|Ş|Š';
    conversions['s'] = 'ś|ŝ|ş|š|ſ';
    conversions['T'] = 'Ţ|Ť|Ŧ';
    conversions['t'] = 'ţ|ť|ŧ';
    conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
    conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
    conversions['Y'] = 'Ý|Ÿ|Ŷ';
    conversions['y'] = 'ý|ÿ|ŷ';
    conversions['W'] = 'Ŵ';
    conversions['w'] = 'ŵ';
    conversions['Z'] = 'Ź|Ż|Ž';
    conversions['z'] = 'ź|ż|ž';
    conversions['AE'] = 'Æ|Ǽ';
    conversions['ss'] = 'ß';
    conversions['IJ'] = 'Ĳ';
    conversions['ij'] = 'ĳ';
    conversions['OE'] = 'Œ';
    conversions['f'] = 'ƒ';
    for (var i in conversions) {
        var re = new RegExp(conversions[i], "g");
        str = str.replace(re, i);
    }
    return str;
}