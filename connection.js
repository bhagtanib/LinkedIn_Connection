console.log("Chrome Extension idle");

async function waitForOneSecond() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

async function run() {

  var message = getMessage();
  var name = getName().trim();
  console.log("name:", name )
  var pending = document.querySelector(
    `[aria-label="Pending, click to withdraw invitation sent to ${name}"]`
  );
  if (pending != null) {
    close();
  }
  // sendMessage(name, message)
  var element = document.querySelector(
    `[aria-label="Invite ${name} to connect"]`
  );
  element.click();
  await waitForOneSecond();

  var note = document.querySelector(`[aria-label="Add a note"]`);
  note.click();
  await waitForOneSecond();

  var textArea = document.getElementById("custom-message");
  console.log("text area: ", textArea)
  textArea.value = message;
  await waitForOneSecond()

  var send = document.querySelector(`[aria-label="Send now"]`);

  send.click();
  send.click();
}

function getName() {
  return document.getElementsByClassName("pv-text-details__left-panel")[0]
    .children[0].children[0].textContent;
}
function getMessage() {
  const name = document
    .getElementsByClassName(
      "text-heading-xlarge inline t-24 v-align-middle break-words"
    )[0]
    .textContent.split(" ")[0];
  let company = "";
  company = document.getElementsByClassName(
    "inline-show-more-text inline-show-more-text--is-collapsed inline-show-more-text--is-collapsed-with-line-clamp inline"
  );
  // console.log("company: ", company)
  if (company.length == 0) {
    console.log("no company");
    return;
  }
  company = company[0].innerHTML.split(" ");

  // console.log("name: ",name, "company: ", company)
  let message =
    "Greetings " +
    name +
    ",\nI'm majoring in CS at Whitworth University (Jan 2024). Ready to kickstart my SE journey with a new grad role and I am reaching out regarding one at " +
    company[8].trim() +
    " " +
    company[9].trim() +
    ". I'd like to connect with you to discuss being a SE at " +
    company[8].trim() +
    " and if you could help me with a referral.\nThanks";
  message = message.slice(0, 300);
  return message;
}

window.onload = function () {
  run();
  console.log("All resources loaded");
};
