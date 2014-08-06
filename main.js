var players = [];

console.log("In this game there are three types of people: Person, Theif, Hacker.");
console.log("If you choose to be a Person you must select the following: name, occupation, pocket cash, stored cash, and your risk factor (scale1-10).");
console.log("Persons can gamble() and invest() but watch out for theives and hackers.");
console.log("Theives steal pocket change.  They must have an alis (must be the same as your name), skill (1-10), and pocket cash.");
console.log("Theives can steal(targetPerson).  But don't get caught, or you'll lose it all.");
console.log("Hackers steal from banking accounts.  They must have an name (must be the same as your name), skill (1-10), and stored cash.");
console.log("Hackers can hack(targetPerson). Don't get caught -- you won't fair well in prison.");

console.log("To log your character's score type name.addPlayerFunc to put your stats in the players array.");

//This funtion asks for players names and will push out their funds.
/*var playersToCheck = function() {
  console.log("Enter the names of the people, theives, and hackers that you would like to check their funds.  Do it one at a time.  To STOP enter \'Stop\'.")
  var nameOfPlayer = "";
  //Asks for names while each prompt matches a player object
  do {
    name = prompt("Enter a name:")
    //if the name exist as an object (the var name must match the name property)
    if (nameOfPlayer === nameOfPlayer.name) {
      players.push(nameofPlayer);
    }
    //Print the funds of each player
    else if (nameOfPlayer === "Stop") {
      console.log("Fill this in later");
    }
    else {
      console.log("Not a known person.  Try again.");
    }
  } while (!(nameOfPlayer === "Stop"));
};*/

//Constructor to create Accounts with an Owner, checking amount, savings, and private
function Account(inputPerson) {
  this.owner = inputPerson.name,
  this.checking = Math.round((inputPerson.storedCash * (inputPerson.riskFactor/20)) * 100) / 100,
  this.savings = Math.round((inputPerson.storedCash * (inputPerson.riskFactor/20)) * 100) / 100,
  this.secure = Math.round((inputPerson.storedCash * ((10 - inputPerson.riskFactor) / 10)) * 100) / 100,
  this.total = Math.round((this.checking + this.savings + this.secure) * 100) / 100,

  this.recalculateAccount = function () {
    this.checking = Math.round((inputPerson.storedCash * (inputPerson.riskFactor/20)) * 100) / 100,
    this.savings = Math.round((inputPerson.storedCash * (inputPerson.riskFactor/20)) * 100) / 100,
    this.secure = Math.round((inputPerson.storedCash * ((10 - inputPerson.riskFactor) / 10)) * 100) / 100,
    this.total = Math.round((this.checking + this.savings + this.secure) * 100) / 100
  }
};

//Constructor to create people
function Person(inputName, inputOccupation, inputPocketCash, inputStoredCash, inputRiskFactor) {
  this.name = inputName,
  this.occupation = inputOccupation,
  // this.accountName = this.name + "Account",
  // this.account = new account(this);
  this.pocketCash = inputPocketCash,
  this.storedCash = inputStoredCash,
  this.riskFactor = inputRiskFactor,
  this.accountInfo = new Account(this),
  this.accountReference = this.accountInfo,
  //Adds person to players array to check their values later on
  this.addPlayerFunc = function () {
    players.push(this.name + "\'s pocket cash is $" + this.pocketCash + " and his stored cash is $" + this.storedCash + ".");
  },
  //Gamble pockerCash to possibly earn more money.  The odds are good here.
  this.gamble = function() {
    var guess;
    //Tell player how much they have and ask for a bet.
    var bet = prompt("You have $" + this.pocketCash + ".  How much would you like to wager?");

    //If bet is good.  Let them continue.
    if (bet <= this.pocketCash) {
      guess = prompt("Okay. Now pick a number 1-10.  If you mess this up you lose all cash.");
    }
    //If bet is too large, put all in
    else if (bet > this.pocketCash) {
      guess = prompt("Thats more than you have. Guess you're all in.  Now pick a number 1-10. Don't mess up.");
    }
    //If bet is NaN, then put them all in.
    else {
      guess = prompt("That's not an option. I'm putting you all in. Now pick a number 1-10.  If you mess this up you lose all cash.");
    }

    var luckyNumber = Math.floor(Math.random() * 10 + 1);
    //If they guess the lucky number a formula gives them winnings.
    if (guess === luckyNumber) {
      var winnings = bet *luckyNumber;
      console.log("Way to go CowPerson. You just won $" + winnings + "!")
    }
    //If they are within 1 of the right number, they win 1:1
    else if (guess + 1 === luckyNumber || guess - 1 === luckyNumber) {
      var winnings = bet;
      console.log("Not bad.  You won $" + winnings + "!");
    }
    //If they lose subtract bet from pocketCash
    else {
      winnings = bet * -1;
      console.log("You lost. Pay up and leave.");
    }
    this.pocketCash += winnings;
  },

  //Invest Function allows Person to make money with Savings
  this.invest = function() {
    var invest;
    //Tell player how much they have and ask for a bet.
    var invest = prompt("You have $" + this.accountInfo.savings + " in your savings.  How much would you like to invest?");

    //If bet is good.  Let them continue.
    if (invest <= this.pocketCash) {
      guess = prompt("Okay. Now pick a number 1-10.  Each number is a different company's stock. Choose wisely.");
    }
    //If bet is too large, put all in
    else if (invest > this.pocketCash) {
      guess = prompt("Thats more than you have. Guess you're all in.  Now pick a number 1-10.  Each number is a different company's stock. Choose wisely.");
    }
    //If bet is NaN, then put them all in.
    else {
      guess = prompt("That's not an option. I'm putting you all in. Now pick a number 1-10.  Each number is a different company's stock. Choose wisely.");
    }

    var luckyNumber = Math.floor(Math.random() * 10 + 1);
    //If they guess the lucky number a formula gives them winnings.
    if (guess === luckyNumber) {
      var winnings = invest * luckyNumber;
      console.log("Its a bull market out there. You just won $" + winnings + "!")
    }
    //If they are within 1 of the right number, they win 1:1
    else if (guess + 1 === luckyNumber || guess - 1 === luckyNumber) {
      var winnings = invest;
      console.log("Decent returns.  You won $" + winnings + "!");
    }
    //If they lose subtract bet from pocketCash
    else {
      winnings = bet * -1;
      console.log("Bear market.  Just walk away.  No crying.");
    }
    this.accountInfo.savings += winnings;
    var newStoredCash = this.accountInfo.total;
    this.storedCash = newStoredCash;
  },

  //Function to transfer money from pocket to banking account
  this.moveToStored = function (amountToMove) {
    //check for sufficent funds
    if (amountToMove > this.pocketCash) {
      console.log("You have insufficient Funds.")
    }
    else {
      //subtract moving amount from pocket
      this.pocketCash -= amountToMove;
      console.log("$" + this.pocketCash + " are in your pocket.");
      //Add transfer funds to banking account
      this.storedCash += amountToMove;
      console.log("$" + this.storedCash + " are cumulatively in your bank accounts");
      //Recalculate MONEY IN THE BANK YA'LL
      this.accountReference.recalculateAccount();
      console.log("To see your distribution of wealth, enter: \'Your First Name\'.accountInfo");

    }
  }
}
//making some people and giving them accounts
var Brendan = new Person("Brendan", "Software Engineer", 10, 1000, 3);

