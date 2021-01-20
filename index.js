
$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  const $tweets = streams.home.map((tweet) => {
    const time = tweet.created_at;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const curMonth = time.getMonth();
    const amOrPm = function(){
      if (time.getHours() <= 11){
        return "AM";
      } else {
        return "PM";
      }
    }
    const formattedTime = `${months[curMonth]} ${time.getDate()} at ${time.getHours()}:${time.getMinutes()} ${amOrPm()}`
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message} time: ${formattedTime}`;

    $tweet.text(text);

    return $tweet;

    
  });
//create a count variable to keep track of how many tweets have been added to the page
var count = 11;
//create a function to get all the new tweets that are being generated by the data-generator.js file
//will also increase the count variable by however many tweets were added to the array
const freshTweets = function() {
  const fresh = streams.home.slice(count);
  count += fresh.length;
  return fresh;
};

const $newTweets = function(array){
  const foo = array.map((tweet) => {
    const time = tweet.created_at;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const curMonth = time.getMonth();
    const amOrPm = function(){
      if (time.getHours() <= 11){
        return "AM";
      } else {
        return "PM";
      }
    }
    const formattedTime = `${months[curMonth]} ${time.getDate()} at ${time.getHours()}:${time.getMinutes()} ${amOrPm()}`
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message} time: ${formattedTime}`;

    $tweet.text(text);
    $tweet
    .css('border', '5px solid blue')
    .css('border-radius', '5px')
    .css('border-width', 'medium')
    .css('border-style', 'bold')
    .css('font-size', '14px')
    .css('margin', '10px 5px')
    .css('padding', '16px')
    .css('font-weight', 'bold')
    .css('font-family', 'Arial')
    .css('background-color', 'pink')
    .css('max-width', '500px')

    return $tweet;
  });
  return foo;
}


 //create a form that will eventually allow a user to add their own tweets
 //has a username input
 //has a place to write their own tweets
 //NEEDS A FUNCTIONING BUTTON TO ADD THE TWEET TO THE TIMELINE
   //Add a title for the site
   $body.prepend($('<div>').attr('id', 'header').text('Welcome to Twiddler!'));
 
  $body.append($('<form>').attr('id', 'form').append($('<label>').attr('id', 'name').attr('for', "Username").text('Username:')).append($('<br>')));
  $('#form').append($('<input>').attr('type', 'text').attr('id', 'username').attr('name', 'username')).append($('<br>'));
  $body.append($('<button>').attr('class', 'button').attr('id', 'signin').text('Sign In')).append($('<br>')).append($('<br>'));
  $('#form').append($('<label>').attr('id', 'enter-tweet').attr('for', 'tweet').text('What\'s on your mind?')).append($('<br>'));
  $('#form').append($('<input>').attr('type', 'text').attr('id', 'tweet').attr('name', 'tweet')).append($('<br>'));
  $body.append($('<button>').attr('class', 'button').attr('id', 'submit').text('Send Tweet!'));
  
  // $body.append($tweets);
  $body.append($('<main>').attr('id', 'all'));
  $('#all').append($('<section>').attr('id', 'main-feed'));
  $('#main-feed').append($('<div>').attr('id', 'tweet-header').text('Here\'s Some Stuff People Said:'));
  $('#main-feed').append($tweets);
  $('#main-feed').append($('<div>').attr('class', 'left-side').attr('id', 'new-tweets'));
  
//create a way to see a timeline of each users tweets when their username is clicked
 $('#all').append($('<section>').attr('id', 'side-feed'));
 $('#side-feed').append($('<div>').attr('id', 'side-header').text('Someone Else\'s Thoughts:'));
 $('#side-feed').append($('<div>').attr('id', 'user-tweet-container'));
 $('#user-tweet-container').append($('<div>').attr('id', 'tweet-container'));
   
 //create buttons for each user
 $('#user-tweet-container').prepend($('<button>').attr('class', 'button').attr('id', 'one').text('shawndrost'));
 $('#user-tweet-container').prepend($('<button>').attr('class', 'button').attr('id', 'two').text('sharksforcheap'));
 $('#user-tweet-container').prepend($('<button>').attr('class', 'button').attr('id', 'three').text('mracus'));
 $('#user-tweet-container').prepend($('<button>').attr('class', 'button').attr('id', 'four').text('douglascalhoun'));
 let oneCount = 0;
 let twoCount = 0;
 let threeCount = 0;
 let fourCount = 0;
 let oneArray = [];
 let twoArray = [];
 let threeArray = [];
 let fourArray = [];

 //create click functions for each user's button to display all of their tweets
 $('#one').click(function(){
   $('#tweet-container').empty();
   oneArray = [...oneArray, ...streams.users['shawndrost'].slice(oneCount)];
   oneCount = oneArray.length - 1;
   let text = $newTweets(oneArray);
   return $('#tweet-container').append(text);
 })
 $('#two').click(function(){
  $('#tweet-container').empty();
  twoArray = [...twoArray, ...streams.users['sharksforcheap'].slice(twoCount)];
  twoCount = twoArray.length - 1;
  let text = $newTweets(twoArray);
  return $('#tweet-container').append(text);
})
$('#three').click(function(){
  $('#tweet-container').empty();
  threeArray = [...threeArray, ...streams.users['mracus'].slice(threeCount)];
  threeCount = threeArray.length - 1;
  let text = $newTweets(threeArray);
  return $('#tweet-container').append(text);
})
$('#four').click(function(){
  $('#tweet-container').empty();
  fourArray = [...fourArray, ...streams.users['douglascalhoun'].slice(fourCount)];
  fourCount = fourArray.length - 1;
  let text = $newTweets(fourArray);
  return $('#tweet-container').append(text);
});

