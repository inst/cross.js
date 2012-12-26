(function (window, document, undefined) {

	window.$$ = $$;
	window.params = params;
	window.htmlentities = htmlentities;

	window.Node = Node;
	window.Request = Request;
	window.Cookie = Cookie;

	Cookie.set = function (name, value) {
		return document.cookie = name + "=" + escape(value);
	};
	Cookie.get = function (name) {
		var c = document.cookie,
		    n = escape(name).replace(/[\-\.\+\*]/g, "\\$&"),
		    r = "(?:^|.*;\\s*)" + n + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*",
		    v = unescape(c.replace(new RegExp(r), "$1"));
		return c.length === v.length ? null : v;
	};

	function Cookie (name, value) {
		switch (arguments.length) {
			case 1:  return Cookie.get(name);
			case 2:  return Cookie.set(name, value);
			default: return;
		}
	}

	function Node (name, attrs) {
		var i, node = document.createElement(name);
		if (undefined !== attrs) {
			for (i in attrs) {
				if (attrs.hasOwnProperty(i)) {
					node.setAttribute(i, attrs[i]);
				}
			}
		}
		return node;
	}

	function Request () {
		if (undefined !== XMLHttpRequest)
			return new XMLHttpRequest;
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {}
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}

		throw new Error("This browser does not support XMLHttpRequest");
	}


	function $$(id, scope) {
		return (scope || document).getElementById(id);
	}

	function params (name) {
		var params = window.location.hash.substr(1).split("&"),
		    p, hash = {}, i = params.length;
		while (i--) {
			p = params[i].split("=");
			hash[p[0]] = p[1];
		}
		return undefined === name ? hash : hash[name];
	}

	/**
	 * Converts all applicable characters to HTML entities
	 * Use with attention!
	 * 
	 * @see: http://benv.ca/2012/10/4/you-are-probably-misusing-DOM-text-methods/
	 * @author: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	 */
	function htmlentities (s) {
		var div = new Node("div");
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}

})(window, document);

