!function(){angular.module("candidatePortal.application").directive("setModelValue",[function(){return{restrict:"A",scope:{ngModel:"=",setModelValue:"=",listModel:"=",apiUrl:"=",dtoType:"@"},link:function(l,e,n,o){console.log(l.ngModel);var t=function(e,n){if(null!=e&&null!=n){var o=-1;e.forEach(function(l,e,t){angular.equals(l,n)&&(o=e)}),-1!=o&&(l.ngModel=l.setModelValue[o]),console.log(l.ngModel)}};l.$watch("setModelValue",function(e,n){null!=e&&t(e,l.ngModel)}),l.$watch("ngModel",function(e,n){null!=e&&t(l.setModelValue,e)})}}}])}();