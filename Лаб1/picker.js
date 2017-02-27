var RED
var picker = {
	V: 100,
	S:100,
	status:false,
	
	init: function () {
     var id_elements = {primary: "primary_block", arrows: "arrows", block: "block_picker", circle: "circle", line: "line"}; 

    var s ={h1:20, h:180, w:20, th: id_elements.arrows, bk: id_elements.block, line: id_elements.line};

	/*
	Параметры передаваемые через обьект "s" обьекту "Line"
	h - высота линни Hue
	w- ширина линни Hue
	th  - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
	bk - id блока главного блока с изображение и изменяемым фоном
	*/
    Line.init(s);//отрисовка линий hue и привязка событий

     var b = {block: id_elements.block, circle: id_elements.circle};
	/*
	Параметры передаваемые через обьект "b" обьекту "Block"
	id - id блока выбора цвета (основной блок)
	c - круг для перемещения по основнoму блоку(для выбора цвета)
	*/
     Block.init(b);// привязка событий к блоку и кругу для управления

      picker.out_color = document.getElementById("out_color");

     }
};

var Line ={
	  
	Hue:20,
	
	init: function (elem){
	
      var canvaLine, cAr, pst, bk, t = 0;
        
		canvaLine = Line.create(elem.h, elem.w, elem.line, "cLine");

          cAr = document.getElementById(elem.th);
           bk = document.getElementById(elem.bk);

       Line.posit = function (e){
		 var top, rgb;
           
		  top = mouse.pageY(e) - pst;
           top = (top < 0 )? 0 : top;
             top = (top > elem.h )? elem.h  : top;
 
               cAr.style.top = top-2 +"px";
                t =  Math.round(top /(elem.h/ 360));
                 t = Math.abs(t - 360);
                   t = (t == 360)? 0 : t;
  
                     Line.Hue = t;

                       bk.style.backgroundColor = "rgb("+convert.hsv_rgb(t,100,100)+")";
                       picker.out_color.style.backgroundColor= "rgb("+convert.hsv_rgb(t,picker.S,picker.V)+")";
                       
                       

                       //alert(typeof(ab));
                       
                       var arr = convert.hsv_rgb(t,picker.S,picker.V).toString().split(',');
                       //document.getElementById('rg').value="R: " + convert.RED + "G: " + convert.GREEN + "B: "+ convert.BLUE;
                      

                       document.getElementById("hueSlider").value = document.getElementById('hue').value= t;
                       document.getElementById("sSlider").value = document.getElementById('s').value= picker.S;
                       document.getElementById("vSlider").value = document.getElementById('v').value= picker.V;

                       document.getElementById("redSlider").value = document.getElementById('red1').value= arr[0];
                       document.getElementById("greenSlider").value = document.getElementById('green1').value= arr[1];
                       document.getElementById("blueSlider").value = document.getElementById('blue1').value= arr[2];

                       var arr2 = [parseInt(1-(arr[0]/255)),parseInt(1-(arr[1]/255)),parseInt(1-(arr[2]/255))];  	
    			 	   document.getElementById("cyan").value = document.getElementById("cyanSlider").value = arr2[0];
    		     	   document.getElementById("magenta").value = document.getElementById("magentaSlider").value = arr2[1];
    			 	   document.getElementById("yellow").value = document.getElementById("yellowSlider").value = arr2[2];

                 	  

    			 	   document.getElementById("HEX").value = rgbToHex(arr[0],arr[1],arr[2]);

    			 	    var hue = document.getElementById('hueGradient');
						hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
						+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
						

						var red = document.getElementById('redGradient');
						red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")" + ')';
						var green = document.getElementById('greenGradient');
						green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")" + ')';
						var blue = document.getElementById('blueGradient');
						blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")" + ')';

						var cyan = document.getElementById('cyanGradient');
				 		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")" + ')';
				 		var magenta = document.getElementById('magentaGradient');
				 		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")" + ')';
				 		var yellow = document.getElementById('yellowGradient');
				 		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")" + ')';

				 		var arr3= convert.hsv_rgb(Line.Hue,0,picker.V).toString().split(',');
						var arr4= convert.hsv_rgb(Line.Hue,100,picker.V).toString().split(',');
						var saturation = document.getElementById('saturationGradient');
						saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';

						var arr5= convert.hsv_rgb(Line.Hue,picker.S,0).toString().split(',');
						var arr6= convert.hsv_rgb(Line.Hue,picker.S,100).toString().split(',');
						var value = document.getElementById('valueGradient');
						value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';
                        
                        var arrXYZ = conXYZ.rgb_xyz(arr[0],arr[1],arr[2]).toString().split(',');
		
						var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
						
						document.getElementById("alert").value = "";
						
						document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
						document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
						document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2];
	}
// события перемещения по линии
      cAr.onmousedown = function (){
	
	      pst = Obj.positY(canvaLine);
	
	         document.onmousemove = function(e){Line.posit(e);}
		}

       cAr.onclick = Line.posit;

         canvaLine.onclick = function (e){Line.posit(e)};
           
		   canvaLine.onmousedown = function (){
	
	         pst = Obj.positY(canvaLine);
	           
			   document.onmousemove = function(e){Line.posit(e);}
	}
                 document.onmouseup = function (){
					 document.onmousemove = null; 
					 cAr.onmousemove = null; 
					 
					 }
},
	
	
	create : function (height, width, line, cN){
	  var canvas = document.createElement("canvas");
	
	    canvas.width = width;
	     canvas.height = height;	
	
	       canvas.className = cN;
	        
			document.getElementById(line).appendChild(canvas);
		 
		      Line.grd(canvas, height, width);

		 
		 return canvas;
	},
	
	grd:function (canva, h, w){
		var gradient,hue,color, canva, gradient1;
		
		 canva = canva.getContext("2d");

	       gradient = canva.createLinearGradient(w/2,h,w/2,0);
	 
	         hue = [[255,0,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255],[255,0,0]];
	
	for (var i=0; i <= 6;i++){
		
	  color = 'rgb('+hue[i][0]+','+hue[i][1]+','+hue[i][2]+')';
	
	     gradient.addColorStop(i*1/6, color);
	
	};
	  canva.fillStyle = gradient;
         	canva.fillRect(0,0, w ,h);	
	}
};

	var Block = {
			
	init: function (elem) {
		

		var circle, block, colorO, bPstX, bPstY, bWi, bHe, cW, cH, pxY, pxX;
		 
		 circle = document.getElementById(elem.circle);
		  block = document.getElementById(elem.block);
		    cW = circle.offsetWidth ;
	         cH = circle.offsetHeight;
		       bWi = block.offsetWidth - cW;
	             bHe = block.offsetHeight - cH;
		           pxY = bHe / 100; 
		            pxX = bWi / 100; 
		
		Block.cPos = function (e){
			
			var top, left, S, V;
			
			 document.ondragstart = function() { return false;}
			
			   document.body.onselectstart = function() { return false; }
			
			left = mouse.pageX(e) - bPstX - cW/2;
			 left = (left < 0)? 0 : left;
			  left = (left > bWi  )? bWi  : left;
			   
			   circle.style.left = left  + "px"; 
			   
			    S = Math.ceil(left /pxX) ;
			    
				 top = mouse.pageY(e)  - bPstY - cH/2;
			      top = (top > bHe  )? bHe : top;
			
			        top = (top < 0)? 0 : top;
			
			          circle.style.top = top   + "px";
			
			            V = Math.ceil(Math.abs(top / pxY - 100));
			             
						 if (V <50) circle.style.borderColor = "#fff";
			
			else circle.style.borderColor = "#000";
			
			picker.S = S;
			
			  picker.V = V;
			
			     picker.out_color.style.backgroundColor = "rgb("+convert.hsv_rgb(Line.Hue,S,V)+")";
				 var _res = convert.hsv_rgb(Line.Hue,S,V);
			     _res = _res[0].toString(16)+""+_res[1].toString(16)+""+_res[2].toString(16);
				 console.log(_res);
				 var arr = convert.hsv_rgb(Line.Hue,S,V).toString().split(',');
                 document.getElementById("redSlider").value = document.getElementById('red1').value= arr[0];
                 document.getElementById("greenSlider").value = document.getElementById('green1').value= arr[1];
                 document.getElementById("blueSlider").value = document.getElementById('blue1').value= arr[2];

				 document.getElementById("hueSlider").value = document.getElementById('hue').value= Line.Hue;
                 document.getElementById("sSlider").value = document.getElementById('s').value= S;
                 document.getElementById("vSlider").value = document.getElementById('v').value= V;

                 var arr2 = [1-(arr[0]/255),1-(arr[1]/255),1-(arr[2]/255)];  	
    			 document.getElementById("cyan").value = document.getElementById("cyanSlider").value = arr2[0];
    		     document.getElementById("magenta").value = document.getElementById("magentaSlider").value = arr2[1];
    			 document.getElementById("yellow").value = document.getElementById("yellowSlider").value = arr2[2];

                 var arr1 = [(1-arr2[0])*255,(1-arr2[1])*255,(1-arr2[2])*255];
    			 document.getElementById("redSlider").value = document.getElementById("red1").value = arr1[0];
    			 document.getElementById("greenSlider").value = document.getElementById("green1").value = arr1[1];
    			 document.getElementById("blueSlider").value = document.getElementById("blue1").value = arr1[2];
    			 
    			 document.getElementById("HEX").value = rgbToHex(arr[0],arr[1],arr[2]);


    			 var red = document.getElementById('redGradient');
				 red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")" + ')';
				 var green = document.getElementById('greenGradient');
				 green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")" + ')';
				 var blue = document.getElementById('blueGradient');
				 blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")" + ')';

				 var cyan = document.getElementById('cyanGradient');
				 cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")" + ')';
				 var magenta = document.getElementById('magentaGradient');
				 magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")" + ')';
				 var yellow = document.getElementById('yellowGradient');
				 yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")" + ')';

				var hue = document.getElementById('hueGradient');
				hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
				+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
				
				var arr3= convert.hsv_rgb(Line.Hue,0,V).toString().split(',');
				var arr4= convert.hsv_rgb(Line.Hue,100,V).toString().split(',');
				var saturation = document.getElementById('saturationGradient');
				saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';

				var arr5= convert.hsv_rgb(Line.Hue,S,0).toString().split(',');
				var arr6= convert.hsv_rgb(Line.Hue,S,100).toString().split(',');
				var value = document.getElementById('valueGradient');
				value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';

    			var arrXYZ = conXYZ.rgb_xyz(arr1[0],arr1[1],arr1[2]).toString().split(',');
		
				var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
				
				document.getElementById("alert").value = "";
				document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
				document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
				document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2]; 





			}
			
			block.onclick = function(e){Block.cPos(e);}
			block.onmousedown  = function (){
			document.onmousemove = function (e){
				bPstX = Obj.positX(block);
				bPstY = Obj.positY(block);
				Block.cPos(e);
				}
			}

			document.onmouseup=function() {
				document.onmousemove = null;
				}
		}
		
		};

