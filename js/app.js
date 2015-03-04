// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ionic.service.core', 'ionic.service.push'])

    .config(['$ionicAppProvider', function($ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // Your App ID
            app_id: '910e702a',
            // The public API key services will use for this app
            api_key: '96427b01d3a97e5f256cd3226d265e7884d33efd6e268385',
            // Your GCM sender ID/project number (Uncomment if supporting Android)
            gcm_id: '312001788208'
        });

    }])

    .run(function($ionicPlatform, $rootScope, $ionicPush, $cordovaPush) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }

            //Handle new push notifications as they arrive, register android devices if necessary
            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                if (ionic.Platform.isAndroid()) {
                    if (notification.event == "registered") {
                        /**
                         * Android handles push notification registration in a callback from the GCM service (whereas
                         * iOS can be handled in a single call), so we need to check for a special notification type
                         * here.
                         */
                        $ionicPush.callback(notification.regid, $scope.metadata);
                    } else {
                        /**
                         * Handle your Android notification here
                         */
                    }
                }
                else if (ionic.Platform.isIOS()) {
                    /**
                     * Handle your iOS notification here
                     */
                }
            });
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html",
                controller: 'AppCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });
