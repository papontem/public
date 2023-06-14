"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
	console.debug("navAllStories", evt);
	hidePageComponents();
	putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
	console.debug("navLoginClick", evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
	console.debug("updateNavOnLogin");
	$(".main-nav-links").show();
	$navLogin.hide();
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}

// part 2
function navSubmitStoryClick(event) {
	console.log("navSubmitStoryClick", event);
	putStoriesOnPage();
	// hidePageComponents();
	$submitStoryForm.show();
}

$navSubmitStoryForm.on("click", navSubmitStoryClick);

// part 3B UI elements interactivity
function navFavoriteStoriesClick(event) {
	console.log("navFavoritesClick", event);
	hidePageComponents();
	putFavoritesOnPage();
}

$navFavorites.on("click", navFavoriteStoriesClick);

// part 4 my stories to then delete
function navUserStoriesClick(event) {
	console.log("navUserStoriesClick", event);
	hidePageComponents();
	putUsersOwnStoriesOnPage();
}

$navUserStories.on("click", navUserStoriesClick);
