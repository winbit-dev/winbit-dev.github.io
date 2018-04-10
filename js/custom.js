/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){
	$("#preloader").fadeOut("slow");
});

// import $ from 'jquery'

//------------------------------------------------------------
// 3d-lines-animation
//------------------------------------------------------------
var mouseX = 0,
    mouseY = 0,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    SEPARATION = 200,
    AMOUNTX = 1,
    AMOUNTY = 1,
    camera = void 0,
    scene = void 0,
    renderer = void 0;

// functions
//------------------------------------------------------------
var init = function init() {
  // Define letiables
  var container = void 0,
      separation = 1000,
      amountX = 50,
      amountY = 50,
      color = 0xb2b5bc,
      particles = void 0,
      particle = void 0;
  container = document.getElementById("canvas");
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 100;
  scene = new THREE.Scene();

  renderer = new THREE.CanvasRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // canvas background color
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial({

    color: color,
    // opacity: 0.5,
    opacity: 0.5,
    program: function program(context) {

      context.beginPath();
      context.arc(0, 0, 0.5, 0, PI2, true);
      context.fill();
    }

  });

  var geometry = new THREE.Geometry();

  // Number of particles
  for (var i = 0; i < 150; i++) {

    particle = new THREE.Sprite(material);
    particle.position.x = Math.random() * 2 - 1;
    particle.position.y = Math.random() * 2 - 1;
    particle.position.z = Math.random() * 2 - 1;
    particle.position.normalize();
    particle.position.multiplyScalar(Math.random() * 10 + 600);
    particle.scale.x = particle.scale.y = 5;

    scene.add(particle);

    geometry.vertices.push(particle.position);
  }

  // Lines
  var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color, opacity: 0.2 }));
  scene.add(line);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);
};

var onWindowResize = function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

var onDocumentMouseMove = function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.2;
};

var onDocumentTouchStart = function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();

    mouseX = (event.touches[0].pageX - windowHalfX) * 0.7;
    mouseY = (event.touches[0].pageY - windowHalfY) * 0.7;
  }
};

var onDocumentTouchMove = function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
};

var animate = function animate() {
  requestAnimationFrame(animate);
  render();
};

var render = function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.1;
  camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
};

var hex = function hex(_hex) {
  if (/^#/.test(_hex)) {
    _hex = _hex.slice(1);
  }
  if (_hex.length !== 3 && _hex.length !== 6) {
    throw new Error("Invaild hex String");
  }

  var digit = _hex.split("");

  if (digit.length === 3) {
    digit = [digit[0], digit[0], digit[1], digit[1], digit[2], digit[2]];
  }
  var r = parseInt([digit[0], digit[1]].join(""), 16);
  var g = parseInt([digit[2], digit[3]].join(""), 16);
  var b = parseInt([digit[4], digit[5]].join(""), 16);

  return [r, g, b];
};

// init
//------------------------------------------------------------
init();
animate();

$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 1200,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#navigation").css("background-color","rgba(63, 70, 87, 0.9)");
        } else {
            $("#navigation").css("background-color","rgba(63, 70, 87, 0)");
        }
    });
	
	$(function() {
    $(".navbar-toggle").click(function(){
        if($(".navbar-collapse").hasClass("in")){
            $(".navbar-toggle>.fa-bars").removeClass("hide").addClass("show");
						$(".navbar-toggle>.fa-times").removeClass("show").addClass("hide");
        }else{
            $(".navbar-toggle>.fa-bars").removeClass("show").addClass("hide");
						$(".navbar-toggle>.fa-times").removeClass("hide").addClass("show");
        }
    });
	});
	
	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

	/*var slideHeight = $(window).height();
	
	$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);
	});
	*/
	
	/* ========================================================================= */
	/*	Portfolio Filtering
	/* ========================================================================= */	
	
	
    // portfolio filtering

    $(".project-wrapper").mixItUp();
	
	
	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
	});
	
	/* ========================================================================= */
	/*	Parallax
	/* ========================================================================= */	
	
	

	
	/* ========================================================================= */
	/*	Timer count
	/* ========================================================================= */

	"use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 20,
                to: e,
                speed: 3e3,
                refreshInterval: 20
            })
        })
    });
	
	/* ========================================================================= */
	/*	Back to Top
	/* ========================================================================= */
	
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200)
        } else {
            $("#back-top").fadeOut(200)
        }
    });
    $("#back-top").click(function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo")
    });
	
});