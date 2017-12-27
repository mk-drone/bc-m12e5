window.addEventListener('load', ()=>{
    let tweetLink = "https://twitter.com/intent/tweet?text=";
    let quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    let prefix = "https://cors-anywhere.herokuapp.com/";
  
    $('.trigger').click(()=>{
        getQuote();
    });

    function getQuote(){
        $.getJSON(prefix+quoteUrl, createTweet); 
        $.ajaxSetup({ cache: false });
    }

    function createTweet(input){
        let data = input[0];
        let quote = $(data.content).text().trim();
        let author = data.title;
        let tweet = "";

        if(!quote.length){
            author = 'Unknown';
        }

        tweet = `Quote of the day: ${quote} Author: ${author}`;
        if(tweet.length > 140){
            getQuote();
            // console.log(tweet, tweet.length)
        } else {
            let tweetHref = tweetLink + encodeURIComponent(tweet);
            $('.quote').text(quote);
            $('.author').text(`Author ${author}`);
            $('.tweet').attr('href', tweetHref);
        }
    }

    getQuote();
});