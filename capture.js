(function () {
    var width = 320;
    var height = 0;

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log('An error occurred: ' + err);
        });

    video.addEventListener(
        'canplay',
        function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        },
        false
    );

        startbutton.addEventListener(
        'click',
        function (ev) {
            takepicture();
            ev.preventDefault();
        },
        false
    );

    clearphoto();

        const currentWidth = document.getElementById('range_width');
    currentWidth.addEventListener('change', () => {
        width = currentWidth.value;
        height = video.videoHeight / (video.videoWidth / width);
        video.width = currentWidth.value;
        video.height = height;
    });

    const brightness = document.getElementById('range_brightness');
    brightness.addEventListener('change', () => {
        video.style.filter = `brightness(${brightness.value / 100})`;
        canvas.style.filter = `brightness(${brightness.value / 100})`;
    });
}

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

}

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}

window.addEventListener('load', startup, false);
})();