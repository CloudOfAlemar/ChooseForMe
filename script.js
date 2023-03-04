"use strict";

// Cover Page - Variables
const coverPage = document.querySelector( ".Cover-Page" );
const cpCreateListButton = document.querySelector( ".C-P--create-list-button" );
const cpViewListsButton = document.querySelector( ".C-P--view-lists-button" );

// Create List Page - Variables
const createListPage = document.querySelector( ".Create-List-Page" );
const clpListTitleInput = document.querySelector( ".C-L-P--list-title-input" );
const clpAddItemInput = document.querySelector( ".C-L-P--add-item-input" );
const clpAddItemButton = document.querySelector( ".C-L-P--add-item-button" );
const clpPreviewArea = document.querySelector( ".C-L-P--preview-area" );
const clpCreateListBackButton = document.querySelector( ".C-L-P--create-list-back-button" );
const clpCreateListButton = document.querySelector( ".C-L-P--create-list-button" );

// Lists Page - Variables
const listsPage = document.querySelector( ".Lists-Page" );
const lpListArea = document.querySelector( ".L-P--list-area" );
const lpBackButton = document.querySelector( ".L-P--back-button" );
const lpChooseForMeButton = document.querySelector( ".L-P--chooseforme-button" );

// Update List Page
const updateListPage = document.querySelector( ".Update-List-Page" );
const ulpListTitleInput = document.querySelector( ".U-L-P--list-title-input" );
const ulpAddItemInput = document.querySelector( ".U-L-P--add-item-input" );
const ulpAddItemButton = document.querySelector( ".U-L-P--add-item-button" );
const ulpPreviewArea = document.querySelector( ".U-L-P--preview-area" ); 
const ulpUpdateListBackButton = document.querySelector( ".U-L-P--update-list-back-button" );
const ulpUpdateListButton = document.querySelector( ".U-L-P--update-list-button" );

// Random Pick Page - Variables
const randomPickPage = document.querySelector( ".Random-Pick-Page" );
const rppChoiceDisplay = document.querySelector( ".R-P-P--choice-display" );
const rppBackButton = document.querySelector( ".R-P-P--back-button" );

// Global List Data
let devList = {
  title: "",
  listItems: []
};
let updatedDevList = {
  title: "",
  listItems: []
};
let globalLists = [];
let globalListSelected = -1;
let previousGlobalListSelected = -1;
const ulpClassList = [ "U-L-P--list-item-area", "U-L-P--list-item", "U-L-P--list-item-delete-button" ];
const clpClassList = [ "C-L-P--list-item-area", "C-L-P--list-item", "C-L-P--list-item-delete-button" ];

// ===========================================================
// Functions
// ===========================================================

const switchPage = function( hidingPage, showingPage ) {
  hidingPage.classList.add( "hide-page" );
  showingPage.classList.remove( "hide-page" );
}

const createListItem = function( textValue, area, uniqueClassList ) {
  const newLi = document.createElement( "LI" );
  newLi.classList.add( uniqueClassList[ 0 ], "CU-L-P--list-item-area" );
  const newSpan = document.createElement( "SPAN" );
  newSpan.classList.add( uniqueClassList[ 1 ], "CU-L-P--list-item" );
  newSpan.innerText = textValue;
  const newButton = document.createElement( "BUTTON" );
  newButton.classList.add( uniqueClassList[ 2 ], "CU-L-P--list-item-delete-button" );
  const newI = document.createElement( "I" );
  newI.classList.add( "fa-regular", "fa-trash-can", "CU-L-P--list-item-delete-icon" );
  newButton.appendChild( newI );
  newLi.appendChild( newSpan );
  newLi.appendChild( newButton );
  area.appendChild( newLi );
}

const createList = function( titleValue ) {
  const newDiv = document.createElement( "DIV" );
  newDiv.classList.add( "L-P--list-box" );
  const newH4 = document.createElement( "H4" );
  newH4.classList.add( "L-P--list-box-title" );
  newH4.textContent = titleValue;
  const newButton = document.createElement( "BUTTON" );
  newButton.classList.add( "L-P--list-box-edit-button", "hide-list-box-edit-button" );
  const newI = document.createElement( "I" );
  newI.classList.add( "fa-regular", "fa-pen-to-square", "L-P--list-box-icon", "L-P--list-box-edit-icon" );
  const newButton2 = document.createElement( "BUTTON" );
  newButton2.classList.add( "L-P--list-box-delete-button", "hide-list-box-delete-button" );
  const newI2 = document.createElement( "I" );
  newI2.classList.add( "fa-regular", "fa-trash-can", "L-P--list-box-icon", "L-P--list-box-delete-icon" );

  newButton2.appendChild( newI2 );
  newButton.appendChild( newI );
  newDiv.appendChild( newH4 );
  newDiv.appendChild( newButton );
  newDiv.appendChild( newButton2 );

  lpListArea.appendChild( newDiv );
}

