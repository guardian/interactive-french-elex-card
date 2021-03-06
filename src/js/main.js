import reqwest from 'reqwest'
import Mustache from 'mustache'
import mainHTML from './text/main.html!text'
import cardsHTML from './text/cardsTemplate.html!text'
import share from './lib/share'

const regex = /[\r\n]+/g;
const subst = `</p><p>`;

const urlStr = 'https://interactive.guim.co.uk/docsdata-test/1-N2GXh1uMaQudoZb6we9O7dgifM7XWco3EoGK-YytR0.json?polit=';

var selectedItem = document.querySelector(".element-interactive").getAttribute('data-alt');

//var selectedItem = "Emmanuel Macron";

var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');

export function init(el, context, config, mediator) {
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);


    reqwest({
        url: urlStr,
        type: 'json',
        crossOrigin: true,
        success: (resp) => buildEditView(resp)//el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.cards}`
    });

    [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click',() => shareFn(network));
    });
}



function buildEditView(d){

    //selectedItem =='Houseprices' ? selectedItem = selectedItemConst : selectedItem = selectedItem;

    selectedItem = whitespaceFixRemoveSpaceAndAccents(selectedItem);

    console.log(selectedItem);

    d = formatData(d);

    let editHtml = Mustache.render(cardsHTML, d );
    console.log(d);
    document.querySelector('.test-msg').innerHTML = `${editHtml}`;
}



function formatData(data) {
    data.cards.map((card) => {
        card.ShortLeaderRef = whitespaceFixRemoveSpaceAndAccents(card.Leader);
        card.PolicyOneCopy = whitespaceFixOne(card.PolicyOneCopy);
        card.PolicyTwoCopy = whitespaceFixOne(card.PolicyTwoCopy);
        card.PolicyThreeCopy = whitespaceFixOne(card.PolicyThreeCopy);
        card.PolicyFourCopy = whitespaceFixOne(card.PolicyFourCopy);
        card.PolicyFiveCopy = whitespaceFixOne(card.PolicyFiveCopy);
        if(card.ShortLeaderRef == selectedItem){ card.valid=true };
        return card;
    });


    data.selectedCandidate=selectedItem;

    return data;
}


function whitespaceFixOne(s) {
    let text = s.replace(regex, subst);
    return `<p>${text}</p>`
}


function whitespaceFixRemoveSpaceAndAccents(s) {

    s = convert_accented_characters(s);
    return s.replace(/\s/g, '');
}


function convert_accented_characters(str){
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
        for(var i in conversions){
            var re = new RegExp(conversions[i],"g");
            str = str.replace(re,i);
        }
        return str;
}