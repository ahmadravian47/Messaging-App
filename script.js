
document.addEventListener('DOMContentLoaded', function() {
    let fadeUpElements = document.querySelectorAll('.fade-up');
  
    fadeUpElements.forEach(function(element) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 1 });
  
        observer.observe(element);
    });
  });
  
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    let fadeLeftElements = document.querySelectorAll('.fade-left');
  
    fadeLeftElements.forEach(function(element) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateX(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
  
        observer.observe(element);
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    let fadeRightElements = document.querySelectorAll('.fade-right');
  
    fadeRightElements.forEach(function(element) {
        let observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    element.style.opacity = 1;
                    element.style.transform = 'translateX(0)';
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 });
  
        observer.observe(element);
    });
  });
  
  
  
  
  
  // now writing this for hamburger menu
  let hambutten=document.querySelector('.fa-bars');
  var hammenu=false;
  hambutten.addEventListener('click',function(){
    if(hammenu==false){//means now hamburger menu should appear
    let hm=document.querySelector('.hamburgermenu');
    hm.style.opacity="0.98";
    hambutten.className="fa-solid fa-xmark";
    hambutten.style.margineLeft="1rem";
    }
    else{//means now hamburger menu should be closed and disappear
      let hm=document.querySelector('.hamburgermenu');
      hm.style.opacity="0";
      hambutten.className="fa-solid fa-bars";
    }
    hammenu=!hammenu;
  
  })