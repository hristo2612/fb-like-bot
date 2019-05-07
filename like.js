const fs = require("fs");
let rawdata = fs.readFileSync("config.json");
let config = JSON.parse(rawdata);
let Nightmare = require("nightmare");
let fbPage = `https://www.facebook.com/`;
let maxWaitScroll = 29997; // IF you don't scroll to the bottom of the list, replace with 29997 FOR MAXIMUM POWER
let chalk = require("chalk");
console.log(chalk.green("Hey There Welcome to fb like bot!"));
let postsLength = 0;

let vo = require("vo");

vo(run)(function(err, result) {
  if (err) throw err;

  console.log("Completed..");
});

function* run() {
  let nightmare = Nightmare({ show: true });

  yield nightmare
    .goto(fbPage)
    .wait(2000)
    .type("[type=email]", config.email)
    .type("[type=password]", config.password)
    .click("[type=submit]")
    .wait(4200)

  for (let i = 1; i < 99; i++) {
    yield nightmare.scrollTo(1260 * i, 0).evaluate(function() {
      if (!window.postsLength) {
        window.postsLength = 0;
      }

      let allPosts = document.querySelectorAll('._5pcr.userContentWrapper');

      if (window.postsLength !== allPosts.length) {
        for (let k = window.postsLength; k < allPosts.length; k++ ) {
          setTimeout(() => {
            if (allPosts[k] && allPosts[k].querySelector('._6a-y._3l2t._18vj') && !allPosts[k].querySelector('._3_16._6a-y._3l2t._18vj')) {
              allPosts[k].querySelector('._6a-y._3l2t._18vj').click();
            }
          }, k * 160);
        }
      }

      window.postsLength = allPosts.length;
    }).wait(3300);
  }

  yield nightmare
  .then(function() {
    console.log("done");
    console.log(postsLength);
  })
  .catch(function(error) {
    console.error('Something failed, not good man:', error)
  })
}