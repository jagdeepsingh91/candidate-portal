(function () {
    angular.module("candidatePortal.application").factory('candidatePortal.models.applicantModel', [
        function () {

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
                        //degreeId: apiObj[i].degreeId,
                        //degreeTitle: apiObj[i].degreeTitle,
                        educationalInfoId: apiObj[i].educationalInfoId,
                        institute: apiObj[i].institute,
                        instituteId: apiObj[i].instituteId,
                        //major: apiObj[i].major,
                        //majorId: apiObj[i].majorId,
                        //yearOfPassing: apiObj[i].yearOfPassing != null ? apiObj[i].yearOfPassing.split("-")[0] : null,
                        yearOfPassing: apiObj[i].yearOfPassing,
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
                        //employer : {
                        //    id: apiObj[i].employerId,
                        //    name : apiObj[i].employerName
                        //},
                        employerId: apiObj[i].employerId,
                        employerName: apiObj[i].employerName,
                        //designation : {
                        //    id: apiObj[i].designationId,
                        //    name : apiObj[i].designationName
                        //},
                        designationId: apiObj[i].designationId,
                        designationName: apiObj[i].designationName,
                        employerExperience: apiObj[i].employerExperience,
                        employmentHistoryId: apiObj[i].employmentHistoryId,
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

            var digestApplicantApiObj = function (apiObj) {
                return {
                    applicantId: apiObj.applicantId,
                    applicantName: apiObj.applicantName,
                    applicantCellPhone: apiObj.applicantCellPhone,
                    applicantCity: apiObj.applicantCity,
                    applicantEmail1: apiObj.applicantEmail1,
                    applicantEmail2: apiObj.applicantEmail2,
                    applicantHomePhone: apiObj.applicantHomePhone,
                    applicantWorkingSince: apiObj.applicantWorkingSince,
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
                    fresher: apiObj.fresher,
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
                        //degree : {
                        //    id: uiObj[i].degreeId,
                        //    name : uiObj[i].degreeTitle
                        //},
                        //branch : {
                        //    id: uiObj[i].majorId,
                        //    name : uiObj[i].major
                        //},
                        degreeId: uiObj[i].degree == null ? null :uiObj[i].degree.id,
                        degreeTitle: uiObj[i].degree == null ? null :uiObj[i].degree.name,
                        educationalInfoId: uiObj[i].educationalInfoId,
                        institute: uiObj[i].institute,
                        instituteId: uiObj[i].instituteId,
                        major: uiObj[i].branch == null ? null :uiObj[i].branch.name,
                        majorId: uiObj[i].branch == null ? null :uiObj[i].branch.id,
                        //yearOfPassing: uiObj[i].yearOfPassing != null ? uiObj[i].yearOfPassing+"-05-01" : null,
                        yearOfPassing: uiObj[i].yearOfPassing,
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
                        //employer : {
                        //    id: apiObj[i].employerId,
                        //    name : apiObj[i].employerName
                        //},
                        employerId: uiObj[i].employerId,
                        employerName: uiObj[i].employerName,
                        //designation : {
                        //    id: apiObj[i].designationId,
                        //    name : apiObj[i].designationName
                        //},
                        designationId: uiObj[i].designationId,
                        designationName: uiObj[i].designationName,
                        employerExperience: uiObj[i].employerExperience,
                        employmentHistoryId: uiObj[i].employmentHistoryId,
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
                    //applicantWorkingSince: uiObj.applicantWorkingSince,
                    applicantWorkingSince: "0",
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
                    employmentHistoryDetails: convertEmploymentHistoryUIObj2ApiObj(uiObj.employmentHistoryDetails),
                    stepTitle: uiObj.stepTitle,
                    rejectedBy: uiObj.rejectedBy,
                    rejectedDate: uiObj.rejectedDate,
                    department: uiObj.department,
                    confidential: uiObj.confidential,
                    fresher: uiObj.fresher,
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
            
            return {
                digestApplicantApiObj : digestApplicantApiObj,
                convertUIObj2ApiObj : convertUIObj2ApiObj,
                digestApplicantAttachmentsApiObj : digestApplicantAttachmentsApiObj
            }
        }
    ]);
})();