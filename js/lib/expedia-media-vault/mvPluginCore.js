(function (name, definition) {
    var theModule = definition(),
    // this is considered "safe":
      hasDefine = typeof define === 'function' && define.amd,
    // hasDefine = typeof define === 'function',
      hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) { // AMD Module
        define(theModule);
    } else if (hasExports) { // Node.js Module
        module.exports = theModule;
    } else { // Assign to common namespaces or simply the global object (window)
        (this.jQuery || this.ender || this.$ || this)[name] = theModule;
    }
})('mvPluginCore', function () {

    if (typeof mvPlugin === 'undefined') {
        throw Error("mvPlugin.config was not found.  Please make sure mvPlugin.config.js was referenced before mvPlugCore.")
    }
    var module = this,
        baseURL = mvPlugin.config.baseURL,
        version = mvPlugin.config.version,
        apiKey = mvPlugin.config.apiKey;

    module.plugins = [];
    jQuery.support.cors = true;
    // define the core module here and return the public API
    module.doSearch = function (criteria, onSuccess, onError) {
        var msg = [],
          asset1 = {},
          asset2 = {},
          params = [],
          query = "",
          key = "apiKey=" + apiKey,
          supplierFilter = null,
          offerFilter = null,
          tagFilter = null,
          widthFilter = null,
          heightFilter = null;

        supplierFilter = this.createFilter("mandatory", "exact", "supplier", criteria.supplier);
        if (typeof supplierFilter !== "undefined") {
            params.push(supplierFilter);
        }
        offerFilter = this.createFilter("optional", "exact", "tags", criteria.offerIdList);
        if (typeof offerFilter !== "undefined") {
            params.push(offerFilter);
        }
        tagFilter = this.createFilter("mandatory", "exact", "tags", criteria.tagList);
        if (typeof tagFilter !== "undefined") {
            params.push(tagFilter);
        }
        widthFilter = this.createFilter("mandatory", "exact", "available.width", criteria.width);
        if (typeof widthFilter !== "undefined") {
            params.push(widthFilter);
        }
        heightFilter = this.createFilter("mandatory", "exact", "available.height", criteria.height);
        if (typeof heightFilter !== "undefined") {
            params.push(heightFilter);
        }

        // approved assets only
        params.push(this.createFilter("mandatory", "exact", "approval", "approved"));
        params.push(key);

        var real_params = {},
            ni, split;
        for (ni = 0; ni < params.length; ni++) {
            split = params[ni].split(/\s*=\s*/);
            real_params[split[0]] = split[1];
        }

        if ($.browser.msie && window.XDomainRequest) {
            var xdr = new XDomainRequest();
            xdr.open("get", baseURL + '/' + version + '/assets/?' + params.join('&'));
            xdr.onload = function () {
                var JSON = $.parseJSON(xdr.responseText);
                if (onSuccess) {
                    onSuccess(JSON);
                }
            };

            xdr.onerror = function () {
                _result = false;
                if (onError) {
                    onError(_result);
                }
            };
            // ie9 requires all handlers being specified for XDomainRequest() to work
            xdr.onprogress = function() {};
            xdr.ontimeout = function() {};



            xdr.send();
        } else {
            $.ajax({
                type: "GET",
                url: baseURL + "/" + version + "/assets/?" + params.join('&'),
                success: onSuccess,
                error: onError
            });
        }
        return;
    };

    module.createFilter = function (type, op, field, values) {
        var filter = "filter";
        filter += "[" + type + "]"; // eg. filter[mandatory]
        filter += "[" + op + "]"; // eg. filter[mandatory][exact]
        filter += "[" + field + "]"; // eg. filter[mandatory][exact][supplier]
        if (field === 'tags') {
            filter += "[]";
        }

        var result = [];
        if (typeof values === "object" && values instanceof Array) {
            $(values).each(function (v) {
                if (v.length > 0) {
                    result.push(filter + "=" + v);
                }
            });
            if (result.length > 0) {
                return result.join("&");
            }
        }
        if (values.length > 0) {
            return filter + "=" + values;
        }

        return;
    };


    return {
        search: function (criteria, onSuccess, onError) {
            if (!(criteria instanceof mvPlugin.criteria)) {
                throw Error("Invalid search criteria object");
            }

            // trim whitespaces in each offer id
            var offerIdList = [],
                tagList = [];
            if (criteria.offerIdList !== null) {
                $(criteria.offerIdList).each(function (i, o) {
                    var v = $.trim(o);
                    if (v.length > 0) {
                        offerIdList.push(v);
                    }
                });
                criteria.offerIdList = offerIdList;
            }
            // trim whitespaces in each tag
            if (criteria.tagList !== null) {
                $(criteria.tagList).each(function (i, t) {
                    var v = $.trim(t);
                    if (v.length > 0) {
                        tagList.push(v);
                    }
                });
                criteria.tagList = tagList;
            }
            // perform search
            if (!criteria.isEmpty()) {
                return module.doSearch(criteria, onSuccess, onError);
            }
            return {};
        }
    };
});

var mvPlugin = mvPlugin || {};
mvPlugin.criteria = function () {
    var supplier = '',
        offerIdList = '',
        tagList = '',
        width = '',
        height = '';

    this.supplier = supplier;
    this.offerIdList = offerIdList;
    this.tagList = tagList,
    this.width = width;
    this.height = height;

    this.isEmpty = function () {
        return this.supplier.length === 0 &&
               this.offerIdList.length === 0 &&
               this.tagList.length === 0 &&
               this.width.length === 0 &&
               this.height.length === 0;
    };
};