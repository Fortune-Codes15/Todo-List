const list = document.getElementById( 'To-do' );
const form = document.getElementById( 'To-doForm' );
const textBox = document.getElementById( 'textBox' );
const btn = document.getElementById( 'btn' );

let database = JSON.parse( localStorage.getItem( 'task' ) ) || []
function saveToLocalStorage() {
  localStorage.setItem( 'task', JSON.stringify( database ) )
}

function loadTask() {
  database.forEach( taskList => {
    hello( taskList )
  } );
}

loadTask()

form.addEventListener( 'submit', function ( submit ) {
  submit.preventDefault();
  const taskList = textBox.value;
  if ( taskList === '' ) {
    console.log( 'This is an empty string' )
  } else {
    database.push( taskList );
    hello( taskList )
  }

  console.log( database.length >= 5 );
  if ( database.length = 6 ) {
    console.log( 'Max Task Reached' );
    form.disabled = true

  }

} )
function hello( taskList ) {
  const task = document.createElement( 'li' );
  task.innerText = taskList;
  list.appendChild( task );

  const removeBtn = document.createElement( 'button' );
  removeBtn.innerText = 'Remove';
  task.appendChild( removeBtn );
  saveToLocalStorage();
  textBox.value = '';
  removeBtn.classList.add( 'removeBtn' )

  removeBtn.addEventListener( 'click', () => {
    list.removeChild( task );
    database = database.filter( item => item !== taskList );
    saveToLocalStorage();
  } );

}
const body = document.querySelector( 'body' );
const container = document.querySelector( '.container' )
const paragraph = document.querySelector( 'p' )
const toggle = document.querySelector( '.toggle' );
const icons = document.querySelector( '.icons' );
const button = document.querySelector( 'button' )

toggle.onclick = () => {
  if ( icons.classList.contains( 'ri-sun-line' ) ) {
    icons.classList.remove( 'ri-sun-line' );
  }
  else {
    icons.classList.add( "ri-sun-line" )
  }
  body.classList.toggle( 'light_body' );
  button.classList.toggle( 'btn_light' )
  container.classList.toggle( 'light_card' );
  paragraph.classList.toggle( 'light_text' )
  icons.classList.toggle( 'icons_light' )
}