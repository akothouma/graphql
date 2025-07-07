import { Elements } from "./elements.js"
import {createProgressGraph} from "./progress.js"
import {createModuleXpBarChart} from "./projects.js"
export const updateUI = (graphqlData) => {
    const { user, transaction } = graphqlData;
    const { logoutButton,
        dashboard,
        loginButton,
        loginPage,
        error,
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
        OverallXPDOM
    } = Elements();
    
    const modulexps = accumulateXps(user[0].modulexps);
    const goxps = accumulateXps(user[0].piscineGOxps);
    const jsxps = accumulateXps(user[0].piscineJSxps);
    const uixps = accumulateXps(user[0].piscineUIxps);
    const uxxps = accumulateXps(user[0].piscineUXxps);
    createProgressGraph("progress-graph",transaction);
    createModuleXpBarChart('module-xp-chart', user[0].modulexps);
    userNameDOM.textContent = user[0].login;
    firstNameDOM.textContent = user[0].firstName;
    lastNameDOM.textContent = user[0].lastName;
    genderDOM.textContent = user[0].gender;
    emailDOM.textContent = user[0].email;
    campusDOM.textContent = user[0].campus;
    countryDOM.textContent = user[0].country
    auditRatioDOM.textContent = user[0].auditRatio;
    joinDateDOM.textContent = new Date(user[0].updatedAt).toLocaleDateString();
    AuditReceivedDOM.textContent = user[0].auditsReceived.aggregate.count;
    AuditDoneDOM.textContent = user[0].auditsDone.aggregate.count;
    moduleGradeDOM.textContent = user[0].modulegrades.aggregate.sum.grade;
    piscineGoGradeDOM.textContent = user[0].piscineGOgrades
        .aggregate.sum.grade;
    piscineJSGradeDOM.textContent = user[0].piscineJSgrades
        .aggregate.sum.grade;
    piscineUIGradeDOM.textContent = user[0].piscineUIgrades
        .aggregate.sum.grade;
    piscineUXGradeDOM.textContent = user[0].piscineUXgrades
        .aggregate.sum.grade;
    OverallXPDOM.textContent=user[0].xp.aggregate.sum.amount;
    modulexpsDOM.textContent = modulexps;
    goXpsDom.textContent = goxps;
    jsXpsDOM.textContent = jsxps;
    uxXpsDOM.textContent = uxxps;
    uiXpsDOM.textContent = uixps;

}
function accumulateXps(array) {
    const result = array.reduce((acc, curr) => acc + curr.amount,0)
    return result
}

