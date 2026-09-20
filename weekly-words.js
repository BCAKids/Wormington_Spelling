const weeklyWordData = `
transfer	to move up or carry from one place or person to another
suffer
infer
reference
conifer	a cone-bearing tree
defer	to submit to another's wishes
referee
Lucifer
fertile	bearing fruit in great quantities
monotone
monogram	a single design made up of a person's initials
monotony
monologue
monopoly
monarchy	a nation governed by a king or queen
visible	able to be seen
accessible
audible	able to be heard
corruptible
responsible
digestible
sensible
possible
convertible	able to be changed into something else
credible	can be believed
terrible
edible	can be eaten
considerable
durable	lasting; not easily broken
capable	having ability; skillful
manageable
portable	able to be moved from place to place
remarkable
reliable	trustworthy; able to be counted on
noticeable
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
