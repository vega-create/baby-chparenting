import { useState, useEffect } from "react";

const STORAGE_KEY = "baby-name-favorites";

const NAMES = [
  { name: "Olivia", gender: "girl", origin: "Latin", meaning: "Olive tree, symbol of peace", style: "Classic", popularity: "Top 5", pronunciation: "oh-LIV-ee-ah" },
  { name: "Liam", gender: "boy", origin: "Irish", meaning: "Strong-willed warrior, protector", style: "Classic", popularity: "Top 5", pronunciation: "LEE-um" },
  { name: "Emma", gender: "girl", origin: "German", meaning: "Whole, universal", style: "Classic", popularity: "Top 10", pronunciation: "EM-ah" },
  { name: "Noah", gender: "boy", origin: "Hebrew", meaning: "Rest, comfort", style: "Biblical", popularity: "Top 5", pronunciation: "NO-ah" },
  { name: "Ava", gender: "girl", origin: "Latin", meaning: "Life, bird-like", style: "Classic", popularity: "Top 10", pronunciation: "AY-vah" },
  { name: "Oliver", gender: "boy", origin: "Latin", meaning: "Olive tree, peaceful one", style: "Classic", popularity: "Top 10", pronunciation: "OL-ih-ver" },
  { name: "Sophia", gender: "girl", origin: "Greek", meaning: "Wisdom", style: "Classic", popularity: "Top 10", pronunciation: "so-FEE-ah" },
  { name: "Elijah", gender: "boy", origin: "Hebrew", meaning: "My God is Yahweh", style: "Biblical", popularity: "Top 10", pronunciation: "ee-LY-jah" },
  { name: "Luna", gender: "girl", origin: "Latin", meaning: "Moon", style: "Nature", popularity: "Top 20", pronunciation: "LOO-nah" },
  { name: "James", gender: "boy", origin: "Hebrew", meaning: "Supplanter", style: "Classic", popularity: "Top 10", pronunciation: "JAYMZ" },
  { name: "Willow", gender: "girl", origin: "English", meaning: "Graceful willow tree", style: "Nature", popularity: "Top 50", pronunciation: "WIL-oh" },
  { name: "Theodore", gender: "boy", origin: "Greek", meaning: "Gift of God", style: "Classic", popularity: "Top 20", pronunciation: "THEE-oh-dor" },
  { name: "Isla", gender: "girl", origin: "Scottish", meaning: "Island", style: "Modern", popularity: "Top 20", pronunciation: "EYE-lah" },
  { name: "Henry", gender: "boy", origin: "German", meaning: "Ruler of the household", style: "Royal", popularity: "Top 20", pronunciation: "HEN-ree" },
  { name: "Aurora", gender: "girl", origin: "Latin", meaning: "Dawn", style: "Nature", popularity: "Top 30", pronunciation: "ah-ROR-ah" },
  { name: "Sebastian", gender: "boy", origin: "Greek", meaning: "Venerable, revered", style: "Classic", popularity: "Top 20", pronunciation: "seh-BAS-tee-an" },
  { name: "Ivy", gender: "girl", origin: "English", meaning: "Faithfulness, climbing vine", style: "Nature", popularity: "Top 50", pronunciation: "EYE-vee" },
  { name: "Caleb", gender: "boy", origin: "Hebrew", meaning: "Faithful, wholehearted", style: "Biblical", popularity: "Top 50", pronunciation: "KAY-leb" },
  { name: "Chloe", gender: "girl", origin: "Greek", meaning: "Blooming, fertility", style: "Classic", popularity: "Top 30", pronunciation: "KLO-ee" },
  { name: "Alexander", gender: "boy", origin: "Greek", meaning: "Defender of the people", style: "Royal", pronunciation: "al-eg-ZAN-der", popularity: "Top 20" },
  { name: "Hazel", gender: "girl", origin: "English", meaning: "Hazelnut tree", style: "Nature", popularity: "Top 30", pronunciation: "HAY-zel" },
  { name: "William", gender: "boy", origin: "German", meaning: "Resolute protector", style: "Royal", popularity: "Top 10", pronunciation: "WIL-yum" },
  { name: "Violet", gender: "girl", origin: "Latin", meaning: "Purple flower", style: "Nature", popularity: "Top 40", pronunciation: "VY-oh-let" },
  { name: "Benjamin", gender: "boy", origin: "Hebrew", meaning: "Son of the right hand", style: "Biblical", popularity: "Top 10", pronunciation: "BEN-jah-min" },
  { name: "Aria", gender: "girl", origin: "Italian", meaning: "Air, song, melody", style: "Modern", popularity: "Top 30", pronunciation: "AH-ree-ah" },
  { name: "Ethan", gender: "boy", origin: "Hebrew", meaning: "Strong, firm, enduring", style: "Biblical", popularity: "Top 20", pronunciation: "EE-than" },
  { name: "Sage", gender: "neutral", origin: "Latin", meaning: "Wise one, herb", style: "Nature", popularity: "Top 100", pronunciation: "SAYJ" },
  { name: "Rowan", gender: "neutral", origin: "Irish", meaning: "Little red-haired one", style: "Nature", popularity: "Top 100", pronunciation: "ROH-en" },
  { name: "River", gender: "neutral", origin: "English", meaning: "Flowing body of water", style: "Nature", popularity: "Top 100", pronunciation: "RIV-er" },
  { name: "Quinn", gender: "neutral", origin: "Irish", meaning: "Wise, intelligent", style: "Modern", popularity: "Top 100", pronunciation: "KWIN" },
  { name: "Maeve", gender: "girl", origin: "Irish", meaning: "Intoxicating, she who rules", style: "Unique", popularity: "Top 100", pronunciation: "MAYV" },
  { name: "Finn", gender: "boy", origin: "Irish", meaning: "Fair, white, handsome", style: "Modern", popularity: "Top 50", pronunciation: "FIN" },
  { name: "Sienna", gender: "girl", origin: "Italian", meaning: "Orange-red, from Siena", style: "Modern", popularity: "Top 100", pronunciation: "see-EN-ah" },
  { name: "Arthur", gender: "boy", origin: "Celtic", meaning: "Bear, noble, courageous", style: "Royal", popularity: "Top 100", pronunciation: "AR-thur" },
  { name: "Charlotte", gender: "girl", origin: "French", meaning: "Free woman, petite", style: "Royal", popularity: "Top 5", pronunciation: "SHAR-lot" },
  { name: "Leo", gender: "boy", origin: "Latin", meaning: "Lion", style: "Modern", popularity: "Top 20", pronunciation: "LEE-oh" },
  { name: "Penelope", gender: "girl", origin: "Greek", meaning: "Weaver, faithful wife", style: "Classic", popularity: "Top 30", pronunciation: "peh-NEL-oh-pee" },
  { name: "Jack", gender: "boy", origin: "English", meaning: "God is gracious", style: "Classic", popularity: "Top 30", pronunciation: "JAK" },
  { name: "Eleanor", gender: "girl", origin: "French", meaning: "Shining light, bright one", style: "Royal", popularity: "Top 30", pronunciation: "EL-eh-nor" },
  { name: "Owen", gender: "boy", origin: "Welsh", meaning: "Young warrior, well-born", style: "Classic", popularity: "Top 30", pronunciation: "OH-en" },
  { name: "Amara", gender: "girl", origin: "Latin", meaning: "Grace, eternal, beloved", style: "Unique", popularity: "Top 100", pronunciation: "ah-MAR-ah" },
  { name: "Miles", gender: "boy", origin: "Latin", meaning: "Soldier, merciful", style: "Modern", popularity: "Top 50", pronunciation: "MYLZ" },
  { name: "Nora", gender: "girl", origin: "Irish", meaning: "Honor, light", style: "Classic", popularity: "Top 30", pronunciation: "NOR-ah" },
  { name: "Lucas", gender: "boy", origin: "Greek", meaning: "Light, bringer of light", style: "Classic", popularity: "Top 10", pronunciation: "LOO-kus" },
  { name: "Zara", gender: "girl", origin: "Arabic", meaning: "Princess, blooming flower", style: "Modern", popularity: "Top 100", pronunciation: "ZAR-ah" },
  { name: "Samuel", gender: "boy", origin: "Hebrew", meaning: "God has heard", style: "Biblical", popularity: "Top 30", pronunciation: "SAM-yoo-el" },
  { name: "Iris", gender: "girl", origin: "Greek", meaning: "Rainbow, messenger goddess", style: "Nature", popularity: "Top 100", pronunciation: "EYE-ris" },
  { name: "Daniel", gender: "boy", origin: "Hebrew", meaning: "God is my judge", style: "Biblical", popularity: "Top 20", pronunciation: "DAN-yel" },
  { name: "Freya", gender: "girl", origin: "Norse", meaning: "Noble woman, goddess of love", style: "Unique", popularity: "Top 100", pronunciation: "FRAY-ah" },
  { name: "Julian", gender: "boy", origin: "Latin", meaning: "Youthful, downy-bearded", style: "Classic", popularity: "Top 50", pronunciation: "JOO-lee-an" },
  { name: "Eden", gender: "neutral", origin: "Hebrew", meaning: "Delight, paradise", style: "Biblical", popularity: "Top 100", pronunciation: "EE-den" },
  { name: "Avery", gender: "neutral", origin: "English", meaning: "Ruler of elves", style: "Modern", popularity: "Top 50", pronunciation: "AY-ver-ee" },
  { name: "Riley", gender: "neutral", origin: "Irish", meaning: "Courageous, valiant", style: "Modern", popularity: "Top 50", pronunciation: "RY-lee" },
  { name: "Harper", gender: "neutral", origin: "English", meaning: "Harp player", style: "Modern", popularity: "Top 20", pronunciation: "HAR-per" },
  { name: "Atlas", gender: "boy", origin: "Greek", meaning: "Bearer of the heavens", style: "Unique", popularity: "Top 100", pronunciation: "AT-las" },
  { name: "Jasper", gender: "boy", origin: "Persian", meaning: "Treasurer, spotted stone", style: "Unique", popularity: "Top 100", pronunciation: "JAS-per" },
  { name: "Felix", gender: "boy", origin: "Latin", meaning: "Happy, fortunate", style: "Classic", popularity: "Top 100", pronunciation: "FEE-liks" },
  { name: "Ezra", gender: "boy", origin: "Hebrew", meaning: "Helper, strong", style: "Biblical", popularity: "Top 50", pronunciation: "EZ-rah" },
  { name: "Silas", gender: "boy", origin: "Latin", meaning: "Man of the forest", style: "Biblical", popularity: "Top 100", pronunciation: "SY-las" },
  { name: "Mila", gender: "girl", origin: "Slavic", meaning: "Gracious, dear", style: "Modern", popularity: "Top 30", pronunciation: "MEE-lah" },
  { name: "Eloise", gender: "girl", origin: "French", meaning: "Healthy, wide", style: "Classic", popularity: "Top 100", pronunciation: "EL-oh-eez" },
  { name: "Clara", gender: "girl", origin: "Latin", meaning: "Clear, bright, famous", style: "Classic", popularity: "Top 100", pronunciation: "KLAR-ah" },
  { name: "Evelyn", gender: "girl", origin: "English", meaning: "Wished-for child, life", style: "Classic", popularity: "Top 10", pronunciation: "EV-eh-lin" },
  { name: "Scarlett", gender: "girl", origin: "English", meaning: "Red, bright", style: "Modern", popularity: "Top 30", pronunciation: "SKAR-let" },
  { name: "Gabriel", gender: "boy", origin: "Hebrew", meaning: "God is my strength", style: "Biblical", popularity: "Top 30", pronunciation: "GAY-bree-el" },
  { name: "Oscar", gender: "boy", origin: "Irish", meaning: "Deer friend, champion warrior", style: "Classic", popularity: "Top 100", pronunciation: "OS-kar" },
  { name: "Hugo", gender: "boy", origin: "German", meaning: "Mind, intellect", style: "Modern", popularity: "Top 100", pronunciation: "HYOO-go" },
  { name: "Kai", gender: "neutral", origin: "Hawaiian", meaning: "Sea, ocean", style: "Nature", popularity: "Top 100", pronunciation: "KY" },
  { name: "Wren", gender: "neutral", origin: "English", meaning: "Small songbird", style: "Nature", popularity: "Top 100", pronunciation: "REN" },
  { name: "Jade", gender: "neutral", origin: "Spanish", meaning: "Precious green stone", style: "Nature", popularity: "Top 100", pronunciation: "JAYD" },
  { name: "Emery", gender: "neutral", origin: "German", meaning: "Industrious leader", style: "Modern", popularity: "Top 100", pronunciation: "EM-er-ee" },
  { name: "Soren", gender: "boy", origin: "Scandinavian", meaning: "Stern, severe", style: "Unique", popularity: "Top 200", pronunciation: "SOR-en" },
  { name: "Thea", gender: "girl", origin: "Greek", meaning: "Goddess, divine", style: "Modern", popularity: "Top 100", pronunciation: "THEE-ah" },
  { name: "Beckett", gender: "boy", origin: "English", meaning: "Bee cottage, beehive", style: "Modern", popularity: "Top 100", pronunciation: "BEK-it" },
  { name: "Genevieve", gender: "girl", origin: "French", meaning: "Woman of the race, white wave", style: "Royal", popularity: "Top 100", pronunciation: "JEN-eh-veev" },
  { name: "August", gender: "boy", origin: "Latin", meaning: "Great, magnificent", style: "Royal", popularity: "Top 100", pronunciation: "AW-gust" },
  { name: "Cecilia", gender: "girl", origin: "Latin", meaning: "Blind, heavenly", style: "Classic", popularity: "Top 100", pronunciation: "seh-SEEL-yah" },
  { name: "Tobias", gender: "boy", origin: "Hebrew", meaning: "God is good", style: "Biblical", popularity: "Top 200", pronunciation: "toh-BY-as" },
  { name: "Stella", gender: "girl", origin: "Latin", meaning: "Star", style: "Classic", popularity: "Top 50", pronunciation: "STEL-ah" },
  { name: "Cyrus", gender: "boy", origin: "Persian", meaning: "Sun, lord", style: "Unique", popularity: "Top 200", pronunciation: "SY-rus" },
  { name: "Dahlia", gender: "girl", origin: "Scandinavian", meaning: "Valley flower", style: "Nature", popularity: "Top 100", pronunciation: "DAL-yah" },
  { name: "Atticus", gender: "boy", origin: "Latin", meaning: "From Attica, man of Athens", style: "Unique", popularity: "Top 200", pronunciation: "AT-ih-kus" },
  { name: "Elowen", gender: "girl", origin: "Cornish", meaning: "Elm tree", style: "Nature", popularity: "Top 200", pronunciation: "el-OH-wen" },
  { name: "Rhys", gender: "boy", origin: "Welsh", meaning: "Enthusiasm, passion", style: "Modern", popularity: "Top 200", pronunciation: "REES" },
  { name: "Juniper", gender: "girl", origin: "Latin", meaning: "Evergreen shrub, youthful", style: "Nature", popularity: "Top 200", pronunciation: "JOO-nih-per" },
  { name: "Orion", gender: "boy", origin: "Greek", meaning: "Hunter, rising in the sky", style: "Unique", popularity: "Top 200", pronunciation: "oh-RY-on" },
  { name: "Lyra", gender: "girl", origin: "Greek", meaning: "Lyre, harp constellation", style: "Unique", popularity: "Top 200", pronunciation: "LEER-ah" },
  { name: "Rahim", gender: "boy", origin: "Arabic", meaning: "Compassionate, merciful", style: "Classic", popularity: "Top 200", pronunciation: "rah-HEEM" },
  { name: "Layla", gender: "girl", origin: "Arabic", meaning: "Night, dark beauty", style: "Classic", popularity: "Top 30", pronunciation: "LAY-lah" },
  { name: "Karim", gender: "boy", origin: "Arabic", meaning: "Generous, noble", style: "Classic", popularity: "Top 200", pronunciation: "kah-REEM" },
  { name: "Amina", gender: "girl", origin: "Arabic", meaning: "Truthful, trustworthy", style: "Classic", popularity: "Top 200", pronunciation: "ah-MEE-nah" },
  { name: "Yusuf", gender: "boy", origin: "Arabic", meaning: "God increases", style: "Classic", popularity: "Top 200", pronunciation: "YOO-suf" },
  { name: "Hana", gender: "girl", origin: "Japanese", meaning: "Flower, blossom", style: "Nature", popularity: "Top 200", pronunciation: "HAH-nah" },
  { name: "Kenji", gender: "boy", origin: "Japanese", meaning: "Intelligent second son", style: "Modern", popularity: "Top 200", pronunciation: "KEN-jee" },
  { name: "Sakura", gender: "girl", origin: "Japanese", meaning: "Cherry blossom", style: "Nature", popularity: "Top 200", pronunciation: "sah-KOO-rah" },
  { name: "Haruki", gender: "boy", origin: "Japanese", meaning: "Shining sun, spring child", style: "Modern", popularity: "Top 200", pronunciation: "hah-ROO-kee" },
  { name: "Aiko", gender: "girl", origin: "Japanese", meaning: "Love child, beloved", style: "Classic", popularity: "Top 200", pronunciation: "AY-koh" },
  { name: "Declan", gender: "boy", origin: "Irish", meaning: "Full of goodness", style: "Modern", popularity: "Top 100", pronunciation: "DEK-lan" },
  { name: "Siobhan", gender: "girl", origin: "Irish", meaning: "God is gracious", style: "Classic", popularity: "Top 200", pronunciation: "shih-VAWN" },
  { name: "Niamh", gender: "girl", origin: "Irish", meaning: "Bright, radiant", style: "Unique", popularity: "Top 200", pronunciation: "NEEV" },
  { name: "Callum", gender: "boy", origin: "Scottish", meaning: "Dove, peace", style: "Classic", popularity: "Top 200", pronunciation: "KAL-um" },
  { name: "Evangeline", gender: "girl", origin: "Greek", meaning: "Bearer of good news", style: "Royal", popularity: "Top 200", pronunciation: "ee-VAN-jeh-leen" },
  { name: "Cassian", gender: "boy", origin: "Latin", meaning: "Hollow, vain", style: "Unique", popularity: "Top 200", pronunciation: "KASH-en" },
  { name: "Rosalind", gender: "girl", origin: "Latin", meaning: "Beautiful rose, gentle horse", style: "Royal", popularity: "Top 200", pronunciation: "ROZ-ah-lind" },
  { name: "Idris", gender: "boy", origin: "Welsh", meaning: "Ardent lord, prophet", style: "Unique", popularity: "Top 200", pronunciation: "ID-ris" },
  { name: "Astrid", gender: "girl", origin: "Norse", meaning: "Divine beauty, godly strength", style: "Unique", popularity: "Top 200", pronunciation: "AS-trid" },
  { name: "Phoenix", gender: "neutral", origin: "Greek", meaning: "Mythical reborn bird", style: "Unique", popularity: "Top 200", pronunciation: "FEE-niks" },
  { name: "Morgan", gender: "neutral", origin: "Welsh", meaning: "Sea-born, great brightness", style: "Classic", popularity: "Top 100", pronunciation: "MOR-gan" },
  { name: "Cameron", gender: "neutral", origin: "Scottish", meaning: "Crooked nose", style: "Modern", popularity: "Top 100", pronunciation: "KAM-er-on" },
  { name: "Skylar", gender: "neutral", origin: "Dutch", meaning: "Scholar, protection", style: "Modern", popularity: "Top 50", pronunciation: "SKY-lar" },
  { name: "Jude", gender: "boy", origin: "Hebrew", meaning: "Praised, thankful", style: "Biblical", popularity: "Top 100", pronunciation: "JOOD" },
  { name: "Calliope", gender: "girl", origin: "Greek", meaning: "Beautiful voice", style: "Unique", popularity: "Top 200", pronunciation: "kah-LY-oh-pee" },
  { name: "Milo", gender: "boy", origin: "German", meaning: "Gracious, soldier", style: "Modern", popularity: "Top 50", pronunciation: "MY-lo" },
  { name: "Clementine", gender: "girl", origin: "Latin", meaning: "Merciful, gentle", style: "Classic", popularity: "Top 200", pronunciation: "KLEM-en-tyne" },
  { name: "Asher", gender: "boy", origin: "Hebrew", meaning: "Happy, blessed", style: "Biblical", popularity: "Top 30", pronunciation: "ASH-er" },
  { name: "Margot", gender: "girl", origin: "French", meaning: "Pearl", style: "Royal", popularity: "Top 100", pronunciation: "MAR-go" },
  { name: "Solomon", gender: "boy", origin: "Hebrew", meaning: "Peaceful", style: "Biblical", popularity: "Top 200", pronunciation: "SOL-oh-mon" },
  { name: "Adelaide", gender: "girl", origin: "German", meaning: "Noble, kind", style: "Royal", popularity: "Top 200", pronunciation: "AD-eh-layd" },
  { name: "Bodhi", gender: "neutral", origin: "Sanskrit", meaning: "Awakening, enlightenment", style: "Unique", popularity: "Top 200", pronunciation: "BOH-dee" },
  { name: "Fern", gender: "girl", origin: "English", meaning: "Fern plant, bold voyager", style: "Nature", popularity: "Top 200", pronunciation: "FURN" },
  { name: "Brooks", gender: "boy", origin: "English", meaning: "Of the brook, stream", style: "Nature", popularity: "Top 200", pronunciation: "BROOKS" },
  { name: "Cora", gender: "girl", origin: "Greek", meaning: "Maiden, heart", style: "Classic", popularity: "Top 100", pronunciation: "KOR-ah" },
  { name: "Emmett", gender: "boy", origin: "English", meaning: "Universal, powerful", style: "Classic", popularity: "Top 100", pronunciation: "EM-it" },
  { name: "Beatrice", gender: "girl", origin: "Latin", meaning: "She who brings happiness", style: "Royal", popularity: "Top 200", pronunciation: "BEE-ah-tris" },
  { name: "Dashiell", gender: "boy", origin: "French", meaning: "Page boy, herald", style: "Unique", popularity: "Top 200", pronunciation: "da-SHEEL" },
  { name: "Elara", gender: "girl", origin: "Greek", meaning: "Bright, shining one", style: "Unique", popularity: "Top 200", pronunciation: "eh-LAR-ah" },
  { name: "Griffin", gender: "boy", origin: "Welsh", meaning: "Strong lord, chief", style: "Modern", pronunciation: "GRIF-in", popularity: "Top 200" },
  { name: "Winifred", gender: "girl", origin: "Welsh", meaning: "Blessed peacemaking", style: "Classic", popularity: "Top 200", pronunciation: "WIN-ih-fred" },
  { name: "Leander", gender: "boy", origin: "Greek", meaning: "Lion man", style: "Unique", popularity: "Top 200", pronunciation: "lee-AN-der" },
  { name: "Celeste", gender: "girl", origin: "Latin", meaning: "Heavenly", style: "Classic", popularity: "Top 200", pronunciation: "seh-LEST" },
  { name: "Magnus", gender: "boy", origin: "Latin", meaning: "Great, mighty", style: "Royal", popularity: "Top 200", pronunciation: "MAG-nus" },
  { name: "Leilani", gender: "girl", origin: "Hawaiian", meaning: "Heavenly flower", style: "Nature", popularity: "Top 200", pronunciation: "lay-LAH-nee" },
  { name: "Jasmine", gender: "girl", origin: "Persian", meaning: "Jasmine flower, gift from God", style: "Nature", popularity: "Top 100", pronunciation: "JAZ-min" },
  { name: "Nadia", gender: "girl", origin: "Slavic", meaning: "Hope, beginning", style: "Classic", popularity: "Top 200", pronunciation: "NAH-dee-ah" },
  { name: "Theo", gender: "boy", origin: "Greek", meaning: "Divine gift", style: "Modern", popularity: "Top 50", pronunciation: "THEE-oh" },
  { name: "Xavier", gender: "boy", origin: "Arabic", meaning: "Bright, new house", style: "Unique", popularity: "Top 100", pronunciation: "ZAY-vee-er" },
  { name: "Ivy", gender: "girl", origin: "English", meaning: "Climbing vine, faithfulness", style: "Nature", popularity: "Top 50", pronunciation: "EYE-vee" },
  { name: "Raphael", gender: "boy", origin: "Hebrew", meaning: "God has healed", style: "Biblical", popularity: "Top 200", pronunciation: "rah-fay-EL" },
  { name: "Poppy", gender: "girl", origin: "English", meaning: "Red flower, remembrance", style: "Nature", popularity: "Top 200", pronunciation: "POP-ee" },
  { name: "Maxwell", gender: "boy", origin: "Scottish", meaning: "Great spring, stream", style: "Classic", popularity: "Top 100", pronunciation: "MAKS-well" },
  { name: "Phoebe", gender: "girl", origin: "Greek", meaning: "Bright, radiant, pure", style: "Classic", popularity: "Top 200", pronunciation: "FEE-bee" },
  { name: "Mateo", gender: "boy", origin: "Spanish", meaning: "Gift of God", style: "Modern", popularity: "Top 10", pronunciation: "mah-TAY-oh" },
  { name: "Serena", gender: "girl", origin: "Latin", meaning: "Tranquil, serene", style: "Classic", popularity: "Top 200", pronunciation: "seh-REE-nah" },
  { name: "Isaac", gender: "boy", origin: "Hebrew", meaning: "He will laugh", style: "Biblical", popularity: "Top 30", pronunciation: "EYE-zak" },
  { name: "Naomi", gender: "girl", origin: "Hebrew", meaning: "Pleasantness, delight", style: "Biblical", popularity: "Top 50", pronunciation: "nay-OH-mee" },
  { name: "Roman", gender: "boy", origin: "Latin", meaning: "Citizen of Rome", style: "Classic", popularity: "Top 50", pronunciation: "ROH-man" },
  { name: "Arabella", gender: "girl", origin: "Latin", meaning: "Yielding to prayer, beautiful", style: "Royal", popularity: "Top 200", pronunciation: "air-ah-BEL-ah" },
  { name: "Aiden", gender: "boy", origin: "Irish", meaning: "Little fire", style: "Modern", popularity: "Top 30", pronunciation: "AY-den" },
  { name: "Camille", gender: "girl", origin: "French", meaning: "Perfect, unblemished", style: "Classic", popularity: "Top 200", pronunciation: "kah-MEEL" },
  { name: "Elias", gender: "boy", origin: "Hebrew", meaning: "The Lord is my God", style: "Biblical", popularity: "Top 50", pronunciation: "eh-LY-as" },
  { name: "Flora", gender: "girl", origin: "Latin", meaning: "Flower, goddess of spring", style: "Nature", popularity: "Top 200", pronunciation: "FLOR-ah" },
  { name: "Nico", gender: "boy", origin: "Greek", meaning: "Victory of the people", style: "Modern", popularity: "Top 200", pronunciation: "NEE-koh" },
  { name: "Esme", gender: "girl", origin: "French", meaning: "Beloved, esteemed", style: "Modern", popularity: "Top 200", pronunciation: "EZ-may" },
  { name: "Sterling", gender: "boy", origin: "English", meaning: "Genuine, of high quality", style: "Unique", popularity: "Top 200", pronunciation: "STUR-ling" },
  { name: "Delilah", gender: "girl", origin: "Hebrew", meaning: "Delicate, languishing", style: "Biblical", popularity: "Top 100", pronunciation: "deh-LY-lah" },
  { name: "Ronan", gender: "boy", origin: "Irish", meaning: "Little seal", style: "Modern", popularity: "Top 200", pronunciation: "ROH-nan" },
  { name: "Annalise", gender: "girl", origin: "German", meaning: "Grace, favor", style: "Classic", popularity: "Top 200", pronunciation: "AN-ah-lees" },
  { name: "Kieran", gender: "boy", origin: "Irish", meaning: "Little dark one", style: "Modern", popularity: "Top 200", pronunciation: "KEER-an" },
  { name: "Vivienne", gender: "girl", origin: "French", meaning: "Alive, lively", style: "Royal", popularity: "Top 200", pronunciation: "viv-ee-EN" },
  { name: "Emerson", gender: "neutral", origin: "English", meaning: "Son of Emery, brave", style: "Modern", popularity: "Top 100", pronunciation: "EM-er-son" },
  { name: "Marlowe", gender: "neutral", origin: "English", meaning: "Driftwood, remnants of a lake", style: "Unique", popularity: "Top 200", pronunciation: "MAR-loh" },
  { name: "Reese", gender: "neutral", origin: "Welsh", meaning: "Ardor, enthusiasm", style: "Modern", popularity: "Top 100", pronunciation: "REES" },
  { name: "Ellis", gender: "neutral", origin: "Welsh", meaning: "Benevolent, kind", style: "Modern", popularity: "Top 200", pronunciation: "EL-is" },
  { name: "Sasha", gender: "neutral", origin: "Russian", meaning: "Defender of mankind", style: "Modern", popularity: "Top 200", pronunciation: "SAH-shah" },
  { name: "Indigo", gender: "neutral", origin: "English", meaning: "Deep blue-purple dye", style: "Unique", popularity: "Top 200", pronunciation: "IN-dih-go" },
  { name: "Arden", gender: "neutral", origin: "English", meaning: "Valley of the eagle", style: "Nature", popularity: "Top 200", pronunciation: "AR-den" },
  { name: "Zephyr", gender: "neutral", origin: "Greek", meaning: "West wind, gentle breeze", style: "Unique", popularity: "Top 200", pronunciation: "ZEF-er" },
  { name: "George", gender: "boy", origin: "Greek", meaning: "Farmer, earth worker", style: "Royal", popularity: "Top 100", pronunciation: "JORJ" },
  { name: "Josephine", gender: "girl", origin: "French", meaning: "God will increase", style: "Royal", popularity: "Top 100", pronunciation: "JO-seh-feen" },
  { name: "David", gender: "boy", origin: "Hebrew", meaning: "Beloved", style: "Biblical", popularity: "Top 30", pronunciation: "DAY-vid" },
  { name: "Ruth", gender: "girl", origin: "Hebrew", meaning: "Compassionate friend", style: "Biblical", popularity: "Top 200", pronunciation: "ROOTH" },
  { name: "Marcus", gender: "boy", origin: "Latin", meaning: "Warlike, dedicated to Mars", style: "Classic", popularity: "Top 200", pronunciation: "MAR-kus" },
  { name: "Pearl", gender: "girl", origin: "English", meaning: "Precious gem from the sea", style: "Classic", popularity: "Top 200", pronunciation: "PURL" },
  { name: "Remy", gender: "neutral", origin: "French", meaning: "Oarsman, remedy", style: "Modern", popularity: "Top 200", pronunciation: "REH-mee" },
  { name: "Lennox", gender: "neutral", origin: "Scottish", meaning: "Elm grove, calm settlement", style: "Unique", popularity: "Top 200", pronunciation: "LEN-oks" },
  { name: "Hollis", gender: "neutral", origin: "English", meaning: "Near the holly bushes", style: "Nature", popularity: "Top 200", pronunciation: "HOL-is" },
  { name: "Cyril", gender: "boy", origin: "Greek", meaning: "Lordly, masterful", style: "Classic", popularity: "Top 200", pronunciation: "SEER-il" },
  { name: "Cordelia", gender: "girl", origin: "Latin", meaning: "Heart, daughter of the sea", style: "Royal", popularity: "Top 200", pronunciation: "kor-DEE-lee-ah" },
  { name: "Jasper", gender: "boy", origin: "Persian", meaning: "Bringer of treasure", style: "Nature", popularity: "Top 100", pronunciation: "JAS-per" },
  { name: "Ivy", gender: "girl", origin: "English", meaning: "Fidelity, eternity", style: "Nature", popularity: "Top 50", pronunciation: "EYE-vee" },
  { name: "Levi", gender: "boy", origin: "Hebrew", meaning: "Joined, attached", style: "Biblical", popularity: "Top 20", pronunciation: "LEE-vy" },
  { name: "Maya", gender: "girl", origin: "Sanskrit", meaning: "Illusion, dream, mother", style: "Classic", popularity: "Top 50", pronunciation: "MY-ah" },
  { name: "Dominic", gender: "boy", origin: "Latin", meaning: "Belonging to the Lord", style: "Classic", popularity: "Top 100", pronunciation: "DOM-ih-nik" },
  { name: "Elise", gender: "girl", origin: "French", meaning: "Pledged to God", style: "Classic", popularity: "Top 200", pronunciation: "eh-LEES" },
  { name: "Arlo", gender: "boy", origin: "English", meaning: "Fortified hill", style: "Modern", popularity: "Top 100", pronunciation: "AR-lo" },
  { name: "Briar", gender: "neutral", origin: "English", meaning: "Thorny shrub, wild rose", style: "Nature", popularity: "Top 200", pronunciation: "BRY-er" },
  { name: "Asa", gender: "boy", origin: "Hebrew", meaning: "Healer, physician", style: "Biblical", popularity: "Top 200", pronunciation: "AY-sah" },
  { name: "Vera", gender: "girl", origin: "Russian", meaning: "Faith, truth", style: "Classic", popularity: "Top 200", pronunciation: "VEER-ah" },
  { name: "Tatum", gender: "neutral", origin: "English", meaning: "Cheerful bringer of joy", style: "Modern", popularity: "Top 200", pronunciation: "TAY-tum" },
  { name: "Lysander", gender: "boy", origin: "Greek", meaning: "Liberator, one who is freed", style: "Unique", pronunciation: "ly-SAN-der", popularity: "Top 200" },
  { name: "Seraphina", gender: "girl", origin: "Hebrew", meaning: "Fiery, ardent angel", style: "Unique", popularity: "Top 200", pronunciation: "sair-ah-FEE-nah" },
  { name: "Caspian", gender: "boy", origin: "English", meaning: "Of the Caspian Sea", style: "Unique", popularity: "Top 200", pronunciation: "KAS-pee-an" },
  { name: "Octavia", gender: "girl", origin: "Latin", meaning: "Eighth, born eighth", style: "Royal", popularity: "Top 200", pronunciation: "ok-TAY-vee-ah" },
  { name: "Elio", gender: "boy", origin: "Italian", meaning: "Sun", style: "Modern", popularity: "Top 200", pronunciation: "EL-ee-oh" },
  { name: "Anthea", gender: "girl", origin: "Greek", meaning: "Flower, blossom", style: "Unique", popularity: "Top 200", pronunciation: "AN-thee-ah" },
];

