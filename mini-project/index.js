window.addEventListener("DOMContentLoaded", () => {
  window.onload = get_data();

  const form = document.getElementById("filters-form");
});

async function get_data() {
  const categorie__dom = document.getElementById("categorie");
  const limit__dom = document.getElementById("limit");
  const keywords__dom = document.getElementById("keywords");

  const params = new URLSearchParams();
  params.append("access_key", "3d758f83285ae95dc919dabf94e369c1");
  params.append("country", "us");

  if (categorie__dom.value) {
    params.append("categorie", categorie__dom.value);
  }

  if (keywords__dom.value) {
    params.append("keywords", keywords__dom.value);
  }

  if (limit__dom.value) {
    params.append("limit", limit__dom.value);
  }

  const API_URL = `http://api.mediastack.com/v1/news?${params.toString()}`;

  const response = await fetch(API_URL);

  const data = await response.json();

  document.getElementById("news").innerHTML = "";

  data.data.forEach((element) => {
    add_new_news(element);
  });
}

function add_new_news(data) {
  const DEFAULT_IMAGE =
    "https://as1.ftcdn.net/v2/jpg/03/27/55/60/1000_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg";

  // Create a new <div> element with class "new"
  var divNew = document.createElement("div");
  divNew.className = "new";

  // Create <div> element with class "top"
  var divTop = document.createElement("div");
  divTop.className = "top";

  // Create an <img> element with id "img-post"
  var imgPost = document.createElement("img");
  imgPost.id = "img-post";
  imgPost.src = data.image || DEFAULT_IMAGE;
  imgPost.alt = "";

  // Append the <img> element to the "top" div
  divTop.appendChild(imgPost);

  // Create <div> element with class "middle"
  var divMiddle = document.createElement("div");
  divMiddle.className = "middle";

  // Create <div> element with class "author"
  var divAuthor = document.createElement("div");
  divAuthor.className = "author";
  divAuthor.innerHTML = data.author;

  // create <div> element with class "description"
  var divDescription = document.createElement("div");
  divDescription.className = "description";
  divDescription.innerHTML = data.description.substring(0, 270);

  // Create <div> element with class "country"
  var divCountry = document.createElement("div");
  divCountry.className = "country";
  divCountry.innerHTML = "country : ".concat(data.country);

  // Append the "author" and "country" divs to the "middle" div
  divMiddle.appendChild(divAuthor);
  divMiddle.appendChild(divCountry);
  divMiddle.appendChild(divDescription);

  // Create <div> element with class "bottom"
  var divBottom = document.createElement("div");
  divBottom.className = "bottom";

  // Create <p> element with class "source"
  var pSource = document.createElement("p");
  pSource.className = "source";
  pSource.innerHTML = data.source;

  // Append the "source" paragraph to the "bottom" div
  divBottom.appendChild(pSource);

  // Append the "top", "middle", and "bottom" divs to the "new" div
  divNew.appendChild(divTop);
  divNew.appendChild(divMiddle);
  divNew.appendChild(divBottom);

  // Append the "new" div to the document body
  document.getElementById("news").appendChild(divNew);
}
