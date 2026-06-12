/* bootstrap-local.js — minimal Tab plugin imitation
   Listens for clicks on [data-bs-toggle="tab"] and shows the target pane.
*/
(function(){
  function showTab(trigger){
    var target = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
    if(!target) return;
    // deactivate other triggers in same nav
    var nav = trigger.closest('.nav');
    if(nav){
      nav.querySelectorAll('[data-bs-toggle="tab"]').forEach(function(btn){
        btn.classList.remove('active'); btn.setAttribute('aria-selected','false');
      });
    }
    trigger.classList.add('active'); trigger.setAttribute('aria-selected','true');

    // hide all tab panes that are referenced by data-bs-target in the document
    document.querySelectorAll('[role="tabpanel"]').forEach(function(p){ p.classList.add('d-none'); });

    // show requested pane(s)
    try{
      document.querySelectorAll(target).forEach(function(p){ p.classList.remove('d-none'); });
    }catch(e){/* invalid selector */}
  }

  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-bs-toggle="tab"]');
    if(!t) return;
    e.preventDefault();
    showTab(t);
  }, false);

  // On DOM ready: if any trigger has .active, show its target; otherwise show first active pane
  document.addEventListener('DOMContentLoaded', function(){
    var active = document.querySelector('[data-bs-toggle="tab"].active');
    if(active) showTab(active);
    else{
      // show first pane if exists
      var firstPane = document.querySelector('[role="tabpanel"]');
      if(firstPane) firstPane.classList.remove('d-none');
    }
  });
})();