const STYLES = ["Classic", "Modern", "Nature", "Biblical", "Unique", "Royal"];
const ORIGINS = ["English", "Irish", "Latin", "Greek", "Hebrew", "Arabic", "Japanese", "French", "German", "Welsh", "Scottish", "Italian", "Slavic", "Persian", "Norse", "Hawaiian", "Spanish", "Scandinavian", "Sanskrit", "Russian", "Dutch", "Cornish", "Celtic"];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function loadFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function saveFavorites(favs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favs)); } catch {}
}

export default function BabyNameGenerator() {
  const [gender, setGender] = useState("all");
  const [style, setStyle] = useState("all");
  const [letter, setLetter] = useState("all");
  const [origin, setOrigin] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [compareList, setCompareList] = useState([]);
  const [tab, setTab] = useState("browse");

  useEffect(() => { setFavorites(loadFavorites()); }, []);

  const toggleFav = (name) => {
    const updated = favorites.includes(name)
      ? favorites.filter((n) => n !== name)
      : [...favorites, name];
    setFavorites(updated);
    saveFavorites(updated);
  };

  const toggleCompare = (name) => {
    if (compareList.includes(name)) {
      setCompareList(compareList.filter((n) => n !== name));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, name]);
    }
  };

  // Filter
  let filtered = NAMES.filter((n) => {
    if (gender !== "all" && n.gender !== gender) return false;
    if (style !== "all" && n.style !== style) return false;
    if (letter !== "all" && !n.name.startsWith(letter)) return false;
    if (origin !== "all" && n.origin !== origin) return false;
    return true;
  });

  // Deduplicate by name
  const seen = new Set();
  filtered = filtered.filter((n) => {
    if (seen.has(n.name)) return false;
    seen.add(n.name);
    return true;
  });

  // Shuffle
  if (shuffleSeed > 0) {
    filtered = [...filtered].sort(() => Math.sin(shuffleSeed * 9999 + filtered.length) - 0.5);
  }

  const PER_PAGE = 6;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageNames = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const compareNames = NAMES.filter((n) => compareList.includes(n.name));

  return (
    <div className="card">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-blue-50 rounded-full mb-6">
        {["browse", "favorites", "compare"].map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition capitalize ${
              tab === t ? "bg-[#3B82F6] text-white" : "text-[#9CA3AF]"
            }`}>
            {t === "favorites" ? `Favorites (${favorites.length})` : t === "compare" ? `Compare (${compareList.length})` : "Browse"}
          </button>
        ))}
      </div>

      {tab === "browse" && (
        <>
          {/* Filters */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <label className="block">
              <span className="text-xs font-semibold text-[#1E293B] uppercase mb-1 block">Gender</span>
              <select value={gender} onChange={(e) => { setGender(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-sm">
                <option value="all">All</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
                <option value="neutral">Neutral</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[#1E293B] uppercase mb-1 block">Style</span>
              <select value={style} onChange={(e) => { setStyle(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-sm">
                <option value="all">All Styles</option>
                {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[#1E293B] uppercase mb-1 block">Starting Letter</span>
              <select value={letter} onChange={(e) => { setLetter(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-sm">
                <option value="all">Any</option>
                {LETTERS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-[#1E293B] uppercase mb-1 block">Origin</span>
              <select value={origin} onChange={(e) => { setOrigin(e.target.value); setPage(0); }}
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl bg-white focus:border-[#3B82F6] focus:outline-none text-sm">
                <option value="all">All Origins</option>
                {ORIGINS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          </div>

          <p className="text-sm text-[#9CA3AF] mb-4">{filtered.length} names found</p>

          {/* Name cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {pageNames.map((n) => (
              <div key={n.name + n.origin} className="p-4 rounded-xl border-2 border-blue-100 hover:border-[#3B82F6] transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E293B]">{n.name}</h3>
                    <p className="text-xs text-[#9CA3AF]">{n.pronunciation}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    n.gender === "boy" ? "bg-blue-100 text-blue-700"
                      : n.gender === "girl" ? "bg-pink-100 text-pink-700"
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {n.gender === "boy" ? "Boy" : n.gender === "girl" ? "Girl" : "Neutral"}
                  </span>
                </div>
                <p className="text-sm text-[#1E293B] mb-2">{n.meaning}</p>
                <div className="flex gap-2 flex-wrap text-xs mb-3">
                  <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[#3B82F6]">{n.origin}</span>
                  <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[#3B82F6]">{n.style}</span>
                  <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[#3B82F6]">{n.popularity}</span>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => toggleFav(n.name)}
                    className={`text-sm font-medium px-3 py-1 rounded-full transition ${
                      favorites.includes(n.name) ? "bg-red-100 text-red-600" : "bg-blue-50 text-[#3B82F6] hover:bg-blue-100"
                    }`}>
                    {favorites.includes(n.name) ? "Unfavorite" : "Favorite"}
                  </button>
                  <button type="button" onClick={() => toggleCompare(n.name)}
                    className={`text-sm font-medium px-3 py-1 rounded-full transition ${
                      compareList.includes(n.name) ? "bg-[#D1FAE5] text-green-700" : "bg-blue-50 text-[#3B82F6] hover:bg-blue-100"
                    }`}>
                    {compareList.includes(n.name) ? "In Compare" : "Compare"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#9CA3AF] py-8">No names match your filters. Try adjusting them.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <button type="button" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-50 text-[#3B82F6] hover:bg-blue-100 disabled:opacity-40 transition">
                Previous
              </button>
              <span className="text-sm text-[#9CA3AF]">
                Page {page + 1} of {totalPages}
              </span>
              <button type="button" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-50 text-[#3B82F6] hover:bg-blue-100 disabled:opacity-40 transition">
                Next
              </button>
            </div>
          )}

          {/* Shuffle */}
          <button type="button" onClick={() => { setShuffleSeed((s) => s + 1); setPage(0); }}
            className="block mx-auto px-6 py-2 bg-[#3B82F6] text-white font-semibold rounded-full hover:bg-[#1D4ED8] transition">
            Shuffle Names
          </button>
        </>
      )}

      {tab === "favorites" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">Your Favorite Names</h3>
          {favorites.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">
              No favorites yet. Browse names and tap "Favorite" to save them here.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((favName) => {
                const n = NAMES.find((nm) => nm.name === favName);
                if (!n) return null;
                return (
                  <div key={n.name} className="p-4 rounded-xl border-2 border-blue-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-[#1E293B]">{n.name}</h3>
                        <p className="text-xs text-[#9CA3AF]">{n.pronunciation}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        n.gender === "boy" ? "bg-blue-100 text-blue-700"
                          : n.gender === "girl" ? "bg-pink-100 text-pink-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {n.gender === "boy" ? "Boy" : n.gender === "girl" ? "Girl" : "Neutral"}
                      </span>
                    </div>
                    <p className="text-sm text-[#1E293B] mb-2">{n.meaning}</p>
                    <div className="flex gap-2 flex-wrap text-xs mb-3">
                      <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[#3B82F6]">{n.origin}</span>
                      <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[#3B82F6]">{n.style}</span>
                    </div>
                    <button type="button" onClick={() => toggleFav(n.name)}
                      className="text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-600">
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "compare" && (
        <div>
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-3">
            Compare Names (select up to 3)
          </h3>
          {compareNames.length === 0 ? (
            <p className="text-sm text-[#9CA3AF] text-center py-8">
              No names selected for comparison. Browse and tap "Compare" on up to 3 names.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-blue-100">
                    <th className="py-2 px-3 text-[#1E293B]">Attribute</th>
                    {compareNames.map((n) => (
                      <th key={n.name} className="py-2 px-3 text-[#3B82F6]">{n.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["gender", "origin", "meaning", "style", "popularity", "pronunciation"].map((attr) => (
                    <tr key={attr} className="border-b border-blue-50">
                      <td className="py-2 px-3 font-medium text-[#1E293B] capitalize">{attr}</td>
                      {compareNames.map((n) => (
                        <td key={n.name} className="py-2 px-3 text-[#1E293B]">{n[attr]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {compareNames.length > 0 && (
            <button type="button" onClick={() => setCompareList([])}
              className="mt-4 text-sm text-[#9CA3AF] underline hover:text-red-400 block mx-auto">
              Clear comparison
            </button>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-[#9CA3AF] italic text-center">
        Name popularity based on recent US Social Security Administration data.
        Choosing a name is a personal decision — trust your heart!
      </p>
    </div>
  );
}
