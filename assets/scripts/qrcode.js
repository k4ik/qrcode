function submitForm(event) {
    event.preventDefault();

    let url = document.getElementById('url').value;

    if(!verificateUrl(url)) {
        return;
    }
    animation()
    generateQrCode(url)
}

function animation() {
    let qrcodeContainer = document.getElementById("qrcode")

    let formSection = document.querySelector('main section:first-of-type');
    formSection.classList.add('section-hide');

    setTimeout(() => {
        formSection.style.display = 'none'; 

        let qrSection = document.querySelector('.qrcode');
        qrSection.classList.add('qrcode-show');

        let logo = document.getElementById('logo');
        logo.classList.add('logo-top');
    }, 500); 
}

function verificateUrl(url) {
    if (url == "") {
        return false;
    }

    return true;
}

function generateQrCode(url) {
    let qrcode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQrCode(event) {
    event.preventDefault();

    let qrcode = document.querySelector('#qrcode canvas');

    let qrDataUrl = qrcode.toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.href = qrDataUrl;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
}

function shareQrCode(event) {
    event.preventDefault();

    let urlInput = document.getElementById("url");

    if (!urlInput) {
        alert("URL input not found.");
        return;
    }

    urlInput.select();
    urlInput.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(urlInput.value).then(() => {
        alert("Copied the text: " + urlInput.value);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy the text.");
    });
}
