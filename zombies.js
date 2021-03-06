/**
 * Class => Item(name)
 * -----------------------------
 * Creates an item.
 *
 * @name Item
 * @param {string} name     The item's name.
 * @property {string} name
 */
function Item(name){

  this.name = name;
}

/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call 
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */
function Weapon(name,damage){

  this.damage = damage;

  Item.call(this,name);

}

Weapon.prototype = Object.create(Item.prototype,{ contructor : { value:Item}});
/**
 * Weapon Extends Item Class
 * -----------------------------
 */



/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call 
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */

 function Food(name,energy){

 
  this.energy = energy;

  Item.call(this,name);

 }

 Food.prototype = Object.create(Item.prototype,{constructor : { value : Item }});
/**
 * Food Extends Item Class
 * -----------------------------
 */



/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */

 function Player(name,health,strength,speed){

  var pack = [];
  this.getPack = function(){

    return pack;
  };
  

  var maxHealth = health;

  this.getMaxHealth = function(){

    return maxHealth;
  };

  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  this.equipped = false;



 }


 
 
/**

 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */

Player.prototype.checkPack = function(){

  var list =this.getPack().reduce(function(curr,next){

      return curr + next;

  },"");

  console.log(list);

};
/**
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
 */

Player.prototype.takeItem = function(item){

  

  if(this.getPack().length < 3){

    console.log(this.name, item , "is a success!");
    this.getPack().push(item);
    return true;
    
  }
  else {
    console.log("failure to store: pack is full");
    return false;

}
};/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 *
 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
 */
Player.prototype.discardItem = function(item){


  if(this.getPack().indexOf(item) !== -1){

      this.getPack().splice(this.getPack().indexOf(item),1);
      console.log("Player discards" +item.name);
      return true;
  }
  else {
    console.log("Failure: unsuccessful" + item.name);
    return false;
  }

};



/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */
Player.prototype.equip =  function(itemToEquip){

 
    if (this.getPack().indexOf(itemToEquip) >=0 && itemToEquip instanceof Weapon && this.equipped === false){


      this.discardItem(itemToEquip);


      
      this.equipped = itemToEquip;
    

  }
  

   else if(this.getPack().indexOf(itemToEquip) >=0 && itemToEquip instanceof Weapon){

      this.takeItem(this.equipped);
      this.discardItem(itemToEquip);
      this.equipped = itemToEquip;
    }

    else {

      return false;
    }


};

/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */
Player.prototype.eat = function(itemToEat){
  if(itemToEat instanceof Food && this.getPack().indexOf(itemToEat)>=0 ){

     if((this.health +itemToEat.energy) > this.getMaxHealth()){

        this.health = this.getMaxHealth();

      
     }

     else{

        this.health += itemToEat.energy;


     }
        this.discardItem(itemToEat);
  }
  else {

    return false;
  }
};
/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
 */
  Player.prototype.useItem = function(item){

    if(item instanceof Weapon){

      this.equip(item);
    }

    else if(item instanceof Food){

      this.eat(item);
    }

    else {

      return false;
    }

  };


/**
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.
 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */
Player.prototype.equippedWith = function(){

  if(this.equipped === false){
    console.log(this.name + "Not equip with this.");
    return false;
  }

  else {

    console.log(this.name + " is equipped with " + this.equipped.name);
    return this.equipped.name;
  }

};

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */

function Zombie(health,strength,speed){

  this.health = health;
  this.strength = strength;
  this.speed = speed;

  var maxHealth = health;
  this.isAlive = true;


}
/**
 * Class => FastZombie(health, strength, speed)
 * -----------------------------
 * Creates a fast zombie.
 *
 * The FastZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name FastZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

function FastZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

FastZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});
/**
 * FastZombie Extends Zombie Class
 * -----------------------------
<<<<<<< HEAD
 */



/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function StrongZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

StrongZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});

/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */



/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */
function RangedZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

RangedZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});


/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call 
=======
 */



/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call 
>>>>>>> zombie_origin/master
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function ExplodingZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

ExplodingZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});

/**
<<<<<<< HEAD
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */




/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  // var player = new Player("Joan", 500, 30, 70);
  // var zombie = new Zombie(40, 50, 20);
  // var charger = new FastZombie(175, 25, 60);
  // var tank = new StrongZombie(250, 100, 15);
  // var spitter = new RangedZombie(150, 20, 20);
  // var boomer = new ExplodingZombie(50, 15, 10);

  // var shovel = new Weapon("shovel", 15);
  // var sandwich = new Food("sandwich", 30);
  // var chainsaw = new Weapon("chainsaw", 25);

  // player.takeItem(shovel);
  // player.takeItem(sandwich);
  // player.takeItem(chainsaw);
  // player.discardItem(new Weapon("scythe", 21));
  // player.discardItem(shovel);
  // player.checkPack();
  // player.takeItem(shovel);
  // player.checkPack();

  // player.equippedWith();
  // player.useItem(chainsaw);
  // player.equippedWith();
  // player.checkPack();

  // player.useItem(shovel);
  // player.equippedWith();
  // player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();
}