const toggleListBoxHiddenElements = function( listBox ) {
  listBox.children[ 1 ].classList.toggle( "hide-list-box-edit-button" );
  listBox.children[ 2 ].classList.toggle( "hide-list-box-delete-button" );
}

/* ( for clp and ulp )
   1. adds list item to devList
   2. creates the list item in the DOM
   3. clear the input value of the added item after it has been added */
const addCreateListItem = function( currentDevList, input, previewArea, classList ) {
  currentDevList.listItems.push( input.value );
  createListItem( input.value, previewArea, classList );
  input.value = "";
}

const deleteRemoveListItem = function( currentDevList, target, previewArea ) {
  currentDevList.listItems.splice(
    currentDevList.listItems.indexOf( 
      target.parentElement.parentElement.children[ 0 ].innerText
    ), 1
  );
  previewArea.removeChild( target.parentElement.parentElement );
}

const resetCUPL = function( titleInput, itemInput, currentDevList, previewArea ) {
  titleInput.value = "";
  itemInput.value = "";
  while( previewArea.firstChild ) {
    previewArea.removeChild( previewArea.firstChild );
  }
  currentDevList.listItems.length = 0;
}

const resetGlobalListValues = function() {
  globalListSelected = -1;
  previousGlobalListSelected = -1;
}

const resetUpdatedDevListAndGlobalListValues = function( resetFunction ) {
  updatedDevList.title = "";
  resetFunction();
}

// ===========================================================
// Fill / Create list with Local Storage Data
// ===========================================================
if( localStorage.length > 0 ) {
  globalLists = JSON.parse( localStorage.getItem( "listCollection" ) );
  globalLists.forEach( ( list, index ) => {
    createList( list.title );
  } );
}

// ===========================================================
// Cover Page Event Listeners
// ===========================================================

cpCreateListButton.addEventListener( "click", function() {
  switchPage( coverPage, createListPage );
} );

cpViewListsButton.addEventListener( "click", function() {
  switchPage( coverPage, listsPage );
} );

// ===========================================================
// Create List Page Event Listeners
// ===========================================================

clpAddItemInput.addEventListener( "keydown", function( event ) {
  if( clpAddItemInput.value && event.keyCode === 13 ) {
    addCreateListItem( devList, clpAddItemInput, clpPreviewArea, clpClassList );
  }
} );

clpAddItemButton.addEventListener( "click", function() {
  if( clpAddItemInput.value ) {
    addCreateListItem( devList, clpAddItemInput, clpPreviewArea, clpClassList );
  }
} );

clpPreviewArea.addEventListener( "click", function( event ) {
  if( event.target.matches( ".CU-L-P--list-item-delete-icon" ) ) {
    deleteRemoveListItem( devList, event.target, clpPreviewArea );
  }
} );

clpCreateListBackButton.addEventListener( "click", function() {
  resetCUPL( clpListTitleInput, clpAddItemInput, devList, clpPreviewArea );
  switchPage( createListPage, coverPage );
} );

clpCreateListButton.addEventListener( "click", function() {
  devList.title = clpListTitleInput.value || "Untitled";
  globalLists.push( JSON.parse( JSON.stringify( devList ) ) );
  localStorage.setItem( "listCollection", JSON.stringify( globalLists ) );
  createList( devList.title );
  devList.title = "";
  resetCUPL( clpListTitleInput, clpAddItemInput, devList, clpPreviewArea );
  switchPage( createListPage, listsPage );
} );

