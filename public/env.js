$(assignment1-task2).ready(function ()
 {
  //GET the profile detail
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/myProfile',
    success: function (data) {
      if (data != undefined) {
        $('#profileName').text(data.name);
        $('#profileAge').text(data.age);
        $('#profileGender').text(data.gender);
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
});

//Populate all the profiles with like and dislike button
function populateProfileCard(profiles) {
  $("#profileList").html("");
  var html = ""
  $.each(profiles, function (index, object) {
    html += "" +
      '<div class="row">' +
      '<div class="col s4 offset-s4">' +
      '<div class="card red lighten-5">' +
      '<div class="card-content">' +
      '<span class="card-title red-text"><h4>' + object.name + '</h4></span>' +
      '<p><span class="">Gender:</span> ' + object.gender + '</p>' +
      '</div>' +
      '<div class="card-action">' +
      '<button class="dislikeBtn" onclick="dislikeProfile(' + object.id + ');"><i class="material-icons">thumb_down</i></button>' +
      '<button id="likeBtn" onclick="likeProfile(' + object.id + ');"><i class="material-icons">thumb_up</i></button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  });
  $("#profileList").append(html);
}

//Diliske profile
function dislikeProfile(id) {
  $.ajax({
    type: 'POST',
    data: {
      "id": id
    },
    url: 'http://localhost:3000/dislikeProfile',
    success: function (data) {
      if (data != undefined && data.length > 0) {
        populateProfileCard(data);
      }
      else {
        $("#profileList").html("<h4 class='red-text text-lighten-2'>Sorry there are no more matches now!</h4>");
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
}

//like profile
function likeProfile(id) {
  $.ajax({
    type: 'POST',
    data: {
      "id": id
    },
    url: 'http://localhost:3000/likeProfile',
    success: function (data) {
      if (data != undefined) {
        populateSideBySide(data);
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
}

//matched profiles
function populateSideBySide(profile) {
  $("#matchingProfileDiv").css("display", "block");
  $("#profileList").remove();

  $('#matchedName').text(profile.name);
  $('#matchedAge').text(profile.age);
  $('#matchedGender').text(profile.gender);
  
}
