function userSelect() {
  let userselect = $("#select_option option:selected").val();
  if (userselect == "Using Zone") {
    $("#city").toggleClass("hide");
    $("#zone").toggleClass("hide");
    $("#results").toggleClass("hide");
  } else if (userselect == "Using City") {
    $("#city").toggleClass("hide");
    $("#zone").toggleClass("hide");
    $("#results").toggleClass("hide");
  }
}

function get_by_city() {
  const city_name = document.getElementById("city_name");
  const results = document.getElementById("results");
  $("#results").removeClass("hide");

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
      alert("Error loading");
    });
}
function get_by_zone() {
  const Latitude = document.getElementById("lat");
  const Longitude = document.getElementById("long");
  const results = document.getElementById("results");
  $("#results").removeClass("hide");

  axios({
    method: "get",
    url: `https://developers.zomato.com/api/v2.1/search?entity_type=zone&lat=${Latitude.value}&lon=${Longitude.value}`,
    headers: {
      "Content-Type": "application/json",
      "user-key": "125884e9797cd876ba1b2c39bb67976d",
    },
  })
    .then((response) => {
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
      alert("Error loading");
    });
}

function get_pdf() {
  var pdf = new jsPDF("l", "pt", "letter");
  var specialElementHandlers = {
    "#edit": function (element, renderer) {
      return true;
    },
  };
  source = $("#results");
  margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522,
  };
  pdf.fromHTML(source, margins.left, margins.top, {
    width: margins.width,
    elementHandlers: specialElementHandlers,
  });
  pdf.save("Restaurants.pdf");
}
