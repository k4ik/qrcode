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

function downloadQrCode() {
    let qrcode = document.querySelector('#qrcode canvas');

    let qrDataUrl = qrcode.toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.href = qrDataUrl;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
}

function shareQrCode() {
    let qrcodeCanvas = document.querySelector('#qrcode canvas');

    qrcodeCanvas.toBlob(function(blob) {
        let file = new File([blob], "qrcode.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                files: [file],
                title: 'QR Code',
                text: 'Here is your QR code.',
            }).then(() => {
                console.log('Successfully shared');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            alert("Sharing not supported in this browser.");
        }
    });
}