// ===========================================================
// Lists Page Event Listeners
// ===========================================================
lpListArea.addEventListener( "click", function( event ) {
  if( event.target.matches( ".L-P--list-box" ) ) {
    const lpListBox = document.querySelectorAll( ".L-P--list-box" );
    // set previous equal to global for second time the list box is clicked
    previousGlobalListSelected = globalListSelected;
    // search for the list box that was clicked, and set the globalListSelected variable
    lpListBox.forEach( ( listBox, i ) => {
      if( listBox === event.target ) { globalListSelected = i; }
    } );
    // toggle hidden lpListBox[ globalListSelected ]
    toggleListBoxHiddenElements( lpListBox[ globalListSelected ] );
    lpListBox[ globalListSelected ].classList.toggle( "shrink-selected-list" );
  
    // If same listBox is clicked, reset previous and global values
    if ( previousGlobalListSelected === globalListSelected ) {
      resetGlobalListValues();
    } else if ( previousGlobalListSelected !== globalListSelected && previousGlobalListSelected !== -1 ) {
      toggleListBoxHiddenElements( lpListBox[ previousGlobalListSelected ] );
      lpListBox[ previousGlobalListSelected ].classList.toggle( "shrink-selected-list" );
    }
    if( globalListSelected !== -1 ) {
      lpChooseForMeButton.classList.add( "button-clickable" );
    } else {
      lpChooseForMeButton.classList.remove( "button-clickable" );
    }
  }
  if( event.target.matches( ".L-P--list-box-edit-icon" ) ) {
    updatedDevList = JSON.parse( JSON.stringify( globalLists[ globalListSelected ] ) );
    ulpListTitleInput.value = updatedDevList.title;
    updatedDevList.listItems.forEach( listItem => {
      createListItem( listItem, ulpPreviewArea, ulpClassList );
    });
    document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ].
      classList.toggle( "shrink-selected-list" );
    lpChooseForMeButton.classList.remove( "button-clickable" );
    switchPage( listsPage, updateListPage );
  }
  if( event.target.matches( ".L-P--list-box-delete-icon" ) ) {
    globalLists.splice( globalLists.indexOf( globalLists[ globalListSelected ] ), 1 );
    localStorage.setItem( "listCollection", JSON.stringify( globalLists ) );
    lpListArea.removeChild(
      document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ]
    );
    resetGlobalListValues();
    lpChooseForMeButton.classList.remove( "button-clickable" );
  }
} );

lpBackButton.addEventListener( "click", function() {
  if( globalListSelected !== -1 ) {
    toggleListBoxHiddenElements(
      document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ]
    );
    document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ].
      classList.toggle( "shrink-selected-list" );
  }
  resetGlobalListValues();
  switchPage( listsPage, coverPage );
} );

lpChooseForMeButton.addEventListener( "click", function() {
  if( globalListSelected !== -1 ) {
    const glListItems = globalLists[ globalListSelected ].listItems;
    if( glListItems.length > 0 ) {
      const randomListItemValue = Math.trunc( Math.random() * glListItems.length );
      const capturedListItem = glListItems[ randomListItemValue ];
      rppChoiceDisplay.textContent = capturedListItem;
    } else {
      rppChoiceDisplay.textContent = "No list";
    }
    toggleListBoxHiddenElements(
      document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ]
    );
    document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ].
      classList.toggle( "shrink-selected-list" );
    resetGlobalListValues();
    switchPage( listsPage, randomPickPage );
    setTimeout( function() {
      rppChoiceDisplay.classList.add( "roulette" );
    }, 750 );
    lpChooseForMeButton.classList.remove( "button-clickable" );
  }
} );

// ===========================================================
// Update List Page Event Listeners
// ===========================================================
ulpAddItemInput.addEventListener( "keydown", function( event ) {
  if( ulpAddItemInput.value && event.keyCode === 13 ) {
    addCreateListItem( updatedDevList, ulpAddItemInput, ulpPreviewArea, ulpClassList );
  }
} );

ulpAddItemButton.addEventListener( "click", function() {
  if( ulpAddItemInput.value ) {
    addCreateListItem( updatedDevList, ulpAddItemInput, ulpPreviewArea, ulpClassList );
  }
} );

ulpPreviewArea.addEventListener( "click", function( event ) {
  if( event.target.matches( ".CU-L-P--list-item-delete-icon" ) ) {
    deleteRemoveListItem( updatedDevList, event.target, ulpPreviewArea );
  }
} );

ulpUpdateListBackButton.addEventListener( "click", function() {
  resetCUPL( ulpListTitleInput, ulpAddItemInput, updatedDevList, ulpPreviewArea );
  toggleListBoxHiddenElements(
    document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ]
  );
  resetUpdatedDevListAndGlobalListValues( resetGlobalListValues );
  switchPage( updateListPage, listsPage );
} );

ulpUpdateListButton.addEventListener( "click", function() {
  updatedDevList.title = ulpListTitleInput.value || "Untitled";
  globalLists[ globalListSelected ] = JSON.parse( JSON.stringify( updatedDevList ) );
  localStorage.setItem( "listCollection", JSON.stringify( globalLists ) );
  resetCUPL( ulpListTitleInput, ulpAddItemInput, updatedDevList, ulpPreviewArea );
  toggleListBoxHiddenElements(
    document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ]
  );
  document.querySelectorAll( ".L-P--list-box" )[ globalListSelected ].
    children[ 0 ].textContent = updatedDevList.title || "Untitled";
  resetUpdatedDevListAndGlobalListValues( resetGlobalListValues );
  switchPage( updateListPage, listsPage );
} );

// ===========================================================
// Roulette Pick Page Event Listeners
// ===========================================================

rppBackButton.addEventListener( "click", function() {
  switchPage( randomPickPage, listsPage );
  rppChoiceDisplay.textContent = "";
  rppChoiceDisplay.classList.remove( "roulette" );
} );