/*!
 * imagesLoaded PACKAGED v3.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {


  /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
  function EventEmitter () {
  }

  // Shortcuts to improve speed and size
  const proto = EventEmitter.prototype;
  const exports = this;
  const originalGlobalValue = exports.EventEmitter;

  /**
     * Finds the index of the listener for the event in it's storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
  function indexOfListener (listeners, listener) {
    let i = listeners.length;
    while (i--) {
      if (listeners[i].listener === listener) {
        return i;
      }
    }

    return -1;
  }

  /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
  function alias (name) {
    return function aliasClosure () {
      return this[name].apply(this, arguments);
    };
  }

  /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
  proto.getListeners = function getListeners (evt) {
    const events = this._getEvents();
    let response;
    let key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (typeof evt === 'object') {
      response = {};
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    } else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  };

  /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
  proto.flattenListeners = function flattenListeners (listeners) {
    const flatListeners = [];
    let i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  };

  /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
  proto.getListenersAsObject = function getListenersAsObject (evt) {
    const listeners = this.getListeners(evt);
    let response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  };

  /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.addListener = function addListener (evt, listener) {
    const listeners = this.getListenersAsObject(evt);
    const listenerIsWrapped = typeof listener === 'object';
    let key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener,
          once: false,
        });
      }
    }

    return this;
  };

  /**
     * Alias of addListener
     */
  proto.on = alias('addListener');

  /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after it's first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.addOnceListener = function addOnceListener (evt, listener) {
    return this.addListener(evt, {
      listener,
      once: true,
    });
  };

  /**
     * Alias of addOnceListener.
     */
  proto.once = alias('addOnceListener');

  /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.defineEvent = function defineEvent (evt) {
    this.getListeners(evt);
    return this;
  };

  /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.defineEvents = function defineEvents (evts) {
    for (let i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  };

  /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.removeListener = function removeListener (evt, listener) {
    const listeners = this.getListenersAsObject(evt);
    let index;
    let key;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  };

  /**
     * Alias of removeListener
     */
  proto.off = alias('removeListener');

  /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.addListeners = function addListeners (evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(false, evt, listeners);
  };

  /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.removeListeners = function removeListeners (evt, listeners) {
    // Pass through to manipulateListeners
    return this.manipulateListeners(true, evt, listeners);
  };

  /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.manipulateListeners = function manipulateListeners (remove, evt, listeners) {
    let i;
    let value;
    const single = remove ? this.removeListener : this.addListener;
    const multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of it's properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        if (evt.hasOwnProperty(i) && (value = evt[i])) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          } else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    } else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length;
      while (i--) {
        single.call(this, evt, listeners[i]);
      }
    }

    return this;
  };

  /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.removeEvent = function removeEvent (evt) {
    const type = typeof evt;
    const events = this._getEvents();
    let key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    } else if (type === 'object') {
      // Remove all events matching the regex.
      for (key in events) {
        if (events.hasOwnProperty(key) && evt.test(key)) {
          delete events[key];
        }
      }
    } else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  };

  /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
  proto.removeAllListeners = alias('removeEvent');

  /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.emitEvent = function emitEvent (evt, args) {
    const listeners = this.getListenersAsObject(evt);
    let listener;
    let i;
    let key;
    let response;

    for (key in listeners) {
      if (listeners.hasOwnProperty(key)) {
        i = listeners[key].length;

        while (i--) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[key][i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  };

  /**
     * Alias of emitEvent
     */
  proto.trigger = alias('emitEvent');

  /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.emit = function emit (evt) {
    const args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(evt, args);
  };

  /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
  proto.setOnceReturnValue = function setOnceReturnValue (value) {
    this._onceReturnValue = value;
    return this;
  };

  /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
  proto._getOnceReturnValue = function _getOnceReturnValue () {
    if (this.hasOwnProperty('_onceReturnValue')) {
      return this._onceReturnValue;
    }

    return true;

  };

  /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
  proto._getEvents = function _getEvents () {
    return this._events || (this._events = {});
  };

  /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
  EventEmitter.noConflict = function noConflict () {
    exports.EventEmitter = originalGlobalValue;
    return EventEmitter;
  };

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof define === 'function' && define.amd) {
    define('eventEmitter/EventEmitter', [], () => EventEmitter);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = EventEmitter;
  } else {
    this.EventEmitter = EventEmitter;
  }
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/* jshint browser: true, undef: true, unused: true */
/*global define: false */

(function (window) {


  const docElem = document.documentElement;

  let bind = function () {
  };

  function getIEEvent (obj) {
    const event = window.event;
    // add event.target
    event.target = event.target || event.srcElement || obj;
    return event;
  }

  if (docElem.addEventListener) {
    bind = function (obj, type, fn) {
      obj.addEventListener(type, fn, false);
    };
  } else if (docElem.attachEvent) {
    bind = function (obj, type, fn) {
      obj[type + fn] = fn.handleEvent ?
        function () {
          const event = getIEEvent(obj);
          fn.handleEvent.call(fn, event);
        } :
        function () {
          const event = getIEEvent(obj);
          fn.call(obj, event);
        };
      obj.attachEvent(`on${type}`, obj[type + fn]);
    };
  }

  let unbind = function () {
  };

  if (docElem.removeEventListener) {
    unbind = function (obj, type, fn) {
      obj.removeEventListener(type, fn, false);
    };
  } else if (docElem.detachEvent) {
    unbind = function (obj, type, fn) {
      obj.detachEvent(`on${type}`, obj[type + fn]);
      try {
        delete obj[type + fn];
      } catch (err) {
        // can't delete window object properties
        obj[type + fn] = undefined;
      }
    };
  }

  const eventie = {
    bind,
    unbind,
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define('eventie/eventie', eventie);
  } else {
    // browser global
    window.eventie = eventie;
  }

})(this);

/*!
 * imagesLoaded v3.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function (window) {


  const $ = window.jQuery;
  const console = window.console;
  const hasConsole = typeof console !== 'undefined';

  // -------------------------- helpers -------------------------- //

  // extend objects
  function extend (a, b) {
    for (const prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  const objToString = Object.prototype.toString;

  function isArray (obj) {
    return objToString.call(obj) === '[object Array]';
  }

  // turn element or nodeList into an array
  function makeArray (obj) {
    let ary = [];
    if (isArray(obj)) {
      // use object if already an array
      ary = obj;
    } else if (typeof obj.length === 'number') {
      // convert nodeList to array
      for (let i = 0, len = obj.length; i < len; i++) {
        ary.push(obj[i]);
      }
    } else {
      // array of single index
      ary.push(obj);
    }
    return ary;
  }

  // --------------------------  -------------------------- //

  function defineImagesLoaded (EventEmitter, eventie) {

    /**
         * @param {Array, Element, NodeList, String} elem
         * @param {Object or Function} options - if function, use as callback
         * @param {Function} onAlways - callback function
         */
    function ImagesLoaded (elem, options, onAlways) {
      // coerce ImagesLoaded() without new, to be new ImagesLoaded()
      if (!(this instanceof ImagesLoaded)) {
        return new ImagesLoaded(elem, options);
      }
      // use elem as selector string
      if (typeof elem === 'string') {
        elem = document.querySelectorAll(elem);
      }

      this.elements = makeArray(elem);
      this.options = extend({}, this.options);

      if (typeof options === 'function') {
        onAlways = options;
      } else {
        extend(this.options, options);
      }

      if (onAlways) {
        this.on('always', onAlways);
      }

      this.getImages();

      if ($) {
        // add jQuery Deferred object
        this.jqDeferred = new $.Deferred();
      }

      // HACK check async to allow time to bind listeners
      const _this = this;
      setTimeout(() => {
        _this.check();
      });
    }

    ImagesLoaded.prototype = new EventEmitter();

    ImagesLoaded.prototype.options = {};

    ImagesLoaded.prototype.getImages = function () {
      this.images = [];

      // filter & find items if we have an item selector
      for (let i = 0, len = this.elements.length; i < len; i++) {
        const elem = this.elements[i];
        // filter siblings
        if (elem.nodeName === 'IMG') {
          this.addImage(elem);
        }
        // find children
        const childElems = elem.querySelectorAll('img');
        // concat childElems to filterFound array
        for (let j = 0, jLen = childElems.length; j < jLen; j++) {
          const img = childElems[j];
          this.addImage(img);
        }
      }
    };

    /**
         * @param {Image} img
         */
    ImagesLoaded.prototype.addImage = function (img) {
      const loadingImage = new LoadingImage(img);
      this.images.push(loadingImage);
    };

    ImagesLoaded.prototype.check = function () {
      const _this = this;
      let checkedCount = 0;
      const length = this.images.length;
      this.hasAnyBroken = false;
      // complete if no images
      if (!length) {
        this.complete();
        return;
      }

      function onConfirm (image, message) {
        if (_this.options.debug && hasConsole) {
          console.log('confirm', image, message);
        }

        _this.progress(image);
        checkedCount++;
        if (checkedCount === length) {
          _this.complete();
        }
        return true; // bind once
      }

      for (let i = 0; i < length; i++) {
        const loadingImage = this.images[i];
        loadingImage.on('confirm', onConfirm);
        loadingImage.check();
      }
    };

    ImagesLoaded.prototype.progress = function (image) {
      this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
      // HACK - Chrome triggers event before object properties have changed. #83
      const _this = this;
      setTimeout(() => {
        _this.emit('progress', _this, image);
        if (_this.jqDeferred && _this.jqDeferred.notify) {
          _this.jqDeferred.notify(_this, image);
        }
      });
    };

    ImagesLoaded.prototype.complete = function () {
      const eventName = this.hasAnyBroken ? 'fail' : 'done';
      this.isComplete = true;
      const _this = this;
      // HACK - another setTimeout so that confirm happens after progress
      setTimeout(() => {
        _this.emit(eventName, _this);
        _this.emit('always', _this);
        if (_this.jqDeferred) {
          const jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
          _this.jqDeferred[jqMethod](_this);
        }
      });
    };

    // -------------------------- jquery -------------------------- //

    if ($) {
      $.fn.imagesLoaded = function (options, callback) {
        const instance = new ImagesLoaded(this, options, callback);
        return instance.jqDeferred.promise($(this));
      };
    }


    // --------------------------  -------------------------- //

    function LoadingImage (img) {
      this.img = img;
    }

    LoadingImage.prototype = new EventEmitter();

    LoadingImage.prototype.check = function () {
      // first check cached any previous images that have same src
      const resource = cache[this.img.src] || new Resource(this.img.src);
      if (resource.isConfirmed) {
        this.confirm(resource.isLoaded, 'cached was confirmed');
        return;
      }

      // If complete is true and browser supports natural sizes,
      // try to check for image status manually.
      if (this.img.complete && this.img.naturalWidth !== undefined) {
        // report based on naturalWidth
        this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
        return;
      }

      // If none of the checks above matched, simulate loading on detached element.
      const _this = this;
      resource.on('confirm', (resrc, message) => {
        _this.confirm(resrc.isLoaded, message);
        return true;
      });

      resource.check();
    };

    LoadingImage.prototype.confirm = function (isLoaded, message) {
      this.isLoaded = isLoaded;
      this.emit('confirm', this, message);
    };

    // -------------------------- Resource -------------------------- //

    // Resource checks each src, only once
    // separate class from LoadingImage to prevent memory leaks. See #115

    var cache = {};

    function Resource (src) {
      this.src = src;
      // add to cache
      cache[src] = this;
    }

    Resource.prototype = new EventEmitter();

    Resource.prototype.check = function () {
      // only trigger checking once
      if (this.isChecked) {
        return;
      }
      // simulate loading on detached element
      const proxyImage = new Image();
      eventie.bind(proxyImage, 'load', this);
      eventie.bind(proxyImage, 'error', this);
      proxyImage.src = this.src;
      // set flag
      this.isChecked = true;
    };

    // ----- events ----- //

    // trigger specified handler for event type
    Resource.prototype.handleEvent = function (event) {
      const method = `on${event.type}`;
      if (this[method]) {
        this[method](event);
      }
    };

    Resource.prototype.onload = function (event) {
      this.confirm(true, 'onload');
      this.unbindProxyEvents(event);
    };

    Resource.prototype.onerror = function (event) {
      this.confirm(false, 'onerror');
      this.unbindProxyEvents(event);
    };

    // ----- confirm ----- //

    Resource.prototype.confirm = function (isLoaded, message) {
      this.isConfirmed = true;
      this.isLoaded = isLoaded;
      this.emit('confirm', this, message);
    };

    Resource.prototype.unbindProxyEvents = function (event) {
      eventie.unbind(event.target, 'load', this);
      eventie.unbind(event.target, 'error', this);
    };

    // -----  ----- //

    return ImagesLoaded;
  }

  // -------------------------- transport -------------------------- //

  if (typeof define === 'function' && define.amd) {
    // AMD
    define([
      'eventEmitter/EventEmitter',
      'eventie/eventie',
    ],
    defineImagesLoaded);
  } else {
    // browser global
    window.imagesLoaded = defineImagesLoaded(
      window.EventEmitter,
      window.eventie
    );
  }

})(window);
