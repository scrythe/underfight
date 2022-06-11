const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const ah = 'eh';
  sendPost('login.inc.php', { a: 'ah' }).then((data) => console.log(data));
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
});

noAccAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.toggle('active');
  registerBox.classList.toggle('active');
});

function sendPost(url, postData) {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    const jsonData = await fetch(
      `http://localhost/includes/${url}`,
      options
    ).catch((error) => reject(error));
    const data = jsonData.json();

    resolve(data);
  });
}
