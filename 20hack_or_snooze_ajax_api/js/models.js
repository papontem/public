"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {
	/** Make instance of Story from data object about story:
	 *   - {title, author, url, username, storyId, createdAt}
	 */

	constructor({ storyId, title, author, url, username, createdAt }) {
		this.storyId = storyId;
		this.title = title;
		this.author = author;
		this.url = url;
		this.username = username;
		this.createdAt = createdAt;
	}

	/** Parses hostname out of URL and returns it. */

	getHostName() {
		// UNIMPLEMENTED: complete this function!
		//PAM: DONE
		// console.log("this stories url:", this.url);
		let thisNewUrl = new URL(this.url);
		// console.log("The new URL object:", thisNewUrl);
		let hostname = thisNewUrl.hostname;
		// console.log("The Hostname:", hostname);
		return hostname;
	}
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
	constructor(stories) {
		this.stories = stories;
	}

	/** Generate a new StoryList. It:
	 *
	 *  - calls the API
	 *  - builds an array of Story instances
	 *  - makes a single StoryList instance out of that
	 *  - returns the StoryList instance.
	 */

	static async getStories() {
		// Note presence of `static` keyword: this indicates that getStories is
		//  **not** an instance method. Rather, it is a method that is called on the
		//  class directly. Why doesn't it make sense for getStories to be an
		//  instance method? because getStories builds the class's stories value, and we only want one stories we can call from in-ram and not call the api repeadetly?

		// query the /stories endpoint (no auth required)
		const response = await axios({
			url: `${BASE_URL}/stories`,
			method: "GET",
		});

		// turn plain old story objects from API into instances of Story class
		const stories = response.data.stories.map((story) => new Story(story));

		// build an instance of our own class using the new array of stories
		return new StoryList(stories);
	}

	/** Adds story data to API, makes a Story instance, adds it to story list.
	 * - user - the current instance of User who will post the story
	 * - obj of {title, author, url}
	 *
	 * Returns the new Story instance
	 */

	async addStory(currentUser, inputStory) {
		// UNIMPLEMENTED: complete this function! PAM: done
		// console.log("currentUser:", currentUser);
		// add to api, struture params for axios post request
		// Token and the fields title, author, and url are required> last three are inside story object
		let payload = {
			token: currentUser.loginToken,
			story: inputStory,
		};
		// console.log("body for post request:", payload);
		// pam: make axios api post request
		const response = await axios({
			url: `${BASE_URL}/stories`,
			method: "POST",
			data: payload,
		});
		// console.log("Response: ", response);
		// console.log("Response Data: ", response.data);
		// pam: make story instance localy, must have  {title, author, url, username, storyId, createdAt}
		let newStory = new Story(response.data.story);
		// pam: adds it to story list
		this.stories.unshift(newStory);
		//return story instance
		// console.log("newStory :", newStory);
		// console.log("story list =", storyList);
		return newStory;
	}

	/** PAM: doing
	 * Part 4: Removing Stories.
	 * Allow logged in users to remove a story.
	 * Once a story has been deleted, remove it from the DOM and let the API know its been deleted.
	 * - allow user to delete only their stories.
	 * - add a my stories tab. done
	 * - add button for user to delete the story when looking at stories in my stories tab. done
	 *
	 * @param {*} currentUser
	 * @param {*} storyDeleteId
	 */

	async removeAPIandUserOwnStory(currentUser, storyDeleteId) {
		console.log("removing story from api and local storage user own story");
		// remove story from users ownStories local data array
		currentUser.ownStories = currentUser.ownStories.filter(function (story) {
			console.log("current story id:", story.storyId);
			return story.storyId != storyDeleteId;
		});
		// prepare api HTTP resquest data
		let payload = {
			token: currentUser.loginToken,
		};
		// remove story using api
		const response = await axios({
			url: `${BASE_URL}/stories/${storyDeleteId}`,
			method: "DELETE",
			data: payload,
		});
		// remove from favorites if story is also one of favorites
		currentUser.favorites = currentUser.favorites.filter(
			(story) => story.storyId != storyDeleteId
		);
		// remove from stories list
		storyList.stories = storyList.stories.filter(
			(story) => story.storyId != storyDeleteId
		);

		// console.log("Response: ", response);
		console.log("Response Data: ", response.data);
		return response.data;
	}
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
	/** Make user instance from obj of user data and a token:
	 *   - {username, name, createdAt, favorites[], ownStories[]}
	 *   - token
	 */

	constructor(
		{ username, name, createdAt, favorites = [], ownStories = [] },
		token
	) {
		this.username = username;
		this.name = name;
		this.createdAt = createdAt;

		// instantiate Story instances for the user's favorites and ownStories
		this.favorites = favorites.map((s) => new Story(s));
		this.ownStories = ownStories.map((s) => new Story(s));

		// store the login token on the user so it's easy to find for API calls.
		this.loginToken = token;
	}

	/** Register new user in API, make User instance & return it.
	 *
	 * - username: a new username
	 * - password: a new password
	 * - name: the user's full name
	 */

	static async signup(username, password, name) {
		const response = await axios({
			url: `${BASE_URL}/signup`,
			method: "POST",
			data: { user: { username, password, name } },
		});

		let { user } = response.data;

		return new User(
			{
				username: user.username,
				name: user.name,
				createdAt: user.createdAt,
				favorites: user.favorites,
				ownStories: user.stories,
			},
			response.data.token
		);
	}

	/** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

	static async login(username, password) {
		const response = await axios({
			url: `${BASE_URL}/login`,
			method: "POST",
			data: { user: { username, password } },
		});

		let { user } = response.data;

		return new User(
			{
				username: user.username,
				name: user.name,
				createdAt: user.createdAt,
				favorites: user.favorites,
				ownStories: user.stories,
			},
			response.data.token
		);
	}

	/** When we already have credentials (token & username) for a user,
	 *   we can log them in automatically. This function does that.
	 */

	static async loginViaStoredCredentials(token, username) {
		try {
			const response = await axios({
				url: `${BASE_URL}/users/${username}`,
				method: "GET",
				params: { token },
			});

			let { user } = response.data;

			return new User(
				{
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					favorites: user.favorites,
					ownStories: user.stories,
				},
				token
			);
		} catch (err) {
			console.error("loginViaStoredCredentials failed", err);
			return null;
		}
	}

	/******************************************************************************
	 * feature marking/unmarking a story as a favorite of the current user
	 * The methods for adding and removing favorite status on a story should be defined in the User class.
	 */
	// Part 3: Favorite stories
	// Subpart 3A: Data/API Changes: write the data-logic and API-call part first,
	// understand how to favorite a story using api PAM: DONE
	// api request add favorite requiers to be a post request with token in body and the url to post to is the base url plus /users/username/favorites/storyId
	// build logic to save and unsave favorites to users favorites list pam: DONE
	// Subpart 3B: the UI
	// Allow logged in users to “favorite” and “un-favorite” a story. These stories should remain favorited when the page refreshes. PAM: DONE
	// add button/ check to favorite story with event listener to add / mark story a favorite PAM: DONE
	// using a chackbox and checking if its checked or not. PAM: DONE
	// Allow logged in users to see a separate list of favorited stories. PAM: DONE
	// add favorites nav tab PAM: DONE
	async markStoryAsAFavoriteOfUser(storyId) {
		let username = currentUser.username;
		let token = currentUser.loginToken;
		console.log("username:", username);
		console.log("storyId:", storyId);
		// console.log(
		// 	`url for request: ${BASE_URL}/users/${username}/favorites/${storyId}`
		// );
		const response = await axios({
			url: `${BASE_URL}/users/${username}/favorites/${storyId}`,
			method: "POST",
			params: { token },
		});
		console.log("Response: ", response);
		console.log("Response Data: ", response.data);
		// Now ADD story to users favorites list
		// update user favorites list
		currentUser.favorites = []; // PAM: the add favorite api call returns a favorites array aswell so we can reassing the value of current useres favorites array localy with the one thats online
		// turn favorites stories into our local stories instance type
		for (let story of response.data.user.favorites) {
			// console.log(story);
			const newLocalStory = new Story(story);
			currentUser.favorites.push(newLocalStory);
		}
		return response.data;
	}
	async markStoryNOTAFavoriteOfUser(storyId) {
		let username = currentUser.username;
		let token = currentUser.loginToken;
		console.log("username:", username);
		console.log("storyId:", storyId);
		// console.log(
		// 	`url for request: ${BASE_URL}/users/${username}/favorites/${storyId}`
		// );
		const response = await axios({
			url: `${BASE_URL}/users/${username}/favorites/${storyId}`,
			method: "DELETE",
			params: { token },
		});
		console.log("Response: ", response);
		console.log("Response Data: ", response.data);
		// now REMOVE story from users favorite list
		// update user favorites list
		currentUser.favorites = []; // PAM: the add favorite api call returns a favorites array aswell so we can reassing the value of current useres favorites array localy with the one thats online
		// turn favorites stories into our local stories instance type
		for (let story of response.data.user.favorites) {
			console.log(story);
			const newLocalStory = new Story(story);
			currentUser.favorites.push(newLocalStory);
		}
		return response.data;
	}
}
