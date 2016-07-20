(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.apiUrlConfig',[
        function () {
			var basePath = "http://tpdemo3.talentica.com/CandidatePortal";
			//var basePath = "http://tp-w2k8r2-vm8:9090/CandidatePortal";
            //var basePath = "http://siddharthk:8080/CandidatePortal";
            //var basePath = "http://sumeets1:8080/CandidatePortal";
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
                },
                // Master
                getMastersId : function (type, value) {
                    return basePath+"/masters/id/"+type+"/"+value;
                },
                getMastersDropdownList : function (id) {
                    return basePath+"/masters/custom/dropdown/"+id;
                },
                // Documents
                downloadFile : basePath+"/document/download"
                
            }
        }
    ]);
})();