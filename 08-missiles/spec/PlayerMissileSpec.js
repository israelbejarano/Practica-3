/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/

describe ("testeo la clase missile", function(){
	it("testeo el step", function(){
		SpriteSheet.map = {
			missile: {sx:0, sy:30, w:2, h:10, frames:1}
		};
		var tablero = {
			remove: function(){return 1},
		};
		var tomahawk = new PlayerMissile(2,2);
		tomahawk.board = tablero;
		tomahawk.step(1);
		expect(tomahawk.y).toEqual(-708);
	});
});