//==============================================================


function Item(name){

  this.name = name;
}

/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call 
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */
function Weapon(name,damage){

  this.damage = damage;

  Item.call(this,name);

}

Weapon.prototype = Object.create(Item.prototype,{ contructor : { value:Item}});
/**
 * Weapon Extends Item Class
=======
 * StrongZombie Extends Zombie Class
>>>>>>> zombie_origin/master
 * -----------------------------
 */




/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call 
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */

 function Food(name,energy){

 
  this.energy = energy;

  Item.call(this,name);

 }

 Food.prototype = Object.create(Item.prototype,{constructor : { value : Item }});
/**
 * Food Extends Item Class
 * -----------------------------
 */



/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */

 function Player(name,health,strength,speed){

  var pack = [];
  this.getPack = function(){

    return pack;
  };
  

  var maxHealth = health;

  this.getMaxHealth = function(){

    return maxHealth;
  };

  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  this.equipped = false;



 }


 
 
/**
 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */

Player.prototype.checkPack = function(){

  var list =this.getPack().reduce(function(curr,next){

      return curr + " " + next.name;

  },"");


  console.log("pack contents:",list);

};
/**
<<<<<<< HEAD
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
=======
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
>>>>>>> zombie_origin/master
 */

Player.prototype.takeItem = function(item){


  

  if(this.getPack().length < 3){

    console.log(this.name, " is a success!");
    this.getPack().push(item);
    return true;
    
  }
  else {
    console.log("failure to store: pack is full");
    return false;

}
};/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 *
 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
=======
/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
>>>>>>> zombie_origin/master
 */
Player.prototype.discardItem = function(item){


  if(this.getPack().indexOf(item) !== -1){

      this.getPack().splice(this.getPack().indexOf(item),1);
      console.log("Player discards " +item.name);
      return true;
  }
  else {
    console.log("Failure: unsuccessful" + item.name);
    return false;
  }

};




/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */
Player.prototype.equip =  function(itemToEquip){

 
    if (this.getPack().indexOf(itemToEquip) >=0 && itemToEquip instanceof Weapon && this.equipped === false){


      this.discardItem(itemToEquip);


      
      this.equipped = itemToEquip;
    

  }
  

   else if(this.getPack().indexOf(itemToEquip) >=0 && itemToEquip instanceof Weapon){

      this.takeItem(this.equipped);
      this.discardItem(itemToEquip);
      this.equipped = itemToEquip;
    }

    else {

      return false;
    }


};

/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */
Player.prototype.eat = function(itemToEat){
  if(itemToEat instanceof Food && this.getPack().indexOf(itemToEat)>=0 ){

     if((this.health +itemToEat.energy) > this.getMaxHealth()){

        this.health = this.getMaxHealth();

      
     }

     else{

        this.health += itemToEat.energy;


     }
        this.discardItem(itemToEat);
  }
  else {

    return false;
  }
};
/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
=======

/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
>>>>>>> zombie_origin/master
 */
  Player.prototype.useItem = function(item){

    if(item instanceof Weapon){

      this.equip(item);
    }

    else if(item instanceof Food){

      this.eat(item);
    }

    else {

      return false;
    }

  };


/**
<<<<<<< HEAD
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.
 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */
Player.prototype.equippedWith = function(){

  if(this.equipped === false){
    console.log(this.name + "Not equip with this.");
    return false;
  }

  else {

    console.log(this.name + " is equipped with " + this.equipped.name);
    return this.equipped.name;
  }

};

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */

function Zombie(health,strength,speed){

  this.health = health;
  this.strength = strength;
  this.speed = speed;

  var maxHealth = health;
  this.isAlive = true;


}
/**
 * Class => FastZombie(health, strength, speed)
 * -----------------------------
 * Creates a fast zombie.
 *
 * The FastZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name FastZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

function FastZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

FastZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});
/**
 * FastZombie Extends Zombie Class
=======
 * ExplodingZombie Extends Zombie Class
>>>>>>> zombie_origin/master
 * -----------------------------
 */




/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function StrongZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

StrongZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});

/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */



/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */


/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */
function RangedZombie(health,strength,speed){


    Zombie.call(this,health,strength,speed);
}

RangedZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});


/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call 
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function ExplodingZombie(health,strength,speed){



    Zombie.call(this,health,strength,speed);
}

ExplodingZombie.prototype = Object.create(Zombie.prototype,{contructor : { value : Zombie}});

/**
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */

