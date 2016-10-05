/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('All RSS Feeds url are defined and have a value', function(){
            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                ////console.log(allFeeds[i].url);
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All RSS Feeds names are defined and have a value', function(){
            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                ////console.log(allFeeds[i].name);
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });




    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function(){
        var foo,
            bodyNode = $('body');
        beforeEach(function(){

            jasmine.addMatchers({
                hasMenuClass: function(util){
                    ////console.log(util)
                    ////console.log(customEqualityTesters)
                  return {
                    compare: function(actual, expected){
                        passed = actual.hasClass(expected) == true
                        return{
                            pass: passed,
                            message: 'Expected' + actual + (passed ? '' : " hasn't") + ' Class ' + expected
                        }
                    }

                  }
                }
            });

            foo = {
                triggerClick: function(classNAme){
                    $( classNAme ).on( "click", function() {
                //alert( $( this ).text() );
            });
            $( classNAme).trigger( "click" );
                }
            }
        });

         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', function(){




            expect(bodyNode).hasMenuClass("menu-hidden");

        })

        it('Menu show/hide when menu icon is clicked', function(){

            // $( ".menu-icon-link" ).on( "click", function() {
            //     //alert( $( this ).text() );
            // });
            // $( ".menu-icon-link").trigger( "click" );
            foo.triggerClick(".menu-icon-link")
            expect(bodyNode).not.hasMenuClass("menu-hidden");
            foo.triggerClick(".menu-icon-link")
            expect(bodyNode).hasMenuClass("menu-hidden");


        })

    });

    describe("Asynchronous specs", function() {
  var value;


  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 1);
  });

  it("should support async execution of test preparation and expectations", function(done) {
    value++;
    expect(value).toBeGreaterThan(0);
    done();
  });

    describe('Initial Entries', function(){
        //console.log($(".feed").children().length)
        beforeEach(function(done){

            loadFeed(0, function(){


                setTimeout(function(){
                    console.log($(".feed").children().length)

                    done()

                }, 4)
             //console.log($(".feed").children().length)
            })
        })


        it('beggins and load', function(done){

             //console.log($(".feed").children().length)
             value++
             var a = $(".feed").children().length
             //console.log($(".feed").children().length)

             //expect($(".feed").children().length).toBeNumber();
             //expect(a).toBeDefined();
             expect(a).toBeGreaterThan(1);
             done()

        })
     })

    })

    describe('New Feed Selection', function(){
        var entryPre = $(".entry");
        var entryLinkPre = $("a.entry-link").attr("href")
        var elementsAreTheSame;
        var entryPost;
        console.log(entryPre.length)
        var entryLinkPost;
        var entryPost2;
        var entryLinkPost2;
        console.log()
        var linksAreTheSame;
        beforeEach(function(done){

            loadFeed(1, function(){
                //console.log($(".entry"))
                setTimeout(function(){
                 entryPost =$(".entry");
                if(entryPost.length > 0){

                }
                //linksAreTheSame = (entryLinkPre === entryLinkPost)
                entryLinkPost = $("a.entry-link").attr("href")
                //elementsAreTheSame = (entryPre === entryPost);
                callOther(2)

                },20)



        })
             function callOther(cual){
            loadFeed(cual, function(){

                setTimeout(function(){
                entryPost2 =$(".entry");
                entryLinkPost2 = $("a.entry-link").attr("href")
                elementsAreTheSame = (entryPost2 == entryPost);
                linksAreTheSame = (entryLinkPost === entryLinkPost2)
                //console.log(entryPre === entryPost)
                console.log(elementsAreTheSame)
                console.log(entryPost[0])
                //console.log(entryPre)
                console.log(entryPost2[0])


                //checkIfEveryEntryChange
                done()
                },80)


            })
        }
        })

        it('content change', function(done){


            expect(elementsAreTheSame).toBe(false);
            expect(linksAreTheSame).toBe(false)
            console.log(elementsAreTheSame)
            done()
        })

    })








         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
