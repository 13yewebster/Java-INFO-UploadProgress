
// Cropper
var croper = new CROP;
croper.init('.cropBox');
croper.loadImg('assets/img/example.jpg');
$('.croppy').on('click', '.cropButton', function() {
    $('canvas').remove();
    $('.cropBox').after('<canvas width="240" height="240" id="canvas"/>');
    var e = document.getElementById('canvas').getContext('2d'),
        t = new Image,
        n = coordinates(croper).w,
        r = coordinates(croper).h,
        i = coordinates(croper).x,
        s = coordinates(croper).y,
        o = 240,
        u = 240;
    t.src = coordinates(croper).image;
    t.onload = function() {
        e.drawImage(t, i, s, n, r, 0, 0, o, u);
        $('canvas').addClass('output').show().delay('800').fadeOut();
        dataUrl  = document.getElementById('canvas').toDataURL();
        console.log(dataUrl);
    };
});

// Rotator
// function rotate() {
  var eDegree = 0,
      eRotate = $('.cropMain');
  $('.rotateButton').click(function() {
    eRotate.removeClass('rotate'+eDegree);
    eDegree = (eDegree+90)%360;
    eRotate.addClass('rotate'+eDegree);

    var croperImg = $('.crop-img').attr('src');
    $('.croppy').html('<div class="cropBox"><div class="cropMain"></div><div class="cropSlider"></div><div class="text-center"><button class="rotateButton">Rotate</button><button class="cropButton">Crop</button></div></div>');
    var croper = new CROP;
    croper.init('.cropBox');
    croper.loadImg(croperImg);
  });
// };

// Declare Global Variables
var choosen = document.getElementById('chooseImage');
var choosenTrigger = document.getElementById('triggerChooseImage');

// Delegate Trigger Input
$(choosenTrigger).click(function() {
  $(choosen).click();
});

// The Real Input Event
$(choosen).change(function() {
  renderImageFile();
  $(this).wrap('<form></form>').closest('form').get(0).reset();
  $(this).unwrap();
});

// Create Render Image Function
function renderImageFile() {
  if (choosen.files.length === 0)
    return;
  var e = choosen.files[0];
  if (!imageFilter.test(e.type)) {
    return;
  };
  imageReader.readAsDataURL(e);
};

// Image Reader using FileReader
imageReader = new FileReader, imageFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
imageReader.onload = function(e) {
  $('.croppy').html('<div class="cropBox"><div class="cropMain"></div><div class="cropSlider"></div><div class="text-center"><button class="rotateButton">Rotate</button><button class="cropButton">Crop</button></div></div>');
  croper = new CROP;
  croper.init('.cropBox');
  croper.loadImg(e.target.result);
};
