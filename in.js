const city_name = document.getElementById("city");
//const results = document.querySelector("#results");
//const lat = document.querySelector("#lat");
//const long = document.querySelector("#long");

let city_id;
let restaraunts;
let html;

function get_city_id() {
  console.log(city_name.value);
  axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${city_name.value}`,
    headers: {
      "Content-Type": "application/json",
      "user-key": "125884e9797cd876ba1b2c39bb67976d",
    },
  })
    .then((response) => {
      //console.log(restaraunts);
      //console.log(response.data.location_suggestions[0].id)
      //city_id = response.data.location_suggestions[0].id
      //return get_restaraunts(city_id)
      restaraunts = response.data.restaurants;
      restaraunts = restaraunts.slice(0, 10);

      results.innerHTML = ``;
      restaraunts.forEach((res) => {
        console.log(res.restaurant.name);

        html = res.restaurant.name;
        results.innerHTML += `${html}  <br>`;
      });
    })
    .catch(function (error) {
      //console.log(response);
      //city_id = response.data.restaurants[0].restaurant.name;
      //return get_restaraunts(city_id);
    });
}

function get_city_id_by_coords() {
  axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/cities?lat=${lat.value}&lon=${long.value}`,
    headers: {
      "Content-Type": "application/json",
      "user-key": "6e83a3ddefec727d55659984181ac6ac",
    },
  }).then((response) => {
    console.log(response.data.location_suggestions[0].id);
    city_id = response.data.location_suggestions[0].id;
    return get_restaraunts(city_id);
  });
}

function get_restaraunts(city_id) {
  axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/collections?city_id=${city_id}`,
    headers: {
      "Content-Type": "application/json",
      "user-key": "6e83a3ddefec727d55659984181ac6ac",
    },
  }).then((response) => {
    //console.log(response.data.collections)
    restaraunts = response.data.collections;
    restaraunts = restaraunts.slice(1, 11);

    results.innerHTML = ``;
    restaraunts.forEach((res) => {
      //console.log(res.collection.title)
      html = res.collection.title;
      results.innerHTML += `${html}  <br>`;
    });
  });
}

var doc = new jsPDF();
var specialElementHandlers = {
  "#editor": function (element, renderer) {
    return true;
  },
};

$("#cmd").click(function () {
  doc.fromHTML($("#results").html(), 15, 15, {
    width: 170,
    elementHandlers: specialElementHandlers,
  });
  doc.save("results.pdf");
});
