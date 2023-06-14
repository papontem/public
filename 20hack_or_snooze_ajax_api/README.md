# 20hack_or_snooze_ajax_api

This is a public repo of the Hack or Snooze Project that i was tasked with completing some new features and adding neccessary logic to some of the starter code that I was provided.

## Project Description

🔥 If the name alone piqued your curiosity, you're absolutely correct in guessing that it's related to the Ycombinator HackerNews.

🚀 In this project, we explored an API and a webpage made for this course, aiming to replicate the marvelous HN website. I'm on the fence on whether i should add more css styling to it or leave it as the original intended copy style.

🌟 Give the original HackerNews a try and then prepare to be amazed by my version. I haven't found any disgusting bugs on it yet, do let me know of any you find. You'll probably notice a difference in the number of comments between my code and the code I was provided as a base! 😄

## What did I add?

### TLDR:

- Using AJAX practices and frameworks like jQuery and Axios, I created functions and HTML features for seamless navigation, story submission, favorite viewing, and exclusive review of user-posted stories without page reloads.

### breackdown:

1. Documentation: First i had some documentation to read and understand.

   - We had been given a short skim of the API before hand, but now i needed to familiarize myself more with the API documentation for:
     - User-related operations like user creation, signin, login token management
     - Stories operations like story creation, retrieval, internal story data.
     - And making stories favorites of a user, and or completely removing a story from the database.
   - Comprehended the existing project's already complete codebase, including inline comments, logic flow, function relationships, what were their inputs and outputs, and variable scoping, what were code block locked variables/function names and where could i use them.

2. Story Submission: Then i fullly fleshed out features that would allow the user to:

   - navigate to a story form, submit a new story.
   - transmit the information through the API with GET and POST requests.
   - and made the submitted story appear on the homepage live, without requiring a page reload.

3. Favorite Story Marking:

   - added a checkbox feature enabling the choice to mark stories as favorites of the user at any point, wherever a story is rendered on the page.
   - transmit the information through the API with a POST request.
   - navigate to a list of saved favorites, where user can then have the choice uncheck the checkbox and unfavorite a story.

4. User's Own Stories Management:

   - Developed a dedicated page where users can access their submitted stories.
   - added features to view and favorite submitted stories, along with a delete button to remove the story from the database.
   - transmit the information through the API with a DELETE request.
   - have story deletion reflect on the webpage real-time
   - also remove the story from the homepage and the user's favorite list.

## ToDo:

    **following is a list of ideas id like to implement in the future.**

- [ ] Add some error handling for when a username has already been taken or if credentials are incorrect!
- [ ] Allow users to edit stories they have created.
- [ ] Add a section for a “user profile” where a user can change their name and password in their profile.
- [ ] Style the application so that it is presentable on mobile devices. [ css : dvh]
- [ ] Add Intuitive icons for navigation and manipulating users stories, and favoriting stories.
- [ ] Add infinite scroll! When a user scrolls to the bottom of the page, load more stories.
- [ ] Make complete use of the Hack or Snooze API functionality made available to me.
