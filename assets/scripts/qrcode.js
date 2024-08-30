function generateQrCode(event) {
    event.preventDefault();

    let qrcodeContainer = document.getElementById("qrcode");
    let url = document.getElementById('url').value;

    if (url == "") {
        return;
    }

    let formSection = document.querySelector('main section:first-of-type');
    formSection.classList.add('section-hide');

    let qrcode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
        formSection.style.display = 'none'; 

        let qrSection = document.querySelector('.qrcode');
        qrSection.classList.add('qrcode-show');

        let logo = document.getElementById('logo');
        logo.classList.add('logo-top');
    }, 500); 

    
}