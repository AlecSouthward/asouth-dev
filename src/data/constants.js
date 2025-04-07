const helpMessage = `
	help: Display a list of available commands.

	git: My personal GitHub profile.

	src: The source code of this website.

	faq: Commonly asked questions about this site.
	\n
`;
const userName = "guest";
const loggedInAs = userName + "@asouth.dev>";
const githubProfileURL = 
	`<a href="https://github.com/AlecSouthward" target="_" class="blue">https://github.com/AlecSouthward</a>`;
const githubRepoURL = 
	`<a href="https://github.com/AlecSouthward/asouth-dev" target="_" class="blue">https://github.com/AlecSouthward/asouth-dev</a>`;
const directoryContent = "  README";
const commonlyAskedQuestions =`\r
Why was this created?
I wanted to test Google's App Engine.\n
`;
const readmeFile = "You found the hidden message! Congrats!";

export {
	helpMessage,
	userName,
	loggedInAs,
	githubProfileURL,
	githubRepoURL,
	directoryContent,
	commonlyAskedQuestions,
	readmeFile,
};