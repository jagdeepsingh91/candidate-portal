(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.models.applicantModel', [
        'candidatePortal.models.dynamicFieldsModel',
        function (dynamicFieldsModel) {

            var digestEducationDetailsApiObj = function (apiObj) {
                if(!apiObj || apiObj == null)
                    return [{}];
                if(apiObj.length == 0)
                    return [{}];
                var arrList = [];
                for(var i=0; i< apiObj.length; i++){
                    var obj = {
                        applicantId: apiObj[i].applicantId,
                        degree : {
                            id: apiObj[i].degreeId,
                            name : apiObj[i].degreeTitle
                        },
                        branch : {
                            id: apiObj[i].majorId,
                            name : apiObj[i].major
                        },
                        educationalInfoId: apiObj[i].educationalInfoId,
                        institute: apiObj[i].institute,
                        instituteId: apiObj[i].instituteId,
                        yearOfPassing: apiObj[i].yearOfPassing,
                        fromYear: apiObj[i].fromYear,
                        remarks: apiObj[i].remarks,
                        grade: apiObj[i].grade
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            var parseApiDateForEmployment = function (apiDate) {
                if(!apiDate)
                    return;

                var arr = apiDate.split("-");
                if(arr.length != 3)
                    return;

                return arr[1]+"-"+arr[2];
            };

            var digestEmploymentHistoryApiObj = function (apiObj) {
                if(!apiObj || apiObj == null)
                    return [{}];
                if(apiObj.length == 0)
                    return [{}];
                var arrList = [];
                for(var i=0; i< apiObj.length; i++){
                    var obj = {
                        applicantId: apiObj[i].applicantId,
                        employerId: apiObj[i].employerId,
                        employerName: apiObj[i].employerName,
                        designationId: apiObj[i].designationId,
                        designationName: apiObj[i].designationName,
                        employerExperience: apiObj[i].employerExperience,
                        employmentHistoryId: apiObj[i].employmentHistoryId,
                        grossSalary: apiObj[i].grossSalary,
                        allowance: apiObj[i].allowance,
                        reasonForLeaving: apiObj[i].reasonForLeaving,
                        dutiesInvolved: apiObj[i].dutiesInvolved,
                        employerFromDate: parseApiDateForEmployment(apiObj[i].employerFromDate),
                        employerToDate: parseApiDateForEmployment(apiObj[i].employerToDate)
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            var digestSkillsString = function (skillIds, skillNames) {
                if(!skillIds || !skillNames)
                    return [];
                var skillIdsArr = skillIds.split(",");
                var skillNamesArr = skillNames.split(",");
                var skillsArr = [];
                for(var i=0; i<skillIdsArr.length; i++){
                    skillsArr.push({
                        id : skillIdsArr[i],
                        name : skillNamesArr[i]
                    });
                }
                return skillsArr;
            };

            var digestTable1ApiObj = function (apiObj) {
                if(!apiObj)
                    return [{}];

                if(apiObj.length == 0)
                    return [{}];

                var arr = [];
                for(var i=0;i<apiObj.length; i++){
                    var obj = {
                        teachingSubject: apiObj[i].customField0,
                        teachingLevel: apiObj[i].customField1,
                        id: apiObj[i].id
                    };
                    arr.push(obj);
                }
                return arr;
            };

            var getWorkingSinceMonth = function (obj) {
                if(!obj)
                    return;

                var arr = obj.split(" ");
                if(arr.length > 3){
                    return parseInt(arr[2]);
                }
                else{
                    return null;
                }
            };

            var digestApplicantApiObj = function (apiObj) {
                return {
                    applicantId: apiObj.applicantId,
                    applicantName: apiObj.applicantName,
                    applicantCellPhone: apiObj.applicantCellPhone,
                    applicantCity: apiObj.applicantCity,
                    applicantEmail1: apiObj.applicantEmail1,
                    applicantEmail2: apiObj.applicantEmail2,
                    applicantHomePhone: apiObj.applicantHomePhone,
                    //applicantWorkingSince: apiObj.applicantWorkingSince,
                    applicantWorkingSinceYear: apiObj.applicantExperience != null ? parseInt(apiObj.applicantExperience.split(" ")[0]) : null,
                    applicantWorkingSinceMonth: getWorkingSinceMonth(apiObj.applicantExperience),
                    applicantWorkPhone: apiObj.applicantWorkPhone,
                    applicantSourceTitle: apiObj.applicantSourceTitle,
                    applicantPositionTitle: apiObj.applicantPositionTitle,
                    applicantStepTitle: apiObj.applicantStepTitle,
                    applicantPositionId: apiObj.applicantPositionId,
                    applicantStepId: apiObj.applicantStepId,
                    applicantSourceId: apiObj.applicantSourceId,
                    applicantOriginalResumePath: apiObj.applicantOriginalResumePath,
                    applicantOriginalDocPath: apiObj.applicantOriginalDocPath,
                    applicantTextResume: apiObj.applicantTextResume,
                    applicantCurrentEmployer: apiObj.applicantCurrentEmployer,
                    applicantPassport: apiObj.applicantPassport,
                    applicantDateImported: apiObj.applicantDateImported,
                    applicantJoined: apiObj.applicantJoined,
                    applicantDateJoined: apiObj.applicantDateJoined,
                    aliasesString: apiObj.aliasesString,
                    degreeTitle: apiObj.degreeTitle,
                    institute: apiObj.institute,
                    major: apiObj.major,
                    yearOfPassing: apiObj.yearOfPassing,
                    userId: apiObj.userId,
                    stepScheduled: apiObj.stepScheduled,
                    grade: apiObj.grade,
                    appointmentdate: apiObj.appointmentdate,
                    usersResponsible: apiObj.usersResponsible,
                    actionRequired: apiObj.actionRequired,
                    currentStatus: apiObj.currentStatus,
                    applicantExperience: apiObj.applicantExperience,
                    positionStepLevel: apiObj.positionStepLevel,
                    currentCTC: apiObj.currentCTC,
                    expectedCTC: apiObj.expectedCTC,
                    currentCTCDate: apiObj.currentCTCDate,
                    expectedCTCDate: apiObj.expectedCTCDate,
                    currentBasic: apiObj.currentBasic,
                    resumeDateUpdated: apiObj.resumeDateUpdated,
                    flagIds: apiObj.flagIds,
                    sourceEmail: apiObj.sourceEmail,
                    sourceMobile: apiObj.sourceMobile,
                    noticePeriod: apiObj.noticePeriod,
                    ctcOffered: apiObj.ctcOffered,
                    levelOffered: apiObj.levelOffered,
                    inputSalaryVariable: apiObj.inputSalaryVariable,
                    designationOffered: apiObj.designationOffered,
                    vendorId: apiObj.vendorId,
                    skillIds: apiObj.skillIds,
                    skillsString: apiObj.skillsString,
                    skills : digestSkillsString(apiObj.skillIds, apiObj.skillsString),
                    sourceTypeId: apiObj.sourceTypeId,
                    rejectReasonIds: apiObj.rejectReasonIds,
                    rejectStepLevels: apiObj.rejectStepLevels,
                    applicantLastInteractionDate: apiObj.applicantLastInteractionDate,
                    applicantIsFresher: apiObj.applicantIsFresher,
                    isConfidential: apiObj.isConfidential,
                    internalLink: apiObj.internalLink,
                    employeeCode: apiObj.employeeCode,
                    basicOffered: apiObj.basicOffered,
                    applicantStatus: apiObj.applicantStatus,
                    applicantHRMSCode: apiObj.applicantHRMSCode,
                    dateOfBirth: apiObj.dateOfBirth,
                    passportNumber: apiObj.passportNumber,
                    resumeType: apiObj.resumeType,
                    resumeTypeId: apiObj.resumeTypeId,
                    customFields: apiObj.customFields,
                    educationDetails: digestEducationDetailsApiObj(apiObj.educationDetails),
                    employmentHistoryDetails: digestEmploymentHistoryApiObj(apiObj.employmentHistoryDetails),
                    stepTitle: apiObj.stepTitle,
                    rejectedBy: apiObj.rejectedBy,
                    rejectedDate: apiObj.rejectedDate,
                    department: apiObj.department,
                    confidential: apiObj.confidential,
                    fresher: digestEmploymentHistoryApiObj(apiObj.employmentHistoryDetails).length == 0 ? 'true' : 'false',
                    note: apiObj.note,
                    joiningDate: apiObj.joiningDate,
                    blacklistReason: apiObj.blacklistReason,
                    applicantAddress: apiObj.customField0,
                    postalCode: apiObj.customField1,
                    dateOfAvailability: apiObj.customField2,
                    applicantSource: apiObj.customField3,
                    criminalRecord : apiObj.customField4,
                    suspendedFromEmployment : apiObj.customField5,
                    suspendedFromEmploymentReason : apiObj.customField6,
                    sufferingFromMedical : apiObj.customField7,
                    friendsInSameInstitute : apiObj.customField8,
                    ifYesNameAndRelation : apiObj.customField9,
                    appliedBefore : apiObj.customField10,
                    ifAppliedBeforeDetail : apiObj.customField11,
                    nationality: apiObj.customField12,
                    ifOtherApplicantSource : apiObj.customField13,
                    availabilityFrom : apiObj.customField14,
                    availabilityTo : apiObj.customField15,
                    salutation : apiObj.customField16,
                    table1 : digestTable1ApiObj(apiObj.table1)
                }
            };


            var convertEducationDetailsUIObj2ApiObj = function (uiObj) {
                if(!uiObj)
                    return null;
                var arrList = [];
                for(var i=0; i< uiObj.length; i++){
                    var obj = {
                        applicantId: uiObj[i].applicantId,
                        degreeId: uiObj[i].degree == null ? null :uiObj[i].degree.id,
                        degreeTitle: uiObj[i].degree == null ? null :uiObj[i].degree.name,
                        educationalInfoId: uiObj[i].educationalInfoId,
                        institute: uiObj[i].institute,
                        instituteId: uiObj[i].instituteId,
                        major: uiObj[i].branch == null ? null :uiObj[i].branch.name,
                        majorId: uiObj[i].branch == null ? null :uiObj[i].branch.id,
                        yearOfPassing: uiObj[i].yearOfPassing,
                        fromYear: uiObj[i].fromYear,
                        remarks: uiObj[i].remarks,
                        grade: uiObj[i].grade
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            var convertUiDateForEmployment = function (uiDate) {
                if(!uiDate)
                    return;

                return "01-"+uiDate;
            };

            var convertEmploymentHistoryUIObj2ApiObj = function (uiObj) {
                if(!uiObj)
                    return null;

                var arrList = [];
                for(var i=0; i< uiObj.length; i++){
                    var obj = {
                        applicantId: uiObj[i].applicantId,
                        employerId: uiObj[i].employerId,
                        employerName: uiObj[i].employerName,
                        designationId: uiObj[i].designationId,
                        designationName: uiObj[i].designationName,
                        employerExperience: uiObj[i].employerExperience,
                        employmentHistoryId: uiObj[i].employmentHistoryId,
                        grossSalary: uiObj[i].grossSalary,
                        allowance: uiObj[i].allowance,
                        reasonForLeaving: uiObj[i].reasonForLeaving,
                        dutiesInvolved: uiObj[i].dutiesInvolved,
                        employerFromDate: convertUiDateForEmployment(uiObj[i].employerFromDate),
                        employerToDate: convertUiDateForEmployment(uiObj[i].employerToDate)
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            var getSkillsId = function (skillsObj) {
                if(!skillsObj)
                    return;
                var idsArr = [];
                for(var i=0;i <skillsObj.length; i++){
                    idsArr.push(skillsObj[i].id);
                }
                return idsArr.join(",");
            };

            var getSkillsNames = function (skillsObj) {
                if(!skillsObj)
                    return;
                var namesArr = [];
                for(var i=0;i <skillsObj.length; i++){
                    namesArr.push(skillsObj[i].name);
                }
                return namesArr.join(",");
            };

            var convertTable1UiObj = function (uiObj) {
                if(!uiObj)
                    return;

                var arr = [];
                for(var i=0;i<uiObj.length; i++){
                    var obj = {
                        customField0: uiObj[i].teachingSubject,
                        customField1: uiObj[i].teachingLevel,
                        id: uiObj[i].id
                    };
                    arr.push(obj);
                }
                return arr;
            };

            var convertUIObj2ApiObj = function (uiObj) {
                return {
                    applicantId: uiObj.applicantId,
                    applicantName: uiObj.applicantName,
                    applicantCellPhone: uiObj.applicantCellPhone,
                    //applicantCity: uiObj.applicantCity!= null ? uiObj.applicantCity.name : null,
                    applicantCity: uiObj.applicantCity,
                    applicantEmail1: uiObj.applicantEmail1,
                    applicantEmail2: uiObj.applicantEmail2,
                    applicantHomePhone: uiObj.applicantHomePhone,
                    applicantWorkingSince: uiObj.applicantWorkingSinceMonth != null ? uiObj.applicantWorkingSinceYear+"."+uiObj.applicantWorkingSinceMonth : uiObj.applicantWorkingSinceYear,
                    //applicantWorkingSince: "0",
                    applicantWorkPhone: uiObj.applicantWorkPhone,
                    applicantSourceTitle: uiObj.applicantSourceTitle,
                    applicantPositionTitle: uiObj.applicantPositionTitle,
                    applicantStepTitle: uiObj.applicantStepTitle,
                    applicantPositionId: uiObj.applicantPositionId,
                    applicantStepId: uiObj.applicantStepId,
                    applicantSourceId: uiObj.applicantSourceId,
                    applicantOriginalResumePath: uiObj.applicantOriginalResumePath,
                    applicantOriginalDocPath: uiObj.applicantOriginalDocPath,
                    applicantTextResume: uiObj.applicantTextResume,
                    applicantCurrentEmployer: uiObj.applicantCurrentEmployer,
                    applicantPassport: uiObj.applicantPassport,
                    applicantDateImported: uiObj.applicantDateImported,
                    applicantJoined: uiObj.applicantJoined,
                    applicantDateJoined: uiObj.applicantDateJoined,
                    skillIds: getSkillsId(uiObj.skills),
                    skillsString: getSkillsNames(uiObj.skills),
                    aliasesString: uiObj.aliasesString,
                    degreeTitle: uiObj.degreeTitle,
                    institute: uiObj.institute,
                    major: uiObj.major,
                    yearOfPassing: uiObj.yearOfPassing,
                    userId: uiObj.userId,
                    stepScheduled: uiObj.stepScheduled,
                    grade: uiObj.grade,
                    appointmentdate: uiObj.appointmentdate,
                    usersResponsible: uiObj.usersResponsible,
                    actionRequired: uiObj.actionRequired,
                    currentStatus: uiObj.currentStatus,
                    applicantExperience: uiObj.applicantExperience,
                    positionStepLevel: uiObj.positionStepLevel,
                    currentCTC: uiObj.currentCTC,
                    expectedCTC: uiObj.expectedCTC,
                    currentCTCDate: uiObj.currentCTCDate,
                    expectedCTCDate: uiObj.expectedCTCDate,
                    currentBasic: uiObj.currentBasic,
                    resumeDateUpdated: uiObj.resumeDateUpdated,
                    flagIds: uiObj.flagIds,
                    sourceEmail: uiObj.sourceEmail,
                    sourceMobile: uiObj.sourceMobile,
                    noticePeriod: uiObj.noticePeriod,
                    ctcOffered: uiObj.ctcOffered,
                    levelOffered: uiObj.levelOffered,
                    inputSalaryVariable: uiObj.inputSalaryVariable,
                    designationOffered: uiObj.designationOffered,
                    vendorId: uiObj.vendorId,
                    sourceTypeId: uiObj.sourceTypeId,
                    rejectReasonIds: uiObj.rejectReasonIds,
                    rejectStepLevels: uiObj.rejectStepLevels,
                    applicantLastInteractionDate: uiObj.applicantLastInteractionDate,
                    applicantIsFresher: uiObj.applicantIsFresher,
                    isConfidential: uiObj.isConfidential,
                    internalLink: uiObj.internalLink,
                    employeeCode: uiObj.employeeCode,
                    basicOffered: uiObj.basicOffered,
                    applicantStatus: uiObj.applicantStatus,
                    applicantHRMSCode: uiObj.applicantHRMSCode,
                    dateOfBirth: uiObj.dateOfBirth,
                    passportNumber: uiObj.passportNumber,
                    resumeType: uiObj.resumeType,
                    resumeTypeId: uiObj.resumeTypeId,
                    customFields: uiObj.customFields,
                    educationDetails: convertEducationDetailsUIObj2ApiObj(uiObj.educationDetails),
                    employmentHistoryDetails: uiObj.fresher == true ? [] : convertEmploymentHistoryUIObj2ApiObj(uiObj.employmentHistoryDetails),
                    stepTitle: uiObj.stepTitle,
                    rejectedBy: uiObj.rejectedBy,
                    rejectedDate: uiObj.rejectedDate,
                    department: uiObj.department,
                    confidential: uiObj.confidential,
                    fresher: uiObj.fresher == "true" ? true : null,
                    note: uiObj.note,
                    joiningDate: uiObj.joiningDate,
                    blacklistReason: uiObj.blacklistReason,
                    customField0: uiObj.applicantAddress,
                    customField1: uiObj.postalCode,
                    customField2: uiObj.dateOfAvailability,
                    customField3: uiObj.applicantSource,
                    customField4 : uiObj.criminalRecord,
                    customField5 : uiObj.suspendedFromEmployment,
                    customField6 : uiObj.suspendedFromEmploymentReason,
                    customField7 : uiObj.sufferingFromMedical,
                    customField8 : uiObj.friendsInSameInstitute,
                    customField9 : uiObj.ifYesNameAndRelation,
                    customField10 : uiObj.appliedBefore,
                    customField11 : uiObj.ifAppliedBeforeDetail,
                    customField12: uiObj.nationality,
                    customField13 : uiObj.ifOtherApplicantSource,
                    customField14 : uiObj.availabilityFrom,
                    customField15 : uiObj.availabilityTo,
                    customField16 : uiObj.salutation,
                    table1 : convertTable1UiObj(uiObj.table1)
                }
            };

            var digestApplicantAttachmentsApiObj = function (apiObj) {
                if(!apiObj)
                    return [];

                var arrList = [];
                for(var i=0; i< apiObj.length; i++){
                    var obj = {
                        documentId: apiObj[i].documentId,
                        applicantId: apiObj[i].applicantId,
                        positionId: apiObj[i].positionId,
                        userId: apiObj[i].userId,
                        dateCreated: apiObj[i].dateCreated,
                        originalFileName: apiObj[i].originalFileName,
                        changedFileName: apiObj[i].changedFileName,
                        ownerName: apiObj[i].ownerName,
                        relativeFilePath: apiObj[i].relativeFilePath,
                        absoluteFilePath: apiObj[i].absoluteFilePath,
                        documentIsHidden: apiObj[i].documentIsHidden
                    };
                    arrList.push(obj);
                }
                return arrList;
            };

            function digestEducationObj(fieldObj){
                var educationArr = [];
                fieldObj.forEach(function (obj, i, arr) {
                    var eduObj = {};
                    obj.forEach(function (field, fieldIndex, fieldArr) {
                        switch (field.propertyName){
                            case 'degreeTitle' :
                                eduObj.degree = field.selectedObject != null ? field.selectedObject[0] : null;
                                break;
                            case 'yearOfPassing' :
                                eduObj.yearOfPassing = field.selectedValue;
                                break;
                            case 'fromYear' :
                                eduObj.fromYear = field.selectedValue;
                                break;
                            case 'grade' :
                                eduObj.grade = field.selectedValue;
                                break;
                            case 'institute' :
                                eduObj.institute = field.selectedObject.length > 0 ? field.selectedObject[0].name : null;
                                break;
                            case 'major' :
                                eduObj.branch = field.selectedObject != null ? field.selectedObject[0] : null;
                                break;
                        }
                    });
                    educationArr.push(eduObj);
                });
                return educationArr;
            }

            function digestEmploymentHistoryObj(fieldObj){
                var employmentArr = [];
                fieldObj.forEach(function (obj, i, arr) {
                    var empObj = {};
                    obj.forEach(function (field, fieldIndex, fieldArr) {
                        switch (field.propertyName){
                            case 'designationName' :
                                empObj.designationName = field.selectedObject.length > 0 ? field.selectedObject[0].name : null;
                                break;
                            case 'reasonForLeaving' :
                                empObj.reasonForLeaving = field.selectedValue;
                                break;
                            case 'allowance' :
                                empObj.allowance = field.selectedValue;
                                break;
                            case 'employerToDate' :
                                empObj.employerToDate = field.selectedValue;
                                break;
                            case 'employerName' :
                                empObj.employerName = field.selectedObject.length > 0 ? field.selectedObject[0].name : null;
                                break;
                            case 'employerFromDate' :
                                empObj.employerFromDate = field.selectedValue;
                                break;
                        }
                    });
                    employmentArr.push(empObj);
                });
                return employmentArr;
            }

            var getStaticValueObj = function (dynamicDTO) {
                if(!dynamicDTO)
                    return dynamicDTO;
                var applicantObj = {};
                dynamicDTO.forEach(function (obj, i, arr) {
                    if(obj.propertyName == 'applicantName'){
                        applicantObj.applicantName = obj.selectedValue;
                    }
                    else if(obj.propertyName == 'applicantCity'){
                        applicantObj.applicantCity = obj.selectedValue;
                    }
                    else if(obj.fieldType == 'GROUP' && obj.fieldId == 'Education') {
                        applicantObj.education = digestEducationObj(obj.subFields);
                    }
                    else if(obj.fieldType == 'GROUP' && obj.fieldId == 'Employment History') {
                        applicantObj.employmentHistory = digestEmploymentHistoryObj(obj.subFields);
                    }
                });
                return applicantObj;
            };

            var digestApplicantDynamicApiObj = function (apiObj) {
                var dynamicDTO = dynamicFieldsModel.digestDynamicFieldApiObj(apiObj.dynArray);
                var staticValueObj = getStaticValueObj(dynamicDTO);
                return {
                    applicantId : apiObj.applicantId,
                    applicantOriginalResumePath : apiObj.applicantOriginalResumePath,
                    applicantPositionId : apiObj.applicantPositionId,
                    applicantName : staticValueObj.applicantName,
                    educationDetail : staticValueObj.education,
                    employmentHistoryDetails : staticValueObj.employmentHistory,
                    applicantCity : staticValueObj.applicantCity,
                    dynamicFieldDTO : dynamicDTO
                }
            };

            var convertApplicantUi2ApiObj = function (uiObj) {
                return {
                    applicantId : uiObj.applicantId,
                    applicantOriginalResumePath : uiObj.applicantOriginalResumePath,
                    applicantPositionId : uiObj.applicantPositionId,
                    dynArray : dynamicFieldsModel.convertDynamicFieldUiObj2ApiObj(uiObj.dynamicFieldDTO)
                }
            };
            
            return {
                //digestApplicantApiObj : digestApplicantApiObj,
                //convertUIObj2ApiObj : convertUIObj2ApiObj,
                convertApplicantUi2ApiObj : convertApplicantUi2ApiObj,
                digestApplicantAttachmentsApiObj : digestApplicantAttachmentsApiObj,
                digestApplicantDynamicApiObj : digestApplicantDynamicApiObj
            }
        }
    ]);
})();