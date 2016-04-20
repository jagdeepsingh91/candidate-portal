(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.models.positionModel', [
        '$sce',
        function ($sce) {

            var systemFieldsMappingObj = {
                PositionName : "positionTitle",
                PositionCode : "positionCode",
                PositionCreatedOn : "positionCreateDate",
                Location : "locationName",
                DepartmentLevel1 : "departmentName",
                DepartmentLevel2 : "subDepartmentName",
                DepartmentLevel3 : "subSubDepartmentName",
                Vacancies : "noOfOpenings",
                HireByDate : "hireByDate",
                PositionLevel : "positionLevel",
                ReferalFees : "positionReferalFees",
                Responsibilities : "responsibilities",
                Requirements : "requirements",
                PrimarySkills : "primarySkills",
                SecondarySkills : "secondarySkills",
                Education : "degreeTitle",
                Branch : "branchName",
                Experience : "minimumExperience maximumExperience",
                Note : "note"
            };

            var digestCustomFields = function (apiObj) {
                if(!apiObj)
                    return [];

                var arrList = [];
                for(var i=0; i<apiObj.length; i++){
                    var obj = {
                        name : apiObj[i].name,
                        value : apiObj[i].value
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            var positionApiObj2UIObj = function (apiObj) {
                return {
                    positionId: apiObj.positionId,
                    positionTitle: apiObj.positionTitle,
                    positionCode: apiObj.positionCode,
                    requestedById: apiObj.requestedById,
                    requestedByUserName: apiObj.requestedByUserName,
                    positionOwnerId: apiObj.positionOwnerId,
                    positionOwnerName: apiObj.positionOwnerName,
                    noOfOpenings: apiObj.noOfOpenings,
                    hireByDate: apiObj.hireByDate,
                    note: apiObj.note,
                    responsibilities: $sce.trustAsHtml(apiObj.responsibilities),
                    positionCreateDate: apiObj.positionCreateDate,
                    departmentId: apiObj.departmentId,
                    departmentName: apiObj.departmentName,
                    subDepartmentName: apiObj.subDepartmentName,
                    subSubDepartmentName: apiObj.subSubDepartmentName,
                    sub3DepartmentName: apiObj.sub3DepartmentName,
                    sub4DepartmentName: apiObj.sub4DepartmentName,
                    positionLevel: apiObj.positionLevel,
                    positionReferalFees: apiObj.positionReferalFees,
                    locationId: apiObj.locationId,
                    locationName: apiObj.locationName,
                    budgetItemName: apiObj.budgetItemName,
                    gradeName: apiObj.gradeName,
                    bandName: apiObj.bandName,
                    buName: apiObj.buName,
                    costCenterName: apiObj.costCenterName,
                    typeOfVacancy: apiObj.typeOfVacancy,
                    replacementEmpCode: apiObj.replacementEmpCode,
                    positionTypeExtInt: apiObj.positionTypeExtInt,
                    positionClone: apiObj.positionClone,
                    shortlist: apiObj.shortlist,
                    select: apiObj.select,
                    hire: apiObj.hire,
                    joined: apiObj.joined,
                    rejected: apiObj.rejected,
                    expiryDate: apiObj.expiryDate,
                    positionStatus: apiObj.positionStatus,
                    positionPriority: apiObj.positionPriority,
                    isBudgetCommitted: apiObj.isBudgetCommitted,
                    recruiters: apiObj.recruiters,
                    degreeTitle: apiObj.degreeTitle,
                    branchName: apiObj.branchName,
                    minimumExperience: apiObj.minimumExperience,
                    maximumExperience: apiObj.maximumExperience,
                    primarySkills: apiObj.primarySkills,
                    secondarySkills: apiObj.secondarySkills,
                    requirements: apiObj.requirements,
                    customFields: digestCustomFields(apiObj.customFields),
                    groupByHeading: apiObj.groupByHeading,
                    groupItemId: apiObj.groupItemId,
                    firstFieldToDisplay: apiObj.firstFieldToDisplay,
                    commaSeparatedFieldList: apiObj.commaSeparatedFieldList,
                    positionPublishedDate: apiObj.positionPublishedDate,
                    applicantStatus: apiObj.applicantStatus,
                    appliedDate: apiObj.appliedDate
                }
            };
            
            var digestPositionApiObj = function (apiObj) {
                if(!apiObj)
                    return [];

                var arrList = [];
                for(var i=0; i<apiObj.length; i++){
                    arrList.push(positionApiObj2UIObj(apiObj[i]));
                }
                return arrList;
            };

            var digestPositionFieldsApiObj = function (apiObj) {
                if(!apiObj)
                    return [];
                var arrList = [];
                for(var i=0; i<apiObj.length; i++){
                    var obj = {
                        fieldId: apiObj[i].fieldId,
                        propertyName : systemFieldsMappingObj[apiObj[i].fieldId],
                        fieldType: apiObj[i].fieldType,
                        fieldTitle: apiObj[i].fieldTitle,
                        fieldRank: apiObj[i].fieldRank,
                        fieldWebsitePositionListShow: apiObj[i].fieldWebsitePositionListShow,
                        fieldWebsitePositionDetailsShow: apiObj[i].fieldWebsitePositionDetailsShow,
                        fieldWebsitePositionIsFilter: apiObj[i].fieldWebsitePositionIsFilter
                    };
                    arrList.push(obj);
                }

                return arrList;
            };
            
            var getCustomFieldValue = function (fieldObj, posDetailsObj) {
                if(!posDetailsObj.customFields)
                    return null;

                var value;
                for(var i=0; i< posDetailsObj.customFields.length; i++){
                    if(posDetailsObj.customFields[i].name == fieldObj.fieldTitle){
                        value = posDetailsObj.customFields[i].value;
                    }
                }
                return $sce.trustAsHtml((value || "").toString());
            };
            
            var getPositionFieldsMappedValues = function (fieldsObj, posDetailsObj) {
                if(!fieldsObj)
                    return [];
                for(var i=0; i<fieldsObj.length; i++){
                    if(fieldsObj[i].fieldType == 1){
                        fieldsObj[i].value = getCustomFieldValue(fieldsObj[i], posDetailsObj);
                    }
                    else{
                        var value;
                        if(fieldsObj[i].propertyName == systemFieldsMappingObj.Experience){
                            var propArr = fieldsObj[i].propertyName.split(" ");
                            value = posDetailsObj[propArr[0]] +" "+ posDetailsObj[propArr[1]];
                        }
                        else {
                            value = posDetailsObj[fieldsObj[i].propertyName];
                        }
                        fieldsObj[i].value = $sce.trustAsHtml((value || "").toString());
                    }
                }
                return fieldsObj;
            };

            return {
                digestPositionApiObj : digestPositionApiObj,
                positionApiObj2UIObj : positionApiObj2UIObj,
                digestPositionFieldsApiObj : digestPositionFieldsApiObj,
                getPositionFieldsMappedValues : getPositionFieldsMappedValues
            }
        }
    ]);
})();