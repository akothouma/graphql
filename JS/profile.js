import { Elements } from "./elements.js"
export const updateUI = (graphqlData) => {
    const { user, transaction } = graphqlData;
    const { 
        userNameDOM,
        firstNameDOM,
        lastNameDOM,
        campusDOM,
        countryDOM,
        genderDOM, joinDateDOM,
        auditRatioDOM,
        emailDOM,
        AuditDoneDOM,
        AuditReceivedDOM,
        moduleGradeDOM,
        piscineGoGradeDOM,
        piscineJSGradeDOM,
        piscineUIGradeDOM,
        piscineUXGradeDOM,
        modulexpsDOM,
        goXpsDom,
        jsXpsDOM,
        uxXpsDOM,
        uiXpsDOM,
    } = Elements();
    
    
    const modulexps = toKB(accumulateXps(user[0].modulexps));
    const goxps = toKB(accumulateXps(user[0].piscineGOxps));
    const jsxps = toKB(accumulateXps(user[0].piscineJSxps));
    const uixps = toKB(accumulateXps(user[0].piscineUIxps));
    const uxxps = toKB(accumulateXps(user[0].piscineUXxps));

    
  
    OverallXPDOM.textContent = `${toKB(user[0].xp.aggregate.sum.amount)} KB`;
    createProgressGraph("progress-graph",transaction);
    createModuleXpBarChart('module-xp-chart', user[0].modulexps);
    userNameDOM.textContent = user[0].login;
    firstNameDOM.textContent = user[0].firstName;
    lastNameDOM.textContent = user[0].lastName;
    genderDOM.textContent = user[0].gender;
    emailDOM.textContent = user[0].email;
    campusDOM.textContent = user[0].campus;
    countryDOM.textContent = user[0].country
    auditRatioDOM.textContent = user[0].auditRatio.toFixed(1);
    joinDateDOM.textContent = new Date(user[0].updatedAt).toLocaleDateString();
    AuditReceivedDOM.textContent = user[0].auditsReceived.aggregate.count;
    AuditDoneDOM.textContent = user[0].auditsDone.aggregate.count;
    moduleGradeDOM.textContent = user[0].modulegrades.aggregate.sum.grade.toFixed(2);
    piscineGoGradeDOM.textContent = (user[0].piscineGOgrades)
        .aggregate.sum.grade.toFixed(2);
    piscineJSGradeDOM.textContent = (user[0].piscineJSgrades)
        .aggregate.sum.grade.toFixed(2);
    piscineUIGradeDOM.textContent = user[0].piscineUIgrades
        .aggregate.sum.grade.toFixed(2);
    piscineUXGradeDOM.textContent = user[0].piscineUXgrades
        .aggregate.sum.grade.toFixed(2);
    OverallXPDOM.textContent=toKB(user[0].xp.aggregate.sum.amount).toFixed(2);
    modulexpsDOM.textContent = toKB(modulexps).toFixed(2);
    goXpsDom.textContent = toKB(goxps).toFixed(2);
    jsXpsDOM.textContent = toKB(jsxps).toFixed(2);
    uxXpsDOM.textContent = toKB(uxxps).toFixed(2);
    uiXpsDOM.textContent = toKB(uixps).toFixed(2);

}
function accumulateXps(array) {
    const result = array.reduce((acc, curr) => acc + curr.amount,0)
    return toKB(result).toFixed(2);
}

function toKB(value) {
  const kbValue = (value / 1000).toFixed(2);
  return parseFloat(kbValue);
}

