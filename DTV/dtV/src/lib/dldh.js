import $ from './jquery';
window.$ = window.jQuery = $;
window.Dldh = {
  idSeed : 0,
  id : function(e, t) {
    t = t || "dldh-gen", e = Dldh.getDom(e);
    var n = t + ++Dldh.idSeed;
    return e ? e.id ? e.id : e.id = n : n
  },
  isOpera : navigator.userAgent.toLowerCase().indexOf("opera") > -1,
  isSafari : (/webkit|khtml/).test(navigator.userAgent.toLowerCase()),
  isGecko : !(/webkit|khtml/).test(navigator.userAgent.toLowerCase()) && navigator.userAgent.toLowerCase().indexOf("gecko") > -1,
  isAir : (/adobeair/).test(navigator.userAgent.toLowerCase()),
  isIE : navigator.userAgent.toLowerCase().indexOf("msie") > -1,
  template : function (str, config) {
    return str.replace(/\{([\w-]+)\}/g, function(c, d) {
      return config[d] !== undefined ? config[d] : "";
    });
  },
  expando: "eghjhjkrfdgghgj" + new Date(),
  cleartData: function() {
    if (!el) {
      return null;
    }
    return jQuery(Dldh.getDom(el)).data("data", null);
  },
  setData : function(el, data) {
    if (!el) {
      return null;
    }
    return jQuery(Dldh.getDom(el)).data("data", data);
  },
  getData : function(el) {
    if (!el) {
      return null;
    }
    return jQuery(Dldh.getDom(el)).data("data");
  },
  getDom : function(el) {
    if(!el) return null;
    return el.get ? el.get(0) : (typeof el == "string" ? document.getElementById(el) : el);
  },
  preanim : function(a, i) {
    return !a[i] ? false : (typeof a[i] == "object" ? a[i] : {
      duration : a[i + 1],
      callback : a[i + 2],
      easing : a[i + 3]
    });
  },
  addUnits : function(v, defaultUnit) {
    if (v === "" || v == "auto") {
      return v;
    }
    if (v === undefined) {
      return '';
    }
    if (typeof v == "number" || !/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i.test(v)) {
      return v + (defaultUnit || 'px');
    }
    return v;
  },
  inputNumber : function(e, o, max) {
    var k = e.keyCode;
    if((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8)) {
      return true;
    } else {
      return false;
    }
  },
  afterInputNumber : function(e, o, max, min) {
    if(o.value < (min || 1) || o.value > max) {
      o.value = "";
    }
  },
  /**
   * F = true 正序
   * F = false(默认) 倒序
   */
  arrayObjectSort : function(d, F) {
    return function(a, b) {
      var n = 1;
      if(!F) {
        n = -n;
      }
      var e = a[d], f = b[d];
      return e > f ? n : (e < f ? -n : 0);
    }
  },
  stopEvent : function(e) {
    Dldh.preventDefault(e);
    Dldh.stopPropagation(e);
  },
  preventDefault : function(e) {
    if(e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },
  stopPropagation : function(e) {
    if(e.type == 'mousedown') {
      return true;
    }
    if(e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  },
  htmlEncode : function(value) {
    return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  },
  htmlDecode : function(value) {
    return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  },
  Event: {
    bind: function(dom, eventName, fn, scope, capture) {
      var hd = function(e) {
        fn.call(scope || dom, e);
      }
      fn.hd = hd;
      if(window.addEventListener) {
        dom.addEventListener(eventName, hd, !!capture || false);
      } else if(window.attachEvent) {
        dom.attachEvent("on" + eventName, hd);
      }
    },
    unbind: function(dom, eventName, fn, scope, capture) {
      if(window.removeEventListener) {
        dom.removeEventListener(eventName, fn.hd, !!capture || false);
      } else if(window.detachEvent) {
        dom.detachEvent("on" + eventName, fn.hd);
      }
      delete fn.hd;
    }
  },
  Css : {
    unselectable : function(el) {
      jQuery(el).addClass("cls-unselectable");
    },
    hasClass : function(el, className) {
      el = Dldh.getDom(el);
      return className && (' ' + el.className + ' ').indexOf(' ' + className + ' ') != -1;
    },
    addStyles : function(el, sides, styles) {
      var val = 0, v, w;
      el = jQuery(Dldh.getDom(el));
      for (var i = 0, len = sides.length; i < len; i++) {
        v = el.css(styles[sides.charAt(i)]);
        if (v) {
          w = parseInt(v, 10);
          if (w) {
            val += w;
          }
        }
      }
      return val;
    },
    getBorderWidth : function(el, side) {
      return Dldh.Css.addStyles(el, side, {
        l : "border-left-width",
        r : "border-right-width",
        t : "border-top-width",
        b : "border-bottom-width"
      });
    },
    getPadding : function(el, side) {
      return Dldh.Css.addStyles(el, side, {
        l : "padding-left",
        r : "padding-right",
        t : "padding-top",
        b : "padding-bottom"
      });
    },
    getMargins : function(el, side) {
      if (!side) {
        el = jQuery(Dldh.getDom(el));
        return {
          top : parseInt(el.css("margin-top"), 10) || 0,
          left : parseInt(el.css("margin-left"), 10) || 0,
          bottom : parseInt(el.css("margin-bottom"), 10) || 0,
          right : parseInt(el.css("margin-right"), 10) || 0
        };
      } else {
        return Dldh.Css.addStyles(el, side, {
          l : "margin-left",
          r : "margin-right",
          t : "margin-top",
          b : "margin-bottom"
        });
      }
    },
    adjustWidth : function(el, width) {
      if (typeof width == "number") {
        width -= (Dldh.Css.getBorderWidth(el, "lr") + Dldh.Css.getPadding(el, "lr"));
        if (width < 0) {
          width = 0;
        }
      }
      return width;
    },
    adjustHeight : function(el, height) {
      if (typeof height == "number") {
        height -= (Dldh.Css.getBorderWidth(el, "tb") + Dldh.Css.getPadding(el, "tb"));
        if (height < 0) {
          height = 0;
        }
      }
      return height;
    },
    isVisible : function(el, deep) {
      el = jQuery(Dldh.getDom(el));
      var vis = !(el.css("visibility") == "hidden" || el.css("display") == "none");
      if (deep !== true || !vis) {
        return vis;
      }
      return true;
    },
    setBounds : function(el, x, y, width, height, animate, time, cb) {
      el = Dldh.getDom(el);
      if(!animate) {
        Dldh.Css.setSize(el, width, height);
        Dldh.Css.setXY(el, [x, y]);
      } else {
        width = Dldh.Css.adjustWidth(el, width);
        height = Dldh.Css.adjustHeight(el, height);
        Dldh.lib.Anim.motion(el, {
          points : {
            to : [x, y]
          },
          width : {
            to : width
          },
          height : {
            to : height
          }
        } , time ? time : 0.35, "motion", cb);
      }
      return el;
    },
    getBox : function(el, contentBox, local) {
      var xy, el_jq;
      el = Dldh.getDom(el);
      el_jq = jQuery(el);
      if (!local) {
        xy = Dldh.Css.getXY(el);
      } else {
        var left = parseInt(el_jq.css("left"), 10) || 0;
        var top = parseInt(el_jq.css("top"), 10) || 0;
        xy = [left, top];
      }
      var w = el.offsetWidth, h = el.offsetHeight, bx;
      if (!contentBox) {
        bx = {
          x : xy[0],
          y : xy[1],
          0 : xy[0],
          1 : xy[1],
          width : w,
          height : h
        };
      } else {
        var l = Dldh.Css.getBorderWidth(el, "l") + Dldh.Css.getPadding(el, "l");
        var r = Dldh.Css.getBorderWidth(el, "r") + Dldh.Css.getPadding(el, "r");
        var t = Dldh.Css.getBorderWidth(el, "t") + Dldh.Css.getPadding(el, "t");
        var b = Dldh.Css.getBorderWidth(el, "b") + Dldh.Css.getPadding(el, "b");
        bx = {
          x : xy[0] + l,
          y : xy[1] + t,
          0 : xy[0] + l,
          1 : xy[1] + t,
          width : w - (l + r),
          height : h - (t + b)
        };
      }
      bx.right = bx.x + bx.width;
      bx.bottom = bx.y + bx.height;
      return bx;
    },
    getViewWidth : function(full) {
      return full ? Dldh.Css.getDocumentWidth() : Dldh.Css.getViewportWidth();
    },
    getViewHeight : function(full) {
      return full ? Dldh.Css.getDocumentHeight() : Dldh.Css.getViewportHeight();
    },
    getDocumentHeight : function() {
      var E = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
      if(Dldh.isSafari) {
        E = document.body.scrollHeight;
      }
      return Math.max(E, Dldh.Css.getViewportHeight());
    },
    getDocumentWidth : function() {
      var E = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
      if(Dldh.isSafari) {
        E = document.body.scrollWidth;
      }
      return Math.max(E, Dldh.Css.getViewportWidth());
    },
    getViewportHeight : function() {
      var E = self.innerHeight;
      var F = document.compatMode;
      if ((F || Dldh.isIE) && !Dldh.isOpera) {
        E = (F == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
      }
      return E;
    },
    getViewportWidth : function() {
      var E = self.innerWidth;
      var F = document.compatMode;
      if (F || Dldh.isIE) {
        E = (F == "CSS1Compat") ? document.documentElement.clientWidth : document.body.clientWidth;
      }
      return E;
    },
    getScroll : function(el) {
      el = Dldh.getDom(el);
      if (el == document || el == document.body) {
        var l = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        var t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        return {
          left : l,
          top : t
        };
      } else {
        return {
          left : el.scrollLeft,
          top : el.scrollTop
        };
      }
    },
    getY : function(el) {
      return Dldh.Css.getXY(el)[1];
    },
    getX : function(el) {
      return Dldh.Css.getXY(el)[0];
    },
    getXY : function(el) {
      var p,
      pe,
      b,
      bt,
      bl,
      dbd,
      x = 0,
      y = 0,
      scroll,
      hasAbsolute,
      bd = (document.body || document.documentElement),
      ret = [0, 0];
      el = Dldh.getDom(el);
      if (el != bd) {
        if (el.getBoundingClientRect) {
          b = el.getBoundingClientRect();
          scroll = Dldh.Css.getScroll(document);
          ret = [Math.round(b.left + scroll.left), Math.round(b.top + scroll.top)];
        } else {
          p = el;
          hasAbsolute = jQuery(el).css("position") == "absolute";
          while (p) {
            pe = jQuery(p);
            x += p.offsetLeft;
            y += p.offsetTop;
            hasAbsolute = hasAbsolute || pe.css("position") == "absolute";
            if (Dldh.isGecko) {
              y += bt = parseInt(pe.css("borderTopWidth"), 10) || 0;
              x += bl = parseInt(pe.css("borderLeftWidth"), 10) || 0;
              if (p != el && !pe.css('overflow') == 'visible') {
                x += bl;
                y += bt;
              }
            }
            p = p.offsetParent;
          }
          if (Dldh.isSafari && hasAbsolute) {
            x -= bd.offsetLeft;
            y -= bd.offsetTop;
          }
          if (Dldh.isGecko && !hasAbsolute) {
            dbd = jQuery(bd);
            x += parseInt(dbd.css("borderLeftWidth"), 10) || 0;
            y += parseInt(dbd.css("borderTopWidth"), 10) || 0;
          }
          p = el.parentNode;
          while (p && p != bd) {
            if (!Dldh.isOpera || (p.tagName != 'TR' && !jQuery(p).css("display") == "inline")) {
              x -= p.scrollLeft;
              y -= p.scrollTop;
            }
            p = p.parentNode;
          }
          ret = [x, y];
        }
      }
      return ret;
    },
    setXY : function(el, xy) {
      el = Dldh.getDom(el);
      Dldh.Css.position(el);
      var pts = Dldh.Css.translatePoints(el, xy), style = el.style, pos;
      for (pos in pts) {
        if (!isNaN(pts[pos])) {
          style[pos] = pts[pos] + "px";
        }
      }
    },
    setX : function(el, x) {
      Dldh.Css.setXY(el, [x, false]);
    },
    setY : function(el, y) {
      Dldh.Css.setXY(el, [false, y]);
    },
    translatePoints : function(el, x, y) {
      el = Dldh.getDom(el);
      var el_jq = jQuery(el);
      if (typeof x == 'object' || x instanceof Array) {
        y = x[1];
        x = x[0];
      }
      var p = el_jq.css('position');
      var o = Dldh.Css.getXY(el);
      var l = parseInt(el_jq.css('left'), 10);
      var t = parseInt(el_jq.css('top'), 10);
      if (isNaN(l)) {
        l = (p == "relative") ? 0 : el.offsetLeft;
      }
      if (isNaN(t)) {
        t = (p == "relative") ? 0 : el.offsetTop;
      }
      return {
        left : (x - o[0] + l),
        top : (y - o[1] + t)
      };
    },
    position : function(el, pos, zIndex, x, y) {
      el = Dldh.getDom(el);
      var el_jq = jQuery(el);
      if (!pos) {
        if (el_jq.css('position') == 'static') {
          el_jq.css('position', 'relative');
        }
      } else {
        el_jq.css("position", pos);
      }
      if (zIndex) {
        el_jq.css("zIndex", zIndex);
      }
      if (x !== undefined && y !== undefined) {
        Dldh.Css.setXY(el, [x, y]);
      } else if (x !== undefined) {
        Dldh.Css.setX(el, x);
      } else if (y !== undefined) {
        Dldh.Css.setY(el, y);
      }
    },
    getAnchorXY : function(el, anchor, local, s) {
      var w, h, vp = false;
      el = Dldh.getDom(el);
      if (!s) {
        if (el == document.body || el == document) {
          vp = true;
          w = Dldh.Css.getViewWidth();
          h = Dldh.Css.getViewHeight();
        } else {
          w = Dldh.Css.getWidth(el);
          h = Dldh.Css.getHeight(el);
        }
      } else {
        w = s.width;
        h = s.height;
      }
      var x = 0, y = 0, r = Math.round;
      switch ((anchor || "tl").toLowerCase()) {
        case "c" :
          x = r(w * .5);
          y = r(h * .5);
          break;
        case "t" :
          x = r(w * .5);
          y = 0;
          break;
        case "l" :
          x = 0;
          y = r(h * .5);
          break;
        case "r" :
          x = w;
          y = r(h * .5);
          break;
        case "b" :
          x = r(w * .5);
          y = h;
          break;
        case "tl" :
          x = 0;
          y = 0;
          break;
        case "bl" :
          x = 0;
          y = h;
          break;
        case "br" :
          x = w;
          y = h;
          break;
        case "tr" :
          x = w;
          y = 0;
          break;
      }
      if (local === true) {
        return [x, y];
      }
      if (vp) {
        var sc = Dldh.Css.getScroll(el);
        return [x + sc.left, y + sc.top];
      }
      var o = Dldh.Css.getXY(el);
      return [x + o[0], y + o[1]];
    },
    getAlignToXY : function(el, pel, p, o) {
      pel = Dldh.getDom(pel);
      if (!pel) {
        throw "Element.alignTo with an element that doesn't exist";
      }
      var c = false, p1 = "", p2 = "";
      el = Dldh.getDom(el);
      o = o || [0, 0];
      if (!p) {
        p = "tl-bl";
      } else if (p == "?") {
        p = "tl-bl?";
      } else if (p.indexOf("-") == -1) {
        p = "tl-" + p;
      }
      p = p.toLowerCase();
      var m = p.match(/^([a-z]+)-([a-z]+)(\?)?$/);
      if (!m) {
        throw "Element.alignTo with an invalid alignment " + p;
      }
      p1 = m[1];
      p2 = m[2];
      c = !!m[3];
      var a1 = Dldh.Css.getAnchorXY(el, p1, true);
      var a2 = Dldh.Css.getAnchorXY(pel, p2, false);
      var x = a2[0] - a1[0] + o[0];
      var y = a2[1] - a1[1] + o[1];
      if (c) {
        var w = Dldh.Css.getWidth(el), h = Dldh.Css.getHeight(el), r = Dldh.lib.Region.getRegion(pel);
        var dw = Dldh.Css.getViewWidth() - 5, dh = Dldh.Css.getViewHeight() - 5;
        var p1y = p1.charAt(0), p1x = p1.charAt(p1.length - 1);
        var p2y = p2.charAt(0), p2x = p2.charAt(p2.length - 1);
        var swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
        var swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));
        var scrollX = (document.documentElement.scrollLeft || document.body.scrollLeft || 0) + 5;
        var scrollY = (document.documentElement.scrollTop || document.body.scrollTop || 0) + 5;
        if ((x + w) > dw + scrollX) {
          x = swapX ? r.left - w : dw + scrollX - w;
        }
        if (x < scrollX) {
          x = swapX ? r.right : scrollX;
        }
        if ((y + h) > dh + scrollY) {
          y = swapY ? r.top - h : dh + scrollY - h;
        }
        if (y < scrollY) {
          y = swapY ? r.bottom : scrollY;
        }
      }
      return [x, y];
    },
    getCenterXY : function(el) {
      return Dldh.Css.getAlignToXY(el, document, 'c-c');
    },
    alignTo : function(el, element, position, offsets, animate) {
      var xy = Dldh.Css.getAlignToXY(el, element, position, offsets);
      return Dldh.Css.setXY(el, xy, Dldh.preanim(arguments, 3));
    },
    center : function(el, centerIn) {
      return Dldh.Css.alignTo(el, centerIn || document, 'c-c');
    },
    setSize : function(el, width, height, animate) {
      el = Dldh.getDom(el);
      if(typeof width == 'object') {
        width = width.width;
        height = width.height;
      }
      width = Dldh.Css.adjustWidth(el, width);
      height = Dldh.Css.adjustHeight(el, height);
      if(!animate) {
        el.style.width = Dldh.addUnits(width);
        el.style.height = Dldh.addUnits(height);
      } else {
        /*el.anim({
          width : {
            to : width
          },
          height : {
            to : height
          }
        }, Dldh.preanim(arguments, 2));*/
      }
      return el;
    },
    getHeight : function(el, contentHeight) {
      el = Dldh.getDom(el);
      var h = el.offsetHeight || 0;
      return contentHeight !== true ? h : h - Dldh.Css.getBorderWidth(el, "tb") - Dldh.Css.getPadding(el, "tb");
    },
    getWidth : function(el, contentWidth) {
      el = Dldh.getDom(el);
      var w = el.offsetWidth || 0;
      return contentWidth !== true ? w : w - Dldh.Css.getBorderWidth(el, "lr") - Dldh.Css.getPadding(el, "lr");
    },
    setWidth : function(el, width, animate) {
      el = Dldh.getDom(el);
      width = Dldh.Css.adjustWidth(el, width);
      if (!animate) {
        el.style.width = Dldh.addUnits(width);
      } else {
        /*Dldh.lib.Anim.motion(el, {
          "width" : {
            "to" : 498
          },
          "height" : {
            "to" : 298
          }
        } , 0.35, "easeOut");*/
      }
    },
    setHeight : function(el, height, animate) {
      el = Dldh.getDom(el);
      height = Dldh.Css.adjustHeight(el, height);
      if (!animate) {
        el.style.height = Dldh.addUnits(height);
      } else {
        /*this.anim({
          height : {
            to : height
          }
        }, this.preanim(arguments, 1));*/
      }
      return this;
    },
    getLeft : function(el, local) {
      el = Dldh.getDom(el);
      if (!local) {
        return Dldh.Css.getX(el);
      } else {
        return parseInt(jQuery(el).css("left"), 10) || 0;
      }
    },
    getRight : function(el, local) {
      if (!local) {
        return Dldh.Css.getX(el) + Dldh.Css.getWidth(el);
      } else {
        return (Dldh.Css.getLeft(el, true) + Dldh.Css.getWidth(el)) || 0;
      }
    },
    getTop : function(el, local) {
      el = Dldh.getDom(el);
      if (!local) {
        return Dldh.Css.getY(el);
      } else {
        return parseInt(jQuery(el).css("top"), 10) || 0;
      }
    },
    getBottom : function(el, local) {
      if (!local) {
        return Dldh.Css.getY(el) + Dldh.Css.getHeight(el);
      } else {
        return (Dldh.Css.getTop(el, true) + Dldh.Css.getHeight(el)) || 0;
      }
    },
    setLeftTop : function(el, left, top) {
      el = Dldh.getDom(el);
      el.style.left = Dldh.addUnits(left);
      el.style.top = Dldh.addUnits(top);
      return el;
    },
    setLeft : function(el, left) {
      el = jQuery(Dldh.getDom(el));
      return el.css("left", Dldh.addUnits(left));
    },
    setTop : function(el, top) {
      el = jQuery(Dldh.getDom(el));
      return el.css("top", Dldh.addUnits(top));
    },
    setRight : function(el, right) {
      el = jQuery(Dldh.getDom(el));
      return el.css("right", Dldh.addUnits(right));
    },
    setBottom : function(el, bottom) {
      el = jQuery(Dldh.getDom(el));
      return el.css("bottom", Dldh.addUnits(bottom));
    }
  },
  lib : {}
  //util : {}
  //ui : {}
};
Dldh.lib.Region = function(G, H, E, F) {
  this.top = G;
  this[1] = G;
  this.right = H;
  this.bottom = E;
  this.left = F;
  this[0] = F;
};
Dldh.lib.Region.prototype = {
  contains : function(E) {
    return (E.left >= this.left && E.right <= this.right && E.top >= this.top && E.bottom <= this.bottom);
  },
  getArea : function() {
    return ((this.bottom - this.top) * (this.right - this.left));
  },
  intersect : function(I) {
    var G = Math.max(this.top, I.top);
    var H = Math.min(this.right, I.right);
    var E = Math.min(this.bottom, I.bottom);
    var F = Math.max(this.left, I.left);
    if (E >= G && H >= F) {
      return new Dldh.lib.Region(G, H, E, F);
    } else {
      return null;
    }
  },
  union : function(I) {
    var G = Math.min(this.top, I.top);
    var H = Math.max(this.right, I.right);
    var E = Math.max(this.bottom, I.bottom);
    var F = Math.min(this.left, I.left);
    return new Dldh.lib.Region(G, H, E, F);
  },
  adjust : function(G, F, E, H) {
    this.top += G;
    this.left += F;
    this.right += H;
    this.bottom += E;
    return this;
  }
};
Dldh.lib.Region.getRegion = function(el) {
  el = Dldh.getDom(el);
  var J = Dldh.Css.getXY(el);
  var G = J[1];
  var I = J[0] + el.offsetWidth;
  var E = J[1] + el.offsetHeight;
  var F = J[0];
  return new Dldh.lib.Region(G, I, E, F);
}
Dldh.lib.Point = function(E, F) {
  if (E instanceof Array) {
    F = E[1];
    E = E[0]
  }
  this.x = this.right = this.left = this[0] = E;
  this.y = this.top = this.bottom = this[1] = F
};
Dldh.lib.Point.prototype = new Dldh.lib.Region();
Dldh.DragDrop = function(el, config) {
  if(el) {
    this.init(el, config);
  }
}
Dldh.DragDrop.prototype = {
  deltaX : 0,
  deltaY : 0,
  increaseX : 0,
  increaseY : 0,
  startX : 0,
  startY : 0,
  startPageX : 0,
  startPageY : 0,
  endPageX : 0,
  endPageY : 0,
  minX : 0,
  minY : 0,
  maxX : 0,
  maxY : 0,
  lockX : false,
  lockY : false,
  preventDefault : true,
  stopPropagation : true,
  clickTimeThresh : 350,
  clickTimeout : null,
  locked : false,
  lock : function() {
    this.locked = true;
  },
  unlock : function() {
    this.locked = false;
  },
  isLocked : function() {
    return this.locked;
  },
  getEl : function() {
    return this.el;
  },
  setEl : function(el) {
    this.el = Dldh.getDom(el);
  },
  getDrag : function() {
    return this.drag;
  },
   setDrag : function(drag) {
    this.drag = Dldh.getDom(drag);
  },
  getHandle : function() {
    return this.handle;
  },
  setHandle : function(handle) {
    if(typeof handle == "string" || handle.length === undefined) {
      handle = Dldh.getDom(handle);
      if(!handle) {
        return;
      }
    }
    this.removeHandle();
    if(handle.length) {
      var r = [], h;
      for(var i = 0; i < handle.length; i++) {
        h = Dldh.getDom(handle[i]);
        r.push(h);
        jQuery(h).bind("mousedown", {scope : this}, this._handleMouseDown);
      }
      return this.handle = r.length == 1 ? r[0] : r;
    } else {
      jQuery(handle).bind("mousedown", {scope : this}, this._handleMouseDown);
      return this.handle = handle;
    }
  },
  addHandle : function(handle) {
    handle = Dldh.getDom(handle);
    if(!handle) {
      return;
    }
    var hs, h;
    if(Object.prototype.toString.apply(this.getHandle()) === '[object Array]') {
      hs = this.getHandle();
    } else {
      hs = [this.getHandle()];
    }
    if(handle.length) {
      for(var i = 0; i < handle.length; i++) {
        h = Dldh.getDom(handle[i]);
        hs.push(h);
        jQuery(h).bind("mousedown", {scope : this}, this._handleMouseDown);
      }
    } else {
      hs.push(handle);
      jQuery(handle).bind("mousedown", {scope : this}, this._handleMouseDown);
    }
    return this.handle = hs.length == 1 ? hs[0] : hs;
  },
  removeHandle : function() {
    var handle = this.getHandle();
    if(handle.length) {
      for(var i = 0; i < handle.length; i++) {
        jQuery(handle[i]).unbind("mousedown", this._handleMouseDown);
      }
    } else {
      jQuery(handle).unbind("mousedown", this._handleMouseDown);
    }
  },
  setDelta : function(iDeltaX, iDeltaY) {
    this.deltaX = iDeltaX;
    this.deltaY = iDeltaY;
  },
  proxyId : "ddddddddproxy",
  resizeProxy : true,
  createProxy : function(proxy) {
    var body = document.body;
    if(typeof proxy === "string") {
      this.proxyId = proxy;
    }
    this.proxy = Dldh.getDom(proxy);
    if(this.proxy === null || this.proxy === true) {
      this.proxy = document.createElement("div");
      this.proxy.id = this.proxyId;
      this.proxy.className = "cls-dragDrop-proxy";
      body.insertBefore(this.proxy, body.firstChild);
    }
    if(this.resizeProxy) {
      Dldh.Css.setSize(this.proxy, this.getEl().offsetWidth, this.getEl().offsetHeight);
    }
    return this.proxy;
  },
  init : function(el, config) {
    jQuery.extend(this, config);
    this.scope = this.scope || this;
    this.setEl(el);
    this.setDrag((!!this.proxy) ? this.createProxy(this.proxy) : el);
    this.setHandle(this.handle ? this.handle : el);
    this.isTarget = (this.isTarget !== false);
    if(this.constrain !== false) {
      this.setConstrain(this.constrain ? this.constrain : document.body);
    }
  },
  setConstrain : function(constain) {
    this.constain = Dldh.getDom(constain);
    var b = Dldh.Css.getBox(this.getEl()),
    xy = Dldh.Css.getXY(this.constain), c;
    if(this.constain == document.body) {
      var s = Dldh.Css.getScroll(document.body);
      c = {
        x : xy[0],
        y : xy[1],
        width : Dldh.Css.getViewWidth(true),
        height : Dldh.Css.getViewHeight(true)
      };
    } else {
      c = {
        x : xy[0],
        y : xy[1],
        width : this.constain.clientWidth,
        height : this.constain.clientHeight
      };
    }
    this.minX = c.x + Dldh.Css.getBorderWidth(this.constain, "l");
    this.minY = c.y + Dldh.Css.getBorderWidth(this.constain, "t");
    this.maxX = this.minX + c.width - b.width;
    this.maxY = this.minY + c.height - b.height;
  },
  setStartPos : function(pos) {
    var p = pos || Dldh.Css.getXY(this.getEl());
    this.startPageX = this.endPageX = p[0];
    this.startPageY = this.endPageY = p[1];
    this.setDragPos([this.startPageX, this.startPageY]);
  },
  setHandlePos : function(pos) {
    Dldh.Css.setXY(this.handle, pos);
  },
  setDragPos : function(pos) {
    Dldh.Css.setXY(this.getDrag(), pos);
  },
  setElPos : function(pos) {
    Dldh.Css.setXY(this.getEl(), pos);
  },
  showDrag : function() {
    this.getDrag().style.visibility = "visible";
  },
  hideDrag : function() {
    this.getDrag().style.visibility = "hidden";
  },
  onMouseDown : function(e) {
  },
  onMouseMove : function(e) {
  },
  onMouseUp : function(e) {
  },
  _handleMouseDown : function(e) {
    var opt = e.data;
    if(opt && opt.scope) {
      opt.scope.handleMouseDown(e, e.target, {dom : this});
    }
  },
  _handleMouseMove : function(e) {
    var opt = e.data;
    if(opt && opt.scope) {
      opt.scope.handleMouseMove(e, e.target, {dom : this});
    }
  },
  _handleMouseUp : function(e) {
    var opt = e.data;
    if(opt && opt.scope) {
      opt.scope.handleMouseUp(e, e.target, {dom : this});
    }
  },
  handleMouseDown : function(e, target, opt) {
    if(e.button != 0 && e.button != 1) {
      return;
    }
    this.currentHandle = opt.dom;
    this.setStartPos();
    this.startX = e.pageX;
    this.startY = e.pageY;
    //this.startX = e.pageX || e.getPageX();
    //this.startY = e.pageY || e.getPageY();
    this.increaseX = this.startX - this.startPageX;
    this.increaseY = this.startY - this.startPageY;
    this.unlock();
    jQuery(document).bind("mousemove", {scope : this}, this._handleMouseMove);
    jQuery(document).bind("mouseup", {scope : this}, this._handleMouseUp);
    var self = this;
    //this.clickTimeout = setTimeout(function() {
      //clearTimeout(self.clickTimeout);
      self.showDrag();
    //}, this.clickTimeThresh);
    this.onMouseDown(e, target, opt);
    this.stopEvent(e);
  },
  handleMouseMove : function(e) {
    if(this.isLocked()) {
      return;
    }
    this.showDrag();
    this.endX = e.pageX;
    this.endY = e.pageY;
    //this.endX = e.pageX || e.getPageX();
    //this.endY = e.pageY || e.getPageY();
    this.endPageX = this.endX - this.increaseX;
    this.endPageY = this.endY - this.increaseY;
    if(this.constrain !== false) {
      if(this.endPageX < this.minX) {
        this.endPageX = this.minX;
      }
      if(this.endPageX > this.maxX) {
        this.endPageX = this.maxX;
      }
      if(this.endPageY < this.minY) {
        this.endPageY = this.minY;
      }
      if(this.endPageY > this.maxY) {
        this.endPageY = this.maxY;
      }
    }
    if(this.lockX) {
      this.endPageX = this.startPageX;
    }
    if(this.lockY) {
      this.endPageY = this.startPageY;
    }
    this.setDragPos([this.endPageX, this.endPageY]);
    this.onMouseMove(e);
    this.stopEvent(e);
  },
  handleMouseUp : function(e) {
    clearTimeout(this.clickTimeout);
    this.lock();
    if(this.proxy) {
      this.hideDrag();
    }
    if(this.proxy) {
      this.setElPos([this.endPageX, this.endPageY]);
    }
    jQuery(document).unbind("mousemove", this._handleMouseMove);
    jQuery(document).unbind("mouseup", this._handleMouseUp);
    this.onMouseUp(e);
    this.stopEvent(e);
  },
  stopEvent : function(e) {
    if(this.stopPropagation) {
      Dldh.stopPropagation(e);
    }
    if(this.preventDefault) {
      Dldh.preventDefault(e);
    }
  }
};
Dldh.Resizable = function(el, config) {
  if(el) {
    this.init(el, config);
  }
}
Dldh.Resizable.prototype = {
  shadow: null,
  proxyBorder : [0, 0],
  //adjustments : [0, 0],
  //animate : false,
  disableTrackOver : false,
  //draggable : false,
  //duration : 0.35,
  //dynamic : false,
  //easing : "easeOutStrong",
  enabled : true,
  handles : false,
  multiDirectional : false,
  height : null,
  width : null,
  heightIncrement : 0,
  widthIncrement : 0,
  minHeight : 5,
  minWidth : 5,
  maxHeight : 10000,
  maxWidth : 10000,
  minX : 0,
  minY : 0,
  pinned : false,
  preserveRatio : false,
  resizeChild : false,
  transparent : false,
  init : function(el, config) {
    if(!el) {
      return;
    }
    jQuery.extend(this, config);
    el = Dldh.getDom(el);
    this.el = el;
    this.$el = jQuery(el);
    this.shadow = config.shadow;
    if (this.wrap) {
      this.resizeChild = this.el;
      this.wrap = document.createElement("div");
      this.wrap.className = "xresizable-wrap";
      this.el.parentNode.insertBefore(this.wrap, this.el);
      this.wrap.appendChild(this.el);
      this.el.id = this.resizeChild.id + "-rzwrap";
      this.el.style.overflow = "hidden";
    }
    this.proxy = document.createElement("div");
    this.proxy.id = this.el.id + "-rzproxy";
    this.proxy.className = "cls-resizable-proxy";
    this.proxyBorder = [Dldh.Css.getBorderWidth(this.proxy, "lr"), Dldh.Css.getBorderWidth(this.proxy, "tb")];
    Dldh.Css.unselectable(this.proxy);
    this.proxy.style.display = "none";
    this.el.parentNode.appendChild(this.proxy);
    this.$proxy = jQuery(this.proxy);
    if (this.pinned) {
      this.disableTrackOver = true;
      this.$el.addClass("cls-resizable-pinned");
    }
    var pos = this.$el.css("position");
    if (pos != "absolute" && pos != "fixed") {
      this.$el.css("position", "relative");
    }
    if (!this.handles) {
      this.handles = "s,e,se";
      if (this.multiDirectional) {
        this.handles += ",n,w";
      }
    }
    if (this.handles == "all") {
      this.handles = "n s e w ne nw se sw";
    }
    var o = this.handles.split(/\s*?[,;]\s*?| /);
    var c = Dldh.Resizable.positions;
    for (var j = 0, l = o.length; j < l; j++) {
      if (o[j] && c[o[j]]) {
        var n = c[o[j]];
        this[n] = new Dldh.Resizable.Handle(this, n, this.disableTrackOver, this.transparent, this.handleCls);
      }
    }
    this.corner = this.southeast;
    if (this.handles.indexOf("n") != -1 || this.handles.indexOf("w") != -1) {
      this.updateBox = true;
    }
    this.activeHandle = null;
    if (this.width !== null && this.height !== null) {
      this.resizeTo(this.width, this.height);
    } else {
      //this.updateChildSize();
    }
    if (Dldh.isIE) {
      this.el.style.zoom = 1;
    }
  },
  constrain : function(b, c, a, d) {
    if (b - c < a) {
      c = b - a;
    } else {
      if (b - c > d) {
        c = b - d;
      }
    }
    return c;
  },
  snap : function(c, e, b) {
    if (!e || !c) {
      return c
    }
    var d = c;
    var a = c % e;
    if (a > 0) {
      if (a > (e / 2)) {
        d = c + (e - a)
      } else {
        d = c - a
      }
    }
    return Math.max(b, d)
  },
  resizeElement : function() {
    var a = Dldh.Css.getBox(this.proxy);
    a.x = parseInt(this.proxy.style.left, 10);
    a.y = parseInt(this.proxy.style.top, 10);
    if (this.updateBox) {
      this.$el.css({
        left : a.x,
        top : a.y,
        width : a.width,
        height : a.height
      });
    }
    if(this.shadow) {
      this.shadow.realign(Dldh.Css.getX(this.el), Dldh.Css.getY(this.el), Dldh.Css.getWidth(this.el), Dldh.Css.getHeight(this.el));
    }
    //this.updateChildSize();
    if (!this.dynamic) {
      this.$proxy.hide()
    }
    return a;
  },
  resizeMove : function(e) {
    if(this.resizing) {
      if (this.enabled && this.activeHandle) {
        try {
          if (this.resizeRegion && !this.resizeRegion.contains(e.getPoint())) {
            return;
          }
          var t = this.curSize || this.startBox,
          l = this.startBox.x,
          k = this.startBox.y,
          c = l,
          b = k,
          m = t.width,
          u = t.height,
          d = m,
          o = u,
          n = this.minWidth,
          A = this.minHeight,
          s = this.maxWidth,
          D = this.maxHeight,
          i = this.widthIncrement,
          a = this.heightIncrement,
          B = [e.pageX, e.pageY],
          r = -(this.startPoint[0] - Math.max(this.minX, B[0])),
          p = -(this.startPoint[1] - Math.max(this.minY, B[1])),
          j = this.activeHandle.position, E, g;
          switch (j) {
            case "east" :
              m += r;
              m = Math.min(Math.max(n, m), s);
              break;
            case "south" :
              u += p;
              u = Math.min(Math.max(A, u), D);
              break;
            case "southeast" :
              m += r;
              u += p;
              m = Math.min(Math.max(n, m), s);
              u = Math.min(Math.max(A, u), D);
              break;
            case "north" :
              p = this.constrain(u, p, A, D);
              k += p;
              u -= p;
              break;
            case "west" :
              r = this.constrain(m, r, n, s);
              l += r;
              m -= r;
              break;
            case "northeast" :
              m += r;
              m = Math.min(Math.max(n, m), s);
              p = this.constrain(u, p, A, D);
              k += p;
              u -= p;
              break;
            case "northwest" :
              r = this.constrain(m, r, n, s);
              p = this.constrain(u, p, A, D);
              k += p;
              u -= p;
              l += r;
              m -= r;
              break;
            case "southwest" :
              r = this.constrain(m, r, n, s);
              u += p;
              u = Math.min(Math.max(A, u), D);
              l += r;
              m -= r;
              break
          }
          var q = this.snap(m, i, n);
          var C = this.snap(u, a, A);
          if (q != m || C != u) {
            switch (j) {
              case "northeast" :
                k -= C - u;
                break;
              case "north" :
                k -= C - u;
                break;
              case "southwest" :
                l -= q - m;
                break;
              case "west" :
                l -= q - m;
                break;
              case "northwest" :
                l -= q - m;
                k -= C - u;
                break
            }
            m = q;
            u = C
          }
          if (this.preserveRatio) {
            switch (j) {
              case "southeast" :
              case "east" :
                u = o * (m / d);
                u = Math.min(Math.max(A, u), D);
                m = d * (u / o);
                break;
              case "south" :
                m = d * (u / o);
                m = Math.min(Math.max(n, m), s);
                u = o * (m / d);
                break;
              case "northeast" :
                m = d * (u / o);
                m = Math.min(Math.max(n, m), s);
                u = o * (m / d);
                break;
              case "north" :
                E = m;
                m = d * (u / o);
                m = Math.min(Math.max(n, m), s);
                u = o * (m / d);
                l += (E - m) / 2;
                break;
              case "southwest" :
                u = o * (m / d);
                u = Math.min(Math.max(A, u), D);
                E = m;
                m = d * (u / o);
                l += E - m;
                break;
              case "west" :
                g = u;
                u = o * (m / d);
                u = Math.min(Math.max(A, u), D);
                k += (g - u) / 2;
                E = m;
                m = d * (u / o);
                l += E - m;
                break;
              case "northwest" :
                E = m;
                g = u;
                u = o * (m / d);
                u = Math.min(Math.max(A, u), D);
                m = d * (u / o);
                k += g - u;
                l += E - m;
                break
            }
          }
          this.$proxy.width(m - this.proxyBorder[0]);
          this.$proxy.height(u - this.proxyBorder[1]);
          this.proxy.style.top = k + "px";
          this.proxy.style.left = l + "px";
          //Dldh.Css.setXY(this.proxy, [l, k]);
          this.onMouseMove({
            width: m - this.proxyBorder[0],
            height: u - this.proxyBorder[1],
            left: l,
            top: k
          });
        } catch (v) {}
      }
    }
  },
  onMouseMove: function(box) {},
  afterHandleOut: function() {},
  handleOut : function() {
    if (!this.resizing) {
      this.$el.removeClass("cls-resizable-over");
    }
    this.afterHandleOut();
  }
};
Dldh.Resizable.positions = {
  n : "north",
  s : "south",
  e : "east",
  w : "west",
  se : "southeast",
  sw : "southwest",
  nw : "northwest",
  ne : "northeast"
};
Dldh.Resizable.Handle = function(d, g, c, e, a) {
  this.init(d, g, c, e, a);
}
Dldh.Resizable.Handle.prototype = {
  init : function(rz, pos, c, e, a) {
    this.position = pos;
    this.rz = rz;
    this.el = document.createElement("div");
    this.el.className = "cls-resizable-handle cls-resizable-handle-" + this.position;
    rz.el.appendChild(this.el);
    this.$el = jQuery(this.el);
    Dldh.Css.unselectable(this.el);
    if (e) {
      this.$el.css("opacity", 0);
    }
    if (!(a === null || a === undefined || ((a instanceof Array && !a.length)) || (a === ""))) {
      this.$el.addClass(a);
    }
    this.$el.bind("mousedown", {scope: rz, HandleObj: this}, this.onMouseDown);
  },
  onMouseDown : function(event) {
    event.stopPropagation();
    var o = event.data.scope;
    o.activeHandle = event.data.HandleObj;
    if (o.enabled) {
      if (!o.overlay) {
        o.overlay = document.createElement("div");
        o.overlay.className = "cls-resizable-overlay";
        o.overlay.innerHtml = "&#160;";
        document.body.appendChild(o.overlay);
        Dldh.Css.unselectable(o.overlay);
        o.$overlay = jQuery(o.overlay);
        o.$overlay.css("display", "block");
        o.$overlay.bind("mousemove", {scope: o}, function(event) {
          var obj = event.data.scope;
          obj.resizeMove(event);
        });
        o.$overlay.bind("mouseup", {scope: o}, function(event) {
          var obj = event.data.scope;
          var a = obj.resizeElement();
          obj.resizing = false;
          obj.handleOut();
          obj.$overlay.css("display", "none");
          obj.proxy.style.display = "none";
        });
      }
      o.$overlay.css("cursor", o.$el.css("cursor"));
      o.$overlay.css({
        display : "block",
        cursor : o.$el.css("cursor")
      });
      o.resizing = true;
      //var oxy = Dldh.Css.getXY(o.el);
      var oxy = [parseInt(o.el.style.left, 10), parseInt(o.el.style.top, 10)];
      o.startBox = {
        x : oxy[0],
        y : oxy[1],
        width : Dldh.Css.getWidth(o.el, false),
        height : Dldh.Css.getHeight(o.el, false)
      };
      o.startPoint = [event.pageX, event.pageY];
      o.$overlay.width(Dldh.Css.getViewWidth(true));
      o.$overlay.height(Dldh.Css.getViewHeight(true));
      o.$proxy.css({
        left : o.startBox.x,
        top : o.startBox.y,
        width : o.startBox.width - o.proxyBorder[0],
        height : o.startBox.height - o.proxyBorder[1],
        display : "block"
      });
    }
  }
};
//Dldh.Drag = function (el, rowCls, columnCls) {
Dldh.Drag = function (opt) {
  var rs = {};
  if(opt.mouseUp) {
    rs.mouseUp = opt.mouseUp;
  }
  if(opt.verify) {
    rs.verify = opt.verify;
  }
  rs.beforeMouseUp = opt.beforeMouseUp || function(cur, target, isChecked) {};
  rs.afterMouseUp = opt.afterMouseUp || function(cur, target, isChecked) {};
  rs.rowCls = opt.rowCls;
  rs.columnCls = opt.columnCls;
  rs.wrap = Dldh.getDom(opt.content);
  rs.proxy = document.createElement("div");
  rs.proxy.className = "cls-dd-drag-proxy";
  rs.proxy.innerHTML = '<div class="cls-dd-drop-icon"></div><div class="cls-dd-drag-ghost clearfix"></div>';
  document.body.appendChild(rs.proxy);
  rs.$proxy = jQuery(rs.proxy);
  rs.ghost = rs.proxy.querySelector(".cls-dd-drag-ghost");
  rs.isMove = false;
  rs.offsetXY = [10, 10];
  rs.hasClass = function(dom, cls) {
    return (" " + dom.className + " ").indexOf(" " + cls + " ") != -1;
  }
  rs.addClass = function(dom, cls) {
    if(!this.hasClass(dom, cls)) {
      dom.className = dom.className + " " + cls;
    }
  }
  rs.removeClass = function(dom, cls) {
    if(cls && dom.className) {
      if(this.hasClass(dom, cls)) {
        dom.className = dom.className.replace(new RegExp('(?:^|\\s+)' + cls + '(?:\\s+|$)', "g"), " ");
      }
    }
  }
  rs.getIndexByDom = function(dom) {
    var nodes = this.wrap.querySelectorAll("." + this.rowCls);
    for(let i = 0; i < nodes.length; i++) {
      //console.log([dom, nodes[i]]);
      if(dom == nodes[i]) {
        return i;
      }
    }
    return -1;
  }
  rs.getRow = function(cur) {
    var node = cur;
    while(node && node != this.wrap) {
      if(this.hasClass(node, this.rowCls)) {
        return node;
      }
      node = node.parentNode;
    }
    return false;
  }
  rs.stopEvent = function(e) {
    if(this.stopPropagation) {
      Dldh.stopPropagation(e);
    }
    if(this.preventDefault) {
      Dldh.preventDefault(e);
    }
  }
  rs._down = function(e) {
    rs.target = e.target;
    rs.current = e.target;
    if(e.button == 2) {
      return;
    }
    rs.down(e.pageX, e.pageY);
    rs.stopEvent(e);
  }
  rs._move = function(e) {
    rs.current = e.target;
    rs.move(e.pageX, e.pageY);
    rs.stopEvent(e);
  }
  rs._up = function(e) {
    rs.up(e.pageX, e.pageY);
    rs.stopEvent(e);
  }
  rs.down = function(x, y) {
    this.checked = false;
    if(Dldh.Css.hasClass(this.target, this.rowCls) || Dldh.Css.hasClass(this.target, this.columnCls)) {
      var clone = this.target.cloneNode(true);
      this.ghost.innerHTML = clone.innerHTML;
      this.startIndex = this.getIndexByDom(this.target);
      this.startPos = [x, y];
      this.endPos = [x, y];
      this.proxy.style.left = (this.offsetXY[0] + this.startPos[0]) + "px";
      this.proxy.style.top = (this.offsetXY[1] + this.startPos[1]) + "px";
      //this.proxy.style.visibility = "visible";
      this.isMove = true;
      if(Dldh.Css.hasClass(this.target, this.rowCls)) {
        this.cls = this.rowCls;   
      }
      if(Dldh.Css.hasClass(this.target, this.columnCls)) {
        this.cls = this.columnCls;
      }
      Dldh.Event.bind(document, "mousemove", rs._move);
      Dldh.Event.bind(document, "mouseup", rs._up);
    }  
  }
  rs.move = function(x, y) {
    if(this.isMove) {
      this.endPos = [x, y];
      this.proxy.style.left = (this.offsetXY[0] + this.endPos[0]) + "px";
      this.proxy.style.top = (this.offsetXY[1] + this.endPos[1]) + "px";
      this.proxy.style.visibility = "visible";
      if(this.verify) {
        if(this.verify(this.current)) {
          this.addClass(this.proxy, "cls-dd-drop-ok");
          this.removeClass(this.proxy, "cls-dd-drop-no");
          this.check = true;
        } else {
          this.addClass(this.proxy, "cls-dd-drop-no");
          this.removeClass(this.proxy, "cls-dd-drop-ok");
          this.check = false;
        }
      } else {
        if(this.cls == this.rowCls) {
          this.row = this.getRow(this.current);
          this.endIndex = this.getIndexByDom(this.row);
          if(this.endIndex != -1) {
            this.addClass(this.proxy, "cls-dd-drop-ok");
            this.removeClass(this.proxy, "cls-dd-drop-no");
            this.check = true;
          } else {
            this.addClass(this.proxy, "cls-dd-drop-no");
            this.removeClass(this.proxy, "cls-dd-drop-ok");
            this.check = false;
          }
        } else if(this.cls == this.columnCls) {
          if(this.hasClass(this.current, this.columnCls)) {
            this.addClass(this.proxy, "cls-dd-drop-ok");
            this.removeClass(this.proxy, "cls-dd-drop-no");
            this.check = true;
          } else {
            this.addClass(this.proxy, "cls-dd-drop-no");
            this.removeClass(this.proxy, "cls-dd-drop-ok");
            this.check = false;
          }
        }
      }
    }
  }
  rs.up = function(x, y) {
    this.beforeMouseUp(this.current, this.target);
    if(this.current == this.target) {
      this.proxy.style.visibility = "hidden";
    } else {
      if(this.isMove) {
        this.proxy.style.left = this.endPos[0] + "px";
        this.proxy.style.top = this.endPos[1] + "px";  
        if(this.isMove && this.check) {
          if(this.mouseUp) {
            this.proxy.style.visibility = "hidden";
            this.mouseUp(this.current, this.target);
          } else {
            if(this.cls == this.rowCls) {
              if(this.endIndex - this.startIndex < 0) {
                this.target.parentNode.insertBefore(this.target, this.row);
              } else if(this.endIndex - this.startIndex > 0) {
                if (this.target.parentNode.lastChild == this.row) {
                  this.target.parentNode.appendChild(this.target);
                } else {
                  this.target.parentNode.insertBefore(this.target, this.row.nextSibling);
                }
              }
            } else if(this.cls == this.columnCls) {
              var mark = this.target.cloneNode(true);
              this.target.parentNode.insertBefore(mark, this.target);
              this.current.parentNode.insertBefore(this.target, this.current);
              mark.parentNode.insertBefore(this.current, mark);
              mark.parentNode.removeChild(mark);
            }
            this.proxy.style.visibility = "hidden";    
          }
          this.checked = true;
        } else {
          var xy = Dldh.Css.getXY(this.target);
          this.$proxy.animate({
            left : xy[0],
            top : xy[1]
          }, 0.35 * 1000, undefined, () => {
            this.proxy.style.visibility = "hidden";
          });  
        }
      }
    }
    this.isMove = false;
    this.target = null;
    this.current = null;
    Dldh.Event.unbind(document, "mousemove", rs._move);
    Dldh.Event.unbind(document, "mouseup", rs._up);
    this.afterMouseUp(this.current, this.target, this.checked);
  }
  Dldh.Event.bind(rs.wrap, "mousedown", rs._down);
  return rs;
};