/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2013 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var n=this.getActiveIndex(),r=this;if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){r.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0],direction:o});if(i.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")}));if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=n,this},e(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o;i.carousel(s),(o=n.attr("data-slide-to"))&&i.data("carousel").pause().to(o).cycle(),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning||this.$element.hasClass("in"))return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning||!this.$element.hasClass("in"))return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=e.extend({},e.fn.collapse.defaults,r.data(),typeof n=="object"&&n);i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=n,this},e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(".dropdown-backdrop").remove(),e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=n&&e(n);if(!r||!r.length)r=t.parent();return r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||("ontouchstart"in document.documentElement&&e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click",r),s.toggleClass("open")),n.focus(),!1},keydown:function(n){var r,s,o,u,a,f;if(!/(38|40|27)/.test(n.keyCode))return;r=e(this),n.preventDefault(),n.stopPropagation();if(r.is(".disabled, :disabled"))return;u=i(r),a=u.hasClass("open");if(!a||a&&n.keyCode==27)return n.which==27&&u.find(t).focus(),r.click();s=e("[role=menu] li:not(.divider):visible a",u);if(!s.length)return;f=s.index(s.filter(":focus")),n.keyCode==38&&f>0&&f--,n.keyCode==40&&f<s.length-1&&f++,~f||(f=0),s.eq(f).focus()}};var s=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s,o,u,a;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,o=this.options.trigger.split(" ");for(a=o.length;a--;)u=o[a],u=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):u!="manual"&&(i=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this)));this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e.fn[this.type].defaults,r={},i;this._options&&e.each(this._options,function(e,t){n[e]!=t&&(r[e]=t)},this),i=e(t.currentTarget)[this.type](r).data(this.type);if(!i.options.delay||!i.options.delay.show)return i.show();clearTimeout(this.timeout),i.hoverState="in",this.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var t,n,r,i,s,o,u=e.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(u);if(u.isDefaultPrevented())return;t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,t.detach().css({top:0,left:0,display:"block"}),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element),n=this.getPosition(),r=t[0].offsetWidth,i=t[0].offsetHeight;switch(s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}this.applyPlacement(o,s),this.$element.trigger("shown")}},applyPlacement:function(e,t){var n=this.tip(),r=n[0].offsetWidth,i=n[0].offsetHeight,s,o,u,a;n.offset(e).addClass(t).addClass("in"),s=n[0].offsetWidth,o=n[0].offsetHeight,t=="top"&&o!=i&&(e.top=e.top+i-o,a=!0),t=="bottom"||t=="top"?(u=0,e.left<0&&(u=e.left*-2,e.left=0,n.offset(e),s=n[0].offsetWidth,o=n[0].offsetHeight),this.replaceArrow(u-r+s,s,"left")):this.replaceArrow(o-i,o,"top"),a&&n.offset(e)},replaceArrow:function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function i(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip(),r=e.Event("hide");this.$element.trigger(r);if(r.isDefaultPrevented())return;return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i():n.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=t?e(t.currentTarget)[this.type](this._options).data(this.type):this;n.tip().hasClass("in")?n.hide():n.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.fn.tooltip.noConflict=function(){return e.fn.tooltip=n,this}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=(typeof n.content=="function"?n.content.call(t[0]):n.content)||t.attr("data-content"),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.fn.popover.noConflict=function(){return e.fn.popover=n,this}}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var n=e(this),r=n.data("target")||n.attr("href"),i=/^#\w/.test(r)&&e(r);return i&&i.length&&[[i.position().top+(!e.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),r]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=n,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e.fn.affix.noConflict=function(){return e.fn.affix=n,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);/*!
 * Knockout JavaScript library v3.2.0
 * (c) Steven Sanderson - http://knockoutjs.com/
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function() {(function(p){var s=this||(0,eval)("this"),v=s.document,L=s.navigator,w=s.jQuery,D=s.JSON;(function(p){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?p(module.exports||exports,require):"function"===typeof define&&define.amd?define(["exports","require"],p):p(s.ko={})})(function(M,N){function H(a,d){return null===a||typeof a in R?a===d:!1}function S(a,d){var c;return function(){c||(c=setTimeout(function(){c=p;a()},d))}}function T(a,d){var c;return function(){clearTimeout(c);
c=setTimeout(a,d)}}function I(b,d,c,e){a.d[b]={init:function(b,h,k,f,m){var l,q;a.s(function(){var f=a.a.c(h()),k=!c!==!f,z=!q;if(z||d||k!==l)z&&a.Y.la()&&(q=a.a.ia(a.f.childNodes(b),!0)),k?(z||a.f.T(b,a.a.ia(q)),a.Ca(e?e(m,f):m,b)):a.f.ja(b),l=k},null,{o:b});return{controlsDescendantBindings:!0}}};a.h.ha[b]=!1;a.f.Q[b]=!0}var a="undefined"!==typeof M?M:{};a.b=function(b,d){for(var c=b.split("."),e=a,g=0;g<c.length-1;g++)e=e[c[g]];e[c[c.length-1]]=d};a.A=function(a,d,c){a[d]=c};a.version="3.2.0";
a.b("version",a.version);a.a=function(){function b(a,b){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}function d(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function c(a,b){a.__proto__=b;return a}var e={__proto__:[]}instanceof Array,g={},h={};g[L&&/Firefox\/2/i.test(L.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];g.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(g,function(a,b){if(b.length)for(var c=
0,d=b.length;c<d;c++)h[b[c]]=a});var k={propertychange:!0},f=v&&function(){for(var a=3,b=v.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+ ++a+"]><i></i><![endif]--\x3e",c[0];);return 4<a?a:p}();return{vb:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],u:function(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c],c)},m:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var c=0,d=a.length;c<d;c++)if(a[c]===
b)return c;return-1},qb:function(a,b,c){for(var d=0,f=a.length;d<f;d++)if(b.call(c,a[d],d))return a[d];return null},ua:function(m,b){var c=a.a.m(m,b);0<c?m.splice(c,1):0===c&&m.shift()},rb:function(m){m=m||[];for(var b=[],c=0,d=m.length;c<d;c++)0>a.a.m(b,m[c])&&b.push(m[c]);return b},Da:function(a,b){a=a||[];for(var c=[],d=0,f=a.length;d<f;d++)c.push(b(a[d],d));return c},ta:function(a,b){a=a||[];for(var c=[],d=0,f=a.length;d<f;d++)b(a[d],d)&&c.push(a[d]);return c},ga:function(a,b){if(b instanceof
Array)a.push.apply(a,b);else for(var c=0,d=b.length;c<d;c++)a.push(b[c]);return a},ea:function(b,c,d){var f=a.a.m(a.a.Xa(b),c);0>f?d&&b.push(c):d||b.splice(f,1)},xa:e,extend:d,za:c,Aa:e?c:d,G:b,na:function(a,b){if(!a)return a;var c={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d],d,a));return c},Ka:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},oc:function(b){b=a.a.S(b);for(var c=v.createElement("div"),d=0,f=b.length;d<f;d++)c.appendChild(a.R(b[d]));return c},ia:function(b,c){for(var d=
0,f=b.length,e=[];d<f;d++){var k=b[d].cloneNode(!0);e.push(c?a.R(k):k)}return e},T:function(b,c){a.a.Ka(b);if(c)for(var d=0,f=c.length;d<f;d++)b.appendChild(c[d])},Lb:function(b,c){var d=b.nodeType?[b]:b;if(0<d.length){for(var f=d[0],e=f.parentNode,k=0,g=c.length;k<g;k++)e.insertBefore(c[k],f);k=0;for(g=d.length;k<g;k++)a.removeNode(d[k])}},ka:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.shift();if(1<a.length){var c=a[0],d=a[a.length-1];for(a.length=
0;c!==d;)if(a.push(c),c=c.nextSibling,!c)return;a.push(d)}}return a},Nb:function(a,b){7>f?a.setAttribute("selected",b):a.selected=b},cb:function(a){return null===a||a===p?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},vc:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},cc:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&
16);for(;a&&a!=b;)a=a.parentNode;return!!a},Ja:function(b){return a.a.cc(b,b.ownerDocument.documentElement)},ob:function(b){return!!a.a.qb(b,a.a.Ja)},t:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},n:function(b,c,d){var e=f&&k[c];if(!e&&w)w(b).bind(c,d);else if(e||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var g=function(a){d.call(b,a)},h="on"+c;b.attachEvent(h,g);a.a.w.da(b,function(){b.detachEvent(h,g)})}else throw Error("Browser doesn't support addEventListener or attachEvent");
else b.addEventListener(c,d,!1)},oa:function(b,c){if(!b||!b.nodeType)throw Error("element must be a DOM node when calling triggerEvent");var d;"input"===a.a.t(b)&&b.type&&"click"==c.toLowerCase()?(d=b.type,d="checkbox"==d||"radio"==d):d=!1;if(w&&!d)w(b).trigger(c);else if("function"==typeof v.createEvent)if("function"==typeof b.dispatchEvent)d=v.createEvent(h[c]||"HTMLEvents"),d.initEvent(c,!0,!0,s,0,0,0,0,0,!1,!1,!1,!1,0,b),b.dispatchEvent(d);else throw Error("The supplied element doesn't support dispatchEvent");
else if(d&&b.click)b.click();else if("undefined"!=typeof b.fireEvent)b.fireEvent("on"+c);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.C(b)?b():b},Xa:function(b){return a.C(b)?b.v():b},Ba:function(b,c,d){if(c){var f=/\S+/g,e=b.className.match(f)||[];a.a.u(c.match(f),function(b){a.a.ea(e,b,d)});b.className=e.join(" ")}},bb:function(b,c){var d=a.a.c(c);if(null===d||d===p)d="";var f=a.f.firstChild(b);!f||3!=f.nodeType||a.f.nextSibling(f)?a.f.T(b,[b.ownerDocument.createTextNode(d)]):
f.data=d;a.a.fc(b)},Mb:function(a,b){a.name=b;if(7>=f)try{a.mergeAttributes(v.createElement("<input name='"+a.name+"'/>"),!1)}catch(c){}},fc:function(a){9<=f&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},dc:function(a){if(f){var b=a.style.width;a.style.width=0;a.style.width=b}},sc:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var d=[],f=b;f<=c;f++)d.push(f);return d},S:function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(a[c]);return b},yc:6===f,zc:7===f,L:f,xb:function(b,c){for(var d=
a.a.S(b.getElementsByTagName("input")).concat(a.a.S(b.getElementsByTagName("textarea"))),f="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},e=[],k=d.length-1;0<=k;k--)f(d[k])&&e.push(d[k]);return e},pc:function(b){return"string"==typeof b&&(b=a.a.cb(b))?D&&D.parse?D.parse(b):(new Function("return "+b))():null},eb:function(b,c,d){if(!D||!D.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return D.stringify(a.a.c(b),c,d)},qc:function(c,d,f){f=f||{};var e=f.params||{},k=f.includeFields||this.vb,g=c;if("object"==typeof c&&"form"===a.a.t(c))for(var g=c.action,h=k.length-1;0<=h;h--)for(var r=a.a.xb(c,k[h]),E=r.length-1;0<=E;E--)e[r[E].name]=r[E].value;d=a.a.c(d);var y=v.createElement("form");y.style.display="none";y.action=g;y.method="post";for(var p in d)c=v.createElement("input"),c.type="hidden",c.name=p,c.value=a.a.eb(a.a.c(d[p])),y.appendChild(c);b(e,function(a,b){var c=v.createElement("input");
c.type="hidden";c.name=a;c.value=b;y.appendChild(c)});v.body.appendChild(y);f.submitter?f.submitter(y):y.submit();setTimeout(function(){y.parentNode.removeChild(y)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.u);a.b("utils.arrayFirst",a.a.qb);a.b("utils.arrayFilter",a.a.ta);a.b("utils.arrayGetDistinctValues",a.a.rb);a.b("utils.arrayIndexOf",a.a.m);a.b("utils.arrayMap",a.a.Da);a.b("utils.arrayPushAll",a.a.ga);a.b("utils.arrayRemoveItem",a.a.ua);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",
a.a.vb);a.b("utils.getFormFields",a.a.xb);a.b("utils.peekObservable",a.a.Xa);a.b("utils.postJson",a.a.qc);a.b("utils.parseJson",a.a.pc);a.b("utils.registerEventHandler",a.a.n);a.b("utils.stringifyJson",a.a.eb);a.b("utils.range",a.a.sc);a.b("utils.toggleDomNodeCssClass",a.a.Ba);a.b("utils.triggerEvent",a.a.oa);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.G);a.b("utils.addOrRemoveItem",a.a.ea);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var d=
this,c=Array.prototype.slice.call(arguments);a=c.shift();return function(){return d.apply(a,c.concat(Array.prototype.slice.call(arguments)))}});a.a.e=new function(){function a(b,h){var k=b[c];if(!k||"null"===k||!e[k]){if(!h)return p;k=b[c]="ko"+d++;e[k]={}}return e[k]}var d=0,c="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===p?p:e[d]},set:function(c,d,e){if(e!==p||a(c,!1)!==p)a(c,!0)[d]=e},clear:function(a){var b=a[c];return b?(delete e[b],a[c]=null,!0):!1},F:function(){return d++ +
c}}};a.b("utils.domData",a.a.e);a.b("utils.domData.clear",a.a.e.clear);a.a.w=new function(){function b(b,d){var f=a.a.e.get(b,c);f===p&&d&&(f=[],a.a.e.set(b,c,f));return f}function d(c){var e=b(c,!1);if(e)for(var e=e.slice(0),f=0;f<e.length;f++)e[f](c);a.a.e.clear(c);a.a.w.cleanExternalData(c);if(g[c.nodeType])for(e=c.firstChild;c=e;)e=c.nextSibling,8===c.nodeType&&d(c)}var c=a.a.e.F(),e={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{da:function(a,c){if("function"!=typeof c)throw Error("Callback must be a function");
b(a,!0).push(c)},Kb:function(d,e){var f=b(d,!1);f&&(a.a.ua(f,e),0==f.length&&a.a.e.set(d,c,p))},R:function(b){if(e[b.nodeType]&&(d(b),g[b.nodeType])){var c=[];a.a.ga(c,b.getElementsByTagName("*"));for(var f=0,m=c.length;f<m;f++)d(c[f])}return b},removeNode:function(b){a.R(b);b.parentNode&&b.parentNode.removeChild(b)},cleanExternalData:function(a){w&&"function"==typeof w.cleanData&&w.cleanData([a])}}};a.R=a.a.w.R;a.removeNode=a.a.w.removeNode;a.b("cleanNode",a.R);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",
a.a.w);a.b("utils.domNodeDisposal.addDisposeCallback",a.a.w.da);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.w.Kb);(function(){a.a.ba=function(b){var d;if(w)if(w.parseHTML)d=w.parseHTML(b)||[];else{if((d=w.clean([b]))&&d[0]){for(b=d[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var c=a.a.cb(b).toLowerCase();d=v.createElement("div");c=c.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!c.indexOf("<tr")&&[2,"<table><tbody>",
"</tbody></table>"]||(!c.indexOf("<td")||!c.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+c[1]+b+c[2]+"</div>";for("function"==typeof s.innerShiv?d.appendChild(s.innerShiv(b)):d.innerHTML=b;c[0]--;)d=d.lastChild;d=a.a.S(d.lastChild.childNodes)}return d};a.a.$a=function(b,d){a.a.Ka(b);d=a.a.c(d);if(null!==d&&d!==p)if("string"!=typeof d&&(d=d.toString()),w)w(b).html(d);else for(var c=a.a.ba(d),e=0;e<c.length;e++)b.appendChild(c[e])}})();a.b("utils.parseHtmlFragment",
a.a.ba);a.b("utils.setHtml",a.a.$a);a.D=function(){function b(c,d){if(c)if(8==c.nodeType){var g=a.D.Gb(c.nodeValue);null!=g&&d.push({bc:c,mc:g})}else if(1==c.nodeType)for(var g=0,h=c.childNodes,k=h.length;g<k;g++)b(h[g],d)}var d={};return{Ua:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);d[b]=a;return"\x3c!--[ko_memo:"+
b+"]--\x3e"},Rb:function(a,b){var g=d[a];if(g===p)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return g.apply(null,b||[]),!0}finally{delete d[a]}},Sb:function(c,d){var g=[];b(c,g);for(var h=0,k=g.length;h<k;h++){var f=g[h].bc,m=[f];d&&a.a.ga(m,d);a.D.Rb(g[h].mc,m);f.nodeValue="";f.parentNode&&f.parentNode.removeChild(f)}},Gb:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.D);a.b("memoization.memoize",a.D.Ua);
a.b("memoization.unmemoize",a.D.Rb);a.b("memoization.parseMemoText",a.D.Gb);a.b("memoization.unmemoizeDomNodeAndDescendants",a.D.Sb);a.La={throttle:function(b,d){b.throttleEvaluation=d;var c=null;return a.j({read:b,write:function(a){clearTimeout(c);c=setTimeout(function(){b(a)},d)}})},rateLimit:function(a,d){var c,e,g;"number"==typeof d?c=d:(c=d.timeout,e=d.method);g="notifyWhenChangesStop"==e?T:S;a.Ta(function(a){return g(a,c)})},notify:function(a,d){a.equalityComparer="always"==d?null:H}};var R=
{undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.La);a.Pb=function(b,d,c){this.target=b;this.wa=d;this.ac=c;this.Cb=!1;a.A(this,"dispose",this.K)};a.Pb.prototype.K=function(){this.Cb=!0;this.ac()};a.P=function(){a.a.Aa(this,a.P.fn);this.M={}};var G="change",A={U:function(b,d,c){var e=this;c=c||G;var g=new a.Pb(e,d?b.bind(d):b,function(){a.a.ua(e.M[c],g);e.nb&&e.nb()});e.va&&e.va(c);e.M[c]||(e.M[c]=[]);e.M[c].push(g);return g},notifySubscribers:function(b,d){d=d||G;if(this.Ab(d))try{a.k.Ea();
for(var c=this.M[d].slice(0),e=0,g;g=c[e];++e)g.Cb||g.wa(b)}finally{a.k.end()}},Ta:function(b){var d=this,c=a.C(d),e,g,h;d.qa||(d.qa=d.notifySubscribers,d.notifySubscribers=function(a,b){b&&b!==G?"beforeChange"===b?d.kb(a):d.qa(a,b):d.lb(a)});var k=b(function(){c&&h===d&&(h=d());e=!1;d.Pa(g,h)&&d.qa(g=h)});d.lb=function(a){e=!0;h=a;k()};d.kb=function(a){e||(g=a,d.qa(a,"beforeChange"))}},Ab:function(a){return this.M[a]&&this.M[a].length},yb:function(){var b=0;a.a.G(this.M,function(a,c){b+=c.length});
return b},Pa:function(a,d){return!this.equalityComparer||!this.equalityComparer(a,d)},extend:function(b){var d=this;b&&a.a.G(b,function(b,e){var g=a.La[b];"function"==typeof g&&(d=g(d,e)||d)});return d}};a.A(A,"subscribe",A.U);a.A(A,"extend",A.extend);a.A(A,"getSubscriptionsCount",A.yb);a.a.xa&&a.a.za(A,Function.prototype);a.P.fn=A;a.Db=function(a){return null!=a&&"function"==typeof a.U&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.P);a.b("isSubscribable",a.Db);a.Y=a.k=function(){function b(a){c.push(e);
e=a}function d(){e=c.pop()}var c=[],e,g=0;return{Ea:b,end:d,Jb:function(b){if(e){if(!a.Db(b))throw Error("Only subscribable things can act as dependencies");e.wa(b,b.Vb||(b.Vb=++g))}},B:function(a,c,f){try{return b(),a.apply(c,f||[])}finally{d()}},la:function(){if(e)return e.s.la()},ma:function(){if(e)return e.ma}}}();a.b("computedContext",a.Y);a.b("computedContext.getDependenciesCount",a.Y.la);a.b("computedContext.isInitial",a.Y.ma);a.b("computedContext.isSleeping",a.Y.Ac);a.p=function(b){function d(){if(0<
arguments.length)return d.Pa(c,arguments[0])&&(d.X(),c=arguments[0],d.W()),this;a.k.Jb(d);return c}var c=b;a.P.call(d);a.a.Aa(d,a.p.fn);d.v=function(){return c};d.W=function(){d.notifySubscribers(c)};d.X=function(){d.notifySubscribers(c,"beforeChange")};a.A(d,"peek",d.v);a.A(d,"valueHasMutated",d.W);a.A(d,"valueWillMutate",d.X);return d};a.p.fn={equalityComparer:H};var F=a.p.rc="__ko_proto__";a.p.fn[F]=a.p;a.a.xa&&a.a.za(a.p.fn,a.P.fn);a.Ma=function(b,d){return null===b||b===p||b[F]===p?!1:b[F]===
d?!0:a.Ma(b[F],d)};a.C=function(b){return a.Ma(b,a.p)};a.Ra=function(b){return"function"==typeof b&&b[F]===a.p||"function"==typeof b&&b[F]===a.j&&b.hc?!0:!1};a.b("observable",a.p);a.b("isObservable",a.C);a.b("isWriteableObservable",a.Ra);a.b("isWritableObservable",a.Ra);a.aa=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.p(b);a.a.Aa(b,a.aa.fn);return b.extend({trackArrayChanges:!0})};
a.aa.fn={remove:function(b){for(var d=this.v(),c=[],e="function"!=typeof b||a.C(b)?function(a){return a===b}:b,g=0;g<d.length;g++){var h=d[g];e(h)&&(0===c.length&&this.X(),c.push(h),d.splice(g,1),g--)}c.length&&this.W();return c},removeAll:function(b){if(b===p){var d=this.v(),c=d.slice(0);this.X();d.splice(0,d.length);this.W();return c}return b?this.remove(function(c){return 0<=a.a.m(b,c)}):[]},destroy:function(b){var d=this.v(),c="function"!=typeof b||a.C(b)?function(a){return a===b}:b;this.X();
for(var e=d.length-1;0<=e;e--)c(d[e])&&(d[e]._destroy=!0);this.W()},destroyAll:function(b){return b===p?this.destroy(function(){return!0}):b?this.destroy(function(d){return 0<=a.a.m(b,d)}):[]},indexOf:function(b){var d=this();return a.a.m(d,b)},replace:function(a,d){var c=this.indexOf(a);0<=c&&(this.X(),this.v()[c]=d,this.W())}};a.a.u("pop push reverse shift sort splice unshift".split(" "),function(b){a.aa.fn[b]=function(){var a=this.v();this.X();this.sb(a,b,arguments);a=a[b].apply(a,arguments);this.W();
return a}});a.a.u(["slice"],function(b){a.aa.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.a.xa&&a.a.za(a.aa.fn,a.p.fn);a.b("observableArray",a.aa);var J="arrayChange";a.La.trackArrayChanges=function(b){function d(){if(!c){c=!0;var d=b.notifySubscribers;b.notifySubscribers=function(a,b){b&&b!==G||++g;return d.apply(this,arguments)};var f=[].concat(b.v()||[]);e=null;b.U(function(c){c=[].concat(c||[]);if(b.Ab(J)){var d;if(!e||1<g)e=a.a.Fa(f,c,{sparse:!0});d=e;d.length&&b.notifySubscribers(d,
J)}f=c;e=null;g=0})}}if(!b.sb){var c=!1,e=null,g=0,h=b.U;b.U=b.subscribe=function(a,b,c){c===J&&d();return h.apply(this,arguments)};b.sb=function(b,d,m){function l(a,b,c){return q[q.length]={status:a,value:b,index:c}}if(c&&!g){var q=[],h=b.length,t=m.length,z=0;switch(d){case "push":z=h;case "unshift":for(d=0;d<t;d++)l("added",m[d],z+d);break;case "pop":z=h-1;case "shift":h&&l("deleted",b[z],z);break;case "splice":d=Math.min(Math.max(0,0>m[0]?h+m[0]:m[0]),h);for(var h=1===t?h:Math.min(d+(m[1]||0),
h),t=d+t-2,z=Math.max(h,t),u=[],r=[],E=2;d<z;++d,++E)d<h&&r.push(l("deleted",b[d],d)),d<t&&u.push(l("added",m[E],d));a.a.wb(r,u);break;default:return}e=q}}}};a.s=a.j=function(b,d,c){function e(){a.a.G(v,function(a,b){b.K()});v={}}function g(){e();C=0;u=!0;n=!1}function h(){var a=f.throttleEvaluation;a&&0<=a?(clearTimeout(P),P=setTimeout(k,a)):f.ib?f.ib():k()}function k(b){if(t){if(E)throw Error("A 'pure' computed must not be called recursively");}else if(!u){if(w&&w()){if(!z){s();return}}else z=!1;
t=!0;if(y)try{var c={};a.k.Ea({wa:function(a,b){c[b]||(c[b]=1,++C)},s:f,ma:p});C=0;q=r.call(d)}finally{a.k.end(),t=!1}else try{var e=v,m=C;a.k.Ea({wa:function(a,b){u||(m&&e[b]?(v[b]=e[b],++C,delete e[b],--m):v[b]||(v[b]=a.U(h),++C))},s:f,ma:E?p:!C});v={};C=0;try{var l=d?r.call(d):r()}finally{a.k.end(),m&&a.a.G(e,function(a,b){b.K()}),n=!1}f.Pa(q,l)&&(f.notifySubscribers(q,"beforeChange"),q=l,!0!==b&&f.notifySubscribers(q))}finally{t=!1}C||s()}}function f(){if(0<arguments.length){if("function"===typeof O)O.apply(d,
arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");return this}a.k.Jb(f);n&&k(!0);return q}function m(){n&&!C&&k(!0);return q}function l(){return n||0<C}var q,n=!0,t=!1,z=!1,u=!1,r=b,E=!1,y=!1;r&&"object"==typeof r?(c=r,r=c.read):(c=c||{},r||(r=c.read));if("function"!=typeof r)throw Error("Pass a function that returns the value of the ko.computed");var O=c.write,x=c.disposeWhenNodeIsRemoved||
c.o||null,B=c.disposeWhen||c.Ia,w=B,s=g,v={},C=0,P=null;d||(d=c.owner);a.P.call(f);a.a.Aa(f,a.j.fn);f.v=m;f.la=function(){return C};f.hc="function"===typeof c.write;f.K=function(){s()};f.Z=l;var A=f.Ta;f.Ta=function(a){A.call(f,a);f.ib=function(){f.kb(q);n=!0;f.lb(f)}};c.pure?(y=E=!0,f.va=function(){y&&(y=!1,k(!0))},f.nb=function(){f.yb()||(e(),y=n=!0)}):c.deferEvaluation&&(f.va=function(){m();delete f.va});a.A(f,"peek",f.v);a.A(f,"dispose",f.K);a.A(f,"isActive",f.Z);a.A(f,"getDependenciesCount",
f.la);x&&(z=!0,x.nodeType&&(w=function(){return!a.a.Ja(x)||B&&B()}));y||c.deferEvaluation||k();x&&l()&&x.nodeType&&(s=function(){a.a.w.Kb(x,s);g()},a.a.w.da(x,s));return f};a.jc=function(b){return a.Ma(b,a.j)};A=a.p.rc;a.j[A]=a.p;a.j.fn={equalityComparer:H};a.j.fn[A]=a.j;a.a.xa&&a.a.za(a.j.fn,a.P.fn);a.b("dependentObservable",a.j);a.b("computed",a.j);a.b("isComputed",a.jc);a.Ib=function(b,d){if("function"===typeof b)return a.s(b,d,{pure:!0});b=a.a.extend({},b);b.pure=!0;return a.s(b,d)};a.b("pureComputed",
a.Ib);(function(){function b(a,g,h){h=h||new c;a=g(a);if("object"!=typeof a||null===a||a===p||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var k=a instanceof Array?[]:{};h.save(a,k);d(a,function(c){var d=g(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":k[c]=d;break;case "object":case "undefined":var l=h.get(d);k[c]=l!==p?l:b(d,g,h)}});return k}function d(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==
typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function c(){this.keys=[];this.hb=[]}a.Qb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.C(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.Qb(b);return a.a.eb(b,c,d)};c.prototype={save:function(b,c){var d=a.a.m(this.keys,b);0<=d?this.hb[d]=c:(this.keys.push(b),this.hb.push(c))},get:function(b){b=a.a.m(this.keys,b);return 0<=b?this.hb[b]:p}}})();
a.b("toJS",a.Qb);a.b("toJSON",a.toJSON);(function(){a.i={q:function(b){switch(a.a.t(b)){case "option":return!0===b.__ko__hasDomDataOptionValue__?a.a.e.get(b,a.d.options.Va):7>=a.a.L?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.i.q(b.options[b.selectedIndex]):p;default:return b.value}},ca:function(b,d,c){switch(a.a.t(b)){case "option":switch(typeof d){case "string":a.a.e.set(b,a.d.options.Va,p);"__ko__hasDomDataOptionValue__"in
b&&delete b.__ko__hasDomDataOptionValue__;b.value=d;break;default:a.a.e.set(b,a.d.options.Va,d),b.__ko__hasDomDataOptionValue__=!0,b.value="number"===typeof d?d:""}break;case "select":if(""===d||null===d)d=p;for(var e=-1,g=0,h=b.options.length,k;g<h;++g)if(k=a.i.q(b.options[g]),k==d||""==k&&d===p){e=g;break}if(c||0<=e||d===p&&1<b.size)b.selectedIndex=e;break;default:if(null===d||d===p)d="";b.value=d}}}})();a.b("selectExtensions",a.i);a.b("selectExtensions.readValue",a.i.q);a.b("selectExtensions.writeValue",
a.i.ca);a.h=function(){function b(b){b=a.a.cb(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=[],d=b.match(e),k,n,t=0;if(d){d.push(",");for(var z=0,u;u=d[z];++z){var r=u.charCodeAt(0);if(44===r){if(0>=t){k&&c.push(n?{key:k,value:n.join("")}:{unknown:k});k=n=t=0;continue}}else if(58===r){if(!n)continue}else if(47===r&&z&&1<u.length)(r=d[z-1].match(g))&&!h[r[0]]&&(b=b.substr(b.indexOf(u)+1),d=b.match(e),d.push(","),z=-1,u="/");else if(40===r||123===r||91===r)++t;else if(41===r||125===r||93===r)--t;
else if(!k&&!n){k=34===r||39===r?u.slice(1,-1):u;continue}n?n.push(u):n=[u]}}return c}var d=["true","false","null","undefined"],c=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),g=/[\])"'A-Za-z0-9_$]+$/,h={"in":1,"return":1,"typeof":1},k={};return{ha:[],V:k,Wa:b,ya:function(f,m){function e(b,m){var f;if(!z){var u=a.getBindingHandler(b);if(u&&u.preprocess&&
!(m=u.preprocess(m,b,e)))return;if(u=k[b])f=m,0<=a.a.m(d,f)?f=!1:(u=f.match(c),f=null===u?!1:u[1]?"Object("+u[1]+")"+u[2]:f),u=f;u&&h.push("'"+b+"':function(_z){"+f+"=_z}")}t&&(m="function(){return "+m+" }");g.push("'"+b+"':"+m)}m=m||{};var g=[],h=[],t=m.valueAccessors,z=m.bindingParams,u="string"===typeof f?b(f):f;a.a.u(u,function(a){e(a.key||a.unknown,a.value)});h.length&&e("_ko_property_writers","{"+h.join(",")+" }");return g.join(",")},lc:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==
b)return!0;return!1},pa:function(b,c,d,e,k){if(b&&a.C(b))!a.Ra(b)||k&&b.v()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();a.b("expressionRewriting",a.h);a.b("expressionRewriting.bindingRewriteValidators",a.h.ha);a.b("expressionRewriting.parseObjectLiteral",a.h.Wa);a.b("expressionRewriting.preProcessBindings",a.h.ya);a.b("expressionRewriting._twoWayBindings",a.h.V);a.b("jsonExpressionRewriting",a.h);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.h.ya);(function(){function b(a){return 8==
a.nodeType&&h.test(g?a.text:a.nodeValue)}function d(a){return 8==a.nodeType&&k.test(g?a.text:a.nodeValue)}function c(a,c){for(var f=a,e=1,k=[];f=f.nextSibling;){if(d(f)&&(e--,0===e))return k;k.push(f);b(f)&&e++}if(!c)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var d=c(a,b);return d?0<d.length?d[d.length-1].nextSibling:a.nextSibling:null}var g=v&&"\x3c!--test--\x3e"===v.createComment("test").text,h=g?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,
k=g?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,f={ul:!0,ol:!0};a.f={Q:{},childNodes:function(a){return b(a)?c(a):a.childNodes},ja:function(c){if(b(c)){c=a.f.childNodes(c);for(var d=0,f=c.length;d<f;d++)a.removeNode(c[d])}else a.a.Ka(c)},T:function(c,d){if(b(c)){a.f.ja(c);for(var f=c.nextSibling,e=0,k=d.length;e<k;e++)f.parentNode.insertBefore(d[e],f)}else a.a.T(c,d)},Hb:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},Bb:function(c,
d,f){f?b(c)?c.parentNode.insertBefore(d,f.nextSibling):f.nextSibling?c.insertBefore(d,f.nextSibling):c.appendChild(d):a.f.Hb(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||d(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&d(a.nextSibling)?null:a.nextSibling},gc:b,xc:function(a){return(a=(g?a.text:a.nodeValue).match(h))?a[1]:null},Fb:function(c){if(f[a.a.t(c)]){var k=c.firstChild;if(k){do if(1===k.nodeType){var g;g=k.firstChild;
var h=null;if(g){do if(h)h.push(g);else if(b(g)){var t=e(g,!0);t?g=t:h=[g]}else d(g)&&(h=[g]);while(g=g.nextSibling)}if(g=h)for(h=k.nextSibling,t=0;t<g.length;t++)h?c.insertBefore(g[t],h):c.appendChild(g[t])}while(k=k.nextSibling)}}}}})();a.b("virtualElements",a.f);a.b("virtualElements.allowedBindings",a.f.Q);a.b("virtualElements.emptyNode",a.f.ja);a.b("virtualElements.insertAfter",a.f.Bb);a.b("virtualElements.prepend",a.f.Hb);a.b("virtualElements.setDomNodeChildren",a.f.T);(function(){a.J=function(){this.Yb=
{}};a.a.extend(a.J.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=b.getAttribute("data-bind")||a.g.getComponentNameForNode(b);case 8:return a.f.gc(b);default:return!1}},getBindings:function(b,d){var c=this.getBindingsString(b,d),c=c?this.parseBindingsString(c,d,b):null;return a.g.mb(c,b,d,!1)},getBindingAccessors:function(b,d){var c=this.getBindingsString(b,d),c=c?this.parseBindingsString(c,d,b,{valueAccessors:!0}):null;return a.g.mb(c,b,d,!0)},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");
case 8:return a.f.xc(b);default:return null}},parseBindingsString:function(b,d,c,e){try{var g=this.Yb,h=b+(e&&e.valueAccessors||""),k;if(!(k=g[h])){var f,m="with($context){with($data||{}){return{"+a.h.ya(b,e)+"}}}";f=new Function("$context","$element",m);k=g[h]=f}return k(d,c)}catch(l){throw l.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+l.message,l;}}});a.J.instance=new a.J})();a.b("bindingProvider",a.J);(function(){function b(a){return function(){return a}}function d(a){return a()}
function c(b){return a.a.na(a.k.B(b),function(a,c){return function(){return b()[c]}})}function e(a,b){return c(this.getBindings.bind(this,a,b))}function g(b,c,d){var f,e=a.f.firstChild(c),k=a.J.instance,g=k.preprocessNode;if(g){for(;f=e;)e=a.f.nextSibling(f),g.call(k,f);e=a.f.firstChild(c)}for(;f=e;)e=a.f.nextSibling(f),h(b,f,d)}function h(b,c,d){var e=!0,k=1===c.nodeType;k&&a.f.Fb(c);if(k&&d||a.J.instance.nodeHasBindings(c))e=f(c,null,b,d).shouldBindDescendants;e&&!l[a.a.t(c)]&&g(b,c,!k)}function k(b){var c=
[],d={},f=[];a.a.G(b,function y(e){if(!d[e]){var k=a.getBindingHandler(e);k&&(k.after&&(f.push(e),a.a.u(k.after,function(c){if(b[c]){if(-1!==a.a.m(f,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+f.join(", "));y(c)}}),f.length--),c.push({key:e,zb:k}));d[e]=!0}});return c}function f(b,c,f,g){var m=a.a.e.get(b,q);if(!c){if(m)throw Error("You cannot apply bindings multiple times to the same element.");a.a.e.set(b,q,!0)}!m&&g&&a.Ob(b,f);var l;if(c&&"function"!==
typeof c)l=c;else{var h=a.J.instance,n=h.getBindingAccessors||e,s=a.j(function(){(l=c?c(f,b):n.call(h,b,f))&&f.I&&f.I();return l},null,{o:b});l&&s.Z()||(s=null)}var v;if(l){var w=s?function(a){return function(){return d(s()[a])}}:function(a){return l[a]},A=function(){return a.a.na(s?s():l,d)};A.get=function(a){return l[a]&&d(w(a))};A.has=function(a){return a in l};g=k(l);a.a.u(g,function(c){var d=c.zb.init,e=c.zb.update,k=c.key;if(8===b.nodeType&&!a.f.Q[k])throw Error("The binding '"+k+"' cannot be used with virtual elements");
try{"function"==typeof d&&a.k.B(function(){var a=d(b,w(k),A,f.$data,f);if(a&&a.controlsDescendantBindings){if(v!==p)throw Error("Multiple bindings ("+v+" and "+k+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");v=k}}),"function"==typeof e&&a.j(function(){e(b,w(k),A,f.$data,f)},null,{o:b})}catch(g){throw g.message='Unable to process binding "'+k+": "+l[k]+'"\nMessage: '+g.message,g;}})}return{shouldBindDescendants:v===p}}
function m(b){return b&&b instanceof a.N?b:new a.N(b)}a.d={};var l={script:!0};a.getBindingHandler=function(b){return a.d[b]};a.N=function(b,c,d,f){var e=this,k="function"==typeof b&&!a.C(b),g,m=a.j(function(){var g=k?b():b,l=a.a.c(g);c?(c.I&&c.I(),a.a.extend(e,c),m&&(e.I=m)):(e.$parents=[],e.$root=l,e.ko=a);e.$rawData=g;e.$data=l;d&&(e[d]=l);f&&f(e,c,l);return e.$data},null,{Ia:function(){return g&&!a.a.ob(g)},o:!0});m.Z()&&(e.I=m,m.equalityComparer=null,g=[],m.Tb=function(b){g.push(b);a.a.w.da(b,
function(b){a.a.ua(g,b);g.length||(m.K(),e.I=m=p)})})};a.N.prototype.createChildContext=function(b,c,d){return new a.N(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.N.prototype.extend=function(b){return new a.N(this.I||this.$data,this,null,function(c,d){c.$rawData=d.$rawData;a.a.extend(c,"function"==typeof b?b():b)})};var q=a.a.e.F(),n=a.a.e.F();a.Ob=function(b,c){if(2==arguments.length)a.a.e.set(b,n,c),
c.I&&c.I.Tb(b);else return a.a.e.get(b,n)};a.ra=function(b,c,d){1===b.nodeType&&a.f.Fb(b);return f(b,c,m(d),!0)};a.Wb=function(d,f,e){e=m(e);return a.ra(d,"function"===typeof f?c(f.bind(null,e,d)):a.a.na(f,b),e)};a.Ca=function(a,b){1!==b.nodeType&&8!==b.nodeType||g(m(a),b,!0)};a.pb=function(a,b){!w&&s.jQuery&&(w=s.jQuery);if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||s.document.body;h(m(a),
b,!0)};a.Ha=function(b){switch(b.nodeType){case 1:case 8:var c=a.Ob(b);if(c)return c;if(b.parentNode)return a.Ha(b.parentNode)}return p};a.$b=function(b){return(b=a.Ha(b))?b.$data:p};a.b("bindingHandlers",a.d);a.b("applyBindings",a.pb);a.b("applyBindingsToDescendants",a.Ca);a.b("applyBindingAccessorsToNode",a.ra);a.b("applyBindingsToNode",a.Wb);a.b("contextFor",a.Ha);a.b("dataFor",a.$b)})();(function(b){function d(d,f){var e=g.hasOwnProperty(d)?g[d]:b,l;e||(e=g[d]=new a.P,c(d,function(a){h[d]=a;delete g[d];
l?e.notifySubscribers(a):setTimeout(function(){e.notifySubscribers(a)},0)}),l=!0);e.U(f)}function c(a,b){e("getConfig",[a],function(c){c?e("loadComponent",[a,c],function(a){b(a)}):b(null)})}function e(c,d,g,l){l||(l=a.g.loaders.slice(0));var h=l.shift();if(h){var n=h[c];if(n){var t=!1;if(n.apply(h,d.concat(function(a){t?g(null):null!==a?g(a):e(c,d,g,l)}))!==b&&(t=!0,!h.suppressLoaderExceptions))throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
}else e(c,d,g,l)}else g(null)}var g={},h={};a.g={get:function(a,c){var e=h.hasOwnProperty(a)?h[a]:b;e?setTimeout(function(){c(e)},0):d(a,c)},tb:function(a){delete h[a]},jb:e};a.g.loaders=[];a.b("components",a.g);a.b("components.get",a.g.get);a.b("components.clearCachedDefinition",a.g.tb)})();(function(){function b(b,c,d,e){function k(){0===--u&&e(h)}var h={},u=2,r=d.template;d=d.viewModel;r?g(c,r,function(c){a.g.jb("loadTemplate",[b,c],function(a){h.template=a;k()})}):k();d?g(c,d,function(c){a.g.jb("loadViewModel",
[b,c],function(a){h[f]=a;k()})}):k()}function d(a,b,c){if("function"===typeof b)c(function(a){return new b(a)});else if("function"===typeof b[f])c(b[f]);else if("instance"in b){var e=b.instance;c(function(){return e})}else"viewModel"in b?d(a,b.viewModel,c):a("Unknown viewModel value: "+b)}function c(b){switch(a.a.t(b)){case "script":return a.a.ba(b.text);case "textarea":return a.a.ba(b.value);case "template":if(e(b.content))return a.a.ia(b.content.childNodes)}return a.a.ia(b.childNodes)}function e(a){return s.DocumentFragment?
a instanceof DocumentFragment:a&&11===a.nodeType}function g(a,b,c){"string"===typeof b.require?N||s.require?(N||s.require)([b.require],c):a("Uses require, but no AMD loader is present"):c(b)}function h(a){return function(b){throw Error("Component '"+a+"': "+b);}}var k={};a.g.tc=function(b,c){if(!c)throw Error("Invalid configuration for "+b);if(a.g.Qa(b))throw Error("Component "+b+" is already registered");k[b]=c};a.g.Qa=function(a){return a in k};a.g.wc=function(b){delete k[b];a.g.tb(b)};a.g.ub={getConfig:function(a,
b){b(k.hasOwnProperty(a)?k[a]:null)},loadComponent:function(a,c,d){var e=h(a);g(e,c,function(c){b(a,e,c,d)})},loadTemplate:function(b,d,f){b=h(b);if("string"===typeof d)f(a.a.ba(d));else if(d instanceof Array)f(d);else if(e(d))f(a.a.S(d.childNodes));else if(d.element)if(d=d.element,s.HTMLElement?d instanceof HTMLElement:d&&d.tagName&&1===d.nodeType)f(c(d));else if("string"===typeof d){var k=v.getElementById(d);k?f(c(k)):b("Cannot find element with ID "+d)}else b("Unknown element type: "+d);else b("Unknown template value: "+
d)},loadViewModel:function(a,b,c){d(h(a),b,c)}};var f="createViewModel";a.b("components.register",a.g.tc);a.b("components.isRegistered",a.g.Qa);a.b("components.unregister",a.g.wc);a.b("components.defaultLoader",a.g.ub);a.g.loaders.push(a.g.ub);a.g.Ub=k})();(function(){function b(b,e){var g=b.getAttribute("params");if(g){var g=d.parseBindingsString(g,e,b,{valueAccessors:!0,bindingParams:!0}),g=a.a.na(g,function(d){return a.s(d,null,{o:b})}),h=a.a.na(g,function(d){return d.Z()?a.s(function(){return a.a.c(d())},
null,{o:b}):d.v()});h.hasOwnProperty("$raw")||(h.$raw=g);return h}return{$raw:{}}}a.g.getComponentNameForNode=function(b){b=a.a.t(b);return a.g.Qa(b)&&b};a.g.mb=function(c,d,g,h){if(1===d.nodeType){var k=a.g.getComponentNameForNode(d);if(k){c=c||{};if(c.component)throw Error('Cannot use the "component" binding on a custom element matching a component');var f={name:k,params:b(d,g)};c.component=h?function(){return f}:f}}return c};var d=new a.J;9>a.a.L&&(a.g.register=function(a){return function(b){v.createElement(b);
return a.apply(this,arguments)}}(a.g.register),v.createDocumentFragment=function(b){return function(){var d=b(),g=a.g.Ub,h;for(h in g)g.hasOwnProperty(h)&&d.createElement(h);return d}}(v.createDocumentFragment))})();(function(){var b=0;a.d.component={init:function(d,c,e,g,h){function k(){var a=f&&f.dispose;"function"===typeof a&&a.call(f);m=null}var f,m;a.a.w.da(d,k);a.s(function(){var e=a.a.c(c()),g,n;"string"===typeof e?g=e:(g=a.a.c(e.name),n=a.a.c(e.params));if(!g)throw Error("No component name specified");
var t=m=++b;a.g.get(g,function(b){if(m===t){k();if(!b)throw Error("Unknown component '"+g+"'");var c=b.template;if(!c)throw Error("Component '"+g+"' has no template");c=a.a.ia(c);a.f.T(d,c);var c=n,e=b.createViewModel;b=e?e.call(b,c,{element:d}):c;c=h.createChildContext(b);f=b;a.Ca(c,d)}})},null,{o:d});return{controlsDescendantBindings:!0}}};a.f.Q.component=!0})();var Q={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,d){var c=a.a.c(d())||{};a.a.G(c,function(c,d){d=a.a.c(d);var h=
!1===d||null===d||d===p;h&&b.removeAttribute(c);8>=a.a.L&&c in Q?(c=Q[c],h?b.removeAttribute(c):b[c]=d):h||b.setAttribute(c,d.toString());"name"===c&&a.a.Mb(b,h?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,d,c){function e(){var e=b.checked,k=q?h():e;if(!a.Y.ma()&&(!f||e)){var g=a.k.B(d);m?l!==k?(e&&(a.a.ea(g,k,!0),a.a.ea(g,l,!1)),l=k):a.a.ea(g,k,e):a.h.pa(g,c,"checked",k,!0)}}function g(){var c=a.a.c(d());b.checked=m?0<=a.a.m(c,h()):k?c:h()===c}var h=a.Ib(function(){return c.has("checkedValue")?
a.a.c(c.get("checkedValue")):c.has("value")?a.a.c(c.get("value")):b.value}),k="checkbox"==b.type,f="radio"==b.type;if(k||f){var m=k&&a.a.c(d())instanceof Array,l=m?h():p,q=f||m;f&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.s(e,null,{o:b});a.a.n(b,"click",e);a.s(g,null,{o:b})}}};a.h.V.checked=!0;a.d.checkedValue={update:function(b,d){b.value=a.a.c(d())}}})();a.d.css={update:function(b,d){var c=a.a.c(d());"object"==typeof c?a.a.G(c,function(c,d){d=a.a.c(d);a.a.Ba(b,c,d)}):(c=String(c||""),
a.a.Ba(b,b.__ko__cssValue,!1),b.__ko__cssValue=c,a.a.Ba(b,c,!0))}};a.d.enable={update:function(b,d){var c=a.a.c(d());c&&b.disabled?b.removeAttribute("disabled"):c||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,d){a.d.enable.update(b,function(){return!a.a.c(d())})}};a.d.event={init:function(b,d,c,e,g){var h=d()||{};a.a.G(h,function(k){"string"==typeof k&&a.a.n(b,k,function(b){var h,l=d()[k];if(l){try{var q=a.a.S(arguments);e=g.$data;q.unshift(e);h=l.apply(e,q)}finally{!0!==h&&(b.preventDefault?
b.preventDefault():b.returnValue=!1)}!1===c.get(k+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={Eb:function(b){return function(){var d=b(),c=a.a.Xa(d);if(!c||"number"==typeof c.length)return{foreach:d,templateEngine:a.O.Oa};a.a.c(d);return{foreach:c.data,as:c.as,includeDestroyed:c.includeDestroyed,afterAdd:c.afterAdd,beforeRemove:c.beforeRemove,afterRender:c.afterRender,beforeMove:c.beforeMove,afterMove:c.afterMove,templateEngine:a.O.Oa}}},init:function(b,
d){return a.d.template.init(b,a.d.foreach.Eb(d))},update:function(b,d,c,e,g){return a.d.template.update(b,a.d.foreach.Eb(d),c,e,g)}};a.h.ha.foreach=!1;a.f.Q.foreach=!0;a.d.hasfocus={init:function(b,d,c){function e(e){b.__ko_hasfocusUpdating=!0;var f=b.ownerDocument;if("activeElement"in f){var g;try{g=f.activeElement}catch(h){g=f.body}e=g===b}f=d();a.h.pa(f,c,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var g=e.bind(null,!0),h=e.bind(null,!1);a.a.n(b,"focus",g);a.a.n(b,"focusin",
g);a.a.n(b,"blur",h);a.a.n(b,"focusout",h)},update:function(b,d){var c=!!a.a.c(d());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===c||(c?b.focus():b.blur(),a.k.B(a.a.oa,null,[b,c?"focusin":"focusout"]))}};a.h.V.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.h.V.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,d){a.a.$a(b,d())}};I("if");I("ifnot",!1,!0);I("with",!0,!1,function(a,d){return a.createChildContext(d)});var K={};a.d.options={init:function(b){if("select"!==
a.a.t(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,d,c){function e(){return a.a.ta(b.options,function(a){return a.selected})}function g(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function h(c,d){if(q.length){var e=0<=a.a.m(q,a.i.q(d[0]));a.a.Nb(d[0],e);n&&!e&&a.k.B(a.a.oa,null,[b,"change"])}}var k=0!=b.length&&b.multiple?b.scrollTop:null,f=a.a.c(d()),m=c.get("optionsIncludeDestroyed");
d={};var l,q;q=b.multiple?a.a.Da(e(),a.i.q):0<=b.selectedIndex?[a.i.q(b.options[b.selectedIndex])]:[];f&&("undefined"==typeof f.length&&(f=[f]),l=a.a.ta(f,function(b){return m||b===p||null===b||!a.a.c(b._destroy)}),c.has("optionsCaption")&&(f=a.a.c(c.get("optionsCaption")),null!==f&&f!==p&&l.unshift(K)));var n=!1;d.beforeRemove=function(a){b.removeChild(a)};f=h;c.has("optionsAfterRender")&&(f=function(b,d){h(0,d);a.k.B(c.get("optionsAfterRender"),null,[d[0],b!==K?b:p])});a.a.Za(b,l,function(d,e,f){f.length&&
(q=f[0].selected?[a.i.q(f[0])]:[],n=!0);e=b.ownerDocument.createElement("option");d===K?(a.a.bb(e,c.get("optionsCaption")),a.i.ca(e,p)):(f=g(d,c.get("optionsValue"),d),a.i.ca(e,a.a.c(f)),d=g(d,c.get("optionsText"),f),a.a.bb(e,d));return[e]},d,f);a.k.B(function(){c.get("valueAllowUnset")&&c.has("value")?a.i.ca(b,a.a.c(c.get("value")),!0):(b.multiple?q.length&&e().length<q.length:q.length&&0<=b.selectedIndex?a.i.q(b.options[b.selectedIndex])!==q[0]:q.length||0<=b.selectedIndex)&&a.a.oa(b,"change")});
a.a.dc(b);k&&20<Math.abs(k-b.scrollTop)&&(b.scrollTop=k)}};a.d.options.Va=a.a.e.F();a.d.selectedOptions={after:["options","foreach"],init:function(b,d,c){a.a.n(b,"change",function(){var e=d(),g=[];a.a.u(b.getElementsByTagName("option"),function(b){b.selected&&g.push(a.i.q(b))});a.h.pa(e,c,"selectedOptions",g)})},update:function(b,d){if("select"!=a.a.t(b))throw Error("values binding applies only to SELECT elements");var c=a.a.c(d());c&&"number"==typeof c.length&&a.a.u(b.getElementsByTagName("option"),
function(b){var d=0<=a.a.m(c,a.i.q(b));a.a.Nb(b,d)})}};a.h.V.selectedOptions=!0;a.d.style={update:function(b,d){var c=a.a.c(d()||{});a.a.G(c,function(c,d){d=a.a.c(d);if(null===d||d===p||!1===d)d="";b.style[c]=d})}};a.d.submit={init:function(b,d,c,e,g){if("function"!=typeof d())throw Error("The value for a submit binding must be a function");a.a.n(b,"submit",function(a){var c,e=d();try{c=e.call(g.$data,b)}finally{!0!==c&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},
update:function(b,d){a.a.bb(b,d())}};a.f.Q.text=!0;(function(){if(s&&s.navigator)var b=function(a){if(a)return parseFloat(a[1])},d=s.opera&&s.opera.version&&parseInt(s.opera.version()),c=s.navigator.userAgent,e=b(c.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),g=b(c.match(/Firefox\/([^ ]*)/));if(10>a.a.L)var h=a.a.e.F(),k=a.a.e.F(),f=function(b){var c=this.activeElement;(c=c&&a.a.e.get(c,k))&&c(b)},m=function(b,c){var d=b.ownerDocument;a.a.e.get(d,h)||(a.a.e.set(d,h,!0),a.a.n(d,"selectionchange",
f));a.a.e.set(b,k,c)};a.d.textInput={init:function(b,c,f){function k(c,d){a.a.n(b,c,d)}function h(){var d=a.a.c(c());if(null===d||d===p)d="";v!==p&&d===v?setTimeout(h,4):b.value!==d&&(s=d,b.value=d)}function u(){y||(v=b.value,y=setTimeout(r,4))}function r(){clearTimeout(y);v=y=p;var d=b.value;s!==d&&(s=d,a.h.pa(c(),f,"textInput",d))}var s=b.value,y,v;10>a.a.L?(k("propertychange",function(a){"value"===a.propertyName&&r()}),8==a.a.L&&(k("keyup",r),k("keydown",r)),8<=a.a.L&&(m(b,r),k("dragend",u))):
(k("input",r),5>e&&"textarea"===a.a.t(b)?(k("keydown",u),k("paste",u),k("cut",u)):11>d?k("keydown",u):4>g&&(k("DOMAutoComplete",r),k("dragdrop",r),k("drop",r)));k("change",r);a.s(h,null,{o:b})}};a.h.V.textInput=!0;a.d.textinput={preprocess:function(a,b,c){c("textInput",a)}}})();a.d.uniqueName={init:function(b,d){if(d()){var c="ko_unique_"+ ++a.d.uniqueName.Zb;a.a.Mb(b,c)}}};a.d.uniqueName.Zb=0;a.d.value={after:["options","foreach"],init:function(b,d,c){if("input"!=b.tagName.toLowerCase()||"checkbox"!=
b.type&&"radio"!=b.type){var e=["change"],g=c.get("valueUpdate"),h=!1,k=null;g&&("string"==typeof g&&(g=[g]),a.a.ga(e,g),e=a.a.rb(e));var f=function(){k=null;h=!1;var e=d(),f=a.i.q(b);a.h.pa(e,c,"value",f)};!a.a.L||"input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.m(e,"propertychange")||(a.a.n(b,"propertychange",function(){h=!0}),a.a.n(b,"focus",function(){h=!1}),a.a.n(b,"blur",function(){h&&f()}));a.a.u(e,function(c){var d=f;a.a.vc(c,
"after")&&(d=function(){k=a.i.q(b);setTimeout(f,0)},c=c.substring(5));a.a.n(b,c,d)});var m=function(){var e=a.a.c(d()),f=a.i.q(b);if(null!==k&&e===k)setTimeout(m,0);else if(e!==f)if("select"===a.a.t(b)){var g=c.get("valueAllowUnset"),f=function(){a.i.ca(b,e,g)};f();g||e===a.i.q(b)?setTimeout(f,0):a.k.B(a.a.oa,null,[b,"change"])}else a.i.ca(b,e)};a.s(m,null,{o:b})}else a.ra(b,{checkedValue:d})},update:function(){}};a.h.V.value=!0;a.d.visible={update:function(b,d){var c=a.a.c(d()),e="none"!=b.style.display;
c&&!e?b.style.display="":!c&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(d,c,e,g,h){return a.d.event.init.call(this,d,function(){var a={};a[b]=c();return a},e,g,h)}}})("click");a.H=function(){};a.H.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");};a.H.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.H.prototype.makeTemplateSource=function(b,d){if("string"==typeof b){d=d||v;var c=
d.getElementById(b);if(!c)throw Error("Cannot find template with ID "+b);return new a.r.l(c)}if(1==b.nodeType||8==b.nodeType)return new a.r.fa(b);throw Error("Unknown template type: "+b);};a.H.prototype.renderTemplate=function(a,d,c,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,d,c)};a.H.prototype.isTemplateRewritten=function(a,d){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,d).data("isRewritten")};a.H.prototype.rewriteTemplate=function(a,d,c){a=this.makeTemplateSource(a,
c);d=d(a.text());a.text(d);a.data("isRewritten",!0)};a.b("templateEngine",a.H);a.fb=function(){function b(b,c,d,k){b=a.h.Wa(b);for(var f=a.h.ha,m=0;m<b.length;m++){var l=b[m].key;if(f.hasOwnProperty(l)){var q=f[l];if("function"===typeof q){if(l=q(b[m].value))throw Error(l);}else if(!q)throw Error("This template engine does not support the '"+l+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.h.ya(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+
"')";return k.createJavaScriptEvaluatorBlock(d)+c}var d=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,c=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{ec:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.fb.nc(b,c)},d)},nc:function(a,g){return a.replace(d,function(a,c,d,e,l){return b(l,c,d,g)}).replace(c,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",g)})},Xb:function(b,c){return a.D.Ua(function(d,
k){var f=d.nextSibling;f&&f.nodeName.toLowerCase()===c&&a.ra(f,b,k)})}}}();a.b("__tr_ambtns",a.fb.Xb);(function(){a.r={};a.r.l=function(a){this.l=a};a.r.l.prototype.text=function(){var b=a.a.t(this.l),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.l[b];var d=arguments[0];"innerHTML"===b?a.a.$a(this.l,d):this.l[b]=d};var b=a.a.e.F()+"_";a.r.l.prototype.data=function(c){if(1===arguments.length)return a.a.e.get(this.l,b+c);a.a.e.set(this.l,b+c,arguments[1])};
var d=a.a.e.F();a.r.fa=function(a){this.l=a};a.r.fa.prototype=new a.r.l;a.r.fa.prototype.text=function(){if(0==arguments.length){var b=a.a.e.get(this.l,d)||{};b.gb===p&&b.Ga&&(b.gb=b.Ga.innerHTML);return b.gb}a.a.e.set(this.l,d,{gb:arguments[0]})};a.r.l.prototype.nodes=function(){if(0==arguments.length)return(a.a.e.get(this.l,d)||{}).Ga;a.a.e.set(this.l,d,{Ga:arguments[0]})};a.b("templateSources",a.r);a.b("templateSources.domElement",a.r.l);a.b("templateSources.anonymousTemplate",a.r.fa)})();(function(){function b(b,
c,d){var e;for(c=a.f.nextSibling(c);b&&(e=b)!==c;)b=a.f.nextSibling(e),d(e,b)}function d(c,d){if(c.length){var e=c[0],g=c[c.length-1],h=e.parentNode,n=a.J.instance,t=n.preprocessNode;if(t){b(e,g,function(a,b){var c=a.previousSibling,d=t.call(n,a);d&&(a===e&&(e=d[0]||b),a===g&&(g=d[d.length-1]||c))});c.length=0;if(!e)return;e===g?c.push(e):(c.push(e,g),a.a.ka(c,h))}b(e,g,function(b){1!==b.nodeType&&8!==b.nodeType||a.pb(d,b)});b(e,g,function(b){1!==b.nodeType&&8!==b.nodeType||a.D.Sb(b,[d])});a.a.ka(c,
h)}}function c(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,h,l,q){q=q||{};var n=b&&c(b),n=n&&n.ownerDocument,t=q.templateEngine||g;a.fb.ec(h,t,n);h=t.renderTemplate(h,l,q,n);if("number"!=typeof h.length||0<h.length&&"number"!=typeof h[0].nodeType)throw Error("Template engine must return an array of DOM nodes");n=!1;switch(e){case "replaceChildren":a.f.T(b,h);n=!0;break;case "replaceNode":a.a.Lb(b,h);n=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+
e);}n&&(d(h,l),q.afterRender&&a.k.B(q.afterRender,null,[h,l.$data]));return h}var g;a.ab=function(b){if(b!=p&&!(b instanceof a.H))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.Ya=function(b,d,h,l,q){h=h||{};if((h.templateEngine||g)==p)throw Error("Set a template engine before calling renderTemplate");q=q||"replaceChildren";if(l){var n=c(l);return a.j(function(){var g=d&&d instanceof a.N?d:new a.N(a.a.c(d)),p=a.C(b)?b():"function"===typeof b?b(g.$data,g):b,g=e(l,q,p,g,h);
"replaceNode"==q&&(l=g,n=c(l))},null,{Ia:function(){return!n||!a.a.Ja(n)},o:n&&"replaceNode"==q?n.parentNode:n})}return a.D.Ua(function(c){a.Ya(b,d,h,c,"replaceNode")})};a.uc=function(b,c,g,h,q){function n(a,b){d(b,s);g.afterRender&&g.afterRender(b,a)}function t(c,d){s=q.createChildContext(c,g.as,function(a){a.$index=d});var f=a.C(b)?b():"function"===typeof b?b(c,s):b;return e(null,"ignoreTargetNode",f,s,g)}var s;return a.j(function(){var b=a.a.c(c)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.ta(b,
function(b){return g.includeDestroyed||b===p||null===b||!a.a.c(b._destroy)});a.k.B(a.a.Za,null,[h,b,t,g,n])},null,{o:h})};var h=a.a.e.F();a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||d.name?a.f.ja(b):(d=a.f.childNodes(b),d=a.a.oc(d),(new a.r.fa(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,e,g){var n=c(),t;c=a.a.c(n);d=!0;e=null;"string"==typeof c?c={}:(n=c.name,"if"in c&&(d=a.a.c(c["if"])),d&&"ifnot"in c&&(d=!a.a.c(c.ifnot)),t=a.a.c(c.data));
"foreach"in c?e=a.uc(n||b,d&&c.foreach||[],c,b,g):d?(g="data"in c?g.createChildContext(t,c.as):g,e=a.Ya(n||b,g,c,b)):a.f.ja(b);g=e;(t=a.a.e.get(b,h))&&"function"==typeof t.K&&t.K();a.a.e.set(b,h,g&&g.Z()?g:p)}};a.h.ha.template=function(b){b=a.h.Wa(b);return 1==b.length&&b[0].unknown||a.h.lc(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};a.f.Q.template=!0})();a.b("setTemplateEngine",a.ab);a.b("renderTemplate",a.Ya);a.a.wb=function(a,d,c){if(a.length&&
d.length){var e,g,h,k,f;for(e=g=0;(!c||e<c)&&(k=a[g]);++g){for(h=0;f=d[h];++h)if(k.value===f.value){k.moved=f.index;f.moved=k.index;d.splice(h,1);e=h=0;break}e+=h}}};a.a.Fa=function(){function b(b,c,e,g,h){var k=Math.min,f=Math.max,m=[],l,q=b.length,n,p=c.length,s=p-q||1,u=q+p+1,r,v,w;for(l=0;l<=q;l++)for(v=r,m.push(r=[]),w=k(p,l+s),n=f(0,l-1);n<=w;n++)r[n]=n?l?b[l-1]===c[n-1]?v[n-1]:k(v[n]||u,r[n-1]||u)+1:n+1:l+1;k=[];f=[];s=[];l=q;for(n=p;l||n;)p=m[l][n]-1,n&&p===m[l][n-1]?f.push(k[k.length]={status:e,
value:c[--n],index:n}):l&&p===m[l-1][n]?s.push(k[k.length]={status:g,value:b[--l],index:l}):(--n,--l,h.sparse||k.push({status:"retained",value:c[n]}));a.a.wb(f,s,10*q);return k.reverse()}return function(a,c,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};a=a||[];c=c||[];return a.length<=c.length?b(a,c,"added","deleted",e):b(c,a,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.Fa);(function(){function b(b,d,g,h,k){var f=[],m=a.j(function(){var l=d(g,k,a.a.ka(f,b))||[];0<f.length&&(a.a.Lb(f,
l),h&&a.k.B(h,null,[g,l,k]));f.length=0;a.a.ga(f,l)},null,{o:b,Ia:function(){return!a.a.ob(f)}});return{$:f,j:m.Z()?m:p}}var d=a.a.e.F();a.a.Za=function(c,e,g,h,k){function f(b,d){x=q[d];r!==d&&(A[b]=x);x.Na(r++);a.a.ka(x.$,c);s.push(x);w.push(x)}function m(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.u(c[d].$,function(a){b(a,d,c[d].sa)})}e=e||[];h=h||{};var l=a.a.e.get(c,d)===p,q=a.a.e.get(c,d)||[],n=a.a.Da(q,function(a){return a.sa}),t=a.a.Fa(n,e,h.dontLimitMoves),s=[],u=0,r=0,v=[],w=[];e=
[];for(var A=[],n=[],x,B=0,D,F;D=t[B];B++)switch(F=D.moved,D.status){case "deleted":F===p&&(x=q[u],x.j&&x.j.K(),v.push.apply(v,a.a.ka(x.$,c)),h.beforeRemove&&(e[B]=x,w.push(x)));u++;break;case "retained":f(B,u++);break;case "added":F!==p?f(B,F):(x={sa:D.value,Na:a.p(r++)},s.push(x),w.push(x),l||(n[B]=x))}m(h.beforeMove,A);a.a.u(v,h.beforeRemove?a.R:a.removeNode);for(var B=0,l=a.f.firstChild(c),G;x=w[B];B++){x.$||a.a.extend(x,b(c,g,x.sa,k,x.Na));for(u=0;t=x.$[u];l=t.nextSibling,G=t,u++)t!==l&&a.f.Bb(c,
t,G);!x.ic&&k&&(k(x.sa,x.$,x.Na),x.ic=!0)}m(h.beforeRemove,e);m(h.afterMove,A);m(h.afterAdd,n);a.a.e.set(c,d,s)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Za);a.O=function(){this.allowTemplateRewriting=!1};a.O.prototype=new a.H;a.O.prototype.renderTemplateSource=function(b){var d=(9>a.a.L?0:b.nodes)?b.nodes():null;if(d)return a.a.S(d.cloneNode(!0).childNodes);b=b.text();return a.a.ba(b)};a.O.Oa=new a.O;a.ab(a.O.Oa);a.b("nativeTemplateEngine",a.O);(function(){a.Sa=function(){var a=this.kc=
function(){if(!w||!w.tmpl)return 0;try{if(0<=w.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,g){g=g||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=w.template(null,"{{ko_with $item.koBindingContext}}"+h+"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=w.extend({koBindingContext:e},g.templateOptions);e=w.tmpl(h,
b,e);e.appendTo(v.createElement("div"));w.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){v.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(w.tmpl.tag.ko_code={open:"__.push($1 || '');"},w.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.Sa.prototype=new a.H;var b=new a.Sa;0<b.kc&&a.ab(b);a.b("jqueryTmplTemplateEngine",a.Sa)})()})})();})();//
// store.js by Frank Kohlhepp
// Copyright (c) 2011 - 2012 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function () {
    var has = function (object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    };
    
    var objectGetLength = function (object) {
        var count = 0;
        for (var key in object) {
            if (has(object, key)) { count++; }
        }
        
        return count;
    };
    
    var arrayIndexOf = function (array, item, from) {
        var length = array.length >>> 0;
        for (var i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
            if (array[i] === item) { return i; }
        }
        
        return -1;
    };
    
    var arrayContains = function (array, item, from) {
        return arrayIndexOf(array, item, from) !== -1;
    };
    
    var arrayInclude = function (array, item) {
        if (!arrayContains(array, item)) { array.push(item); }
        return array;
    };
    
    var Store = this.Store = function (name, defaults, watcherSpeed) {
        this.name = name;
        this.defaults = defaults || {};
        this.watcherSpeed = watcherSpeed || 500;
        this.listeners = {};
        this.ls = {};
        
        // Apply defaults
        this.applyDefaults();
    };
    
    Store.clear = function () {
        localStorage.clear();
    };
    
    Store.prototype.applyDefaults = function () {
        for (var key in this.defaults) {
            if (has(this.defaults, key) && this.get(key) === undefined) {
                this.set(key, this.defaults[key]);
            }
        }
        
        return this;
    };
    
    Store.prototype.watcher = function (force) {
        if (this.watcherTimer) {
            clearTimeout(this.watcherTimer);
        }
        
        if (objectGetLength(this.listeners) || force) {
            this.newObject = this.toObject();
            
            if (this.oldObject) {
                for (var key in this.newObject) {
                    if (has(this.newObject, key) && this.newObject[key] !== this.oldObject[key]) {
                        this.fireEvent(key, this.newObject[key]);
                    }
                }
                
                for (var key in this.oldObject) {
                    if (has(this.oldObject, key) && !has(this.newObject, key)) {
                        this.fireEvent(key, this.newObject[key]);
                    }
                }
            }
            
            this.oldObject = this.newObject;
            var that = this;
            this.watcherTimer = setTimeout(function () {
                that.watcher();
            }, this.watcherSpeed);
        }
        
        return this;
    };
    
    Store.prototype.get = function (name) {
	    var _n = "store." + this.name + "." + name;
	    var value = null;
	    try{
        	value = localStorage.getItem(_n);
        }
        catch (e) {
	        if( typeof this.ls[_n] != 'undefined'){
		        value = this.ls[_n];
	        }
        }
        if (value === null) {
	        //lets see if we have a local version
	        if( typeof this.ls[_n] != 'undefined'){
		        value = this.ls[_n];
	        }
	        
	        //check cookie
		    if (value === null) {
		    	value = readCookie(_n);    
	        }
	        
		    if (value === null) {
		    	return undefined;    
	        }
	        
		}
        try { return JSON.parse(value); } catch (e) { return null; }
    };
    
    Store.prototype.set = function (name, value) {
        if (value === undefined) {
            this.remove(name);
        } else {
            if (typeof value === "function") { value = null; }
            try { value = JSON.stringify(value); } catch (e) { value = null; }
            
            var _n = "store." + this.name + "." + name;
            
            try{
            	localStorage.setItem(_n, value);
            }
            catch (e){
				this.ls[_n] = value;
				createCookie(_n,value);
				$ar.Notification('Booking may not work while in private browsing on Safari!','error');
			}
        }
        
        return this;
    };
    
    Store.prototype.remove = function (name) {
	    var _n = "store." + this.name + "." + name;
	    try{
	        localStorage.removeItem(_n);
			delete this.ls[_n];
		}
		catch (e){
			//no nothing
			if( typeof this.ls[_n] != 'undefined' ){
				eraseCookie(_n);
				delete this.ls[_n];	
			}
		}
        
        return this.applyDefaults();
    };
    
    Store.prototype.reset = function () {
        var name = "store." + this.name + ".";
        
        try{
	        for (var i = (localStorage.length - 1); i >= 0; i--) {
	            if (localStorage.key(i).substring(0, name.length) === name) {
	                localStorage.removeItem(localStorage.key(i));
	            }
	        }
			for ( var k in this.ls ){
				delete this.ls[k];
				eraseCookie(k);
			}
        }
        catch (e){
			for ( var k in this.ls ){
				delete this.ls[k];
				eraseCookie(k);
			}
        }
        
        return this.applyDefaults();
    };
    
    Store.prototype.toObject = function () {
        var values = {};
        var name = "store." + this.name + ".";
        
        try{
	        for (var i = (localStorage.length - 1); i >= 0; i--) {
	            if (localStorage.key(i).substring(0, name.length) === name) {
	                var key = localStorage.key(i).substring(name.length);
	                var value = this.get(key);
	                if (value !== undefined) { values[key] = value; }
	            }
	        }
        }
        catch (e){
			for ( var k in this.ls ){
				var key = k.substr(name.length);
				values[k] = this.ls[k];
			}
		}
        
        return values;
    };
    
    Store.prototype.fromObject = function (values, merge) {
        if (!merge) { this.reset(); }
        for (var key in values) {
            if (has(values, key)) {
                this.set(key, values[key]);
            }
        }
        
        return this;
    };
    
    Store.prototype.addEvent = function (selector, callback) {
        this.watcher(true);
        if (!this.listeners[selector]) { this.listeners[selector] = []; }
        arrayInclude(this.listeners[selector], callback);
        return this;
    };
    
    Store.prototype.removeEvent = function (selector, callback) {
        for (var i = (this.listeners[selector].length - 1); i >= 0; i--) {
            if (this.listeners[selector][i] === callback) { this.listeners[selector].splice(i, 1); }
        }
        
        if (!this.listeners[selector].length) { delete this.listeners[selector]; }
        return this;
    };
    
    Store.prototype.fireEvent = function (name, value) {
        var selectors = [name, "*"];
        for (var i = 0; i < selectors.length; i++) {
            var selector = selectors[i];
            if (this.listeners[selector]) {
                for (var j = 0; j < this.listeners[selector].length; j++) {
                    this.listeners[selector][j](value, name, this.name);
                }
            }
        }
        
        return this;
    };
    
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	
}());
var Path = {
    'version': "0.8.4",
    'map': function (path) {
        if (Path.routes.defined.hasOwnProperty(path)) {
            return Path.routes.defined[path];
        } else {
            return new Path.core.route(path);
        }
    },
    'root': function (path) {
        Path.routes.root = path;
    },
    'rescue': function (fn) {
        Path.routes.rescue = fn;
    },
    'history': {
        'initial':{}, // Empty container for "Initial Popstate" checking variables.
        'pushState': function(state, title, path){
            if(Path.history.supported){
                if(Path.dispatch(path)){
                    history.pushState(state, title, path);
                }
            } else {
                if(Path.history.fallback){
                    window.location.hash = "#" + path;
                }
            }
        },
        'popState': function(event){
            var initialPop = !Path.history.initial.popped && location.href == Path.history.initial.URL;
            Path.history.initial.popped = true;
            if(initialPop) return;
            Path.dispatch(document.location.pathname);
        },
        'listen': function(fallback){
            Path.history.supported = !!(window.history && window.history.pushState);
            Path.history.fallback  = fallback;

            if(Path.history.supported){
                Path.history.initial.popped = ('state' in window.history), Path.history.initial.URL = location.href;
                window.onpopstate = Path.history.popState;
            } else {
                if(Path.history.fallback){
                    for(route in Path.routes.defined){
                        if(route.charAt(0) != "#"){
                          Path.routes.defined["#"+route] = Path.routes.defined[route];
                          Path.routes.defined["#"+route].path = "#"+route;
                        }
                    }
                    Path.listen();
                }
            }
        }
    },
    'match': function (path, parameterize) {
        var params = {}, route = null, possible_routes, slice, i, j, compare;
        for (route in Path.routes.defined) {
            if (route !== null && route !== undefined) {
                route = Path.routes.defined[route];
                possible_routes = route.partition();
                for (j = 0; j < possible_routes.length; j++) {
                    slice = possible_routes[j];
                    compare = path;
                    if (slice.search(/:/) > 0) {
                        for (i = 0; i < slice.split("/").length; i++) {
                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
                            }
                        }
                    }
                    if (slice === compare) {
                        if (parameterize) {
                            route.params = params;
                        }
                        return route;
                    }
                }
            }
        }
        return null;
    },
    'dispatch': function (passed_route) {
        var previous_route, matched_route;
        if (Path.routes.current !== passed_route) {
            Path.routes.previous = Path.routes.current;
            Path.routes.current = passed_route;
            matched_route = Path.match(passed_route, true);

            if (Path.routes.previous) {
                previous_route = Path.match(Path.routes.previous);
                if (previous_route !== null && previous_route.do_exit !== null) {
                    previous_route.do_exit();
                }
            }

            if (matched_route !== null) {
                matched_route.run();
                return true;
            } else {
                if (Path.routes.rescue !== null) {
                    Path.routes.rescue();
                }
            }
        }
    },
    'listen': function () {
        var fn = function(){ Path.dispatch(location.hash); }

        if (location.hash === "") {
            if (Path.routes.root !== null) {
                location.hash = Path.routes.root;
            }
        }

        // The 'document.documentMode' checks below ensure that PathJS fires the right events
        // even in IE "Quirks Mode".
        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
            window.onhashchange = fn;
        } else {
            setInterval(fn, 50);
        }

        if(location.hash !== "") {
            Path.dispatch(location.hash);
        }
    },
    'core': {
        'route': function (path) {
            this.path = path;
            this.action = null;
            this.do_enter = [];
            this.do_exit = null;
            this.params = {};
            Path.routes.defined[path] = this;
        }
    },
    'routes': {
        'current': null,
        'root': null,
        'rescue': null,
        'previous': null,
        'defined': {}
    }
};
Path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
        var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    'run': function () {
        var halt_execution = false, i, result, previous;

        if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (Path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
                    result = Path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if (!halt_execution) {
            Path.routes.defined[this.path].action();
        }
    }
};/*! $.noUiSlider
 @version 5.0.0
 @author Leon Gersen https://twitter.com/LeonGersen
 @license WTFPL http://www.wtfpl.net/about/
 @documentation http://refreshless.com/nouislider/
*/

// ==ClosureCompiler==
// @externs_url http://refreshless.com/externs/jquery-1.8.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// ==/ClosureCompiler==

/*jshint laxcomma: true */
/*jshint smarttabs: true */
/*jshint sub: true */

/*jslint browser: true */
/*jslint continue: true */
/*jslint plusplus: true */
/*jslint white: true */
/*jslint sub: true */

(function( $ ){

	'use strict';

	if ( $['zepto'] && !$.fn.removeData ) {
		throw new ReferenceError('Zepto is loaded without the data module.');
	}

	$.fn['noUiSlider'] = function( options, rebuild ){

		var
		// Cache the document and body selectors;
		 doc = $(document)
		,body = $('body')

		// Namespace for binding and unbinding slider events;
		,namespace = '.nui'

		// Copy of the current value function;
		,$VAL = $.fn.val

		// Re-usable list of classes;
		,clsList = [
		/*  0 */  'noUi-base'
		/*  1 */ ,'noUi-origin'
		/*  2 */ ,'noUi-handle'
		/*  3 */ ,'noUi-input'
		/*  4 */ ,'noUi-active'
		/*  5 */ ,'noUi-state-tap'
		/*  6 */ ,'noUi-target'
		/*  7 */ ,'-lower'
		/*  8 */ ,'-upper'
		/*  9 */ ,'noUi-connect'
		/* 10 */ ,'noUi-horizontal'
		/* 11 */ ,'noUi-vertical'
		/* 12 */ ,'noUi-background'
		/* 13 */ ,'noUi-stacking'
		/* 14 */ ,'noUi-block'
		/* 15 */ ,'noUi-state-blocked'
		/* 16 */ ,'noUi-ltr'
		/* 17 */ ,'noUi-rtl'
		/* 18 */ ,'noUi-dragable'
		/* 19 */ ,'noUi-extended'
		/* 20 */ ,'noUi-state-drag'
		]

		// Determine the events to bind. IE11 implements pointerEvents without
		// a prefix, which breaks compatibility with the IE10 implementation.
		,actions = window.navigator['pointerEnabled'] ? {
			 start: 'pointerdown'
			,move: 'pointermove'
			,end: 'pointerup'
		} : window.navigator['msPointerEnabled'] ? {
			 start: 'MSPointerDown'
			,move: 'MSPointerMove'
			,end: 'MSPointerUp'
		} : {
			 start: 'mousedown touchstart'
			,move: 'mousemove touchmove'
			,end: 'mouseup touchend'
		};


// Percentage calculation

	// (percentage) How many percent is this value of this range?
		function fromPercentage ( range, value ) {
			return (value * 100) / ( range[1] - range[0] );
		}

	// (percentage) Where is this value on this range?
		function toPercentage ( range, value ) {
			return fromPercentage( range, range[0] < 0 ?
				value + Math.abs(range[0]) :
					value - range[0] );
		}

	// (value) How much is this percentage on this range?
		function isPercentage ( range, value ) {
			return ((value * ( range[1] - range[0] )) / 100) + range[0];
		}


// Type tests

	// Test in an object is an instance of jQuery or Zepto.
		function isInstance ( a ) {
			return a instanceof $ || ( $['zepto'] && $['zepto']['isZ'](a) );
		}

	// Checks whether a value is numerical.
		function isNumeric ( a ) {
			return !isNaN( parseFloat( a ) ) && isFinite( a );
		}


// General helper functions

	// Test an array of objects, and calls them if they are a function.
		function call ( functions, scope ) {

			// Allow the passing of an unwrapped function.
			// Leaves other code a more comprehensible.
			if( !$.isArray( functions ) ){
				functions = [ functions ];
			}

			$.each( functions, function(){
				if (typeof this === 'function') {
					this.call(scope);
				}
			});
		}

	// Returns a proxy to set a target using the public value method.
		function setN ( target, number ) {

			return function(){

				// Determine the correct position to set,
				// leave the other one unchanged.
				var val = [null, null];
				val[ number ] = $(this).val();

				// Trigger the 'set' callback
				target.val(val, true);
			};
		}

	// Round a value to the closest 'to'.
		function closest ( value, to ){
			return Math.round(value / to) * to;
		}

	// Format output value to specified standards.
		function format ( value, options ) {

			// Round the value to the resolution that was set
			// with the serialization options.
			value = value.toFixed( options['decimals'] );

			// Rounding away decimals might cause a value of -0
			// when using very small ranges. Remove those cases.
			if ( parseFloat(value) === 0 ) {
				value = value.replace('-0', '0');
			}

			// Apply the proper decimal mark to the value.
			return value.replace( '.', options['serialization']['mark'] );
		}

	// Determine the handle closest to an event.
		function closestHandle ( handles, location, style ) {

			if ( handles.length === 1 ) {
				return handles[0];
			}

			var total = handles[0].offset()[style] +
						handles[1].offset()[style];

			return handles[ location < total / 2 ? 0 : 1 ];
		}

	// Round away small numbers in floating point implementation.
		function digits ( value, round ) {
			return parseFloat(value.toFixed(round));
		}

// Event abstraction

	// Provide a clean event with standardized offset values.
		function fixEvent ( e ) {

			// Prevent scrolling and panning on touch events, while
			// attempting to slide. The tap event also depends on this.
			e.preventDefault();

			// Filter the event to register the type, which can be
			// touch, mouse or pointer. Offset changes need to be
			// made on an event specific basis.
			var  touch = e.type.indexOf('touch') === 0
				,mouse = e.type.indexOf('mouse') === 0
				,pointer = e.type.indexOf('pointer') === 0
				,x,y, event = e;

			// IE10 implemented pointer events with a prefix;
			if ( e.type.indexOf('MSPointer') === 0 ) {
				pointer = true;
			}

			// Get the originalEvent, if the event has been wrapped
			// by jQuery. Zepto doesn't wrap the event.
			if ( e.originalEvent ) {
				e = e.originalEvent;
			}

			if ( touch ) {
				// noUiSlider supports one movement at a time,
				// so we can select the first 'changedTouch'.
				x = e.changedTouches[0].pageX;
				y = e.changedTouches[0].pageY;
			}
			if ( mouse || pointer ) {

				// Polyfill the pageXOffset and pageYOffset
				// variables for IE7 and IE8;
				if( !pointer && window.pageXOffset === undefined ){
					window.pageXOffset = document.documentElement.scrollLeft;
					window.pageYOffset = document.documentElement.scrollTop;
				}

				x = e.clientX + window.pageXOffset;
				y = e.clientY + window.pageYOffset;
			}

			return $.extend( event, {
				 'pointX': x
				,'pointY': y
				,cursor: mouse
			});
		}

	// Handler for attaching events trough a proxy
		function attach ( events, element, callback, pass ) {

			var target = pass.target;

			// Add the noUiSlider namespace to all events.
			events = events.replace( /\s/g, namespace + ' ' ) + namespace;

			// Bind a closure on the target.
			return element.on( events, function( e ){

				// jQuery and Zepto handle unset attributes differently.
				var disabled = target.attr('disabled');
					disabled = !( disabled === undefined || disabled === null );

				// Test if there is anything that should prevent an event
				// from being handled, such as a disabled state or an active
				// 'tap' transition.
				if( target.hasClass('noUi-state-tap') || disabled ) {
					return false;
				}

				// Call the event handler with three arguments:
				// - The event;
				// - An object with data for the event;
				// - The slider options;
				// Having the slider options as a function parameter prevents
				// getting it in every function, which muddies things up.
				callback (
					 fixEvent( e )
					,pass
					,target.data('base').data('options')
				);
			});
		}


// Serialization and value storage

	// Store a value on all serialization targets, or get the current value.
		function serialize ( a ) {

			/*jshint validthis: true */

			// Re-scope target for availability within .each;
			var target = this.target;

			// Get the value for this handle
			if ( a === undefined ) {
				return this.element.data('value');
			}

			// Write the value to all serialization objects
			// or store a new value on the handle
			if ( a === true ) {
				a = this.element.data('value');
			} else {
				this.element.data('value', a);
			}

			// Prevent a serialization call if the value wasn't initialized.
			if ( a === undefined ) {
				return;
			}

			// If the provided element was a function,
			// call it with the slider as scope. Otherwise,
			// simply call the function on the object.
			$.each( this.elements, function() {
				if ( typeof this === 'function' ) {
					this.call(target, a);
				} else {
					this[0][this[1]](a);
				}
			});
		}

	// Map serialization to [ element, method ]. Attach events where required.
		function storeElement ( handle, item, number ) {

			// Add a change event to the supplied jQuery objects,
			// which triggers the value-setting function on the target.
			if ( isInstance( item ) ) {

				var elements = [], target = handle.data('target');

				// Link the field to the other handle if the
				// slider is inverted.
				if ( handle.data('options').direction ) {
					number = number ? 0 : 1;
				}

				// Loop all items so the change event is properly bound,
				// and the items can individually be added to the array.
				item.each(function(){

					// Bind the change event.
					$(this).on('change' + namespace, setN( target, number ));

					// Store the element with the proper handler.
					elements.push([ $(this), 'val' ]);
				});

				return elements;
			}

			// Append a new input to the noUiSlider base.
			// Prevent the change event from flowing upward.
			if ( typeof item === 'string' ) {

				item = [ $('<input type="hidden" name="'+ item +'">')
					.appendTo(handle)
					.addClass(clsList[3])
					.change(function ( e ) {
						e.stopPropagation();
					}), 'val'];
			}

			return [item];
		}

	// Access point and abstraction for serialization.
		function store ( handle, i, serialization ) {

			var elements = [];

			// Loops all items in the provided serialization setting,
			// add the proper events to them or create new input fields,
			// and add them as data to the handle so they can be kept
			// in sync with the slider value.
			$.each( serialization['to'][i], function( index ){
				elements = elements.concat(
					storeElement( handle, serialization['to'][i][index], i )
				);
			});

			return {
				 element: handle
				,elements: elements
				,target: handle.data('target')
				,'val': serialize
			};
		}


// Handle placement

	// Fire callback on unsuccessful handle movement.
		function block ( base, stateless ) {

			var target = base.data('target');

			if ( !target.hasClass(clsList[14]) ){

				// The visual effects should not always be applied.
				if ( !stateless ) {
					target.addClass(clsList[15]);
					setTimeout(function(){
						target.removeClass(clsList[15]);
					}, 450);
				}

				target.addClass(clsList[14]);
				call( base.data('options').block, target );
			}
		}

	// Change inline style and apply proper classes.
		function placeHandle ( handle, to ) {

			var settings = handle.data('options');

			to = digits(to, 7);

			// If the slider can move, remove the class
			// indicating the block state.
			handle.data('target').removeClass(clsList[14]);

			// Set handle to new location
			handle.css( settings['style'], to + '%' ).data('pct', to);

			// Force proper handle stacking
			if ( handle.is(':first-child') ) {
				handle.toggleClass(clsList[13], to > 50 );
			}

			if ( settings['direction'] ) {
				to = 100 - to;
			}

			// Write the value to the serialization object.
			handle.data('store').val(
				format ( isPercentage( settings['range'], to ), settings )
			);
		}

	// Test suggested values and apply margin, step.
		function setHandle ( handle, to ) {

			var base = handle.data('base'), settings = base.data('options'),
				handles = base.data('handles'), lower = 0, upper = 100;

			// Catch invalid user input
			if ( !isNumeric( to ) ){
				return false;
			}

			// Handle the step option.
			if ( settings['step'] ){
				to = closest( to, settings['step'] );
			}

			if ( handles.length > 1 ){
				if ( handle[0] !== handles[0][0] ) {
					lower = digits(handles[0].data('pct')+settings['margin'],7);
				} else {
					upper = digits(handles[1].data('pct')-settings['margin'],7);
				}
			}

			// Limit position to boundaries. When the handles aren't set yet,
			// they return -1 as a percentage value.
			to = Math.min( Math.max( to, lower ), upper < 0 ? 100 : upper );

			// Stop handling this call if the handle can't move past another.
			// Return an array containing the hit limit, so the caller can
			// provide feedback. ( block callback ).
			if ( to === handle.data('pct') ) {
				return [!lower ? false : lower, upper === 100 ? false : upper];
			}

			placeHandle ( handle, to );
			return true;
		}

	// Handles movement by tapping
		function jump ( base, handle, to, callbacks ) {

			// Flag the slider as it is now in a transitional state.
			// Transition takes 300 ms, so re-enable the slider afterwards.
			base.addClass(clsList[5]);
			setTimeout(function(){
				base.removeClass(clsList[5]);
			}, 300);

			// Move the handle to the new position.
			setHandle( handle, to );

			// Trigger the 'slide' and 'set' callbacks,
			// pass the target so that it is 'this'.
			call( callbacks, base.data('target') );

			base.data('target').change();
		}


// Event handlers

	// Handle movement on document for handle and range drag.
		function move ( event, Dt, Op ) {

			// Map event movement to a slider percentage.
			var handles = Dt.handles, limits,
				proposal = event[ Dt.point ] - Dt.start[ Dt.point ];

			proposal = ( proposal * 100 ) / Dt.size;

			if ( handles.length === 1 ) {

				// Run handle placement, receive true for success or an
				// array with potential limits.
				limits = setHandle( handles[0], Dt.positions[0] + proposal );

				if ( limits !== true ) {

					if ( $.inArray ( handles[0].data('pct'), limits ) >= 0 ){
						block ( Dt.base, !Op['margin'] );
					}
					return;
				}

			} else {

				// Dragging the range could be implemented by forcing the
				// 'move' event on both handles, but this solution proved
				// lagging on slower devices, resulting in range errors. The
				// slightly ugly solution below is considerably faster, and
				// it can't move the handle out of sync. Bypass the standard
				// setting method, as other checks are needed.

				var l1, u1, l2, u2;

				// Round the proposal to the step setting.
				if ( Op['step'] ) {
					proposal = closest( proposal, Op['step'] );
				}

				// Determine the new position, store it twice. Once for
				// limiting, once for checking whether placement should occur.
				l1 = l2 = Dt.positions[0] + proposal;
				u1 = u2 = Dt.positions[1] + proposal;

				// Round the values within a sensible range.
				if ( l1 < 0 ) {
					u1 += -1 * l1;
					l1 = 0;
				} else if ( u1 > 100 ) {
					l1 -= ( u1 - 100 );
					u1 = 100;
				}

				// Don't perform placement if no handles are to be changed.
				// Check if the lowest value is set to zero.
				if ( l2 < 0 && !l1 && !handles[0].data('pct') ) {
					return;
				}
				// The highest value is limited to 100%.
				if ( u1 === 100 && u2 > 100 && handles[1].data('pct') === 100 ){
					return;
				}

				placeHandle ( handles[0], l1 );
				placeHandle ( handles[1], u1 );
			}

			// Trigger the 'slide' event, if the handle was moved.
			call( Op['slide'], Dt.target );
		}

	// Unbind move events on document, call callbacks.
		function end ( event, Dt, Op ) {

			// The handle is no longer active, so remove the class.
			if ( Dt.handles.length === 1 ) {
				Dt.handles[0].data('grab').removeClass(clsList[4]);
			}

			// Remove cursor styles and text-selection events bound to the body.
			if ( event.cursor ) {
				body.css('cursor', '').off( namespace );
			}

			// Unbind the move and end events, which are added on 'start'.
			doc.off( namespace );

			// Trigger the change event.
			Dt.target.removeClass( clsList[14] +' '+ clsList[20]).change();

			// Trigger the 'end' callback.
			call( Op['set'], Dt.target );
		}

	// Bind move events on document.
		function start ( event, Dt, Op ) {

			// Mark the handle as 'active' so it can be styled.
			if( Dt.handles.length === 1 ) {
				Dt.handles[0].data('grab').addClass(clsList[4]);
			}

			// A drag should never propagate up to the 'tap' event.
			event.stopPropagation();

			// Attach the move event.
			attach ( actions.move, doc, move, {
				 start: event
				,base: Dt.base
				,target: Dt.target
				,handles: Dt.handles
				,positions: [ Dt.handles[0].data('pct')
					   ,Dt.handles[ Dt.handles.length - 1 ].data('pct') ]
				,point: Op['orientation'] ? 'pointY' : 'pointX'
				,size: Op['orientation'] ? Dt.base.height() : Dt.base.width()
			});

			// Unbind all movement when the drag ends.
			attach ( actions.end, doc, end, {
				 target: Dt.target
				,handles: Dt.handles
			});

			// Text selection isn't an issue on touch devices,
			// so adding additional callbacks isn't required.
			if ( event.cursor ) {

				// Prevent the 'I' cursor and extend the range-drag cursor.
				body.css('cursor', $(event.target).css('cursor'));

				// Mark the target with a dragging state.
				if ( Dt.handles.length > 1 ) {
					Dt.target.addClass(clsList[20]);
				}

				// Prevent text selection when dragging the handles.
				body.on('selectstart' + namespace, function( ){
					return false;
				});
			}
		}

	// Move closest handle to tapped location.
		function tap ( event, Dt, Op ) {

			var base = Dt.base, handle, to, point, size;

			// The tap event shouldn't propagate up to trigger 'edge'.
			event.stopPropagation();

			// Determine the direction of the slider.
			if ( Op['orientation'] ) {
				point = event['pointY'];
				size = base.height();
			} else {
				point = event['pointX'];
				size = base.width();
			}

			// Find the closest handle and calculate the tapped point.
			handle = closestHandle( base.data('handles'), point, Op['style'] );
			to = (( point - base.offset()[ Op['style'] ] ) * 100 ) / size;

			// The set handle to the new position.
			jump( base, handle, to, [ Op['slide'], Op['set'] ]);
		}

	// Move handle to edges when target gets tapped.
		function edge ( event, Dt, Op ) {

			var handles = Dt.base.data('handles'), to, i;

			i = Op['orientation'] ? event['pointY'] : event['pointX'];
			i = i < Dt.base.offset()[Op['style']];

			to = i ? 0 : 100;
			i = i ? 0 : handles.length - 1;

			jump ( Dt.base, handles[i], to, [ Op['slide'], Op['set'] ]);
		}

// API

	// Validate and standardize input.
		function test ( input, sliders ){

	/*	Every input option is tested and parsed. This'll prevent
		endless validation in internal methods. These tests are
		structured with an item for every option available. An
		option can be marked as required by setting the 'r' flag.
		The testing function is provided with three arguments:
			- The provided value for the option;
			- A reference to the options object;
			- The name for the option;

		The testing function returns false when an error is detected,
		or true when everything is OK. It can also modify the option
		object, to make sure all values can be correctly looped elsewhere. */

			function values ( a ) {

				if ( a.length !== 2 ){
					return false;
				}

				// Convert the array to floats
				a = [ parseFloat(a[0]), parseFloat(a[1]) ];

				// Test if all values are numerical
				if( !isNumeric(a[0]) || !isNumeric(a[1]) ){
					return false;
				}

				// The lowest value must really be the lowest value.
				if( a[1] < a[0] ){
					return false;
				}

				return a;
			}

			var serialization = {
				 resolution: function(q,o){

					// Parse the syntactic sugar that is the serialization
					// resolution option to a usable integer.
					// Checking for a string '1', since the resolution needs
					// to be cast to a string to split in on the period.
					switch( q ){
						case 1:
						case 0.1:
						case 0.01:
						case 0.001:
						case 0.0001:
						case 0.00001:
							q = q.toString().split('.');
							o['decimals'] = q[0] === '1' ? 0 : q[1].length;
							break;
						case undefined:
							o['decimals'] = 2;
							break;
						default:
							return false;
					}

					return true;
				}
				,mark: function(q,o,w){

					if ( !q ) {
						o[w]['mark'] = '.';
						return true;
					}

					switch( q ){
						case '.':
						case ',':
							return true;
						default:
							return false;
					}
				}
				,to: function(q,o,w){

					// Checks whether a variable is a candidate to be a
					// valid serialization target.
					function ser(r){
						return isInstance ( r ) ||
							typeof r === 'string' ||
							typeof r === 'function' ||
							r === false ||
							( isInstance ( r[0] ) &&
							  typeof r[0][r[1]] === 'function' );
					}

					// Flatten the serialization array into a reliable
					// set of elements, which can be tested and looped.
					function filter ( value ) {

						var items = [[],[]];

						// If a single value is provided it can be pushed
						// immediately.
						if ( ser(value) ) {
							items[0].push(value);
						} else {

							// Otherwise, determine whether this is an
							// array of single elements or sets.
							$.each(value, function(i, val) {

								// Don't handle an overflow of elements.
								if( i > 1 ){
									return;
								}

								// Decide if this is a group or not
								if( ser(val) ){
									items[i].push(val);
								} else {
									items[i] = items[i].concat(val);
								}
							});
						}

						return items;
					}

					if ( !q ) {
						o[w]['to'] = [[],[]];
					} else {

						var i, j;

						// Flatten the serialization array
						q = filter ( q );

						// Reverse the API for RTL sliders.
						if ( o['direction'] && q[1].length ) {
							q.reverse();
						}

						// Test all elements in the flattened array.
						for ( i = 0; i < o['handles']; i++ ) {
							for ( j = 0; j < q[i].length; j++ ) {

								// Return false on invalid input
								if( !ser(q[i][j]) ){
									return false;
								}

								// Remove 'false' elements, since those
								// won't be handled anyway.
								if( !q[i][j] ){
									q[i].splice(j, 1);
								}
							}
						}

						// Write the new values back
						o[w]['to'] = q;
					}

					return true;
				}
			}, tests = {
				/*	Handles.
				 *	Has default, can be 1 or 2.
				 */
				 'handles': {
					 'r': true
					,'t': function(q){
						q = parseInt(q, 10);
						return ( q === 1 || q === 2 );
					}
				}
				/*	Range.
				 *	Must be an array of two numerical floats,
				 *	which can't be identical.
				 */
				,'range': {
					 'r': true
					,'t': function(q,o,w){

						o[w] = values(q);

						// The values can't be identical.
						return o[w] && o[w][0] !== o[w][1];
					}
				 }
				/*	Start.
				 *	Must be an array of two numerical floats when handles = 2;
				 *	Uses 'range' test.
				 *	When handles = 1, a single float is also allowed.
				 */
				,'start': {
					 'r': true
					,'t': function(q,o,w){
						if( o['handles'] === 1 ){
							if( $.isArray(q) ){
								q = q[0];
							}
							q = parseFloat(q);
							o.start = [q];
							return isNumeric(q);
						}

						o[w] = values(q);
						return !!o[w];
					}
				}
				/*	Connect.
				 *	Must be true or false when handles = 2;
				 *	Can use 'lower' and 'upper' when handles = 1.
				 */
				,'connect': {
					 'r': true
					,'t': function(q,o,w){

						if ( q === 'lower' ) {
							o[w] = 1;
						} else if ( q === 'upper' ) {
							o[w] = 2;
						} else if ( q === true ) {
							o[w] = 3;
						} else if ( q === false ) {
							o[w] = 0;
						} else {
							return false;
						}

						return true;
					}
				}
				/*	Connect.
				 *	Will default to horizontal, not required.
				 */
				,'orientation': {
					 't': function(q,o,w){
						switch (q){
							case 'horizontal':
								o[w] = 0;
								break;
							case 'vertical':
								o[w] = 1;
								break;
							default: return false;
						}
						return true;
					}
				}
				/*	Margin.
				 *	Must be a float, has a default value.
				 */
				,'margin': {
					 'r': true
					,'t': function(q,o,w){
						q = parseFloat(q);
						o[w] = fromPercentage(o['range'], q);
						return isNumeric(q);
					}
				}
				/*	Direction.
				 *	Required, can be 'ltr' or 'rtl'.
				 */
				,'direction': {
					 'r': true
					,'t': function(q,o,w){

						switch ( q ) {
							case 'ltr': o[w] = 0;
								break;
							case 'rtl': o[w] = 1;
								// Invert connection for RTL sliders;
								o['connect'] = [0,2,1,3][o['connect']];
								break;
							default:
								return false;
						}

						return true;
					}
				}
				/*	Behaviour.
				 *	Required, defines responses to tapping and
				 *	dragging elements.
				 */
				,'behaviour': {
					 'r': true
					,'t': function(q,o,w){

						o[w] = {
							 'tap': q !== (q = q.replace('tap', ''))
							,'extend': q !== (q = q.replace('extend', ''))
							,'drag': q !== (q = q.replace('drag', ''))
							,'fixed': q !== (q = q.replace('fixed', ''))
						};

						return !q.replace('none','').replace(/\-/g,'');
					}
				}
				/*	Serialization.
				 *	Required, but has default. Must be an array
				 *	when using two handles, can be a single value when using
				 *	one handle. 'mark' can be period (.) or comma (,).
				 */
				,'serialization': {
					 'r': true
					,'t': function(q,o,w){

						return serialization.to( q['to'], o, w ) &&
							   serialization.resolution( q['resolution'], o ) &&
							   serialization.mark( q['mark'], o, w );
					}
				}
				/*	Slide.
				 *	Not required. Must be a function.
				 */
				,'slide': {
					 't': function(q){
						return $.isFunction(q);
					}
				}
				/*	Set.
				 *	Not required. Must be a function.
				 *	Tested using the 'slide' test.
				 */
				,'set': {
					 't': function(q){
						return $.isFunction(q);
					}
				}
				/*	Block.
				 *	Not required. Must be a function.
				 *	Tested using the 'slide' test.
				 */
				,'block': {
					 't': function(q){
						return $.isFunction(q);
					}
				}
				/*	Step.
				 *	Not required.
				 */
				,'step': {
					 't': function(q,o,w){
						q = parseFloat(q);
						o[w] = fromPercentage ( o['range'], q );
						return isNumeric(q);
					}
				}
			};

			$.each( tests, function( name, test ){

				/*jslint devel: true */

				var value = input[name], isSet = value !== undefined;

				// If the value is required but not set, fail.
				if( ( test['r'] && !isSet ) ||
				// If the test returns false, fail.
					( isSet && !test['t']( value, input, name ) ) ){

					// For debugging purposes it might be very useful to know
					// what option caused the trouble. Since throwing an error
					// will prevent further script execution, log the error
					// first. Test for console, as it might not be available.
					if( console && console.log && console.group ){
						console.group( 'Invalid noUiSlider initialisation:' );
						console.log( 'Option:\t', name );
						console.log( 'Value:\t', value );
						console.log( 'Slider(s):\t', sliders );
						console.groupEnd();
					}

					throw new RangeError('noUiSlider');
				}
			});
		}

	// Parse options, add classes, attach events, create HTML.
		function create ( options ) {

			/*jshint validthis: true */

			// Store the original set of options on all targets,
			// so they can be re-used and re-tested later.
			// Make sure to break the relation with the options,
			// which will be changed by the 'test' function.
			this.data('options', $.extend(true, {}, options));

			// Set defaults where applicable;
			options = $.extend({
				 'handles': 2
				,'margin': 0
				,'connect': false
				,'direction': 'ltr'
				,'behaviour': 'tap'
				,'orientation': 'horizontal'
			}, options);

			// Make sure the test for serialization runs.
			options['serialization'] = options['serialization'] || {};

			// Run all options through a testing mechanism to ensure correct
			// input. The test function will throw errors, so there is
			// no need to capture the result of this call. It should be noted
			// that options might get modified to be handled properly. E.g.
			// wrapping integers in arrays.
			test( options, this );

			// Pre-define the styles.
			options['style'] = options['orientation'] ? 'top' : 'left';

			return this.each(function(){

				var target = $(this), i, dragable, handles = [], handle,
					base = $('<div/>').appendTo(target);

				// Throw an error if the slider was already initialized.
				if ( target.data('base') ) {
					throw new Error('Slider was already initialized.');
				}

				// Apply classes and data to the target.
				target.data('base', base).addClass([
					clsList[6]
				   ,clsList[16 + options['direction']]
				   ,clsList[10 + options['orientation']] ].join(' '));

				for (i = 0; i < options['handles']; i++ ) {

					handle = $('<div><div/></div>').appendTo(base);

					// Add all default and option-specific classes to the
					// origins and handles.
					handle.addClass( clsList[1] );

					handle.children().addClass([
						clsList[2]
					   ,clsList[2] + clsList[ 7 + options['direction'] +
						( options['direction'] ? -1 * i : i ) ]].join(' ') );

					// Make sure every handle has access to all variables.
					handle.data({
						 'base': base
						,'target': target
						,'options': options
						,'grab': handle.children()
						,'pct': -1
					}).attr('data-style', options['style']);

					// Every handle has a storage point, which takes care
					// of triggering the proper serialization callbacks.
					handle.data({
						'store': store(handle, i, options['serialization'])
					});

					// Store handles on the base
					handles.push(handle);
				}

				// Apply the required connection classes to the elements
				// that need them. Some classes are made up for several
				// segments listed in the class list, to allow easy
				// renaming and provide a minor compression benefit.
				switch ( options['connect'] ) {
					case 1:	target.addClass( clsList[9] );
							handles[0].addClass( clsList[12] );
							break;
					case 3: handles[1].addClass( clsList[12] );
							/* falls through */
					case 2: handles[0].addClass( clsList[9] );
							/* falls through */
					case 0: target.addClass(clsList[12]);
							break;
				}

				// Merge base classes with default,
				// and store relevant data on the base element.
				base.addClass( clsList[0] ).data({
					 'target': target
					,'options': options
					,'handles': handles
				});

				// Use the public value method to set the start values.
				target.val( options['start'] );

				// Attach the standard drag event to the handles.
				if ( !options['behaviour']['fixed'] ) {
					for ( i = 0; i < handles.length; i++ ) {

						// These events are only bound to the visual handle
						// element, not the 'real' origin element.
						attach ( actions.start, handles[i].children(), start, {
							 base: base
							,target: target
							,handles: [ handles[i] ]
						});
					}
				}

				// Attach the tap event to the slider base.
				if ( options['behaviour']['tap'] ) {
					attach ( actions.start, base, tap, {
						 base: base
						,target: target
					});
				}

				// Extend tapping behaviour to target
				if ( options['behaviour']['extend'] ) {

					target.addClass( clsList[19] );

					if ( options['behaviour']['tap'] ) {
						attach ( actions.start, target, edge, {
							 base: base
							,target: target
						});
					}
				}

				// Make the range dragable.
				if ( options['behaviour']['drag'] ){

					dragable = base.find('.'+clsList[9]).addClass(clsList[18]);

					// When the range is fixed, the entire range can
					// be dragged by the handles. The handle in the first
					// origin will propagate the start event upward,
					// but it needs to be bound manually on the other.
					if ( options['behaviour']['fixed'] ) {
						dragable = dragable
							.add( base.children().not(dragable).data('grab') );
					}

					attach ( actions.start, dragable, start, {
						 base: base
						,target: target
						,handles: handles
					});
				}
			});
		}

	// Return value for the slider, relative to 'range'.
		function getValue ( ) {

			/*jshint validthis: true */

			var base = $(this).data('base'), answer = [];

			// Loop the handles, and get the value from the input
			// for every handle on its' own.
			$.each( base.data('handles'), function(){
				answer.push( $(this).data('store').val() );
			});

			// If the slider has just one handle, return a single value.
			// Otherwise, return an array, which is in reverse order
			// if the slider is used RTL.
			if ( answer.length === 1 ) {
				return answer[0];
			}

			if ( base.data('options').direction ) {
				return answer.reverse();
			}

			return answer;
		}

	// Set value for the slider, relative to 'range'.
		function setValue ( args, set ) {

			/*jshint validthis: true */

			// If the value is to be set to a number, which is valid
			// when using a one-handle slider, wrap it in an array.
			if( !$.isArray(args) ){
				args = [args];
			}

			// Setting is handled properly for each slider in the data set.
			return this.each(function(){

				var b = $(this).data('base'), to, i,
					handles = Array.prototype.slice.call(b.data('handles'),0),
					settings = b.data('options');

				// If there are multiple handles to be set run the setting
				// mechanism twice for the first handle, to make sure it
				// can be bounced of the second one properly.
				if ( handles.length > 1) {
					handles[2] = handles[0];
				}

				// The RTL settings is implemented by reversing the front-end,
				// internal mechanisms are the same.
				if ( settings['direction'] ) {
					args.reverse();
				}

				for ( i = 0; i < handles.length; i++ ){

					// Calculate a new position for the handle.
					to = args[ i%2 ];

					// The set request might want to ignore this handle.
					// Test for 'undefined' too, as a two-handle slider
					// can still be set with an integer.
					if( to === null || to === undefined ) {
						continue;
					}

					// Add support for the comma (,) as a decimal symbol.
					// Replace it by a period so it is handled properly by
					// parseFloat. Omitting this would result in a removal
					// of decimals. This way, the developer can also
					// input a comma separated string.
					if( $.type(to) === 'string' ) {
						to = to.replace(',', '.');
					}

					// Calculate the new handle position
					to = toPercentage( settings['range'], parseFloat( to ) );

					// Invert the value if this is an right-to-left slider.
					if ( settings['direction'] ) {
						to = 100 - to;
					}

					// If the value of the input doesn't match the slider,
					// reset it. Sometimes the input is changed to a value the
					// slider has rejected. This can occur when using 'select'
					// or 'input[type="number"]' elements. In this case, set
					// the value back to the input.
					if ( setHandle( handles[i], to ) !== true ){
						handles[i].data('store').val( true );
					}

					// Optionally trigger the 'set' event.
					if( set === true ) {
						call( settings['set'], $(this) );
					}
				}
			});
		}

	// Unbind all attached events, remove classed and HTML.
		function destroy ( target ) {

			// Start the list of elements to be unbound with the target.
			var elements = [[target,'']];

			// Get the fields bound to both handles.
			$.each(target.data('base').data('handles'), function(){
				elements = elements.concat( $(this).data('store').elements );
			});

			// Remove all events added by noUiSlider.
			$.each(elements, function(){
				if( this.length > 1 ){
					this[0].off( namespace );
				}
			});

			// Remove all classes from the target.
			target.removeClass(clsList.join(' '));

			// Empty the target and remove all data.
			target.empty().removeData('base options');
		}

	// Merge options with current initialization, destroy slider
	// and reinitialize.
		function build ( options ) {

			/*jshint validthis: true */

			return this.each(function(){

				// When uninitialised, jQuery will return '',
				// Zepto returns undefined. Both are falsy.
				var values = $(this).val() || false,
					current = $(this).data('options'),
				// Extend the current setup with the new options.
					setup = $.extend( {}, current, options );

				// If there was a slider initialised, remove it first.
				if ( values !== false ) {
					destroy( $(this) );
				}

				// Make the destroy method publicly accessible.
				if( !options ) {
					return;
				}

				// Create a new slider
				$(this)['noUiSlider']( setup );

				// Set the slider values back. If the start options changed,
				// it gets precedence.
				if ( values !== false && setup.start === current.start ) {
					$(this).val( values );
				}
			});
		}

	// Overwrite the native jQuery value function
	// with a simple handler. noUiSlider will use the internal
	// value method, anything else will use the standard method.
		$.fn.val = function(){

			// If the function is called without arguments,
			// act as a 'getter'. Call the getValue function
			// in the same scope as this call.
			if ( this.hasClass( clsList[6] ) ){
				return arguments.length ?
					setValue.apply( this, arguments ) :
					getValue.apply( this );
			}

			// If this isn't noUiSlider, continue with jQuery's
			// original method.
			return $VAL.apply( this, arguments );
		};

		return ( rebuild ? build : create ).call( this, options );
	};

}( window['jQuery'] || window['Zepto'] ));
/**------------------------------------------------------------------------**\

	THE NAMESPACE!
	Here's where we dump our global abstractions. You can extend it
	by checking out the mixin function. By default, it comes with:
		$ar.type: unified type checking
		$ar.mixin: extend the namespace
		$ar.init: delay functionality until the dom is ready

\**------------------------------------------------------------------------**/
(function(){
	var self = {};

	// $ar.type:
	//		lets shrink some code. Calling without the type variable
	//		just returns the type, calling it with returns a boolean
	//		you can pass a comma seperated list of types to match against
	self.type = function(variable,type){
		var t = typeof variable,
			trap = false,
			more,ni;
		if(t == 'object'){
			more = Object.prototype.toString.call(variable);
			if(more == '[object Array]'){
				t = 'array';
			}else if(more == '[object Null]'){
				t = 'null';
			}else if(more == '[object Date]'){
				t = 'date';
			}else if(variable == window){
				t = 'node';
			}else if( variable && variable.nodeType){
				if(variable.nodeType == 1)
					t = 'node';
				else
					t = 'textnode';
			}
		}

		if(!type) return t;
		type = type.split(',');
		for(more = 0; more < type.length; more++)
			trap = trap || (type[more] == t);
		return t == type;
	};

	// $ar.clone:
	//		lets keep our data clean and seperated
	self.clone = function(obj){
		var type = $ar.type(obj),
			copy = {},
			ni;

		if(!/^(object||array||date)$/.test(type))
			return obj;
		if(type == 'date')
			return (new Date()).setTime(obj.getTime());
		if(type == 'array'){
			copy = obj.slice(0);
			for(ni = 0; ni < copy.length; ni++){
				copy[ni] = $ar.clone(copy[ni]);
			}
			return copy;
		}

		for(ni in obj) {
			if(obj.hasOwnProperty(ni))
				copy[ni] = $ar.clone(obj[ni]);
		}

		return copy;
	};

	// $ar.mixin:
	//		This is how we extend the namespace to handle new functionality
	//		it'll overwrite crap, so be carefull
	self.mixin = function(obj){
		if(!self.type(obj,'object'))
			throw new Error('$ar.mixin called with incorrect parameters');
		for(var ni in obj){
			if(/(mixin)/.test(ni))
				throw new Error('mixin isn\'t allowed for $ar.mixin');
			self[ni] = obj[ni];
		}
	};

	// $ar.init:
	//		Stores up function calls until the document.ready
	//		then blasts them all out
	self.init = (function(){
		var c = [], t, ni;
		t = setInterval(function(){
			if(!document.body || !window.ko || !window.$ar) return;
			clearInterval(t);
			t = null;
			for(ni = 0; ni < c.length; ni++)
				c[ni]();
		},800);
		return function(_f){
			if(!t)
				_f();
			else
				c.push(_f);
		};
	})();

	// $ar.expose
	//		Our distrobution mechanism smashes everything into an iife.
	//		This is a good idea in general, but doesn't play nicely with
	//		referencing models/etc from knockout. Chances are you don't
	//		need it.
	self.expose = function(variable,as){
		window[as] = variable;
	};

	self.expose(self,'$ar');
})();

/* {"requires":["ar.js"]} */
$ar.mixin({
	// $ar.extend:
	//		throw a bunch of objects in and it smashes
	//		them together from right to left
	//		returns a new object
	extend : function(){
		if(!arguments.length)
			throw new Error('$ar.extend called with too few parameters');

		var out = {},
			ni,no;

		for(ni = 0; ni < arguments.length; ni++){
			if(!$ar.type(arguments[ni],'object'))
				continue;
			for(no in arguments[ni])
				out[no] = arguments[ni][no];
		}

		return out;
	},

	// $ar.cache
	//		interface for dealing with frontend variable caching
	cache : {
		read: function(key,inLocalStorage){
			if(!inLocalStorage){
				return ((new RegExp("(?:^" + key + "|;\\s*"+ key + ")=(.*?)(?:;|$)", "g")).exec(document.cookie)||[null,null])[1];
			}
			throw new Error('nobody has written me yet');
		},
		write: function(key, value, expires, inLocalStorage){
			if(!inLocalStorage){
				document.cookie = key + "=" + escape(value) + ";path=/;domain=" + window.location.host + "; secure";
				return;
			}
			throw new Error('nobody has written me yet');
		},
		remove: function(key, inLocalStorage){
			if(!inLocalStorage){
				if(!$ar.cache.read(key)) return;
				$ar.cache.write(key, "");
				return;
			}
			throw new Error('nobody has written me yet');
		}
	},

	// $ar.data_mapper:
	//		Throw some crap and shift it around
	data_mapper : function(map,data){
		if(!map || !data) return;
		for(var ni in map){
			if(!(ni in data)) continue;
			data[map[ni]] = data[ni];
			delete data[ni];
		}

		return data;
	},

	// $ar.load:
	//		Load some content dynamically
	load : function(path,callback){
		var d = document,
			html = /\.(htm|html|php)$/.test(path),
			js = /\.js$/.test(path),
			elem;

		if(html) throw new Error('I still need to be written');
		if(!/\.(js|css)$/.test(path)) return;
		elem = d.createElement(js?'script':'link');
		elem[js?'src':'href'] = path;
		if(!js) elem.rel = 'stylesheet';

		if(typeof callback == 'function')
		elem.onload = callback;

		d.body.appendChild(elem);
	},
	
	konami: function (callback,_customPattern,_container) {
		var konami = {
			addEvent: function (obj, type, fn, ref_obj) {
				if (obj.addEventListener)
					obj.addEventListener(type, fn, false);
				else if (obj.attachEvent) {
					// IE
					obj["e" + type + fn] = fn;
					obj[type + fn] = function () {
						obj["e" + type + fn](window.event, ref_obj);
					}
					obj.attachEvent("on" + type, obj[type + fn]);
				}
			},
			container: document,
			input: "",
			pattern: "38384040373937396665",
			load: function (link) {
				this.addEvent(konami.container, "keydown", function (e, ref_obj) {
					if (ref_obj) konami = ref_obj; // IE
					konami.input += e ? e.keyCode : event.keyCode;
					if (konami.input.length > konami.pattern.length)
						konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
					if (konami.input == konami.pattern) {
						konami.code(link);
						konami.input = "";
						e.preventDefault();
						return false;
					}
				}, this);
				this.iphone.load(link);
			},
			code: function (link) {
				window.location = link
			},
			iphone: {
				start_x: 0,
				start_y: 0,
				stop_x: 0,
				stop_y: 0,
				tap: false,
				capture: false,
				orig_keys: "",
				keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
				code: function (link) {
					konami.code(link);
				},
				load: function (link) {
					if( _customPattern ){
						this.keys = _customPattern;
					}
					this.orig_keys = this.keys;
					konami.addEvent(konami.container, "touchmove", function (e) {
						if (e.touches.length == 1 && konami.iphone.capture == true) {
							var touch = e.touches[0];
							konami.iphone.stop_x = touch.pageX;
							konami.iphone.stop_y = touch.pageY;
							konami.iphone.tap = false;
							konami.iphone.capture = false;
							konami.iphone.check_direction();
						}
					});
					konami.addEvent(konami.container, "touchend", function (evt) {
						if (konami.iphone.tap == true) konami.iphone.check_direction(link);
					}, false);
					konami.addEvent(konami.container, "touchstart", function (evt) {
						konami.iphone.start_x = evt.changedTouches[0].pageX;
						konami.iphone.start_y = evt.changedTouches[0].pageY;
						konami.iphone.tap = true;
						konami.iphone.capture = true;
					});
				},
				check_direction: function (link) {
					x_magnitude = Math.abs(this.start_x - this.stop_x);
					y_magnitude = Math.abs(this.start_y - this.stop_y);
					x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
					y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
					result = (x_magnitude > y_magnitude) ? x : y;
					result = (this.tap == true) ? "TAP" : result;
	
					if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
					if (this.keys.length == 0) {
						this.keys = this.orig_keys;
						this.code(link);
					}
				}
			}
		}
		if(typeof _container != 'undefined' ){
			konami.container = _container;
		}
		if(typeof _customPattern != 'undefined' ){
			konami.pattern = _customPattern;
		}
		typeof callback === "string" && konami.load(callback);
		if (typeof callback === "function") {
			konami.code = callback;
			konami.load();
		}
	
		return konami;
	}
});


$ar.mixin({
	model : (function(){
		// stuff to exclude from the serialization
		// and a polyfill for knockout until that bit is sorted out
		var blacklist = /^(_.*|def|pre|post|serialize|extend|map|type|watch|validate|errors)$/;

		// lets only add clean data to our models
		function _cleanNumbers(obj){
			var type = $ar.type(obj),
				ni;

			if(/^(b.*|nu.*|f.*)$/.test(type))
				return obj;

			if(type == 'string'){
				if(!obj || obj == 'null')
					obj = null;
				else if(!isNaN(parseFloat(obj)) && isFinite(obj))
					return parseFloat(obj);

				return obj;
			}

			if(type == 'array'){
				for(ni = 0; ni < obj.length; ni++)
					obj[ni] = _cleanNumbers(obj[ni]);
			}

			if(type == 'object'){
				for(ni in obj)
					obj[ni] = _cleanNumbers(obj[ni]);
			}

			return obj;
		}

		// something needed to normalize knockout stuff
		function _cleanRead(model,key){
			if(model.def[key].observable)
				return model[key]();
			return model[key];
		}
		// something needed to normalize knockout stuff
		function _cleanWrite(model,key,val){
			if(model.def[key].observable)
				model[key](val);
			else
				model[key] = val;
		}
		function _cleanDate(date){
			return date.getUTCFullYear() + '-' + (date.getUTCMonth()+1) + '-' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ":" + date.getUTCSeconds();
		}

		// does the heavy lifting for importing an object into a model
		function _sin(model,data,pre){
			var ni, na, no, a;

			if(!data){
				// reset to default values
				for(ni in model.def){
					if(model.def._blacklist.test(ni))
						continue;
					_cleanWrite(model,ni,model.def[ni]['default']);
				}
				return model;
			}
			if(!pre) pre = [];

			for(ni = 0; ni < pre.length; ni++){
				if(pre[ni].after){
					continue;
				}
				pre[ni].fun(data);
			}

			for(ni in model.def){
				if(model.def._blacklist.test(ni))
					continue;

				na = ni;
				for(no = 0; no < model.def[ni].external.length; no++){
					if(!data.hasOwnProperty(model.def[ni].external[no]))
						continue;
					na = model.def[ni].external[no];
					break;
				}

				//catch when ni=na and !data[na]
				if(!data.hasOwnProperty(na))
					continue;

				a = null;
				if(!model.def[ni].type){
					_cleanWrite(model,ni,_cleanNumbers(data[na]));
					continue;
				}
				if(!$ar.type(model.def[ni]['default'], 'array')){
					if(model.def[ni].type == Date){
						if($ar.type(data[na],'date'))
							_cleanWrite(model,ni, new model.def[ni].type(new Date(data[na].valueOf())));
						else if($ar.type(data[na],'string') && !isNaN(Date.parse(data[na].replace('-','/'))))
							_cleanWrite(model,ni, new model.def[ni].type(new Date(data[na].replace('-','/'))));
						continue;
					}
					_cleanWrite(model,ni, new model.def[ni].type(data[na]));
					continue;
				}

				a = [];
				data[na] = data[na]||[];
				for(no = 0; no < data[na].length; no++){
					if(model.def[ni].type == Date){
						if($ar.type(data[na][no],'date'))
							_cleanWrite(model,ni, new model.def[ni].type(new Date(data[na][no].valueOf())));
						else if($ar.type(data[na][no],'string') && !isNaN(Date.parse(data[na][no].replace('-','/'))))
							_cleanWrite(model,ni, new model.def[ni].type(new Date(data[na][no].replace('-','/'))));
						continue;
					}
					a.push(new model.def[ni].type(data[na][no]));
				}

				_cleanWrite(model,ni,a);
			}
			for(ni = 0; ni < pre.length; ni++){
				if(!pre[ni].after){
					continue;
				}
				pre[ni].fun(data);
			}

			return model;
		}

		// does the same as _sin, but for exporting
		function _sout(model, post){
			var obj = {},
				uwrap = ko.utils.unwrapObservable,
				post = post||[],
				black = model.def._blacklist,
				tmp, ni, na, no, a;

			for(ni = 0; ni < post.length; ni++){
				if(!post[ni].fire_before){
					continue;
				}
				post[ni].fun();
			}

			for(ni in model.def){
				if(black.test(ni))
					continue;

				tmp = uwrap(model[ni]);

				na = model.def[ni].external[0]||ni;

				//gotta look for models WITHIN models
				if(!tmp){
					obj[na] = tmp;
				} else if(tmp.hasOwnProperty('serialize')){
					obj[na] = tmp.serialize();
				} else if($ar.type(tmp,'array')){
					obj[na] = [];
					for(no = 0; no < tmp.length; no++){
						a = uwrap(tmp[no]);
						if($ar.type(a,'function')) continue;
						if($ar.type(a,'date'))
							a = _cleanDate(a);
						if($ar.type(a,'object') && a.hasOwnProperty('serialize'))
							a = a.serialize();
						obj[na].push(a);
					}
				} else if($ar.type(tmp,'date')){
					obj[na] = _cleanDate(tmp);
				} else if($ar.type(tmp,'object')){
					obj[na] = {};
					for(no in tmp){
						a = uwrap(tmp[no]);
						if($ar.type(a,'function')) continue;
						if($ar.type(a,'date'))
							a = _cleanDate(a);
						if($ar.type(a,'object') && a.hasOwnProperty('serialize'))
							a = a.serialize();
						obj[na][no] = a;
					}
				} else {
					if($ar.type(tmp,'function')) continue;
					obj[na] = tmp;
				}
			}

			for(ni = 0; ni < post.length; ni++){
				if(post[ni].fire_before){
					continue;
				}
				post[ni].fun(obj);
			}

			return obj;
		}

		// mmmmmm factory
		return function(def){
			var self = {
				errors: [],
				def: {
					_pre: [],
					_post: [],
					_blacklist: blacklist,
					errors: {
						'default': [],
						observable: false,
						type: null,
						external: [],
						validation: []
					}
				}
			};

			// all these functions chain!!!! GO NUTS!
			self.serialize = function(data){
				// no arguments, you export data from the model
				// with an object, you import
				if(arguments.length === 0)
					return _sout(self,self.def._post);
				return _sin(self,data,self.def._pre);
			};
			self.extend = function(_def){
				// use models to make bigger models!
				var black = self.def._blacklist,
					ni, clone;
				for(ni in _def){
					if(black.test(ni))
						continue;
					if(ni in self.def)
						continue;

					self.def[ni] = {
						'default':$ar.clone(_def[ni]),
						observable: false,
						type: null,
						external: [],
						validation: []
					};

					self[ni] = _def[ni];
				}

				return self;
			};
			self.attach = function(_obj){
				for(var ni in _obj){
					if(blacklist.test(ni) || ni in self.def){
						continue;
					}
					self[ni] = _obj[ni];
				}
				return self;
			};
			self.map = function(_maps){
				// internal name on the left side, external on the right
				// for keeping your clean data model in sync with your ugly api
				for(var ni in _maps){
					if(!self.def.hasOwnProperty(ni)) continue;
					if(!$ar.type(_maps[ni],'array'))
						_maps[ni] = [_maps[ni]];
					self.def[ni].external = _maps[ni];
				}
				return self;
			};
			self.type = function(_types){
				// to have hierarchical chains of models, we need to be able
				// to specify a model type for those properties
				for(var ni in _types){
					if(!self.def.hasOwnProperty(ni)) continue;
					self.def[ni].type = _types[ni];
				}
				return self;
			};
			self.pre = function(filter,fire_after){
				if(!$ar.type(filter,'function')){
					return self;
				}
				// here we add filters that edit the json data before it enters
				self.def._pre.push({
					fun: filter,
					after: !!fire_after
				});
				return self;
			};
			self.post = function(filter,fire_before){
				if(!$ar.type(filter,'function')){
					return self;
				}
				// here we add filters that edit the json data before it leaves
				self.def._post.push({
					fun: filter,
					before: !!fire_before
				});
				return self;
			};
			self.watch = function(_map){
				var ni,isArray;
				//make all the things observable!
				if(!arguments.length){
					_map = { errors: true };
					for(ni in self.def)
						_map[ni] = true;
				}
				// this bad boy controls which properties are observable
				for(ni in _map){
					if(!self.def.hasOwnProperty(ni)) continue;
					if(_map[ni] == self.def[ni].observable) continue;
					self.def[ni].observable = _map[ni];
					isArray = $ar.type(self.def[ni]['default'],'array');
					if(_map[ni]){
						var pi;
						if($ar.type(_map[ni],'object')){
							self[ni] = ko['observable'+(isArray?'Array':'')](self[ni]).extend(_map[ni]);
						}else{
							self[ni] = ko['observable'+(isArray?'Array':'')](self[ni]);
						}
					}
					else
						self[ni] = ko.unwrapObservable(self[ni]);
				}
				return self;
			};
			self.validate = function(_map){
				var ni,no,v,e;

				if(!arguments.length){
					var errs = [];

					for(ni in self.def){
						if(blacklist.test(ni)) continue;
						v = self.def[ni].validation||[];
						for(no = 0; no < v.length; no++){
							e = v[no](_cleanRead(self,ni));
							if(!$ar.type(e,'array')) continue;
							errs = errs.concat(e);
						}
					}
					_cleanWrite(self,'errors',errs);

					if(!errs.length)
						return true;
					return false;
				}

				for(ni in _map){
					if(!self.def.hasOwnProperty(ni)) continue;
					self.def[ni].validation.push(_map[ni]);
				}

				return self;
			};

			//initialization
			return self.extend(def);
		};
	})()
});

$ar.mixin({
	api : (function(config){
		if($ar.type(navigator.cookieEnabled,'undefined')){
			//need to write the cookie tester
			//throw some crap
		} else if(!navigator.cookieEnabled){
			//throw some crap
		}

		var self = {
				config: $ar.extend({
					crossDomain: false,
					url: 'https://devmanage.activityrez.com/api',
					cache_key: 'ACTIVITYREZ3',
					useLocalStorage: false,
					token: ''
				},config)
			};
		self.config.token = $ar.cache.read(self.config.cache_key,self.config.useLocalStorage);
		function postString(obj, prefix){
			var str = [], p, k, v, no;
			if($ar.type(obj,'array')){
				if(!prefix)
					throw new Error('Sorry buddy, your object is wrong');
				for(p = 0; p < obj.length; p++){
					k = prefix + "[" + p + "]";
					v = obj[p];
					no = typeof v == "object"?postString(v,k):encodeURIComponent(k) + "=" + encodeURIComponent(v);
					if(no.length)
						str.push(no);
				}
				return str.join("&");
			}
			for(p in obj) {
				if(prefix)
					k = prefix + "[" + p + "]";
				else
					k = p;
				v = obj[p];
				no = typeof v == "object"?postString(v,k):encodeURIComponent(k) + "=" + encodeURIComponent(v);
				if(no.length)
					str.push(no);
			}
			return str.join("&");
		}

		self.raw = (function(){
			function xhr(options){
				var origin, parts, crossDomain, _ret;
				function createStandardXHR(){ try { return new window.XMLHttpRequest(); } catch(e){} }
				function createActiveXHR(){ try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } catch(e){} }
				function createJSONP(){
					function randomer(){
						var s=[],itoh = '0123456789ABCDEF',i;

						for(i = 0; i < 16; i++){
							s[i] = i==12?4:Math.floor(Math.random()*0x10);
							if(i==16) s[i] = (s[i]&0x3)|0x8;
							s[i] = itoh[s[i]];
						}
						return s.join('');
					}

					var ret = {
						_options: {
							key: '',
							url: '',
							script: null,
							mime: 'json'
						},
						readyState: 0,
						onreadystatechange: null,
						response: null,
						responseText: null,
						responseXML: null,
						responseType: '',

						status: null,
						statusText: '',
						timeout: 0,

						upload: null
					};

					ret.abort = function(){
						if(ret.readyState != 3) return;
						ret._options.script.parentNode.removeChild(ret._options.script);
						$ar.api[ret._options.key] = function(){
							delete $ar.api[ret._options.key];
						};

						ret.readyState = 1;
						if(typeof ret.onreadystatechange == 'function')
							ret.onreadystatechange();
					};
					ret.getAllResponseHeaders = function(){};
					ret.getResponseHeader = function(header){};
					ret.open = function(method,url,async,user,pass){
						//method is always get, async is always true, and user/pass do nothing
						//they're still there to provide a consistant interface
						ret._options.url = url;
						ret._options.script = document.createElement('script');
						ret._options.script.type = 'text/javascript';
						ret.readyState = 1;
						if(typeof ret.onreadystatechange == 'function')
							ret.onreadystatechange();

						document.head.appendChild(ret._options.script);
					};
					//this does nothing
					ret.overrideMimeType = function(mime){};
					ret.send = function(data){
						ret._options.key = 'jsonp_'+randomer();

						var _data = postString(data),
							url = ret._options.url;
						url += (url.indexOf('?') == -1?'?':'&');
						url += 'callback=$ar.api.'+ret._options.key;

						if(_data.length)
							url += '&'+_data;

						$ar.api[ret._options.key] = function(data){
							ret.responseText = data;
							ret.response = data;
							ret.readyState = 4;
							ret.status = 200;
							if(typeof ret.onreadystatechange == 'function')
									ret.onreadystatechange();
							ret._options.script.parentNode.removeChild(ret._options.script);

							delete $ar.api[ret._options.key];
						};
						ret.readyState = 3;
						if(typeof ret.onreadystatechange == 'function')
							ret.onreadystatechange();
						ret._options.script.src = url;
					};

					//this does nothing
					ret.setRequestHeader = function(header, value){};

					return ret;
				}

				try {
					origin = location.href;
				} catch(e){
					origin = document.createElement( "a" );
					origin.href = "";
					origin = origin.href;
				}

				origin = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/.exec(origin.toLowerCase());
				options.url = (( options.url ) + "").replace(/#.*$/, "").replace(/^\/\//, origin[1] + "//");
				parts  = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/.exec(options.url.toLowerCase());
				origin[3] = origin[3]||(origin[1]=='http:'?'80':'443');
				parts[3] = parts[3]||(parts[1]=='http:'?'80':'443');

				crossDomain = !!(parts &&
					( parts[1] !== origin[1] ||
						parts[2] !== origin[2] ||
						parts[3] != origin[3]
					)
				);

				_ret = window.ActiveXObject ?
					function() {
						return !/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(origin[1]) && createStandardXHR() || createActiveXHR();
					} : createStandardXHR;
				_ret = _ret();

				if(!_ret || (crossDomain && typeof _ret.withCredentials === 'undefined')){
					_ret = createJSONP();
				}

				return _ret;
			}

			function ajax(params){
				params = $ar.extend({
					url: '',
					method: 'GET',
					type: 'json',
					async: 'true',
					jsonp: 'callback',	//currently unused
					timeout: 0,
					data: null,

					succes: null,
					error: null
				},params);

				var _xhr = xhr(params);
				if(params.method == 'GET')
					params.url += '?' + postString(params.data);
				_xhr.open(params.method,params.url,params.async);
				_xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				_xhr.responseType = params.type;
				_xhr.onreadystatechange = function(){
					if(_xhr.readyState != 4) return;
					if(_xhr.status != 200 && typeof params.error == 'function')
						params.error(_xhr.response);
					if(_xhr.status == 200 && typeof params.success == 'function')
						params.success(_xhr.response);
				};
				_xhr.send(params.method=='POST'?postString(params.data):null);
			}

			return function(url,data,callback,method){
				ajax({
					method: method||'GET',
					url: url,
					data: data,
					success: function(result){
						if(typeof callback == 'function')
							callback(result);
					}
				});
			};
		})();
		self.download = function(url,data,callback){
			window.open(url +'?'+postString(data),'_blank');
			if(typeof callback == 'function')
				callback();
		};
		self.request = function(url,params,callback,method){
			self.raw(self.config.url+url, $ar.extend(params||{},{
				token: self.config.token||'NEW'
			}), function(result){
				if(result){
					try {
						if($ar.type(result,'string'))
							result = JSON.parse(result);
					} catch(e){
						return;
					}
					if(result.token && result.token != self.config.token){
						$ar.cache.write(self.config.cache_key,result.token);
						self.config.token = result.token;
					}
				}

				if(typeof callback == 'function')
					callback(result);
			},method||'GET');
		};
		// if you're going to be using pre and post filters on the data
		// make sure you return true to continue the chain, or return
		// false to cancel it
		self.route = function(name,url,pre,post,method){
			name = name.trim();
			pre = pre||function(data){ return true; };
			post = post||function(data){ return true; };

			if(/^(route|raw|request|config)$/.test(name))
				throw new Error('invalid name sent to $ar.api.route');

			self[name] = function(params,callback){
				if(!pre(params)) return;
				self.request(url,params,function(data){
					if(post(data) && typeof callback == 'function')
						callback(data);
				},method||'GET');
			};
		};

		return self;
	})()
});

// $ar.date
//		A collection of common use date functions
$ar.mixin({
	date: (function(){
		var ret = {};
		
		//format args can be found at http://momentjs.com/docs/
		ret.utcEpoch = function(epoch,format){
			return moment((epoch * 1000)).format(format);
		};
		
		ret.format = function(format,t){
			if(!t){
				t = new Date();
			}
			return moment(t).format(format);
		};
		
		ret.UTCformat = function(format,t){
			if(!t){
				t = new Date();
			}
			return moment.utc(t).format(format);
		};
		
		//returns the utc hour offset
		ret.getUTCHourOffset = function(){
			// get time zone offset
			var d = new Date(),
				offsetHours = d.getTimezoneOffset() / 60;
			if( offsetHours > 0 ) {
				offsetHours = '-' + offsetHours;
			} else if( offsetHours < 0 ) {
				offsetHours = Math.abs( offsetHours);
			}
			return offsetHours;
		}


		return ret;
	})()
});

$ar.mixin({
	di: (function(){
		var ret = {},
			hash = {};

		ret.register = function(lookup,constructor){
			hash[lookup] = { c: constructor, v: null };
		};

		ret.get = function(lookup){
			if(!hash.hasOwnProperty(lookup))
				throw new Error('$ar.di: nothing hooked up to ' + lookup);
			if(!hash[lookup].v)
				hash[lookup].v = new hash[lookup].c();
			return hash[lookup].v;
		};

		return ret;
	})()
});

$ar.mixin({
	dom : (function(){
		//querySelectorAll Polyfill
		document.querySelectorAll = document.querySelectorAll||function(selector){
			var doc = document,
			head = doc.documentElement.firstChild,
			styleTag = doc.createElement('style');
			head.appendChild(styleTag);
			doc._qsa = [];

			styleTag.styleSheet.cssText = selector + "{x:expression(document._qsa.push(this))}";
			window.scrollBy(0, 0);

			return doc._qsa;
		};
		//matchesSelector Polyfill
		Element.prototype.matchesSelector = Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || function(selector){
			var els = document.querySelectorAll(selector),
				ni,len;
			for(ni=0, len=els.length; ni<len; ni++ ){
				if(els[ni] == this)
					return true;
			}
			return false;
		};

		var cleanSelector = function(selector,_context){
			if(!selector.length)
				return [];
			var sels = selector.split(','),
				context = _context||document,
				res = [],
				ni,idpos,ctx;
			for(ni = 0; ni < sels.length; ni++){
				idpos = sels[ni].lastIndexOf('#');
				ctx = context;
				if(idpos > 0){
					ctx = document.getElementById(sels[ni].substr(idpos).match(/^#[^\s]*/)[0]);
					sels[ni] = sels[ni].substr(idpos).replace(/^#[^\s]*[\s]*/,'');
				}
				if(!sels[ni].length) continue;
				var f = ctx.querySelectorAll(sels[ni]);
				var list = Array.prototype.slice.call(_ietoArray(f),0);
				
				res = res.concat(list);
			}

			return res;
		};
		
		//gay IE 8 workaround
		var _ietoArray = function(obj) {
			var array = [];
			// iterate backwards ensuring that length is an UInt32
			for (var i = obj.length >>> 0; i--;) { 
				array[i] = obj[i];
			}
			return array;
		}

		var cssCap = function(a,x){ return x.toUpperCase(); };

		var events = {},
			fn = {
				css: function(dom,obj){
					if($ar.type(obj,'string'))
						return dom[0].style[obj.replace(/-(\w)/g,cssCap)];

					var ni,no;
					for(ni = 0; ni < dom._len; ni++){
						for(no in obj)
							dom[ni].style[no.replace(/-(\w)/g,cssCap)] = obj[no];
					}
					return dom;
				},
				addClass: function(dom,selector){
					var sels = selector.split(','),
						len = dom._len,
						ni,no;

					dom.removeClass(selector);

					for(ni = 0; ni < len; ni++){
						for(no = 0; no < sels.length; no++)
							dom[ni].className += ' ' + sels[no].replace(/(^\s*|\s*$)/g,'');
					}

					return dom;
				},
				removeClass: function(dom,selector){
					var sels = selector.split(','),
						len = dom._len,
						ni,no,cname;
					for(ni = 0; ni < len; ni++){
						cname = ' ' + dom[ni].className.replace(/\s+/g,' ');
						for(no = 0; no < sels.length; no++)
							cname = cname.replace(new RegExp('\\s' + sels[no].replace(/(^\s*|\s*$)/g,''),'g'),'');
						dom[ni].className = cname.slice(1);
					}

					return dom;
				},
				matches: function(dom,selector){
					var ni,no;
					if(!$ar.type(selector,'string'))
						selector = $ar.dom(selector);

					for(ni = 0; ni < dom._len; ni++){
						if(dom[ni] == window){
							if(($ar.type(selector,'string') && selector == 'window') || selector[0] == window)
								return true;
						} else if(selector.hasOwnProperty('_len')){
							for(no = 0; no < selector._len;no++){
								if(dom[ni] != selector[no])
									continue;
								return true;
							}
						} else if(!!dom[ni].matchesSelector(selector)){
							return true;
						}
					}
					return false;
				},
				next: function(dom,selector){
					if(!dom[0]){
						return DomObj();
					}
					var curr = dom[0].nextSibling;
					while(curr){
						if(!$ar.type(curr,'node') || (selector && !DomObj(curr).matches(selector))){
							curr = curr.nextSibling;
							continue;
						}

						return DomObj(curr);
					}

					return DomObj();
				},
				nextAll: function(dom,selector){
					var out = DomObj(),
						curr = dom.next(selector);
					while(curr._len){
						out[out._len] = curr[0];
						out._len ++;
						curr = curr.next(selector);
					}
					return out;
				},
				prev: function(dom,selector){
					if(!dom[0]){
						return DomObj();
					}
					var curr = dom[0].previousSibling;
					while(curr){
						if(!$ar.type(curr,'node') || (selector && !DomObj(curr).matches(selector))){
							curr = curr.previousSibling;
							continue;
						}

						return DomObj(curr);
					}

					return DomObj();
				},
				prevAll: function(dom,selector){
					var out = DomObj(),
						curr = dom.prev(selector);
					while(curr._len){
						out[out._len] = curr[0];
						out._len++;
						curr = curr.prev(selector);
					}
					return out;
				},
				find: function(dom,selector){
					return DomObj(selector,dom);
				},
				__closest: function(dom,selector){
					var elems = [],
						cap = document.documentElement,
						ni,no,len,curr,depth,found;

					if(typeof selector != 'string' && !selector.hasOwnProperty('_len'))
						throw new Error('invalid selector passed to $ar.dom.closest');

					for(ni = 0; ni < dom._len; ni++){
						curr = dom[ni];
						depth = 0;
						while(curr != cap){
							if(typeof selector != 'string'){
								found = false;
								for(no = 0; no < selector._len; no++){
									if(selector[no] != window && curr != selector[no])
										continue;
									found = true;
									break;
								}
								if(found) break;
							} else if(curr.matchesSelector(selector)) break;
							if(!curr.parentNode){
								curr = cap;
								break;
							}
							depth++;
							curr = curr.parentNode;
						}
						if(curr == cap) continue;
						elems.push({ elem: curr, depth: depth });
					}
					len = elems.length;
					for(ni = 0; ni < len; ni++){
						for(no = ni+1; no < len;no++){
							if(elems[ni].elem!=elems[no].elem) continue;
							elems.splice(no--,1);
							len--;
						}
					}
					return elems;
				},
				closest: function(dom,selector){
					var elems = fn.__closest(dom,selector),
						len, ni;

					curr = DomObj(null,dom);

					if(!elems.length)
						return curr;

					len = curr._len = elems.length;
					for(ni = 0; ni < len; ni++)
						curr[ni] = elems[ni].elem;
					return curr;
				},
				remove: function(dom){
					var ni,len;
					for(ni = 0, len = this._len; ni < len; ni++){
						if(!dom[ni].parentNode) continue;
						dom[ni].parentNode.removeChild(dom[ni]);
					}
					return dom;
				},
				before: function(dom,elem){
					var ni, no;
					if(!elem.hasOwnProperty('_len'))
						elem = $ar.dom(elem);
					for(ni = 0; ni < dom._len; ni++){
						if(!dom[ni].parentNode) continue;
						for(no = 0; no < elem._len; no++){
							dom[ni].parentNode.insertBefore(elem[no],dom[ni]);
						}
					}
					return dom;
				},
				after: function(dom,elem){
					var ni, no;
					if(!elem.hasOwnProperty('_len'))
						elem = $ar.dom(elem);
					for(ni = 0; ni < dom._len; ni++){
						if(!dom[ni].parentNode) continue;
						for(no = 0; no < elem._len;no++)
							dom[ni].parentNode.insertBefore(elem[no],dom[ni].nextSibling);
					}
				},
				clone: function(dom){
					var newDom = DomObj(),
						ni,no,temp,attr;
					newDom._selector = dom._selector;
					newDom._len = dom._len;
					for(ni = 0; ni < dom._len; ni++){
						temp = document.createElement(dom[ni].nodeName);
						attr = dom[ni].attributes;
						for(no = 0; no < attr.length; no++){
							temp.setAttribute(attr[no].name,attr[no].value);
						}
						temp.innerHTML = dom[ni].innerHTML;
						newDom[ni] = temp;
					}

					return newDom;
				},
				measure: function(dom){
					var box;
					if(dom[0].getBoundingClientRect){
						box = dom[0].getBoundingClientRect();
					}else{
						return { top: 0, left: 0, width: 0, height: 0 };
					}
					if(!box)
						return { top: 0, left: 0, width: 0, height: 0 };
						
					var _doc = document.defaultView || document.parentWindow;
					
					if(!_doc.getComputedStyle){
					    _doc.getComputedStyle = function(el, pseudo) {
					        this.el = el;
					        this.getPropertyValue = function(prop) {
					            var re = /(\-([a-z]){1})/g;
					            if (prop == 'float') prop = 'styleFloat';
					            if (re.test(prop)) {
					                prop = prop.replace(re, function () {
					                    return arguments[2].toUpperCase();
					                });
					            }
					            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
					        }
					        return this;
					    }
				    }

				
					var body = dom[0].ownerDocument.body,
						clientTop  = document.documentElement.clientTop  || body.clientTop  || 0,
						clientLeft = document.documentElement.clientLeft || body.clientLeft || 0,
						scrollTop  = window.pageYOffset || document.documentElement.scrollTop  || body.scrollTop,
						scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || body.scrollLeft,
						top  = box.top  + scrollTop  - clientTop,
						left = box.left + scrollLeft - clientLeft,
						styles = _doc.getComputedStyle(dom[0]),

						p_top = parseFloat(styles.getPropertyValue('padding-top')),
						p_bottom = parseFloat(styles.getPropertyValue('padding-bottom')),
						p_left = parseFloat(styles.getPropertyValue('padding-left')),
						p_right = parseFloat(styles.getPropertyValue('padding-right')),

						b_top = parseFloat(styles.getPropertyValue('border-top-width')),
						b_bottom = parseFloat(styles.getPropertyValue('border-bottom-width')),
						b_left = parseFloat(styles.getPropertyValue('border-left-width')),
						b_right = parseFloat(styles.getPropertyValue('border-right-width'));

					return {
						top: top,
						left: left,
						width: box.right - box.left,
						height: box.bottom - box.top,
						innerWidth: box.right - box.left - (b_left + b_right + p_left + p_right),
						innerHeight: box.bottom - box.top - (b_top + b_bottom + p_top + p_bottom)
					};
				},
				get: function(dom,index){
					if(index < 0 || index > dom._len)
						return;
					return DomObj(dom[index],dom);
				},
				length: function(dom){ return dom._len; },
				html: function(dom,str){
					if($ar.type(str,'undefined'))
						return dom[0].innerHTML||'';
					for(var ni = 0; ni < dom._len; ni++)
						dom[ni].innerHTML = str;
					return dom;
				},
				append: function(dom,elem){
					var ni,no;
					elem = $ar.dom(elem);
					for(ni = 0; ni < dom._len; ni++){
						for(no = 0; no < elem._len; no++)
							dom[ni].appendChild(elem[no]);
					}
					return dom;
				},
			on: function(dom,evt,fun){
				if(/^(focus|blur)$/.test(evt)){
					var _evt = window.addEvent?'on'+evt:evt,
						ni;
					if(window.addEvent){
						_list = 'addEvent';
					} else if (window.addEventListener) {
						_list = 'addEventListener';
					} else if (window.attachEvent) {
						_list = 'attachEvent';
					}
					for(ni = 0; ni < dom._len; ni++){
						dom[ni][_list](_evt,fun);
					}

					return dom;
				}

				if(!events[evt]){
					events[evt] = (function(){
						var s = {
							evt: evt,
							fun: null,
							routes: []
						};
						s.fun = function(_e){
							/*
							if(s.evt === 'scroll'){
								var delta = 0,
									deltaX = 0,
									deltaY = 0,
									absDelta = 0;
								if('detail'      in _e ){
									deltaY = _e.detail * -1;
								}
								if('wheelDelta'  in _e ){
									deltaY = _e.wheelDelta;
								}
								if('wheelDeltaY' in _e ){
									deltaY = _e.wheelDeltaY;
								}
								if('wheelDeltaX' in _e ){
									deltaX = _e.wheelDeltaX * -1;
								}
								if('axis' in _e && _e.axis === _e.HORIZONTAL_AXIS){
									deltaX = deltaY * -1;
									deltaY = 0;
								}

								delta = deltaY === 0 ? deltaX : deltaY;

								if('deltaY' in _e){
									deltaY = _e.deltaY * -1;
									delta = deltaY;
								}
								if('deltaX' in _e){
									deltaX = _e.deltaX;

									if(deltaY === 0){
										delta = deltaX * -1;
									}
								}
								_e.deltaX = deltaX;
								_e.deltaY = deltaY;
							}
							*/
							var t = $ar.dom(_e.target),
								ni,na;
							for(ni = 0; ni < s.routes.length; ni++){
								na = t.closest(s.routes[ni].dom);
								if(!na.hasOwnProperty('_len')||!na._len){
									continue;
								}
								s.routes[ni].callback(_e);
							}
						};
						return s;
					})();

					if(window.addEvent){
						if(evt === 'scroll'){
							window.addEventListener('onmousewheel',events[evt].fun,false);
						} else {
							window.addEvent('on'+evt, events[evt].fun);
						}
					} else if(window.addEventListener){
						if(evt === 'scroll'){
							window.addEventListener('wheel',events[evt].fun,false);
						} else {
							window.addEventListener(evt,events[evt].fun,false);
						}
					} else if (window.attachEvent){
						if(evt === 'scroll'){
							window.attachEvent('wheel',events[evt].fun,false);
						} else {
							window.attachEvent(evt,events[evt].fun,false);
						}
					}
				}

				events[evt].routes.push({ dom: dom, callback: fun });
				return dom;
			},
			off: function(dom,evt,fun){
				if(!events[evt] || !events[evt].routes.length){
					return;
				}

				var r = events[evt].routes,
					ni,found=false;
				for(ni = r.length; ni > 0;){
					if(!dom.matches(r[--ni].dom)){
						continue;
					}
					if(fun && r[ni].callback !== fun){
						continue;
					}
					found = true;
					r.splice(ni,1);
				}

				return dom;
			},
				each: function(dom,callback){
					for(var ni = 0; ni < dom._len; ni++){
						_callback(dom.get(ni),ni);
					}
					return dom;
				},
				focus: function(dom){
					for(var ni = 0; ni < dom._len; ni++){
						if(dom[ni].nodeName == 'INPUT' || dom[ni].nodeName == 'SELECT' || dom[ni].nodeName == 'TEXTAREA' || dom[ni].nodeName == 'BUTTON' || dom[ni].nodeName == 'ANCHOR'){
							dom[ni].focus();
							
							return dom;
						}
					}
					
					return dom;
				}
			};

		var DomObj = function(selector, context){
			var self = {
				_back: null,
				_len: 0,
				_selector: ''
			};

			//some static functions
			var ni;
			for(ni in fn){
				(function(dom,index){
					dom[index] = function(){
						var args = Array.prototype.slice.call(arguments);
						args.unshift(dom);
						return fn[index].apply(dom,args);
					};
				})(self,ni);
			}

			self._back = context;

			if(!selector) return self;

			if($ar.type(selector,'node')){
				self[0] = selector;
				self._len = 1;
				return self;
			}

			if(/^[^<]*(<[\w\W]+>)[^>]*$/.test(selector)){
				var elem = document.createElement('div'),
					no,c;
				elem.innerHTML = selector.replace(/(^\s*|\s*$)/g,'');
				c = elem.childNodes;
				self._len = c.length;
				for(no = 0; no < self._len; no++){
					self[no] = c[no];
				}
				return self;
			}

			//need to add ability to create element or take normal element
			self._selector = selector;

			if(!selector) return self;

			var res = [],ni;
			if(context && context._len){
				for(ni = 0; ni < context._len; ni++){
					res = res.concat(cleanSelector(selector,context[ni]));
				}
			} else {
				res = cleanSelector(selector);
			}
			for(ni = 0; ni < res.length; ni++){
				self[ni] = res[ni];
			}
			self._len = res.length;

			return self;
		};

		var ret_func = function(selector){
			if($ar.type(selector,'object') && selector.hasOwnProperty('_len'))
				return selector;
			return DomObj(selector);
		};

		ret_func.atPoint = function(x,y){
			return $ar.dom(document.elementFromPoint(x,y));
		};

		return ret_func;
	})()
});

$ar.mixin((function(){
	var cache = {};

	function generate_topic(topic){
		var ret = {
			topic: topic,
			path: '',
			regexp: null,
			keys: [],
			subs: []
		};

		ret.path = '^' + topic
			.replace(/\/\(/g, '(?:/')
			.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){ // jshint ignore:line
				ret.keys.push({ name: key, optional: !! optional });
				slash = slash || '';
				return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
			})
			.replace(/([\/.])/g, '\\$1')
			.replace(/\*/g, '(.*)') + '$';

		ret.regexp = new RegExp(ret.path);

		return ret;
	}

	function clean_path_args(path,descriptor,args){
		var path_args = descriptor.regexp.exec(path).slice(1) || [],
			ni,no;

		for(ni = 0; ni < path_args.length; ni++){
			no = parseFloat(path_args[ni]);
			if(!isNaN(no)){
				path_args[ni] = no;
			}
		}

		return path_args.concat(args||[]);
	}

	return {
		//channel is now depreciated
		channel : function(){},
		pub : function(){
			var topic = arguments[0],
				args = Array.prototype.slice.call(arguments, 1)||[],
				found = false,
				ni, t, path_args;

			for(t in cache){
				if(!(new RegExp(t)).test(topic)){
					continue;
				}
				found = true;
				path_args = clean_path_args(topic,cache[t],args);

				for(ni = 0; ni < cache[t].subs.length; ni++){
					cache[t].subs[ni].apply($ar, path_args);
				}
			}
		},
		sub : function(topic, callback){
			topic = generate_topic(topic);
			if(!cache.hasOwnProperty(topic.path)){
				cache[topic.path] = topic;
			}
			cache[topic.path].subs.push(callback);
			return [topic.path, callback];
		},
		unsub : function(topic, callback){
			topic = generate_topic(topic);
			for(var ni = 0; ni < cache[topic.path].subs.length; ni++){
				if(cache[topic.path].subs[ni] === callback){
					cache[topic.path].subs.splice(ni, 1);
				}
			}
		},
		channels : function(){
			var out = [],
				ni;

			for(ni in cache){
				out.push(cache[ni].topic);
			}
		}
	};
})());

$ar.mixin({
	// before you get all crazy, this just exposes one function that allows one
	// to set up callbacks for when the page is navigated to a hash
	// as well as when it's leaving a hash. also lets you pass variables to the
	// open function by setting up your path.
	// path:  /beans/:id/:username?/cool has an optional username param and always
	//			passes an id to the open function. beans and cool are static
	route : (function(){
		var paths = {},
			current = [];//we define multiple current's to support wildcards and multiple routes

		function handleChange(){
			var hash = window.location.hash.replace(/^#!?\//,''),
				ni,no,args;

			for(var i = 0; i < current.length; i++){
				if(paths[current[i]]){
					for(no = 0; no < paths[current[i]].after.length; no++){
						if(typeof paths[current[i]].after[no] === 'function'){
							paths[current[i]].after[no]();
						}
					}
				}
			}

			//unset current to refind it!
			current = [];
			for(ni in paths){
				if(!paths[ni].regexp.test(hash)){
					continue;
				}
				if(ni === '' && hash.length){
					continue;
				}
				if(hash === current){
					continue;
				}

				args = paths[ni].regexp.exec(hash).splice(1);
				for(no = 0; no < paths[ni].before.length; no++){
					paths[ni].before[no].apply(null,args);
				}
				
				current.push(ni);
			}
			
			//handle not found ie 404
			if(current.length == 0 && hash){
				//no matching route, call 404
				if($ar.type($ar.route.notFound,'function')){
					$ar.route.notFound();
				}else if($ar.type($ar.route.notFound,'string') ){//assume it's a route and redirect
					window.location = $ar.route.notFound;
				}
			}
		}

		if (window.addEventListener){
			window.addEventListener('hashchange',handleChange,false);
		} else if (window.attachEvent){
			window.attachEvent('hashchange',handleChange,false);
		}
		
		$ar.init(function(){ setTimeout(handleChange,0); });

		var ret = function(path,open,close){
			keys = [];
			path = '^' + path
				.replace(/\/\(/g, '(?:/')
				.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
					keys.push({ name: key, optional: !! optional });
					slash = slash || '';
					return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
				})
				.replace(/([\/.])/g, '\\$1')
				.replace(/\*/g, '(.*)') + '\/?$';
			if(!paths[path]){
				paths[path] = {
					regexp: new RegExp(path),
					keys: keys,
					before: [],
					after: []
				};
			}
			if(typeof open === 'function'){
				paths[path].before.push(open);
			}
			if(typeof close === 'function'){
				paths[path].after.push(close);
			}
		};
		
		//a function to overload if you want to handle 404's
		ret.notFound = function(){};
		
		//a default hash route if no other route is sepcified
		ret.home = function(route){
	
	        if (location.hash === "") {
	            if (route !== null) {
	                location.hash = route;
	            }
	        }
		};

		ret.goto = function(path){
			window.location.hash = '/' + path;
		};

		return ret;
	})()
});


var PagedModel = function(data){
	var self = $ar.model({
		api: null,

		items: [],

		page: 1,
		count: 25,
		loading: false,
		total: 0,

		disabled: false,
		update: null
	}).watch({
		loading: true,
		items: true,
		page: true,
		total: true
	}).pre(function(beans){
		if(beans.type){
			self.type({ items: beans.type });
		}
	}).serialize(data);

	self.more = function(){
		self.page(self.page()+1);
	};
	self.left = ko.computed(function(){
		var num = self.total() - (self.page()*self.count) - self.items().length;
		return num>0?num:0;
	});
	self.generateParams = function(){
		return {
			page: self.page(),
			count: self.count
		};
	};
	self.items.extend({ rateLimit: 50 });//throttle items
	
	self.grab = function(_c){
		if(!self.api) return;
		self.loading(true);
		self.api(self.generateParams(), function(resp){
			self.loading(false);
			if(resp.status != 1){
				return;
			}
			 
			resp.items = resp.results||[];
			self.serialize({ items: resp.items, total: resp.total||0 });
			if($ar.type(_c,'function')){ _c(true);}
			if(!$ar.type(self.update,'function')){ return;}
			self.update(self);
		});
	};
	self.moreItems = function(_c){
		if(!self.api) return;
		self.api(self.generateParams(), function(resp){
			if(resp.status != 1){
				return;
			}
			 
			resp.items = resp.results||[];
			//self.serialize({ items: resp.items, total: resp.total||0 });
			for(var ni = 0; ni<resp.items.length; ni++){
				self.items.push(resp.items[ni]);
			}

		});
	};
	return self;
};

var LiveSearchModel = function(data){
	var self = PagedModel().extend({
		term: '',
		field: 'value',
		object: '',
		agencyID: '',
		hasFocus: false
	}).watch({
		term: true,
		hasFocus: true
	}).serialize(data);

	self.ugh = false;
	self.value = data.value?ko.isObservable(data.value)?data.value:ko.observable(data.value):ko.observable();
	setTimeout(function(){
		if(self.value()){
			self.ugh = true;
			self.term(ko.utils.unwrapObservable(self.value()[self.field])||'');
		}
	},0);
	
	self.clear = function(){
		self.term('');
		self.value(null);
	}
	
	var timer = null;

	self.term.subscribe(function(nval){
		if(self.ugh){
			self.ugh = false;
			return;
		}
		
		if(self.value()){
			self.value(null);
		}
		
		if(timer) return;
		timer = setTimeout(function(){
			
			clearTimeout(timer);
			timer = null;

			if(self.api){
				self.page(1);
				self.items([]);
				self.grab();
			}
		},500);
	});

	self.viewItems = ko.computed(function(){
		var i = self.items()||[],
			t = self.term().toLowerCase(),
			uwrap = ko.utils.unwrapObservable,
			out = [],
			ni, no;
	
			i = uwrap(i);
		
		if(self.value()) return [];
		if(!t) return i;

		for(ni = 0; ni < i.length; ni++){
			if(!$ar.type(i[ni],'object')){
				if((""+uwrap(i[ni])).toLowerCase().indexOf(t) != -1)
					out.push(i[ni]);
				continue;
			}
			for(no in i[ni]){
				//if(!$ar.type(uwrap(i[ni][no]),'string')) continue;
				if((""+uwrap(i[ni][no])).toLowerCase().indexOf(t) == -1) continue;
				out.push(i[ni]);
				break;
			}
		}

		return out;
	});

	self.showMore = ko.computed(function(){
		if(!self.hasFocus()) return false;
		if(!self.viewItems().length) return false;
		if(self.value()) return false;
		return true;
	});

	self.generateParams = function(){
		return {
			data: {
				object: self.object,
				query: self.term(),
				page: self.page(),
				count: self.count
			}
		};
	};

	self.select = function(item){
		self.value(item);
	};
	self.value.subscribe(function(nval){
		if(!nval) return;
		self.ugh = true;
		self.term(ko.utils.unwrapObservable(nval[self.field])||'');
	});

	return self;
};

;(function(){
	ko.bindingHandlers.dropdown = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			var val = valueAccessor();
			val.items = ko.unwrap(val.items)||[];
			
			var obj = LiveSearchModel(val),
				title = obj.field,
				ni = -1,
				elem,

				keyScroll = function(e){
					var popup = elem.find('.popup'),
						options = popup.find('.option'),
						beans = popup.find('.option.selected').length()?popup.find('.option.selected').prevAll('.option').length():-1,
						top, option;
						
					if(e.keyCode == 40){
						e.preventDefault();
						if(beans+1 >= options.length()){
							return;
						}
						options.removeClass('selected');

						option = options.get(beans+1);
						top = option.addClass('selected')[0].offsetTop;
						if(top + option[0].offsetHeight > popup[0].scrollTop + popup.measure().height)
							popup[0].scrollTop = top - popup.measure().height + option[0].offsetHeight;
						if(beans+1 == 0){
							$ar.dom('.point').addClass('blue');
						}
						else{
							$ar.dom('.point').removeClass('blue');
						}
					} else if (e.keyCode == 38){
						e.preventDefault();
						if(beans <= 0){
							return;
						}
						option = options.get(beans-1);
						options.removeClass('selected');
						top = option.addClass('selected')[0].offsetTop;
						popup[0].scrollTop = top;
						if(beans-1 == 0){
							$ar.dom('.point').addClass('blue');
						}
						else{
							$ar.dom('.point').removeClass('blue');
						}
					} else if(e.keyCode == 13){
						e.preventDefault();
						obj.select(obj.items()[beans]);
						obj.close();
					} else if(e.keyCode == 27)
						obj.close();
				};

			obj.placeholder = val.placeholder || 'Choose One';

			obj.n_term = ko.observable(obj.term()||null);
			obj.n_term.subscribe(function(nval){
				ni = -1;
				obj.page(1);
				if(obj.api){
					obj.items([]);
					obj.grab();
				}
			});
			obj.generateParams = function(){
				var ret = {
					page: obj.page(),
					count: obj.count
				};
				if(obj.n_term())
					ret.term = obj.n_term();
				return ret;
			};
			obj.isOpen = ko.observable(false);
			obj.toggle = function(d,e){
				if( (e && $ar.dom(e.target).closest($ar.dom(elem.find('.input-wrap')))._len ) || obj.disabled){
					return;
				}
				if(obj.isOpen()){
					obj.close();
				} else {
					obj.open();				
				}
			};
			
			obj.getStuff = function(e){
				elem.find('.option').removeClass('selected');
				$ar.dom('.point').removeClass('blue');
				$ar.dom.atPoint(e.x,e.y).closest('.option').addClass('selected');
				if($ar.dom.atPoint(e.x,e.y).closest('.option').prevAll()._len < 1){
					$ar.dom('.point').addClass('blue');
				}
			};
			obj.flipper = function(){
				if( val.position && $ar.type(val.position,'string') ){
					if( 'up' == val.position || 'Up' == val.position || 'UP' == val.position ){
						elem.addClass('flip-up');
					}else{
						elem.removeClass('flip-up');
					}
				}else{
					if(parseInt(elem.find('.popup').measure().top + elem.find('.popup')[0].offsetHeight) > window.innerHeight){
						elem.addClass('flip-up');
					}else{
						elem.removeClass('flip-up');
					}					
				}

			}
			obj.open = function(){
				var popup = elem.find('.popup');
				
				obj.isOpen(true);
				if(obj.page() !== 1 || obj.n_term()){
					obj.n_term(null);
					obj.page(1);
					if(obj.api){
						obj.items([]);
						obj.grab(function(){
							obj.flipper();
						});
					}
				}
				elem.addClass('open');
				if(elem.find('.popup').measure().left < 250){
					elem.addClass('push-right');
				}else{
					elem.removeClass('push-right');
				}if(elem.find('.popup').measure().left > window.innerWidth){
					elem.addClass('push-left');
				}else{
					elem.removeClass('push-left');
				}
				
				obj.flipper();
				
				setTimeout(function(){
					$ar.dom(window).on('click',obj.screenClose);

					var input = $ar.dom(elem.find('input'));
					if(input._len){
						input.focus();
					}
					$ar.dom(window).on('keydown', keyScroll);
				},2);
				
				elem.find('.popup').on('mousemove',obj.getStuff);
			};
			obj.screenClose = function(evt){
				if($ar.dom(evt.target).closest(elem)._len){
					return;
				}
				obj.close();
			};
			obj.close = function(){
				obj.isOpen(false);
				elem.removeClass('flip-up, push-right, push-left');
				$ar.dom(window).off('click',obj.screenClose);
				$ar.dom(window).off('keydown', keyScroll);
				setTimeout(function(){ elem.removeClass('open'); },0);
				elem.find('.popup').off('mousemove', obj.getStuff);
			};
			obj.select = function(item){
				obj.close();
				obj.value(item);
				elem.closest('.error').removeClass('error');
			};

			obj.scrolled = function(data, event) {

		        var elem = event.target;
		        if (elem.scrollTop > (elem.scrollHeight - elem.offsetHeight - 100)) {
					obj.page(obj.page()+1);
					if(obj.api){
						obj.moreItems();
					}
		        }

			};
			
			obj._title = ko.computed(function(){
				var v = obj.value();
				if( $ar.type(v,'string')) {
					return v;
				}
				
				if( $ar.type(v,'object')){
					if(v && v[title]){
						return v[title];
					}
				}
				
				return;
			});

			elem = $ar.dom(
				'<div class="dropdown">' +
					'<div class="toggle" data-bind="click: toggle"></div>' +
					'<div data-bind="if: ' + (val.search?'!isOpen() && ':'') + 'value()">' +
						'<div class="option" data-bind="html: _title, click: toggle"></div>' +
					'</div>' +
					'<div data-bind="if: ' + (val.search?'!isOpen() && ':'') + '!value()">' +
						'<div class="option" data-bind="click: toggle">' + (val['default']||obj.placeholder) + '</div>' +
					'</div>' +
					'<div data-bind="if: isOpen()">' +
						(val.search?'<div class="option"><input type="text" data-bind="value: n_term, valueUpdate: \'input\'"></div>':'') +
						'<div class="point"></div>' +
						'<div class="popup" data-bind="event: { scroll: scrolled }">' +
							'<div data-bind="if: loading">' +
								'<div class="option loading">Loading, stand by.</div>' +
							'</div>' +
							'<div data-bind="ifnot: loading">' +
								'<!-- ko if: items().length > 0 -->' +
									'<!-- ko foreach: items() -->' +
									'<div class="option" data-bind="click: $parent.select, html: $data.' + title + '"></div>' +
									'<!-- /ko -->' +
								'<!-- /ko -->' +
								'<!-- ko ifnot: items().length > 0 -->' +
									'<div class="option noresults">No results found!</div>' +
								'<!-- /ko -->' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
			if(obj.disabled){
				elem.addClass("disabled");
			}

			$ar.dom(element).before(elem).remove();
			$ar.di.register('dropdown',function(){
				return obj;
			});
			ko.applyBindings(obj,elem[0]);

			obj.value.subscribe(function(nval){
				obj.close();
				obj.isOpen(false);
			});

			obj.grab();

			return { controlsDescendantBindings: true };
		}
	};
	
}());if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
		],
		dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop);
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
				}
			}
			return result;
		};
	})();
}

//special consideration for internet exploder < 8
if (!Date.now) {
  Date.now = function() {
    return new Date().valueOf();
  };
}

window.console = console || { log : function() {} };

function basename(path) {
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}

/**
 *	ActivityRez Web Booker
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker
 */

//compresses to 21207 B

var WebBooker = {
	bootstrap: {},
	showInitLoader: ko.observable(true),
	wbLoaded: ko.observable(false),
	show404: ko.observable(false),
	hasReseller: ko.observable(false),
	selectedCurrency: ko.observable({}),
	available_currencies: ko.observableArray([]),
	thumbnailHeight: wb_global_vars.thumbnailHeight || 125,
	galleryImageHeight: wb_global_vars.galleryImageHeight || 700,
	timthumb: 'https://media1.activityrez.com/images/',
	mediaServer: (wb_global_vars && wb_global_vars.server == 'training') ? '//devmedia.activityrez.com' : '//media.activityrez.com',
	selectedLanguage: ko.observable(),
	available_langs: ko.observableArray([]),
	
	isOldIE: (function(){
		if(navigator.appName != "Microsoft Internet Explorer")
			return false;
		return parseInt(/MSIE\s(\d+)/.exec(navigator.appVersion)[1],10) < 9
	})(),

	us_states: [
		'Alabama',
		'Alaska',
		'American Samoa',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'District of Columbia',
		'Florida',
		'Georgia',
		'Guam',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Northern Marianas Islands',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Puerto Rico',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'Utah',
		'Vermont',
		'Virginia',
		'Virgin Islands',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	],

	setCurrency: function(val){
		WebBooker.selectedCurrency(val);
		WebBooker.Settings.set('currency',val.title);
	},

	init: function() {
		var sel_curr = WebBooker.Settings.get('currency')||wb_global_vars.currency,
			sel_lang = WebBooker.Settings.get('i18n')||wb_global_vars.i18n,
			ni, elem;
		for(ni=0; ni<wb_global_vars.available_currencies.length; ni++){
			elem = document.createElement('span');
			elem.innerHTML = wb_global_vars.available_currencies[ni].symbol;
			wb_global_vars.available_currencies[ni].symbol = elem.innerHTML;

			WebBooker.available_currencies.push(wb_global_vars.available_currencies[ni]);
			if(sel_curr != wb_global_vars.available_currencies[ni].title)
				continue;
			WebBooker.selectedCurrency(wb_global_vars.available_currencies[ni]);
		}

		if(!WebBooker.selectedCurrency()){	//triggered by a saved currency not existing in available_currencies
			sel_curr = wb_global_vars.currency;
			for(ni in wb_global_vars.available_currencies){
				if(sel_curr != wb_global_vars.available_currencies[ni].title)
					continue;
				WebBooker.selectedCurrency(wb_global_vars.available_currencies[ni]);
				break;
			}
		}
		
		if ( wb_global_vars.default_cutoff_hrs ) {
			wb_global_vars.default_cutoff_hrs = parseInt( wb_global_vars.default_cutoff_hrs, 10 );
		}
		if ( wb_global_vars.default_cutoff_mins ) {
			wb_global_vars.default_cutoff_mins = parseInt( wb_global_vars.default_cutoff_mins, 10 );
		}

		for(ni=0; ni<wb_global_vars.languages.length; ni++){
			WebBooker.available_langs.push(wb_global_vars.languages[ni]);
			if(sel_lang != wb_global_vars.languages[ni].i18n)
				continue;
			WebBooker.selectedLanguage(wb_global_vars.languages[ni]);
		}

		if(!WebBooker.selectedLanguage()){	//triggered by a saved currency not existing in available_currencies
			sel_lang = wb_global_vars.i18n;
			for(ni in wb_global_vars.languages){
				if(sel_lang != wb_global_vars.languages[ni].i18n)
					continue;
				WebBooker.selectedLanguage(wb_global_vars.languages[ni]);
				break;
			}
		}
		WebBooker.selectedLanguage.subscribe(function(val){
			if(!val) return;
			WebBooker.API.changeI18N(val);
		});

		WebBooker.bootstrap = wb_global_vars;
		if( WebBooker.bootstrap && WebBooker.bootstrap.server && WebBooker.bootstrap.server == 'training'){
			var training_div = '<div class="trainingWarning">You are currently in training mode. Switch to production mode <a href="' ;
				training_div += WebBooker.bootstrap.webbooker_settings + '" target="_blank">here</a> to start accepting payments.</div>';

			jQuery('body').addClass('training');
			jQuery('body').append(training_div);
			jQuery('.trainingClose').on('click',function(){
				jQuery('.trainingWarning').hide();
			});
		}
		createCookie('ACTIVITYREZ3', WebBooker.bootstrap.nonce);
		WebBooker.Agent.last_key = WebBooker.bootstrap.nonce;
		jQuery('#wb_bootstrapper').remove();

		//lets save some keystrokes
		var boot = WebBooker.bootstrap;
		boot.crossDomain = true;
		boot.privacy = ko.observable(boot.privacy);
		WebBooker.searchUrl = boot.wb_url + '/#/Search';

		// Begin bootstrapping.
		WebBooker.hasReseller(boot.user_id && boot.user_id > 0);
		WebBooker.About.content(boot.aboutus);
		WebBooker.Contact.content(boot.contact);
		if(boot.user_name){
			WebBooker.Agent.name(boot.user_name);
		} else if(boot.user_display_name){
			WebBooker.Agent.name(boot.user_display_name);
		}

		// Set the user id.
		WebBooker.Agent.user_id(boot.user_id);

		//start the deafult language grab for js
		__.load(boot.webBookerID,boot.i18n);

		// Load voucher payment types.
		var vouch = (boot.vouchers||[]).slice(0);
		boot.payment_types = [];
		for(ni = 0; ni < vouch.length; ni++){
			boot.payment_types.push(new $ar.VoucherPaymentModel(vouch[ni]));
		}
		// Load cc payment type.
		boot.payment_types.push(new $ar.CreditCardPaymentModel());

		for(ni=0; ni<WebBooker.bootstrap.payment_types.length; ni++){
			WebBooker.bootstrap.payment_types[ni].label = __(WebBooker.bootstrap.payment_types[ni].label);
		}
		// translate destinations,categories,tags,and moods
		boot.wb_destinations = boot.wb_destinations || [];
		for(ni = 0; ni < boot.wb_destinations.length; ni++){
			boot.wb_destinations[ni].__name = __(boot.wb_destinations[ni].name);
			boot.wb_destinations[ni].name = ko.observable(boot.wb_destinations[ni].name);
		}
		boot.wb_destinations.sort(function(a, b) {
			if ( a.name() > b.name() ) {
				return 1;
			}
			if ( a.name() < b.name() ) {
				return -1;
			}
			return 0;
		});
		boot.cats = boot.cats || [];
		for(ni = 0; ni < boot.cats.length; ni++){
			boot.cats[ni] = $ar.Taxonomy(boot.cats[ni]);
		}
		boot.tags = boot.tags || [];
		for(ni = 0; ni < boot.tags.length; ni++){
			boot.tags[ni] = $ar.Taxonomy(boot.tags[ni]);
		}
		boot.moods = boot.moods || [];
		for(ni = 0; ni < boot.moods.length; ni++){
			boot.moods[ni] = $ar.Taxonomy(boot.moods[ni]);
		}

		// init the date pickers
		jQuery('.datepicker').each(function() {
			jQuery(this).datepicker({
				minDate: 0,
				numberOfMonths: 2,
				dateFormat: 'mm/dd/yy',
				beforeShow: function(a) {
					if( a.id == 'datepicker-second' && jQuery('#datepicker-first').datepicker('getDate') ) {
						return {
							minDate: jQuery('#datepicker-first').datepicker('getDate')
						};
					}
					var b = new Date();
					return	{
						minDate: new Date(b.getFullYear(), b.getMonth(), b.getDate())
					};
				}
			});
		});
		
		// init the price range slider
		jQuery('#price-range-slider').noUiSlider({
			range: [0,10000],
			start: [0,10000],
			step: 10,
			slide: function() {
				var values = jQuery(this).val();
				
				WebBooker.Catalog.search_params.price_min( values[0] );
				WebBooker.Catalog.search_params.price_max( values[1] );
			}
		});

		// init pages.
		WebBooker.Cart.init();
		WebBooker.Catalog.init();
		WebBooker.Homepage.init();
		WebBooker.ActivityView.init();
		
		// Start cookie listener
		WebBooker.Agent.cookieInterval = setInterval( WebBooker.Agent.pingCookie, 3000 );
	},

	hideAllScreens: function() {
		jQuery('#cart-sidebar .retrieve').show(); //this is dumb
		WebBooker.Homepage.show(false);
		WebBooker.Catalog.show(false);
		WebBooker.ActivityView.show(false);
		WebBooker.Dashboard.show(false);
		WebBooker.Dashboard.showMain(true);
		WebBooker.Dashboard.showReports(false);
		WebBooker.Dashboard.showSignup(false);
		WebBooker.CheckoutNav.show(false);
		WebBooker.CheckoutNav.showConfirmation(false);
		WebBooker.Itinerary.show(false);
		WebBooker.Contact.show(false);
		WebBooker.show404(false);
		WebBooker.Agent.passwordReset(false);
		WebBooker.Agent.passwordResetRequest(false);
		WebBooker.Dashboard.showPasswordResetConfirmation(false);
	},

	successMsg: function(msg) {
		$ar.Notification(msg,'success');
	},

	errorMsg: function(msg){
		$ar.Notification(msg,'error');
	}
};

// Agents
WebBooker.Agent = {
	user_id: ko.observable(),
	user: ko.observable(),
	name: ko.observable(),
	email: ko.observable(),
	password: ko.observable(),
	key: ko.observable(),
	isLoggingIn: ko.observable(false),
	loginError: ko.observable(),
	loginSuccess: ko.observable(),
	passwordReset: ko.observable(false),
	passwordResetRequest: ko.observable(false),
	signup_fields: {
		display_name: ko.observable(),
		email: ko.observable(),
		arc: ko.observable(),
		password: ko.observable(),
		verify_password: ko.observable()
	},
	pw_reset: {
		username: ko.observable(),
		old_pw: ko.observable(),
		new_pw: ko.observable(),
		new_pw_confirm: ko.observable()
	},
	signup_error: ko.observable(false),
	last_key: false,
	cookieInterval: false,

	login: function() {
		var email = WebBooker.Agent.email(),
		password = WebBooker.Agent.password();

		if(!email || email === '') {
			$ar.Notification(__('Please enter a username.'),'error');
			return false;
		}

		if(!password || password === '') {
			$ar.Notification(__('Please enter a password.'),'error');
			return false;
		}

		WebBooker.Agent.loginError(null);
		WebBooker.Agent.isLoggingIn(true);

		WebBooker.API.loginAgent({
			user: email,
			pass: password
		}, function(data) {
			WebBooker.Agent.isLoggingIn(false);

			if(data.status <= 0 && data.status != -2){
				WebBooker.Agent.loginError(data.msg);
				return;
			}
			
			if ( data.status == -2 ) {
				window.location.hash = '#/Dashboard/PasswordReset';
				return;
			}

			data.display_name = data.display_name||'';
			WebBooker.bootstrap.reseller2_id = data.company;
			WebBooker.Agent.user_id(data.uid);
			if(data.display_name.replace(/\s/g,'').length){
				WebBooker.Agent.name(data.display_name);
			} else {
				WebBooker.Agent.name(data.name);
			}
			// Set the nonce to this new one.
			WebBooker.bootstrap.nonce = data.nonce;
			WebBooker.Agent.last_key = data.nonce;
			// Reload the page so we can get the WP cookie.
			if(window.location.hash != '/Dashboard/signup'){
				location.reload();
			} else {
				window.location.hash = '/Home';
				location.reload();
			}
		});
	},
	
	logout : function(){
		WebBooker.API.logoutAgent();
	},
	
	resetPassword: function() {
		WebBooker.Agent.loginError(false);
		if ( !WebBooker.Agent.pw_reset.username() ) {
			WebBooker.errorMsg(__('Please enter your username.'));
			return false;
		}
		if ( !WebBooker.Agent.pw_reset.old_pw() ) {
			WebBooker.errorMsg(__('Please enter your current password.'));
			return false;
		}
		if ( !WebBooker.Agent.pw_reset.new_pw() ) {
			WebBooker.errorMsg(__('Please enter a new password.'));
			return false;
		}
		if ( WebBooker.Agent.pw_reset.new_pw() != WebBooker.Agent.pw_reset.new_pw_confirm() ) {
			WebBooker.errorMsg(__('New passwords do not match.'));
			return false;
		}
		
		WebBooker.Agent.isLoggingIn(true);
		
		WebBooker.API.resetPassword({
			username: WebBooker.Agent.pw_reset.username(),
			old_pw: WebBooker.Agent.pw_reset.old_pw(),
			new_pw: WebBooker.Agent.pw_reset.new_pw(),
			new_pw_confirm: WebBooker.Agent.pw_reset.new_pw_confirm()
		}, function(result) {
			WebBooker.Agent.isLoggingIn(false);
			if ( result.status == 1 ) {
				WebBooker.Agent.password(null);
				WebBooker.Dashboard.showPasswordReset(false);
				WebBooker.Dashboard.showPasswordResetConfirmation(true);
				WebBooker.Agent.loginSuccess(__('Your password has been reset successfully. Please log-in here.'));
				var sidebar = jQuery('#agents-sidebar');
				jQuery('html, body').animate({ scrollTop: sidebar.offset().top }, 500);
				WebBooker.postMessage('scroll_to=' + sidebar.offset().top);
			} else {
				WebBooker.Agent.loginError(result.msg);
			}
		});
	},

	doSignup: function() {
		if(!WebBooker.Agent.verifySignupFields()) {
			return false;
		}

		var params = {
			display_name: WebBooker.Agent.signup_fields.display_name(),
			email: WebBooker.Agent.signup_fields.email(),
			password: WebBooker.Agent.signup_fields.password(),
			verify_password: WebBooker.Agent.signup_fields.verify_password(),
			arc: WebBooker.Agent.signup_fields.arc()
		};

		WebBooker.hideAllScreens();
		WebBooker.showInitLoader(true);

		WebBooker.API.signupAgent(params, function(result) {
			if(result.status == 1) {
				WebBooker.Agent.resetSignupFields();
				WebBooker.showInitLoader(false);
				WebBooker.Dashboard.show(true);
				WebBooker.Dashboard.showMain(false);
				WebBooker.Dashboard.showReports(false);
				WebBooker.Dashboard.showSignup(false);
				WebBooker.Dashboard.signupSuccessMsg(true);
				var sidebar = jQuery('#agents-sidebar');
				jQuery('html, body').animate({ scrollTop: sidebar.offset().top }, 500);
				WebBooker.postMessage('scroll_to=' + sidebar.offset().top);
				WebBooker.Agent.loginSuccess(__('Congratulations, your travel agent sign-up is complete! You may log-in now below.')());
			} else {
				WebBooker.showInitLoader(false);
				WebBooker.Dashboard.show(true);
				WebBooker.Dashboard.showMain(false);
				WebBooker.Dashboard.showReports(false);
				WebBooker.Dashboard.showSignup(true);
				WebBooker.Agent.signup_error(result.msg);
				WebBooker.Dashboard.signupSuccessMsg(false);
				WebBooker.Agent.loginSuccess(false);
			}
		});
	},

	verifySignupFields: function() {
		var msg = false;
		WebBooker.Agent.signup_error(false);
		if(WebBooker.Agent.signup_fields.password() !== WebBooker.Agent.signup_fields.verify_password()) {
			msg = __('The passwords you entered don\'t match.');
		}
		if(!WebBooker.Agent.signup_fields.verify_password()) {
			msg = __('You need to enter the password again for verification.');
		}
		if(!WebBooker.Agent.signup_fields.password()) {
			msg = __('You need to enter a password.');
		}
		if(!WebBooker.Agent.signup_fields.arc()) {
			msg = __('You need to enter the ARC number.');
		}
		if(!WebBooker.Agent.signup_fields.email()) {
			msg = __('You need to enter your e-mail address.');
		}
		if(!WebBooker.Agent.signup_fields.display_name()) {
			msg = __('You need to enter your display  name.');
		}
		if(msg) {
			WebBooker.Agent.signup_error(msg());
			return false;
		}
		return true;
	},

	resetSignupFields: function() {
		WebBooker.Agent.signup_fields.password('');
		WebBooker.Agent.signup_fields.verify_password('');
		WebBooker.Agent.signup_fields.arc('');
		WebBooker.Agent.signup_fields.email('');
		WebBooker.Agent.signup_fields.display_name('');
		WebBooker.Agent.signup_error(false);
	},

	doShowSignup: function() {
		if(window.location.href != WebBooker.bootstrap.wb_url + '/#/Dashboard/signup') {
			window.location.href = WebBooker.bootstrap.wb_url + '/#/Dashboard/signup';
			return;
		}
		if(window.location.hash != '#/Dashboard/signup') {
			window.location.hash = '#/Dashboard/signup';
		}
	},
	
	PasswordReset: function(login, key) {
		if ( WebBooker.Agent.pw_reset.new_pw() == WebBooker.Agent.pw_reset.new_pw_confirm() ) {
			var args = {
				login: WebBooker.Agent.user(),
				password: WebBooker.Agent.pw_reset.new_pw(),
				key: WebBooker.Agent.key()
			};
			
			WebBooker.API.passwordReset(args,
				function(json) {
					if ( json.status == 1 ) {
						WebBooker.successMsg(json.msg);
						window.location.hash = '#/Home';
					} else if ( json.status == -1 ) {
						WebBooker.errorMsg(json.msg);
					} else {
						WebBooker.errorMsg(json.msg);
					}
				}
			);
		} else {
			WebBooker.errorMsg( __('Passwords do not match!') );
		}
	},
	
	PasswordResetRequest: function() {
		var args = {
			user: WebBooker.Agent.user()
		};
		
		WebBooker.API.passwordResetRequest(args,
			function(json) {
				if ( json.status == 1 ) {
					WebBooker.successMsg(json.msg);
				} else if ( json.status == -1 ) {
					WebBooker.errorMsg(json.msg);
				} else {
					WebBooker.errorMsg(json.msg);
				}
			}
		);
	},
	
	pingCookie: function() {
		var cookie = readCookie('ACTIVITYREZ3');
		
		if ( cookie && cookie != WebBooker.Agent.last_key ) {
			WebBooker.bootstrap.nonce = cookie;
		}
		
		return;
	}
};

// Routes
function notFound() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.show404(true);
}

Path.map("#/Home").to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Homepage.show(true);
	WebBooker.Analytics.trigger({}, 'action_Home');
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Search').to(function() {
	if(!WebBooker.Catalog.searchResults().length) {
		WebBooker.Catalog.hasSearched(false);
	}
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Catalog.show(true);
	setTimeout(function() {
		jQuery('html, body').animate({ scrollTop: 0 }, 500);
		WebBooker.postMessage('scroll_to=0');
		WebBooker.Catalog.loadWithFilters();
		jQuery('#webbooker-search-results .results').focus();
	}, 1);
});

Path.map('#/Contact').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Contact.show(true);
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/About').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.About.show(true);
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.showMain(true);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.show(true);
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/reports').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.showReports(true);
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/signup').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showPasswordReset(false);
	WebBooker.Dashboard.showSignup(true);
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Dashboard/PasswordReset').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Dashboard.show(true);
	WebBooker.Dashboard.showMain(false);
	WebBooker.Dashboard.showReports(false);
	WebBooker.Dashboard.showSignup(false);
	WebBooker.Dashboard.showPasswordReset(true);
	WebBooker.Agent.pw_reset.username(WebBooker.Agent.email());
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/Checkout').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Checkout.sale.loadFromCart();
	WebBooker.CheckoutNav.show(true);

	setTimeout(function() {
		/*var items = [];
		for ( ni = 0; ni < WebBooker.Cart.items().length; ni += 1 ) {
			items.push( WebBooker.Cart.items()[ni].processActivityForAnalytics() );
		}*/

		WebBooker.Analytics.trigger( {
			cart_items: WebBooker.Cart.items(),
			subtotal: WebBooker.Checkout.sale.subtotal(),
			currency: WebBooker.selectedCurrency().title,
			prev_url: false
		}, 'action_Checkout');
	}, 1000);
});

Path.map('#/Confirmation/:saleID/:email').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();

	WebBooker.CheckoutNav.showConfirmation(true);
	WebBooker.CheckoutNav.progress(71);

	WebBooker.Checkout.sale.id(parseInt(this.params['saleID'],10));
	WebBooker.Checkout.sale.leadGuest.email( this.params['email'] );

	WebBooker.Checkout.sale.load(function(){
		WebBooker.Analytics.trigger( WebBooker.Checkout.sale, 'action_Confirmation' );
	});
	
	if(window.addEvent){
		window.addEvent('onunload', function(event) {
			WebBooker.Checkout.newSale();
		});
	} else if(window.addEventListener){
		window.addEventListener('unload', function(event) {
			WebBooker.Checkout.newSale();
		});
	}

	// send confirmation email
	if(!WebBooker.Sale.get('loadedConfirmation')) {
		WebBooker.Sale.set('loadedConfirmation', true);
		WebBooker.API.doItineraryAction({
			saleID: WebBooker.Checkout.sale.id(),
			email: WebBooker.Checkout.sale.leadGuest.email(),
			output: 'email',
			subject: __('Itinerary Confirmation')()
		});
	}
});

Path.map('#/Confirmation/error/:errorMsg').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.CheckoutNav.showConfirmation(true);
	WebBooker.Checkout.errorMsg(this.params['errorMsg']);
	var sale = WebBooker.Sale.get('sale');
	if(sale) {
		WebBooker.Checkout.sale.json(sale);
	}
});


Path.map('#/Itinerary/:saleID/:email').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	jQuery('#cart-sidebar .retrieve').hide(); //dumbness
	//var sale = WebBooker.Sale.get('sale');
	//if(sale) WebBooker.Itinerary.sale = $ar.SaleModel(sale);
	WebBooker.Itinerary.sale.id(parseInt(this.params['saleID']));
	WebBooker.Itinerary.sale.leadGuest.email( this.params['email'] );
	WebBooker.Itinerary.load();
	WebBooker.Itinerary.show(true);
});


Path.map('#/Itinerary').to(function() {
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	jQuery('#cart-sidebar .retrieve').hide(); //dumbness
	WebBooker.Itinerary.show(true);
});

Path.map('#/PasswordResetRequest').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Agent.passwordResetRequest(true);
	jQuery('#passwordResetRequest input').focus();
	jQuery('html, body').animate({ scrollTop: 0 }, 500);
	WebBooker.postMessage('scroll_to=0');
});

Path.map('#/PasswordReset/:login/:key').to(function(){
	WebBooker.showInitLoader(false);
	WebBooker.hideAllScreens();
	WebBooker.Agent.passwordReset(true);
	WebBooker.Agent.user(this.params['login']);
	WebBooker.Agent.key(this.params['key']);
});

// Settings
WebBooker.Settings = new Store('WebBooker_Settings_' + wb_global_vars.webBookerID);

// Store sale info locally
WebBooker.Sale = new Store('WebBooker_Sale_' + wb_global_vars.webBookerID);

WebBooker.Contact = {
	show: ko.observable(false),
	content: ko.observable('')
};

WebBooker.About = {
	show: ko.observable(false),
	content: ko.observable('')
};

// postMessage for iFrame 
WebBooker.postMessage = function(message) {
	if(WebBooker.bootstrap.parent_url) {
		var matcher = new RegExp(WebBooker.bootstrap.parent_url, 'gi');
		if(typeof window.parent !== 'undefined' && typeof window.parent.postMessage == 'function' && matcher.test(window.parent.location.origin)){
			window.parent.postMessage(message, WebBooker.bootstrap.parent_url);
		}
	}
};

jQuery.fn.typeahead.Constructor.prototype.show = function () {
	var pos = jQuery.extend({}, this.$element.offset(), {
		height: this.$element[0].offsetHeight
	}),
	menu = this.$menu,
	elem = this.$element;
	menu.show(function(){
		menu.insertAfter(elem);
		if(pos.top + pos.height + menu.outerHeight() > window.outerHeight && pos.top - menu.outerHeight() > jQuery(window).scrollTop()){
			menu.css({
	          top: 0 - menu[0].offsetHeight + 25
	        , left: 0
	        })	
		}else{
			menu.css({
	          top: pos.height
	        , left: 0
	        })
		}
		
	});
	this.shown = true;
	return this;
}

// Binding Handlers
ko.bindingHandlers.collapseSidebarBox = {
	init: function(element, valueAccessor) {
		setTimeout(function(){
		    if(!jQuery(element).siblings('.collapse-me').is(':hidden')){
		        jQuery(element).children('i').removeClass('icon-chevron-down');
				jQuery(element).children('i').addClass('icon-chevron-up');
			}
		}, 2000);
		jQuery(element).click(function(e) {
			e.preventDefault();
			jQuery(this).siblings('.collapse-me').slideToggle();
			jQuery(this).children('i').toggleClass('icon-chevron-down icon-chevron-up');
			var title = jQuery(this).attr('title');
			title = (title == __('Show')()) ? __('Hide')() : __('Show')();
			jQuery(this).attr('title', title);
			return false;
		});
	}
};

ko.bindingHandlers.hotelTypeahead = {
	init: function(element, valueAccessor) {
		var option = valueAccessor()['value'],
			saved_query = '',
			elem = jQuery(element),
			no_results;
		if(WebBooker.bootstrap.agencyID == 1260) return false;
		jQuery(element).typeahead({
			source: function(query,process) {
				if(query.length < 3 || query == saved_query) {
					if(!query.length) {
						option(null);
					}
					return [];
				}

				saved_query = query;
				option(null);
				
				var searchArgs = {
					object: 'hotel',
					property: 'post_title',
					query: query
				};

				if( WebBooker.Cart.items().length > 0 ){
					searchArgs.activities = [];
					acts = WebBooker.Cart.items();
					for( var ne = 0; ne < acts.length; ne++ ){
						if( jQuery.inArray( acts[ne].activity, searchArgs.activities ) == -1 )
							searchArgs.activities.push( acts[ne].activity );
					}
				}
				
				WebBooker.API.request('lookup','liveSearch', searchArgs,
				function(data){
					var names = [];
					var mappedObjs = jQuery.map(data.items,
						function(item) {
							item.name = item.name.trim();
							var n = item.name + ' - ';
							if ( item.hotel_st ) n = n + item.hotel_st + ', ';
							n += item.hotel_country;
							names.push(n);
							return $ar.HotelModel(item);
						}
					);
					if (data.items.length) {
						WebBooker.Checkout.hotels(mappedObjs);
						no_results = false;
					console.log("Found hotels:",WebBooker.Checkout.hotels(),"Process:",process,"names:",names);
						process(names);
					} else {
						no_results = true;
						process([]);
						jQuery(elem).after('<ul class="typeahead dropdown-menu no-results" style="top: 55px; left: 0px; display: block">' +
								           '<li class="active"><a href="#">No Results Found</a></li>' +
									   '</ul>');
					}
				});
			},
			property: 'name',
			items: 8,
			updater: function(item) {
				console.log("Checking hotels updater:",item);
				option(null);
				for(var r = 0; r < WebBooker.Checkout.hotels().length; r++){
					var hotel = WebBooker.Checkout.hotels()[r];
					if(hotel.generatedName == item){
						option(hotel);
						jQuery(element).val(hotel.name);
						return item.trim();
					}
				}
			},
			matcher: function(item) {
				// we return true because the ajax livesearch handles the matching.
				return true;
			}
		});
		
		elem.keydown(function(e){
			if(e.keyCode == '13' && no_results){
				e.preventDefault();
				return;
			}
			
			jQuery('.typeahead.dropdown-menu.no-results').remove();
		});
		
		elem.on('blur',function(){
			jQuery('.typeahead.dropdown-menu.no-results').remove();
		});
	},
	update: function(element, valueAccessor) {
		var option = valueAccessor()['value'];
		if(option()) {
			jQuery(element).val(option().name);
		}
	}
};

ko.bindingHandlers.processingBtn = {
	update: function(element, valueAccessor) {
		if(valueAccessor()) {
			jQuery(element).prepend('<i class="icon-processing"></i> ');
		} else {
			var content = jQuery(element).html();
			content.replace('<i class="icon-processing"></i> ', '');
			jQuery(element).html(content);
		}
	}
};

ko.bindingHandlers.scrollTopOnClick = {
	init: function(element, valueAccessor) {
		jQuery(element).click(function(e) {
			jQuery('html, body').animate({ scrollTop: 0 }, 500);
			WebBooker.postMessage('scroll_to=0');
		});
	}
};

ko.bindingHandlers.scrollTo = {
	init: function(element, scrollTo) {
		jQuery(element).click(function(e) {
			var offset = jQuery(scrollTo()).offset();
			jQuery('html, body').animate({ scrollTop: offset.top }, 1000);
			WebBooker.postMessage('scroll_to=' + offset.top);
		});
	}
};

ko.bindingHandlers.fadeOpacity = {
	init: function(element, valueAccessor) {
		jQuery(element).css({opacity: 0.2});
	},
	update: function(element, valueAccessor) {
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		shouldDisplay ? jQuery(element).fadeTo('slow', 1) : jQuery(element).fadeTo('slow', 0.2);
	}
};

ko.bindingHandlers.fadeVisible = {
	init: function(element, valueAccessor) {
		// Start visible/invisible according to initial value
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		jQuery(element).toggle(shouldDisplay);
	},
	update: function(element, valueAccessor) {
		// On update, fade in/out
		var shouldDisplay = ko.utils.unwrapObservable(valueAccessor());
		shouldDisplay ? jQuery(element).fadeIn() : jQuery(element).fadeOut();
	}
};

// Utilities
// Calculates the distance between two locations.
function getDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180,
		radlat2 = Math.PI * lat2/180,
		radlon1 = Math.PI * lon1/180,
		radlon2 = Math.PI * lon2/180,
		theta = lon1-lon2,
		radtheta = Math.PI * theta/180,
		dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	
	return +(Math.round(dist + 'e+2') + 'e-2');
}

// Converts numeric degrees to radians
function toRad(value) {
	return value * Math.PI / 180;
}

function sortNearestDistance(a,b) {
	return a.distance - b.distance;
}

function formatTime(date) {
	var d = new Date(date),
		hh = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds(),
		dd = " am",
		h = hh;

	if (h >= 12) {
		h = hh-12;
		dd = " pm";
	}
	if (h == 0) {
		h = 12;
	}
	m = m<10?"0"+m:m;

	s = s<10?"0"+s:s;

	/* if you want 2 digit hours: */
	//h = h<10?"0"+h:h;

	return h + ':' + m + dd;

  //  var pattern = new RegExp("0?"+hh+":"+m+":"+s);
   // return date.replace(pattern,h+":"+m+":"+s+" "+dd)
}

function createTimestamp(now) {
	var year = "" + now.getFullYear();
	var month = "" + (now.getMonth() + 1);if (month.length == 1) {month = "0" + month;}
	var day = "" + now.getDate();if (day.length == 1) {day = "0" + day;}
	var hour = "" + now.getHours();if (hour.length == 1) {hour = "0" + hour;}
	var minute = "" + now.getMinutes();if (minute.length == 1) {minute = "0" + minute;}
	var second = "" + now.getSeconds();if (second.length == 1) {second = "0" + second;}
	return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
}

function cleanTimestamp(stamp) {
	return stamp.replace(/-/g, '/');
}

function getDateString(date) {
	var month = '' + (date.getMonth() + 1);
	var day = '' + date.getDate();

	if (month.length == 1) {
		month = '0' + month;
	}
	if (day.length == 1) {
		day = '0' + day;
	}

	return month + '/' + day + '/' + date.getFullYear();
}

function createCookie(name, value, days){
	var expires = '',
		date = new Date();

	if(days) {
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = '; expires=' + date.toGMTString();
	} else {
		expires = '';
	}

	document.cookie = name + '=' + value + expires + '; path=/;domain=' + window.location.host + "; secure";
}

function readCookie(name){
	var nameEQ = name + '=',
		ca = document.cookie.split(';');

	for(var i=0; i<ca.length; i+=1) {
		var c = ca[i];
		while(c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}
		if(c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}
	return null;
}

function deleteCookie(name) {
	createCookie(name, '', -1);
}

function betterRounding(amt) {
	return Math.round( parseFloat(amt) * 100 ) / 100;
}

//javascript i18n
var __ = (function(){
	var langFile = ko.observable(),
		ret = function(){
			return (function(args){
				var _val = args[0];
				var _params = Array.prototype.slice.call(args,1);
				return ko.computed({
					read: function(){
						var text = '' + _val;
						if(langFile() && langFile()[_val]){
							text = langFile()[_val].translation;
						}

						//basic sprintf feature
						var bits = text.split('%'),
							out = bits[0],
							re = /^([ds])(.*)$/;

						for(var i=1; i<bits.length; i++){
							p = re.exec(bits[i]);
							if(!p || _params[i-1]===null) continue;
							if(p[1] == 'd')
								out += parseFloat(ko.utils.unwrapObservable(_params[i-1]), 10);
							else if(p[1] == 's')
								out += _params[i-1];
							out += p[2];
						}
						return out;
					},
					write: function(){
						_val = arguments[0];
						if(arguments.length > 1){
							_params = Array.prototype.slice.call(arguments,1);
						}

					}
				});
			})(arguments);
		};
	ret.load = function(post_id, i18n) {
		WebBooker.API.getPOFile({
			post_id: post_id,
			i18n: i18n
		}, function(data) {
			if(data.status != 1) return false;
			langFile(data.po);
			return true;
		});
	};

	return ret;
})();

var fn_format_money = function() {
	var val, elem, format;

	//format comes in as:
	//{ symbol: string, title: string, rate: number, thousands: string, decimal: string }
	if(arguments.length < 2){
		throw new Error("fn_format_money called with too few parameters");
	}

	if(arguments.length < 3){
		val = arguments[0];
		format = arguments[1];
		elem = {};
	} else {
		elem = arguments[0];
		val = arguments[1];
		format = arguments[2];
	}

	if(typeof val == 'function')
		val = ko.utils.unwrapObservable(val());

	if(!val || isNaN(val)) val = 0;

	var pad = function(num,dec,toLeft){ var str = ''+num; while(str.length<dec) str=toLeft?'0'+str:str+'0'; return str; },
		value = ko.utils.unwrapObservable(val),
		decimalPlaces = 2,
		pow = Math.pow(10,decimalPlaces),
		before, curr, after = [];
	value = Math.round(val*(format.rate||1) * pow)/pow;
	curr = Math.floor(Math.abs(value));
	while(Math.floor(curr/1000)){
		after.push(pad(curr%1000,3,1));
		curr = (curr/1000)&~0;
	}
	after.push(curr);
	curr = after.reverse().join(format.thousands||',');
	value = (format.symbol||'$') + (val < 0?'-':'') + curr + (format.decimal||'.') + pad(Math.abs(Math.round((value*pow)%pow)), decimalPlaces,1);
	elem.innerHTML = value;
	return value;
};

//formats numbers based on the location's currency
ko.bindingHandlers.money = {
	init : function(elem, val){
		var format = WebBooker.selectedCurrency()||{};
		fn_format_money(elem, val, format);
	},
	update : function(elem, val){
		var format = WebBooker.selectedCurrency()||{};
		fn_format_money(elem, val, format);
	}
};

//still formats, but ignores the rate
ko.bindingHandlers.clean_money = {
	init : function(elem, val){
		var format = WebBooker.selectedCurrency()||{},
			newFormat = {
				decimal: format.decimal||'.',
				rate: 1,
				symbol: format.symbol||'',
				thousands: format.thousands||',',
				title: format.title||''
			};

		fn_format_money(elem, val, newFormat);
	},
	update : function(elem, val){
		var format = WebBooker.selectedCurrency()||{},
			newFormat = {
				decimal: format.decimal||'.',
				rate: 1,
				symbol: format.symbol||'',
				thousands: format.thousands||',',
				title: format.title||''
			};

		fn_format_money(elem, val, newFormat);
	}
};
/* TODO, figure out why this is here
jQuery(document).ready(function(){
	 if(jQuery.browser.msie){
		 jQuery(function() {
			jQuery('[placeholder]').focus(function() {
			  if(jQuery(this).val() == jQuery(this).attr('placeholder')) {
				jQuery(this).val('');
			  }
			}).blur(function() {
			  if (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder')) {
				jQuery(this).val(jQuery(this).attr('placeholder'));
			  }
			}).blur();
		});
	}
});
*/


$ar.Notification = (function(){
	var visible = 6000,
		remove = 300;

	var notice = function(msg,level){
		var _self = {};
		_self.elem = document.createElement('div');
		_self.elem.className = 'entry';
		if(/(error|success)/.test(level))
			_self.elem.className += ' ' + level;
		if(ko && ko.isObservable(msg))
			msg = msg();
		_self.elem.innerHTML = msg;
		if(/^error$/.test(level)){
			var close = document.createElement('p');
			close.className = 'closeClick';
			close.innerHTML = __('click to close')();
			_self.elem.appendChild(close);
		}

		var clearElem = function(){
			if(_self.time) clearTimeout(_self.time);
			jQuery(_self.elem).off('mousedown',clearElem);
			_self.elem.className += ' remove';
			setTimeout(function(){
				_self.elem.parentNode.removeChild(_self.elem);
			},remove);
		};
		jQuery(_self.elem).mousedown(clearElem);
		//if(!/(error)/.test(level)){
			_self.time = setTimeout(clearElem,visible);
		//}

		setTimeout(function(){ _self.elem.className += ' active'; },5);
		return _self.elem;
	};

	var self = function(msg,level){
		if(!/(error|success)/.test(level))
			level = 'normal';
		if(ko && ko.isObservable(msg) && Object.prototype.toString.call(msg()) == '[object Array]')
			msg = msg();
		if(Object.prototype.toString.call(msg) != '[object Array]')
			msg = [msg];

		for(var ni = 0; ni < msg.length; ni++){
			if(self.preinit){
				self.prequeue.push({ msg: msg[ni], level: level });
				continue;
			}
			self.elem.insertBefore(new notice(msg[ni],level),self.elem.firstChild);
		}
	};
	self.elem = null;
	self.prequeue = [];
	self.preinit = setInterval(function(){
		if(!document.body) return;
		clearInterval(self.preinit);
		if(!self.elem){
			self.elem = document.createElement('div');
			self.elem.className = 'notifications';
			document.body.appendChild(self.elem);
		}
		for(var ni = 0; ni < self.prequeue.length; ni++){
			self.elem.insertBefore(new notice(self.prequeue[ni].msg,self.prequeue[ni].level),self.elem.firstChild);
		}
		self.preinit = null;
	},30);

	return self;
})();

$ar.data_mapper = function(map,data){
	if(!map || !data) return;
	for(var ni in map){
		if(!data.hasOwnProperty(ni)) continue;
		data[map[ni]] = data[ni];
		delete data[ni];
	}

	return data;
};
$ar.load = function(path,callback){
	var d = document,
		js = /\.js$/.test(path),
		elem;

	if(!/\.(js|css)$/.test(path)) return;
	elem = d.createElement(js?'script':'link');
	elem[js?'src':'href'] = path;
	if(!js) elem.rel = 'stylesheet';

	if(typeof callback == 'function')
		elem.onload = callback;

	d.body.appendChild(elem);
};
$ar.Model = function(def, _json){
	var ret = {};
	for(var ni in def){
		ret[ni] = def[ni];
	}
	ret._json_callback = null;
	ret.json = function(json){
		var ni, no;
		if(!json){
			var obj = {}, tmp, _tmp;
			for(ni in def){
				tmp = ko.utils.unwrapObservable(ret[ni]);

				if(/^_/.test(ni) || typeof tmp == 'function'){
					continue;
				}

				//gotta look for models WITHIN models
				if(!tmp){
					obj[ni] = tmp;
				} else if(tmp.hasOwnProperty && tmp.hasOwnProperty('json')){
					obj[ni] = tmp.json();
				} else if(Object.prototype.toString.call(tmp) == '[object Array]'){
					_tmp = [];
					for(no = 0; no < tmp.length; no++){
						if(tmp[no].hasOwnProperty && tmp[no].hasOwnProperty('json')){
							_tmp[no] = tmp[no].json();
						} else {
							_tmp[no] = tmp[no];
						}
					}
					obj[ni] = _tmp;
				} else if(typeof tmp == 'object'){
					for(no in tmp){
						if(tmp[no].hasOwnProperty && tmp[no].hasOwnProperty('json'))
							tmp[no] = tmp[no].json();
					}
					obj[ni] = tmp;
				} else {
					obj[ni] = tmp;
				}
			}
			return obj;
		}
		if(ret._json_callback) ret._json_callback(json);
		for(ni in json){
			if(!def.hasOwnProperty(ni))
				continue;
			if(ko.isObservable(ret[ni])){
				ret[ni](ret.cleanNumbers(json[ni]));
			} else {
				ret[ni] = ret.cleanNumbers(json[ni]);
			}
		}
		return ret;
	};
	ret.extend = function(_def,_json){
		for(var ni in _def){
			if(def[ni]) continue;
			if(/^(json|_|cleanNumbers|extend)/.test(ni)) continue;
			def[ni] = ret[ni] = _def[ni];
		}
		if(_json) ret.json(_json);
		return ret;
	};
	ret.cleanNumbers = function(obj){
		if(!obj)
			return obj;
		if(!isNaN(parseFloat(obj)) && isFinite(obj))
			return parseFloat(obj);
		if(typeof obj == 'string'){
			if(obj == 'null' || obj == '')
				obj = null;
			return obj;
		}
		if(typeof obj == 'function')
			return obj;
		for(var ni in obj)
			obj[ni] = ret.cleanNumbers(obj[ni]);
		return obj;
	};

	if(_json) ret.json(_json);

	return ret;
};
$ar.MiniActivityModel = (function() {
	var cache = {};
	return function( data ) {
		if( cache[( data || { id: 0 } ).id]) {
			return cache[data.id];
		}
		var that = $ar.Model({
			id: 0,
			activityID: 0,
			title: '',
			slug: '',
			i18n: 'en_US',
			destination: '',
			destinationID: 0,
			shortDesc: null,
			duration: null,
			tags: [],
			prices: [],
			r2: 0,
			times: [],
			display_price: 0
		});

		that.thumbnail_url = ko.observable();
		that.slug = ko.observable( that.slug );
		that.url = ko.computed(function() {
			return WebBooker.bootstrap.wb_url + '/' + that.slug() + '/';//added terminating slash to avoid a redirect and 400ms
		});

		that.link = function() {
			window.location.href = that.url();
		};

		that._json_callback = function( beans ) {
			//need to normalize this on the backend
			if( beans.json_input.id ){
				beans.id = beans.json_input.id;	
			}else{
				beans.id = null;
			}
			beans.prices = beans.json_input.prices;
			beans.times = beans.json_input.times;

			if ( beans.prices && beans.prices.length ) {
				beans.r2 = beans.prices[0].r2;
			}

			if ( beans.id ) {
				cache[beans.id] = that;
			}
			if ( beans.json_input && beans.json_input.media ) {
				var media = beans.json_input.media, na, featured;
				for( na in media ) {
					if ( media[na].type != 'image' || !media[na].hash) continue;
					if(media[na].hasOwnProperty('featured') && media[na].featured == 'true'){
						that.thumbnail_url(WebBooker.mediaServer+'/media/'+media[na].hash+'/thumbnail/height/'+200);
						break;
					}
					if(!that.thumbnail_url() && media[na].url){
					  that.thumbnail_url(WebBooker.timthumb + 'tth/' + WebBooker.thumbnailHeight + '/' + basename(media[na].url));
					  break;
					}else if(media[na].hash){
					  that.thumbnail_url(WebBooker.mediaServer+'/media/'+media[na].hash+'/thumbnail/height/'+200);
					}
				} 
				if ( beans.id ) {
					cache[beans.id] = that;
				}
			}
		};

		that.json( data );

		return that;
	};
})();
$ar.SearchResult = function(data) {
	var that = $ar.MiniActivityModel( data ),
		ni;
	that.active_days = ko.computed(function(){
		if(!that.times || !that.times.length)
			return '';
		var days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			out = [];
		for ( ni = 0; ni < that.times.length; ni += 1 ) {
			if( that.times[ni].start && !days.hasOwnProperty( that.times[ni].start.day ) )
				days[that.times[ni].start.day] = __( that.times[ni].start.day.substr(0,3) )();
		}
		//sort on key
		for(ni in days) {
			out.push(days[ni]);
		}
		out.sort( function( a, b ) {
			return d[a.name] > d[b.name];
		} );

		if( out.length == 7 ) {
			return __('Every day')();
		} else {
			return out.join(', ');
		}
	});

	return that;
};
$ar.Taxonomy = function(data){
	var that = $ar.Model({
		name: '',
		__name: '',
		slug: '',
		term_id: 0
	},data);
	that.selected = ko.observable(false);
	that.__name = __(that.name);
	that.name = ko.observable(that.name);
	return that;
};
$ar.Geocoder = (function() {
	var that = {
		geocoder: function() {
			return new google.maps.Geocoder();
		},
	
		geocode: function(object, callback) {
			that.geocoder().geocode(
				object,
				function(results, status) {
					if(status == google.maps.GeocoderStatus.OK) {
						callback(results);
					}
					else {
						WebBooker.errorMsg('ERROR: Can not geocode address.');
					}
				}
			);
		}
	};
	return that;
})();
jQuery(document).ready(function(){
	setTimeout(function(){
		jQuery('.collapse-me input[type="text"]').each(function(){
			if (jQuery(this).val())
				jQuery(this).closest('.collapse-me').show();
		});

		jQuery('.collapse-me select').each(function(){
			if (jQuery(this).val())
				jQuery(this).closest('.collapse-me').show();
		});

		jQuery('.collapse-me input:checked').each(function(){
			jQuery(this).closest('.collapse-me').show();
		});
	}, 2000);

	
	jQuery("#search-keywords").keypress(function(event){
		if(event.keyCode == 13){
			jQuery("#searchActivitiesButton").click();
		}
	});
});
/**
 *	ActivityRez Web Booking Engine
 *	API Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 5858 B

WebBooker.API = {
	raw: function(url,data,callback){
		var args = {
			type: 'POST',
			async: true,
			data: data
		};

		if(WebBooker.bootstrap.crossDomain){
			args.url = url;
			args.dataType = 'jsonp';
			args.crossDomain = true;
		} else {
			args.url = url;
			args.dataType = 'json';
			args.crossDomain = false;
		}

		jQuery.ajax(args).always(function(result){
			if(typeof callback == 'function'){
				callback(result);
			}
		});
	},
	request : function(service,action,params,callback){
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			service: service,
			action: action,
			nonce: WebBooker.bootstrap.nonce,
			data: params
		},callback);
	},
	queryCatalog: function(callback) {
		var destination = WebBooker.Catalog.search_params.destination();
		if(WebBooker.bootstrap['search_destination'] && WebBooker.bootstrap['search_destination'].length > 0){
			destination = {name: ko.observable(WebBooker.bootstrap['search_destination'])};
		}

		var keywords = WebBooker.Catalog.search_params.keywords(),
			tag = WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
			category = WebBooker.Catalog.search_params.category(),
			startDate = WebBooker.Catalog.search_params.date_start(),
			endDate = WebBooker.Catalog.search_params.date_end(),
			minPrice = WebBooker.Catalog.search_params.price_min(),
			maxPrice = WebBooker.Catalog.search_params.price_max(),
			moods = [];
			for(var i = 0; i < WebBooker.Catalog.search_params.moods().length; ++i)
				moods.push(WebBooker.Catalog.search_params.moods()[i].name());

		WebBooker.API.request('lookup','activities',{
			i18n: WebBooker.bootstrap['i18n'],
			des: (destination) ? destination.name : '',
			s: (keywords) ? keywords : '',
			tag: (tag) ? tag : '',
			moods: (moods) ? moods : '',
			category: (category) ? category : '',
			startDate: (startDate) ? startDate : '',
			endDate: (endDate) ? endDate : '',
			minPrice: minPrice,
			maxPrice: maxPrice,
			featured: WebBooker.Catalog.search_params.featured(),
			count: WebBooker.Catalog.pageSize(),
			page: WebBooker.Catalog.pageIndex(),
			sort: WebBooker.Catalog.search_params.sort().sort,
			sortDir: WebBooker.Catalog.search_params.sort().sort_dir,
			showInWB: WebBooker.bootstrap.webBookerID,
			reseller2ID: WebBooker.bootstrap.reseller2_id,
			reseller2_userID: WebBooker.bootstrap.user_id
		},callback);
	},
	
	fetchImages: function(id,callback){
		jQuery.ajax({
		    url: WebBooker.mediaServer + '/media/' + WebBooker.bootstrap.nonce + '/meta/all/activity_id/' + id,
		    type: 'GET',
			async: true
		}).always(function(result){
			if(typeof callback == 'function'){
				callback(result);
			}
		});
	},
	
	getFeaturedActivities: function (dest, callback) {
		WebBooker.API.request('lookup','activities',{
			i18n: WebBooker.bootstrap['i18n'],
			des: dest,
			featured: true,
			count: 100,
			showInWB: WebBooker.bootstrap.webBookerID
		},callback);
	},

	getActivity: function(id, date, callback) {
		WebBooker.API.request('lookup','getActivity',{
			ID: id,
			reseller2ID: WebBooker.bootstrap.reseller2_id,
			reseller2_userID: WebBooker.bootstrap.user_id,
			showInWB: WebBooker.bootstrap.webBookerID,
			date: date
		},callback);
	},

	betterGetActivity: function(params, callback){
		params['showInWB'] = WebBooker.bootstrap.webBookerID;
		if(params['id']){
			params['ID'] = params['id'];
			delete params['id'];
		}
		if(WebBooker.bootstrap.reseller2_id){
			params['reseller2ID'] = WebBooker.bootstrap.reseller2_id;
		}
		if(WebBooker.bootstrap.user_id){
			params['reseller2_userID'] = WebBooker.bootstrap.user_id;
		}

		WebBooker.API.request('lookup','getActivity',params,callback);
	},

	checkAvailability: function (params, callback) {
		WebBooker.API.request('lookup','inventory',{
			activityID: params.id,
			timestamp: params.datetime,
			locationID: WebBooker.bootstrap.webBookerID,
			resellerID: WebBooker.bootstrap.reseller2_id
		},callback);
	},

	getSale: function(params, callback) {
		WebBooker.API.request('checkOut','getSale',{
			saleID: params.saleID,
			email: params.email
		},callback);
	},

	saveSale: function(sale, callback) {
		sale.i18n = WebBooker.selectedLanguage().i18n;
		sale.source = 'web';
		sale.currency = WebBooker.selectedCurrency().title;
		sale.locationID = WebBooker.bootstrap.webBookerID;
		sale.balance_due = 0;
		if(WebBooker.bootstrap.user_id){
			sale.reseller2ID = WebBooker.bootstrap.reseller2_id;
			sale.reseller2_userID = WebBooker.bootstrap.user_id;
		}

		WebBooker.API.request('checkOut','saveSale',sale,function(sale){
			if(sale.status == 1 && typeof callback == 'function')
				callback(sale);
		});
	},

	saveTicket: function(ticket, callback) {
		WebBooker.API.request('checkOut','saveTicket',{
			ID: ticket.id,
			activityID: ticket.aid,
			datetime: ticket.timestamp,
			saleID: ticket.sid,
			locationID: WebBooker.bootstrap.webBookerID,
			guest_type_id: ticket.guest_type_id,
			guest_type: ticket.guest_type,
			leadGuest: ticket.leadGuest,
			cfa: ticket.cfa,
			cfa_name: ticket.cfa_name,
			cfa_number: ticket.cfa_number,
			firstName: ticket.firstName,
			lastName: ticket.lastName,
			currency: WebBooker.selectedCurrency().title,
			guest_hotel: ticket.guest_hotel,
			guest_room: ticket.guest_room
		}, function(tix){
			if(tix.status == 1 && typeof callback == 'function'){
				callback(tix);
			} else {
				WebBooker.Checkout.errorMsg(tix.msg);
			}
		});
	},

	saveDiscount: function(discount, callback) {
		WebBooker.API.request('checkOut','saveDiscount',{
			ticketID: discount.ticketID,
			saleID: discount.saleID,
			amount: discount.amount,
			percent: discount.percent,
			scope: discount.scope,
			reason: discount.reason,
			approval: discount.approval,
			discount_id: discount.discount_id,
			locationID: WebBooker.bootstrap.webBookerID
		}, function(disc){
			if(disc.status == 1 && typeof callback == 'function'){
				callback(disc);
			}
		});
	},

	saveOption: function(option, callback) {
		WebBooker.API.request('checkOut','saveOption',{
			ID: option.id,
			ticketID: option.ticketID,
			saleID: option.saleID,
			name: option.name,
			value: option.value,
			choice: option.choice,
			fee: option.fee,
			type: option.type,
			locationID: WebBooker.bootstrap.webBookerID
		}, function(opt){
			if(opt.status == 1 && typeof callback == 'function'){
				callback(opt);
			}
		});
	},

	savePayment: function(payment, callback) {
		WebBooker.API.request('checkOut','savePayment',{
			saleID: payment.sid,
			source: 'web',
			payment_type_id: payment.payment_type_id,
			locationID: WebBooker.bootstrap.webBookerID,
			amount: payment.amount,
			payee: payment.payee,
			currency: WebBooker.selectedCurrency().title,
			options: payment.options,
			comment: payment.comment,
			authorization_ID: payment.authorization_ID
		},callback);
	},

	doItineraryAction: function(params, callback) {
		params.all = 1;
		params.wb = true;
		params.resellerID = WebBooker.bootstrap.reseller2_id;
		params.locationID = WebBooker.bootstrap.webBookerID;

		WebBooker.API.request('arezConfirmation','printConfirm',params,callback);
	},

	loginAgent: function(params, callback){
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			service: 'userLogin',
			action: 'login',
			nonce: WebBooker.bootstrap.nonce,
			user: params.user,
			pass: params.pass
		},callback);
	},

	logoutAgent: function(params, callback){
		WebBooker.API.request('userLogin','logout',null,function(){
			window.location.reload();
		});
	},

	signupAgent: function(params, callback) {
		var parser = document.createElement('a');
		parser.href = WebBooker.bootstrap.api_url;
		var url = 'https://' + parser.hostname + '/ar-core/api/company/user/arcAdd';
		WebBooker.API.raw(url,{
			token: WebBooker.bootstrap.nonce,
			display_name: params.display_name,
			email: params.email,
			pass: params.password,
			confirm_pass: params.verify_password,
			arc_number: params.arc,
			reseller1ID: WebBooker.bootstrap.reseller1_id,
			booker_site: true,
			cache_buster: new Date().getTime()
		},callback);
	},
	
	passwordReset: function(params, callback){
		var parser = document.createElement('a');
		parser.href = WebBooker.bootstrap.api_url;
		var url = 'https://' + parser.hostname + '/ar-core/api/user/activate_password';
		WebBooker.API.raw(url,{
			token: WebBooker.bootstrap.nonce,
			email: atob(params.login),
			password: params.password,
			key: params.key
		},callback);
	},
	
	passwordResetRequest: function(params, callback) {
		var parser = document.createElement('a');
		parser.href = WebBooker.bootstrap.api_url;
		var url = 'https://' + parser.hostname + '/ar-core/api/user/reset_password';
		WebBooker.API.raw(url,{
			token: WebBooker.bootstrap.nonce,
			catalog_id: WebBooker.bootstrap.webBookerID,
			site: WebBooker.bootstrap.wb_url,
			email: params.user
		},callback);
	},
	
	resetPassword: function(params, callback) {
		WebBooker.API.request('userLogin', 'pw_reset', params, callback);
	},

	validateDiscountCode: function(promo_code, callback) {
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			nonce: WebBooker.bootstrap.nonce,
			service: 'validateDiscount',
			code: promo_code,
			pos: WebBooker.bootstrap.webBookerID
		},callback);
	},

	geocodeAddress: function(address, callback) {
		WebBooker.API.raw(WebBooker.bootstrap.api_url,{
			nonce: WebBooker.bootstrap.nonce,
			service: 'geocodeAddress',
			address: address
		},callback);
	},

	getAgentCommissions: function(params, callback) {
		WebBooker.API.request('arezReporting','getMyCommissions',{
			startDate: params.startDate,
			endDate: params.endDate,
			tz: params.tz,
			wb: true
		},function(data){
			if(data.status == 1 && typeof callback == 'function'){
				callback(data);
			}
		});
	},

	updateCurrency : function(locationID, callback){
		WebBooker.API.request('lookup','getExchangeRates',{
			locationID: locationID
		},callback);
	},

	getPOFile: function(params, callback) {
		WebBooker.API.request('webBooker','getPO',{
			webBookerID: params.post_id,
			i18n: params.i18n
		},callback);
	},

	changeI18N: function(params){
		WebBooker.API.request('webBooker','changeI18N',{
			i18N: params.i18n
		}, function(data){
			if(data.status == 1) window.location.reload(true);
		});
	}
};
/**
 *	ActivityRez Web Booking Engine
 *	Catalog File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

 //compresses to 4498 B

WebBooker.Catalog = (function(){
	var self = {};

	self.show = ko.observable(false);
	self.show_mini_search = ko.observable(false);
	self.isSearching = ko.observable(false),
	self.hasSearched = ko.observable(false),
	self.sortToggle = ko.observable(1),

	self.toggle_mini_search = function(evt){
		self.show_mini_search(!self.show_mini_search());
	};

	self.search_filter_data = {
		destinations: ko.observableArray([]),
		sub_destinations: ko.observableArray([]),
		categories: ko.observableArray([]),
		tags: ko.observableArray([]),
		moods: ko.observableArray([]),
		sorts: ko.observableArray([{
			id: 1,
			sort: 'title',
			sort_dir: 'asc',
			label: __('Alphabetical: A to Z')
		}, {
			id: 2,
			sort: 'title',
			sort_dir: 'desc',
			label: __('Alphabetical: Z to A')
		}, {
			id: 3,
			sort: 'price',
			sort_dir: 'asc',
			label: __('Price: Low to High')
		}, {
			id: 4,
			sort: 'price',
			sort_dir: 'desc',
			label: __('Price: High to Low')
		}])
	};
	self.search_params = {
		sort: ko.observable({
			id: 1,
			sort: 'title',
			sort_dir: 'asc',
			label: __('Alphabetical: A to Z')
		}),
		keywords: ko.observable(),
		date_start: ko.observable(),
		date_end: ko.observable(),
		price_min: ko.observable(0),
		price_max: ko.observable(10000),
		destination: ko.observable(),
		sub_destination: ko.observable(),
		featured: ko.observable(),
		category: ko.observable(),
		tag: ko.observable(),
		tag_private: ko.observable(false),
		moods: ko.computed({
			read: function(){
				var checked = [],
					moods = self.search_filter_data.moods(),
					ni;
				for(ni = 0; ni < moods.length;ni++){
					if(!moods[ni].selected()) continue;
					checked.push(moods[ni]);
				}
				return checked;
			},
			write: function(val){
				var moods = self.search_filter_data.moods(),
					ni,no;
				val = val||[];
				if(Object.prototype.toString.call(val)!='[object Array]') return;
				for(ni = 0; ni < moods.length; ni++){
					moods[ni].selected(false);
				}
				for(ni = 0; ni < val.length; ni++){
					if(!val[ni].term_id) continue;
					for(no = 0; no < moods.length; no++){
						if(moods[no].term_id != val[ni].term_id) continue;
						moods[no].selected(true);
						break;
					}
				}
			}
		})
	};
	
	self.backup_search_params = {
		keywords: '',
		destinaton: '',
		moods: '',
		category: '',
		tag: '',
		date_start: '',
		date_end: ''
	};

	self.searchResults = ko.observableArray([]);
	self.totalResults = ko.observable(0);

	self.pageIndex = ko.observable(false);
	self.pageSize = ko.observable(15);

	self.maxPageIndex = ko.computed(function(){
		return Math.ceil(self.totalResults() / self.pageSize());
	});

	self.pages = ko.computed(function() {
		var maxPages = Math.min(self.maxPageIndex(),12),
			pages = [],
			ni = self.pageIndex(), i;

		for(i = 1; i <= maxPages; i++) {
			pages.push({
				index: i,
				current: ni == i
			});
		}

		return pages;
	});

	self.totalResultsText = ko.computed(function() {
		if(self.totalResults() == 1 && WebBooker.selectedLanguage().i18n != 'ja')
			return self.totalResults() + ' ' + __('Activity')();
		return self.totalResults() + ' ' + __('Activities')();
	});

	self.load = function(){
		self.isSearching(true);
		self.hasSearched(false);

		if( self.checkUpdateParams() ) {
			self.searchResults([]);
			self.pageIndex(1);
		} else {
			WebBooker.API.queryCatalog(function(results) {
				self.isSearching(false);
				self.hasSearched(true);
				self.totalResults(0);

				var destination = WebBooker.Catalog.search_params.destination(),
					category = WebBooker.Catalog.search_params.category(),
					keywords = WebBooker.Catalog.search_params.keywords(),
					tag = WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
					moods = WebBooker.Catalog.search_params.moods(),
					dstart = WebBooker.Catalog.search_params.date_start(),
					dend = WebBooker.Catalog.search_params.date_end();

				// Analytics hook
				WebBooker.Analytics.trigger( {
					keywords: keywords ? keywords : false,
					destinaton: destination ? destination.name() : false,
					moods: ( moods.length ) ? moods : false,
					category: category ? category : false,
					tag: tag ? tag : false,
					date_start: dstart ? dstart : false,
					date_end: dend ? dend : false,
					total_results: results.total ? results.total : 0
				}, 'action_Search' );
			
				if( results.status != 1 ) {
					if( results.status == 0 && results.total > 0 ) {
						self.totalResults( self.searchResults().length  );
					} else if( results.status == 0 && results.total == 0 ) {
						self.searchResults([]);
					}
					return;
				}
				self.processResults( results );
				self.isSearching(false);
				// keep previous search paramaters
				self.backupParams();
			});
		}
	};

	self.processResults = function(results) {
		self.totalResults( results.total );

		var data = results.data, ni;

		for ( ni = 0; ni < data.length; ni += 1 ) {
			self.searchResults.push( new $ar.SearchResult( data[ni] ) );
		}
	};

	self.checkUpdateParams = function() {
		var ret = false,
			params = self.getParams();
		for( var k in self.backup_search_params ) {
			curr = typeof params[k]=='undefined' ? '' : params[k];
			prev = self.backup_search_params[k];
			if( self.pageIndex() > 1 && prev != curr ) {
				ret = true;
				break;
			}
		}
		return ret;
	};

	self.backupParams = function() {
		var params = self.getParams();
		jQuery.each( params, function( key, value ) {
			self.backup_search_params[key] = typeof value == 'undefined' ? '' : value;
		});
	};
	
	self.getParams = function() {
		var params = {
			destination: WebBooker.Catalog.search_params.destination(),
			category: WebBooker.Catalog.search_params.category(),
			keywords: WebBooker.Catalog.search_params.keywords(),
			tag: WebBooker.Catalog.search_params.tag_private() ? WebBooker.Catalog.search_params.tag_private() : WebBooker.Catalog.search_params.tag(),
			moods: WebBooker.Catalog.search_params.moods(),
			dstart: WebBooker.Catalog.search_params.date_start(),
			dend: WebBooker.Catalog.search_params.date_end()
		}
		return params;
	};

	self.loadWithFilters = function() {
		if(window.location.href != WebBooker.bootstrap.wb_url + '/#/Search') {
			window.location.href = WebBooker.bootstrap.wb_url + '/#/Search';
			return;
		}
		if(window.location.hash != '#/Search') {
			window.location.hash = '#/Search';
		}

		self.searchResults([]);
		if(self.pageIndex() != 1) {
			self.pageIndex(1);
		} else {
			self.load();
		}
	};

	self.clearFilters = function(){
		self.search_params.keywords('');
		self.search_params.date_start('');
		self.search_params.date_end('');
		self.search_params.destination(null);
		self.search_params.sub_destination(null);
		self.search_params.category(null);
		self.search_params.tag(null);
		self.search_params.moods([]);
		self.search_params.price_min(0);
		self.search_params.price_max(10000);
		jQuery('#price-range-slider').val([0,10000]);
	};

	self.init = function() {
		// load the parameters from the cookie
		var cookie_grab = function( fdata, pdata, m, m_on ) {
			m_on = m_on || 'id';
			m = WebBooker.Settings.get(m);
			if( !m ) return;
			var no = self.search_filter_data[fdata](), ni;
			for( ni = 0; ni < no.length; ni += 1 ) {
				if( no[ni][m_on] != m[m_on] ) continue;
				self.search_params[pdata]( no[ni] );
				break;
			}
		}, bootstrap_grab = function( args ) {
			var no = WebBooker.bootstrap[ args.boot_source ], ni;
			
			for ( ni = 0; ni < no.length; ni += 1 ) {
				// if no bootstrapped value, abort.
				if ( !WebBooker.bootstrap[ args.search_name ] ) return false;
				
				// otherwise continue as usual.
				var m = decodeEntities( WebBooker.bootstrap[ args.search_name ] ).toLowerCase(),
					b = decodeEntities( no[ni].name() ).toLowerCase();
					
				if ( b != m ) {
					if ( args.filter_name === 'tag' ) {
						self.search_params.tag_private( m );
					}
					continue;
				}
				
				if ( args.filter_name !== 'moods' ) {
					self.search_params[ args.filter_name ]( args.use_name ? no[ ni ].name() : no[ ni ] );
					break;
				} else {
					// we have to handle moods a little differently.
					for ( var ne = 0; ne < self.search_filter_data[ args.filter_name ]().length; ne += 1 ) {
						if ( self.search_filter_data[ args.filter_name ]()[ ne ].name().toLowerCase() != m ) continue;
						self.search_filter_data[ args.filter_name ]()[ ne ].selected(true);
					}
				}
			}
			return true;
		},
		decodeEntities = (function() {
		  // this prevents any overhead from creating the object each time
		  var element = document.createElement('div');
		
		  function decodeHTMLEntities (str) {
		    if(str && typeof str === 'string') {
		      // strip script/html tags
		      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
		      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
		      element.innerHTML = str;
		      str = element.innerHTML;
		      element.innerHTML = '';
		    }
		
		    return str;
		  }
		
		  return decodeHTMLEntities;
		})(),
		has_bootstrapped = false,
		min_price = WebBooker.Settings.get('SearchParams_MinPrice'),
		max_price = WebBooker.Settings.get('SearchParams_MaxPrice');

		self.search_params.date_start(WebBooker.Settings.get('SearchParams_StartDate') || null);
		self.search_params.date_end(WebBooker.Settings.get('SearchParams_EndDate') || null);
		self.search_params.keywords(WebBooker.Settings.get('SearchParams_Keywords') || null);
		self.search_params.price_min(min_price || 0);
		self.search_params.price_max(max_price || 10000);
		jQuery('#price-range-slider').val([ min_price || 0, max_price || 10000 ]);

		//grab this bit from the bootstrap
		for ( var i = 0; i < WebBooker.bootstrap.wb_destinations.length; i += 1 ) {
			WebBooker.bootstrap.wb_destinations[i].name( decodeEntities( WebBooker.bootstrap.wb_destinations[i].name() ) );
		}
		self.search_filter_data.destinations(WebBooker.bootstrap.wb_destinations);
		self.search_filter_data.categories(WebBooker.bootstrap.cats);
		self.search_filter_data.tags(WebBooker.bootstrap.tags);
		self.search_filter_data.moods(WebBooker.bootstrap.moods);
		
		cookie_grab('sorts','sort','SearchParams_Sort');
		
		if ( bootstrap_grab( { filter_name: 'destination', search_name: 'search_destination', boot_source: 'wb_destinations' } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'category', search_name: 'search_category', boot_source: 'cats', use_name: true } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'tag', search_name: 'search_tag', boot_source: 'tags', use_name: true } ) ) {
			has_bootstrapped = true;
		}
		if ( bootstrap_grab( { filter_name: 'moods', search_name: 'search_mood', boot_source: 'moods' } ) ) {
			has_bootstrapped = true;
		}
		
		// if we didn't receive any bootstrapped search values,
		// now we see if local storage has any.
		if ( !has_bootstrapped ) {
			//self.search_params.destination(WebBooker.Settings.get('SearchParams_Destination') || null);
			cookie_grab('destinations','destination','SearchParams_Destination');
			self.search_params.category(WebBooker.Settings.get('SearchParams_Category') || null);
			self.search_params.tag(WebBooker.Settings.get('SearchParams_Tag') || null);
			var moods = WebBooker.Settings.get('SearchParams_Moods') || [],
				mods = self.search_filter_data.moods() || [],
				ni, no;
			for ( ni = 0; ni < mods.length; ni += 1 ) {
				for ( no = 0; no < moods.length; no += 1 ) {
					if ( moods[ no ] == mods[ ni ].name() ) {
						mods[ ni ].selected( true );
					}
				}
			}
		}

		// set pageIndex, if bootstrap initially has destination search..
		if(	has_bootstrapped && WebBooker.bootstrap['search_destination'] ) {
			self.pageIndex(1);
		}
		
		// Init subscriptions after loading parameters
		// So we aren't accidentally saving the initial bindings.
		self.search_params.sort.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_Sort', value.id);

			if( self.pageIndex() !== false ) {
				// Refresh to subscribe self.pageIndex(), if sortToggle is changed
				if(	self.pageIndex() == 1 && self.sortToggle() != value.id ) {
					self.pageIndex(false);
				}
				self.searchResults([]);
				self.pageIndex(1);
				self.sortToggle(value.id);
			}
		});
		self.search_params.destination.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_Destination', value || '');
		});
		self.search_params.category.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Category', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.category() && !self.search_params.tag() && !jQuery('.select-category').hover())
						jQuery('#search-filters-categories .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.tag.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Tag', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.category() && !self.search_params.tag() && !jQuery('.select-tag').hover())
						jQuery('#search-filters-categories .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.date_start.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_StartDate', value || '');
			//checks to see if the mouse is over the section
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.date_start() && !self.search_params.date_end() && !jQuery('#ui-datepicker-div').is(':visible')) {
						// if the mouse has not been in the section, for 1 sec and nothing is checked
						jQuery('#search-filters-date .collapse-me').slideUp();
					}
				}, 1000);
			});
		});
		self.search_params.date_end.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_EndDate', value || '');
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(!self.search_params.date_start() && !self.search_params.date_end() && !jQuery('#ui-datepicker-div').is(':visible'))
						jQuery('#search-filters-date .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.search_params.price_min.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_MinPrice', value || '');
		});
		self.search_params.price_max.subscribe(function(value) {
			WebBooker.Settings.set('SearchParams_MaxPrice', value || '');
		});
		self.search_params.keywords.subscribe(function(value){
			WebBooker.Settings.set('SearchParams_Keywords', value || '');
		});
		self.search_params.moods.subscribe(function(value){
			var saver = [],
				moods = self.search_params.moods(),
				ni;
			for(ni = 0; ni < moods.length; ni += 1) {
				saver.push(moods[ni].name());
			}
			WebBooker.Settings.set('SearchParams_Moods', saver);
			jQuery('#search-activities-form').mouseleave(function(){
				setTimeout(function(){
					if(self.search_params.moods().length < 1)
						jQuery('#search-filters-moods .collapse-me').slideUp();
				}, 1000);
			});
		});
		self.pageIndex.subscribe(function(value){
			// prevent API call twice
			if( self.pageIndex() !== false ) {
				self.load();
			}
		});
	};

	return self;
})();
/**
 *	ActivityRez Web Booking Engine
 *	Shopping Cart
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 2391 B

$ar = $ar||{};
WebBooker = WebBooker||{};

WebBooker.Cart = (function(){
	var self = {
		cart: null,
		items: ko.observableArray([])
	};

	self.init = function(){
		self.cart = new Store('WebBooker_Cart_' + WebBooker.bootstrap.webBookerID);
		var items = self.cart.get('Items'),
			timestamp = self.cart.get('Timestamp');

		// that honkey has expired
		if(!timestamp || Math.floor(((new Date()).getTime() - (new Date(timestamp)).getTime())/3600000) > 48){
			self.items([]);
			self.cart.reset();
		} else if(items){
			var _items = [],ni;
			for(ni = 0; ni < items.length; ni++){
				_items.push($ar.CartItemModel(items[ni]));
			}
			self.items(_items);
		}

		self.items.subscribe(function(){
			self.saveToLocal();
		});
	};

	self.saveToLocal = function(){
		var _items = self.items(), items = [], ni;
		for(ni = 0; ni < _items.length; ni++){
			_items[ni].inCart = true;
			items.push(_items[ni].json());
		}
		self.cart.set('Items', items);
		self.cart.set('Timestamp', new Date());
	};

	self.viewCart = function(){
		window.location.href = WebBooker.bootstrap.wb_url + '/#/Checkout';
	};

	self.subtotal = ko.computed(function(){
		var items = self.items(),
			sub = 0,
			ni;

		for(ni = 0; ni < items.length; ni++) {
			sub += items[ni].subtotal();
		}

		return sub;
	});

	return self;
})();
$ar.CartItemModel = function(data){
	var that = new $ar.Model({
		inCart: false,
		activity: 0,
		date: null,
		i18n_date: null,
		time: null,

		url: '',
		title: '',
		destination: '',

		guests: []
	});
	
	that._json_callback = function(beans){
		if(!beans) return;
		beans.guests = beans.guests||[];

		var ni;
		for(ni = 0; ni < beans.guests.length; ni++){
			beans.guests[ni] = $ar.CartGuestModel(beans.guests[ni]);
		}
	};
	that.json(data);

	that.guests = ko.observableArray(that.guests||[]);
	that.remove = function() {
		if(!that.inCart) return;
		that.inCart = false;
		var items = WebBooker.Checkout.sale.items(),
			guests = that.guests(),
			ni;

		for(ni = 0; ni < guests.length; ni++){
			guests[ni].qty(0);
		}
		WebBooker.Cart.items.remove(that);
		for(ni = 0; ni < items.length; ni++) {
			if(!items[ni].cartItem || items[ni].cartItem != that) {
				continue;
			}
			WebBooker.Checkout.sale.items.remove(items[ni]);
		}
		setTimeout(function() {
			WebBooker.Checkout.updatePmtAmounts();
		}, 100);
		return;
	};

	that.subtotal = ko.computed(function(){
		var guests = that.guests()||{},
			subtotal = 0,
			rate = (WebBooker.selectedCurrency().rate||1)*100,
			ni;

		for(ni = 0; ni < guests.length; ni++){
			subtotal += Math.round(parseFloat(guests[ni].price())*rate)/100 * guests[ni].qty();
		}

		return subtotal/(WebBooker.selectedCurrency().rate||1);
	});
	
	that.processActivityForAnalytics = function( include_options ) {
		var total_guests = 0,
			types = [],
			options = [];
			
		for ( ni = 0; ni < that.guests().length; ni += 1 ) {
			total_guests += that.guests()[ni].qty();
			types.push({
				name: that.guests()[ni].name,
				qty: that.guests()[ni].qty()
			});
		}
		
		return {
			title: that.json().title,
			id: that.activity,
			date: that.date,
			time: that.time,
			total_guests: total_guests,
			guest_types: types
		};
	};
	
	that.i18n_date = function(){
		var time = new Date(that.date + (that.time.startTime === 'Open' ? '' : ' ' + that.time.startTime)),
			i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
			date;
			
		switch( i18n ) {
			case 'ja' 	:	//iso
			case 'zh_SG':
			case 'zh_TW':
			case 'zh_HK':
			case 'zh_CN':
			case 'ko_KR':
				date =  time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
				break;
			case 'en_GB':	//euro
			case 'en_AU':
			case 'en_AG':
			case 'cs_CZ':
			case 'da_DK':
			case 'nl_NL':
			case 'fi_FI':
			case 'fr_FR':
			case 'fr_BE':
			case 'fr_CA':
			case 'de_DE':
			case 'de_AT':
			case 'el_GR':
			case 'it':
			case 'in_IN':
			case 'ms_MY':
			case 'ml_IN':
			case 'no_NO':
			case 'nb_NO':
			case 'nn_NO':
			case 'pl_PL':
			case 'pt_BR':
			case 'pt_PT':
			case 'ru_RU':
			case 'es_ES':
			case 'es_AR':
			case 'es_MX':
			case 'es':
			case 'sv_se':
			case 'th':
			case 'vi':
				date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
				break;
			case 'en_US':	//us original
			case 'en_CA':
			default:
				date = (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
				break;
		}
		return date;
	};

	return that;
};
$ar.CartGuestModel = function(data){
	var that = new $ar.Model({
		id: 0,
		name: '',
		qty: 0,
		price: 0,
		r2: 0
	},$ar.data_mapper({
		'guest_type_id':'id',
		'guest_type':'name',
		'amount':'price'
	},data));

	that.price = ko.observable(that.price||0);
	(function(){
		var _qty = ko.observable(that.qty||0),
			_validate;
		that.qty = ko.computed({
			read: function(){ return _qty(); },
			write: function(nval){
				if(typeof _validate == 'function' && !_validate(nval))
					return;

				_qty(nval);
				WebBooker.Cart.saveToLocal();
			}
		});
		that.qty.setValidate = function(val){
			_validate = val;
		};
		that.qty.real = function(){ return _qty; };
	})();

	that.subtotal = ko.computed(function(){
		var rate = WebBooker.selectedCurrency().rate||1;
		return (Math.round(parseFloat(that.price())* rate * 100)/100 * that.qty()) / rate;
	});
	
	that.name = __( that.name )();

	return that;
};
/**
 *	ActivityRez Web Booking Engine
 *	Homepage Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

WebBooker.Homepage = {
	show: ko.observable(false),
	featured_destinations: ko.observableArray([]),
	init: function() {}
};

WebBooker.Homepage.show.subscribe(function(newValue){
	if( newValue === true && WebBooker.Homepage.featured_destinations().length === 0 ) {
		if ( WebBooker.bootstrap.use_custom_home ) return;
		
		var des = [], no;
		
		for ( no = 0; no < WebBooker.bootstrap.wb_destinations.length; no += 1 ) {
			des.push( WebBooker.bootstrap.wb_destinations[no].id );
		}
		
		WebBooker.API.getFeaturedActivities( des, function(results) {
			if ( results.status == 1 ) {
				var dests = [],
					ni, no;
					
				for ( ni = 0; ni < results.data.length; ni += 1 ) {
					if ( jQuery.inArray( results.data[ni].destination, dests ) < 0 ) {
						dests.push( results.data[ni].destination );
					}
				}
				dests.sort(function(a, b) {
					if ( a > b ) {
						return 1;
					}
					if ( a < b ) {
						return -1;
					}
					return 0;
				});
				for ( ni = 0; ni < dests.length; ni += 1 ) {
					var d = dests[ni];
					dests[ni] = {
						destination: d,
						activities: ko.observableArray([])
					};
					for ( no = 0; no < results.data.length; no += 1 ) {
						if ( dests[ni].destination == results.data[no].destination ) {
							dests[ni].activities.push( new $ar.MiniActivityModel( results.data[no] ) );
						}
					}
				}
				
				WebBooker.Homepage.featured_destinations( dests );
			}
		});
	}
});
/**
 *	ActivityRez Web Booking Engine
 *	Activity JS Functions File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 8469 B

WebBooker.MiniCart = (function(){
	var self = {};
	self.activity = ko.observable(null);
	self.cartItem = ko.observable(null);
	self.checkingInventory = ko.observable(false);
	self.date = ko.observable('');
	self.time = ko.observable('');
	self.blackoutDays = [];
	self.times = ko.observableArray([]);
	self.inventory = ko.observable();
	self.cfa = ko.observable();
	self.canBook = ko.observable(true);
	self.unlBooking = ko.observable(false);
	self.showTicketsLeft = true;
	
	self.getDeadline = function() {
		var unit = 60000, //60,000 milliseconds in a minute
			cfa = parseInt( self.cfa(), 10 ) === 1 ? true : false,
			//cutoff values are converted to minutes
			activity_deadline = ( self.activity().cutoff_hours ? parseInt( self.activity().cutoff_hours, 10 ) * 60 : 0 ) + ( self.activity().cutoff_minutes ? parseInt( self.activity().cutoff_minutes, 10 ) : 0 ),
			default_deadline = ( WebBooker.bootstrap.default_cutoff_hrs ? parseInt( WebBooker.bootstrap.default_cutoff_hrs, 10 ) * 60 : 0 ) + ( WebBooker.bootstrap.default_cutoff_mins ? parseInt( WebBooker.bootstrap.default_cutoff_mins, 10 ) : 0 ),
			_date;
			
		if( self.activity().book_until_end ) {
			if ( self.time().endTime === 'Open' ) {
				_date = new Date( self.date() );
				_date.setHours(23,59,59);
			} else {
				_date = new Date( self.date() + ' ' + self.time().endTime );
			}
		} else {
			if ( self.time().startTime === 'Open' ) {
				_date = new Date( self.date() );
			} else {
				_date = new Date( self.date() + ' ' + self.time().startTime );
			}
		}
		
		// if CFA off, then respect activity deadline when activity > default
		if( !cfa ) {
			_date = new Date( _date.getTime() - ( ( activity_deadline > default_deadline ? activity_deadline : default_deadline ) * unit ) );
		// otherwise, default deadline is always deadline.
		} else {
			_date = new Date( _date.getTime() - ( default_deadline * unit ) );
		}
		
		return _date;
	};

	self.guests = ko.computed(function(){
		if(!self.cartItem() || !Object.keys(self.cartItem().guests()).length) {
			return [];
		}
		return self.cartItem().guests();
	});
	
	self.ticketsLeft = ko.computed(function() {
		if ( !self.showTicketsLeft ) {
			return false;
		}
		
		var inv = self.inventory(),
			cfa = self.cfa();
		
		if ( !inv || cfa ) {
			return false;
		}
		
		if ( !inv.inventory || inv.inventory === 0 ) {
			return false;
		}
		
		var max = inv.available || 0,
			guests = self.guests(),
			ni;
			
		for ( ni = 0; ni < guests.length; ni += 1 ) {
			max -= guests[ni].qty();
		}
		
		if ( inv.inventory > 0 && max > 0 ) {
			if ( max <= 5 ) {
				return __('Only')() + ' ' + max + ' ' + __('tickets left!')();
			} if ( max === 1 ) {
				return __('Only')() + ' 1 ' + __('ticket left!')();
			} else {
				return false;
			}
		} else if ( inv.inventory > 0 && max <= 0 ) {
			return __('No more tickets left!')();
		}
		return false;
	});
	
	self.canCheckout = ko.computed(function(){
		if ( WebBooker.Cart.items().length > 0 ) {
			return true;
		}
		if ( self.cartItem() ) {
			var total = 0,
				g = self.guests(),
				ni;
			for ( ni = 0; ni < g.length; ni += 1 ) {
				total += g[ni].qty();
			}
			if ( total > 0 ) {
				return true;
			}
		}
		return false;
	});

	self.availabilityStatus = ko.computed(function() {
		if(self.checkingInventory()) {
			return __('Checking')() + '...';
		}
		if(self.date()) {
			if(self.time()) {
				if(self.canBook()) {
					return __('Available')();
				}
				return __('Unavailable')();
			}
			return __('Select a time')();
		}
		return __('Select a date')();
	});

	self.isAvailable = function(nval, pid) {
		function doNotification() {
			jQuery('#activity-subtotal').addClass('pulsate');
			setTimeout(function() {
				jQuery('#activity-subtotal').removeClass('pulsate');
			}, 1000);
			/*if(!self.cartUpdateNotification) {
				self.cartUpdateNotificationStart();
			} else {
				clearTimeout(self.cartUpdateNotification);
				self.cartUpdateNotificationStart();
			}*/
		};
		
		switch(true) {
			case ( nval < 0 ):
				return false;
				break;
				
			case ( parseInt(self.cfa(), 10) === 1 ):
				doNotification();
				return true;
				break;
				
			case ( self.inventory().inventory == 0 ):
				doNotification();
				return true;
				break;
		}

		var max = self.inventory().available, prices = self.cartItem().guests(), ni;
		for ( ni = 0; ni < prices.length; ni += 1 ) {
			if( prices[ni].id == pid )
				continue;
			max -= prices[ni].qty();
		}

		if ( nval > max ) {
			$ar.Notification( __('No more tickets left.'), 'error' );
			return false;
		}
		
		doNotification();
		return true;
	};
	
	self.cartUpdateNotification = false;
	self.cartUpdateNotificationStart = function() {
		self.cartUpdateNotification = setTimeout( function() {
			$ar.Notification( __('Cart Updated'), 'success' );
		}, 500 );
	};
	
	self.checkout = function(){
		if( !self.addToCart() ) {
			return false;
		}
		jQuery('html, body').animate({ scrollTop: 0 }, 500);
		window.location.href = WebBooker.bootstrap.wb_url + '/#/Checkout';
	};
	self.addToCart = function(){
		if(!self.cartItem()) return true;
		var g = self.cartItem().guests(),
			qty = 0,
			ni;
		for(ni = 0; ni < g.length; ni++){
			qty += g[ni].qty();
		}
		if(!qty) return true;
		if(self.cartItem().inCart) return true;
		self.cartItem().inCart = true;
		WebBooker.Cart.items.push(self.cartItem());

		// Analytics hook.
		//WebBooker.Analytics.trigger(event.target, 'action_addToCart');
		
		return true;
	};

	self.checkInventory = function() {
		var date = self.date(),
			_date = new Date( self.date() ),
			time = self.time().startTime == 'Open' ? '' : self.time().startTime,
			saved_time = self.time();
			
		self.checkingInventory(true);
		if(!saved_time){
			jQuery('#activity-availability > span').effect('pulsate', {times: 2}, 500);
			self.checkingInventory(false);
			return;
		}
			
		self.cartItem(null);
		
		WebBooker.API.checkAvailability({
			id: self.activity().id,
			datetime: createTimestamp(new Date(self.date() + ' ' + time))
		}, function(data){
			self.checkingInventory(false);
			
			data.inventory = parseInt(data.inventory, 10);
			data.available = parseInt(data.available, 10);
			data.cfa = parseInt(data.cfa, 10);
			
			if(data.status > 0){
				self.inventory(data);
				self.cfa(data.cfa);
			} else if(data.status < 0 && data.status != -10){
				self.inventory(false);
				self.canBook(false);
				return false;
			}
			
			var i = WebBooker.Cart.items(),
				deadline = self.getDeadline(),
				today = new Date(),
				ni;
				
			// the real beauty of simplifying this is we separate the deadline from the inventory checks,
			// so that after getting the deadline above (which accounts for CFA as well), we only have to determine
			// below whether certain conditions are met and if we are over or under the deadline.
			// Ryan Freeman
			switch(true) {
				// case #1 in matrix / line 3
				// cfa off, max inv is set, no available inventory: do not book
				case ( data.inventory > 0 && !data.cfa && data.available <= 0 ):
					self.canBook(false);
					self.inventory(false);
					console.log('failed at case #1');
					return false;
					break;
				
				// max inv not set, none available, deadline hasn't passed yet: allow booking (unlimited bookings)
				case ( data.inventory <= 0 && data.available <= 0 && deadline >= today ):
					if ( data.cfa ) {
						//set ticket cfa
					} else {
						//unset ticket cfa
					}
					self.canBook(true);
					self.unlBooking(true);
					console.log('passed at case #2');
					break;
				
				// max inv is set, inventory available, deadline hasn't passed yet: allow booking
				case ( data.inventory > 0 && data.available > 0 && deadline >= today ):
					self.canBook(true);
					console.log('passed at case #3');
					break;
					
				// max inv is set, no more inventory available, cfa on, and deadline hasn't passed yet: allow booking
				case ( data.cfa && data.inventory > 0 && data.available <= 0 && deadline >= today ):
					self.canBook(true);
					//set ticket cfa
					console.log('passed at case #4');
					break;
					
				// max inv is set, inventory available, deadline already past: do not book
				case ( data.inventory > 0 && data.available > 0 && deadline < today && !data.cfa ):
					self.canBook(false);
					self.inventory(false);
					console.log('failed at case #5');
					return false;
					break;
					
				//default behavior is to prevent booking
				default:
					self.canBook(false);
					self.inventory(false);
					console.log('failed at default case');
					return false;
					break;
			}
			
			//wraps the validation script to maintain object's presence in the cart
			var valFunc = function(obj){
				obj.qty.setValidate(function(nval){
					if(!self.isAvailable(nval, obj.id)||!self.cartItem())
						return false;
					var g = self.cartItem().guests(),
						tickets = 0,
						ni;
					//here we're only grabing tickets from other types
					//to see what's a valid number for this type
					for(ni = 0; ni < g.length; ni++){
						if(g[ni].id == obj.id) continue;
						tickets += g[ni].qty();
					}

					if(nval + tickets > 0 && !self.cartItem().inCart){
						self.cartItem().inCart = true;
						WebBooker.Cart.items.push(self.cartItem());
					} else if(nval+tickets <= 0 && self.cartItem().inCart){
						WebBooker.Cart.items.remove(self.cartItem());
						self.cartItem().inCart = false;
					}
					return true;
				});
			};

			var _ci;
			//check for thineself in the cart
			for(ni = 0; ni < i.length; ni++){
				if(i[ni].activity != self.activity().id) {
					continue;
				}
				if(i[ni].date != self.date() || i[ni].time.startTime != self.time().startTime) {
					continue;
				}
				_ci = i[ni];
				break;
			}
			if(!_ci){
				_ci = new $ar.CartItemModel({
					inCart: false,
					activity: self.activity().id,
					date: self.date(),
					time: self.time(),
					title: self.activity().title,
					url: WebBooker.bootstrap.wb_url + '/' + self.activity().slug + '/',
					destination: self.activity().destination
				});
			}
			var g = _ci.guests(), temp,found;
			for(ni = 0; ni < data.prices.length; ni++){
				temp = data.prices[ni].guest_type_id;
				found = false;
				for(no = 0; no < g.length; no++){
					if(g[no].id != temp) continue;
					g[no].json(data.prices[ni]);
					valFunc(g[no]);
					found = true;
				}
				if(!found){
					g.push($ar.CartGuestModel(data.prices[ni]));
					valFunc(g[g.length-1]);
				}
			}
			
			self.checkingInventory(false);
			_ci.guests(g);
			self.cartItem(_ci);
		});
	};
	
	//check all the days in the calendar against the dates in blackoutDays then check to see if the activity is available on that day
	self.dayAvailable = function(date) {
		var weekday = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ],
			times = self.activity().times,
			today = new Date(),
			diff = Math.floor( ( today.getTime() - date.getTime() ) / 86400000 ),
			ni, lifespanDateStart, lifespanDateEnd, ds, de;
			
		if('0000-00-00 00:00:00' == self.activity().date_start){
			ds = '2001/01/01 00:00:00';
		}else{
			ds = cleanTimestamp( self.activity().date_start );
		}
		if('0000-00-00 00:00:00' == self.activity().date_end){
			de = '2037/01/01 00:00:00';
		}else{
			de = cleanTimestamp( self.activity().date_end );
		}
		
		lifespanDateEnd = new Date(de);
		lifespanDateStart = new Date(ds);
			
		today.setHours(0, 0, 0);
		
		// reject old dates
		if(today > date && diff != 0) {
			return [false];
		}
		// check lifespan dates
		if(lifespanDateStart && lifespanDateEnd ){
			if( lifespanDateStart.getTime() > date.getTime() || lifespanDateEnd.getTime() < date.getTime() ){
				return [false];
			}
		}
		
		// check blackout days
		for(ni = 0; ni < (self.blackoutDays||[]).length; ni++){
			if(self.blackoutDays[ni].valueOf() != date.valueOf()) {
				continue;
			}
			return [false];
		}
		
		var _date = date.valueOf(),
			cutoff_hrs = parseInt(self.activity().cutoff_hours || 0),
			cutoff_minutes = parseInt(self.activity().cutoff_minutes || 0),
			cutoff_mins = ( cutoff_hrs * 60 ) + cutoff_minutes,
			book_until_end = self.activity().book_until_end,
			cfa = parseInt( self.cfa(), 10) === 1 ? true : false,
			time,
			time_diff,
			clean,
			start_date,
			end_date,
			_ret = [false];
		
		//reset today to new date for processing below
		today = new Date();
		
		//check the calendar date against all the days the activity is on
		for(ni = 0; ni < times.length; ni++){
			start_date = new Date( times[ni].startDate === '0000-00-00 00:00:00' ? '2001/01/01 00:00:00' : cleanTimestamp( times[ni].startDate ) );
			end_date = new Date( times[ni].endDate === '0000-00-00 00:00:00' ? '2037/01/01 00:00:00' : cleanTimestamp(times[ni].endDate) );
			
			if ( !book_until_end && times[ni].startDayOfWeek && times[ni].startDayOfWeek != weekday[date.getDay()]){
				continue;
			} else if ( book_until_end && times[ni].endDayOfWeek && times[ni].endDayOfWeek != weekday[date.getDay()] ) {
				continue;
			}
			
			if ( start_date > date || end_date < date ) {
				continue;
			}
			
			_ret = [true];
		}
		return _ret;
	};
	self.showDatePicker = function(){
		jQuery('#activity-date .datepicker').datepicker('show');
	};
	self.add = function( item, evt ) {
		item.qty( item.qty() + 1 );
		
		var d = self.cartItem().processActivityForAnalytics();
		
		WebBooker.Analytics.trigger( {
			element: evt.currentTarget,
			title: d.title,
			id: d.id,
			date: d.date,
			time: d.time,
			total_guests: d.total_guests,
			guest_types: d.guest_types
		}, 'action_updateCart' );
	};
	self.remove = function( item, evt ) {
		var d = self.cartItem().processActivityForAnalytics();
		
		WebBooker.Analytics.trigger( {
			element: evt.currentTarget,
			title: d.title,
			id: d.id,
			date: d.date,
			time: d.time,
			total_guests: d.total_guests,
			guest_types: d.guest_types
		}, 'action_removeFromCart' );
		
		item.qty( item.qty() - 1 );
	};
	
	self._grabDays = function(day){
		var times = self.activity().times,
			days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			start_date,
			end_date,
			out = [], ni;
		for(ni = 0; ni < times.length; ni += 1){
			start_date = new Date( times[ni].startDate === '0000-00-00 00:00:00' ? '2001/01/01 00:00:00' : cleanTimestamp(times[ni].startDate) );
			end_date = new Date( times[ni].endDate === '0000-00-00 00:00:00' ? '2037/01/01 00:00:00' : cleanTimestamp(times[ni].endDate) );
			
			if ( start_date > day || end_date < day ) {
				continue;
			}
			
			if(!days.hasOwnProperty(times[ni].startDayOfWeek)) {
				days[times[ni].startDayOfWeek] = {
					name: times[ni].startDayOfWeek,
					times: [],
					name_abbrv: times[ni].startDayOfWeek.substr(0,3)
				};
			}
			
			days[times[ni].startDayOfWeek].times.push({
				startDate: times[ni].startDate,
				endDate: times[ni].endDate,
				startTime: times[ni].startTime,
				endTime: times[ni].endTime
			});
		}
		//sort on key
		for(ni in days) {
			out.push(days[ni]);
		}
		out.sort(function(a,b){
			return d[a.name] > d[b.name];
		});
		return out;
	};
	self.getTimestamp = ko.computed(function() {
		if(!self.date() || !self.time())
			return;
		var time = (self.time().startTime == 'Open') ? '' : self.time().startTime;
		return createTimestamp(new Date(self.date() + ' ' + time));
	});

	self.activity.subscribe(function(activity){
	
		var today = function() {
			var d = new Date();
			var month = ('0' + (d.getMonth() + 1)).slice(-2),
				day = ('0' + d.getDate()).slice(-2);
			return month + "/" + day + "/" + d.getFullYear();
		}

		self.date(today());
		self.blackoutDays = [];
		self.cfa(activity.cfa);

		var blackouts = activity.blackouts||[],
			curr_date, end_date, ni;

		//get the dates for each blackout date range and append them to blackoutDays

		for(ni = 0; ni < blackouts.length; ni++) {
			//generate a list of dates from a range
			curr_date = new Date( cleanTimestamp( blackouts[ni].startDate ) );
			end_date = new Date( cleanTimestamp( blackouts[ni].endDate ) );
			while(curr_date <= end_date){
				self.blackoutDays.push(new Date(curr_date.getTime()));
				curr_date.setDate(curr_date.getDate() + 1);
			}
		}
		// adjust the date picker.
		jQuery('#webbooker-activity-book .datepicker').datepicker({
			numberOfMonths: 1,
			minDate: 0,
			//showOn: 'button',
			buttonImage: WebBooker.bootstrap.plugin_url + '/images/icon-calendar.png',
			dateFormat: 'mm/dd/yy',
			buttonImageOnly: true,
			beforeShowDay: self.dayAvailable
		});
	});
	self.date.subscribe(function(newValue) {
		var activityTimes = [];
		self.inventory([]);
		self.time(null);
		self.times([]);

		if(!newValue) return;
		
		var day = new Date(newValue),
			date = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][day.getDay()],
			days = self._grabDays(day),
			today = new Date(),
			date_diff = Math.floor( ( today.getTime() - day.getTime() ) / 86400000 ),
			book_until_end = self.activity().book_until_end,
			ni,no;
			
		for(ni = 0; ni < days.length; ni++){
			if(days[ni].name != date) continue;

			for(no = 0; no < days[ni].times.length; no++){
			
				var time = days[ni].times[no];

				if ( self.times.indexOf( time ) >= 0 ) {
					continue;
				}
				self.times.push(time);
			}
			
			break;
		}
		self.times.sort( function( a, b ) {
			return new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime);
		} );
		// sort "Open"
		var o = -1;
		for( ni=0; ni < self.times().length; ni++ ) {
			if( jQuery.trim(self.times()[ni].startTime) == 'Open' ) {
				o = ni;
			}
		}
		if( o >= 0 ) {
			var _times = self.times.splice( o, 1 );
			self.times.unshift(_times[0]);
		}
		
		if(self.times().length === 1) {
			self.time(self.times()[0]);
		}
	});
	self.time.subscribe(function(newValue){
		if(newValue){
			self.checkInventory();
		}
	});
	
	return self;
})();

WebBooker.ChildActivityView = function(data){
	var self = {
		title: data.title,
		shortDesc: data.shortDesc,
		url: WebBooker.bootstrap.wb_url + '/' + data.slug + '/',
		display_price: false,
		low: null,
		high: null
	}, ni;

	if(!data.prices) return self;

	for ( ni = 0; ni < data.prices.length; ni += 1 ) {
		if (data.prices[ni].display_price == 1 ) {
			self.display_price = data.prices[ni].amount;
			break;
		}
		if (!self.low || data.prices[ni].amount < self.low ) {
			self.low = data.prices[ni].amount;
		}
		if ( !self.high || data.prices[ni].amount > self.high ) {
			self.high = data.prices[ni].amount;
		}
	}
	
	//self.low = low;
	//self.high = high;
	self.prices = data.prices

	return self;
};
WebBooker.ActivityView = (function(){
	var self = {};
	self.fullScreenShow  = ko.observable(false);
	self.show = ko.observable(false);
	self.invalidLanguage = ko.observable(false);
	self.activity = ko.observable();
	self.children = ko.observableArray([]);
	self.slideshow = ko.observableArray([]);

	self.i18n = function(val){
		WebBooker.API.changeI18N({ i18n: val.i18n });
	};
	
	self.analyticsContinueShopping = function(item, evt) {
		WebBooker.Analytics.trigger( evt.currentTarget, 'action_continueShopping' );
		return true;
	};
	
	self.displayPrice = ko.computed(function() {
		if ( !self.activity() ) return false;
		
		var kids = self.children(),
			prices = self.activity().prices || [],
			price = false,
			i;
		
		if ( kids.length > 0 ) {
			for ( i = 0; i < kids.length; i += 1 ) {
				if ( kids[i].display_price ) {
					price = kids[i].display_price;
					break;
				}
				else if ( !price || kids[i].low < price ) {
					price = kids[i].low;
				}
			}
		} else {
			for ( i = 0; i < prices.length; i += 1 ) {
				if ( prices[i].display_price == 1 ) {
					price = prices[i].amount;
					break;
				}
				else if ( ( !price || prices[i].amount < price ) && prices[i].amount > 0 ) {
					price = prices[i].amount;
				}
			}
		}
		return price;
	});
	
	self.days = ko.computed(function(){
		if(!self.activity()) return;
		if(!(self.activity().times||[]).length) return;

		var times = self.activity().times,
			days = {},
			d = {
				'Sunday': 0,
				'Monday': 1,
				'Tuesday': 2,
				'Wednesday': 3,
				'Thursday': 4,
				'Friday': 5,
				'Saturday': 6
			},
			out = [], ni;
		for(ni = 0; ni < times.length; ni += 1){
			if(!days.hasOwnProperty(times[ni].startDayOfWeek))
				days[times[ni].startDayOfWeek] = {
					name: times[ni].startDayOfWeek,
					times: [],
					name_abbrv: times[ni].startDayOfWeek.substr(0,3)
				};
			days[times[ni].startDayOfWeek].times.push({
				from: times[ni].startDate,
				to: times[ni].endDate,
				time: times[ni].startTime
			});
		}
		//sort on key
		for(ni in days)
			out.push(days[ni]);
		out.sort(function(a,b){ return d[a.name] > d[b.name]; });

		if(out.length == 7){
			return __('Everyday')();
		}
		//make a string
		days = [];
		for(ni = 0; ni < out.length; ni++)
			days.push(__(out[ni].name_abbrv)());
		return days.join(', ');
	});

	self.viewFullSize = function(){
		$ar.load(wb_global_vars['plugin_url'] + '/js/lib/bootstrap-modal-carousel.js', function (){
			self.fullScreenShow(true);
			jQuery('.carousel').carousel({pause: 'hover'});
		});
	};

	self.activity.subscribe(function(activity){
		if(!activity) return;

		jQuery('#activityCarousel').hide();

		self.slideshow([]);
		self.children([]);

		for(ni = 0; ni < (activity.children||[]).length; ni++){
			self.children.push(new WebBooker.ChildActivityView(activity.children[ni]));
		}

		if(!self.children().length){
			//knockout has a rough time keeping up
			setTimeout(function(){
				ko.toJS(activity);
				WebBooker.MiniCart.activity(activity);
			},1);
		}

		//set up the gallery
		if(activity.media && activity.media.length > 0){
			var show = [];
			var columnWidth = jQuery('#webbooker-main').width();
			var makeurl = function(hash, height){
				return WebBooker.mediaServer+'/media/'+hash+'/thumbnail/height/'+height;
			}
			for(ni in activity.media){
				if(activity.media[ni] && activity.media[ni].type == 'image'){
					if(activity.media[ni].url){
						show.push( {
							standard: WebBooker.timthumb + 'tth/400/' + basename(activity.media[ni].url),
							full: WebBooker.timthumb + 'tth/' + WebBooker.galleryImageHeight + '/' + basename(activity.media[ni].url),
							orig: activity.media[ni] 
						} );
					}else if (activity.media[ni].hash) {
						if (activity.media[ni].hasOwnProperty('featured') && activity.media[ni].featured == 'true') {
							if (show.length > 0) {
								show.unshift({
									full : makeurl(activity.media[ni].hash, 700),
									standard : makeurl(activity.media[ni].hash, 400)
								});
							} else {
								show.push({
									full : makeurl(activity.media[ni].hash, 700),
									standard : makeurl(activity.media[ni].hash, 400)
								});
							}
						} else {
							show.push({
								full : makeurl(activity.media[ni].hash, 700),
								standard : makeurl(activity.media[ni].hash, 400)
							});
						}
					}
				}
			}
			self.slideshow(show);
			jQuery('.carousel').carousel({pause: 'hover'});
		}

		// Analytics hook
		WebBooker.Analytics.trigger({
			id: activity.id,
			title: activity.title
		}, 'action_viewActivity');

		if(activity.address_lng && activity.address_lat && !isNaN(activity.address_lng) && !isNaN(activity.address_lat)){
			jQuery(document).ready(function(){
				var map_canvas = document.getElementById('map_canvas');
				if ( map_canvas ) {
					map_canvas.style.width = '100%';
					if(window.innerWidth > 640){
						var mapOptions = {
							zoom: 10,
							center: new google.maps.LatLng(activity.address_lat, activity.address_lng),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false
						};
					} else{
						var mapOptions = {
							zoom: 10,
							center: new google.maps.LatLng(activity.address_lat, activity.address_lng),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: false,
							draggable: false
						};
					}
					map = new google.maps.Map(map_canvas, mapOptions);
					
					new google.maps.Marker({
						position: mapOptions.center,
						map: map,
						title:"Activity Location"
					});
				}
			});
		}

		WebBooker.showInitLoader(false);
		WebBooker.hideAllScreens();
		self.show(true);
		if(!window.isIE){
			$ar.load(wb_global_vars['plugin_url'] + '/js/lib/jquery.qrcode.min.js', function() {
				jQuery('#qrcode').qrcode(document.URL);
			});
		}
	});

	self.init = function(){

		if(!WebBooker.bootstrap.activity) {
			return;
		}
			
		if ( WebBooker.bootstrap.activity.status == -1 ) {
			WebBooker.Catalog.loadWithFilters();
			return;
		}
		self.activity(WebBooker.bootstrap.activity);
		jQuery('.carousel').carousel({pause: 'hover'});
	};

	return self;
})();
/**
 *	ActivityRez Web Booking Engine
 *	Checkout File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 20348 B

$ar = $ar||{};
WebBooker = WebBooker||{};

$ar.CreditCardModel = function(data){
	var that = $ar.Model({
		number: '',
		year: '',
		month: '',
		code: ''
	},$ar.data_mapper({
		'cc_number':'number'
	},data));

	for(var ni in that){
		if(typeof that[ni] == 'function')
			continue;
		that[ni] = ko.observable(that[ni]);
	}

	var luhnCheck = function(s){
		var i, n, c, r;

		// First, reverse the string and remove any non-numeric characters.
		// we're also turing it into an array now
		r = s.replace(/[^\d]/g,'').split("").reverse();
		if (r.length <= 1)
			return false;

		// Now run through each single digit to create a new string. Even digits
		// are multiplied by two, odd digits are left alone. Then add the string
		// digits (13 -> '1' + '3' -> 4)

		n = 0;
		for(i = 0; i < r.length; i++){
			c = parseInt(r[i], 10) * ((i % 2)+1);
			n += c%10 + Math.floor(c/10);
		}

		// If the resulting sum is an even multiple of ten (but not zero), the
		// card number is good.
		if(n > 0 && n % 10 === 0)
			return true;
		return false;
	};

	that.errors = ko.observableArray([]);
	that.numberValidate = function(){
		that.errors([]);
		if(!that.number()){
			that.errors.push(__('Card number is required.')());
		}
		if(!luhnCheck(that.number()) || !that.type()){
			that.errors.push(__('Invalid card number.')());
		}
	};
	that.validate = function(){
		that.numberValidate();
		if(!that.year()){
			that.errors.push(__('Card expiration year is required.')());
		}
		if(!that.month()){
			that.errors.push(__('Card expiration month is required.')());
		}
		if(!that.code()){
			that.errors.push(__('Card security code is required.')());
		}
		return that.errors().length === 0;
	};
	that.type = ko.computed(function(){
		if(/^4[0-9]{12}(?:[0-9]{3})?$/.test(that.number())) {
			return 'visa';
		}
		if(/^5[1-5][0-9]{14}$/.test(that.number())) {
			return 'mastercard';
		}
		if(/^3[47][0-9]{13}$/.test(that.number())) {
			return 'amex';
		}
		if(/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(that.number()) || /^35(?:2[89]|[3-8]\d)([\ \-]?)\d{4}\1\d{4}\1\d{4}$/.test(that.number())) {
			return 'discover';
		}
		return false;
	});

	that.number.subscribe(that.numberValidate);

	return that;
};
$ar.CheckoutItemModel = function(data){
	var that = $ar.Model({
		activity: 0,
		date: null,
		i18n_date: null,
		time: null,
		url: '',
		title: '',
		destination: '',
		directions_url: '',
		instructions: '',
		cfa: false,
		pending: false,
		inventory: 0,
		tickets: [],
		options: [],
		fees: [],
		transportation: [],
		transport: null,
		row_id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
	});
	that._json_callback = function(beans){
		if(!beans) return;

		beans.tickets = beans.tickets||[];
		beans.options = beans.options||[];
		beans.transportation = beans.transportation||[];
		beans.fees = beans.fees||[];
		
		if(beans.cfa && !beans.inventory) {
			beans.pending = 1;
		}

		var ni;
		for(ni = 0; ni < beans.tickets.length; ni++) {
			beans.tickets[ni] = $ar.CheckoutTicketModel(beans.tickets[ni]);
		}
		for(ni = 0; ni < beans.fees.length; ni++) {
			beans.fees[ni] = $ar.FeeModel(beans.fees[ni]);
		}
		for(ni = 0; ni < beans.options.length; ni++) {
			beans.options[ni] = $ar.OptionModel(beans.options[ni]);
		}
		for(ni = 0; ni < beans.transportation.length; ni++) {
			beans.transportation[ni] = $ar.TransportationModel(beans.transportation[ni]);
		}
	};
	that.json(data);

	that.url = ko.observable(that.url);
	that.title = ko.observable(that.title);
	that.destination = ko.observable(that.destination);
	that.instructions = ko.observable(that.instructions);
	that.cfa = ko.observable(that.cfa);
	that.inventory = ko.observable(that.inventory);

	that.copyToAll = ko.observable( (wb_global_vars.guest_copytoall == 'true') ? true : false ); //keep this false. pleasant will lose their shit if this is checked by default.
	that.cartItem = (data?data.cartItem:false)||null;
	that.pending = ko.observable(that.pending);
	that.fees = ko.observableArray(that.fees||[]);
	
	that.transport = ko.observable(that.transport);
	that.transport.subscribe(function(transport) {
		that.makeTransportMaster( that.transportView );
	});
	that.transportation = ko.observableArray(that.transportation||[]);
	that.transportation.subscribe(function(nval){
		var no, ni, out = [], outtix = [], tickets = that.tickets();
		if ( that.transport() ) {
			return false;
		}
		for(no = 0; no < nval.length; no++){
			// don't add transp options that are outside the date range
			var date_start = (nval[no].start && nval[no].start != '0000/00/00 00:00:00') ? (new Date(nval[no].start)).getTime() : false,
				date_end = (nval[no].end && nval[no].end != '0000/00/00 00:00:00') ? (new Date(nval[no].end)).getTime() : false,
				act_date = (new Date(that.date + ' ' + that.time)).getTime();
			
			if ( date_start && date_end ) {
				if ( act_date < date_start || act_date > date_end ) {
					continue;
				}
			} else if ( date_start && !date_end ) {
				if ( act_date < date_start ) {
					continue;
				}
			} else if ( date_end && !date_start ) {
				if ( act_date > date_end ) {
					continue;
				}
			}
			
			out.push($ar.TransportationModel(nval[no].json()));
			outtix.push(nval[no].json());
		}
		that.transportView.transportation( out );
		for ( no = 0; no < tickets.length; no += 1 ) {
			if ( tickets[no].transport() ) {
				continue;
			}
			for ( ni = 0; ni < outtix.length; ni += 1 ) {
				tickets[no].transportView.transportation.push( $ar.TransportationModel( outtix[ni] ) );
			}
		}
	});
	that.transportView = $ar.TransportView();
	that.transportView.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni,
			setTransport = function(item){
				return function(_nval){
					if(!_nval) {
						that.transport( $ar.TransportationModel({
							id: 12345,
							name: 'None',
							amount: 0,
							instructions: 'Select this if the guest doesn\'t need transportation.'
						}) );
					} else {
						that.transport(item);
					}
				};
			};

		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((setTransport)(nval[ni]));
		}
	});
	that.transportView.hotel.subscribe(function(nval){
		if(!nval)
			that.transport(null);
	});
	that.transportView.room.subscribe(function(val) {
		that.makeTransportMaster( that.transportView );
	});
	that.transportView.selectTransport.subscribe(function(val) {
		if ( val == 'false' ) {
			that.makeTransportsFalse();
		} else if ( val === 'empty' ) {
			that.undoTransportMaster();
		} else {
			that.makeTransportMaster( that.transportView );
		}
	});
	that.transportView.row_id = that.row_id;
	
	that.options = ko.observableArray(that.options||[]);
	that.options.subscribe(function(nval){
		var tix = that.tickets(),
			open = false,
			ni, no, out;
		for(ni = 0; ni < nval.length; ni++){
			if(nval[ni].required){
				open = true;
			}
		}
		for(ni = 0; ni < tix.length; ni++){
			if(tix[ni].options().length) continue;
			out = [];
			for(no = 0; no < nval.length; no++){
				out.push($ar.OptionModel(nval[no].json()));
			}
			tix[ni].options(out);
			if(open || ni === 0) {
				tix[ni].showOptions(true);
			}
		}
	});
	that.tickets = ko.observableArray(that.tickets||[]);

	that.guests = ko.computed(function(){
		var tix = that.tickets(),
			guests = {},
			out = [],
			ni,no,fees;
		for(ni = 0; ni < tix.length; ni++){
			if(!guests[tix[ni].id]){
				guests[tix[ni].id] = {
					name: __(tix[ni].name)(),
					price: tix[ni].price(),
					qty: 0
				};
			}
			guests[tix[ni].id].qty++;
		}
		for(ni in guests){
			fees = that.fees()||[];
			guests[ni].fees = 0;
			for(no = 0; no < fees.length; no++){
				if(fees[no].percentage)
					guests[ni].fees += guests[ni].price * guests[ni].qty * fees[no].percentage;
				else
					guests[ni].fees += fees[no].amount * guests[ni].qty;
			}
			guests[ni].total = guests[ni].price * guests[ni].qty;
			out.push(guests[ni]);
		}
		return out;
	}).extend({ throttle: 10 });

	that.validate = function(){
		var valid = true,
			tix = that.tickets(),
			lead = tix[0].options(),
			opt, ni, no;
		for( ni = 0; ni < tix.length; ni++ ) {
			if( that.copyToAll() ) {
				opt = tix[ni].options();
				for(no = 0; no < opt.length; no++){
					opt[no].json(lead[no].json());
				}
			}
			valid = valid && tix[ni].validate();
		}
		return valid;
	};

	//this function is super ugly because of json_input on the activity
	//and the way options are stored on tickets. Guarenteed to break.
	that.parseOptions = function(_json){
		var tix = that.tickets(),
			hash = {},
			opt,ni,no,items;
			
		for(ni = 0; ni < tix.length; ni++)
			hash[tix[ni].ticket_id] = tix[ni];
		for(ni = 0; ni < _json.length; ni++){
			if(!hash.hasOwnProperty(parseInt(_json[ni].ticketID,10))) continue;
			if(_json[ni].type != 'criteria') continue;
			opt = hash[parseInt(_json[ni].ticketID,10)].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].name != _json[ni].name) continue;
				if(/^\s*(dropdown|combo)\s*$/.test(opt[no].type.toLowerCase())){
					items = opt[no].items();
					for(na = 0; na < items.length; na++){
						if(items[na].name == _json[ni].value){
							opt[no].selectedItem(items[na]);
						}
					}
				}
			}
		}
	};

	that.remove = function(){
		if(that.cartItem)
			WebBooker.Cart.items.remove(that.cartItem);
		WebBooker.Checkout.sale.items.remove(that);
	};

	that.removeGuest = function(poo){
		var ni, guests;
		that.tickets.remove(poo);
		if(!that.tickets().length) {
			that.remove();
		} else if( that.cartItem ) {
			guests = that.cartItem.guests();
			for ( ni = 0; ni < guests.length; ni += 1 ) {
				if ( guests[ni].id === poo.id ) {
					guests[ni].qty( guests[ni].qty() - 1 );
				}
			}
		}
	};

	that.ticketTotal = ko.computed(function(){
		var tix = that.tickets(),
			sub = 0,
			ni,no;
		for(ni = 0; ni < tix.length; ni++){
			sub += tix[ni].price();
		}
		return sub;
	}).extend({ throttle: 10 });
	that.optionTotal = ko.computed(function(){
		var tix = that.tickets()||[],
			fees = that.fees()||[],
			toAll = that.copyToAll()&&tix[0]?tix[0].options():false,
			sub = 0,
			ni, no, opt;
		for(ni = 0; ni < tix.length; ni++){
			for(no = 0; no < fees.length; no++){
				sub += Math.round(fees[no].price(tix[ni].price())*100)/100;
			}

			opt = toAll||tix[ni].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].type.toLowerCase() == 'text') continue;
				if(!opt[no].selectedItem()) continue;
				sub += opt[no].selectedItem().fee||0;
			}
		}
		return sub;
	}).extend({ throttle: 10 });
	that.transportTotal = ko.computed(function(){
		var tix = that.tickets(),
			sub = 0,
			ni;
		for(ni = 0; ni < tix.length; ni++){
			if(!tix[ni].transportView.wantsTransport()) continue;
			/*if(that.transportMaster() && that.transportMaster().transport()){
				if ( that.transportMaster().transportView.hotel() ) {
					WebBooker.Checkout.sale.leadGuest.hotel( $ar.HotelModel(that.transportMaster().transportView.hotel().json()) );
					WebBooker.Checkout.sale.leadGuest.room( that.transportMaster().transportView.room() );
				}
				sub += that.transportMaster().transport().amount;
				continue;
			}*/
			if(tix[ni].transport() && tix[ni].transport().amount) {
				sub += tix[ni].transport().amount;
			}
			/*if ( !that.transportMaster() && tix[ni].transport() && tix[ni].transportView.hotel() ) {
				WebBooker.Checkout.sale.leadGuest.hotel( $ar.HotelModel(tix[ni].transportView.hotel().json()) );
				WebBooker.Checkout.sale.leadGuest.room( tix[ni].transportView.room() );
			}*/
		}
		return sub;
	}).extend({ throttle: 10 });
	that.subtotal = ko.computed(function(){
		var sub = that.ticketTotal();
		sub += that.optionTotal();
		sub += that.transportTotal();
		return sub;
	}).extend({ throttle: 10 });
	that.taxTotal = function(discount){
		var tix = that.tickets()||[],
			fees = that.fees()||[],
			toAll = that.copyToAll()&&tix[0]?tix[0].options():false,
			//masterTran = that.transportMaster() && that.transportMaster().transport()?that.transportMaster().transport().amount:false,
			dis = discount||{ rate: 0, amount: 0 },
			taxRate = WebBooker.bootstrap.taxRate,
			sub = 0,
			dis_r = parseFloat(dis.rate),
			dis_a = parseFloat(dis.amount),
			ni, no, tix_sub;

		for(ni = 0; ni < tix.length; ni++){
			tix_sub = tix[ni].price();
			for(no = 0; no < fees.length; no++){
				tix_sub += fees[no].price(tix[ni].price());
			}

			opt = toAll||tix[ni].options();
			for(no = 0; no < opt.length; no++){
				if(opt[no].type.toLowerCase() == 'text') continue;
				if(!opt[no].selectedItem()) continue;
				tix_sub += opt[no].selectedItem().fee||0;
			}

			if(tix[ni].transportView.wantsTransport()){
				//if(masterTran){
				//	tix_sub += masterTran;
				//} else 
				if(tix[ni].transport() && tix[ni].transport().amount){
					tix_sub += tix[ni].transport().amount;
				}
			}
			tix_sub = tix_sub - ((dis_r*tix_sub) / 100) - dis_a;
			sub += Math.round(tix_sub * taxRate)/100;
		}

		return sub;
	};

	//this function connects an item in the cart to this checkout item
	that.connectCart = function(cartItem){
		that.cartItem = cartItem;
		that.json(cartItem.json());
		
		var guests = cartItem.guests(),
			data,qty,ni,no;

		var tickets = [];
		for(ni = 0; ni < guests.length; ni++){
			qty = guests[ni].qty();
			for(no = 0; no < qty; no++){
				data = {
					id: guests[ni].id,
					name: guests[ni].name,
					price: guests[ni].price()
				};
				if(that.options().length){
					data.options = that.options();
				}
				tickets.push($ar.CheckoutTicketModel(data));
			}
		}
		that.tickets(tickets);
	};
	that.load = function(_callback){
		if(!that.activity){
			if(typeof _callback == 'function')
				_callback();
			return;
		}

		var params = {
			id: that.activity,
			date: createTimestamp(new Date(that.date + (that.time.startTime == 'Open'?'': ' ' + that.time.startTime))),
			currency: WebBooker.selectedCurrency().title
		};
		WebBooker.API.betterGetActivity(params,function(result){
			that.cfa(result.inventory.cfa);
			that.inventory(result.inventory.available);
			
			if ( result.inventory.cfa && result.inventory.available <= 0 ) {
				that.pending(1);
			}

			that.title(result.title);
			that.destination(__(result.destination)());
			that.url(WebBooker.bootstrap.wb_url + '/' + result.slug + '/');
			that.instructions(result.instructions);

			var tix = that.tickets(),
				guests = that.cartItem?that.cartItem.guests():[],
				prices = {};
				
			//adjust the prices of all the tickets
			for(ni = 0; ni < result.prices.length; ni++){
				prices[result.prices[ni].guest_type_id] = result.prices[ni];
			}
			for(ni = 0; ni < tix.length; ni++){
				if(!prices[tix[ni].id]) continue;
				tix[ni].price(parseFloat(prices[tix[ni].id].amount));
			}
			for(ni = 0; ni < guests.length; ni++){
				if(!prices[guests[ni].id]) continue;
				guests[ni].price(prices[guests[ni].id].amount / prices[guests[ni].id].rate);
			}
			that.tickets.valueHasMutated();
			if(that.cartItem) {
				that.cartItem.guests.valueHasMutated();
			}

			var crit = result.criteria||[];
			for(ni = 0; ni < crit.length; ni++){
				crit[ni] = $ar.OptionModel(crit[ni]);
			}
			that.options(crit);
			
			var transport = result.transport||[];
			for(ni=0;ni<transport.length;ni++){
				transport[ni] = $ar.TransportationModel(transport[ni]);
			}
			that.transportation(transport);

			var fee = result.fees||[];
			for(ni = 0; ni < fee.length; ni++){
				fee[ni] = $ar.FeeModel(fee[ni]);
			}
			that.fees(fee);

			if(typeof _callback == 'function'){
				_callback();
			}
		});
	};
	that.save = function(sale_id, _callback){
		var tix = that.tickets()||[],
			tix_num = 0,
			ni;

		//if(that.transportMaster() && that.transportMaster().transport()){
		//	for(ni = 0; ni < tix.length; ni++){
		//		tix[ni].transport($ar.TransportationModel(that.transportMaster().transport().json()));
		//	}
		//}
		var parse_tix = function(result){
			if(!--tix_num && typeof _callback == 'function'){
				_callback();
			}
		};
		for(ni = 0; ni < tix.length; ni++){
			tix_num++;
			tix[ni].save(that, sale_id,parse_tix);
		}
	};
	that.transportMaster = ko.observable(false);
	that.makeTransportMaster = function(item){
		var tix = that.tickets(), ni;
		if ( !that.transport() ) return;
		for(ni = 0; ni < tix.length; ni++){
			/*if ( tix[ni].transportView.selectTransport() === 'false' ) {
				tix[ni].transport( $ar.TransportationModel({
					id: 12345,
					name: 'None',
					amount: 0,
					instructions: 'Select this if the guest doesn\'t need transportation.'
				}) );
				continue;
			}*/
			tix[ni].transportView.selectTransport('true');
			tix[ni].transportView.wantsTransport(true);
			tix[ni].transportView.selectedTransType(item.selectedTransType());
			tix[ni].transportView.locationSelect(item.locationSelect());
			tix[ni].transport( $ar.TransportationModel( that.transport().json() ) );
			if(item.locationSelect() == 'hotel' && item.hotel()) {
				tix[ni].transportView.hotel($ar.HotelModel(item.hotel().json()));
				tix[ni].transportView.room(item.room());
			} else if(item.locationSelect() == 'address' && item.lat()) {
				tix[ni].transportView.lat(item.lat());
				tix[ni].transportView.lng(item.lng());
				tix[ni].transportView.home.address(item.home.address());
				tix[ni].transportView.home.city(item.home.city());
				tix[ni].transportView.home.state(item.home.state());
				tix[ni].transportView.home.postal(item.home.postal());
				tix[ni].transportView.home.country(item.home.country());
			}
			//if(tix[ni].transportView == item){
			//	that.transportMaster(!!!tix[ni].transportView.master()?tix[ni]:null);
			//	tix[ni].transportView.master(!!!tix[ni].transportView.master());
			//	continue;
			//}
			//tix[ni].transportView.master(false);
			for ( var no = 0; no < tix[ni].transportView.transportation().length; no += 1 ) {
				var transp = tix[ni].transportView.transportation()[no];
				if ( transp.name == that.transport().name ) {
					transp.selected(true);
				} else {
					transp.selected(false);
				}
			}
		}
		WebBooker.Checkout.sale.leadGuest.hotel({} || $ar.HotelModel(item.hotel().json()));
		WebBooker.Checkout.sale.leadGuest.room( (!item.room() || item.room() === '') ? 'Not provided' : item.room() );
	};
	that.undoTransportMaster = function() {
		var tix = that.tickets(), ni;
		//that.transportMaster(false);
		for ( ni = 0; ni < tix.length; ni += 1 ) {
			tix[ni].transport(null);
			//tix[ni].transportView.master(false);
			tix[ni].transportView.selectTransport('empty');
			tix[ni].transportView.wantsTransport(false);
			tix[ni].transportView.selectedTransType(null);
			tix[ni].transportView.locationSelect(false);
			tix[ni].transportView.hotel(null);
			tix[ni].transportView.room(null);
			tix[ni].transportView.lat(null);
			tix[ni].transportView.lng(null);
			tix[ni].transportView.home.address('');
			tix[ni].transportView.home.city('');
			tix[ni].transportView.home.state('');
			tix[ni].transportView.home.postal('');
			tix[ni].transportView.home.country('');
		}
		WebBooker.Checkout.sale.leadGuest.hotel(null);
		WebBooker.Checkout.sale.leadGuest.room(null);
	};
	that.makeTransportsFalse = function() {
		var tix = that.tickets(), ni;
		//that.transportMaster(false);
		for ( ni = 0; ni < tix.length; ni += 1 ) {
			tix[ni].transport( $ar.TransportationModel({
				id: 12345,
				name: 'None',
				amount: 0,
				instructions: 'Select this if the guest doesn\'t need transportation.'
			}) );
			//tix[ni].transportView.master(false);
			tix[ni].transportView.selectTransport('false');
			tix[ni].transportView.wantsTransport(false);
		}
		WebBooker.Checkout.sale.leadGuest.hotel(null);
		WebBooker.Checkout.sale.leadGuest.room(null);
	};
	
	that.i18n_date = function(){
		if( typeof that.time === 'object' ) {
			var time = new Date(that.date + (that.time.startTime=='Open'?' ':' ' + that.time.startTime));
		} else {
			var time = new Date(that.date + (that.time == 'Open'?'': ' ' + that.time));
		}
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
				   date;
		switch( i18n ) {
			case 'ja' 	:	//iso
			case 'zh_SG':
			case 'zh_TW':
			case 'zh_HK':
			case 'zh_CN':
			case 'ko_KR':
							date =  time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
							break;			
			case 'en_GB':	//euro
			case 'en_AU':
			case 'en_AG':
			case 'cs_CZ':
			case 'da_DK':
			case 'nl_NL':
			case 'fi_FI':
			case 'fr_FR':
			case 'fr_BE':
			case 'fr_CA':
			case 'de_DE':
			case 'de_AT':
			case 'el_GR':
			case 'it':
			case 'in_IN':
			case 'ms_MY':
			case 'ml_IN':
			case 'no_NO':
			case 'nb_NO':
			case 'nn_NO':
			case 'pl_PL':
			case 'pt_BR':
			case 'pt_PT':
			case 'ru_RU':
			case 'es_ES':
			case 'es_AR':
			case 'es_MX':
			case 'es':
			case 'sv_se':
			case 'th':
			case 'vi':
							date = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
							break;
			case 'en_US':	//us original
			case 'en_CA':
			default		:	date = (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
		}
		return date;
	};
	
	return that;
};
$ar.TransportView = function(data){
	var self = $ar.Model({
		master: false,
		transportation: [],
		wantsTransport: 'empty',
		locationSelect: false,
		hotel: null,
		room: null,
		home: {
			address: ko.observable(''),
			city: ko.observable(''),
			state: ko.observable(''),
			postal: ko.observable(''),
			country: ko.observable('')
		},
		lat: null,
		lng: null,
		stored_lat: null,
		stored_lng: null,
		showMoreTransports: false,
		map: null,
		row_id: null,
		map_container: null
	});

	self.drawMap = function() {
		if(!self.map_container)
			self.map_container = document.getElementById(self.row_id).getElementsByClassName('map-canvas')[0];

		var options = {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				maxZoom: 22,
				scrollwheel: false,
				zoom: 18
			};

		self.map_container.style.display = 'block';
		self.map = new google.maps.Map(self.map_container, options);
		self.map_container.style.display = 'none';
	};

	self.doGeocode = function() {
		if(!self.home.address() || !self.home.city() || !self.home.state() || !self.home.postal() || !self.home.country()) return;
		var address = self.home.address() + ' ' + self.home.city() + ' ' + self.home.state() + ' ' + self.home.postal() + ' ' + self.home.country()['alpha-2'];
		if(!self.map_container) {
			self.map_container = document.getElementById(self.row_id).getElementsByClassName('map-canvas')[0];
		}

		$ar.Geocoder.geocode({ address: address }, function(results) {
			var loc = results[0].geometry.location;
			self.stored_lat(loc.lat());
			self.stored_lng(loc.lng());
			self.map_container.style.display = 'block';
			self.map = new google.maps.Map(self.map_container, {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				maxZoom: 22,
				scrollwheel: false,
				zoom: 18,
				center: new google.maps.LatLng(loc.lat(), loc.lng())
			});
			new google.maps.Marker({
				map: self.map,
				position: loc,
				draggable: false,
				animation: google.maps.Animation.DROP
			});
		});
	};

	self.acceptGeocode = function() {
		self.lat(self.stored_lat());
		self.lng(self.stored_lng());
		self.stored_lat(null);
		self.stored_lng(null);
		self.map_container.style.display = 'none';
		self.map = null;
	};

	self._json_callback = function(beans){
		beans = beans||{};
		beans.home = beans.home||{};
		beans.home = {
			address: ko.observable(beans.home.address),
			city: ko.observable(beans.home.city),
			state: ko.observable(beans.home.state),
			postal: ko.observable(beans.home.postal),
			country: ko.observable(beans.home.country)
		};
	};

	self.master = ko.observable(self.master);

	self.transportation = ko.observableArray(self.transportation);
	self.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni;
		var clean_house = function(item){
			return function(_nval){
				if(!_nval) return;
				var trans = self.transportation(),
					no;
				for(no = 0; no < trans.length; no++){
					if(trans[no] == item) continue;
					trans[no].selected(false);
				}
			};
		};
		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((clean_house)(nval[ni]));
		}
	});
	self.transportationTypes = ko.computed(function() {
		var types = [], ni;
		for ( ni = 0; ni < self.transportation().length; ni += 1 ) {
			var trans = self.transportation()[ni],
				vehicle = decodeURIComponent(trans.vehicle);//Remove URL Encoding if there
				vehicle = __( trans.vehicle.charAt(0).toUpperCase() + trans.vehicle.slice(1) )();
			
			if ( jQuery.inArray( vehicle, types ) < 0 ) {
				types.push( vehicle );
			}
		}
		if ( types.length === 1 ) {
			self.selectedTransType(types[0]);
		} else {
			types.unshift(__('Any')());
		}
		return types;
	});
	self.selectedTransType = ko.observable();
	self.selectTransport = ko.observable(self.wantsTransport);
	self.selectTransport.subscribe(function(value) {
		if ( value === 'empty' || value == 'false' ) {
			self.wantsTransport(false);
			
		} else if ( value === 'true' ) {
			self.wantsTransport(true);
		}
	});
	self.wantsTransport = ko.observable( ( self.wantsTransport === 'empty' ) ? false : self.wantsTransport );
	self.locationSelect = ko.observable(self.locationSelect);
	if(WebBooker.bootstrap.agencyID == 1260) {
		// TODO - We should not hard-code clients like this. Let's make it manageable
		// from the Admin, i.e. option to set default hotel on a Web Booker.
		self.hotel = ko.observable( $ar.HotelModel( {
			'ID': 18655,
			'hotel_addr1': '92-1185 Aliinui Dr',
			'hotel_addr2': '',
			'hotel_city': 'Kapolei',
			'hotel_country': 'US',
			'hotel_lat': '21.33914939329752',
			'hotel_lng': '-158.12336684232787',
			'hotel_phone': '(808) 674-6200',
			'hotel_st': 'HI',
			'hotel_zip': '96707',
			'name': 'Aulani Resort & Spa'
		} ) );
	} else {
		self.hotel = ko.observable(self.hotel);
	}
	self.room = ko.observable(self.room);

	self.lat = ko.observable(self.lat);
	self.lng = ko.observable(self.lng);
	self.stored_lat = ko.observable(self.stored_lat);
	self.stored_lng = ko.observable(self.stored_lng);

	self.showMoreTransports = ko.observable(self.showMoreTransports);
	self.transportsToShow = ko.computed(function(){
		if(!self.locationSelect()) return [];
		var transports = [],
			location = {},
			location_select = self.locationSelect();

		if(location_select == 'hotel') {
			location = self.hotel();
		}else if(self.lat() && self.lng()) {
			location.lat = parseFloat(self.lat());
			location.lng = parseFloat(self.lng());
		}
		if(!location)
			return [];
		if(!location.lat || !location.lng)
			return [];
		
		for ( var ni = 0; ni < self.transportation().length; ni += 1 ) {
			var transport = self.transportation()[ni];
			transport.distance = getDistance(transport.lat, transport.lng, location.lat, location.lng, 'M');
			if ( self.selectedTransType() && ( self.selectedTransType() === __( transport.vehicle.charAt(0).toUpperCase() + transport.vehicle.slice(1) )() || self.selectedTransType() === __('Any')() ) ) {
				transports.push(transport);
			} else if ( !self.selectedTransType() ) {
				transports.push(transport);
			}
		}

		if ( transports.length ) {
			transports.sort(sortNearestDistance);
			transports[0].selected(true);
		}

		if(!self.showMoreTransports())
			return transports.slice(0,3);
		return transports;
	});
	self.toggleTransportMore = function(){
		self.showMoreTransports(!!!self.showMoreTransports());
	};

	return self;
};
$ar.CheckoutTicketModel = function(data){
	var that = $ar.Model({
		ticket_id: 0,
		row_id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),

		id: 0,
		name: '',
		price: 0,

		first_name: '',
		last_name: '',

		options: [],
		transport: null,
		editTransport: false
	});
	that._json_callback = function(beans){
		if(!beans) return;
		beans.options = beans.options||[];
		var ni;
		for(ni = 0; ni < beans.options.length; ni++)
			beans.options[ni] = $ar.OptionModel(beans.options[ni]);
		if(beans.transport) beans.transport = $ar.TransportationModel(beans.transport);
	};
	that.json(data);

	that.price = ko.observable(that.price||0);
	that.first_name = ko.observable(that.first_name||'');
	that.last_name = ko.observable(that.last_name||'');
	that.options = ko.observableArray(that.options||[]);
	that.showOptions = ko.observable(true);

	that.editTransport = ko.observable(that.editTransport||false);
	that.transport = ko.observable(that.transport);
	that.hotelRoom = ko.observable('');
	that.transportView = $ar.TransportView();
	that.transportView.transportation.subscribe(function(nval){
		if(!nval) return;
		var ni,
			setTransport = function(item){
				return function(_nval){
					if(!_nval) {
						that.transport( $ar.TransportationModel({
							id: 12345,
							name: 'None',
							amount: 0,
							instructions: 'Select this if the guest doesn\'t need transportation.'
						}) );
					} else {
						that.transport(item);
					}
				};
			};

		for(ni = 0; ni < nval.length; ni++){
			nval[ni].selected.subscribe((setTransport)(nval[ni]));
		}
	});
	that.transportView.hotel.subscribe(function(nval){
		if(!nval)
			that.transport(null);
	});
	that.transportView.wantsTransport.subscribe(function(value) {
		if ( !value || value == 'false' ) {
			that.transport( $ar.TransportationModel({
				id: 12345,
				name: 'None',
				amount: 0,
				instructions: 'Select this if the guest doesn\'t need transportation.'
			}) );
		}
	});

	that.transportView.row_id = that.row_id;

	that.toggleEditTransport = function() {
		that.editTransport( that.editTransport() ? false : true );
	};

	that.validate = function(){
		var valid = true,
			opt = that.options(),
			ni;
		for(ni = 0; ni < opt.length; ni++){
			valid = valid && opt[ni].validate();
		}
		if( that.transportView.transportation().length > 0 && that.transportView.selectTransport() == 'empty' ) {
			valid = false;
		}
		if( that.transportView.wantsTransport() ) {
			if( !that.transport() || 
				!that.transportView.locationSelect() || 
				( that.transportView.locationSelect() == 'hotel' && !that.transportView.hotel() ) ||
				( that.transportView.locationSelect() == 'address' && !that.transportView.lat() ) ) {
				valid = false;
			}
		}
		if(!valid) that.showOptions(true);
		return valid;
	};
	that.toggleOptions = function(){
		that.showOptions(!that.showOptions());
	};

	that.save = function(guest,sale_id,_callback){
		var a_cfa = guest.cfa && !guest.inventory;
		var ticket = {
			aid: guest.activity,
			sid: sale_id,
			timestamp: createTimestamp(new Date(guest.date + (guest.time.startTime=='Open'?' ':' ' + guest.time.startTime))),
			guest_type_id: that.id,
			guest_type: that.name,
			//leadGuest: guest.lead(),
			guest_hotel: (that.transportView.hotel()||{ json:function(){ return null; }}).json(),
			guest_room: (!that.transportView.room() || that.transportView.room() === '') ? 'Not provided' : that.transportView.room(),
			cfa: guest.cfa,
			cfa_name: '',
			cfa_number: '',
			firstName: that.first_name(),
			lastName: that.last_name()
		};
		WebBooker.API.saveTicket(ticket, function(result){
			if(result.status != 1){
				if(typeof _callback == 'function')
					_callback();
				return;
			}
			that.ticket_id = result.data.ID;

			if(result.data.cfa == 1 && !a_cfa){
				guest.pending(1);
			}

			var opts = that.options(),
				ni;
			for(ni = 0; ni < opts.length; ni++){
				opts[ni].save(that.ticket_id,sale_id);
			}

			if(WebBooker.Checkout.sale.discount()){
				WebBooker.Checkout.sale.discount().save(that.ticket_id,sale_id);
			}

			if(that.transport()){
				that.transport().save(that.ticket_id, sale_id);
			}

			if(typeof _callback == 'function')
				_callback();
		});
	};

	return that;
};
$ar.FeeModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		label: '',
		amount: false,
		percentage: false
	});
	that._json_callback = function(beans){
		if(/\%/.test(beans.amount)){
			beans.percentage = parseFloat(beans.amount);
			beans.amount = false;
		} else {
			beans.percentage = false;
			beans.amount = beans.amount;
		}
	};
	that.json(data);

	that.displayText = ko.computed(function(){
		if(that.percentage){
			return that.percentage + '%';
		}
		return WebBooker.selectedCurrency().symbol + that.amount;
	});
	that.price = function(p){
		if(that.amount) return that.amount;
		return p * that.percentage/100;
	};

	return that;
};
$ar.TransportationModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		type: 'transportation',
		name: '',
		id: '',
		vehicle: '',
		amount: '',
		start: false,
		end: false,
		lat: 0,
		lng: 0,
		instructions: '',
		address: ''
	},$ar.data_mapper({ 'ID': 'id' },data));

	that.selected = ko.observable(false);
	that.save = function(ticket, sale_id){
		WebBooker.API.saveOption({
			ticketID: ticket,
			saleID: sale_id,
			name: that.name,
			value: that.id,
			fee: that.amount,
			type: 'transportation'
		});
	};

	return that;
};
$ar.OptionModel = function(data){
	var that = $ar.Model({
		ticket: 0,
		id: '',
		type: '',
		name: '',
		qty: 0,
		required: false,
		items: [],
		selectedItem: null,
		text: ''
	},$ar.data_mapper({
		'req': 'required',
		'amount': 'fee'
	},data));

	that.text = ko.observable(that.text||'');
	that.items = ko.observableArray(that.items||[]);
	that.selectedItem = ko.observable(that.selectedItem);

	that.validate = function(){
		if(!that.required) return true;
		switch(that.type.toLowerCase()){
			case 'text':
				if(!that.text()) return false;
				return true;
			case 'dropdown':
			case 'combo':
				if(!that.selectedItem()) return false;
				return true;
			default:
				return false;
		}
		return true;
	};

	that.save = function(ticket, sale_id){
		var opt_value,
			opt_fee,
			opt_choice = '';

		if(that.type.toLowerCase() == 'text') {
			opt_value = that.text;
			opt_fee = '';
			opt_choice = that.text;
		}
		if(/^(dropdown|combo)/.test(that.type.toLowerCase())){
			opt_value = that.selectedItem() ? that.selectedItem().name : '';
			opt_fee = that.selectedItem() ? parseFloat(that.selectedItem().fee) : '';

			if(opt_fee)
				opt_choice =  opt_value + ' &#043;' + opt_fee;
			else
				opt_choice =  opt_value;
		}
		WebBooker.API.saveOption({
			ticketID: ticket,
			saleID: sale_id,
			name: that.name,
			value: opt_value,
			fee: opt_fee,
			type: /^(text|combo|dropdown)/.test(that.type.toLowerCase()) ? 'criteria' : that.type
		});
	};

	return that;
};

$ar.LeadGuestInfoModel = function(data){
	var that = new $ar.Model({
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		state: '',
		postal: '',
		country: '',
		hotel: null,
		room: null
	},data);

	for(var ni in that){
		if(typeof that[ni] == 'function' || /^(_)/.test(ni))
			continue;
		that[ni] = ko.observable(that[ni]);
	}

	that.full_name = ko.computed(function(){
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n;
		
		if ( WebBooker.Checkout ) {
			var sale = WebBooker.Checkout.sale;
		
			if ( sale.items().length && WebBooker.Checkout.copyNames() ) {
				var items = sale.items(),
					ni, no, tix;
				for ( ni = 0; ni < items.length; ni += 1) {
					tix = items[ni].tickets();
					for ( no = 0; no < tix.length; no += 1 ) {
						//if ( !tix[no].first_name() || tix[no].first_name() === '' )
							tix[no].first_name( that.first_name() );
						//if ( !tix[no].last_name() || tix[no].last_name() === '' )
							tix[no].last_name( that.last_name() );
					}
				}
			}
		}
		
		if( i18n == 'ja' ) {
			return that.last_name() + ' ' + that.first_name();
		} else {
			return that.first_name() + ' ' + that.last_name();
		}
	});
	that.saveToLocal = ko.computed(function() {
		var f_name = that.first_name(),
			l_name = that.last_name(),
			phone = that.phone(),
			email = that.email();
			
		if ( !f_name || !l_name || !phone || !email ) return false;
		WebBooker.Sale.set('leadGuestInfo', {
			f_name: f_name,
			l_name: l_name,
			phone: phone,
			email: email
		});
	});
	that.states = WebBooker.us_states;
	that.errors = ko.observableArray([]);
	that.validate = function(){
		that.errors([]);
		var email_regexp = /[a-zA-Z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?/;

		if(!that.first_name()){
			that.errors.push(__('First name is required.')());
		}
		if(!that.last_name()){
			that.errors.push(__('Last name is required.')());
		}
		if(!that.phone()){
			that.errors.push(__('Telephone number is required.')());
		}
		if(!that.email()){
			that.errors.push(__('E-mail address is required.')());
		}
		if(that.email() && !email_regexp.test(that.email())){
			that.errors.push(__('E-mail address is not valid.')());
		}
		return that.errors().length === 0;
	};
	
	that.copyToPayment = function() {
		var payments = WebBooker.Checkout.sale.payments(), ni, pmt;
		for ( ni = 0; ni < payments.length; ni += 1 ) {
			pmt = payments[ni];
			if ( pmt.type !== 'credit' ) continue;
			
			if ( !pmt.payee.first_name() ) {
				pmt.payee.first_name( that.first_name() );
			}
			if ( !pmt.payee.last_name() ) {
				pmt.payee.last_name( that.last_name() );
			}
			if ( !pmt.payee.email() ) {
				pmt.payee.email( that.email() );
			}
			if ( !pmt.payee.phone() ) {
				pmt.payee.phone( that.phone() );
			}
			
			break;
		}
	};

	return that;
};

$ar.PaymentInfoModel = function(data){
	var that = $ar.Model({
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		state: '',
		postal: '',
		country: ''
	},data);

	for(var ni in that){
		if(typeof that[ni] == 'function' || /^_/.test(ni))
			continue;
		that[ni] = ko.observable(that[ni]);
	}
	that.states = WebBooker.us_states;
	that.errors = ko.observableArray([]);
	that.validate = function(){
		that.errors([]);
		var email_regexp = /[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?/;

		if(!that.first_name()){
			that.errors.push(__('First name is required.')());
		}
		if(!that.last_name()){
			that.errors.push(__('Last name is required.')());
		}
		if(!that.phone()){
			that.errors.push(__('Telephone number is required.')());
		}
		if(!that.country()){
			that.errors.push(__('Country is required.')());
		}
		if(!that.city()){
			that.errors.push(__('City is required.')());
		}
		if(!that.state()){
			that.errors.push(__('State is required.')());
		}
		if(!that.address()){
			that.errors.push(__('Address number is required.')());
		}
		if(!that.postal()){
			that.errors.push(__('Postal Code is required.')());
		}

		if( that.errors().length === 0 ) {
			WebBooker.Checkout.sale.leadGuest.json({
				'country': that.country(),
				'city': that.city(),
				'state': that.state(),
				'address': that.address(),
				'postal': that.postal()
			});
		}
		
		return that.errors().length === 0;
	};

	return that;
};

$ar.HotelModel = function(data){
	var that = $ar.Model({
		id: 0,
		addr1: '',
		addr2: '',
		st:'',
		city: '',
		zip: '',
		country: '',

		lat: '',
		lng: '',

		name: '',
		phone: '',
		generatedName: ''
	},$ar.data_mapper({
		'ID': 'id',
		'hotel_addr1': 'addr1',
		'hotel_addr2': 'addr2',
		'hotel_city': 'city',
		'hotel_country': 'country',
		'hotel_lat': 'lat',
		'hotel_lng': 'lng',
		'hotel_phone': 'phone',
		'hotel_st': 'st',
		'hotel_zip': 'zip'
	},data));
	
	var n = that.name + ' - ';
	if ( that.st ) n = n + that.st + ', ';
	n += that.country;
	
	that.generatedName = n;

	return that;
};
$ar.PaymentModel = function(data){
	var that = $ar.Model({
		type: '',
		type_id: '',
		label: '',
		amount: 0,
		comment: '',
	},data);

	that.amount = ko.observable(that.amount||0);
	that.comment = ko.observable(that.comment||'');

	return that;
};
$ar.VoucherPaymentModel = function(data){
	data.type = 'voucher';
	var that = $ar.PaymentModel().extend({
		max_amount: 0,
		default_amount: 0,
		require_authorization_id: 0,
		authorization_ID: '',
	},$ar.data_mapper({
		'ID':'type_id',
		'payment_type_id':'type_id'
	},data));
	
	that.require_authorization_id = ko.observable(that.require_authorization_id||0);
	that.authorization_ID = ko.observable(that.authorization_ID);

	that.save = function(sale_id,_callback){
		var obj = {
			sid: sale_id,
			payment_type_id: that.type_id,
			amount: that.amount(),
			comment: that.comment(),
			authorization_ID: that.authorization_ID()
		};

		WebBooker.API.savePayment(obj, function(result){
			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};

	return that;
};
$ar.CreditCardPaymentModel = function(data){
	var use_hosted = (WebBooker.bootstrap.paymentInfo[WebBooker.selectedCurrency().title].options||{}).hosted||false;
	var that = $ar.PaymentModel().extend({
		type: 'credit',
		payee: null,
		useHostedPage: use_hosted,
		card: null
	},data);

	that.payee = $ar.PaymentInfoModel(that.payee);
	that.card = $ar.CreditCardModel(that.card);
	that.type_id = WebBooker.bootstrap.paymentInfo.ID;
	that.label = __('Credit Card')();
	that.years = (function(){
		var thisyr = new Date(),
			out = [];
		for(var i = 0; i <= 20; i++){
			out.push(thisyr.getFullYear()+i);
		}
		return out;
	})();
	
	that.months = $ar.ccMonthModel();
	that.lastFour = ko.computed(function(){
		return that.card?(''+that.card.number()).slice(-4):false;
	});
	that.sameAsContact = ko.computed({
		read: function(){
			var pj = that.payee.json(),
				cj = WebBooker.Checkout.sale.leadGuest.json(),
				ni;
			for(ni in cj){
				if(!pj.hasOwnProperty(ni) || pj[ni] != cj[ni])
					return false;
			}
			return true;
		},
		write: function(val){
			if(val)
				that.payee.json(WebBooker.Checkout.sale.leadGuest.json());
			else
				that.payee = $ar.PaymentInfoModel();
		}
	});

	that.validate = function(){
		if(!that.payee.validate())
			return false;
		if(!that.useHostedPage && !that.card.validate())
			return false;
		return true;
	};
	that.save = function(sale_id,_callback){
		var obj = {
			sid: sale_id,
			payment_type_id: that.type_id,
			amount: that.amount(),
			comment: that.comment(),
			payee: $ar.data_mapper({
				'first_name':'firstName',
				'last_name':'lastName'
			},that.payee.json())
		};

		obj.payee.country = obj.payee.country['alpha-2'];

		if(!that.useHostedPage){
			obj.options = $ar.data_mapper({
				'number':'cc_number',
				'month': 'cc_exp_month',
				'year': 'cc_exp_year',
				'code':'cc_security'
			},that.card.json());
		}

		WebBooker.API.savePayment(obj, function(result){
			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};

	return that;
};
$ar.DiscountModel = function(data){
	if(data && data.discount_amt){
		if(data.discount_amt.indexOf('%') < 0) {
			data.amount = data.discount_amt;
		} else {
			data.rate = data.discount_amt;
		}
		delete data.discount_amt;
	}

	var that = $ar.Model({
		id: 0,
		name: '',
		amount: 0,
		rate: 0
	},$ar.data_mapper({
		'discount_id':'id',
		"discount_name":'name'
	},data));

	that.save = function(ticket,sale_id){
		WebBooker.API.saveDiscount({
			ticketID: ticket,
			saleID: sale_id,
			amount: that.amount||'',
			percent: that.rate||'',
			scope: 'all',
			discount_id: that.id
		});
	};

	return that;
};
$ar.SaleModel = function(data){
	var self = $ar.Model({
		id: 0,
		items: [],
		payments: [],
		discount: null,
		leadGuest: null,
		modified: null,
		i18n_modified: null
	});
	self._json_callback = function(beans){
		if(!beans) return;

		beans.items = beans.items||[];
		beans.payments = beans.payments||[];

		var ni;
		for(ni = 0; ni < beans.items.length; ni++){
			beans.items[ni] = $ar.CheckoutItemModel(beans.items[ni]);
		}
		for(ni = 0; ni < beans.payments.length; ni++){
			if(beans.payments[ni].type === 'credit') {
				beans.payments[ni] = $ar.CreditCardPaymentModel(beans.payments[ni]);
			}
			if(beans.payments[ni].type === 'voucher') {
				beans.payments[ni] = $ar.VoucherPaymentModel(beans.payments[ni]);
			}
		}
		beans.leadGuest = $ar.LeadGuestInfoModel(beans.leadGuest);
		if(beans.discount) {
			beans.discount = $ar.DiscountModel(beans.discount);
		}
	};
	self.json(data);

	self.id = ko.observable(self.id||0);
	self.items = ko.observableArray(self.items||[]);
	self.leadGuest = self.leadGuest||$ar.LeadGuestInfoModel();
	self.payments = ko.observableArray(self.payments||[]);
	self.discount = ko.observable(self.discount);
	self.modified = ko.observable(self.modified);
	self.i18n_modified = ko.observable(self.i18n_modified);
	
	self.hasTransportOptions = ko.computed(function(){
		var item = self.items(),
			transport = false,
			ni;
		for(ni = 0; ni < item.length; ni++){
			if(item[ni].transportation().length) {
				transport = true;
			}
		}

		return transport;
	}).extend({ throttle: 10 });

	self.cfa_activities = ko.computed(function(){
		var items = self.items(),
			cfa = [],
			ni;
		for(ni = 0; ni < items.length; ni++){
			if(!items[ni].pending()) continue;
			cfa.push(items[ni]);
		}
		return cfa;
	}).extend({ throttle: 10 });

	self.discountTotal = ko.computed(function(){
		if(!self.discount() || !self.items().length) return 0;
		var items = self.items(),
			discount = self.discount(),
			sub = 0,
			amt,ni;
		if(discount.rate){
			amt = parseFloat( discount.rate.replace('%', '') )/100;
			for(ni = 0; ni < items.length; ni++){
				sub += items[ni].subtotal() * amt;
			}
		} else {
			for ( ni = 0; ni < items.length; ni += 1 ) {
				sub = discount.amount * items[ni].tickets().length;
			}
		}
		return sub;
	}).extend({ throttle: 10 });
	self.validateCustomize = function(){
		var valid = true,
			item = self.sale.items(),
			tix, opt, ni, no, na;
		for(ni = 0; ni < item.length; ni++){
			valid = valid && item[ni].validate();
		}
		return sub;
	};
	self.subtotal = ko.computed(function(){
		if(!self.items().length) return 0;
		var items = self.items(),
			sub = 0,
			ni;
		for(ni = 0; ni < items.length; ni++){
			sub += items[ni].subtotal();
		}
		return sub;
	}).extend({ throttle: 10 });
	self.taxes = ko.computed(function(){
		var items = self.items(),
			sub = 0,
			ni;
		for(ni = 0; ni < items.length; ni++)
			sub += items[ni].taxTotal(self.discount());
		return sub;
	}).extend({ throttle: 10 });
	self.total = ko.computed(function(){
		var sub = self.subtotal() - self.discountTotal();
		sub += self.taxes();
		return sub;
	}).extend({ throttle: 10 });

	self.loadFromCart = function(_callback){
		var items = WebBooker.Cart.items(),
			lead_guest_info = WebBooker.Sale.get('leadGuestInfo'),
			caller = function(){ self.items.valueHasMutated(); },
			_items = [],
			ni, no,
			act, it, json, tmp_amt;
			
		for(ni = 0; ni < items.length; ni++){
			it = $ar.CheckoutItemModel();
			it.connectCart(items[ni]);
			it.load(caller);
			_items.push(it);
		}
		self.items(_items);
		
		// load guest info
		if ( lead_guest_info ) {
			self.leadGuest.first_name( lead_guest_info.f_name );
			self.leadGuest.last_name( lead_guest_info.l_name );
			self.leadGuest.phone( lead_guest_info.phone );
			self.leadGuest.email( lead_guest_info.email );
		}
		
		WebBooker.CheckoutNav.goToStep('Customize');
		if(typeof _callback == 'function')
			_callback();
	};
	self.load = function(_callback){
		WebBooker.API.getSale({
			saleID: self.id(),
			email: self.leadGuest.email()
		},function(result){
			if(result.status != 1) {
				_callback(result);
				return
			}

			self.leadGuest.json($ar.data_mapper({
				'lead_guest_firstName': 'first_name',
				'lead_guest_lastName': 'last_name',
				'lead_guest_city': 'city',
				'lead_guest_state': 'state',
				'lead_guest_address': 'address',
				'lead_guest_postal':'postal',
				'lead_guest_country':'country',
				'lead_guest_phone': 'phone',
				'lead_guest_email': 'email'
			},result.data));

			var currs = WebBooker.available_currencies(),
				types = [],
				tix = result.data.tickets,
				options = result.data.options,
				time,type,ni,no;

			self.modified(new Date(result.data.modified * 1000).toDateString());
			self.i18n_modified( self.getDateOrder( new Date(result.data.modified * 1000) ));
			
			for(ni = 0; ni < currs.length; ni++){
				if(currs[ni].title != result.data.currency) continue;
				WebBooker.selectedCurrency(currs[ni]);
				break;
			}

			for(ni = 0; ni < tix.length; ni++){
				type = false;
				time = new Date(tix[ni].datetime);
				for(no = 0; no < types.length; no++){
					if(types[no].activity != tix[ni].activityID) continue;
					if(types[no].date != (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear()) continue;
					if(types[no].time.startTime != formatTime(tix[ni].datetime)) continue;
					type = types[no];
					break;
				}
				if(!type){
					type = $ar.CheckoutItemModel({
						activity: tix[ni].activityID,
						date: (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear(),
						time: { startTime: formatTime(tix[ni].datetime) },
						tickets: []
					});
					type.load((function(beans,opt){
						return function(){
							beans.parseOptions(opt);
						}
					})(type,options));
					types.push(type);
				}
				
				if ( tix[ni].cfa ) {
					type.pending(true);
				}
				
				tix[ni] = $ar.CheckoutTicketModel($ar.data_mapper({
					'ID':'ticket_id',
					'guest_type_id':'id',
					'guest_type':'name',
					'firstName':'first_name',
					'last_name':'last_name'
				},tix[ni]));

				for(no = 0; no < options.length; no++){
					if(options[no].ticketID != tix[ni].ticket_id) continue;
					if(options[no].type == 'transportation'){
						tix[ni].transportView.wantsTransport(true);
						tix[ni].transport($ar.TransportationModel($ar.data_mapper({
							'fee':'amount'
						},options[no])));
					}
				}
				
				type.tickets.push(tix[ni]);
			}
			self.items(types);

			var payments = result.data.payments;
			self.payments([]);
			for(ni = 0; ni < payments.length; ni++){
				delete payments[ni].label;
				payments[ni] = $ar.data_mapper({
					'payment-type':'type',
					'payment_type_label':'label'
				},payments[ni]);
				if(payments[ni].type == 'credit')
					self.payments.push($ar.CreditCardPaymentModel(payments[ni]));
				if(payments[ni].type == 'voucher'){
					self.payments.push($ar.VoucherPaymentModel(payments[ni]));
				}
			}

			if(typeof _callback == 'function'){
				_callback(result);
			}
		});
	};
	self.save = function(_callback){
		// Create the sale.
		var sale = $ar.data_mapper({
			'first_name': 'lead_guest_firstName',
			'last_name': 'lead_guest_lastName',
			'hotel': 'lead_guest_hotel',
			'room': 'lead_guest_room',
			'phone': 'lead_guest_phone',
			'email':'lead_guest_email',
			'address':'lead_guest_address',
			'city': 'lead_guest_city',
			'state': 'lead_guest_state',
			'postal': 'lead_guest_postal',
			'country': 'lead_guest_country'
		},self.leadGuest.json()),
			payments = self.payments(),
			cc_country, ni;
		
		for ( ni = 0; ni < payments.length; ni += 1 ) {
			if ( payments[ni].type !== 'credit' ) {
				continue;
			}
			cc_country = payments[ni].payee.country()['alpha-2'];
		}
		
		if(sale.lead_guest_country) {
			sale.lead_guest_country = (sale||{}).lead_guest_country['alpha-2']||'';
		} else {
			sale.lead_guest_country = cc_country;
		}

		// Send the sale.
		WebBooker.API.saveSale(sale, function(result) {
			if(!result||!result.data||!result.data.ID){
				if(typeof _callback == 'function')
					_callback(result);
				return;
			}
			self.id(result.data.ID);
			WebBooker.Sale.set('sale', self.json());

			var items = self.items(),
				item_num = 0,
				tix,ni,no;

			var done_tickets = function(){
				if(--item_num) return;
				var payments = self.payments(),
					pay_count = 0,
					res = {
						error_msg: false,
						hosted: false
					};

				var parseSave = function(payment){
					return function(result){
						if(result.status != 1 && result.status != 2) {
							res.error_msg = result.msg;
						} else if(payment.hasOwnProperty('useHostedPage') && payment.useHostedPage && result.status == 2) {
							res.hosted = result.redirect;
						}

						if(!--pay_count){
							if(!res.error_msg){
								var items = self.items(),
									ni;
								for(ni = 0; ni < items.length; ni++){
									if(items[ni].cartItem){
										//should be pushed to pubsub
										WebBooker.Cart.items.remove(items[ni].cartItem);
									}
								}
							}
							if(typeof _callback == 'function')
								_callback(res);
						}
					};
				};
				for(ni = 0; ni < payments.length; ni++) {
					pay_count++;
					payments[ni].save(self.id(),(parseSave)(payments[ni]));
				}
			};

			for(ni = 0; ni < items.length; ni++){
				item_num++;
				items[ni].save(self.id(),done_tickets);
			}
			
			// clear guest info
			setTimeout(function() {
				WebBooker.Sale.remove('leadGuestInfo');
				//WebBooker.Sale.set('leadGuestInfo',{});
			},1000);
		});
	};

	WebBooker.selectedCurrency.subscribe(function(){
		WebBooker.Checkout.sale.items.valueHasMutated();
	});

	self.getDateOrder = function(time){
		var i18n = WebBooker.Settings.get('i18n') || wb_global_vars.i18n,
			days = new Array( __('Sun')(), __('Mon')(), __('Tue')(), __('Wed')(), __('Thu')(), __('Fri')(), __('Sat')() ),
			date;
		switch( i18n ) {
			case 'ja' 	:	//iso
			case 'zh_SG':
			case 'zh_TW':
			case 'zh_HK':
			case 'zh_CN':
			case 'ko_KR':
							date =  time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + ' (' + days[time.getDay()] + ')';
							break;
			case 'en_GB':	//euro
			case 'en_AU':
			case 'en_AG':
			case 'cs_CZ':
			case 'da_DK':
			case 'nl_NL':
			case 'fi_FI':
			case 'fr_FR':
			case 'fr_BE':
			case 'fr_CA':
			case 'de_DE':
			case 'de_AT':
			case 'el_GR':
			case 'it':
			case 'in_IN':
			case 'ms_MY':
			case 'ml_IN':
			case 'no_NO':
			case 'nb_NO':
			case 'nn_NO':
			case 'pl_PL':
			case 'pt_BR':
			case 'pt_PT':
			case 'ru_RU':
			case 'es_ES':
			case 'es_AR':
			case 'es_MX':
			case 'es':
			case 'sv_se':
			case 'th':
			case 'vi':			
							date = days[time.getDay()] + ' ' + time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
							break;
			case 'en_US':	//us original
			case 'en_CA':
			default		:	date = days[time.getDay()] + ' ' + (time.getMonth() + 1) + '/' + time.getDate() + '/' + time.getFullYear();
		}
		return date;
	};

	return self;
};

$ar.ccMonthModel = function(){
	months = [
		{
			index: 1,
			label: '01 - ' + __('January')()
		}, {
			index: 2,
			label: '02 - ' + __('February')()
		}, {
			index: 3,
			label: '03 - ' + __('March')()
		}, {
			index: 4,
			label: '04 - ' + __('April')()
		}, {
			index: 5,
			label: '05 - ' + __('May')()
		}, {
			index: 6,
			label: '06 - ' + __('June')()
		}, {
			index: 7,
			label: '07 - ' + __('July')()
		}, {
			index: 8,
			label: '08 - ' + __('August')()
		}, {
			index: 9,
			label: '09 - ' + __('September')()
		}, {
			index: 10,
			label: '10 - ' + __('October')()
		}, {
			index: 11,
			label: '11 - ' + __('November')()
		}, {
			index: 12,
			label: '12 - ' + __('December')()
		}
	];
	return months;
};

WebBooker.HotelSearch = function(args,callback){
	var searchArgs = {
		object: 'hotel',
		property: 'post_title',
		query: args.term
	};

	if( WebBooker.Cart.items().length > 0 ){
		searchArgs.activities = [];
		acts = WebBooker.Cart.items();
		for( var ne = 0; ne < acts.length; ne++ ){
			if( jQuery.inArray( acts[ne].activity, searchArgs.activities ) == -1 )
				searchArgs.activities.push( acts[ne].activity );
		}
	}
	
	WebBooker.API.request('lookup','liveSearch', searchArgs,function(resp){
		//convert format
		if(resp.status ==1){
			resp.results = [];
			for(var ni = 0; ni<resp.items.length; ni++){
				resp.results.push($ar.HotelModel(resp.items[ni]));
			}
			delete resp.items;
			callback(resp);
		}else{
			return;
		}
		
	});

};

WebBooker.Checkout = (function(){
	var self = {};

	self.sale = $ar.SaleModel();

	self.termsAccepted = ko.observable(false);
	self.copyNames = ko.observable(true);

	self.copyNames.subscribe(function(value) {
		if ( !self.sale.items().length ) return;
		var item = self.sale.items(),
			ni,no,tix;
		for(ni = 0; ni < item.length; ni++){
			tix = item[ni].tickets();
			for(no = 0; no < tix.length; no++){
				//if ( !tix[no].first_name() || tix[no].first_name() === '' )
					tix[no].first_name( self.sale.leadGuest.first_name() );
				//if ( !tix[no].last_name() || tix[no].last_name() === '' )
					tix[no].last_name( self.sale.leadGuest.last_name() );
			}
		}
	});

	self.errorMsg = ko.observable(false);
	self.moreErrorMsg = ko.observable(false);
	self.locationSelect = ko.observable();

	self.paymentType = ko.observable();
	self.paymentType.subscribe(function(type){
		self.sale.payments([]);
		if(!type || !/^(credit|voucher)$/.test(type.type)){
			return;
		}

		if(type.type == 'voucher' && type.default_amount < self.sale.total()){
			// If so, push the CC payment type in, input the amount difference
			// and post an alert message.
			var cc = new $ar.CreditCardPaymentModel();
			cc.amount(self.sale.total() - type.default_amount);
			type.amount(type.default_amount);
			self.sale.payments.push(cc);
			$ar.Notification(__('Voucher amount is less than sale total. We have applied it, but you must complete the sale with a credit card.'),'error');
		} else {
			type.amount(self.sale.total());
			type.months = $ar.ccMonthModel();
		}
		self.sale.payments.push(type);
		WebBooker.Checkout.sale.leadGuest.copyToPayment();
	});
	
	self.printTickets = function() {
		WebBooker.Itinerary.printTickets({
			id: self.sale.id() || false,
			email: self.sale.leadGuest.email() || false
		});
	};
	
	self.updatePmtAmounts = function() {
		var pmts = self.sale.payments(),
			total = self.sale.total(),
			ni;
			
		if ( !pmts.length ) return false;
			
		for ( ni = 0; ni < pmts.length; ni += 1 ) {
			if ( pmts[ni].type == 'voucher' ) {
				var diff = pmts[ni].default_amount - self.sale.total();
				if ( diff < 0 ) {
					total - pmts[ni].default_amount;
				} else {
					if ( self.paymentType() && self.paymentType().type != 'voucher' ) {
						self.sale.payments.remove( pmts[ni] );
					}
				}
			}
		}
		for ( ni = 0; ni < pmts.length; ni += 1 ) {
			if ( pmts[ni].type == 'credit' && total > 0 ) {
				pmts[ni].amount( total );
			}
		}
	};

	//@ should this be here or in the app.js?
	self.hotels = ko.observableArray([]);

	self.verifying = ko.observable(false);
	self.discountCode = ko.observable();
	self.codeGood = ko.observable(true);

	self.enableSubmit = ko.computed(function() {
		if(!self.paymentType()){
			return false;
		}
		if(!self.termsAccepted()){
			return false;
		}
		if(WebBooker.CheckoutNav.processing()){
			return false;
		}
		var payments = self.sale.payments(),
			ni;
		for(ni = 0; ni < payments.length; ni++){
			if ( payments[ni].type != 'credit' ) {
				continue;
			}
			if ( !payments[ni].validate() ) {
				return false;
			}
		}
		return true;
	});

	self.enablePayment = ko.computed(function() {
		var payments = self.sale.payments();
		if( payments.length > 0 && payments[0].type_id == 0 )
			return false;
		return true;
	});	
	
	self.process = function(item, event){
		var voucher = true,
			payments = self.sale.payments(),
			ni;
		for(ni = 0; ni < payments.length; ni++){
			if(payments[ni].type == 'credit') continue;

			//should we check if r2 is in use now?
			//TODO insure this is for r2
			if(payments[ni].require_authorization_id() && !payments[ni].authorization_ID()){
				$ar.Notification(__('Authorization ID is required'),'error');
				jQuery(window).scrollTop(jQuery("#authorization_id").offset().top, 200);
				return false;	
			}
		}

		WebBooker.CheckoutNav.processing(true);

		for(ni = 0; ni < payments.length; ni++) {

			if(payments[ni].type != 'credit')
				continue;
			if(payments[ni].payee.validate() && (payments[ni].useHostedPage || payments[ni].card.validate()))
				continue;

			if(payments[ni].payee.errors().length){
				$ar.Notification(payments[ni].payee.errors,'error');
			} else {
				$ar.Notification(payments[ni].card.errors,'error');
			}
			WebBooker.CheckoutNav.processing(false);
			jQuery('#checkout-processing').modal('hide');
			return false;
		}

		jQuery('#checkout-processing').removeData('modal').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		});

		self.sale.save(function(result){
			if(!self.sale.id()){
				jQuery('#checkout-processing').modal('hide');
				return;
			}

			WebBooker.CheckoutNav.processing(false);

			if(result.error_msg){
				self.errorMsg(result.error_msg);
			} else {
				self.errorMsg(false);
				
				//cleanup current session
				var saleid = self.sale.id();
				var email = self.sale.leadGuest.email();
//				self.sale = $ar.SaleModel();
//				WebBooker.Sale.remove('leadGuestInfo');
				WebBooker.Sale.set('loadedConfirmation', false);

				if(result.hosted){
					window.location.href = result.hosted;
				} else {
					jQuery('.modal-backdrop').hide();
					jQuery('html, body').animate({ scrollTop: 0 }, 500);
					window.location.hash = '/Confirmation/' + saleid + '/' + email;
				}
			}

			jQuery('#checkout-processing').modal('hide');
		});
	};

	self.newSale = function(){
		Store.clear();
		self.sale = $ar.SaleModel();
		WebBooker.Cart.items([]);
		self.termsAccepted(false);
		WebBooker.Catalog.clearFilters();
	};
	self.setAgreement = function() {
		self.termsAccepted(true);
		$('#reseller-agreement').modal('hide');
		return false;
	};
	self.unsetAgreement = function() {
		self.termsAccepted(false);
		$('#reseller-agreement').modal('hide');
		return false;
	};

	self.getDiscount = function(){
		self.verifying(true);
		if(!self.discountCode()){
			self.verifying(false);
			self.codeGood(false);
			return;
		}
		WebBooker.API.validateDiscountCode(self.discountCode(), function(response){
			self.verifying(false);
			if(response.status == 'valid' && response.discount_apr != 'true' ){
				self.sale.discount($ar.DiscountModel(response));
				self.codeGood(true);
			} else {
				self.sale.discount(null);
				self.codeGood(false);
			}
		});
	};
	
	self.clearDiscount = function() {
		self.verifying(false);
		self.discountCode(undefined);
		self.sale.discount(undefined);
	};
	self.validateCustomize = function(){
		var valid = true,
			item = self.sale.items(),
			tix, opt, ni, no, na;
		for(ni = 0; ni < item.length; ni++){
			valid = valid && item[ni].validate();
		}
		if(!valid){
			jQuery("#checkout-customize .required").addClass('warning-shadow');
			$ar.Notification(__('You seem to have missed something. Please check again.'),'error');
			jQuery(window).scrollTop(jQuery("#checkout-activities").offset().top, 200);
		} else {
			jQuery('#checkout-customize .warning-shadow').removeClass('warning-shadow');
			jQuery("#checkout-customize .required").removeClass('warning-shadow');
		}
		return valid;
	};

	return self;
})();
WebBooker.CheckoutNav = (function(){
	var self = {};

	self.show = ko.observable(false);
	self.showCustomize = ko.observable(false);
	self.showContact = ko.observable(false);
	self.showReview = ko.observable(false);
	self.showPayment = ko.observable(false);
	self.showConfirmation = ko.observable(false);
	self.processing = ko.observable(false);

	self.progress = ko.observable(4);
	self.progressWidth = ko.computed(function(){ return self.progress() + '%'; });
	self.goToStep = function(item, event) {
		var which = arguments.length == 2?jQuery(event.currentTarget).attr('data-target'):item;
		if(which == 'Confirmation' && !self.termsAccepted()){
			return false;
		}
		//the progress for this is handled in app.js
		if(which == 'Payment'){
			if(!WebBooker.Checkout.sale.leadGuest.validate()){
				$ar.Notification(WebBooker.Checkout.sale.leadGuest.errors,'error');
				return false;
			}
			if(!WebBooker.Checkout.validateCustomize()) return false;
			
			/*var items = [];
			for ( ni = 0; ni < WebBooker.Cart.items().length; ni += 1 ) {
				items.push( WebBooker.Cart.items()[ni].processActivityForAnalytics( true ) );
			}*/

			WebBooker.Analytics.trigger( {
				cart_items: WebBooker.Cart.items(),
				subtotal: WebBooker.Checkout.sale.subtotal(),
				currency: WebBooker.selectedCurrency().title,
				prev_url: false
			}, 'action_Customize');
			
			WebBooker.Checkout.sale.leadGuest.copyToPayment();
			
			WebBooker.Analytics.trigger( { cart_items: WebBooker.Cart.items() } , 'action_checkoutBilling');
			self.progress(37);
		}
		if(which == 'Customize'){
			self.progress(8);
		}
		if(WebBooker.bootstrap.payment_types && WebBooker.bootstrap.payment_types.length == 1){
			WebBooker.Checkout.paymentType(WebBooker.bootstrap.payment_types[0]);
		}
		self.hideAll();
		WebBooker.Sale.set('sale', WebBooker.Checkout.sale.json());
		self['show' + which](true);
	};
	self.hideAll = function(){
		self.showCustomize(false);
		self.showContact(false);
		self.showReview(false);
		self.showPayment(false);
		self.showConfirmation(false);
	};
	self.continueShopping = function() {
		WebBooker.Analytics.trigger({}, 'action_continueShopping');
		window.location.hash = '/Search';
	};
	self.viewItinerary = function(){
		window.location.hash = '/Itinerary/' + WebBooker.Checkout.sale.id() + '/' + WebBooker.Checkout.sale.leadGuest.email();
	};
	self.goToSearch = function(){
		window.location.hash = '/Search';
	};

	self.showNav = ko.computed(function(){
		return self.show() && WebBooker.Checkout.sale.items().length > 0 && !self.showConfirmation();
	});

	return self;
})();

jQuery(document).ready(function(){
	ko.applyBindings(WebBooker.bootstrap, jQuery('#reseller-privacy-policy .modal-body')[0]);
});
/**
 *	ActivityRez Web Booking Engine
 *	Reseller Dashboard
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booking Engine
 */

//compresses to 2576 B

WebBooker.Dashboard = {
	show: ko.observable(false),
	showMain: ko.observable(true),
	showReports: ko.observable(false),
	showSignup: ko.observable(false),
	showPasswordReset: ko.observable(false),
	showPasswordResetConfirmation: ko.observable(false),
	signupSuccessMsg: ko.observable(false),
	agentCommissionsChart: ko.observable(),
	agentCommissionsData: ko.observable(),
	agentCommissionsStartDate: ko.observable(),
	agentCommissionsEndDate: ko.observable(),
	agentCommissionsTotal: ko.observable(),
	agentCommissionsReport: ko.observable(),

	populateAgentCommissionsData: function() {
		var date = new Date();
		if(!WebBooker.Dashboard.agentCommissionsStartDate()) {
			WebBooker.Dashboard.agentCommissionsStartDate(getDateString(new Date(date.getFullYear(), date.getMonth(), 1)));
		}
		if(!WebBooker.Dashboard.agentCommissionsEndDate()) {
			WebBooker.Dashboard.agentCommissionsEndDate(getDateString(new Date(date.getFullYear(), date.getMonth()+1, 0)));
		}

		var d = new Date(),
			startDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate()),
			endDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());

		//adjust endDate for end of day
		endDate.setHours(23,59,59);
		
		WebBooker.Dashboard.agentCommissionsData(null);
		WebBooker.Dashboard.agentCommissionsReport(null);
		WebBooker.Dashboard.agentCommissionsTotal(0);

		WebBooker.API.getAgentCommissions({
			startDate: createTimestamp(startDate),
			endDate: createTimestamp(endDate), 
			tz: d.getTimezoneOffset()
		}, function(results) {
			var dataset = [],
				obj = {},
				_date, ni;

			for ( ni = 0; ni < results.data.length; ni += 1 ) { //sum all the commissions on the same date for the chart
				b = new Date((parseInt(results.data[ni].date,10) ) * 1000);
				tmpDate = new Date((parseInt(results.data[ni].date,10) + (new Date()).getTimezoneOffset() * 60) * 1000);
				results.data[ni].date = ((tmpDate.getMonth()+1)<10?'0'+(tmpDate.getMonth()+1):(tmpDate.getMonth()+1)) + '/' +(tmpDate.getDate()<10?'0'+tmpDate.getDate():tmpDate.getDate()) + '/' + tmpDate.getFullYear();
				if(!obj.hasOwnProperty(results.data[ni].date)){
					obj[results.data[ni].date] = 0;
				}
				obj[results.data[ni].date] += parseFloat(results.data[ni].amount);
			}
			
			var someDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate());
            someDate.setHours(0);
            
			var anotherDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
            anotherDate.setHours(23);
            
			//push evey date in the range for the charts and its associated commission or 0.
			//someDate needs to be in Date format for comparison with endDate, UTC format for the chart, and yyyy/mm/dd format for indexing the obj, hence all the conversions
			while ( someDate <= anotherDate ) {

				dataset.push(
					[
						someDate.getTime(), 
						obj[(((someDate.getMonth()+1)<10?'0'+(someDate.getMonth()+1):(someDate.getMonth()+1)) + '/' + (someDate.getDate()<10?'0'+someDate.getDate():someDate.getDate()) + '/' + someDate.getFullYear())] || 0
					]
				);
				
				someDate.setDate(someDate.getDate() + 1);
			}
			someDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate());
            someDate.setHours(0);
            
			anotherDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
            anotherDate.setHours(23);

			WebBooker.Dashboard.agentCommissionsData({
				name: 'Commissions',
				pointStart: (new Date(startDate)).getTime(),
				pointEnd: (new Date(endDate)).getTime(), //not used by the series, but used for the max range of the x axis
				data: dataset
			});

			var tot = 0;
			ko.utils.arrayForEach(results.data, function(comm){ //stupid ie8 doesnt do .reduce, so for loop to sum all commissions
				tot += comm.amount;
			});

			WebBooker.Dashboard.agentCommissionsTotal(parseFloat(tot));
			WebBooker.Dashboard.agentCommissionsReport(results.data);
			WebBooker.Dashboard.initAgentCommissionsChart();
		});
	},

	initAgentCommissionsChart: function() {
		var data = WebBooker.Dashboard.agentCommissionsData();
		if(!data) return false;

		Highcharts.setOptions({
			global: {
				useUTC: false 
			}
		});
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'dash-commissions-chart',
				type: 'area',
				zoomType: 'x',
				marginBottom: 100
			},
			title: {
				text: null
			},
			xAxis: {
				type: 'datetime',
				maxZoom: 30 * 24 * 360000,
				min: data.pointStart,
				max: data.pointEnd,
				title: {
					text: null
				}
			},
			yAxis: {
				title: {
					text: 'Commissions' + ' ($)'
				},
				min: 0
			},
			legend: {
				align: 'left',
				floating: true
			}
		});
		chart.addSeries(data);

		WebBooker.Dashboard.agentCommissionsChart(chart);
	},

	reloadAgentCommissionsChart: function() {
		var chart = WebBooker.Dashboard.agentCommissionsChart();
		if(chart) {
			chart.destroy();
			WebBooker.Dashboard.agentCommissionsChart(null);
		}
		WebBooker.Dashboard.populateAgentCommissionsData();
	},
	
	downLoadCSV: function() {
		if(!WebBooker.Dashboard.agentCommissionsStartDate()) {
			var date = new Date();
			WebBooker.Dashboard.agentCommissionsStartDate(utils.getDateString(new Date(date.getFullYear(), date.getMonth(), 1)));
		}
		if(!WebBooker.Dashboard.agentCommissionsEndDate()) {
			var date = new Date();
			WebBooker.Dashboard.agentCommissionsEndDate(utils.getDateString(new Date(date.getFullYear(), date.getMonth()+1, 0)));
		}
		
		var d = new Date(),
		startDate = new Date(WebBooker.Dashboard.agentCommissionsStartDate()),
		endDate = new Date(WebBooker.Dashboard.agentCommissionsEndDate());
		
		/*if(utils.getMonthName(new Date(startDate)) == utils.getMonthName(new Date(endDate)))
			POSApp.Dashboard.Charts.commissionMonthName(utils.getMonthName(new Date(startDate)));
		else
			POSApp.Dashboard.Charts.commissionMonthName('');*/
		
		endDate.setHours(endDate.getHours()+ d.getTimezoneOffset() / 60);
		startDate.setHours(startDate.getHours()+ d.getTimezoneOffset() / 60);
			
		var csvURL = WebBooker.bootstrap.api_url+'?nonce='+WebBooker.bootstrap.nonce+'&service=arezReporting&action=getMyCommissions&data[startDate]='+createTimestamp(startDate)+'&data[endDate]='+createTimestamp(endDate)+'&data[csv]=1&data[tz]='+(d.getTimezoneOffset())+'&data[wb]=true&consumer-key=posapp';
		window.open(csvURL,'_blank');
		
	}

};

WebBooker.Dashboard.agentCommissionsEndDate.subscribe(function(value) {
	var start = WebBooker.Dashboard.agentCommissionsStartDate(), end;
	if(start) {
		start = new Date(start);
		end = new Date(value);
		if(start.getTime() > end.getTime()) {
			WebBooker.errorMsg('You can\'t select an end date that is before the start date.');
			WebBooker.Dashboard.agentCommissionsEndDate('');
		}
	}
});


WebBooker.Dashboard.show.subscribe(function(value) {
	if(value) {
		$ar.load(wb_global_vars['plugin_url'] + '/js/lib/highcharts.js', function () {
			setTimeout(function() {
				jQuery('.datepicker-dash').each(function() {
					jQuery(this).datepicker({
						numberOfMonths: 2,
						dateFormat: 'mm/dd/yy',
						beforeShow: function(a) {
							if ( a.id == 'topgross-enddate' && jQuery('#topgross-startdate').datepicker('getDate') ) {
								return {
									minDate: jQuery('#topgross-startdate').datepicker('getDate')
								};
							}
						}
					});
				});
			}, 500);
			if(!WebBooker.Dashboard.agentCommissionsData()) {
				WebBooker.Dashboard.populateAgentCommissionsData();
			}
		});
	}
	if(!WebBooker.Dashboard.agentCommissionsData()) { // need this again for stupid ie
		WebBooker.Dashboard.populateAgentCommissionsData();
	}
});/**
 *	ActivityRez Web Booker
 *	Itinerary File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker
 */

//compresses to 936 B

WebBooker.Itinerary = (function(){
	var self = {
		show: ko.observable(false),
		sale: $ar.SaleModel(),
		loading: ko.observable(false),
		loaded: ko.observable(false),

		errorMsg: ko.observable(false),
	};

	self.show.subscribe(function(value) {
		if(value) {
			// Analytics hook.
			WebBooker.Analytics.trigger({}, 'action_Itinerary');
		}
	});

	self.reset = function(){
		self.loading(false);
		self.errorMsg(false);
		self.loaded(false);
		self.sale.id('');
		self.sale.leadGuest.email('');
	};

	self.load = function(){
		if(!self.sale.leadGuest.email() && !WebBooker.Agent.user_id()) {
			self.errorMsg(__('E-mail address is missing.')());
			return false;
		}

		if(!self.sale.id()) {
			self.errorMsg(__('Reservation number is missing.')());
			return false;
		}

		self.loaded(false);
		self.loading(true);
		self.errorMsg(false);

		self.sale.load(function(result){
			self.loading(false);
			if(result.status != 1) {
				self.loaded(false);
				self.errorMsg(__(result.msg)());
				return;
			}
			
			self.loaded(true);
			
			WebBooker.Analytics.trigger( result.data, 'action_viewItinerary' );
		});
	};
	self.popupError = ko.observable(false);
	self.popupErrorClose = function(){
		self.popupError(false);
	}
	self.printTickets = function(args) {
		var params = {
			saleID: args.id || self.sale.id(),
			output: 'html',
			email: args.email || self.sale.leadGuest.email()
		};
		WebBooker.API.doItineraryAction(params, function(data) {
			var itineraryWindow = window.open('');
			if(!itineraryWindow || itineraryWindow.closed || typeof itineraryWindow.closed=='undefined'){ 
				self.popupError(true);
			}
			if(itineraryWindow){
				itineraryWindow.document.write(data.data);
				itineraryWindow.focus();
			}
		});
	};

	return self;
})();
/**
 *	ActivityRez Web Booking Engine
 *	Analytics Hooks File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker Plugin
 */

WebBooker.Analytics = {
	trigger: function( data, action ) {
		if( WebBooker.Analytics.hasOwnProperty( action ) ) {
			WebBooker.Analytics[ action ]( data );
		}
	},

	stored_data: {}
};/**
 *	ActivityRez Web Booking Engine
 *	Initalization File
 *
 *	@author Ryan Freeman <ryan@stoked-industries.com>
 *	@package ActivityRez
 *	@subpackage Web Booker Plugin
 */

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n != n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n != Infinity && n != -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

// Function for posting the current page's height through
// the iframe to the parent.
var if_height_interval = false;
function setHeight(parent_url) {
	if_height_interval = setInterval(function() {
		WebBooker.postMessage('if_height=' + jQuery('body').outerHeight(true));
	}, 2000);
}

function unescapeHTML(code) {
	var node = document.createElement('div');
	node.innerHTML = code;
	var node_r = node.innerHTML;
	return node_r;
}

// Listeners to grab the parent page's URL and use it
// in the postMessage setting the iframe's height.
var if_parent_url = false;
if(window.addEventListener) {
	window.addEventListener('message', function(event) {
		if(if_height_interval) {
			clearInterval(if_height_interval);
		}
		if(event.origin.substring(0,4) !== '_FB_'){
			WebBooker.bootstrap.parent_url = event.origin;
			setHeight(event.data);
		}
	});
} else if(window.attachEvent) {
	window.attachEvent('onmessage', function(event) {
		if(if_height_interval) {
			clearInterval(if_height_interval);
		}
		if(event.origin.substring(0,4) !== '_FB_'){
			WebBooker.bootstrap.parent_url = event.origin;
			setHeight(event.data);
		}
	});
}

jQuery(document).ready(function(){
	if(jQuery('#multi-everything').length){
		ko.applyBindings(WebBooker, jQuery('#multi-everything')[0]);
	}
	if(jQuery('#webbooker-sidebar').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-sidebar')[0]);
	}
	if(jQuery('#webbooker-modals').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-modals')[0]);
	}
	if(jQuery('#webbooker-main').length){
		ko.applyBindings(WebBooker, jQuery('#webbooker-main')[0]);//don't bind the same object to different places in ie8
	}

	WebBooker.init();
	WebBooker.wbLoaded(true);
    Path.rescue(notFound);
	//this interval updates the currency exchange rates for the user every 3min
	//in case there's an update on the server
	setInterval( function(){
		WebBooker.API.updateCurrency( WebBooker.bootstrap.webBookerID, function( data ) {
			data = data.data;
			var curr = WebBooker.selectedCurrency().title,
				ni;
			WebBooker.available_currencies(data);
			for ( ni in data ) {
				if ( data[ni].title != curr ) continue;
				WebBooker.selectedCurrency(data[ni]);
				break;
			}
		} );
	}, 180000 );
	
	var searches = [ 'search_tag', 'search_category', 'search_destination', 'search_mood' ],
		is_search = false;
	
	for ( var ni = 0; ni < searches.length; ni += 1 ) {
		if ( !WebBooker.bootstrap[ searches[ ni ] ] ) continue;
		is_search = true;
		if(!WebBooker.Catalog.searchResults().length) {
			WebBooker.Catalog.hasSearched(false);
		}
		WebBooker.showInitLoader(false);
		WebBooker.hideAllScreens();
		WebBooker.Catalog.show(true);
		if(WebBooker.Catalog.pageIndex() != 1) {
			WebBooker.Catalog.pageIndex(1);
		} else {
			WebBooker.Catalog.load();
		}
		jQuery('#webbooker-search-results .results').focus();
	}
	
	if ( !WebBooker.bootstrap.activity && !is_search ) {
		Path.root("#/Home");
		Path.listen();
	}
});