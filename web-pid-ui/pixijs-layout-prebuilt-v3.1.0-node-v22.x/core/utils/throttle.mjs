function debounce(func, wait = 0, options = {}) {
  let lastArgs;
  let lastThis;
  const maxWait = options.maxWait ? options.maxWait : wait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  const leading = !!options.leading;
  const maxing = "maxWait" in options;
  const trailing = options.trailing ?? true;
  const useRAF = wait !== 0 && typeof globalThis.requestAnimationFrame === "function";
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function startTimer(pendingFunc, milliseconds) {
    if (useRAF) {
      if (typeof timerId === "number") {
        globalThis.cancelAnimationFrame(timerId);
      }
      return globalThis.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, milliseconds);
  }
  function cancelTimer(id) {
    if (useRAF) {
      globalThis.cancelAnimationFrame(id);
      return;
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
    return void 0;
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
function throttle(func, wait, options = {}) {
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}
export {
  debounce,
  throttle
};
//# sourceMappingURL=throttle.mjs.map
