window.addEventListener('load', function() {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserQRCodeReader()
    console.log('ZXing code reader initialized')
    codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
            
            if (videoInputDevices.length >= 1) {
                videoInputDevices.forEach((element) => {
                    console.log(element);
                })
                const sourceSelect = document.getElementById('sourceSelect')

                console.log(videoInputDevices.length);
                let length = videoInputDevices.length - 1;

                if (videoInputDevices[length].deviceId) {
                    selectedDeviceId = videoInputDevices[length].deviceId;
                    document.getElementById('startButton').addEventListener('click', () => {
                        codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                            console.log(result.text)
                          var sound = new Howl({
src: ['https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/jg-032316-sfx-elearning-correct-answer-sound-1.mp3']
});

sound.play();
                        }).catch((err) => {
                            console.error(err)
                            document.getElementById('result').textContent = err
                        })

                        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
                    })
                } else {
                    document.getElementById('startButton').addEventListener('click', () => {
                        codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result) => {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                                                             var sound = new Howl({
src: ['https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/jg-032316-sfx-elearning-correct-answer-sound-1.mp3']
});

sound.play();
                        }).catch((err) => {
                            console.error(err)
                            document.getElementById('result').textContent = err
                        })

                        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
                    })
                }
                console.log(length);
                console.log(selectedDeviceId);
            }

            document.getElementById('resetButton').addEventListener('click', () => {
                codeReader.reset()
                console.log('Reset.')
            })
        })
        .catch((err) => {
            console.error(err)
        })
})