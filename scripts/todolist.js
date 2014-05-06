
$(document).ready(function() {
  init();
});

function init() {
  $('#datepicker').datepicker();
  $('.priority-selector a').click(function (event) {
    event.preventDefault();
    $('#todo-priority').html($(event.target).text());
  });

  $('#todo-priority').click(function(event){event.preventDefault();});
  $('#todo-priority').attr('tabindex', -1);

  $('#todo-subject').keyup(function(event){
    if(event.keyCode == 13){
        $('.form-todo .btn-primary').click();
    }
  });

  function appendToTable(task, ix) {
    $('#tasks > tbody:last').append('<tr id="task-'+ix+'"><td>'+task[0]+'</td><td>'+task[1]+'</td><td>'+task[2]+'</td><td><a href="">x</a></td></tr>');
  }
  
  var i = 0;
  for( i = 0; i < localStorage.length; i++ ) {
    var task = JSON.parse(localStorage.getItem('task-'+i));
    appendToTable(task,i );
  }
  $('#tasks td a').click(deleteTask);

  // Add a task
  $('#todo-form').submit(function() {
  if (  $('#todo-subject').val() != '' ) {
    var task = [$('#todo-date').val(), $('#todo-priority').text(), $('#todo-subject').val()];
    localStorage.setItem( 'task-'+i, JSON.stringify(task) );
	appendToTable(task, i);
	$('#tasks td a').click(deleteTask);
    $('#task-' + i).css('display', 'none');
    $('#task-' + i).fadeIn('slow');
    $('#todo-subject').val('');
    $('#todo-date').val('');
    $('#todo-priority').val('');
    i++;
  }
  return false;
  });
      
  // Remove a task
  function deleteTask(event) {
    event.preventDefault();
    localStorage.removeItem($(this).parent().parent().attr('id'));
    $(this).parent().parent().fadeOut('slow', function() { $(this).remove(); } );
    for(i=0; i<localStorage.length; i++) {
      if( !localStorage.getItem('task-'+i)) {
        localStorage.setItem('task-'+i, localStorage.getItem('task-' + (i+1) ) );
        localStorage.removeItem('task-'+ (i+1) );
		$('#task-'+(i+1)).attr('id', 'task-'+ i );
      } 
    }
  }
}