function calculateAttackDamage(creature){

 var randomizer;

 if(creature instanceof ExplodingZombie){

    randomizer = Math.floor((Math.random() * 3) + 3);

   return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));

   
 }

 else if(creature instanceof RangedZombie){
   randomizer = Math.floor((Math.random() * 6) + 2);

   return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));

 }

 else if(creature instanceof StrongZombie){
  randomizer = Math.floor((Math.random() * 8) + 2);

  return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));


 }

 else if(creature instanceof FastZombie){

randomizer = Math.floor((Math.random() * 4) + 2);

  return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));

 }

 else if(creature instanceof Zombie){

    randomizer = Math.floor((Math.random() * 3) + 5);
    return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));

 }

 else{
    randomizer = Math.floor((Math.random() * 3) + 2);

    return Math.floor((creature.strength / randomizer) + (Math.log(creature.speed) / randomizer * 10));
 }
}

Zombie.prototype.takeDamage = function(damage){

  this.health-=damage;

  if(this.health<=0){

    this.isAlive = false;
    this.health = 0;
    console.log("zombie dead");
    return true;

  }
  

};

Player.prototype.attack = function(zombie){

  var base_damage = calculateAttackDamage(this);


  if(this.equippedWith()){
   
    console.log('Player attackes with ' + this.equipped.name);
    zombie.takeDamage(base_damage + this.equipped.damage);
    return  base_damage + this.equipped.damage;
  }
  else {
   
    console.log("Player attacks with no weapon");
    zombie.takeDamage(base_damage);
    return base_damage;
  }

  
};

Player.prototype.takeDamage = function(damage){

  this.health-=damage;

  if(this.health<=0){

    this.isAlive = false;
    this.health = 0;
    console.log("Game over");
    return true;

  }

  console.log("Took a hit");

};

Zombie.prototype.attack = function(player){

  
  var base_damage =  calculateAttackDamage(this);
  player.takeDamage(base_damage);
  console.log("zombie attacks", player.name);
  return base_damage;

};

FastZombie.prototype.charge= function(player){

  var base_damage = calculateAttackDamage(this);

  if(this.speed > player.speed){

      player.takeDamage(base_damage + Math.floor(base_damage/2));
      console.log( "FastZombie charges and gives more damage to ", player.name);
      return base_damage + Math.floor(base_damage/2);
  }
  else {
      player.takeDamage(base_damage);
      console.log("FastZombie charges against" , player.name);
      return base_damage;
  }

};

StrongZombie.prototype.crush = function(player){

  var base_damage = calculateAttackDamage(this);

  if(this.strength > player.strength){

    player.takeDamage(base_damage+ Math.floor(0.80 * base_damage));
    console.log("Powerful Strong zombie crushes with extra damage to " + player.name);
    return base_damage+ Math.floor(0.80 * base_damage);
  }

  else {

    player.takeDamage(base_damage);
    console.log("StrongZombie crushes " + player.name);
    return base_damage;
  }

};

RangedZombie.prototype.spit = function(player){

     var base_damage = calculateAttackDamage(this);

  if(player.health < (player.getMaxHealth()/2)){

    player.takeDamage(base_damage+ Math.floor(0.70 * base_damage));
    console.log("RangedZombie spits with extra damage against " + player.name);
    return base_damage+ Math.floor(0.70 * base_damage);
  }

  else {

    player.takeDamage(base_damage);
    console.log("RangedZombie spits at " + player.name);
    return base_damage;
  }



};


ExplodingZombie.prototype.explode = function(player){

     var base_damage = calculateAttackDamage(this);

  if(player.health < (player.getMaxHealth()/2) && (this.speed > player.speed)){

    player.takeDamage(base_damage+ (2 * base_damage));
    console.log("ZombieExploder explodes with extra damage to " , player.name);
     this.isAlive = false;
    this.health=0;
    return base_damage+ (2* base_damage);
  }

  else {

    player.takeDamage(base_damage);
    console.log("ZombieExploder explodes at ", player.name ," but dies.");
    this.isAlive = false;
    this.health=0;
    return base_damage;
  }



};
/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  var player = new Player("Joan", 500, 30, 70);
  var zombie = new Zombie(40, 50, 20);
  var charger = new FastZombie(175, 25, 60);
  var tank = new StrongZombie(250, 100, 15);
  var spitter = new RangedZombie(150, 20, 20);
  var boomer = new ExplodingZombie(50, 15, 10);


  var shovel = new Weapon("shovel", 15);
  var sandwich = new Food("sandwich", 30);
  var chainsaw = new Weapon("chainsaw", 25);

  player.takeItem(shovel);
  player.takeItem(sandwich);
  player.takeItem(chainsaw);
  player.discardItem(new Weapon("scythe", 21));
  player.discardItem(shovel);
  player.checkPack();
  player.takeItem(shovel);
  player.checkPack();

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  player.useItem(shovel);
  player.equippedWith();
  player.checkPack();


  player.health = 487;
  console.log("Before health: " + player.health);
  player.useItem(sandwich);
  console.log("After health: " + player.health);
  player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();

}