//Constructor to create theif
function Theif(inputAlias, inputSkill, inputPocketCash) {
  this.alias = inputAlias,
  this.skill = inputSkill,
  this.pocketCash = inputPocketCash
  this.storedCash = "0.  Theives don't trust greedy bankers"
  //Adds person to players array to check their values later on
  this.addPlayerFunc = function () {
    players.push(this.name + "\'s pocket cash is $" + this.pocketCash + " and his stored cash is $" + this.storedCash + ".");
  },
  //Select a person/theif to steal money from
  this.steal = function (targetPerson) {
    var luck = Math.floor(Math.random()*10);
    var purse = (luck * this.skill * 10) + 10;
    //Skill is better than luck, make grab
    if (this.skill > luck) {
      console.log("Good swipe.  You stole $" + purse + ".");
      targetPerson.pocketCash -= purse;
      this.pocketCash += purse;
    }
    //skill is equal to luck, missed, but didn't get caught
    else if (this.skill === luck) {
      console.log("Better Luck Next Time!");
    }
    //Skill is less than luck, got caught
    else {
      console.log("You were caught and taken to court and sued of all your cash.");
      targetPerson.pocketCash += this.pocketCash;
      this.pocketCash = 0;
    }
  }
}

//Built-in Theif
var Neil = new Theif(Neil, 6, 150);

//Constructor for a Hacker
function Hacker(inputAlias, inputSkill, inputStoredCash) {
  this.alias = inputAlias,
  this.skill = inputSkill,
  this.pocketCash = "doesn't go outside and therefore have no use for on-hand money.",
  this.storedCash = inputStoredCash,
  //Adds person to players array to check their values later on
  this.addPlayerFunc = function () {
    players.push(this.alias + " " + this.pocketCash + " His stored cash is $" + this.storedCash + ".");
  },
  //Property to steal money, but only from bank accounts
  this.hack = function(targetPerson) {
    var luck = Math.floor(10 * Math.random());
    var purse = ((luck + 1) * this.skill * 1000 * luck) + luck;
    //Skill is better than luck, make steal
    if (this.skill > luck) {
      //If the take is less than the chum has on hand
      if (purse <= (targetPerson.accountInfo.checking + targetPerson.accountInfo.savings)) {
        console.log("Good work.  You stole $" + purse + ".");
        targetPerson.accountInfo.checking -= purse / 2;
        targetPerson.accountInfo.savings -= purse / 2;
        this.storedCash += purse;
      }
      //If the take is more than the chum has on hand, take it all
      else {
        purse = targetPerson.accountInfo.checking + targetPerson.accountInfo.savings;
        console.log("Good work.  You stole $" + purse + ".  This was all of the unsecure funds.");
        this.storedCash += purse;
        targetPerson.accountInfo.checking = 0;
        targetPerson.accountInfo.savings = 0;
      }
    }
    //skill is equal to luck, missed, but didn't get caught
    else if (this.skill === luck) {
      console.log("Better Luck Next Time!");
    }
    //Skill is less than luck, got caught.  Loose all cash.
    else {
      console.log("You were caught and taken to court and sued of all your cash.");
      targetPerson.storedCash += this.storedCash;
      this.storedCash = 0;
    }
  }
}

var Anon = new Hacker("Anon", 5, 5000);
