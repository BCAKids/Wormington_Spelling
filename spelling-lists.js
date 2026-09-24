const spellingLists = {

    list6: {

        name: "List 6",

        words: `
abruptly
bankruptcy
corruption
disrupt
interruption
rupture
analogy
analysis
adjust
adoption
advance
advertise
contradictory
introductory
inventory
mandatory
satisfactory
sensory
dormitory
factory
eruption	a sudden explosion
anagram	a word made by rearranging the letters of another word or phrase
anatomy	the study of the structure of humans, animals, and plants
adverb	a word that modifies a verb, adjective, or other adverb
accusatory	suggesting guilt or assigning blame
armory	a storehouse of weaponry, especially for police or military
circulatory	relating to the movement of blood through the body
cursory	quick and careless
depository	a place where items are stored for safekeeping
directory	a list of names and addresses
observatory	a building for observing planets and stars
oratory	the art and skill of effective public speaking
migratory	traveling from one region to another at different seasons
olfactory	relating to the sense of smell
respiratory	the system of the body related to breathing
        `

    }

};


// ======================================================
// PARSE A SPELLING LIST
// ======================================================

function parseSpellingList(listKey) {

    const list =
        spellingLists[listKey];

    if (!list) {

        throw new Error(
            "Spelling list not found: "
            + listKey
        );

    }


    const words =
        list.words
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


    return {

        key:
            listKey,

        name:
            list.name,

        words:
            words

    };

}
