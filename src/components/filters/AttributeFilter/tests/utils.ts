import { IElement } from 'gooddata';
import { get } from 'lodash';

// tslint:disable-next-line:max-line-length
export const COUNTRIES = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma (Myanmar)', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of', 'Costa Rica', 'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria', 'Northern Ireland', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian State (proposed)', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'St. Kitts and Nevis', 'St. Lucia', 'St. Vincent and the Grenadines', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City (Holy See)', 'Venezuela', 'Vietnam', 'Western Sahara (proposed state)', 'Yemen', 'Zaire', 'Zambia', 'Zimbabwe'];
export const SPELLS = ['Abundant Ammunition', 'Adhesive Spittle', 'Adjuring Step', 'Air Bubble', 'Alarm', 'Alchemical Tinkering', 'Alter Musical Instrument', 'Alter Winds', 'Animate Rope', 'Ant Haul', 'Anticipate Peril', 'Aphasia', 'Auditory Hallucination', 'Bed of Iron', 'Blend', 'Blood Money', 'Blurred Movement', 'Body Capacitance', 'Bouncy Body', 'Break', 'Bungle', 'Burning Disarm', 'Burning Hands', 'Cause Fear', 'Celestial Healing', 'Charm Person', 'Chill Touch', 'Clarion Call', 'Color Spray', 'Comprehend Languages', 'Corrosive Touch', 'Crafter’s Curse', 'Crafter’s Fortune', 'Cultural Adaptation', 'Damp Powder', 'Dancing Darkness', 'Dancing Lantern', 'Darting Duplicate', 'Dazzling Blade', 'Decompose Corpse', 'Delusional Pride', 'Desperate Weapon', 'Detect Charm', 'Detect Metal', 'Detect Secret Doors', 'Detect Undead', 'Discern Next of Kin', 'Disguise Self', 'Disguise Weapon', 'Ear-Piercing Scream', 'Emblazon Crest', 'Endothermic Touch', 'Endure Elements', 'Enlarge Person', 'Erase', 'Expeditious Construction', 'Expeditious Excavation', 'Expeditious Retreat', 'Fabricate Bullets', 'Fabricate Disguise', 'Feather Fall', 'Flare Burst', 'Floating Disk', 'Forced Quiet', 'Gentle Breeze', 'Glue Seal', 'Grasping Corpse', 'Gravity Bow', 'Grease', 'Guardian Armor', 'Handy Grapnel', 'Heightened Awareness', 'Hold Portal', 'Hydraulic Push', 'Hypnotism', 'Icicle Dagger', 'Identify', 'Illusion of Calm', 'Infernal Healing', 'Interrogation', 'Invisibility Alarm', 'Itching Curse', 'Jump', 'Jury-Rig', 'Keep Watch', 'Ki Arrow', 'Liberating Command', 'Lighten Object', 'Line in the Sand', 'Linked Legacy', 'Lock Gaze', 'Long Arm', 'Longshot', 'Mage Armor', 'Magic Aura', 'Magic Missile', 'Magic Weapon', 'Marid’s Mastery', 'Memorize Page', 'Memory Lapse', 'Mirror Polish', 'Mirror Strike', 'Moment of Greatness', 'Monkey Fish', 'Mount', 'Mudball', 'Negative Reaction', 'Obscure Poison', 'Obscuring Mist', 'Open and Shut', 'Peacebond', 'Phantom Blood', 'Poisoned Egg', 'Polypurpose Panacea', 'Protection from Chaos/Evil/Good/Law', 'Ray of Enfeeblement', 'Ray of Sickening', 'Recharge Innate Magic', 'Reduce Person', 'Refine Improvised Weapon', 'Reinforce Armaments', 'Repair Undead', 'Restore Corpse', 'Rite of Centered Mind', 'Sculpt Corpse', 'Secluded Grimoire', 'See Alignment', 'Shadow Trap', 'Shadow Weapon', 'Shield', 'Shock Shield', 'Shocking Grasp', 'Silent Image', 'Sleep', 'Snapdragon Fireworks', 'Snowball', 'Snowball', 'Stone Fist', 'Stone Shield', 'Stumble Gap', 'Stunning Barrier', 'Summon Minor Monster', 'Summon Monster I', 'Sunder Breaker', 'Sundering Shards', 'Swift Girding', 'Technomancy', 'Thunderstomp', 'Touch of Blindness', 'Touch of Combustion', 'Touch of Gracelessness', 'Touch of the Sea', 'Transfer Tattoo', 'True Strike', 'Unerring Weapon', 'Unprepared Combatant', 'Unseen Servant', 'Vanish', 'Ventriloquism', 'Vocal Alteration', 'Wave Shield', 'Weaken Powder', 'Windy Escape', 'Winter Feathers', 'With the Wind', 'Wizened Appearance', 'Youthful Appearance'];

