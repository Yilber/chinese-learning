let charData = null;
let writer = {};

$.getJSON('/js/test.json', (data) => {
    charData = data;
    // console.log('data', charData['我']);

    writer = new HanziWriter('flashcard--character--front', '人', {
        width: 100,
        height: 100,
        padding: 0,
        showOutline: false,
        strokeColor: '#3cb4b4',
        radicalColor: '#d63a37',
        charDataLoader: (char, onComplete) => {
            console.log(charData[char]);
            onComplete(charData[char]);
        }
    });
});


/*
const writer = new HanziWriter('flashcard--character--front', '三', {
    charDataLoader: (char, onComplete) => {
        $.getJSON(`/js/all.json`, (charData) => {
            console.log(charData[char]);
            onComplete(charData[char]);
        });
    }
});
*/
let order = 0;

$('.next').click((e) => {
    e.preventDefault();
    writer.setCharacter('月');

    if (order < charData.length) {
        order += 1;
    }
});


$('.prev').click((e) => {
    e.preventDefault();
    writer.setCharacter('亻');

    if (order > 1) {
        order -= 1;
    }
});
