function jobMatcher(userSkills,requiredSkills){
    const matchedSkills =
    userSkills.filter(skill =>
        requiredSkills.includes(skill)
    );

    const missingSkills =
    requiredSkills.filter(skill =>
        !userSkills.includes(skill)
    );

    const matchScore =
    (
        matchedSkills.length /
        requiredSkills.length
    ) * 100;

    return {
        matchedSkills,
        missingSkills,
        matchScore
    };
}

module.exports = jobMatcher;