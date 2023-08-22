// Função para processar e normalizar o valor hexadecimal
function normalizeHexValue(hex) {
    hex = hex.trim();
    if (hex.startsWith('#')) {
        hex = hex.substring(1);
    }
    hex = hex.toLowerCase();
    return hex;
}

// Função para calcular a luminância de uma cor
function getLuminance(color) {
    const rgb = color.substring(1);
    const r = parseInt(rgb.substring(0, 2), 16) / 255;
    const g = parseInt(rgb.substring(2, 4), 16) / 255;
    const b = parseInt(rgb.substring(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
}

// Função para calcular o ratio de contraste entre duas cores
function calculateContrastRatio(background, text) {
    const bgLuminance = getLuminance(background);
    const textLuminance = getLuminance(text);
    const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    return contrastRatio.toFixed(2);
}

// Função para atualizar o contraste ratio e as cores
function updateContrastRatio() {
    const backgroundHexInput = document.getElementById('background-hex');
    const textHexInput = document.getElementById('text-hex');

    const backgroundColor = backgroundHexInput.value ?
        `#${normalizeHexValue(backgroundHexInput.value)}` :
        document.getElementById('background-color').value;

    const textColor = textHexInput.value ?
        `#${normalizeHexValue(textHexInput.value)}` :
        document.getElementById('text-color').value;

    const sampleText12 = document.getElementById('sample-text-12');
    const sampleText18 = document.getElementById('sample-text-18');
    const contrastRatioDisplay = document.getElementById('contrast-ratio');

    const contrastRatio = calculateContrastRatio(backgroundColor, textColor);
    contrastRatioDisplay.innerText = `Nível de Contraste RATIO: ${contrastRatio}`;

    sampleText12.style.backgroundColor = backgroundColor;
    sampleText12.style.color = textColor;
    sampleText18.style.backgroundColor = backgroundColor;
    sampleText18.style.color = textColor;
}

// Event listeners para mudanças nas entradas de cor e hexadecimais
document.getElementById('background-color').addEventListener('change', updateContrastRatio);
document.getElementById('text-color').addEventListener('change', updateContrastRatio);
document.getElementById('background-hex').addEventListener('input', updateContrastRatio);
document.getElementById('text-hex').addEventListener('input', updateContrastRatio);

const backgroundColorPicker = document.getElementById('background-color');


const backgroundHexInput = document.getElementById('background-hex');


const textColorPicker = document.getElementById('text-color');


const textHexInput = document.getElementById('text-hex');


backgroundColorPicker.addEventListener('input', function(e) {

    const hexColor = e.target.value;
    

    backgroundHexInput.value = hexColor;
});


textColorPicker.addEventListener('input', function(e) {

    const hexColor = e.target.value;
    textHexInput.value = hexColor;
});
