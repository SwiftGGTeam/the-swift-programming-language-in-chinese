(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);


require(["gitbook"], function(gitbook) {
    var isAvailable = function() {
        return (
            typeof mixpanel !== "undefined" &&
            typeof mixpanel.track === "function"
        );
    };

    var track = function(e, data, t) {
        if (!isAvailable()) {
            console.warn("tracking not available!");
            t = t || 500;
            setTimeout(function() {
                console.log(" -> retest tracking");
                track(e, data, t*2);
            }, t);
            return;
        }
        console.log("track", e);

        data = data || {};
        data.domain = window.location.host;

        mixpanel.track(e, data);
    };

    gitbook.events.bind("start", function(e, config) {
        config.mixpanel = config.mixpanel || {};

        mixpanel.init(config.mixpanel.token || "01eb2b950ae09a5fdb15a98dcc5ff20e");
        track("page.start");
    });

    gitbook.events.bind("page.change", function() {
        track("page.change");
    });

    gitbook.events.bind("exercise.submit", function(e, data) {
        track("exercise.submit", data);
    });
});