var convert = {
	
	hsv_rgb: function (H,S,V){
	 
	 var f , p, q , t, lH, R, G, B;
   
	  S /=100;
      V /=100;
     
	 lH = Math.floor(H / 60);
      
	  f = H/60 - lH;
        p = V * (1 - S); 
         q = V *(1 - S*f);
	       t = V* (1 - (1-f)* S);
      
	  switch (lH){
      
	  case 0: R = V; G = t; B = p; break;
      case 1: R = q; G = V; B = p; break;
      case 2: R = p; G = V; B = t; break;
      case 3: R = p; G = q; B = V; break;
      case 4: R = t; G = p; B = V; break;
      case 5: R = V; G = p; B = q; break;
  	}     

	 return [parseInt(R*255), parseInt(G*255), parseInt(B*255)];
	 }
		
	};	

var conXYZ = {

	rgb_xyz: function (R,G,B){

		var var_R, var_G, var_B, X, Y, Z;
		var_R = ( R / 255.0 );        //R from 0 to 255
		var_G = ( G / 255.0 );        //G from 0 to 255
		var_B = ( B / 255.0 );        //B from 0 to 255

		if ( var_R > 0.04045 ) 
			var_R = Math.pow(( ( var_R + 0.055 ) / 1.055 ) , 2.4);
		else                   
			var_R = var_R / 12.92;
		if ( var_G > 0.04045 ) 
			var_G = Math.pow(( ( var_G + 0.055 ) / 1.055 ) , 2.4);
		else                   
			var_G = var_G / 12.92;
		if ( var_B > 0.04045 ) 
			var_B = Math.pow(( ( var_B + 0.055 ) / 1.055 ) , 2.4);
		else                   
			var_B = var_B / 12.92;

		var_R = var_R * 100;
		var_G = var_G * 100;
		var_B = var_B * 100;

		//Observer. = 2°, Illuminant = D65
		X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
		Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
		Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;
		return [X, Y, Z];
	}
}
var conLUV={
	xyz_luv: function(X,Y,Z){
		var un, vn, yn, xk, yk, zk, uk, vk, L, U,V;
		//document.getElementById("GBR").value = (+4.0*a)/(+a+(+15.0*b)+(+3.0*c));
		un = ( +4.0 * X ) / ( +X + ( +15.0 * Y ) + ( +3.0 * Z ) );
		vn = ( +9 * Y ) / ( +X + ( +15 * Y ) + ( +3 * Z ) );

		yn = Y / 100.0;
		if ( yn > 0.008856 ) 
			yn = Math.pow(yn , ( 1/3.0 ));
		else                    
			yn = ( 7.787 * yn ) + ( 16 / 116.0 );

		xk =  95.047;        //Observer= 2°, Illuminant= D65
		yk = 100.000;
		zk = 108.883;

		uk= ( 4 * xk ) / ( xk + ( 15 * yk ) + ( 3 * zk ) );
		vk = ( 9 * yk ) / ( xk + ( 15 * yk) + ( 3 * zk));

		L = ( 116 * yn ) - 16;;
		U = 13 * L * ( un - uk )
		V = 13 *L * ( vn - vk );
		
		return [L.toFixed(3),U.toFixed(3), V.toFixed(3)];

	}
}
conXYZ_RGB={
	xyz_rgb: function(X,Y,Z){
		var var_X, var_Y, var_Z, var_R, var_G, var_B;
		var_X = X / 100.0;        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
		var_Y = Y / 100.0;        //Y from 0 to 100.000
		var_Z = Z / 100.0;        //Z from 0 to 108.883

		var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
		var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
		var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;

		if ( var_R > 0.0031308 ) 
			var_R = 1.055 * ( Math.pow(var_R , ( 1 / 2.4 ) )) - 0.055;
		else                     
			var_R = 12.92 * var_R;
		if ( var_G > 0.0031308 ) 
			var_G = 1.055 * ( Math.pow(var_G ,( 1 / 2.4 )) ) - 0.055;
		else                     
			var_G = 12.92 * var_G;
		if ( var_B > 0.0031308 ) 
			var_B = 1.055 * (Math.pow( var_B, ( 1 / 2.4 )) ) - 0.055;
		else                     
			var_B = 12.92 * var_B;

		R = var_R * 255;
		G = var_G * 255;
		B = var_B * 255;
		return[parseInt(R), parseInt(G), parseInt(B)];
	}
}
	var cmy ={
		 rgb_cmy: function (R,G,B){
	 	var C, M, Y;
	 	C = 1 - ( R / 255 );
		M = 1 - ( G / 255 );
		Y = 1 - ( B / 255 );
		return [parseInt(C), parseInt(M), parseInt(Y)];
	 }
	};
	var conLUV_XYZ={

		luv_xyz: function (L,U,V){
			var var_Y, var_U, var_V, ref_U, ref_V, ref_X, ref_Y, ref_Z;
			var_Y = ( +L + 16 ) / 116;
			if ( Math.pow(var_Y,3) > 0.008856 ) 
				var_Y = Math.pow(var_Y,3);
			else                      
				var_Y = ( var_Y - 16 / 116 ) / 7.787;

			ref_X =  95.047;      //Observer= 2°, Illuminant= D65
			ref_Y = 100.000;
			ref_Z = 108.883;

			ref_U = ( 4 * ref_X ) / ( +ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );
			ref_V = ( 9 * ref_Y ) / ( +ref_X + ( 15 * ref_Y ) + ( 3 * ref_Z ) );

			var_U = U / ( 13 * L ) + ref_U;
			var_V = V / ( 13 * L ) + ref_V;

			Y = var_Y * 100;
			X =  - ( 9 * Y * var_U ) / ( ( +var_U - 4 ) * var_V  - var_U * var_V );
			Z = ( 9 * Y - ( 15 * var_V * Y ) - ( +var_V * X ) ) / ( 3 * var_V );
		

			return [X,Y,Z];


		}
	}
	var conver ={
		rgb_hsv:function(R,G,B){
			var var_R, var_G, var_B, var_Min, var_Max, del_Max, V, H, S, del_R, del_G, del_B;
			var_R = ( R / 255.0 );                     //RGB from 0 to 255
			var_G = ( G / 255.0 );
			var_B = ( B / 255.0 );

			var_Min = Math.min( var_R, var_G, var_B );    //Min. value of RGB
			var_Max = Math.max( var_R, var_G, var_B );    //Max. value of RGB
			del_Max = var_Max - var_Min;             //Delta RGB value 

			V = var_Max;

			if ( del_Max == 0 )                     //This is a gray, no chroma...
			{
			   H = 0;                                //HSV results from 0 to 1
			   S = 0;
			}
			else                                    //Chromatic data...
			{
			   S = del_Max / var_Max;

			   del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
			   del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
			   del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

			   if      ( var_R == var_Max ) 
			   		H = del_B - del_G;
			   else if ( var_G == var_Max ) 
			   		H = ( 1 / 3 ) + del_R - del_B;
			   else if ( var_B == var_Max ) 
			   		H = ( 2 / 3 ) + del_G - del_R;

			   if ( H < 0 ) 
			   		H += 1;
			   if ( H > 1 ) 
			   		H -= 1;
			}
			return [parseInt(H*360), parseInt(S*100), parseInt(V*100)];
		}
	}
	function changeColor() {
		var rd, gr, bl;
    	rd = document.getElementById("red1").value = document.getElementById("redSlider").value;
    	gr = document.getElementById("green1").value = document.getElementById("greenSlider").value;
    	bl = document.getElementById("blue1").value = document.getElementById("blueSlider").value;
    	
    	//picker.out_color.style.backgroundColor = "#"+rd.toString(16)+gr.toString(16)+bl.toString(16);
    	
    	//rgb.redGradient.style.backgroundColor = "#A4F798";
    	//document.getElementById("CMY").value = cmy.rgb_cmy(rd,gr,bl);
    	var arr = [1-(rd/255),1-(gr/255),1-(bl/255)];
    	document.getElementById("alert").value = "";
    	
    	document.getElementById("cyan").value = document.getElementById("cyanSlider").value = arr[0];
    	document.getElementById("magenta").value = document.getElementById("magentaSlider").value = arr[1];
    	document.getElementById("yellow").value = document.getElementById("yellowSlider").value = arr[2];

    	//document.getElementById("CMY").value = "RGB" + conver.rgb_hsv(rd, gr, bl);
    	var arr1 = 	conver.rgb_hsv(rd, gr, bl).toString().split(",");
    	document.getElementById("hue").value = document.getElementById("hueSlider").value = arr1[0];
    	document.getElementById("s").value = document.getElementById("sSlider").value = arr1[1];
    	document.getElementById("v").value = document.getElementById("vSlider").value = arr1[2];
    	var id_elements = {primary: "primary_block", arrows: "arrows", block: "block_picker", circle: "circle", line: "line"}; 


   
		
		block_picker.style.backgroundColor = "rgb("+convert.hsv_rgb(arr1[0],arr1[1],arr1[2])+")";
    
     	picker.out_color.style.backgroundColor = "rgb("+rd+", "+gr+", "+bl+")";
     	//document.getElementById("HEX").value = rgbToHex(rd,gr,bl);

     	var red = document.getElementById('redGradient');
		red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+gr+", "+bl+")"+ ', ' + "rgb("+255+", "+gr+", "+bl+")" + ')';
		var green = document.getElementById('greenGradient');
		green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+0+", "+bl+")"+ ', ' + "rgb("+rd+", "+255+", "+bl+")" + ')';
		var blue = document.getElementById('blueGradient');
		blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+0+")"+ ', ' + "rgb("+rd+", "+gr+", "+255+")" + ')';

		var cyan = document.getElementById('cyanGradient');
		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+gr+", "+bl+")"+ ', ' + "rgb("+0+", "+gr+", "+bl+")" + ')';
		var magenta = document.getElementById('magentaGradient');
		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+255+", "+bl+")"+ ', ' + "rgb("+rd+", "+0+", "+bl+")" + ')';
		var yellow = document.getElementById('yellowGradient');
		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+255+")"+ ', ' + "rgb("+rd+", "+gr+", "+0+")" + ')';

		var hue = document.getElementById('hueGradient');
		hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
		+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
		
		var arr6= conver.rgb_hsv(rd,gr,bl).toString().split(',');
		var arr3= convert.hsv_rgb(arr6[0],0,arr6[2]).toString().split(',');
		var arr4= convert.hsv_rgb(arr6[0],100,arr6[2]).toString().split(',');
		var saturation = document.getElementById('saturationGradient');
		saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';
		var arr5= convert.hsv_rgb(arr6[0],arr6[1],0).toString().split(',');
		var arr6= convert.hsv_rgb(arr6[0],arr6[1],100).toString().split(',');
		var value = document.getElementById('valueGradient');
		value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';

		var arrXYZ = conXYZ.rgb_xyz(rd,gr,bl).toString().split(',');
		
		var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
		
		
		document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
		document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
		document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2];

		var arrX = conLUV_XYZ.luv_xyz(arrLUV[0],arrLUV[1],arrLUV[2]);
		
		

		
		document.getElementById("HEX").value =rgbToHex(rd,gr,bl);
		//document.getElementById("GBR").value = arrXYZ[0]+ ", " + arrXYZ[1] + ", " + arrXYZ[2];





   }
  	function changeText() {
		var rd, gr, bl;

    	document.getElementById("redSlider").value = rd = document.getElementById("red1").value;
    	document.getElementById("greenSlider").value = gr = document.getElementById("green1").value;
    	document.getElementById("blueSlider").value = bl = document.getElementById("blue1").value;

    	var arr = [1-(rd/255),1-(gr/255),1-(bl/255)];
    	document.getElementById("cyan").value = document.getElementById("cyanSlider").value = arr[0];
    	document.getElementById("magenta").value = document.getElementById("magentaSlider").value = arr[1];
    	document.getElementById("yellow").value = document.getElementById("yellowSlider").value = arr[2];

    	var arr1 = 	conver.rgb_hsv(rd, gr, bl).toString().split(",");
    	document.getElementById("hue").value = document.getElementById("hueSlider").value = arr1[0];
    	document.getElementById("s").value = document.getElementById("sSlider").value = arr1[1];
    	document.getElementById("v").value = document.getElementById("vSlider").value = arr1[2];

    	document.getElementById("HEX").value = rgbToHex(rd,gr,bl);
    	picker.out_color.style.backgroundColor = "rgb("+rd+", "+gr+", "+bl+")";
    	block_picker.style.backgroundColor = "rgb("+convert.hsv_rgb(arr1[0],arr1[1],arr1[2])+")";

    	var red = document.getElementById('redGradient');
		red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+gr+", "+bl+")"+ ', ' + "rgb("+255+", "+gr+", "+bl+")" + ')';
		var green = document.getElementById('greenGradient');
		green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+0+", "+bl+")"+ ', ' + "rgb("+rd+", "+255+", "+bl+")" + ')';
		var blue = document.getElementById('blueGradient');
		blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+0+")"+ ', ' + "rgb("+rd+", "+gr+", "+255+")" + ')';

		var cyan = document.getElementById('cyanGradient');
		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+gr+", "+bl+")"+ ', ' + "rgb("+0+", "+gr+", "+bl+")" + ')';
		var magenta = document.getElementById('magentaGradient');
		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+255+", "+bl+")"+ ', ' + "rgb("+rd+", "+0+", "+bl+")" + ')';
		var yellow = document.getElementById('yellowGradient');
		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+255+")"+ ', ' + "rgb("+rd+", "+gr+", "+0+")" + ')';

		var hue = document.getElementById('hueGradient');
		hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
		+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
		var arr6= conver.rgb_hsv(rd,gr,bl).toString().split(',');
		var arr3= convert.hsv_rgb(arr6[0],0,arr6[2]).toString().split(',');
		var arr4= convert.hsv_rgb(arr6[0],100,arr6[2]).toString().split(',');
		var saturation = document.getElementById('saturationGradient');
		saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';
		var arr5= convert.hsv_rgb(arr6[0],arr6[1],0).toString().split(',');
		var arr6= convert.hsv_rgb(arr6[0],arr6[1],100).toString().split(',');
		var value = document.getElementById('valueGradient');
		value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';
   		
   		var arrXYZ = conXYZ.rgb_xyz(rd,gr,bl).toString().split(',');
		
		var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
		document.getElementById("alert").value = "";
		
		document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
		document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
		document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2];
   }
	function changeCMYColor(){
		var cn, yw, ma;
    	cn = document.getElementById("cyan").value =  document.getElementById("cyanSlider").value;
    	ma = document.getElementById("magenta").value = document.getElementById("magentaSlider").value;
    	yw = document.getElementById("yellow").value = document.getElementById("yellowSlider").value
    	
    	//picker.out_color.style.backgroundColor = "#"+rd.toString(16)+gr.toString(16)+bl.toString(16);
    	//picker.out_color.style.backgroundColor = "rgb("+rd+", "+gr+", "+bl+")";
    	//rgb.redGradient.style.backgroundColor = "#A4F798";
    	
    	var arr = [(1-cn)*255,(1-ma)*255,(1-yw)*255];
    	document.getElementById("redSlider").value = document.getElementById("red1").value = parseInt(arr[0]);
    	document.getElementById("greenSlider").value = document.getElementById("green1").value = parseInt(arr[1]);
    	document.getElementById("blueSlider").value = document.getElementById("blue1").value = parseInt(arr[2]);

    	var arr1 = 	conver.rgb_hsv(arr[0], arr[1], arr[2]).toString().split(",");
    	document.getElementById("hue").value = document.getElementById("hueSlider").value = arr1[0];
    	document.getElementById("s").value = document.getElementById("sSlider").value = arr1[1];
    	document.getElementById("v").value = document.getElementById("vSlider").value = arr1[2];

    	picker.out_color.style.backgroundColor = "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")";
    	document.getElementById("HEX").value = rgbToHex(arr[0],arr[1],arr[2]);
    	block_picker.style.backgroundColor = "rgb("+convert.hsv_rgb(arr1[0],arr1[1],arr1[2])+")";

    	var red = document.getElementById('redGradient');
		red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")"+ ', ' + "rgb("+255+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")" + ')';
		var green = document.getElementById('greenGradient');
		green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+parseInt(arr[0])+", "+0+", "+parseInt(arr[2])+")"+ ', ' + "rgb("+parseInt(arr[0])+", "+255+", "+parseInt(arr[2])+")" + ')';
		var blue = document.getElementById('blueGradient');
		blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+0+")"+ ', ' + "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+255+")" + ')';

		
		var cyan = document.getElementById('cyanGradient');
		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")" + ')';
		var magenta = document.getElementById('magentaGradient');
		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")" + ')';
		var yellow = document.getElementById('yellowGradient');
		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")" + ')';

		var hue = document.getElementById('hueGradient');
		hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
		+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
   		var arr6= conver.rgb_hsv(arr[0],arr[1],arr[2]).toString().split(',');
		var arr3= convert.hsv_rgb(arr6[0],0,arr6[2]).toString().split(',');
		var arr4= convert.hsv_rgb(arr6[0],100,arr6[2]).toString().split(',');
		var saturation = document.getElementById('saturationGradient');
		saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';
		var arr5= convert.hsv_rgb(arr6[0],arr6[1],0).toString().split(',');
		var arr6= convert.hsv_rgb(arr6[0],arr6[1],100).toString().split(',');
		var value = document.getElementById('valueGradient');
		value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';

		var arrXYZ = conXYZ.rgb_xyz(arr[0],arr[1],arr[2]).toString().split(',');
		
		var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
		
		
		document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
		document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
		document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2];
		document.getElementById("alert").value = "";
   };
   function changeHSVColor(){
   		var hue, s, v, rd, gr, bl;

   		document.getElementById("hue").value = hue = document.getElementById("hueSlider").value;
   		document.getElementById("s").value = s = document.getElementById("sSlider").value;
   		document.getElementById("v").value = v = document.getElementById("vSlider").value;
   		
   		var arr = convert.hsv_rgb(hue,s,v).toString().split(',');
        document.getElementById("redSlider").value = document.getElementById('red1').value = rd = arr[0];
        document.getElementById("greenSlider").value = document.getElementById('green1').value = gr = arr[1];
        document.getElementById("blueSlider").value = document.getElementById('blue1').value = bl = arr[2];
        
        var arr1 = [1-(rd/255),1-(gr/255),1-(bl/255)];
    	document.getElementById("cyan").value = document.getElementById("cyanSlider").value = arr1[0];
    	document.getElementById("magenta").value = document.getElementById("magentaSlider").value = arr1[1];
    	document.getElementById("yellow").value = document.getElementById("yellowSlider").value = arr1[2];
    	picker.out_color.style.backgroundColor = "rgb("+rd+", "+gr+", "+bl+")";
    	document.getElementById("HEX").value = rgbToHex(rd,gr,bl);
    	block_picker.style.backgroundColor = "rgb("+convert.hsv_rgb(hue,s,v)+")";

    	var red = document.getElementById('redGradient');
		red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+gr+", "+bl+")"+ ', ' + "rgb("+255+", "+gr+", "+bl+")" + ')';
		var green = document.getElementById('greenGradient');
		green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+0+", "+bl+")"+ ', ' + "rgb("+rd+", "+255+", "+bl+")" + ')';
		var blue = document.getElementById('blueGradient');
		blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+0+")"+ ', ' + "rgb("+rd+", "+gr+", "+255+")" + ')';

		var cyan = document.getElementById('cyanGradient');
		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+gr+", "+bl+")"+ ', ' + "rgb("+0+", "+gr+", "+bl+")" + ')';
		var magenta = document.getElementById('magentaGradient');
		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+255+", "+bl+")"+ ', ' + "rgb("+rd+", "+0+", "+bl+")" + ')';
		var yellow = document.getElementById('yellowGradient');
		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+rd+", "+gr+", "+255+")"+ ', ' + "rgb("+rd+", "+gr+", "+0+")" + ')';

		var hue = document.getElementById('hueGradient');
		hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
		+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
		var arr6= conver.rgb_hsv(rd,gr,bl).toString().split(',');
		var arr3= convert.hsv_rgb(arr6[0],0,arr6[2]).toString().split(',');
		var arr4= convert.hsv_rgb(arr6[0],100,arr6[2]).toString().split(',');
		var saturation = document.getElementById('saturationGradient');
		saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';
		var arr5= convert.hsv_rgb(arr6[0],arr6[1],0).toString().split(',');
		var arr6= convert.hsv_rgb(arr6[0],arr6[1],100).toString().split(',');
		var value = document.getElementById('valueGradient');
		value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';

		var arrXYZ = conXYZ.rgb_xyz(rd,gr,bl).toString().split(',');
		
		var arrLUV = conLUV.xyz_luv(arrXYZ[0],arrXYZ[1],arrXYZ[2]).toString().split(',');
		document.getElementById("alert").value = "";
		
		
		document.getElementById("lSlider").value = document.getElementById("l").value = arrLUV[0];
		document.getElementById("uSlider").value = document.getElementById("u").value = arrLUV[1];
		document.getElementById("vvSlider").value = document.getElementById("vv").value = arrLUV[2];



   }

   function changeLUVColor(){
   		var rd, gr, bl, cn, ma, yw, h, s, w, l, u, vv;
   		l = document.getElementById("l").value = document.getElementById("lSlider").value;
   		u = document.getElementById("u").value = document.getElementById("uSlider").value;
   		v = document.getElementById("vv").value = document.getElementById("vvSlider").value;

   		var arrluv_xyz = conLUV_XYZ.luv_xyz(l,u,v).toString().split(',');
   		var arr = conXYZ_RGB.xyz_rgb(arrluv_xyz[0],arrluv_xyz[1],arrluv_xyz[2]).toString().split(',');


    	document.getElementById("redSlider").value = document.getElementById("red1").value = parseInt(arr[0]);
    	document.getElementById("greenSlider").value = document.getElementById("green1").value = parseInt(arr[1]);
    	document.getElementById("blueSlider").value = document.getElementById("blue1").value = parseInt(arr[2]);

    	var arr1 = 	conver.rgb_hsv(arr[0], arr[1], arr[2]).toString().split(",");
    	document.getElementById("hue").value = document.getElementById("hueSlider").value = arr1[0];
    	document.getElementById("s").value = document.getElementById("sSlider").value = arr1[1];
    	document.getElementById("v").value = document.getElementById("vSlider").value = arr1[2];
    	if(parseInt(document.getElementById("red1").value)<0){
    		document.getElementById("alert").value="Overflow";
    		
    		
    	}
    	else if(parseInt(document.getElementById("green1").value)<0){
    		document.getElementById("alert").value="Overflow";
    		
    		
    	}
    	
		else if(parseInt(document.getElementById("blue1").value)<0){
			document.getElementById("alert").value="Overflow";   		
    		
    	}
    	else if(parseInt(document.getElementById("red1").value)>255){
    		document.getElementById("alert").value="Overflow";
    		
    		
    	}
    	
		else if(parseInt(document.getElementById("green1").value)>255){
			document.getElementById("alert").value="Overflow";   		
    		
    	}
    	else if(parseInt(document.getElementById("blue1").value)>255){
    		document.getElementById("alert").value="Overflow";
    		
    		
    	}
    	
		else{
    		document.getElementById("alert").value=""; 

    	}
    	


    	

    	

    	var arrCMY = [1-(arr[0]/255),1-(arr[1]/255),1-(arr[2]/255)];
    	
    	document.getElementById("cyan").value = 1-(arr[0]/255);
    	document.getElementById("magenta").value = 1-(arr[1]/255);
    	document.getElementById("yellow").value = 1-(arr[2]/255);
    	document.getElementById("cyanSlider").value = arr[0];
    	document.getElementById("magentaSlider").value = arr[1];
    	document.getElementById("yellowSlider").value = arr[2];

    	picker.out_color.style.backgroundColor = "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")";
    	document.getElementById("HEX").value = rgbToHex(arr[0],arr[1],arr[2]);
    	block_picker.style.backgroundColor = "rgb("+convert.hsv_rgb(arr1[0],arr1[1],arr1[2])+")";


    	

    	var red = document.getElementById('redGradient');
		red.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+0+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")"+ ', ' + "rgb("+255+", "+parseInt(arr[1])+", "+parseInt(arr[2])+")" + ')';
		var green = document.getElementById('greenGradient');
		green.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+parseInt(arr[0])+", "+0+", "+parseInt(arr[2])+")"+ ', ' + "rgb("+parseInt(arr[0])+", "+255+", "+parseInt(arr[2])+")" + ')';
		var blue = document.getElementById('blueGradient');
		blue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+0+")"+ ', ' + "rgb("+parseInt(arr[0])+", "+parseInt(arr[1])+", "+255+")" + ')';
		
		var cyan = document.getElementById('cyanGradient');
		cyan.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+arr[1]+", "+arr[2]+")"+ ', ' + "rgb("+0+", "+arr[1]+", "+arr[2]+")" + ')';
		var magenta = document.getElementById('magentaGradient');
		magenta.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+255+", "+arr[2]+")"+ ', ' + "rgb("+arr[0]+", "+0+", "+arr[2]+")" + ')';
		var yellow = document.getElementById('yellowGradient');
		yellow.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr[0]+", "+arr[1]+", "+255+")"+ ', ' + "rgb("+arr[0]+", "+arr[1]+", "+0+")" + ')';

		var hue = document.getElementById('hueGradient');
		hue.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+255+", "+0+", "+0+")"+ ', ' + "rgb("+255+", "+255+", "+0+")"+ ', ' 
		+ "rgb("+0+", "+255+", "+0+")"+ ', ' + "rgb("+0+", "+255+", "+255+")"+ ', ' + "rgb("+0+", "+0+", "+255+")" + ', ' + "rgb("+255+", "+0+", "+255+")"+ ', ' + "rgb("+255+", "+0+", "+0+")"+ ')';
   		var arr6= conver.rgb_hsv(arr[0],arr[1],arr[2]).toString().split(',');
		var arr3= convert.hsv_rgb(arr6[0],0,arr6[2]).toString().split(',');
		var arr4= convert.hsv_rgb(arr6[0],100,arr6[2]).toString().split(',');
		var saturation = document.getElementById('saturationGradient');
		saturation.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr3[0]+", "+arr3[1]+", "+arr3[2]+")"+ ', ' + "rgb("+arr4[0]+", "+arr4[1]+", "+arr4[2]+")" + ')';
		var arr5= convert.hsv_rgb(arr6[0],arr6[1],0).toString().split(',');
		var arr6= convert.hsv_rgb(arr6[0],arr6[1],100).toString().split(',');
		var value = document.getElementById('valueGradient');
		value.style.backgroundImage = '-webkit-linear-gradient(left, ' + "rgb("+arr5[0]+", "+arr5[1]+", "+arr5[2]+")"+ ', ' + "rgb("+arr6[0]+", "+arr6[1]+", "+arr6[2]+")" + ')';


   }

function rgbToHex(R,G,B) {return "#"+toHex(R)+toHex(G)+toHex(B)}

function toHex(n) {
	 n = parseInt(n,10);
	 if (isNaN(n)) return "00";
	 n = Math.max(0,Math.min(n,255));
	 return "0123456789ABCDEF".charAt((n-n%16)/16)
	      + "0123456789ABCDEF".charAt(n%16);
}