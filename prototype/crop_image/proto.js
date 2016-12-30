'use strict';

/**
 * @see cropper.js
 */
var CropEditor = (function (){

    var CONFIG = {
        ASPECT_RATIO : {
            TYPE1 : {
                VALUE: 16 / 9,
                LABEL : '16 / 9'
            },
            TYPE2 : {
                VALUE: 3 / 2,
                LABEL : '3 / 2'
            },
            TYPE3 : {
                VALUE: 1,
                LABEL : '1 / 1'
            }
        }
    };
    var cropInstance;
    var ratio = CONFIG.ASPECT_RATIO.TYPE1;
    var cropEditor = {
        initialize: function (){
            cropInstance = createCropper($('targetImage'), {
                    aspectRatio : ratio.VALUE,
                    crop : function() {
                        this.displayInformation();
                    }.bind(this)
                }
            );
            this.setEventListener();
        },

        setEventListener : function() {

            // set preset radio
            var radios = document.getElementsByName('preset_radio');

            for (var i = 0; i < radios.length; i++) {
                radios[i].addEventListener('click', function(e) {
                    if (!cropInstance) {
                        return;
                    }
                    this.setAspectRatio(e.target.value);
                }.bind(this));
            }

            // crop
            $('crop').addEventListener('click', function() {
                this.crop();
            }.bind(this));

            // set button
            $('upload').addEventListener('click', function() {
                alert('What should happen?');
            });

            $('cancel').addEventListener('click', function() {
                alert('What should happen?');
            });

            $('confirm').addEventListener('click', function() {
                alert('What should happen?');
            });
        },

        crop : function() {
            var resultCanvas = cropInstance.getCroppedCanvas();

            // MIME TYPE을 원본 타입으로 지정해야 한다. automatically detect mime type 필요
            var dataUrl = resultCanvas.toDataURL('image/png');

            // 로컬로 다운로드
            var download = document.getElementById('download');
            download.href = dataUrl;
            download.style.display = 'block';

            // 서버로 업로드 (공식 API)
            /*
            resultCanvas.toBlob(function (blob) {
                var formData = new FormData();

                formData.append('croppedImage', blob);

                // Use `jQuery.ajax` method
                $.ajax('/path/to/upload', {
                    method: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function () {
                        console.log('Upload success');
                    },
                    error: function () {
                        console.log('Upload error');
                    }
                });
            });
            */
        },

        setAspectRatio : function(value) {
            ratio = CONFIG.ASPECT_RATIO['TYPE' + value];
            cropInstance.setAspectRatio(ratio.VALUE);
        },

        displayInformation : function() {
            var imgData = cropInstance.getImageData();
            $('originalSize').innerHTML = 'w' + parseInt(imgData.naturalWidth) + ', h' + parseInt(imgData.naturalHeight) + ' px';

            var cropBoxData = cropInstance.getCropBoxData();
            $('croppedSize').innerHTML = 'w' + parseInt(cropBoxData.width) + ', h' + parseInt(cropBoxData.height) + ' px ' + ratio.LABEL;
        }
    };

    return cropEditor;
})();


/*
* cropper.js로 crop edit 영역 만들기
* */


/**
 * Global Helper Functions
 */
var $ = function(id) {
    return document.getElementById(id);
};

var createCropper = function(image, options) {
    Cropper.setDefaults({
        viewMode: 3,
        dragMode : 'move',
        preview: '.image_preview',
        guides : false,
        center : true,
        //highlight : false,
        background : false,
        autoCropArea : 0.9,
        rotatable : false,
        scalable : false,
        zoomable : false,
        //autoCrop : false
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
            console.log(e.type, e.detail);
        },
        zoom: function (e) {
            console.log(e.type, e.detail.ratio);
        }
    });
    return new Cropper(image, options);
};