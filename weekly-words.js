const weeklyWordData = `
confer
reference
influx
provoked
commit
submit
monolith
monotony
biceps
bilingual
begrudge
deposited
imagined
Canadian
technician
insistence
inequality
infirmity
exercising
picnicking
referendum	a vote in favor of or against a particular issue
defer	to submit to another's wishes
monogram	a single design made up of a person's initials
monotheism	the belief that there is one God
celebrated	observed as a special occasion with ceremonies or festivities
fluctuate	to change continually; to waver
revoked	repealed; canceled
biennial	occurring every two years or lasting for two years (as plants)
humanitarian	one who works to improve the lives and well-being of others
indulgence	the act of being permissive; leniency
bedraggled	wet and dirty
absurdity	that which is ridiculous or silly
conformity	the state of being in agreement; likeness
purity	the state of being physically and morally clean
emerging	newly formed or becoming prominent
`;


const weeklyWords = weeklyWordData
    .trim()
    .split("\n")
    .map(line => {

        const parts =
            line.split("\t");

        return {

            word:
                parts[0].trim(),

            definition:
                parts.length > 1
                    ? parts.slice(1)
                        .join("\t")
                        .trim()
                    : ""

        };

    });
