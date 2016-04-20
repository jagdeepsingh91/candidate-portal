/*
 ** Quick file upload
 * 	It will upload when you select file.
 * 	Ex -
 * 	<input type="file" quick-file-upload="fileUploadObj.selectedFiles" url="uploadFileUrl" multiple class="form-control-file"/>
 * 	provide an array in which it will keep all upload file status
 * 	there is one property "progress" which tells the uploaded status. Possible values are 0-100, 'Failed', 'Success'
 * 	there is one property "response" which contains response of uploaded file
 **/
(function () {
    angular.module('candidatePortal.application').directive('quickFileUpload', [
		'$parse',
		'candidatePortal.services.commonService',
		function ($parse, commonService) {
			return {
				restrict: 'A',
				scope: {
					fileArrayObj: '=quickFileUpload',
					url: '='
				},
				link: function(scope, element, attrs) {
					console.log(scope.fileArrayObj);
					var uploadUrl = scope.url;
					element.bind('change', function(){
						scope.$apply(function(){
							//***************************************************
							var filesSelected = element[0].files;
							console.log(filesSelected.length);
							if(filesSelected.length == 0)
								return;
							if(scope.fileArrayObj == null || scope.fileArrayObj == "")
								scope.fileArrayObj = [];
							var filesUploaded = scope.fileArrayObj.length;
							for(var i=0; i< filesSelected.length;i++) {
								var fileTypeArr = filesSelected[i].name.split(".");
								var fileType = fileTypeArr[fileTypeArr.length - 1];
								//if(fileType == "pdf" || fileType == "doc" || fileType == "docx") {
									var index = filesUploaded + i;
									scope.fileArrayObj.push({file: filesSelected[i], type: fileType, progress: "0"});
									var fd = new FormData();
									fd.append('file', filesSelected[i]);
									upload(uploadUrl, fd, index);
								//}
								//else{
								//	scope.fileArrayObj = undefined;
								//	commonService.showInfoMsg("Unsupported format. Only pdf, doc & docx are allowed");
								//}
							}
							console.log(scope.fileArrayObj);
						});
					});

					var upload = function (url, file, index) {
						var request = new Array();
						request[index] = new XMLHttpRequest();
						request[index].upload.addEventListener("progress", function (evt) {
							console.log("progress");
							console.log(evt);
							scope.fileArrayObj[index].progress = Math.round(evt.loaded * 100 / evt.total);
							console.log(scope.fileArrayObj);
							scope.$apply();
						}, false);
						request[index].addEventListener("load", function (evt) {
							if (evt.target.status == 200) {
								console.log("on complete"+ index);
								console.log(evt);
								scope.fileArrayObj[index].progress = "Success";
								scope.fileArrayObj[index].response = JSON.parse(evt.target.response);
								scope.$apply();
								console.log(scope.fileArrayObj);
							}
							else {
								console.log('Request failed.' + index);
								console.log(evt);
								//commonService.showErrorMsg("")
								scope.fileArrayObj[index].progress = "Failed";
								scope.fileArrayObj[index].response = JSON.parse(evt.target.response);
								scope.$apply();
							}

						}, false);
						request[index].addEventListener("error", function (evt) {
							console.log("on failure"+ index);
							console.log(evt);
							scope.fileArrayObj[index].progress = "Failed";
							scope.fileArrayObj[index].response = JSON.parse(evt.target.response);
							console.log(scope.fileArrayObj);
							scope.$apply();
						}, false);
						//request.addEventListener("abort", transferCanceled, false);
						request[index].open("POST", url, true);
						request[index].withCredentials = true;
						request[index].send(file);
					};
				}
			};
		}
	]);
})();