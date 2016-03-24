(function() {
    this.comm = {
        get: function (addr, opts, entity) {return xhr('GET', addr, opts, entity)},
        post: function (addr, opts, entity) {return xhr('POST', addr, opts, entity)},
        request: xhr
    };
    //
    function xhr(method, addr, opts, entity) {
        return new Promise(function (succ, fail) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, addr, true);
            if (opts) {
                Object.keys(opts).forEach(function (key) {
                    var val = opts[key];
                    xhr.setRequestHeader(key, val);
                });
            }
            //
            xhr.addEventListener('load', function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    succ(xhr);
                } else {
                    fail({xhr: xhr, reason: 'http error'});
                }
            });
            xhr.addEventListener('error', function() {
                fail({xhr: xhr, reason: 'no connection'});
            });
            xhr.addEventListener('abort', function() {
                fail({xhr: xhr, reason: 'abort'});
            });
            //
            if (!entity) {
                entity = '';
            }
            xhr.send(entity);
        });
    }
}).call(this);
