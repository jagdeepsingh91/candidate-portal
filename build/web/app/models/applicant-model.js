!function(){angular.module("candidatePortal.application").factory("candidatePortal.models.applicantModel",[function(){var e=function(e){if(!e||null==e)return[{}];if(0==e.length)return[{}];for(var a=[],t=0;t<e.length;t++){var i={applicantId:e[t].applicantId,degree:{id:e[t].degreeId,name:e[t].degreeTitle},branch:{id:e[t].majorId,name:e[t].major},educationalInfoId:e[t].educationalInfoId,institute:e[t].institute,instituteId:e[t].instituteId,yearOfPassing:e[t].yearOfPassing,grade:e[t].grade};a.push(i)}return a},a=function(e){if(!e||null==e)return[{}];if(0==e.length)return[{}];for(var a=[],t=0;t<e.length;t++){var i={applicantId:e[t].applicantId,employerId:e[t].employerId,employerName:e[t].employerName,designationId:e[t].designationId,designationName:e[t].designationName,employerExperience:e[t].employerExperience,employmentHistoryId:e[t].employmentHistoryId,employerFromDate:e[t].employerFromDate,employerToDate:e[t].employerToDate};a.push(i)}return a},t=function(e,a){if(!e||!a)return[];for(var t=e.split(","),i=a.split(","),n=[],p=0;p<t.length;p++)n.push({id:t[p],name:i[p]});return n},i=function(i){return{applicantId:i.applicantId,applicantName:i.applicantName,applicantCellPhone:i.applicantCellPhone,applicantCity:i.applicantCity,applicantEmail1:i.applicantEmail1,applicantEmail2:i.applicantEmail2,applicantHomePhone:i.applicantHomePhone,applicantWorkingSince:i.applicantWorkingSince,applicantWorkPhone:i.applicantWorkPhone,applicantSourceTitle:i.applicantSourceTitle,applicantPositionTitle:i.applicantPositionTitle,applicantStepTitle:i.applicantStepTitle,applicantPositionId:i.applicantPositionId,applicantStepId:i.applicantStepId,applicantSourceId:i.applicantSourceId,applicantOriginalResumePath:i.applicantOriginalResumePath,applicantOriginalDocPath:i.applicantOriginalDocPath,applicantTextResume:i.applicantTextResume,applicantCurrentEmployer:i.applicantCurrentEmployer,applicantPassport:i.applicantPassport,applicantDateImported:i.applicantDateImported,applicantJoined:i.applicantJoined,applicantDateJoined:i.applicantDateJoined,aliasesString:i.aliasesString,degreeTitle:i.degreeTitle,institute:i.institute,major:i.major,yearOfPassing:i.yearOfPassing,userId:i.userId,stepScheduled:i.stepScheduled,grade:i.grade,appointmentdate:i.appointmentdate,usersResponsible:i.usersResponsible,actionRequired:i.actionRequired,currentStatus:i.currentStatus,applicantExperience:i.applicantExperience,positionStepLevel:i.positionStepLevel,currentCTC:i.currentCTC,expectedCTC:i.expectedCTC,currentCTCDate:i.currentCTCDate,expectedCTCDate:i.expectedCTCDate,currentBasic:i.currentBasic,resumeDateUpdated:i.resumeDateUpdated,flagIds:i.flagIds,sourceEmail:i.sourceEmail,sourceMobile:i.sourceMobile,noticePeriod:i.noticePeriod,ctcOffered:i.ctcOffered,levelOffered:i.levelOffered,inputSalaryVariable:i.inputSalaryVariable,designationOffered:i.designationOffered,vendorId:i.vendorId,skillIds:i.skillIds,skillsString:i.skillsString,skills:t(i.skillIds,i.skillsString),sourceTypeId:i.sourceTypeId,rejectReasonIds:i.rejectReasonIds,rejectStepLevels:i.rejectStepLevels,applicantLastInteractionDate:i.applicantLastInteractionDate,applicantIsFresher:i.applicantIsFresher,isConfidential:i.isConfidential,internalLink:i.internalLink,employeeCode:i.employeeCode,basicOffered:i.basicOffered,applicantStatus:i.applicantStatus,applicantHRMSCode:i.applicantHRMSCode,dateOfBirth:i.dateOfBirth,passportNumber:i.passportNumber,resumeType:i.resumeType,resumeTypeId:i.resumeTypeId,customFields:i.customFields,educationDetails:e(i.educationDetails),employmentHistoryDetails:a(i.employmentHistoryDetails),stepTitle:i.stepTitle,rejectedBy:i.rejectedBy,rejectedDate:i.rejectedDate,department:i.department,confidential:i.confidential,fresher:i.fresher,note:i.note,joiningDate:i.joiningDate,blacklistReason:i.blacklistReason}},n=function(e){if(!e)return null;for(var a=[],t=0;t<e.length;t++){var i={applicantId:e[t].applicantId,degreeId:null==e[t].degree?null:e[t].degree.id,degreeTitle:null==e[t].degree?null:e[t].degree.name,educationalInfoId:e[t].educationalInfoId,institute:e[t].institute,instituteId:e[t].instituteId,major:null==e[t].branch?null:e[t].branch.name,majorId:null==e[t].branch?null:e[t].branch.id,yearOfPassing:e[t].yearOfPassing,grade:e[t].grade};a.push(i)}return a},p=function(e){if(!e)return null;for(var a=[],t=0;t<e.length;t++){var i={applicantId:e[t].applicantId,employerId:e[t].employerId,employerName:e[t].employerName,designationId:e[t].designationId,designationName:e[t].designationName,employerExperience:e[t].employerExperience,employmentHistoryId:e[t].employmentHistoryId,employerFromDate:e[t].employerFromDate,employerToDate:e[t].employerToDate};a.push(i)}return a},l=function(e){if(e){for(var a=[],t=0;t<e.length;t++)a.push(e[t].id);return a.join(",")}},r=function(e){if(e){for(var a=[],t=0;t<e.length;t++)a.push(e[t].name);return a.join(",")}},o=function(e){return{applicantId:e.applicantId,applicantName:e.applicantName,applicantCellPhone:e.applicantCellPhone,applicantCity:null!=e.applicantCity?e.applicantCity.name:null,applicantEmail1:e.applicantEmail1,applicantEmail2:e.applicantEmail2,applicantHomePhone:e.applicantHomePhone,applicantWorkingSince:"0",applicantWorkPhone:e.applicantWorkPhone,applicantSourceTitle:e.applicantSourceTitle,applicantPositionTitle:e.applicantPositionTitle,applicantStepTitle:e.applicantStepTitle,applicantPositionId:e.applicantPositionId,applicantStepId:e.applicantStepId,applicantSourceId:e.applicantSourceId,applicantOriginalResumePath:e.applicantOriginalResumePath,applicantOriginalDocPath:e.applicantOriginalDocPath,applicantTextResume:e.applicantTextResume,applicantCurrentEmployer:e.applicantCurrentEmployer,applicantPassport:e.applicantPassport,applicantDateImported:e.applicantDateImported,applicantJoined:e.applicantJoined,applicantDateJoined:e.applicantDateJoined,skillIds:l(e.skills),skillsString:r(e.skills),aliasesString:e.aliasesString,degreeTitle:e.degreeTitle,institute:e.institute,major:e.major,yearOfPassing:e.yearOfPassing,userId:e.userId,stepScheduled:e.stepScheduled,grade:e.grade,appointmentdate:e.appointmentdate,usersResponsible:e.usersResponsible,actionRequired:e.actionRequired,currentStatus:e.currentStatus,applicantExperience:e.applicantExperience,positionStepLevel:e.positionStepLevel,currentCTC:e.currentCTC,expectedCTC:e.expectedCTC,currentCTCDate:e.currentCTCDate,expectedCTCDate:e.expectedCTCDate,currentBasic:e.currentBasic,resumeDateUpdated:e.resumeDateUpdated,flagIds:e.flagIds,sourceEmail:e.sourceEmail,sourceMobile:e.sourceMobile,noticePeriod:e.noticePeriod,ctcOffered:e.ctcOffered,levelOffered:e.levelOffered,inputSalaryVariable:e.inputSalaryVariable,designationOffered:e.designationOffered,vendorId:e.vendorId,sourceTypeId:e.sourceTypeId,rejectReasonIds:e.rejectReasonIds,rejectStepLevels:e.rejectStepLevels,applicantLastInteractionDate:e.applicantLastInteractionDate,applicantIsFresher:e.applicantIsFresher,isConfidential:e.isConfidential,internalLink:e.internalLink,employeeCode:e.employeeCode,basicOffered:e.basicOffered,applicantStatus:e.applicantStatus,applicantHRMSCode:e.applicantHRMSCode,dateOfBirth:e.dateOfBirth,passportNumber:e.passportNumber,resumeType:e.resumeType,resumeTypeId:e.resumeTypeId,customFields:e.customFields,educationDetails:n(e.educationDetails),employmentHistoryDetails:p(e.employmentHistoryDetails),stepTitle:e.stepTitle,rejectedBy:e.rejectedBy,rejectedDate:e.rejectedDate,department:e.department,confidential:e.confidential,fresher:e.fresher,note:e.note,joiningDate:e.joiningDate,blacklistReason:e.blacklistReason}},c=function(e){if(!e)return[];for(var a=[],t=0;t<e.length;t++){var i={documentId:e[t].documentId,applicantId:e[t].applicantId,positionId:e[t].positionId,userId:e[t].userId,dateCreated:e[t].dateCreated,originalFileName:e[t].originalFileName,changedFileName:e[t].changedFileName,ownerName:e[t].ownerName,relativeFilePath:e[t].relativeFilePath,absoluteFilePath:e[t].absoluteFilePath,documentIsHidden:e[t].documentIsHidden};a.push(i)}return a};return{digestApplicantApiObj:i,convertUIObj2ApiObj:o,digestApplicantAttachmentsApiObj:c}}])}();