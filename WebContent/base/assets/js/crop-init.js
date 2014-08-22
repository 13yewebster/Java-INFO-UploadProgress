// Create Custom
var parWid = $('.example').width();
$('.default .cropMain').css({'width' : parWid, 'height' : parWid});
// Start
function loadImageFile() {
    if (document.getElementById("uploadfile").files.length === 0)
        return;
    var e = document.getElementById("uploadfile").files[0];
    if (!rFilter.test(e.type)) {
        return
    }
    oFReader.readAsDataURL(e)
}
// Rotator
var angleRot = 0, imgRot = $('.cropMain');
$(".rotator").click(function() {
  imgRot.removeClass("rotate"+angleRot);
  angleRot = (angleRot+90)%360;
  imgRot.addClass("rotate"+angleRot);
});
// Cropper
var one = new CROP;
one.init(".default");
one.loadImg("assets/img/example.jpg");
$("body").on("click", ".cropper", function() {
    $("canvas").remove();
    $(".output").remove();
    $(".default").after('<canvas width="240" height="240" id="canvas"/>');
    var v = document.getElementById("canvas");
    var e = v.getContext("2d"), t = new Image, n = coordinates(one).w, r = coordinates(one).h, i = coordinates(one).x, s = coordinates(one).y, o = 240, u = 240;
    t.src = coordinates(one).image;
    t.onload = function() {
        e.clearRect(0,0,canvas.width,canvas.height);
        e.drawImage(t, i, s, n, r, 0, 0, o, u);
        // $("canvas").addClass("output").show().delay("4000").fadeOut("slow");
        // e.drawImage(t,v.width/2-t.width/2,v.height/2-t.width/2);
        e.save();
        e.translate(v.width/2,v.height/2);
        e.rotate(angleRot*Math.PI/180);
        e.drawImage(v,-v.width/2,-v.width/2);
        e.restore();
        dataUrl  = document.getElementById('canvas').toDataURL(),
        imgOutput = document.createElement('img');
        imgOutput.className = 'output';
        imgOutput.src = dataUrl;
        $(".default").after(imgOutput);
    }
});
$("body").on("click", ".newupload", function() {
    $(".uploadfile").click()
});
$("body").change(".uploadfile", function() {
    loadImageFile();
    $(".uploadfile").wrap("<form>").closest("form").get(0).reset();
    $(".uploadfile").unwrap()
});
oFReader = new FileReader, rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
oFReader.onload = function(e) {
    $(".example").html('<div class="default"><div class="cropMain"></div><div class="cropSlider"></div></div>'); // <button class="cropButton">Crop</button>
    $('.default .cropMain').css({'width' : parWid, 'height' : parWid});
    one = new CROP;
    one.init(".default");
    one.loadImg(e.target.result);
    // Set Angle To Zero
    angleRot = 0;
    imgRot = $('.cropMain');
}
