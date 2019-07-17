// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing.jswing = jQuery.easing.swing;

jQuery.extend(jQuery.easing,
  {
    def: 'easeOutQuad',
    swing (x, t, b, c, d) {
      // alert(jQuery.easing.default);
      return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad (x, t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad (x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad (x, t, b, c, d) {
      if ((t /= d / 2) < 1) {return c / 2 * t * t + b;}
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic (x, t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic (x, t, b, c, d) {
      if ((t /= d / 2) < 1) {return c / 2 * t * t * t + b;}
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart (x, t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart (x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart (x, t, b, c, d) {
      if ((t /= d / 2) < 1) {return c / 2 * t * t * t * t + b;}
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint (x, t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint (x, t, b, c, d) {
      if ((t /= d / 2) < 1) {return c / 2 * t * t * t * t * t + b;}
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine (x, t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine (x, t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine (x, t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo (x, t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo (x, t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo (x, t, b, c, d) {
      if (t == 0) {return b;}
      if (t == d) {return b + c;}
      if ((t /= d / 2) < 1) {return c / 2 * Math.pow(2, 10 * (t - 1)) + b;}
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc (x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc (x, t, b, c, d) {
      if ((t /= d / 2) < 1) {return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;}
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic (x, t, b, c, d) {
      var s = 1.70158;
      let p = 0;
      let a = c;
      if (t == 0) {return b;}
      if ((t /= d) == 1) {return b + c;}
      if (!p) {p = d * 0.3;}
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {var s = p / (2 * Math.PI) * Math.asin(c / a);}
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic (x, t, b, c, d) {
      var s = 1.70158;
      let p = 0;
      let a = c;
      if (t == 0) {return b;}
      if ((t /= d) == 1) {return b + c;}
      if (!p) {p = d * 0.3;}
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {var s = p / (2 * Math.PI) * Math.asin(c / a);}
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic (x, t, b, c, d) {
      var s = 1.70158;
      let p = 0;
      let a = c;
      if (t == 0) {return b;}
      if ((t /= d / 2) == 2) {return b + c;}
      if (!p) {p = d * (0.3 * 1.5);}
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else {var s = p / (2 * Math.PI) * Math.asin(c / a);}
      if (t < 1) {return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;}
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    easeInBack (x, t, b, c, d, s) {
      if (s == undefined) {s = 1.70158;}
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack (x, t, b, c, d, s) {
      if (s == undefined) {s = 1.70158;}
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack (x, t, b, c, d, s) {
      if (s == undefined) {s = 1.70158;}
      if ((t /= d / 2) < 1) {return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;}
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce (x, t, b, c, d) {
      return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce (x, t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
      }
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;

    },
    easeInOutBounce (x, t, b, c, d) {
      if (t < d / 2) {return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;}
      return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    },
  });

