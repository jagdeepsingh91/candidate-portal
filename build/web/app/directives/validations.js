!function(){angular.module("candidatePortal.application").directive("compareTo",["$parse",function(e){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(e,r,a,n){n.$validators.compareTo=function(r){return r==e.otherModelValue},e.$watch("otherModelValue",function(){n.$validate()})}}}]),angular.module("candidatePortal.application").directive("dateGreaterThan",["$parse",function(e){return{require:"ngModel",scope:{otherModelValue:"=dateGreaterThan"},link:function(e,r,a,n){n.$validators.dateGreaterThan=function(r){var a=moment(r,"dd-mm-yyyy"),n=moment(e.otherModelValue,"dd-mm-yyyy"),t=a-n;return t>0},e.$watch("otherModelValue",function(){n.$validate()})}}}]),angular.module("candidatePortal.application").directive("myValidation",["$parse","$compile","$interval","$rootScope",function(e,r,a,n){return{restrict:"EA",compile:function(e,r,a){jQuery.noConflict(),jQuery(document).ready(function(a){var n=r.name,t=r.onSuccessCls||"has-success",o=r.onErrorCls||"has-error",l=r.errMsgCls||"error-msg",i=function(e){for(var r=a(e)[0].attributes,t=a(e).attr("name"),o="",i=0;i<r.length;i++)0==r[i].name.indexOf("err-msg")&&("err-msg-required"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.required">'+r[i].value+"</p>":"err-msg-pattern"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.pattern">'+r[i].value+"</p>":"err-msg-email"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.email">'+r[i].value+"</p>":"err-msg-number"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.number">'+r[i].value+"</p>":"err-msg-min"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.min">'+r[i].value+"</p>":"err-msg-max"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.max">'+r[i].value+"</p>":"err-msg-maxlength"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.maxlength">'+r[i].value+"</p>":"err-msg-minlength"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.minlength">'+r[i].value+"</p>":"err-msg-compareto"==r[i].name?o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.compareTo">'+r[i].value+"</p>":"err-msg-dategreaterthan"==r[i].name&&(o+='<p class="'+l+'" ng-show="'+n+"."+t+'.$error.dateGreaterThan">'+r[i].value+"</p>"));return o},s=function(e){var r=i(e),t=a(e).attr("name"),o='<span ng-show="'+n+"."+t+".$invalid && "+n+"."+t+'.$dirty">'+r+"</span>";return o},m=function(e){var r=a(e).attr("name");if(null!=r&&void 0!=r){var l="{'"+o+"' : "+n+"."+r+".$invalid && "+n+"."+r+".$dirty, '"+t+"' : !"+n+"."+r+".$invalid && "+n+"."+r+".$dirty}";a(e).parent().closest("div").attr("ng-class",l);var i=s(e);a(e).parent().append(i)}else console.log("please type input element name for below item"),console.log(a(e))},u=function(e){for(var r=a(e).find("input, textarea, select, multiple-autocomplete"),n=0;n<r.length;n++){a(r[n]).attr("required"),a(r[n]).attr("ng-required");m(r[n])}};u(e)})}}}])}();