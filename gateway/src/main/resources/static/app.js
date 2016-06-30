/**
 * Created by muenchdo on 29/06/16.
 */
angular.module('gateway', [])

    .config(function ($httpProvider) {

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    })

    .controller('gatewayController', function ($window, $http) {
        var vm = this;

        $http.get('/user').then(function (response) {
            vm.user = response.data;
            vm.authenticated = true;
            // Uncomment this if you want to be redirected to the UI application right away.
            // $window.location.href = $window.location.origin + '/ui';
        }).catch(function () {
            vm.user = null;
            vm.authenticated = false;
        });

        vm.login = function () {
            $window.location.href = $window.location.origin + '/login';
        };

        vm.logout = function () {
            $http.post('/logout', {}).then(function () {
                vm.user = null;
                vm.authenticated = false;
            });
        };
    });