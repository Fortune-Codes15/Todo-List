const SUPABASE_URL = 'https://jiintouacoprywfqazoj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppaW50b3VhY29wcnl3ZnFhem9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTg1MzUsImV4cCI6MjA1OTMzNDUzNX0.C1NXM7iChdGDZR5M0dyvYO7F1oAGUzbMoQBEeHeyx-A';
const client = supabase.createClient( SUPABASE_URL, SUPABASE_KEY );
const tdInput = document.querySelector( '.input' );
const tdDate = document.querySelector( '.date-input' );
const tdBtn = document.querySelector( '.js-add-btn' );
const container = document.querySelector( '.grid' );
const todo = [];
const displayError = document.querySelector( '.display-error' );
const closeBtn = document.querySelector( '.close-btn' );
let timeOutId;
const errormessage = document.querySelector( 'span' )

loadTodosFromSupabase();

tdBtn.addEventListener( 'click', addTodo );
document.addEventListener( 'keydown', ( e ) => {
  if ( e.key === 'Enter' ) {
    addTodo();
  }
} );

async function addTodo() {
  const inputValue = tdInput.value.trim();
  const dateValue = tdDate.value
  if ( !inputValue ) {
    tdInput.classList.add( 'alert' );
    return;
  }
  if ( !dateValue ) {
    tdDate.classList.add( 'alert' );
    return;
  }
  tdInput.classList.remove( 'alert' );
  tdDate.classList.remove( 'alert' );
  const { data, error } = await client.from( 'todos' ).insert( {
    task: inputValue,
    due_date: dateValue,
  } ).select();

  if ( error ) {
    errorMessage( 'Unable to add Task' )
    return;
  }

  const newItem = {
    id: data[ 0 ].id,
    inputValue: inputValue,
    dateValue: dateValue
  };
  todo.push( newItem );
  render();
  tdInput.value = '';
  tdDate.value = '';
}


function render() {
  container.innerHTML = '';
  todo.forEach( ( item, index ) => {
    const html = `
      <div>${item.inputValue}</div> 
      <div>${item.dateValue}</div>
      <div>
        <button onclick="deleteTodo('${item.id}', ${index})">Delete</button>
      </div>
    `;
    container.innerHTML += html;
  } );
}

async function loadTodosFromSupabase() {
  const { data, error } = await client.from( 'todos' ).select( '*' ).order( 'created_at', { ascending: true } );
  if ( error ) {
    errorMessage( 'Unable to load Task' )
    return;
  }

  data.forEach( ( item ) => {
    todo.push( {
      id: item.id,
      inputValue: item.task,
      dateValue: item.due_date,
    } );
  } );

  render();
}

async function deleteTodo( id, index ) {
  const { error } = await client.from( 'todos' ).delete().eq( 'id', id );

  if ( error ) {
    errorMessage( 'Unable to delete Task' )
    todo.length = 0;
    loadTodosFromSupabase();
  } else {
    todo.splice( index, 1 );
    render();
  }

}

function errorMessage( message ) {
  displayError.classList.add( 'no-error' );
  timeOutId = setTimeout( () => {
    displayError.classList.remove( 'no-error' )
  }, 5000 );
  errormessage.innerText = message
}

closeBtn.addEventListener( 'click', () => {
  displayError.classList.remove( 'no-error' );
  clearTimeout( timeOutId );
} );