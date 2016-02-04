(function() {
    'use strict';
    
    angular
        .module('app')
        .constant('API', {
            url: 'http://localhost:3000/api/'
        })
        .constant('COMPONENTS', {
            app: 'components/app/',
            auth: 'components/auth/',
            shared: 'components/shared/',
            user: 'components/user/'
        });

})();