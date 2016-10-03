class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(length) {
    this.height; // ReferenceError, super должен быть вызыван первым!
    
    // Здесь, вызывается метод родительского класса конструктора с длинной
    // При условии Polygon's ширина и высота
    super(length, length);
    
    // Примичание: в производных классах, super() необходимо вызывать прежде чем
    // использывать 'this'. Если этого не сделать будет сообещние об ошибке ссылки.
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  } 
}