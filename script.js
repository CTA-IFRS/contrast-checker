function normalizeHexValue(hex) {
    hex = hex.trim();
    if (hex.startsWith('#')) {
        hex = hex.substring(1);
    }
    hex = hex.toLowerCase();
    return hex;
}

function hexToRgb(hex) {
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

    const backgroundColor = backgroundHexInput.value ?
        `#${normalizeHexValue(backgroundHexInput.value)}` :
        document.getElementById('background-color').value;

    const textColor = textHexInput.value ?
        `#${normalizeHexValue(textHexInput.value)}` :
        document.getElementById('text-color').value;

    customCardBodies.forEach(cardBody => {
        cardBody.style.backgroundColor = backgroundColor;
        cardBody.style.color = textColor;
    });

    const backgroundRgb = hexToRgb(backgroundColor);
    const textRgb = hexToRgb(textColor);

    const contrastRatio = calculateContrastRatio(backgroundRgb, textRgb);

    const contrastRatioDisplay = document.getElementById('contrast-ratio');
    contrastRatioDisplay.innerText = `RATIO: ${contrastRatio}`;

    const sampleText12 = document.getElementById('sample-text-12');
    const sampleText18 = document.getElementById('sample-text-18');

    sampleText12.style.backgroundColor = backgroundColor;
    sampleText12.style.color = textColor;
    sampleText18.style.backgroundColor = backgroundColor;
    sampleText18.style.color = textColor;

    const isAAMeeting = contrastRatio >= 4.5;
    const isAAAMeeting = contrastRatio >= 7;
    const isAA18ptMeeting = contrastRatio >= 3;
    const isAAA18ptMeeting = contrastRatio >= 4.5;

    const circleAA = document.getElementById('circleAA');
    const circleAAA = document.getElementById('circleAAA');
    const circleAA18PT = document.getElementById('circleAA18PT');
    const circleAAA18PT = document.getElementById('circleAAA18PT');

    const iconAA = document.getElementById('iconAA');
    const iconAAA = document.getElementById('iconAAA');
    const iconAA18PT = document.getElementById('iconAA18PT');
    const iconAAA18PT = document.getElementById('iconAAA18PT');

    circleAA.style.backgroundColor = isAAMeeting ? 'green' : 'red';
    circleAAA.style.backgroundColor = isAAAMeeting ? 'green' : 'red';
    circleAA18PT.style.backgroundColor = isAA18ptMeeting ? 'green' : 'red';
    circleAAA18PT.style.backgroundColor = isAAA18ptMeeting ? 'green' : 'red';

    iconAA.innerText = isAAMeeting ? '✓' : '✕';
    iconAAA.innerText = isAAAMeeting ? '✓' : '✕';
    iconAA18PT.innerText = isAA18ptMeeting ? '✓' : '✕';
    iconAAA18PT.innerText = isAAA18ptMeeting ? '✓' : '✕';
}

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

function addToHistory(status, contrastRatio, backgroundColor, textColor) {
    const historyTableBody = document.getElementById('history-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>
      <div class="circle2 ${contrastRatio >= 4.5 ? 'green' : 'red'}">
        AA <br> ${contrastRatio >= 4.5 ? '✓' : '✕'}
      </div>
    </td>
    <td>
      <div class="circle2 ${contrastRatio >= 7 ? 'green' : 'red'}">
      AAA <br> ${contrastRatio >= 7 ? '✓' : '✕'}
      </div>
    </td>
    <td>
      <div class="circle2 ${contrastRatio >= 3 ? 'green' : 'red'}">
      AA18+ <br>${contrastRatio >= 3 ? '✓' : '✕'}
      </div>
    </td>
    <td>
      <div class="circle2 ${contrastRatio >= 4.5 ? 'green' : 'red'}">
      AAA18+ <br> ${contrastRatio >= 4.5 ? '✓' : '✕'}
      </div>
    </td>
        <td>${contrastRatio}</td>
        <td>${backgroundColor}</td>
        <td>${textColor}</td>
        <td><button class="delete-button">Excluir</button></td>
    `;

    historyTableBody.appendChild(newRow);

    const deleteButton = newRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        newRow.remove();
    });
}

const addToHistoryButton = document.getElementById('add-to-history');
addToHistoryButton.addEventListener('click', function() {
    const contrastRatioDisplay = document.getElementById('contrast-ratio');
    const backgroundColorPicker = document.getElementById('background-color');
    const textColorPicker = document.getElementById('text-color');

    const contrastRatio = contrastRatioDisplay.textContent.split(':')[1].trim();
    const backgroundColor = backgroundColorPicker.value;
    const textColor = textColorPicker.value;

    const status = parseFloat(contrastRatio) >= 4.5 ? 'Aprovado' : 'Reprovado';

    addToHistory(status, contrastRatio, backgroundColor, textColor);
});