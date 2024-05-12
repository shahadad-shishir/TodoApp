  const dropdown = document.querySelector(".dropdown");
  const selectedArea = document.querySelector('.dropdown .selected-area');
  const dropdownSelect = document.querySelector('.dropdown .select');
  const dropdownBtnIcon = document.querySelector(".dropdown button i")
  const selectedText = document.querySelector('.select p');
  const selectUl = document.querySelector('.select ul');
  const selectedUl = document.querySelector('.dropdown .selected-area ul');
  const header = document.querySelector(".header");
  
  //NB: single category = li(list)
  //I have used list(category) as it is small word

  export function handleCategory(categoryData) {
    renderCategories(categoryData)
    addListeners();
  }

  function renderCategories(categoryData) {
    categoryData.forEach(category => {
      const {id, name, emoji, color} = category;

      const i = document.createElement('i');
      i.classList.add('fa-regular', 'fa-circle-dot');
      const emojiSpan = document.createElement('span');
      emojiSpan.innerText = emoji;
      emojiSpan.classList.add('select-emoji');
      const nameSpan = document.createElement('span');
      nameSpan.innerText = name;
      const li = document.createElement('li');
      li.dataset.id = id;
      li.style.backgroundColor = color;
      li.appendChild(i);
      li.appendChild(emojiSpan);
      li.appendChild(nameSpan);
      selectUl.appendChild(li);
    });
  }

  function addListeners() {
    selectedArea.addEventListener('click', ()=> {   
      if (dropdownSelect.classList.contains('select-visible')) {
        removeDropdown();
      } else {
        showDropdown();
      }
    });
    
    document.body.addEventListener('click', e => {
      if (!dropdown.contains(e.target) && 
      dropdownSelect.classList.contains('select-visible')) {
        removeDropdown();
      }
    })
    
    const selectList = document.querySelectorAll('.dropdown .select li');
    for (let list of selectList) {
      list.addEventListener('click', () => {
        if (!list.children[0].classList.contains('initial')) {
          selectACategory(list);
        } else {
          unselectACategory(list);
        }
      });
    }  
  }

  function showDropdown() {
    dropdownBtnIcon.classList.add('rotate-icon');
    dropdownSelect.classList.add('select-visible');

    document.body.style.paddingRight = '8px';
    header.style.paddingRight = '27px';
    document.body.style.overflowY = 'hidden';
  }

  function removeDropdown() {
    dropdownBtnIcon.classList.remove('rotate-icon');
    dropdownSelect.classList.remove('select-visible');

    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = '0px';
    header.style.paddingRight = '20px';
  }

  function selectACategory(list) {
    const totalSelectedList = document.querySelectorAll('.dropdown .select i.initial').length;  

    if (totalSelectedList > 2) {
      alert('You can not add more than 3 categories');
      return;
    }  

    list.children[0].classList.add('initial');
    const id = list.dataset.id;
    const name = list.children[2].innerText;
    const emoji = list.children[1].innerText;
    const color = list.style.backgroundColor;
    const li = createAselectedList(id, name, emoji, color);
    selectedUl.appendChild(li);

    updateSelectedText();
    disableList();
  }

  function createAselectedList(id, name, emoji, color) {
    const li = document.createElement('li');
    li.style.backgroundColor = color;
    li.dataset.id = id;
    const emojiSpan = document.createElement('span');
    emojiSpan.innerText = emoji;
    emojiSpan.classList.add('selected-emoji');
    const nameSpan = document.createElement('span');
    nameSpan.innerText = name;

    li.appendChild(emojiSpan);
    li.appendChild(nameSpan);

    return li;
  }

  function disableList() {
    const totalSelectedList = document.querySelectorAll('.dropdown .select i.initial').length;
    
    if (totalSelectedList == 3) {
      const allSelectList = document.querySelectorAll(".select ul li");
      allSelectList.forEach(list => {
        if (!list.children[0].classList.contains('initial')) {
          list.style.opacity = '0.6';
          list.style.cursor = 'no-drop';
        }
      });
    }
  }

  function unselectACategory(list) {
    const text = list.children[2].innerText;
    const allSelectedList = document.querySelectorAll(".selected-area ul li");

    allSelectedList.forEach(li => {
      if (li.children[1].innerText === text) {
        li.remove();
        list.children[0].classList.remove('initial');
      }
    });

    const allSelectList = document.querySelectorAll(".select li");
    allSelectList.forEach(li => {
      if (!li.children[0].classList.contains('initial')) {
        li.style.opacity = '1';
        li.style.cursor = 'pointer';
      }
    });

    updateSelectedText();
  }


  function updateSelectedText() {
    const text = [];

    for (let list of selectedUl.children) {
      text.push(list.children[1].innerText);
    }
    
    if (text.length === 0) {
      selectedText.innerText = '';
    } else if (text.length === 1) {
      selectedText.innerText = `Selected ${text[0]}`;
    } else if (text.length === 2) {
      const modifiedText = text.join(' and ');
      selectedText.innerText = `Selected ${modifiedText}`;
    } else if (text.length === 3) {
      const lastElement = text.pop();

      const modifiedText = text.join(', ') + (' and ') + lastElement;
      selectedText.innerText = `Selected ${modifiedText}`;
    }
  }

  export function getCategoryId() {
    const id = [];
    const allSelectedList = document.querySelectorAll(".selected-area ul li");
    allSelectedList.forEach(list => {
      const categoryId = list.dataset.id;
      id.push(categoryId);
    });

    return id;
  }