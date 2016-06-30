/**
 * Created by muenchdo on 29/06/16.
 */
angular.module('ui', [])

    .controller('uiController', function ($window, $http, $timeout) {
        var vm = this;

        vm.echoes = [];
        
        $http.get('/user').then(function (response) {
            vm.user = response.data;
            vm.authenticated = true;
        }).catch(function () {
            vm.user = null;
            vm.authenticated = false;
        });

        vm.echo = function () {
            $http.post('/api/echo', {
                content: vm.message
            }).then(function (response) {
                vm.message = '';
                vm.echoes.unshift(response.data.content);
                $timeout(function () {
                    vm.echoes.pop();
                }, 5000);
            });
        };

        vm.hello = function () {
            $http.get('/api/hello').then(function (response) {
                vm.helloResponse = response.data.content
                $timeout(function () {
                    vm.helloResponse = null;
                }, 3000);
            });
        };

        vm.logout = function () {
            $http.post('/logout', {}).then(function () {
                $window.location.href = $window.location.origin;
            });
        };
    });