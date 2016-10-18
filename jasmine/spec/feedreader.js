/* feedreader.js*/

$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /** Spec ensures allFeed object has url defined and not empty
           * Iterate over allFeedObjects and take the property url.
           * Test with two expectations.
         */
        it('All RSS Feeds url are defined and have a value', function(){

            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /** Spec ensures allFeed object has name defined and not empty
           * Iterate over allFeedObjects and take the property name.
           * Test with two expectations.
         */
        it('All RSS Feeds names are defined and have a value', function(){

            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /** The Menu suite*/
    describe('The Menu', function(){

        var eventSimulation,
            bodyNode = $('body');


            beforeEach(function(){

                /** Custom matcher checks if an element has class*/
                jasmine.addMatchers({
                    hasMenuClass: function(util){
                        return {

                           /** Checks if body has or not menu-hidden class
                             * @param{Node} actual - Node in which add/remove class.
                             * @param{String} expected - The Class Name.
                             */
                            compare: function(actual, expected){
                                passed = actual.hasClass(expected) === true;
                                return{
                                    pass: passed,
                                    message: 'Expected Node:' + actual[0].localName + (passed ? ' not to have' : " to have") + ' Class:' + expected
                                };
                            }

                        };
                    }
                });

            eventSimulation = {
                /** Trigger click event
                  * @param{String} className - Element's class on which is going to be
                                               added listener and trigger event
                */
                triggerClick: function(className){
                    $( className ).on( "click", function(){});
                    $( className).trigger( "click" );
                }
            };
        });

         /** Spec ensures menu is hidden by default
           * Checks if body has menu-hidden class.
           * When body has class menu is hidden by css properties
         */
        it('Menu is hidden by default', function(){
            expect(bodyNode).hasMenuClass("menu-hidden");
        });

        it('Menu is shown when menu icon is clicked', function(){
            eventSimulation.triggerClick(".menu-icon-link");
            expect(bodyNode).not.hasMenuClass("menu-hidden");
        });
        it('Menu is hidden when menu icon is clicked', function(){
            eventSimulation.triggerClick(".menu-icon-link");
            expect(bodyNode).hasMenuClass("menu-hidden");
        });
    });

    /** Initial Entries suite*/
    describe('Initial Entries', function(){

        beforeEach(function(done){

            /** loadFeed call
              * done is inside the callback function since loadFeed is async and
              * we need to ensure that it has finished
            */
            loadFeed(0, function(){

                done();
            });
        });

        /** Spec ensures that div.feed has entries
          * Checks if div.feed has children which shows that entries has been added.
          * expect checks if children is greater than 1 that at at least one entry has been added
        */
        it('div.feed has entries', function(done){

             var a = $(".feed").children().length;
             expect(a).toBeGreaterThan(1);
             done();

        });
     });

    /** New Feed Selection*/
    describe('New Feed Selection', function(){


        var elementContentIsTheSame = false,
            entryPost,
            entryLinkPost,
            entryPost2,
            entryLinkPost2;


        beforeEach(function(done){

            /** loadFeed call.
              * Callback function call's callAgain function to ensure it is called after function has finished loading.
            */
            loadFeed(1, function(){

                entryPost =$(".entry");
                entryLinkPost = $("a.entry-link");
                var trial = $("a.entry-link");
                callAgain(2);
            });

            /**
              * Call loadFeed function and compares between first post and second
              * @param {number} feedNo - feed number
            */
            function callAgain(feedNo){

                loadFeed(feedNo, function(){

                    entryPost2 =$(".entry");
                    entryLinkPost2 = $("a.entry-link");

                    for(var i = 0; i < 10; i++){
                        if(entryPost[i]===entryPost2[i] && entryLinkPost[i]===entryLinkPost2[i]){

                            elementContentIsTheSame = true;
                        }
                    }
                    done();
                });
            }
        });

        /** Spec ensures that the content has change when there is a new feed selection
        */
        it('Content changes after a new feed selection', function(done){

              expect(elementContentIsTheSame).toBe(false);
              done();
        });

    });

}());
