import { generateRandomId } from "../utils/number.js";

const demoCategories = [
  {
    id: 1,
    name: 'Home',
    emoji: '🏠️',
    color: '#b624ff',    
  },
  {
    id: 2,
    name: 'Work',
    emoji: '🏢',
    color: '#5061ff',    
  },
  {
    id: 3,
    name: 'Personal',
    emoji: '👤',
    color: '#fb34ff',    
  },
  {
    id: 4,
    name: 'Fitness',
    emoji: '💪',
    color: '#ffea28',    
  },
  {
    id: 5,
    name: 'Education',
    emoji: '📚️',
    color: '#ff9518',    
  },
];

export const ctgryData = {
  categories: JSON.parse(localStorage.getItem('categories')) || demoCategories,

  updateStorage() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  },

  getCtgry(ctgryId) {
    let data;
    this.categories.forEach(category => {
      if (category.id == ctgryId) {
        data = category;
        return;
      }
    }); 
    return data;
  },

  getIndex(ctgryId) {
    let data;
    this.categories.forEach((category, index) => {
      if (category.id == ctgryId) {
        data = index;
        return;
      }
    }); 
    return data;
  },

  update(id, name, emoji, color) {
    const index = this.getIndex(id);
    this.categories[index].name = name;
    this.categories[index].emoji = emoji;
    this.categories[index].color = color;
    this.updateStorage();
  },

  delete(id) {
    const index = this.getIndex(id);
    this.categories.splice(index, 1);
    this.updateStorage();
  },

  create(name, emoji, color) {
    const id = generateRandomId(8);
    const newCtgry = {id: id, name: name, emoji: emoji, color: color};
    ctgryData.categories.push(newCtgry);
    this.updateStorage();
  }
}
