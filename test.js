// utilities for testing

// this function just adds the test result to the page
function addTestDom(element, color, text) {
  var body = document.getElementsByTagName("body")[0];
  var elem = document.createElement(element);
  elem.style.color = color;
  elem.innerHTML = text;
  body.appendChild(elem);
}

// this it() function describes a group of tests
function it(description, contents) {
  var body = document.getElementsByTagName("body")[0];
  var elem = document.createElement("h3");
  elem.innerHTML = "It " + description;
  body.appendChild(elem);
  console.log("\n\n It " + description + "");
  contents();
}

// checks strict equality of expectation and target for passing test
// eg. expect(calvin.mood).tobe("happy");
function expect(expectation) {
  return {
      tobe: function(target) {
        if (target === expectation) {
          var passTxt = "PASSED " + "Expected " + target + " to be " + expectation;
          addTestDom("p", "green", passTxt);
          console.log('\n   %cPASSED', 'color:green;', 'Expected', target, 'to be', expectation );
        return true;
        } else {
          var failTxt = "FAILED " + "Expected " + target + " to be " + expectation;
          addTestDom("p", "red", failTxt);
          console.log('\n     %cFAILED', 'color:red;', 'Expected', target, 'to be', expectation );
          return false;
        }
      }
    };
}

////////////////////////////////////////////////////////////////////////////////

var Brendan = new Person("Brendan", 10, 1000, 3);
var Neil = new Theif(Neil, 6, 150);
var Anon = new Hacker("Anon", 5, 5000);

////////////////////////////////////////////////////////////////////////////////

// Tests
// Do not edit the tests below, you will need to write your
// constructors above so that the following tests pass.

it("calvin and teddy should have happy mood when calvin pets teddy", function() {

  //Check constructor validity
  expect(Brendan.name).tobe("Brendan");
  expect(Brendan.storedCash).tobe(1000);
  expect(Brendan.pocketCash).tobe(10);
  expect(Brendan.accountInfo.secure).tobe(700);

  //when stolen stored cash should be fine and pocket cash should change.
  Neil.steal(Brendan);
  expect(Brendan.storedCash).tobe(1000);
  expect(Brendan.pocketCash).tobe(0);

  Brendan.invest();
  console.log('made it here');
  expect(Brendan.accountInfo.checking).tobe(0);

  //expect(typeOf Anon.hack()).tobe('function');




});






console.log('The End');
