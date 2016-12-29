var croppers = [];
function initCropper(image, options) {
    Cropper.setDefaults({
        ready: function (e) {
            console.log(e.type);
        },
        cropstart: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
            console.log(e.type, e.detail.action);
        },
        crop: function (e) {
            var data = e.detail;

            console.log(e.type);
            dataX.value = Math.round(data.x);
            dataY.value = Math.round(data.y);
            dataHeight.value = Math.round(data.height);
            dataWidth.value = Math.round(data.width);
            dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
            dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
            dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
        },
        zoom: function (e) {
            console.log(e.type, e.detail.ratio);
        }
    });
    return new Cropper(image, options);
}

function getInformation() {
    var imgData = croppers[0].getImageData();
    console.log('Image Data : ', imgData);

    var canvasData = croppers[0].getCanvasData();
    console.log('Canvas Data : ', canvasData);

    var cropBoxData = croppers[0].getCropBoxData();
    console.log('Crop box Data : ', cropBoxData);
}

function crop() {
    var resultCanvas = croppers[0].getCroppedCanvas();

    var dataUrl = resultCanvas.toDataURL('image/png');

    var download = document.getElementById('download');
    download.href = dataUrl;

    var image = document.createElement('img');
    image.src = dataUrl;
    var cropped = document.getElementById('result');
    cropped.innerHTML = '';
    cropped.appendChild(image);
}

window.addEventListener('DOMContentLoaded', function() {
    croppers.push(initCropper(document.getElementById('image1'), {
        aspectRatio : 16 / 9,
        viewMode: 3,
        dragMode : 'crop',
        preview: '.img-preview-16-9',
        guides : false,
        center : false,
        //highlight : false,
        background : false,
        autoCropArea : 0.9,
        rotatable : false,
        scalable : false,
        zoomable : false,
        //autoCrop : false
    }));

    croppers.push(initCropper(document.getElementById('image2'), {
        aspectRatio : 3 / 2,
        viewMode: 3,
        dragMode : 'move',
        preview: '.img-preview-3-2'
    }));

    croppers.push(initCropper(document.getElementById('image3'), {
        aspectRatio : 1,
        viewMode: 3,
        dragMode : 'none',
        preview: '.img-preview-1-1'
    }));

    document.getElementById('crop').addEventListener('click', function() {
        crop();
    })
});


/**
 * image data(base64)를 얻을때에는 이미지의 실제 형식 MIME TYPE을 지정해 주어야 한다
 * - cropper.getCroppedCanvas().toDataURL('image/jpeg')
 * "setAspectRatio", "replace" and "destroy"를 제외한 모든 메소드는 ready이후에 호출되어야 한다
 */

/**
 Options
 - aspectRatio : crop 비율 강제하기
 - viewMode : 3으로
 - modal : 기본 true
 - guides : 기본 true
 - center : 기본 true

 */


/**
 * 이미지를 보여주고 셀렉션 이동 - 제공
 * -
 * 셀렉션이 있는 위치를 crop
 * crop된 이미지를 미리보기
 * 실제사이즈/크롭사이즈/비율 정보 보기
 * crop된 이미지의 data 서버로 날리기
 */