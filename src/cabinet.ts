const profile = document.querySelector<HTMLHeadElement>('.profile')!;
const profileName = document.querySelector<HTMLDivElement>('.profile-name')!;
const profileUsername = document.querySelector<HTMLDivElement>('.profile-username')!;
const imgBox = document.querySelector<HTMLDivElement>('.imgbox')!;

const getUser = async () => {
   let href = location.search;
   if (href !== "") {
      const params = new URLSearchParams(href);
      const id = params.get("id");
      const reponse = await fetch(`http://localhost:1010/api/users/${id}`);
      const data = await reponse.json();
      return data.data;
   }
}
getUser().then((user) => {
   profileName.textContent = user.lastname + ' ' + user.firstname;
   const avatar = document.createElement('img');
   avatar.src = user.avatar;
   profile.appendChild(avatar);
   imgBox.appendChild(avatar);
})