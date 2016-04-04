(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.apiMethods',[
        '$http',
        function ($http) {
            return {
                apiGETReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'GET',
                        url: url,
                        params: obj,
                        showLoadingBar : showLoadingBar || true
                    });
                },
                apiPOSTReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'POST',
                        url: url,
                        data: obj,
                        showLoadingBar : showLoadingBar || true
                    });
                },
                apiPATCHReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'PATCH',
                        url: url,
                        data: obj,
                        showLoadingBar : showLoadingBar || true
                    });
                },
                apiPUTReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'PUT',
                        url: url,
                        data: obj,
                        showLoadingBar : showLoadingBar || true
                    });
                },
                apiDELETEReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'DELETE',
                        url: url,
                        data: obj,
                        showLoadingBar : showLoadingBar || true
                    });
                },
                apiUploadFileReq : function (url, obj, showLoadingBar) {
                    return $http({
                        method: 'POST',
                        url: url,
                        data: obj,
                        headers: {
                            "Content-Type" : undefined
                        },
                        showLoadingBar : showLoadingBar || true
                    });
                }
            }
        }
    ]);
})();