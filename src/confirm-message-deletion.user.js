// ==UserScript==
// @name            SE chat: Confirm message deletion
// @description     Adds a confirmation before deleting a message to prevent accidents
// @author          VLAZ
// @grant           none
// @inject-into     page
// @match           https://chat.stackoverflow.com/*
// @match           https://chat.stackexchange.com/*
// @match           https://chat.meta.stackexchange.com/*
// @namespace       https://github.com/PurpleMagick/
// @run-at          document-end
// @version         1.0.0
// ==/UserScript==
(function(){
	// keep reference to the original function
	const original = messageActionById;
	
	const caseInsensitiveCollator = new Intl.Collator("en", { sensitivity: "base"});

	const override = function(_, action) {
		// only act on delete
		// (also, case-insensitive just in case. Don't know if chat tries to uppercase it some times)
		if (caseInsensitiveCollator.compare("delete", action) === 0) {
			const result = confirm("Are you sure you want to delete?");

			//exit with no action on negative or closure
			if (!result)
				return; 
		}
		
		// run original function to apply the deletion
		return original.apply(this, arguments);
	};

	messageActionById = override;
})();
