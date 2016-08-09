(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.services.commonService',[
        '$rootScope',
        function ($rootScope) {
            var showSuccessMsg = function(msg, time){
                //jQuery.noConflict();
                //jQuery(document).ready(function($){
                //    window.scrollTo(0, 0);
                //    var alertHtml = '<div class="col-sm-offset-6 col-sm-12" style="top:35px;z-index: 999;"><div class="alert alert-success fade in text-center">'+
                //        '<a  class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success! </strong> '+ msg +
                //        '</div></div>';
                //    $("body").prepend(alertHtml);
                //});
                if(time == "" || time == null || time == undefined)
                    time = 4000;
                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    $("#appSuccessMsgDiv").show().delay(time).fadeOut();
                    $rootScope.appSuccessMsg = msg;
                });
            };

            var showInfoMsg = function(msg, time){
                //jQuery.noConflict();
                //jQuery(document).ready(function($){
                //    window.scrollTo(0, 0);
                //    var alertHtml = '<div class="col-sm-offset-6 col-sm-12" style="top:35px;z-index: 999;"><div class="alert alert-info fade in text-center">'+
                //        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Info!</strong> '+ msg +
                //        '</div></div>';
                //    $("body").prepend(alertHtml);
                //});
                if(time == "" || time == null || time == undefined)
                    time = 4000;

                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    $("#appErrorMsgDiv").show().delay(time).fadeOut();
                    $rootScope.appErrorMsg = msg;
                });
            };

            var showWarningMsg = function(msg, time){
                //jQuery.noConflict();
                //jQuery(document).ready(function($){
                //    window.scrollTo(0, 0);
                //    var alertHtml = '<div class="col-sm-offset-6 col-sm-12" style="top:35px;z-index: 999;"><div class="alert alert-warning fade in text-center">'+
                //        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning! </strong> '+ msg +
                //        '</div></div>';
                //    $("body").prepend(alertHtml);
                //});
                if(time == "" || time == null || time == undefined)
                    time = 4000;

                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    $("#appErrorMsgDiv").show().delay(time).fadeOut();
                    $rootScope.appErrorMsg = msg;
                });
            };

            var showErrorMsg = function(msg, time){
                //jQuery.noConflict();
                //jQuery(document).ready(function($){
                //    window.scrollTo(0, 0);
                //    var alertHtml = '<div class="col-sm-offset-6 col-sm-12" style="top:35px;z-index: 999;"><div class="alert alert-danger fade in text-center">'+
                //        '<a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error! </strong> '+ msg +
                //        '</div></div>';
                //    $("body").prepend(alertHtml);
                //});
                if(time == "" || time == null || time == undefined)
                    time = 4000;

                jQuery.noConflict();
                jQuery(document).ready(function($){
                    window.scrollTo(0, 0);
                    $("#appErrorMsgDiv").show().delay(time).fadeOut();
                    $rootScope.appErrorMsg = msg;
                });
            };

            var onApiResponseError = function (response) {
                if(response.data != null){
                    if(response.data.response != null && response.data.response != "")
                        showErrorMsg(response.data.response);
                }
                //else
                //    showErrorMsg("Server Failure");
            };

            var showLoading = function(){
                //window.scrollTo(0, 0);
                document.getElementById("loadingDiv").style.visibility = "visible";
            };

            var hideLoading = function () {
                document.getElementById("loadingDiv").style.visibility = "hidden";
            };

            var parseHtmlString = function(input){
                var e = document.createElement('div');
                e.innerHTML = input;
                return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
            };

            return {
                showSuccessMsg: showSuccessMsg,
                showInfoMsg : showInfoMsg,
                showWarningMsg : showWarningMsg,
                showErrorMsg : showErrorMsg,
                onApiResponseError : onApiResponseError,
                showLoading : showLoading,
                hideLoading : hideLoading,
                parseHtmlString : parseHtmlString
            }
        }
    ]);
})();