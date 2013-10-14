/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Probar GameBoard", function(){

		it("testeo la funcion add", function(){
			var juego = new GameBoard();
			expect(juego.add(3)).toEqual(juego.objects[0]);
		});
		
		it("testeo la funcion remove, resetRemoved y finalizeRemoved", function(){
			var juego = new GameBoard();
			juego.resetRemoved();
			juego.remove(3);
			expect(3).toEqual(juego.removed[0]);
			
			//var resultado = juego.add(3);
			//juego.finalizeRemoved();
			//expect(3).toEqual(juego.removed[0]);
			expect(juego.objects).toEqual([]);
		});
		
		it ("testeo la funcion overlap", function(){
			var juego = new GameBoard();
			var rectangulo = function(x,y,w,h){
				this.x =x;
				this.y =y;
				this.w =w;
				this.h =h;
			}
			var rectangulo1 = new rectangulo(20,30,50,50);
			var rectangulo2 = new rectangulo(200,200,50,50);
			var rectangulo3 = new rectangulo(20,25,50,50);
			
			expect(juego.overlap(rectangulo1,rectangulo3)).toBe(true);
			expect(juego.overlap(rectangulo2,rectangulo3)).toBe(false);
		});
		it ("testeo las funcion iterate", function(){
			var juego = new GameBoard();
			var objetoprueba1 = {
				valor: 1,
				testeo: function(){
					return this.valor;
				}
			};
			var objetoprueba2 = {
				valor: 2,
				testeo: function(){
					return this.valor;
				}
			};
			
			spyOn(objetoprueba1,"testeo");
			spyOn(objetoprueba2,"testeo");
			juego.add(objetoprueba1);
			juego.add(objetoprueba2);
			juego.iterate("testeo");
			_.each(juego.objects, function(element, index, list){expect(element.testeo).toHaveBeenCalled()});
			
		});
		
		it ("testeo la funcion detect", function(){
			var juego = new GameBoard();
			
			var objetomaster = {
				valor: 5,
				testeo: function(){return this.valor}
			};
			
			var objetoprueba1 = {
				valor: 10
			};
			var objetoprueba2 = {
				valor: 15
			};
			juego.add(objetoprueba1);
			juego.add(objetoprueba2);
			
			var objetodetect = juego.detect(objetomaster.testeo);
			_.each(juego.objects, function(element, index, list){expect(list[0].valor).toEqual(objetodetect.valor)});
		});

});
