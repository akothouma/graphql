import { Elements } from "./elements.js"
export const updateUI = (graphqlData) => {
    const { user, transaction } = graphqlData
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
    } = Elements();

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

    const modulexps = accumulateXps(user[0].modulexps);
    const goxps = accumulateXps(user[0].piscineGOxps);
    const jsxps = accumulateXps(user[0].piscineJSxps);
    const uixps = accumulateXps(user[0].piscineUIxps);
    const uxxps = accumulateXps(user[0].piscineUXxps);
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


function populateXPData(containerId, xpArray) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (xpArray && xpArray.length > 0) {
        xpArray.forEach(xp => {
            const xpElement = document.createElement('div');
            xpElement.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin: 0.25rem 0;">
                            <span>${xp.path}</span>
                            <strong>${xp.amount} XP</strong>
                        </div>
                    `;
            container.appendChild(xpElement);
        });
    } else {
        container.innerHTML = '<div>No XP data available</div>';
    }
}
