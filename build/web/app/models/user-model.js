(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.models.userModel', [
        function () {
            
            var digestUserApiObj = function (apiObj) {
                return {
                    applicantId: apiObj.applicantId,
                    email: apiObj.email,
                    password: apiObj.password,
                    tokenId: apiObj.tokenId,
                    userId: apiObj.userId,
                    name: apiObj.userName
                }
            };

            var createUserApiObj = function (uiObj) {
                return {
                    applicantId: uiObj.applicantId,
                    email: uiObj.email,
                    password: uiObj.password,
                    tokenId: uiObj.tokenId,
                    userId: uiObj.userId,
                    userName: uiObj.name
                }
            };
            
            return {
                digestUserApiObj : digestUserApiObj,
                createUserApiObj : createUserApiObj
            }
        }
    ]);
})();