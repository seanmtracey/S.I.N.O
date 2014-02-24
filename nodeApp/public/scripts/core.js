var __sino = (function(){

	var socket = undefined,
		pins = document.getElementsByClassName('pin'),
		pinData = [],
		maxRecords = 50;

	function addSocketListeners(){
		
		socket.on('info', function(data){
			info = data.info,
			zw = 0;

			/*for(var p = 0; p < pins.length; p += 1){
				pins[p].setAttribute('class', 'pin');
			}*/

			while(zw < pins.length){

				pins[zw].setAttribute('class', 'pin');

				zw += 1;
			}


			pinData[info.pin].data.push({
				method : info.method,
				value : info.value
			});

			if(pinData[info.pin].data.length > maxRecords){
				pinData[info.pin].data.shift();
			}

			pins[info.pin].setAttribute('class', 'pin active');

			setTimeout(function(){
				pins[info.pin].setAttribute('class', 'pin');
			}, 100);

			var pinBox = document.getElementById("pin" + info.pin);

			if(pinBox !== null){

				var pString = "",
					pinTxt = pinBox.getElementsByClassName('pinTxt')[0],
					zz = 0;

				while(zz < pinData[info.pin].data.length){

					pString += "<li>" + pinData[info.pin].data[zz].method + ": " + pinData[info.pin].data[zz].value + "</li>";

					zz += 1;
				}

				pinTxt.innerHTML = pString;
				pinTxt.scrollTop = pinTxt.scrollHeight;

			}

		});

	}

	function addClickEvents(){
		
		for(var c = 0; c < pins.length; c += 1){
			
			(function(c){
				
				pins[c].addEventListener('click', function(){

					console.log("This has been called");

					if(document.getElementById('pin' + c) === null){

						var pinFrag = document.createDocumentFragment();
							pinEl = document.createElement('div'),
							pinTitle = document.createElement('div'),
							pinClose = document.createElement('div'),
							pinTxt = document.createElement('div'),
							dragPin = document.createElement('div'),
							zy = 0,
							printString = "",
							movable = false;

							pinEl.setAttribute('id', "pin" + c);
							pinEl.setAttribute('class', 'pinData');
							pinTitle.setAttribute('class', 'pinTitle');
							pinTitle.innerHTML = "Pin " + c;
							pinClose.setAttribute('class', 'pinClose');
							pinClose.innerHTML = "X";
							pinTxt.setAttribute('class', 'pinTxt');
							dragPin.setAttribute('class', 'dragHere');
							dragPin.setAttribute('id', "dragPin" + c);

							while(zy < pinData[c].data.length){

								printString += "<li>" + pinData[c].data[zy].method + ": " + pinData[c].data[zy].value + "</li>";

								zy += 1;
							}

							pinTxt.innerHTML = printString;

							pinEl.appendChild(pinTitle);
							pinEl.appendChild(pinClose);
							pinEl.appendChild(pinTxt);
							pinEl.appendChild(dragPin);
							pinFrag.appendChild(pinEl);

							document.body.appendChild(pinFrag);
							pinFrag.scrollTop = pinFrag.scrollHeight;

							dragPin.addEventListener('mousedown', function(e){

								movable = true;
								document.body.setAttribute('class', 'noSelect');

							}, false);

							pinClose.addEventListener('click', function(){
								var thisPin = document.getElementById("pin" + c);
								thisPin.parentNode.removeChild(thisPin);
								console.log("CLICK");
							}, true);

							pinEl.addEventListener('mousedown', function(){

								var zh = 0,
									dEls = document.getElementsByClassName('pinData');

								while(zh < dEls.length){
									dEls[zh].style.zIndex = 1;

									zh += 1;

								}

								document.getElementById('pin' + c).style.zIndex = 4;

							}, false);

							pinEl.addEventListener('mousemove', function(e){

								if(movable){
									document.getElementById('pin' + c).style.left = e.pageX - pinEl.offsetWidth / 2 + "px";
									document.getElementById('pin' + c).style.top = e.pageY - pinEl.offsetHeight + 20 + "px";	
								}

							}, false);

							dragPin.addEventListener('mouseup', function(e){
								movable = false;
								document.body.setAttribute('class', '');
							}, false);

					}

				}, false);

			})(c);
			
		}


		

	}

	function addKeyboardEvents(){

		document.addEventListener("keydown", function(e){
			
			if(e.keyCode == "27"){
				var pinDataEls = document.getElementsByClassName('pinData'),
					zx = pinDataEls.length;

				while(zx > 0){

					pinDataEls[zx - 1 ].parentNode.removeChild(pinDataEls[zx - 1]);

					zx -= 1;

				}
			}

		}, false);
	}

	function init(){

		socket = io.connect("/");

		for(var i = 0; i < pins.length; i += 1){
			pinData.push({
				data : []
			});
		}
		console.log(pinData);
		addClickEvents();
		addKeyboardEvents();
		addSocketListeners();
		
		
	}

	return{
		init : init
	};

})();

(function(){
	__sino.init();
})();