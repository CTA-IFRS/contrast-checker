const CONTRAST_THRESHOLD_AA = 4.5;
const CONTRAST_THRESHOLD_AAA = 7;
const CONTRAST_THRESHOLD_AA_18PT = 3;
const CONTRAST_THRESHOLD_AAA_18PT = 4.5

const backgroundColorInput = document.getElementById('background-color');
const backgroundColorHexInput = document.getElementById('background-hex');

backgroundColorInput.addEventListener('input', function() {
    backgroundColorHexInput.value = backgroundColorInput.value;
});

backgroundColorHexInput.addEventListener('input', function() {
    let hexValue = backgroundColorHexInput.value.trim();
    if (/^[0-9A-F]{6}$/i.test(hexValue)) {
        hexValue = '#' + hexValue;
    }
    backgroundColorInput.value = hexValue;
    backgroundColorHexInput.value = hexValue;
});

backgroundColorHexInput.value = backgroundColorInput.value;

const textColorInput = document.getElementById('text-color');
const textHexInput = document.getElementById('text-hex');

textColorInput.addEventListener('input', function() {
    textHexInput.value = textColorInput.value;
});

textHexInput.addEventListener('input', function() {
    let hexValue = textHexInput.value.trim();
    if (/^[0-9A-F]{6}$/i.test(hexValue)) {
        hexValue = '#' + hexValue;
    }
    textColorInput.value = hexValue;
    textHexInput.value = hexValue;
});

textHexInput.value = textColorInput.value;

function downloadPDF() {
    const cabecalho = document.getElementById('cabecalho');
    const conteudo = document.getElementById('conteudo');

    const cabecalhoClone = cabecalho.cloneNode(true);
    const conteudoClone = conteudo.cloneNode(true);

    const removerNoPDF = cabecalhoClone.querySelector('#removerNoPDF');
    if (removerNoPDF) {
        removerNoPDF.remove();
    }

    const deleteButtons = conteudoClone.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.remove();
    });

    const tudo = document.createElement('div');

    tudo.appendChild(cabecalhoClone);
    tudo.appendChild(conteudoClone);

    var opt = {
        margin: 0.1,
        filename: "GentooVision.pdf",
        html2canvas: { scale: 3, scrollY: 0 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().set(opt).from(tudo).save();
}

document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            document.getElementById('canvas').classList.remove('dNone')
            document.getElementById('removerImagem').classList.remove('dNone')
            document.getElementById('labelImagem').classList.add('dNone');
            document.getElementById('cancelarUploadImagem').classList.add('dNone');
            document.getElementById('escolherOutraImagem').classList.remove('dNone');
            document.getElementById('pickColorButton').classList.remove('dNone');
            document.getElementById('escolherOutraImagem').classList.remove('dNone');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const maxWidth = 600;
            const maxHeight = 400;
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
        }
        img.src = e.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var conteudo = document.getElementById("conteudo");
    var testandoContainer = document.getElementById("testandoContainer");

    function checkConteudo() {
        if (conteudo.children.length === 0) {
            testandoContainer.style.display = 'none';
        } else {
            testandoContainer.style.display = 'flex';
        }
    }

    var observer = new MutationObserver(checkConteudo);
    observer.observe(conteudo, { childList: true });
    checkConteudo();
});

document.getElementById('pickColorButton').addEventListener('click', async function () {

    // var userAgent = navigator.userAgent;
    // if (userAgent.includes("Firefox") && userAgent.includes("Linux") || userAgent.includes("Chrome") && userAgent.includes("Linux")) {
    //     alert('Infelizmente seu navegador não permite essa funcionalidade!');
    //     return;
    // }

    const eyeDropper = new EyeDropper();
    try {
        const result = await eyeDropper.open();
        const hexColor = result.sRGBHex;
        document.getElementById('colorDisplay').style.backgroundColor = hexColor;
        document.getElementById('colorCode').innerHTML = hexColor;
        setColorBasedOnBackground(hexColor);
    } catch (error) {
        console.error('Erro ao usar o conta-gotas:', error);
    }
});

