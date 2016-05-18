/**
 *  Custom validation directive
 *  @author Jagdeep
 *
 *  How to use
 *  load this directive and write in html
 *  Example :
 *  <form name="anyName" my-validation> optional attributes : on-success-cls="class name", on-error-cls="class name", err-msg-cls="class name"
 *      <input type="anyType" ng-model="modelName" required
 *      err-msg-required="required message"
 *      err-msg-pattern = "pattern message"
 *      err-msg-min = "min message"
 *      err-msg-max = "max message"
 *      err-msg-minlength = "minlength message"
 *      err-msg-maxlength = "maxlength message"
 *      err-msg-number = "number message"
 *      />
 *  </form>
 *  given err msg validation only it will validate
 */
(function () {
    angular.module('candidatePortal.application').directive('compareTo', [
        '$parse',
        function ($parse) {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function(scope, element, attributes, ngModel) {
                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue == scope.otherModelValue;
                    };
                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        }
    ]);
    angular.module('candidatePortal.application').directive('dateGreaterThan', [
        '$parse',
        function ($parse) {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=dateGreaterThan"
                },
                link: function(scope, element, attributes, ngModel) {
                    //console.log(attributes.ngRequired);
                    //console.log(attributes.required);
                    //if(attributes.required || attributes.ngRequired);
                    ngModel.$validators.dateGreaterThan = function(modelValue) {
                        if(!modelValue)
                            return true;

                        var toDate, fromDate;
                        if(modelValue.split("-").length == 1) {
                            toDate = moment(modelValue, "YYYY");
                            fromDate = moment(scope.otherModelValue, "YYYY");
                        }
                        else if(modelValue.split("-").length == 2) {
                            toDate = moment(modelValue, "MM-YYYY");
                            fromDate = moment(scope.otherModelValue, "MM-YYYY");
                        }
                        else{
                            toDate = moment(modelValue, "DD-MM-YYYY");
                            fromDate = moment(scope.otherModelValue, "DD-MM-YYYY");
                        }
                        console.log(toDate);
                        console.log(fromDate);
                        var diff = toDate.diff(fromDate, 'days');
                        console.log(diff);
                        return  diff >= 0 || (modelValue == null && scope.otherModelValue == null) ? true : false;
                        //return true;
                    };
                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        }
    ]);
    angular.module('candidatePortal.application').directive('myValidation', [
        '$parse',
        '$compile',
        '$interval',
        '$rootScope',
        function ($parse, $compile, $interval, $rootScope) {
            return {
                restrict: 'EA',
                compile : function (tElement, tAttrs, transclude) {
                    jQuery.noConflict();
                    jQuery(document).ready(function($) {
                        var formName = tAttrs.name;
                        var onSuccessCls = tAttrs.onSuccessCls || "has-success";
                        var onErrorCls = tAttrs.onErrorCls || "has-error";
                        var errMsgCls = tAttrs.errMsgCls || "error-msg";

                        var createErrMsgTemplate = function (elem) {
                            var attrs = $(elem)[0].attributes;
                            var elemName = $(elem).attr("name");
                            var htmlStr = "";
                            for (var i = 0; i < attrs.length; i++) {
                                if (attrs[i].name.indexOf("err-msg") == 0) {
                                    if (attrs[i].name == 'err-msg-required') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.required">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-pattern') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.pattern">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-email') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.email">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-number') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.number">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-min') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.min">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-max') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.max">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-maxlength') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.maxlength">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-minlength') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.minlength">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-compareto') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.compareTo">' + attrs[i].value + '</p>';
                                    }
                                    else if (attrs[i].name == 'err-msg-dategreaterthan') {
                                        htmlStr += '<p class="' + errMsgCls + '" ng-show="' + formName + '.' + elemName + '.$error.dateGreaterThan">' + attrs[i].value + '</p>';
                                    }
                                }
                            }
                            return htmlStr;
                        };

                        var createErrTemplate = function (elem) {
                            var errMsgHtml = createErrMsgTemplate(elem);
                            var elemName = $(elem).attr("name");
                            var errHtml = '<span ng-show="' + formName + '.' + elemName + '.$invalid && ' + formName + '.' + elemName + '.$dirty">' + errMsgHtml + '</span>';
                            return errHtml;
                        };

                        var doValidate = function (elem) {
                            // for error class at parent div
                            var elemName = $(elem).attr("name");
                            if (elemName != null && elemName != undefined) {
                                var errClassStr = "{'" + onErrorCls + "' : " + formName + "." + elemName + ".$invalid && " + formName + "." + elemName + ".$dirty, '" + onSuccessCls + "' : !" + formName + "." + elemName + ".$invalid && " + formName + "." + elemName + ".$dirty, 'focused' : "+$(elem).attr("ng-model")+" || "+ formName + "." + elemName + ".$invalid}";
                                $(elem).parent().closest('div').attr("ng-class", errClassStr);
                                // for error messages
                                var errTemplates = createErrTemplate(elem);
                                $(elem).parent().append(errTemplates);
                            }
                            else{
                                console.log("please type input element name for below item");
                                console.log($(elem));
                            }
                        };

                        var findFieldsAndOperate = function (element) {
                            var inputElem = $(element).find("input, textarea, select, multiple-autocomplete");
                            //console.log(inputElem);
                            for (var i = 0; i < inputElem.length; i++) {
                                var isReq = $(inputElem[i]).attr("required");
                                var isNgReq = $(inputElem[i]).attr("ng-required");
                                //if ((isReq && isReq != undefined) || (isNgReq && isNgReq != undefined)) {
                                doValidate(inputElem[i]);
                                //}
                            }
                            //$compile(tElement.contents())(scope);
                        };
                        findFieldsAndOperate(tElement);

                        //var observeDOM = (function(){
                        //    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
                        //        eventListenerSupported = window.addEventListener;
                        //
                        //    return function(obj, callback){
                        //        if( MutationObserver ){
                        //            // define a new observer
                        //            var obs = new MutationObserver(function(mutations, observer){
                        //                console.log("observing");
                        //                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                        //                    callback(mutations);
                        //            });
                        //            // have the observer observe foo for changes in children
                        //            obs.observe( obj, { childList:true, subtree:true });
                        //        }
                        //        else if( eventListenerSupported ){
                        //            obj.addEventListener('DOMNodeInserted', callback, false);
                        //            obj.addEventListener('DOMNodeRemoved', callback, false);
                        //        }
                        //    }
                        //})();
                        ////console.log(tElement[0]);
                        //observeDOM( tElement[0] ,function(args1){
                        //    //console.log('dom changed', args1[0].addedNodes);
                        //    //console.log($(args1[0].addedNodes));
                        //    //findFieldsAndOperate(args1[0].addedNodes);
                        //});

                    });
                }
            };
        }
    ]);
})();
