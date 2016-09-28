Object.prototype.dir = function(){console.dir(this)}

function Animal (name) {
    //console.log('test')
    this.name = name;
    this.speed = 0;
    this.hi = hi; 

    function hi () {
        console.log('Hi from this! ' + this.name);
    }
}

dog = new Animal('dog')

dog.hi()
dog.dir()

cat = new dog.__proto__.constructor('cat')

cat.hi()
cat.dir()

cow = new Animal('cow')

cow.hi()
cow.dir()

Animal.prototype.run = function(speed){
  this.speed += speed;
  console.log( this.name + ' бежит, скорость ' + this.speed );
}

Animal.prototype.stop = function() {
  this.speed = 0;
  console.log( this.name + ' стоит' );
};

dog.run(100)
cat.run(50)
cow.run(10)
dog.stop(100)
cat.stop(50)
cow.stop(10)

cow.dir()

console.log('this hasOwnProperty', cat.hasOwnProperty('hi'))

Animal.prototype.hi = function() {
  console.log('Hi from Animal.prototype! ' + this.name);
};

dog.hi()
cat.hi()
cow.hi()

delete cat.hi

console.log('this hasOwnProperty', cat.hasOwnProperty('hi'))
cat.hi()

delete Animal.prototype.hi

cat.dir()

// delete Object.prototype.hasOwnProperty

typeof(dog)
typeof(Animal)
typeof null

dog instanceof Animal
dog instanceof Object

function Rabbit(name) {
  this.name = name;
  this.speed = 0;
  this.hi = function() {
    this.speed++;
    console.log( this.name + ' прыгает' );
    }
}

Rabbit.prototype.hi = function() {
  this.speed++;
  console.log( this.name + ' прыгает' );
};

var rabbit = new Rabbit('Кроль');

rabbit.dir()


// не поддерживается в IE10-,
Rabbit.prototype.__proto__ = Animal.prototype;

rabbit.dir()

Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

rabbit.dir()

Rabbit.prototype = new Animal();

rabbit.dir()