//create a click function for the button in the form submission
let visitor = '';
let message = '';
let date = '';
const $userTweet = function(){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const curMonth = date.getMonth();
    const amOrPm = function(){
      if (date.getHours() <= 11){
        return "AM";
      } else {
        return "PM";
      }
    };
    const formattedTime = `${months[curMonth]} ${date.getDate()} at ${date.getHours()}:${date.getMinutes()} ${amOrPm()}`;
  const $tweet = $('<div></div>');
let text = `@${visitor}: ${message} time: ${formattedTime}`;
$tweet.text(text);
    $tweet
    .css('border', '5px solid blue')
    .css('border-radius', '5px')
    .css('border-width', 'medium')
    .css('border-style', 'bold')
    .css('font-size', '14px')
    .css('margin', '10px 5px')
    .css('padding', '16px')
    .css('font-weight', 'bold')
    .css('font-family', 'Arial')
    .css('background-color', 'pink')
    .css('max-width', '500px')

    return $tweet;
}
$('#signin').click(function(){
visitor = $('#username').val();
alert(`Welcome ${visitor}!`)
});
$('#submit').click(function(){
  message = $('#tweet').val();
  date = new Date();
  $('#tweet').empty();
  $('#username').empty();

  return $('#new-tweets').append($userTweet());

});


  //update the feed somehow and show the user new tweets as they come or 
    //have a button to refresh the page 
    $('#main-feed').append($('<button>').attr('class', 'button').attr('id', 'refresh-tweets').text('See more'));
   
    $('#refresh-tweets').click(function(){
      return $('#new-tweets').append($newTweets(freshTweets()));
    });
    $('#refresh-tweets').click(function(){
      $('#main-feed').append($('#refresh-tweets'));
    });
    

  //create a style for each tweet
  $tweets.forEach(tweet => {
    tweet
    .css('border', '5px solid blue')
    .css('border-radius', '5px')
    .css('border-width', 'medium')
    .css('border-style', 'bold')
    .css('font-size', '14px')
    .css('margin', '10px 5px')
    .css('padding', '16px')
    .css('font-weight', 'bold')
    .css('font-family', 'Arial')
    .css('background-color', 'pink')
    .css('max-width', '500px')
  });

    //put more style into the page
    $('#main-feed')
    .css('border', '10px solid blue')
    .css('border-radius', '5px')
    .css('border-width', 'thick')
    .css('background-color', 'cornflowerblue')
    .css('padding', '10px')
    .css('margin', '10px 5px')
    .css('max-width', '550px')
    .css('float', 'left')
    .css('display', 'inline-block')
    .css('max-height', '700px')
    .css('overflow', 'scroll');

  //style the tweet form
  $('#tweet')
  .css('width', '30%')
  .css('padding', '22px 20px')
  .css('box-sizing', 'border-box')
  .css('background-color', 'pink')
  .css('height', '100px')
  .css('resize', 'none')
  .css('margin', '8px 0')

  $('#username')
  .css('background-color', 'pink');

  $('#name')
  .css('font-size', '16pt')
  .css('font-weight', 'bold')
  .css('font-family', 'arial')

  $('#enter-tweet')
  .css('font-size', '16pt')
  .css('font-weight', 'bold')
  .css('font-family', 'arial')


  //style the header
  $('#header')
  .css('font-size', '48pt')
  .css('font-weight', 'bold')
  .css('font-family', 'arial');

  $('#side-header')
  .css('font-size', '24pt')
  .css('font-weight', 'bold')
  .css('font-family', 'arial');

  $('#tweet-header')
  .css('font-size', '24pt')
  .css('font-weight', 'bold')
  .css('font-family', 'arial');

  //style the timeline
  $('#side-feed')
  .css('float', 'right')
  .css('display', 'inline-block')
  .css('vertical-align', 'top')
  .css('border', '10px solid blue')
  .css('border-radius', '5px')
  .css('border-width', 'thick')
  .css('background-color', 'cornflowerblue')
  .css('padding', '10px')
  .css('margin', '10px 5px')
  .css('width', '550px')
  .css('height', '500px')
  .css('overflow', 'scroll');

  //style the background
  $body
  .css('background-color', 'lightseagreen');

  //style all the buttons
  $('.button')
  .css('display', 'inline-block')
  .css('padding', '0.35em 1.2em')
  .css('border', '0.1em solid #FFFFFF')
  .css('margin', '0 0.3em 0.3em 0')
  .css('border-radius', '0.12em')
  .css('box-sizing', 'border-box')
  .css('text-decoration', 'none')
  .css('font-family', 'Roboto, sans-serif')
  .css('font-weight', '300')
  .css('color', '#FFFFFF')
  .css('background-color', 'cornflowerblue')
  .css('text-align', 'center')
  .css('transition', 'all 0.2s');
$('.button').hover(function(){
  $(this).css('color', '#000000').css('background-color', '#FFFFFF');
}, function(){
  $(this).css('color', '#FFFFFF').css('background-color', 'cornflowerblue');
})
  

});
