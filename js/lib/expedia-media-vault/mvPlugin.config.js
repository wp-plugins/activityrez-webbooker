var mvPlugin = mvPlugin || {};

mvPlugin.config = mvPlugin.config || {};
mvPlugin.config = (function () {
    return {
        //baseURL: "http://api.u.lemediavault.com", //for dev
		//apiKey: "829c90449f3b40219129762e1bcc3f2d", //for dev
        baseURL: "https://api.lemediavault.com", //for prod
		apiKey: "0c8b908741bc41ad86079785d5044d33", //for prod
        version: "v1"
    };
})();
