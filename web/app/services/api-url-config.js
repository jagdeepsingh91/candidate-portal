(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.apiUrlConfig',[
        function () {

            var basePath = "http://siddharthk:8080";
            //var basePath = "http://sumeets1:8080";
            return {
                // User
                createUser : basePath+"/user/",
                userLogin : basePath+"/user/login",
                userLogout : basePath+"/user/logout",
                changePassword : basePath+"/user/password",
                forgotPassword : basePath+"/user/password",
                validatePasswordUUID : function (uuid) {
                    return basePath+"/user/password/validate/"+uuid;
                },

                // Profile
                getAttachments : basePath+"/profile/attachments",
                isApplicantCreated : basePath+"/profile/id",
                createApplicantProfile : basePath+"/profile/create",
                getApplicantProfile : basePath+"/profile/",
                resumeUpload : basePath+"/profile/upload",
                profileStatus : basePath+"/profile/status",
                uploadAttachments : basePath+"/profile/upload/attachment",
                getProfileMasterList : function (type) {
                    return basePath+"/profile/master/"+type
                },

                // Position
                positionList : basePath+"/position/list",
                positionFields : basePath+"/position/fields",
                getPositionDetails : function (id) {
                    return basePath+"/position/"+id
                }
                
            }
        }
    ]);
})();