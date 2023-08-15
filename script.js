function getLuminance(color) {
    const rgb = color.substring(1);
    const r = parseInt(rgb.substring(0, 2), 16) / 255;
    const g = parseInt(rgb.substring(2, 4), 16) / 255;
    const b = parseInt(rgb.substring(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance;
}

function calculateContrastRatio(background, text) {
    const bgLuminance = getLuminance(background);
    const textLuminance = getLuminance(text);
    const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    return contrastRatio.toFixed(2);
}

// Função para atualizar o contraste ratio e as cores
function updateContrastRatio() {
    const backgroundColor = document.getElementById('background-color').value;
    const textColor = document.getElementById('text-color').value;
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

// Event listener para mudanças nas entradas de cor
document.getElementById('background-color').addEventListener('change', updateContrastRatio);
document.getElementById('text-color').addEventListener('change', updateContrastRatio);