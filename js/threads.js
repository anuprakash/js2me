/**
 * Restores suspended thread with given id.
 * @param {number} threadId Id of some thread which is currently suspended.
 */
js2me.restoreThread = function (threadId) {
	if (js2me.kill) {
		return;
	}
	if (threadId == null) {
		threadId = js2me.currentThread;
	}
	if (js2me.restoreStack[threadId] == undefined) {
		return;
	}
	var restoreStack = js2me.restoreStack[threadId].pop();
	if (restoreStack) {
		js2me.currentThread = threadId;
		if (typeof restoreStack == 'function') {
			return restoreStack();
		} else {
			return js2me.execute.apply(js2me, restoreStack);
		}
	}
};
/**
 * Launch new thread.
 * @param {function} func Action to be executed.
 */
js2me.launchThread = function (func) {
	var threadId = -js2me.lastThread;
	js2me.lastThread++;
	setTimeout(function () {
		js2me.currentThread = threadId;
		func();
	}, 1);
};
js2me.lastThread = 1;