
// pywebview adds window.pywebview.api to the page a moment after it loads.

function pythonReady() { // This function waits for pywebview.api page to load
  return new Promise(function (resolve, reject) {
    if (window.pywebview && window.pywebview.api) {
      resolve(window.pywebview.api);
      return;
    }
    const timer = setTimeout(function () {
      reject(new Error('not-connected'));
    }, 1500);
    window.addEventListener('pywebviewready', function () {
      clearTimeout(timer);
      resolve(window.pywebview.api);
    }, { once: true });
  });
}

async function callPython(methodName, ...args) { //This function is able to call any method declared in the api class of app.py
  const api = await pythonReady();
  if (typeof api[methodName] !== 'function') {
    throw new Error('app.py has no method called ' + methodName);
  }
  return api[methodName](...args);
}
