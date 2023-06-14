"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
	// console.debug("generateStoryMarkup", story);
	// console.log(currentUser);

	const hostName = story.getHostName();
	// PAM3: added favorite checkbox to story html markup
	return $(`
		<li id="${story.storyId}">
			${
				story.username == currentUser?.username
					? '<button id="deleteButton"> - Delete! - </button>'
					: ""
			}
			<input type="checkbox" id="favoriteStoryCheckbox">
			<a href="${story.url}" target="a_blank" class="story-link">
				${story.title}
			</a>
			<small class="story-hostname">(${hostName})</small>
			<small class="story-author">by ${story.author}</small>
			<small class="story-user">posted by ${story.username}</small>
		</li>
    `);
}

// function generateUserOwnStoryMarkup(story) {
// 	// console.debug("generateUserOwnStoryMarkup", story);

// 	const hostName = story.getHostName();
// 	// PAM3: added favorite checkbox to story html markup
// 	return $(`
// 		<li id="${story.storyId}">
// 		<button id="deleteButton"> - Delete! - </button>
// 			<input type="checkbox" id="favoriteStoryCheckbox">
// 			<a href="${story.url}" target="a_blank" class="story-link">
// 				${story.title}
// 			</a>
// 			<small class="story-hostname">(${hostName})</small>
// 			<small class="story-author">by ${story.author}</small>
// 			<small class="story-user">posted by me (${story.username})</small>
// 		</li>
//     `);
// }

/** Gets list of stories from server, generates their HTML, and puts on page. */
function putStoriesOnPage() {
	console.debug("putStoriesOnPage");

	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}

	$("input#favoriteStoryCheckbox").on("change", toggleFavoriteCheck);
	$allStoriesList.show();
}

/** Part2
 * Write a function in stories.js that is called when users submit the form.
 * PAM: doing....
 * Pick a good name for it. pam: 🤔
 * This function should get the data from the form, call the .addStory method you wrote, and then put that new story on the page.
 */
async function whenUsersSubmitTheNewStorySubmitForm(event) {
	event.preventDefault();
	console.log("whenUsersSubmitTheNewStorySubmitForm", event);

	// pam:get the data from the submit form
	const myInputValues = [
		$("#submit-story-title").val(),
		$("#submit-story-author").val(),
		$("#submit-story-url").val(),
	];
	// pam:grab the title author and source
	// pam: D-D-D-D-DESTRUCTION!!!!
	const [title, author, url] = [...myInputValues];
	console.log(`Title: ${title}\nAuthor: ${author}\nSource: ${url}`);
	// pam:call the .addStory method
	const newStoryPayload = { title, author, url };
	console.log("payload:", newStoryPayload);
	const newStory = await storyList.addStory(currentUser, newStoryPayload); // create story in making post request to api, return a story instance thats already been added to our story list
	// pam: put that new story on the page
	putStoriesOnPage();
	// PAM: part 4, comming back here cus i forgot to add the submitted stories to the users own stories array xD
	currentUser.ownStories.push(newStory);
}

$submitStoryForm.on("submit", whenUsersSubmitTheNewStorySubmitForm);

/** PAM3: Gets list of favorite stories from currentUser, generates their HTML, and puts on favorites page. */
function putFavoritesOnPage() {
	console.debug("putFavoritesOnPage");

	$favoriteStoriesList.empty();

	// loop through all of our favorite stories and generate HTML for them
	for (let story of currentUser.favorites) {
		const $story = generateStoryMarkup(story);
		$favoriteStoriesList.append($story);
	}
	// when we create the html of the entire favorite list, i want to have the checkboxes prechecked
	for (let checkbox of $("input#favoriteStoryCheckbox")) {
		checkbox.checked = true;
	}
	// add the event listener for toggling favorite on a story
	$("input#favoriteStoryCheckbox").on("change", toggleFavoriteCheck);
	// render the favorites story list
	$favoriteStoriesList.show();
}

/** PAM: PART 3
 * function to handle click event on add/remove to favorites checkbox
 */
function toggleFavoriteCheck(event) {
	//console.log("this:", this)
	console.log("toogleFavotireCheck");
	console.log("this.checked:", this.checked);
	const story_id = $(this).parent().attr("id");
	if (this.checked) {
		console.log("Favorites: ADDING", story_id);
		// add story to favorites
		currentUser.markStoryAsAFavoriteOfUser(story_id);
	} else {
		console.log("Favorites: REMOVING", story_id);
		// remove story from favorites
		currentUser.markStoryNOTAFavoriteOfUser(story_id);
	}
}

/** PAM: PART 4 getlistof users own submited stories, generate their html and puts them on the page
 *
 */
function putUsersOwnStoriesOnPage() {
	console.debug("putUsersOwnStoriesOnPage");

	$userStoriesList.empty();

	// loop through all of currenusers own stories and generate HTML for them
	for (let story of currentUser.ownStories) {
		// const $story = generateUserOwnStoryMarkup(story); // PAM4: edited a fork of the provided generateStoriesMarkup to have a delete button
		const $story = generateStoryMarkup(story);
		$userStoriesList.append($story);
	}
	// i want to have the checkboxes prechecked for stories submited that have been favorited aswell
	for (let checkbox of $("#user-stories-list input#favoriteStoryCheckbox")) {
		console.log(checkbox);
		if (checkForFavorite($(checkbox).parent().attr("id"))) {
			checkbox.checked = true;
		}
	}
	// add the event listener for toggling favorite on a story
	$("input#favoriteStoryCheckbox").on("change", toggleFavoriteCheck);
	//add the event listener for the delete button that on the story html element
	$("li button#deleteButton").on("click", removeStory);
	// render the favorites story list
	$userStoriesList.show();
}
function checkForFavorite(id) {
	let favoriteStoriesIdArray = currentUser.favorites.map(
		(element) => element.storyId
	);
	if (favoriteStoriesIdArray.includes(id)) {
		return true;
	} else {
		return false;
	}
}

async function removeStory(event) {
	console.log("removeStory");
	// console.log("removeStory, going kapoof", event);
	console.log("this", $(this).parent().attr("id"));
	const targetStoryId = $(this).parent().attr("id");
	// remove story from api and users own stories list
	let removedResponse = await storyList.removeAPIandUserOwnStory(
		currentUser,
		targetStoryId
	);
	// console.log("removedResponse:", removedResponse);
	putUsersOwnStoriesOnPage();
}
