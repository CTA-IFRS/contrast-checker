const CONTRAST_THRESHOLD_AA = 4.5;
const CONTRAST_THRESHOLD_AAA = 7;
const CONTRAST_THRESHOLD_AA_18PT = 3;
const CONTRAST_THRESHOLD_AAA_18PT = 4.5;

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

function luminance(r, g, b) {
    const a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ?
            v / 12.92 :
            Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrastRatio(background, text) {
    const bgLuminance = luminance(background.r, background.g, background.b);
    const textLuminance = luminance(text.r, text.g, text.b);
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
    const historyTableBody = document.getElementById('history-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><div class="circle2 ${getStatusClass(contrastRatio, 4.5)}">AA <br>${getStatusIcon(contrastRatio, 4.5)}</div></td>
        <td><div class="circle2 ${getStatusClass(contrastRatio, 7)}">AAA <br>${getStatusIcon(contrastRatio, 7)}</div></td>
        <td><div class="circle2 ${getStatusClass(contrastRatio, 3)}">AA18+ <br>${getStatusIcon(contrastRatio, 3)}</div></td>
        <td><div class="circle2 ${getStatusClass(contrastRatio, 4.5)}">AAA18+ <br>${getStatusIcon(contrastRatio, 4.5)}</div></td>
        <td>${contrastRatio}</td>
        <td class="sample"></td>
        <td>${backgroundColor}</td>
        <td>${textColor}</td>
        <td><button class="delete-button">Excluir</button></td>
    `;

    const fontSize12 = '12px';
    const fontSize18 = '18px';

    const sampleContainer = newRow.querySelector('.sample');
    const sample12 = createContrastSample(backgroundColor, textColor, fontSize12);
    const sample18 = createContrastSample(backgroundColor, textColor, fontSize18);

    sampleContainer.appendChild(sample12);
    sampleContainer.appendChild(sample18);

    historyTableBody.appendChild(newRow);

    const deleteButton = newRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        historyTableBody.removeChild(newRow);
        removeFromHistory(newRow);
    });

    addToHistoryCookies(status, contrastRatio, backgroundColor, textColor);
}

function getStatusClass(contrastRatio, threshold) {
    return contrastRatio >= threshold ? 'green' : 'red';
}

function getStatusIcon(contrastRatio, threshold) {
    return contrastRatio >= threshold ? '✓' : '✕';
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
    const historyTableBody = document.getElementById('history-table-body');
    for (const item of history) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><div class="circle2 ${getStatusClass(item.contrastRatio, 4.5)}">AA <br>${getStatusIcon(item.contrastRatio, 4.5)}</div></td>
            <td><div class="circle2 ${getStatusClass(item.contrastRatio, 7)}">AAA <br>${getStatusIcon(item.contrastRatio, 7)}</div></td>
            <td><div class="circle2 ${getStatusClass(item.contrastRatio, 3)}">AA18+ <br>${getStatusIcon(item.contrastRatio, 3)}</div></td>
            <td><div class="circle2 ${getStatusClass(item.contrastRatio, 4.5)}">AAA18+ <br>${getStatusIcon(item.contrastRatio, 4.5)}</div></td>
            <td>${item.contrastRatio}</td>
            <td class="sample"></td>
            <td>${item.backgroundColor}</td>
            <td>${item.textColor}</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        const sampleContainer = newRow.querySelector('.sample');
        sampleContainer.innerHTML = item.sample12 + '<br>' + item.sample18;

        historyTableBody.appendChild(newRow);

        const deleteButton = newRow.querySelector('.delete-button');
        deleteButton.addEventListener('click', function() {
            const index = history.indexOf(item);
            if (index !== -1) {
                history.splice(index, 1);
                saveHistoryToCookies(history);
            }
            newRow.remove();
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
    const sample = document.createElement('div');
    sample.style.backgroundColor = background;
    sample.style.color = text;
    sample.style.fontSize = fontSize;
    sample.innerHTML = 'exemplo de texto<br>EXEMPLO DE TEXTO';
    return sample;
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


//pdf
document.getElementById('salvar-pdf').addEventListener('click', function () {
    const pdf = new jsPDF();
    const table = document.getElementById('history-table-body');
    const rows = table.querySelectorAll('tr');

    let pdfContent = [];

    rows.forEach(function(row) {
        let rowData = [];
        row.querySelectorAll('td').forEach(function(cell) {
            rowData.push(cell.textContent.trim());
        });
        pdfContent.push(rowData);
    });

    let posY = 10;

    pdfContent.forEach(function(row) {
        let posX = 10;
        row.forEach(function(cell) {
            pdf.text(posX, posY, cell);
            posX += 50;
        });
        posY += 10;
    });

    pdf.save('historico.pdf');
});
