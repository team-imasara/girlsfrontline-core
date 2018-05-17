import path from 'path';
import fs from 'fs-extra';
import dolls from '../../data/doll.json';
import fairies from '../../data/fairy.json';
import skills from '../../data/skill.json';
// import equips from '../../data/equip.json';

/* eslint-disable no-console */
const args = process.argv.slice(2);
if (args.length === 0) {
  throw new Error('Usage: create-i18n <language>');
}

const [language] = args;

const createi18n = () => {
  // girlsfrontline-core/dist/tools -> girlsfrontline-core/data/i18n
  const workingPath = path.join(__dirname, '../../data/i18n', language);
  
  const getDollData = () => dolls.map(({id, name, nick, skill = {}, skill2 = {}}) => {
    const doll = {id, name, nick};
    doll.skill = skill.name ? {name: skill.name} : undefined;
    doll.skill2 = skill2.name ? {name: skill2.name} : undefined;

    return doll;
  });
  const getFairyData = () => fairies.map(({id, name, skill = {}}) => {
    const fairy = {id, name};
    fairy.skill = skill.name ? {name: skill.name} : undefined;

    return fairy;
  });
  const getSkillData = () => skills.map(({id, name, desc, data}) => ({id, name, desc, data}));
  // const getEquipData = () => equips.map(({name}) => ({name}));

  // Create i18n directory
  fs.ensureDirSync(workingPath);
  fs.writeFile(path.join(workingPath, 'doll.json'), JSON.stringify(getDollData()));
  fs.writeFile(path.join(workingPath, 'fairy.json'), JSON.stringify(getFairyData()));
  fs.writeFile(path.join(workingPath, 'skill.json'), JSON.stringify(getSkillData()));
  // fs.writeFile(path.join(workingPath, 'equip.json'), JSON.stringify(getEquipData()));
};

createi18n();