function calculateLuminance(r, g, b) {
    const a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ?
            v / 12.92 :
            Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function setColorBasedOnBackground(color) {
    var r = parseInt(color.substr(1, 2), 16);
    var g = parseInt(color.substr(3, 2), 16);
    var b = parseInt(color.substr(5, 2), 16);

    var luminance = calculateLuminance(r, g, b);
    var textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';

    var colorCodeElement = document.getElementById('colorCode');
    colorCodeElement.style.color = textColor;
}

function mudarDisplay(mostrar, esconder) {
    mostrar.forEach(id => document.getElementById(id).classList.remove('dNone'));
    esconder.forEach(id => document.getElementById(id).classList.add('dNone'));
}

document.getElementById('selecionarArquivo').addEventListener('click', function() {
    // var userAgent = navigator.userAgent;
    // if (userAgent.includes("Firefox") && userAgent.includes("Linux") || userAgent.includes("Chrome") && userAgent.includes("Linux")) {
    //     alert('Infelizmente seu navegador não permite essa funcionalidade!');
    //     return;
    // }
    mudarDisplay(['labelImagem', 'cancelarUploadImagem'], ['selecionarArquivo']);
});

document.getElementById('cancelarUploadImagem').addEventListener('click', function() {
    mudarDisplay(['selecionarArquivo'], ['labelImagem', 'cancelarUploadImagem']);
});

document.getElementById('escolherOutraImagem').addEventListener('click', function() {
    mudarDisplay(['labelImagem', 'cancelarUploadImagem'], ['escolherOutraImagem', 'canvas', 'removerImagem', 'pickColorButton', 'colorDisplay']);
    document.getElementById('colorCode').innerHTML = '';
    document.getElementById('colorDisplay').style.backgroundColor = 'rgb(255, 255, 255)'
});

document.getElementById('removerImagem').addEventListener('click', function() {
    mudarDisplay(['selecionarArquivo'], ['removerImagem', 'escolherOutraImagem', 'labelImagem', 'cancelarUploadImagem', 'canvas', 'removerImagem', 'pickColorButton', 'colorDisplay']);
    document.getElementById('colorCode').innerHTML = '';
});

document.getElementById('pickColorButton').addEventListener('click', function() {
    mudarDisplay(['colorDisplay'], []);
});

function normalizeHexValue(hex) {
    hex = hex.trim();
    if (hex.startsWith('#')) {
        hex = hex.substring(1);
    }
    hex = hex.toLowerCase();
    return hex;
}

function hexToRgb(hex) {
    hex = normalizeHexValue(hex);
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function calculateContrastRatio(background, text) {
    const bgLuminance = calculateLuminance(background.r, background.g, background.b);
    const textLuminance = calculateLuminance(text.r, text.g, text.b);
    const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    return contrastRatio.toFixed(2);
}

function updateContrastRatio() {
    const backgroundHexInput = document.getElementById('background-hex');
    const textHexInput = document.getElementById('text-hex');
    const customCardBodies = document.querySelectorAll('.custom-card-body');
    const contrastRatioDisplay = document.getElementById('contrast-ratio');

    const backgroundColor = backgroundHexInput.value ? `#${normalizeHexValue(backgroundHexInput.value)}` : document.getElementById('background-color').value;
    const textColor = textHexInput.value ? `#${normalizeHexValue(textHexInput.value)}` : document.getElementById('text-color').value;

    customCardBodies.forEach(cardBody => {
        cardBody.style.backgroundColor = backgroundColor;
        cardBody.style.color = textColor;
    });

    const backgroundRgb = hexToRgb(backgroundColor);
    const textRgb = hexToRgb(textColor);

    const contrastRatio = calculateContrastRatio(backgroundRgb, textRgb);
    contrastRatioDisplay.innerText = `RATIO: ${contrastRatio}`;

    updateContrastCircles(contrastRatio);
}

function updateContrastCircles(contrastRatio) {
    const circleAA = document.getElementById('circleAA');
    const circleAAA = document.getElementById('circleAAA');
    const circleAA18PT = document.getElementById('circleAA18PT');
    const circleAAA18PT = document.getElementById('circleAAA18PT');

    const iconAA = document.getElementById('iconAA');
    const iconAAA = document.getElementById('iconAAA');
    const iconAA18PT = document.getElementById('iconAA18PT');
    const iconAAA18PT = document.getElementById('iconAAA18PT');

    const isAAMeeting = contrastRatio >= CONTRAST_THRESHOLD_AA;
    const isAAAMeeting = contrastRatio >= CONTRAST_THRESHOLD_AAA;
    const isAA18ptMeeting = contrastRatio >= CONTRAST_THRESHOLD_AA_18PT;
    const isAAA18ptMeeting = contrastRatio >= CONTRAST_THRESHOLD_AAA_18PT;

    updateCircle(circleAA, isAAMeeting);
    updateCircle(circleAAA, isAAAMeeting);
    updateCircle(circleAA18PT, isAA18ptMeeting);
    updateCircle(circleAAA18PT, isAAA18ptMeeting);

    updateIcon(iconAA, isAAMeeting);
    updateIcon(iconAAA, isAAAMeeting);
    updateIcon(iconAA18PT, isAA18ptMeeting);
    updateIcon(iconAAA18PT, isAAA18ptMeeting);
}

function updateCircle(circle, status) {
    circle.style.backgroundColor = status ? 'green' : 'red';
}

function updateIcon(icon, status) {
    icon.innerText = status ? '✓' : '✕';
}

function addToHistory(status, contrastRatio, backgroundColor, textColor) {
    const historyBody = document.getElementById('conteudo');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
            <div class='cardsHistorico'>
            <div class='divCirculosHistorico'>
                    <span class="circle2 ${getStatusClass(contrastRatio, 4.5)}">AA</span>
                    <span class="circle2 ${getStatusClass(contrastRatio, 7)}">AAA</span>
                    <span class="circle2 ${getStatusClass(contrastRatio, 3)}">AA18+</span>
                    <span class="circle2 ${getStatusClass(contrastRatio, 4.5)}">AAA18+</span>
                </div>
                <span class="sample divExemplosHistorico"></span>
                
                <span><b>RATIO</b></span><span class='divPadraoHistorico ratioHistorico'>${contrastRatio}</span>
                <span><b>COR DO FUNDO</b></span><span class='divPadraoHistorico hexHistorico'>${backgroundColor}</span>
                <span><b>COR DO FUNDO</b></span><span class='divPadraoHistorico hexHistorico'>${textColor}</span>
                <span><button class="delete-button">Excluir</button></span>
            </div>
        `;

    const fontSize12 = '12px';
    const fontSize18 = '18px';

    const sampleContainer = newDiv.querySelector('.sample');
    const sample12 = createContrastSample(backgroundColor, textColor, fontSize12);
    const sample18 = createContrastSample(backgroundColor, textColor, fontSize18);

    sampleContainer.appendChild(sample12);
    sampleContainer.appendChild(sample18);

    historyBody.appendChild(newDiv);

    const deleteButton = newDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        historyBody.removeChild(newDiv);
        removeFromHistory(newDiv);
    });
}

function getStatusClass(contrastRatio, threshold) {
    return contrastRatio >= threshold ? 'green' : 'red';
}

function saveHistoryToCookies(history) {
    const historyJSON = JSON.stringify(history);
    localStorage.setItem('history', historyJSON);
}

function retrieveHistoryFromCookies() {
    const historyJSON = localStorage.getItem('history');
    return historyJSON ? JSON.parse(historyJSON) : [];
}

function displayHistoryOnPage() {
    const history = retrieveHistoryFromCookies();
    const historyBody = document.getElementById('conteudo');

    for (const item of history) {
        const newDiv = document.createElement('div');

        newDiv.innerHTML = `
            <div class='cardsHistorico'>
            <div class='divCirculosHistorico'>
                    <span class="circle2 ${getStatusClass(item.contrastRatio, 4.5)}">AA</span>
                    <span class="circle2 ${getStatusClass(item.contrastRatio, 7)}">AAA</span>
                    <span class="circle2 ${getStatusClass(item.contrastRatio, 3)}">AA18+</span>
                    <span class="circle2 ${getStatusClass(item.contrastRatio, 4.5)}">AAA18+</span>
                </div>
                <span class="sample divExemplosHistorico"></span>
                <span><b>RATIO</b></span><span class='divPadraoHistorico ratioHistorico'>${item.contrastRatio}</span>
                <span><b>COR DO FUNDO</b></span><span class='divPadraoHistorico hexHistorico'>${item.backgroundColor}</span>
                <span><b>COR DO FUNDO</b></span><span class='divPadraoHistorico hexHistorico'>${item.textColor}</span>
                <span><button class="delete-button">Excluir</button></span>
            </div>
        `;

        const sampleContainer = newDiv.querySelector('.sample');
        sampleContainer.innerHTML = item.sample12 + item.sample18;

        historyBody.appendChild(newDiv);

        const deleteButton = newDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            const index = history.indexOf(item);
            if (index !== -1) {
                history.splice(index, 1);
                saveHistoryToCookies(history);
            }
            newDiv.remove();
        });
    }
}

document.getElementById('background-color').addEventListener('change', updateContrastRatio);
document.getElementById('text-color').addEventListener('change', updateContrastRatio);
document.getElementById('background-hex').addEventListener('input', updateContrastRatio);
document.getElementById('text-hex').addEventListener('input', updateContrastRatio);

document.getElementById('background-color').addEventListener('input', function(e) {
    document.getElementById('background-hex').value = e.target.value;
});

document.getElementById('text-color').addEventListener('input', function(e) {
    document.getElementById('text-hex').value = e.target.value;
});

document.addEventListener("DOMContentLoaded", function() {
    const helpButton = document.getElementById("help-button");
    const popup = document.getElementById("popup");
    const popupClose = document.getElementById("popup-close");

    helpButton.addEventListener("click", function() {
        popup.style.display = "flex";
    });

    popupClose.addEventListener("click", function() {
        popup.style.display = "none";
    });
});

const addToHistoryButton = document.getElementById('add-to-history');
addToHistoryButton.addEventListener('click', function() {
    const contrastRatioDisplay = document.getElementById('contrast-ratio');
    const backgroundColorPicker = document.getElementById('background-color');
    const textColorPicker = document.getElementById('text-color');

    const contrastRatio = parseFloat(contrastRatioDisplay.textContent.split(':')[1].trim());
    const backgroundColor = backgroundColorPicker.value;
    const textColor = textColorPicker.value;

    const status = contrastRatio >= 4.5 ? 'Aprovado' : 'Reprovado';

    const history = retrieveHistoryFromCookies();
    history.push({
        status,
        contrastRatio,
        backgroundColor,
        textColor,
        sample12: getSampleHTML(backgroundColor, textColor, '12px'),
        sample18: getSampleHTML(backgroundColor, textColor, '18px'),
    });
    saveHistoryToCookies(history);

    addToHistory(status, contrastRatio, backgroundColor, textColor);
});

function createContrastSample(background, text, fontSize) {
    const sample1 = document.createElement('div');
    sample1.classList.add('exemplos12px')
    sample1.style.backgroundColor = background;
    sample1.style.color = text;
    sample1.style.fontSize = fontSize;
    sample1.style.padding = '5px';
    sample1.innerHTML = 'exemplo de texto';

    const sample2 = document.createElement('div');
    sample2.classList.add('exemplos18px')
    sample2.style.backgroundColor = background;
    sample2.style.color = text;
    sample2.style.fontSize = fontSize;
    sample2.style.padding = '5px';
    sample2.innerHTML = 'exemplo de texto';

    return sample1, sample2;
}

function getSampleHTML(background, text, fontSize) {
    const sample = createContrastSample(background, text, fontSize);
    return sample.outerHTML;
}

document.addEventListener("DOMContentLoaded", displayHistoryOnPage);

function removeFromHistory(row) {
    const history = retrieveHistoryFromCookies();
    const index = Array.from(row.parentNode.children).indexOf(row);
    if (index !== -1) {
        history.splice(index, 1);
        saveHistoryToCookies(history);
    }
    row.remove();
}

function calculateContrastWithDefault() {
    const backgroundHexInput = document.getElementById('background-hex');
    const textHexInput = document.getElementById('text-hex');
    const backgroundColor = `#${normalizeHexValue(backgroundHexInput.value) || document.getElementById('background-color').value}`;
    const textColor = `#${normalizeHexValue(textHexInput.value) || document.getElementById('text-color').value}`;
    const backgroundRgb = hexToRgb(backgroundColor);
    const textRgb = hexToRgb(textColor);
    const contrastRatio = calculateContrastRatio(backgroundRgb, textRgb);
    const contrastRatioDisplay = document.getElementById('contrast-ratio');
    contrastRatioDisplay.innerText = `RATIO: ${contrastRatio}`;

    updateContrastCircles(contrastRatio);
}

function updateCardColor() {
    const backgroundHexInput = document.getElementById('background-hex');
    const textHexInput = document.getElementById('text-hex');
    const customCardBodies = document.querySelectorAll('.custom-card-body');

    const backgroundColor = backgroundHexInput.value ? `#${normalizeHexValue(backgroundHexInput.value)}` : document.getElementById('background-color').value;
    const textColor = textHexInput.value ? `#${normalizeHexValue(textHexInput.value)}` : document.getElementById('text-color').value;

    customCardBodies.forEach(cardBody => {
        cardBody.style.backgroundColor = backgroundColor;
        cardBody.style.color = textColor;
    });
}

document.getElementById('background-color').addEventListener('change', updateCardColor);
document.getElementById('text-color').addEventListener('change', updateCardColor);
document.getElementById('background-hex').addEventListener('input', updateCardColor);
document.getElementById('text-hex').addEventListener('input', updateCardColor);

document.addEventListener("DOMContentLoaded", function() {
    updateCardColor();
});

document.getElementById('background-color').addEventListener('change', calculateContrastWithDefault);
document.getElementById('text-color').addEventListener('change', calculateContrastWithDefault);
document.getElementById('background-hex').addEventListener('input', calculateContrastWithDefault);
document.getElementById('text-hex').addEventListener('input', calculateContrastWithDefault);

document.addEventListener("DOMContentLoaded", calculateContrastWithDefault);

document.addEventListener('DOMContentLoaded', function() {
    
});

document.getElementById('toggle-contrast').addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.toggle('high-contrast');
    document.getElementById('colorSelection').classList.toggle('high-contrast-colorSelection');
    document.getElementById('testandoContainer').classList.toggle('high-contrast-container');
    var todosCards = document.querySelectorAll('.cardsHistorico');
    todosCards.forEach(card => {
        card.classList.toggle('high-contrast-cards');
    });
    document.getElementById('contrast-ratio').classList.toggle('high-contrast-title');
    document.getElementById('escolhaCores').classList.toggle('high-contrast-title');
    document.getElementById('historico').classList.toggle('high-contrast-title');
    document.getElementById('logo-text').classList.toggle('high-contrast-title');
    document.getElementById('labelTC').classList.toggle('high-contrast-title');
    document.getElementById('labelBC').classList.toggle('high-contrast-title');
    document.getElementById('hr').classList.toggle('high-contrast-hr');
    document.getElementById('footer').classList.toggle('high-contrast-header-footer');
    document.getElementById('cabecalho').classList.toggle('high-contrast-header-footer');
    document.getElementById('help-button').classList.toggle('high-contrast-buttons');
    document.getElementById('add-to-history').classList.toggle('high-contrast-buttons');
    document.getElementById('selecionarArquivo').classList.toggle('high-contrast-buttons');
    document.getElementById('escolherOutraImagem').classList.toggle('high-contrast-buttons');
    document.getElementById('pickColorButton').classList.toggle('high-contrast-buttons');
    document.getElementById('save-pdf').classList.toggle('high-contrast-buttons');
    document.getElementById('labelImagem').classList.toggle('high-contrast-labelImg');
    document.getElementById('popup-content').classList.toggle('high-contrast-popup');
    document.getElementById('text1-popup').classList.toggle('high-contrast-popup-text');
    document.getElementById('text2-popup').classList.toggle('high-contrast-popup-text');

    var logoImage = document.getElementById('logo-image');
    if (document.body.classList.contains('high-contrast')) {
        logoImage.src = 'logo/pinguim2.png';
    } else {
        logoImage.src = 'logo/pinguim.png';
    }
});

function applyColors() {
    var backgroundColor = document.getElementById('background-color').value;
    var textColor = document.getElementById('text-color').value;

    var customCardBodies = document.querySelectorAll('.custom-card-body');
        customCardBodies.forEach(cardBody => {
            cardBody.style.backgroundColor = backgroundColor;
            cardBody.style.color = textColor;
        });
}

document.getElementById('background-color').addEventListener('input', applyColors);
document.getElementById('text-color').addEventListener('input', applyColors);
