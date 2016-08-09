(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.models.dynamicFieldsModel', [
        'candidatePortal.services.apiUrlConfig',
        function (apiUrlConfig) {

            var cleanApiObj = function (apiObj) {
                if(apiObj.selectedObject == null)
                    return [];
                if(apiObj.fieldType != "DROPDOWN")
                    return apiObj.selectedObject;
                for(var i=0;i< apiObj.selectedObject.length; i++){
                    delete apiObj.selectedObject[i].skillCategoryId;
                }
                return apiObj.selectedObject;
            };

            var digestUserApiObj = function (apiObj) {
                if(apiObj == null){
                    return [];
                }
                var arr = [];
                for(var i=0; i<apiObj.length; i++) {
                    var obj = {
                        userId: apiObj[i].userId,
                        source : apiObj[i].source == null ? null : {
                            id : apiObj[i].source.id,
                            name : apiObj[i].source.name,
                            employeeCode : apiObj[i].source.employeeCode
                        },
                        displayName : apiObj[i].source == null ? null : apiObj[i].source.name,
                        email: apiObj[i].email,
                        userFname: apiObj[i].userFname,
                        userLname: apiObj[i].userLname,
                        userName: apiObj[i].userName,
                        userStatus: apiObj[i].userStatus
                    };
                    arr.push(obj);
                }
                return arr;
            };

            var dynamicFieldApi2UiObj = function (apiObj) {
                var autosuggestions = null;
                var property = "name";
                if(apiObj.fieldType == "USER_DROPDOWN")
                    property = "displayName";
                return {
                    apiURL: apiObj.apiURL == null ? null : apiUrlConfig.basePath+""+apiObj.apiURL,
                    cssClassName: apiObj.cssClassName,
                    defaultValue: apiObj.defaultValue,
                    displayName: apiObj.displayName,
                    entityType: apiObj.entityType,
                    entityName: apiObj.entityName,
                    fieldType: apiObj.type,
                    fieldId: apiObj.fieldId,
                    type: apiObj.fieldType,
                    id: apiObj.id,
                    parentId: apiObj.parentId,
                    propertyName: apiObj.propertyName,
                    optionList: apiObj.optionList,
                    referenceFieldId: apiObj.referenceFieldId,
                    regex: apiObj.regex,
                    regexMessage: apiObj.regexMessage,
                    watermarkText: apiObj.watermarkText,
                    selectedValue : apiObj.selectedValue,
                    selectedObject : apiObj.selectedObject == null ? [] : cleanApiObj(apiObj),
                    selectedUser : apiObj.selectedUser == null ? [] : digestUserApiObj(apiObj.selectedUser),
                    subFields : getNestedDTOApi2UiObjList(apiObj.dynamicFieldDTO),
                    autosuggestionsList : autosuggestions,
                    propertyValue : property,
                    rank : apiObj.rank,
                    noOfRows : apiObj.noOfRows,
                    required : apiObj.required
                }
            };

            var getNestedDTOApi2UiObjList = function (apiObj) {
                if(apiObj == null)
                    return [];
                var arr = [];
                for(var i=0;i< apiObj.length; i++){
                    var arrObj = digestDynamicFieldApiObj(apiObj[i]);
                    arr.push(arrObj);
                }
                return arr;
            };

            var digestDynamicFieldApiObj = function (apiObj) {
                if(apiObj == null)
                    return [];

                var arr= [];
                for(var i=0; i<apiObj.length; i++){
                    var obj = dynamicFieldApi2UiObj(apiObj[i]);
                    arr.push(obj);
                }
                return arr;
            };

            var dynamicFieldUI2ApiObj = function (uiObj) {
                var selectedValue = uiObj.selectedValue;
                if(uiObj.fieldType == "CHECKBOX"){
                    uiObj.selectedCheckboxValue.forEach(function (item, i, arr) {
                        if(i==0)
                            selectedValue = item;
                        else
                            selectedValue = selectedValue+","+item;
                    });
                }
                else if(uiObj.fieldType == "LISTBOX"){
                    uiObj.selectedListBoxValue.forEach(function (item, i, arr) {
                        if(i==0)
                            selectedValue = item;
                        else
                            selectedValue = selectedValue+","+item;
                    });
                }

                return {
                    displayName: uiObj.displayName,
                    regex: uiObj.regex,
                    regexMessage: uiObj.regexMessage,
                    optionList: null,
                    defaultValue: uiObj.defaultValue,
                    watermarkText: uiObj.watermarkText,
                    apiURL: uiObj.apiURL,
                    cssClassName: uiObj.cssClassName,
                    entityType: uiObj.entityType,
                    entityName: uiObj.entityName,
                    fieldType: uiObj.type,
                    type: uiObj.fieldType,
                    fieldId: uiObj.fieldId,
                    id: uiObj.id,
                    rank: uiObj.rank,
                    noOfRows: uiObj.noOfRows,
                    parentId: uiObj.parentId,
                    propertyName: uiObj.propertyName,
                    referenceFieldId: uiObj.referenceFieldId,
                    selectedValue : selectedValue,
                    selectedObject : uiObj.selectedObject == null ? null : uiObj.selectedObject,
                    selectedUser : uiObj.selectedUser == null ? null : uiObj.selectedUser,
                    dynamicFieldDTO : getNestedDTOUi2ApiObjList(uiObj.subFields)
                }
            };

            var getNestedDTOUi2ApiObjList = function (uiObj) {
                if(uiObj == null)
                    return null;
                else if(uiObj.length == 0)
                    return null;
                var arr = [];
                for(var i=0;i< uiObj.length; i++){
                    var arrObj = convertDynamicFieldUiObj2ApiObj(uiObj[i]);
                    arr.push(arrObj);
                }
                return arr;
            };

            var convertDynamicFieldUiObj2ApiObj = function (uiObj) {
                if(uiObj == null)
                    return null;

                var arr= [];
                for(var i=0; i<uiObj.length; i++){
                    var obj = dynamicFieldUI2ApiObj(uiObj[i]);
                    arr.push(obj);
                }
                return arr;
            };

            return {
                digestDynamicFieldApiObj : digestDynamicFieldApiObj,
                convertDynamicFieldUiObj2ApiObj : convertDynamicFieldUiObj2ApiObj
            }
        }
    ]);
})();