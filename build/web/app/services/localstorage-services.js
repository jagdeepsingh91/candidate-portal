(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.localStorageService', [
        '$rootScope',
        function ($rootScope) {
            var localStoreDBName = "TPCandidatePortal";

            var saveToLocalStore = function (obj) {
                if(!obj)
                    return;
                var obj2Json = JSON.stringify(obj);
                localStorage.setItem(localStoreDBName,obj2Json);
            };

            var getLocalStoreObj = function () {
                var data = localStorage.getItem(localStoreDBName);
                if(!data)
                    return {};

                return JSON.parse(data);
            };

            var doLogOut = function () {
                //localStorage.setItem(localStoreDBName, undefined);
                localStorage.removeItem(localStoreDBName);
                $rootScope.loggedInStatus = false;
            };

            var saveUserDetails = function(obj){
                if(!obj)
                    return null;
                $rootScope.loggedInStatus = true;
                $rootScope.loggedInUserName = obj.name;
                var storedObj = getLocalStoreObj();
                storedObj.userDetails = obj;
                saveToLocalStore(storedObj);
            };

            var getUserDetails = function(){
                var userObj = getLocalStoreObj().userDetails;
                if(!userObj)
                    return null;
                $rootScope.loggedInUserName = userObj.name;
                $rootScope.loggedInStatus = true;
                return userObj;
            };

            return {
                doLogOut : doLogOut,
                saveUserDetails : saveUserDetails,
                getUserDetails : getUserDetails
            };
        }
    ]);
})();