export const ATTRIBUTE_DISPLAY_FORM_URI = '/gdc/md/projectId/obj/foo';
export const ATTRIBUTE_DISPLAY_FORM_URI_2 = '/gdc/md/projectId/obj/baz';
export const ATTRIBUTE_DISPLAY_FORM_URI_3 = '/gdc/md/projectId/obj/bar';
export const ATTRIBUTE_DISPLAY_FORM_IDENTIFIER = 'foo';
export const ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2 = 'baz';
export const ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_3 = 'bar';

export function createMetadataMock() {
    return {
        // tslint:disable-next-line:variable-name
        getValidElements: jest.fn((_projectId, objectId, options) => {
            const itemMap = {
                [ATTRIBUTE_DISPLAY_FORM_IDENTIFIER]: COUNTRIES,
                [ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2]: SPELLS
            };
            const allItems = get(itemMap, objectId, []);
            const offset: number = options.offset;
            const limit: number | null = options.limit || null;
            const limitedItems = limit !== null
            ? allItems.slice(offset, offset + limit)
            : allItems.slice(offset);
            const items: IElement[] = limitedItems.map((item: string, index: number) => ({
                element: {
                    uri: `/gdc/md/projectId/object/${objectId}?id=${offset + index}`,
                    title: item
                }
            }));

            return Promise.resolve({
                validElements: {
                    items,
                    paging: {
                        total: allItems.length
                    }
                }
            });
        }),
        getObjectUri: jest.fn((_projectId, identifier) => { // tslint:disable-line:variable-name
            if (identifier === ATTRIBUTE_DISPLAY_FORM_IDENTIFIER) {
                return Promise.resolve(ATTRIBUTE_DISPLAY_FORM_URI);
            }
            if (identifier === ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2) {
                return Promise.resolve(ATTRIBUTE_DISPLAY_FORM_URI_2);
            }
            return Promise.resolve(ATTRIBUTE_DISPLAY_FORM_URI_3);
        }),
        getObjectDetails: jest.fn((uri) => {
            if (uri === ATTRIBUTE_DISPLAY_FORM_URI) {
                return Promise.resolve({
                    attributeDisplayForm: {
                        meta: {
                            title: 'Attribute',
                            uri
                        }
                    }
                });
            }
            if (uri === ATTRIBUTE_DISPLAY_FORM_URI_2) {
                return Promise.resolve({
                    attributeDisplayForm: {
                        meta: {
                            title: 'Attribute 2',
                            uri
                        }
                    }
                });
            }
            return Promise.resolve({
                attributeDisplayForm: {
                    meta: {
                        title: 'Country',
                        uri
                    }
                }
            });
        }),
        // tslint:disable-next-line:variable-name
        getIdentifiersFromUris: jest.fn((_projectId, uris: string[]) => {
            const uriMap = {
                [ATTRIBUTE_DISPLAY_FORM_URI]:
                { identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER, uri: ATTRIBUTE_DISPLAY_FORM_URI },
                [ATTRIBUTE_DISPLAY_FORM_URI_2]:
                { identifier: ATTRIBUTE_DISPLAY_FORM_IDENTIFIER_2, uri: ATTRIBUTE_DISPLAY_FORM_URI_2 }
            };
            return Promise.resolve(uris.map(uri => uriMap[uri]));
        })
    };
}

// Runs supplied 'test' function after 'delayOffset' ms every 'increment' ms
// until it returns truthy and resolves returned promise
// or until it reaches maxDelay and rejects the promise
export function waitFor(test: Function, maxDelay = 1000, delayOffset = 0, increment = 100) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const intervalRef = setInterval(() => {
                const testResult = test();
                if (testResult) {
                    clearInterval(intervalRef);
                    return resolve(testResult);
                }
                if (Date.now() - start >= maxDelay) {
                    clearInterval(intervalRef);
                    reject(testResult);
                }
            }, increment);
        }, delayOffset);
    });
}
