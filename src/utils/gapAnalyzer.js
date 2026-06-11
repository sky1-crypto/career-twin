function gapAnalyzer(
    userSkills,
    requiredSkills
) {

    const have = [];

    const missing = [];

    requiredSkills.forEach(skill => {

        if (userSkills.includes(skill)) {

            have.push(skill);

        } else {

            missing.push(skill);
        }

    });

    return {
        have,
        missing
    };
}

module.exports = gapAnalyzer;