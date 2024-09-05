// Get elements from the DOM
let video = document.getElementById('qrVideo');
let qrResult = document.getElementById('qrResult');
let startScanButton = document.getElementById('startScan');
let resultContainer = document.getElementById('resultContainer');
let loadingSpinner = document.getElementById('loadingSpinner');

// Start scanning when button is clicked
startScanButton.addEventListener('click', startScanning);

async function startScanning() {
    // Reset the result and show loading spinner
    qrResult.textContent = 'No QR Code detected';
    resultContainer.classList.remove('show');
    loadingSpinner.style.display = 'block';

    try {
        // Access the webcam and start video streaming
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // for iOS compatibility
        video.play();

        // Continuously scan the video for QR codes
        scanQRCode();
    } catch (err) {
        qrResult.textContent = 'Error accessing camera: ' + err.message;
    }
}

function scanQRCode() {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capture video frame into the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Extract image data for QR code detection
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
        qrResult.textContent = qrCode.data; // Show decoded QR code data
        resultContainer.classList.add('show'); // Show result container
    } else {
        requestAnimationFrame(scanQRCode); // Continue scanning
    }
}
